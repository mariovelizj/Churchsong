/* app.js — lógica de la app: render, navegación (swipe/botones), transposición, tema, lista */

const FONT_FAMILIES = {
  inter: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  atkinson: '"Atkinson Hyperlegible", -apple-system, BlinkMacSystemFont, sans-serif',
  georgia: 'Georgia, "Times New Roman", serif',
  mono: '"Space Mono", "SF Mono", "Courier New", monospace',
};

// etiquetas disponibles para filtrar canciones (coinciden con los `tags` de songs.js)
const TAGS = ['adoracion', 'alabanza', 'ofrenda', 'entrada', 'comunion'];
const TAG_LABELS = {
  adoracion: 'Adoración',
  alabanza: 'Alabanza',
  ofrenda: 'Ofrenda',
  entrada: 'Entrada',
  comunion: 'Comunión',
};

const AUTOSCROLL_MIN = 1;
const AUTOSCROLL_MAX = 10;

const state = {
  songIndex: 0,
  transposeBySong: {}, // { songId: semitonos }
  theme: localStorage.getItem('cancionero-theme') || 'light',
  fontScale: parseFloat(localStorage.getItem('cancionero-fontscale') || '1'),
  fontFamily: localStorage.getItem('cancionero-fontfamily') || 'inter',
  autoscrollSpeed: parseInt(localStorage.getItem('cancionero-autoscroll-speed') || '4', 10),
  autoscrollOn: false,
  search: '',
  activeTag: null,
  textAlign: localStorage.getItem('cancionero-align') || 'left',
};

let autoscrollTimer = null;

const measureCanvas = document.createElement('canvas');
const measureCtx = measureCanvas.getContext('2d');

const els = {
  app: document.getElementById('app'),
  title: document.getElementById('song-title'),
  author: document.getElementById('song-author'),
  keyBadge: document.getElementById('key-badge'),
  reviewBadge: document.getElementById('review-badge'),
  sheet: document.getElementById('sheet'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  transposeDown: document.getElementById('transpose-down'),
  transposeUp: document.getElementById('transpose-up'),
  transposeReset: document.getElementById('transpose-reset'),
  fontDown: document.getElementById('font-down'),
  fontUp: document.getElementById('font-up'),
  fontFamilySelect: document.getElementById('font-family-select'),
  alignSelect: document.getElementById('align-select'),
  themeToggle: document.getElementById('theme-toggle'),
  listBtn: document.getElementById('list-btn'),
  listOverlay: document.getElementById('list-overlay'),
  listClose: document.getElementById('list-close'),
  songList: document.getElementById('song-list'),
  songListEmpty: document.getElementById('song-list-empty'),
  songSearch: document.getElementById('song-search'),
  tagFilters: document.getElementById('tag-filters'),
  counter: document.getElementById('counter'),
  autoscrollToggle: document.getElementById('autoscroll-toggle'),
  autoscrollDown: document.getElementById('autoscroll-down'),
  autoscrollUp: document.getElementById('autoscroll-up'),
  autoscrollSpeedLabel: document.getElementById('autoscroll-speed-label'),
};

function currentSong() {
  return SONGS[state.songIndex];
}

function currentSemitones() {
  const song = currentSong();
  return state.transposeBySong[song.id] || 0;
}

/**
 * Convierte una línea ChordPro ("[E]Traemos hoy...") en texto corrido
 * más una lista de acordes con la posición (índice de caracter) donde van.
 */
function parseChordProLine(line) {
  const regex = /\[([^\]]+)\]/g;
  let lyricText = '';
  let cursor = 0;
  const chordSlots = [];
  let match;
  while ((match = regex.exec(line)) !== null) {
    lyricText += line.slice(cursor, match.index);
    const pos = lyricText.length;
    const last = chordSlots[chordSlots.length - 1];
    if (last && last.pos === pos) {
      last.chords.push(match[1]);
    } else {
      chordSlots.push({ pos, chords: [match[1]] });
    }
    cursor = match.index + match[0].length;
  }
  lyricText += line.slice(cursor);
  return { lyricText, chordSlots };
}

