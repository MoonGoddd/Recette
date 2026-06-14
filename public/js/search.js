const Search = (() => {
  let recipes = [];
  let onResults = null;

  function init(recipeData, callback) {
    recipes = recipeData;
    onResults = callback;

    const inputs = document.querySelectorAll('#search-input, #search-input-mobile');
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        inputs.forEach(i => { if (i !== e.target) i.value = e.target.value; });
        if (!query) {
          onResults(recipes);
          return;
        }
        const results = filter(query);
        onResults(results);
      });
    });
  }

  function filter(query) {
    const lang = I18n.getLang();
    const titleKey = `title_${lang}`;
    const descKey = `description_${lang}`;
    const ingredientsKey = `ingredients_${lang}`;

    return recipes.filter(r => {
      const title = (r[titleKey] || '').toLowerCase();
      const desc = (r[descKey] || '').toLowerCase();
      const tags = (r.tags || []).join(' ').toLowerCase();
      const origin = (r.origin || '').toLowerCase();
      const type = (r.type || '').toLowerCase();
      const ingredients = (r[ingredientsKey] || []).map(i => i.item).join(' ').toLowerCase();
      return title.includes(query) || desc.includes(query) || tags.includes(query) || origin.includes(query) || type.includes(query) || ingredients.includes(query);
    });
  }

  function clear() {
    document.querySelectorAll('#search-input, #search-input-mobile').forEach(i => { i.value = ''; });
  }

  return { init, filter, clear };
})();
