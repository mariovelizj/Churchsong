/* chords.js
   Motor de transposición de acordes.
   Soporta notación anglosajona (C D E F G A B) y notación latina (DO RE MI FA SOL LA SI),
   incluye acordes con bajo (slash chords, ej: D/G) y sufijos (m, 7, sus2, sus4, dim, add9, etc).
*/

const EN_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const ES_NOTES = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI'];

// Equivalencias bemol -> sostenido, para aceptar entradas con "b"
const FLAT_TO_SHARP_EN = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };

function noteIndexEN(noteStr) {
  const normalized = FLAT_TO_SHARP_EN[noteStr] || noteStr;
  return EN_NOTES.indexOf(normalized);
}

function noteIndexES(noteStr) {
  return ES_NOTES.indexOf(noteStr);
}

/**
 * Transpone un string de acorde completo (puede incluir slash y guiones, ej: "C/A-G/B-C-D/F#")
 * @param {string} chordStr
 * @param {number} semitones  cuántos semitonos mover (+ sube, - baja)
 * @param {'en'|'es'} notation
 * @returns {string}
 */
function transposeChordString(chordStr, semitones, notation) {
  if (!semitones) return chordStr;

  const notes = notation === 'es' ? ES_NOTES : EN_NOTES;
  const noteRegex = notation === 'es'
    ? /(^|[\s/\-()])(DO|RE|MI|FA|SOL|LA|SI)(#)?/g
    : /(^|[\s/\-()])([A-G])(#|b)?/g;

  return chordStr.replace(noteRegex, (full, pre, note, accidental) => {
    let raw = note + (accidental || '');
    let idx = notation === 'es' ? noteIndexES(raw) : noteIndexEN(raw);
    if (idx === -1) {
      // intenta sin accidental (por si el regex agarró mal)
      idx = notation === 'es' ? noteIndexES(note) : noteIndexEN(note);
      if (idx === -1) return full;
    }
    let newIdx = ((idx + semitones) % 12 + 12) % 12;
    return pre + notes[newIdx];
  });
}

/**
 * Transpone todo el contenido chordpro de una canción (array de bloques).
 */
function transposeBlocks(blocks, semitones, notation) {
  if (!semitones) return blocks;
  return blocks.map(block => {
    if (block.type === 'line') {
      const newChordpro = block.chordpro.replace(/\[([^\]]+)\]/g, (m, chord) => {
        return '[' + transposeChordString(chord, semitones, notation) + ']';
      });
      return { ...block, chordpro: newChordpro };
    }
    if (block.type === 'instrumental') {
      return { ...block, text: transposeChordString(block.text, semitones, notation) };
    }
    return block;
  });
}

function keyName(baseKey, semitones, notation) {
  const notes = notation === 'es' ? ES_NOTES : EN_NOTES;
  const idx = notation === 'es' ? noteIndexES(baseKey) : noteIndexEN(baseKey);
  if (idx === -1) return baseKey;
  const newIdx = ((idx + semitones) % 12 + 12) % 12;
  return notes[newIdx];
}