function renderLine(line, notation, semitones) {
  const { lyricText, chordSlots } = parseChordProLine(line);

  const wrap = document.createElement('div');
  wrap.className = 'line-block';

  const lyricRow = document.createElement('div');
  lyricRow.className = 'lyric-row';
  lyricRow.textContent = lyricText || ' ';

  const chordRow = document.createElement('div');
  chordRow.className = 'chord-row';

  wrap.appendChild(chordRow);
  wrap.appendChild(lyricRow);

  // hay que insertar primero para poder leer la fuente real ya aplicada
  els.sheet.appendChild(wrap);

  const font = window.getComputedStyle(lyricRow).font;
  measureCtx.font = font;

  // separación mínima entre acordes consecutivos (px) para que nunca queden
  // uno encima del otro cuando van "sueltos" al final de una línea
  const MIN_CHORD_GAP = 10;
  let cursorRight = -Infinity;

  for (const slot of chordSlots) {
    const chordEl = document.createElement('span');
    chordEl.className = 'chord';
    const transposed = slot.chords.map(c => transposeChordString(c, semitones, notation));
    chordEl.textContent = transposed.join(' ');
    chordRow.appendChild(chordEl); // se agrega antes de medir para poder leer su ancho real

    let leftPx = measureCtx.measureText(lyricText.slice(0, slot.pos)).width;
    if (leftPx < cursorRight) leftPx = cursorRight;
    chordEl.style.left = leftPx + 'px';
    cursorRight = leftPx + chordEl.offsetWidth + MIN_CHORD_GAP;
  }

  return null; // ya quedó insertado
}

function renderSong() {
  const song = currentSong();
  const semitones = currentSemitones();

  els.title.textContent = song.title;
  els.author.textContent = song.author || '';
  els.author.style.display = song.author ? '' : 'none';

  const displayKey = keyName(song.key, semitones, song.notation);
  els.keyBadge.textContent = semitones === 0
    ? `Tono: ${song.key}`
    : `Tono: ${displayKey} (${semitones > 0 ? '+' : ''}${semitones})`;

  els.reviewBadge.style.display = song.needsReview ? '' : 'none';

  els.sheet.innerHTML = '';
  for (const block of song.blocks) {
    if (block.type === 'section') {
      const sec = document.createElement('div');
      sec.className = 'section-label';
      sec.textContent = block.label;
      els.sheet.appendChild(sec);
    } else if (block.type === 'instrumental') {
      const inst = document.createElement('div');
      inst.className = 'instrumental';
      inst.textContent = transposeChordString(block.text, semitones, song.notation);
      els.sheet.appendChild(inst);
    } else if (block.type === 'line') {
      renderLine(block.chordpro, song.notation, semitones);
    }
  }

  els.counter.textContent = `${state.songIndex + 1} / ${SONGS.length}`;
  els.sheet.scrollTop = 0;
  stopAutoscroll();
  applyFontScale();
  renderList();
}

function goTo(index) {
  if (index < 0) index = SONGS.length - 1;
  if (index >= SONGS.length) index = 0;
  state.songIndex = index;
  renderSong();
}

function nextSong() { goTo(state.songIndex + 1); }
function prevSong() { goTo(state.songIndex - 1); }

function changeTranspose(delta) {
  const song = currentSong();
  const curr = state.transposeBySong[song.id] || 0;
  state.transposeBySong[song.id] = curr + delta;
  renderSong();
}

function resetTranspose() {
  const song = currentSong();
  state.transposeBySong[song.id] = 0;
  renderSong();
}

function applyFontScale() {
  els.sheet.style.setProperty('--font-scale', state.fontScale);
}

function changeFont(delta) {
  state.fontScale = Math.min(1.6, Math.max(0.7, state.fontScale + delta));
  localStorage.setItem('cancionero-fontscale', state.fontScale);
  applyFontScale();
  renderSong(); // hay que re-medir las posiciones de los acordes
}

function applyFontFamily() {
  document.documentElement.style.setProperty('--font-lyric', FONT_FAMILIES[state.fontFamily]);
  els.fontFamilySelect.value = state.fontFamily;
}

