const App = (() => {
  let recipes = [];
  let activeFilter = 'all';
  let activeOrigin = null;

  async function init() {
    const res = await fetch('data/recipes.json');
    recipes = await res.json();

    Search.init(recipes, renderGrid);
    setupFilters();
    renderCarousel();
    renderGrid(recipes);
    setupCarouselControls();

    document.addEventListener('langchange', () => {
      renderCarousel();
      renderGrid(getFiltered());
    });
  }

  function setupCarouselControls() {
    const carousel = document.getElementById('carousel');
    const prev = document.getElementById('carousel-prev');
    const next = document.getElementById('carousel-next');
    if (!carousel) return;

    const scrollAmount = 320;
    if (prev) prev.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
  }

  function renderCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    const lang = I18n.getLang();
    const featured = recipes.slice(0, 8);

    carousel.innerHTML = featured.map(r => {
      const title = r[`title_${lang}`] || r.title_fr;
      const totalTime = (r.prep_time || 0) + (r.cook_time || 0);
      const originLabel = I18n.get(`origin_${r.origin}`);

      return `
        <a href="recipe.html?id=${r.id}" class="group shrink-0 w-[280px] sm:w-[300px]">
          <div class="relative aspect-[4/5] overflow-hidden">
            <img
              src="${r.image}"
              alt="${title}"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&q=75'"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <h3 class="font-display text-xl uppercase text-on-dark leading-tight">${title}</h3>
              <p class="mt-1 text-sm text-on-dark/70">${originLabel} · ${totalTime} ${I18n.get('meta_min')}</p>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }

  function setupFilters() {
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => {
          b.classList.remove('active', 'bg-ink', 'text-on-primary');
          b.classList.add('border', 'border-hairline', 'text-ink');
        });
        btn.classList.add('active', 'bg-ink', 'text-on-primary');
        btn.classList.remove('border', 'border-hairline', 'text-ink');
        activeFilter = btn.dataset.filter;
        activeOrigin = null;
        document.querySelectorAll('.origin-btn').forEach(b => {
          b.classList.remove('bg-ink', 'text-on-primary');
          b.classList.add('bg-cloud', 'text-mute');
        });
        Search.clear();
        renderGrid(getFiltered());
      });
    });

    document.querySelectorAll('.origin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('bg-ink');
        document.querySelectorAll('.origin-btn').forEach(b => {
          b.classList.remove('bg-ink', 'text-on-primary');
          b.classList.add('bg-cloud', 'text-mute');
        });
        if (isActive) {
          activeOrigin = null;
        } else {
          btn.classList.add('bg-ink', 'text-on-primary');
          btn.classList.remove('bg-cloud', 'text-mute');
          activeOrigin = btn.dataset.origin;
        }
        Search.clear();
        renderGrid(getFiltered());
      });
    });
  }

  function getFiltered() {
    let filtered = recipes;
    if (activeFilter !== 'all') {
      const [, type] = activeFilter.split(':');
      filtered = filtered.filter(r => r.type === type);
    }
    if (activeOrigin) {
      filtered = filtered.filter(r => r.origin === activeOrigin);
    }
    return filtered;
  }

  function renderGrid(data) {
    const grid = document.getElementById('recipe-grid');
    const noResults = document.getElementById('no-results');
    const lang = I18n.getLang();

    if (!data.length) {
      grid.innerHTML = '';
      noResults.classList.remove('hidden');
      return;
    }

    noResults.classList.add('hidden');
    grid.innerHTML = data.map(r => createCard(r, lang)).join('');
  }

  function createCard(recipe, lang) {
    const title = recipe[`title_${lang}`] || recipe.title_fr;
    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
    const originLabel = I18n.get(`origin_${recipe.origin}`);
    const diffLabel = I18n.get(`difficulty_${recipe.difficulty}`);

    return `
      <a href="recipe.html?id=${recipe.id}" class="group block relative overflow-hidden aspect-square">
        <img
          src="${recipe.image}"
          alt="${title}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&q=75'"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div class="absolute bottom-0 left-0 right-0 p-5">
          <h3 class="font-display text-xl lg:text-2xl uppercase text-on-dark leading-tight">${title}</h3>
          <p class="mt-1 text-sm text-on-dark/70">${originLabel} · ${totalTime} ${I18n.get('meta_min')} · ${diffLabel}</p>
        </div>
      </a>
    `;
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
