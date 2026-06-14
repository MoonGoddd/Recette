const I18n = (() => {
  let translations = {};
  let currentLang = localStorage.getItem('lang') || 'fr';

  async function load() {
    const res = await fetch('data/translations.json');
    translations = await res.json();
    apply();
    updateToggle();
  }

  function get(key, replacements = {}) {
    let text = translations[currentLang]?.[key] || translations['fr']?.[key] || key;
    Object.entries(replacements).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
    return text;
  }

  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = get(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = get(el.dataset.i18nPlaceholder);
    });
    document.documentElement.lang = currentLang;
  }

  function toggle() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('lang', currentLang);
    apply();
    updateToggle();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  function updateToggle() {
    const label = document.getElementById('lang-label');
    if (label) label.textContent = currentLang.toUpperCase();
  }

  function getLang() {
    return currentLang;
  }

  return { load, get, toggle, getLang, apply };
})();

document.addEventListener('DOMContentLoaded', () => {
  I18n.load();
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', I18n.toggle);
});
