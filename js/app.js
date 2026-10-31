/* app.js — lógica de la app: render, navegación (swipe/botones), transposición, tema, lista */

const FONT_FAMILIES = {
  inter: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  atkinson: '"Atkinson Hyperlegible", -apple-system, BlinkMacSystemFont, sans-serif',
  georgia: 'Georgia, "Times New Roman", serif',
  mono: '"Space Mono", "SF Mono", "Courier New", monospace',
};

const state = {
  songIndex: 0,
  transposeBySong: {}, // { songId: semitonos }
  theme: localStorage.getItem('cancionero-theme') || 'light',
  fontScale: parseFloat(localStorage.getItem('cancionero-fontscale') || '1'),
  fontFamily: localStorage.getItem('cancionero-fontfamily') || 'inter',
};

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
  themeToggle: document.getElementById('theme-toggle'),
  listBtn: document.getElementById('list-btn'),
  listOverlay: document.getElementById('list-overlay'),
  listClose: document.getElementById('list-close'),
  songList: document.getElementById('song-list'),
  counter: document.getElementById('counter'),
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

function renderList() {
  els.songList.innerHTML = '';
  SONGS.forEach((s, i) => {
    const item = document.createElement('button');
    item.className = 'list-item' + (i === state.songIndex ? ' active' : '');
    item.innerHTML = `<span class="list-item-title">${s.title}</span><span class="list-item-key">${s.key}</span>`;
    item.addEventListener('click', () => {
      goTo(i);
      closeList();
    });
    els.songList.appendChild(item);
  });
}

function openList() { els.listOverlay.classList.add('open'); }
function closeList() { els.listOverlay.classList.remove('open'); }

// --- eventos ---
els.prevBtn.addEventListener('click', prevSong);
els.nextBtn.addEventListener('click', nextSong);
els.transposeUp.addEventListener('click', () => changeTranspose(1));
els.transposeDown.addEventListener('click', () => changeTranspose(-1));
els.transposeReset.addEventListener('click', resetTranspose);
els.fontUp.addEventListener('click', () => changeFont(0.1));
els.fontDown.addEventListener('click', () => changeFont(-0.1));
els.fontFamilySelect.addEventListener('change', (e) => changeFontFamily(e.target.value));
els.themeToggle.addEventListener('click', toggleTheme);
els.listBtn.addEventListener('click', openList);
els.listClose.addEventListener('click', closeList);
els.listOverlay.addEventListener('click', (e) => { if (e.target === els.listOverlay) closeList(); });

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
renderSong();
