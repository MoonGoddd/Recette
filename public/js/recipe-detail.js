const RecipeDetail = (() => {
  let completedSteps = new Set();
  let currentRecipe = null;
  let basePersons = 1;
  let currentPersons = 1;
  let baseIngredients = [];
  let activeIngredientIndex = null;

  async function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) { window.location.href = 'index.html'; return; }

    const res = await fetch('data/recipes.json');
    const recipes = await res.json();
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) { window.location.href = 'index.html'; return; }

    currentRecipe = recipe;
    basePersons = recipe.servings;
    currentPersons = recipe.servings;

    render(recipe);
    setupPrint();
    setupServingsControls();

    document.addEventListener('langchange', () => render(recipe));
  }

  function getRatio() {
    return currentPersons / basePersons;
  }

  function getPortions() {
    return getRatio();
  }

  function render(recipe) {
    const lang = I18n.getLang();
    const title = recipe[`title_${lang}`] || recipe.title_fr;
    const desc = recipe[`description_${lang}`] || recipe.description_fr;
    const ingredients = recipe[`ingredients_${lang}`] || recipe.ingredients_fr;
    const steps = recipe[`steps_${lang}`] || recipe.steps_fr;

    baseIngredients = ingredients.map(ing => ({
      ...ing,
      parsed: parseQuantity(ing.quantity)
    }));

    document.title = `${title} — ${I18n.get('site_name')}`;
    document.getElementById('recipe-title').textContent = title;
    document.getElementById('recipe-description').textContent = desc;

    const img = document.getElementById('recipe-image');
    img.src = recipe.image;
    img.alt = title;
    img.onerror = function() { this.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&q=75'; };

    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
    document.getElementById('recipe-meta').innerHTML = `
      <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-on-dark/10 text-on-dark text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        ${I18n.get('meta_prep')}: ${recipe.prep_time} ${I18n.get('meta_min')}
      </span>
      <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-on-dark/10 text-on-dark text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>
        ${I18n.get('meta_cook')}: ${recipe.cook_time} ${I18n.get('meta_min')}
      </span>
      <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-on-dark/10 text-on-dark text-sm font-medium">
        ${I18n.get('total_time')}: ${totalTime} ${I18n.get('meta_min')}
      </span>
      <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-on-dark/10 text-on-dark text-sm font-medium">
        👤 ${recipe.servings} ${I18n.get('persons_label')}
      </span>
      <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-medium">
        ${I18n.get('meta_difficulty')}: ${I18n.get('difficulty_' + recipe.difficulty)}
      </span>
    `;

    updateServingsDisplay();
    renderIngredients();
    renderSteps(steps);
    I18n.apply();
  }

  function updateServingsDisplay() {
    document.getElementById('servings-count').textContent = currentPersons;
    const portions = getPortions();
    const portionsRounded = Math.round(portions * 10) / 10;
    const portionsDisplay = portionsRounded % 1 === 0 ? portionsRounded : portionsRounded.toFixed(1);
    document.getElementById('portions-display').textContent =
      `= ${portionsDisplay} ${I18n.get('portions_label')} (recette de base : ${basePersons} ${I18n.get('persons_label')})`;
  }

  function parseQuantity(qtyStr) {
    const match = qtyStr.match(/^([\d.,/]+)\s*(.*)/);
    if (!match) return { number: null, unit: qtyStr, raw: qtyStr };

    let numStr = match[1].replace(',', '.');
    let number;
    if (numStr.includes('/')) {
      const [num, den] = numStr.split('/');
      number = parseFloat(num) / parseFloat(den);
    } else {
      number = parseFloat(numStr);
    }

    return { number, unit: match[2].trim(), raw: qtyStr };
  }

  function formatQuantity(parsed, ratio) {
    if (parsed.number === null) return parsed.raw;
    const scaled = parsed.number * ratio;
    const rounded = Math.round(scaled * 100) / 100;
    let display;
    if (rounded % 1 === 0) {
      display = rounded.toString();
    } else if (Math.round(rounded * 10) / 10 === rounded) {
      display = rounded.toFixed(1);
    } else {
      display = rounded.toFixed(2);
    }
    return parsed.unit ? `${display} ${parsed.unit}` : display;
  }

  function setupServingsControls() {
    const minus = document.getElementById('servings-minus');
    const plus = document.getElementById('servings-plus');
    const reset = document.getElementById('calc-reset');

    if (minus) minus.addEventListener('click', () => {
      if (currentPersons > 1) {
        currentPersons--;
        activeIngredientIndex = null;
        updateAll();
      }
    });

    if (plus) plus.addEventListener('click', () => {
      currentPersons++;
      activeIngredientIndex = null;
      updateAll();
    });

    if (reset) reset.addEventListener('click', resetCalculator);
  }

  function updateAll() {
    updateServingsDisplay();
    renderIngredients();
    document.getElementById('calc-result').classList.add('hidden');
    document.getElementById('calc-reset').classList.add('hidden');
    document.getElementById('calc-info').classList.remove('hidden');
  }

  function resetCalculator() {
    currentPersons = basePersons;
    activeIngredientIndex = null;
    updateAll();
  }

  function renderIngredients() {
    const ratio = getRatio();
    const container = document.getElementById('recipe-ingredients');

    container.innerHTML = baseIngredients.map((ing, idx) => {
      const scaledQty = formatQuantity(ing.parsed, ratio);
      const isActive = activeIngredientIndex === idx;

      return `
        <li class="ingredient-row flex items-center justify-between py-4 border-b border-hairline-soft last:border-0 cursor-pointer group ${isActive ? 'bg-primary/5 -mx-3 px-3 rounded-sm' : 'hover:bg-cloud/50'}" data-index="${idx}">
          <div class="flex-1 min-w-0">
            <span class="text-charcoal group-hover:text-ink transition-colors">${ing.item}</span>
            ${isActive ? `
              <div class="mt-2 flex items-center gap-2" onclick="event.stopPropagation()">
                <input
                  type="number"
                  step="any"
                  min="0"
                  class="calc-input w-24 h-8 px-3 text-sm rounded-sm border border-hairline focus:border-ink focus:outline-none bg-canvas"
                  placeholder="${ing.parsed.number || ''}"
                  data-index="${idx}"
                >
                <span class="text-xs text-mute">${ing.parsed.unit || ''}</span>
                <span class="text-xs text-mute italic">↵ pour valider</span>
              </div>
            ` : ''}
          </div>
          <span class="ingredient-qty font-semibold text-ink text-sm shrink-0 ml-4 bg-cloud px-3 py-1 rounded-full">${scaledQty}</span>
        </li>
      `;
    }).join('');

    container.querySelectorAll('.ingredient-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.calc-input') || e.target.closest('[onclick]')) return;
        const idx = parseInt(row.dataset.index);
        selectIngredient(idx);
      });
    });

    container.querySelectorAll('.calc-input').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          confirmIngredientCalc(parseInt(input.dataset.index), input.value);
        }
      });
      input.addEventListener('click', (e) => e.stopPropagation());
      setTimeout(() => input.focus(), 50);
    });
  }

  function selectIngredient(idx) {
    if (activeIngredientIndex === idx) {
      activeIngredientIndex = null;
    } else {
      activeIngredientIndex = idx;
    }
    renderIngredients();
    document.getElementById('calc-info').classList.add('hidden');
  }

  function confirmIngredientCalc(idx, value) {
    const ing = baseIngredients[idx];
    if (!ing.parsed.number || !value) return;

    const available = parseFloat(value);
    if (isNaN(available) || available <= 0) return;

    const ratio = available / ing.parsed.number;
    currentPersons = Math.round(ratio * basePersons * 10) / 10;
    if (currentPersons < 1) currentPersons = 1;

    const portions = ratio;
    const portionsRounded = Math.round(portions * 10) / 10;

    activeIngredientIndex = null;
    updateServingsDisplay();
    renderIngredients();

    const resultEl = document.getElementById('calc-result');
    const portionsStr = portionsRounded % 1 === 0 ? portionsRounded.toString() : portionsRounded.toFixed(1);
    const personsStr = currentPersons % 1 === 0 ? currentPersons.toString() : currentPersons.toFixed(1);
    resultEl.textContent = I18n.get('calc_result', { portions: portionsStr, persons: personsStr });
    resultEl.classList.remove('hidden');
    document.getElementById('calc-reset').classList.remove('hidden');
    document.getElementById('calc-info').classList.add('hidden');
  }

  function renderSteps(steps) {
    const groups = groupSteps(steps);
    let stepNumber = 1;

    const html = groups.map(group => {
      if (group.type === 'parallel') {
        const rendered = `
          <div class="relative my-8 pl-5 border-l-2 border-primary">
            <div class="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <svg class="w-3 h-3 text-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div class="mb-4 ml-2">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                ⚡ ${I18n.get('parallel_label')}
              </span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2">
              ${group.steps.map(step => {
                const num = stepNumber++;
                return renderParallelStep(step, num);
              }).join('')}
            </div>
          </div>
        `;
        return rendered;
      } else {
        return group.steps.map(step => {
          const num = stepNumber++;
          return renderSequentialStep(step, num);
        }).join('');
      }
    }).join('');

    document.getElementById('recipe-steps').innerHTML = html;
    setupAccordion();
  }

  function renderSequentialStep(step, num) {
    const isCompleted = completedSteps.has(num);
    return `
      <div class="step-item border-b border-hairline-soft ${isCompleted ? 'step-completed' : ''}" data-step="${num}">
        <button class="step-header w-full flex items-center gap-4 py-5 text-left group" onclick="RecipeDetail.toggleStep(${num})">
          <span class="step-number shrink-0 w-9 h-9 rounded-full ${isCompleted ? 'bg-primary' : 'bg-ink'} text-on-primary text-sm font-bold flex items-center justify-center transition-colors">
            ${isCompleted ? '✓' : num}
          </span>
          <span class="flex-1 text-[15px] ${isCompleted ? 'text-mute line-through' : 'text-charcoal'} leading-relaxed transition-colors">${step.text}</span>
          <svg class="step-chevron w-5 h-5 text-mute shrink-0 transition-transform ${isCompleted ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div class="step-content ${isCompleted ? 'hidden' : ''} pl-13 pb-5">
          ${step.time ? renderTimerButton(step) : ''}
        </div>
      </div>
    `;
  }

  function renderParallelStep(step, num) {
    const isCompleted = completedSteps.has(num);
    return `
      <div class="step-item bg-cloud rounded-sm overflow-hidden ${isCompleted ? 'step-completed' : ''}" data-step="${num}">
        <button class="step-header w-full flex items-center gap-3 p-4 text-left" onclick="RecipeDetail.toggleStep(${num})">
          <span class="step-number shrink-0 w-7 h-7 rounded-full ${isCompleted ? 'bg-primary' : 'bg-ink'} text-on-primary text-xs font-bold flex items-center justify-center transition-colors">
            ${isCompleted ? '✓' : num}
          </span>
          <span class="flex-1 text-sm ${isCompleted ? 'text-mute line-through' : 'text-charcoal'} leading-relaxed transition-colors">${step.text}</span>
        </button>
        <div class="step-content ${isCompleted ? 'hidden' : ''} px-4 pb-4">
          ${step.time ? renderTimerButton(step) : ''}
        </div>
      </div>
    `;
  }

  function renderTimerButton(step) {
    const label = step.text.substring(0, 30).replace(/'/g, "\\'");
    return `
      <button
        onclick="event.stopPropagation(); Timer.start(${step.time}, '${label}...')"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-on-primary text-xs font-medium hover:bg-charcoal transition-colors"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        ${step.time} ${I18n.get('meta_min')} — ${I18n.get('timer_start')}
      </button>
    `;
  }

  function toggleStep(num) {
    const item = document.querySelector(`.step-item[data-step="${num}"]`);
    if (!item) return;

    if (completedSteps.has(num)) {
      completedSteps.delete(num);
      item.classList.remove('step-completed');
      const numberEl = item.querySelector('.step-number');
      numberEl.textContent = num;
      numberEl.classList.remove('bg-primary');
      numberEl.classList.add('bg-ink');
      const textEl = item.querySelector('.step-header span.flex-1');
      textEl.classList.remove('text-mute', 'line-through');
      textEl.classList.add('text-charcoal');
      const content = item.querySelector('.step-content');
      if (content) content.classList.remove('hidden');
      const chevron = item.querySelector('.step-chevron');
      if (chevron) chevron.classList.remove('rotate-180');
    } else {
      completedSteps.add(num);
      item.classList.add('step-completed');
      const numberEl = item.querySelector('.step-number');
      numberEl.textContent = '✓';
      numberEl.classList.remove('bg-ink');
      numberEl.classList.add('bg-primary');
      const textEl = item.querySelector('.step-header span.flex-1');
      textEl.classList.remove('text-charcoal');
      textEl.classList.add('text-mute', 'line-through');
      const content = item.querySelector('.step-content');
      if (content) content.classList.add('hidden');
      const chevron = item.querySelector('.step-chevron');
      if (chevron) chevron.classList.add('rotate-180');
    }

    updateProgress();
  }

  function updateProgress() {
    const total = document.querySelectorAll('.step-item').length;
    const done = completedSteps.size;
    const progressEl = document.getElementById('step-progress');
    if (progressEl) {
      const pct = Math.round((done / total) * 100);
      progressEl.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="flex-1 h-1.5 bg-cloud rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full transition-all duration-300" style="width: ${pct}%"></div>
          </div>
          <span class="text-xs font-medium text-mute">${done}/${total}</span>
        </div>
      `;
    }
  }

  function setupAccordion() {
    const stepsSection = document.getElementById('recipe-steps');
    if (!stepsSection) return;

    const total = document.querySelectorAll('.step-item').length;
    const progressHtml = `<div id="step-progress" class="mb-6">
      <div class="flex items-center gap-3">
        <div class="flex-1 h-1.5 bg-cloud rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full transition-all duration-300" style="width: 0%"></div>
        </div>
        <span class="text-xs font-medium text-mute">0/${total}</span>
      </div>
    </div>`;
    stepsSection.insertAdjacentHTML('afterbegin', progressHtml);
  }

  function groupSteps(steps) {
    const groups = [];
    let i = 0;

    while (i < steps.length) {
      if (steps[i].parallel) {
        const parallelGroup = { type: 'parallel', steps: [] };
        while (i < steps.length && steps[i].parallel) {
          parallelGroup.steps.push(steps[i]);
          i++;
        }
        groups.push(parallelGroup);
      } else {
        const seqGroup = { type: 'sequential', steps: [] };
        while (i < steps.length && !steps[i].parallel) {
          seqGroup.steps.push(steps[i]);
          i++;
        }
        groups.push(seqGroup);
      }
    }

    return groups;
  }

  function setupPrint() {
    const btn = document.getElementById('print-btn');
    if (btn) btn.addEventListener('click', () => window.print());
  }

  return { init, toggleStep };
})();

document.addEventListener('DOMContentLoaded', RecipeDetail.init);