function changeFontFamily(key) {
  state.fontFamily = key;
  localStorage.setItem('cancionero-fontfamily', key);
  applyFontFamily();
  renderSong(); // hay que re-medir las posiciones de los acordes
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('cancionero-theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
}

function applyTextAlign() {
  els.sheet.classList.remove('align-left', 'align-center', 'align-right');
  els.sheet.classList.add('align-' + state.textAlign);
  els.alignSelect.value = state.textAlign;
}

function changeTextAlign(value) {
  state.textAlign = value;
  localStorage.setItem('cancionero-align', value);
  applyTextAlign();
}

function normalizeText(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

function matchesFilters(song) {
  if (state.activeTag && !(song.tags || []).includes(state.activeTag)) return false;
  if (state.search) {
    const q = normalizeText(state.search);
    const haystack = normalizeText(song.title + ' ' + (song.author || ''));
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function renderTagFilters() {
  els.tagFilters.innerHTML = '';
  const allChip = document.createElement('button');
  allChip.className = 'tag-chip' + (state.activeTag === null ? ' active' : '');
  allChip.textContent = 'Todas';
  allChip.addEventListener('click', () => {
    state.activeTag = null;
    renderList();
  });
  els.tagFilters.appendChild(allChip);

  TAGS.forEach(tag => {
    const chip = document.createElement('button');
    chip.className = 'tag-chip' + (state.activeTag === tag ? ' active' : '');
    chip.textContent = TAG_LABELS[tag] || tag;
    chip.addEventListener('click', () => {
      state.activeTag = state.activeTag === tag ? null : tag;
      renderList();
    });
    els.tagFilters.appendChild(chip);
  });
}

function renderList() {
  renderTagFilters();
  els.songList.innerHTML = '';
  const visible = SONGS
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => matchesFilters(s));

  els.songListEmpty.style.display = visible.length === 0 ? '' : 'none';

  visible.forEach(({ s, i }) => {
    const item = document.createElement('button');
    item.className = 'list-item' + (i === state.songIndex ? ' active' : '');
    const tagsHtml = (s.tags || [])
      .map(t => `<span class="list-item-tag">${TAG_LABELS[t] || t}</span>`)
      .join('');
    item.innerHTML = `
      <span class="list-item-main">
        <span class="list-item-title">${s.title}</span>
        <span class="list-item-tags">${tagsHtml}</span>
      </span>
      <span class="list-item-key">${s.key}</span>`;
    item.addEventListener('click', () => {
      goTo(i);
      closeList();
    });
    els.songList.appendChild(item);
  });
}

function openList() {
  els.listOverlay.classList.add('open');
  els.songSearch.focus();
}
function closeList() { els.listOverlay.classList.remove('open'); }

// --- autoscroll ---
function applyAutoscrollUI() {
  els.autoscrollToggle.textContent = state.autoscrollOn ? '⏸' : '▶';
  els.autoscrollToggle.classList.toggle('active', state.autoscrollOn);
  els.autoscrollToggle.title = state.autoscrollOn ? 'Pausar autoscroll' : 'Activar autoscroll';
  els.autoscrollSpeedLabel.textContent = state.autoscrollSpeed;
}

function startAutoscroll() {
  if (autoscrollTimer) return;
  state.autoscrollOn = true;
  applyAutoscrollUI();
  autoscrollTimer = setInterval(() => {
    els.sheet.scrollTop += state.autoscrollSpeed * 0.5;
  }, 50);
}

function stopAutoscroll() {
  if (autoscrollTimer) {
    clearInterval(autoscrollTimer);
    autoscrollTimer = null;
  }
  state.autoscrollOn = false;
  applyAutoscrollUI();
}

function toggleAutoscroll() {
  if (state.autoscrollOn) stopAutoscroll();
  else startAutoscroll();
}

function changeAutoscrollSpeed(delta) {
  state.autoscrollSpeed = Math.min(AUTOSCROLL_MAX, Math.max(AUTOSCROLL_MIN, state.autoscrollSpeed + delta));
  localStorage.setItem('cancionero-autoscroll-speed', state.autoscrollSpeed);
  applyAutoscrollUI();
}

// --- eventos ---
els.prevBtn.addEventListener('click', prevSong);
els.nextBtn.addEventListener('click', nextSong);
els.transposeUp.addEventListener('click', () => changeTranspose(1));
els.transposeDown.addEventListener('click', () => changeTranspose(-1));
els.transposeReset.addEventListener('click', resetTranspose);
els.fontUp.addEventListener('click', () => changeFont(0.1));
els.fontDown.addEventListener('click', () => changeFont(-0.1));
els.fontFamilySelect.addEventListener('change', (e) => changeFontFamily(e.target.value));
els.alignSelect.addEventListener('change', (e) => changeTextAlign(e.target.value));
els.themeToggle.addEventListener('click', toggleTheme);
els.listBtn.addEventListener('click', openList);
els.listClose.addEventListener('click', closeList);
els.listOverlay.addEventListener('click', (e) => { if (e.target === els.listOverlay) closeList(); });
els.songSearch.addEventListener('input', (e) => {
  state.search = e.target.value;
  renderList();
});
els.autoscrollToggle.addEventListener('click', toggleAutoscroll);
els.autoscrollDown.addEventListener('click', () => changeAutoscrollSpeed(-1));
els.autoscrollUp.addEventListener('click', () => changeAutoscrollSpeed(1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSong();
  if (e.key === 'ArrowLeft') prevSong();
  if (e.key === 'Escape') closeList();
});

// swipe táctil
let touchStartX = null;
let touchStartY = null;
els.sheet.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  if (state.autoscrollOn) stopAutoscroll(); // tocar la letra pausa el autoscroll
}, { passive: true });

els.sheet.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx < 0) nextSong(); else prevSong();
  }
  touchStartX = null;
  touchStartY = null;
}, { passive: true });

// init
document.documentElement.setAttribute('data-theme', state.theme);
applyFontFamily();
applyTextAlign();
applyAutoscrollUI();
renderSong();
