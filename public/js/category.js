const Category = (() => {
  async function init() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const origin = params.get('origin');
    if (!type && !origin) { window.location.href = 'index.html'; return; }

    const res = await fetch('data/recipes.json');
    const recipes = await res.json();

    let filtered;
    let titleKey, titleName;

    if (type) {
      filtered = recipes.filter(r => r.type === type);
      titleKey = 'category_type_title';
      titleName = I18n.get('cat_' + type);
    } else {
      filtered = recipes.filter(r => r.origin === origin);
      titleKey = 'category_origin_title';
      titleName = I18n.get('origin_' + origin);
    }

    render(filtered, titleKey, titleName);
    document.addEventListener('langchange', () => {
      const name = type ? I18n.get('cat_' + type) : I18n.get('origin_' + origin);
      render(filtered, titleKey, name);
    });
  }

  function render(recipes, titleKey, titleName) {
    const lang = I18n.getLang();
    document.getElementById('category-title').textContent = I18n.get(titleKey, { name: titleName });
    document.getElementById('category-count').textContent = I18n.get('category_count', { count: recipes.length });
    document.title = `${titleName} — ${I18n.get('site_name')}`;

    const grid = document.getElementById('recipe-grid');
    grid.innerHTML = recipes.map(recipe => {
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
    }).join('');

    I18n.apply();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', Category.init);
