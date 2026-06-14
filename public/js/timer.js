const Timer = (() => {
  let timers = [];
  let intervalId = null;

  function start(minutes, label) {
    const timer = {
      id: Date.now(),
      label: label,
      totalSeconds: minutes * 60,
      remaining: minutes * 60,
      done: false
    };
    timers.push(timer);
    show();
    if (!intervalId) {
      intervalId = setInterval(tick, 1000);
    }
    render();
  }

  function tick() {
    let allDone = true;
    timers.forEach(t => {
      if (!t.done) {
        t.remaining--;
        if (t.remaining <= 0) {
          t.remaining = 0;
          t.done = true;
          notify(t.label);
        } else {
          allDone = false;
        }
      }
    });
    render();
    if (allDone && timers.length > 0) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function notify(label) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.3;
      osc.start();
      setTimeout(() => { osc.stop(); ctx.close(); }, 300);
    } catch (e) {}

    const widget = document.getElementById('timer-widget');
    if (widget) widget.classList.add('ring-2', 'ring-primary');
    setTimeout(() => {
      if (widget) widget.classList.remove('ring-2', 'ring-primary');
    }, 2000);
  }

  function remove(id) {
    timers = timers.filter(t => t.id !== id);
    if (timers.length === 0) {
      hide();
      clearInterval(intervalId);
      intervalId = null;
    }
    render();
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function render() {
    const list = document.getElementById('timer-list');
    if (!list) return;

    list.innerHTML = timers.map(t => `
      <div class="flex items-center justify-between p-2 rounded-sm ${t.done ? 'bg-primary/20' : 'bg-on-dark/5'}">
        <div>
          <p class="text-xs font-medium text-on-dark truncate max-w-[140px]">${t.label}</p>
          <p class="text-lg font-bold ${t.done ? 'text-primary' : 'text-on-dark'}">${t.done ? I18n.get('timer_done') : formatTime(t.remaining)}</p>
        </div>
        <button onclick="Timer.remove(${t.id})" class="text-stone hover:text-on-dark text-sm">&times;</button>
      </div>
    `).join('');
  }

  function show() {
    const widget = document.getElementById('timer-widget');
    if (widget) widget.classList.remove('hidden');
  }

  function hide() {
    const widget = document.getElementById('timer-widget');
    if (widget) widget.classList.add('hidden');
  }

  function init() {
    const closeBtn = document.getElementById('timer-close');
    if (closeBtn) closeBtn.addEventListener('click', hide);
  }

  return { start, remove, init };
})();

document.addEventListener('DOMContentLoaded', Timer.init);
