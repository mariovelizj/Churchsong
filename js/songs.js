/* songs.js
   Banco de canciones. Cada canción:
   - id, title, author (opcional), key (tono original), notation ('es' | 'en')
   - blocks: array de bloques tipo 'section' | 'line' | 'instrumental'
   Sintaxis de acordes en 'line': formato ChordPro -> [Acorde]letra pegada al acorde
*/

const SONGS = [
  {
    id: 'abre-mis-ojos',
    title: 'Abre Mis Ojos oh Cristo Señor',
    author: '',
    key: 'MI',
    notation: 'es',
    needsReview: true, // una parte de la letra estaba tapada en la foto original
    blocks: [
      { type: 'section', label: 'Estrofa' },
      { type: 'line', chordpro: '// [MI]Abre mis ojos oh Cristo, abre mis ojos [SI]{{completar}},' },
      { type: 'line', chordpro: '[LA]yo quiero verte, yo quiero [MI]verte. //' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: '[SI]Contemplar tu majestad [DO#m]y el resplandor [LA]de tu gloria, [SI]' },
      { type: 'line', chordpro: '[SI]derrama tu amor y poder [DO#m]cuando cantamos [LA]Santo, [SI]Santo. //' },

      { type: 'section', label: 'Final' },
      { type: 'line', chordpro: '[MI]Santo, Santo, Santo, Santo, [SI]Santo, Santo,' },
      { type: 'line', chordpro: '[LA]Santo, Santo, Santo, yo quiero [MI]verte. //' },
    ],
  },

  {
    id: 'te-dare-lo-mejor',
    title: 'Te Daré lo Mejor de Mi Vida',
    author: 'Jesús Adrián Romero',
    key: 'E',
    notation: 'en',
    needsReview: false,
    blocks: [
      { type: 'instrumental', text: 'Intro: // E - A - E - A //' },

      { type: 'section', label: 'Estrofa 1' },
      { type: 'line', chordpro: '[E]Traemos hoy ante tu altar [Asus2]nuestras coronas, [E][Bsus2]' },
      { type: 'line', chordpro: '[E]queremos darte lo mejor [Asus2]de nuestras [E]vidas. [Bsus2]' },

      { type: 'section', label: 'Pre-Coro' },
      { type: 'line', chordpro: '[F#m7]Te entregaré mi amor [C#m]entero,' },
      { type: 'line', chordpro: '[Asus2]los sueños que logré [Bsus2]alcanzar.' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: '[C#m]Te daré lo mejor [Asus2]de mi [E]vida,' },
      { type: 'line', chordpro: '[C#m]te daré lo mejor [Asus2]cada [Bsus2]día.' },
      { type: 'line', chordpro: '[G#sus4]Será mucho más [G#]que una [C#m]canción,' },
      { type: 'line', chordpro: '[Asus2]mi obediencia es mi mejor [F#m]adoración. [Bsus2]' },

      { type: 'instrumental', text: 'Intro: / E - A - E - A /' },

      { type: 'section', label: 'Estrofa 2' },
      { type: 'line', chordpro: '[E]Traemos hoy ante tu altar [Asus2]nuestras coronas, [E][Bsus2]' },
      { type: 'line', chordpro: '[E]queremos darte lo mejor [Asus2]de nuestras [E]vidas. [Bsus2]' },

      { type: 'section', label: 'Pre-Coro 2' },
      { type: 'line', chordpro: '[F#m7]Daremos solo las [C#m]primicias,' },
      { type: 'line', chordpro: '[Asus2]pues tú mereces lo [Bsus2]mejor.' },

      { type: 'section', label: 'Coro (x2)' },
      { type: 'line', chordpro: '[C#m]Te daré lo mejor [Asus2]de mi [E]vida,' },
      { type: 'line', chordpro: '[C#m]te daré lo mejor [Asus2]cada [Bsus2]día.' },
      { type: 'line', chordpro: '[G#sus4]Será mucho más [G#]que una [C#m]canción,' },
      { type: 'line', chordpro: '[Asus2]mi obediencia es mi mejor [F#m]adoración. [Bsus2]' },

      { type: 'section', label: 'Puente' },
      { type: 'instrumental', text: 'C#m - Asus2 - C#m - Bsus2' },

      { type: 'section', label: 'Pre-Coro 2' },
      { type: 'line', chordpro: '[F#m7]Daremos solo las [C#m]primicias,' },
      { type: 'line', chordpro: '[Asus2]pues tú mereces lo [Bsus2]mejor.' },

      { type: 'section', label: 'Coro (x2)' },
      { type: 'line', chordpro: '[C#m]Te daré lo mejor [Asus2]de mi [E]vida,' },
      { type: 'line', chordpro: '[C#m]te daré lo mejor [Asus2]cada [Bsus2]día.' },
      { type: 'line', chordpro: '[G#sus4]Será mucho más [G#]que una [C#m]canción,' },
      { type: 'line', chordpro: '[Asus2]mi obediencia es mi mejor [F#m]adoración. [Bsus2]' },

      { type: 'section', label: 'Final' },
      { type: 'line', chordpro: '[E]Te daré lo mejor [A]de mi [B]' },
      { type: 'line', chordpro: '[C#m]Te daré lo mejor [Bsus2] [Asus2]' },
    ],
  },

  {
    id: 'oh-senor',
    title: 'Oh Señor',
    author: 'Marcos Vidal',
    key: 'G',
    notation: 'en',
    needsReview: false,
    blocks: [
      { type: 'instrumental', text: 'Intro: /// C/A - G/B - B/D# Em7 /// Am D G D' },

      { type: 'section', label: 'Estrofa' },
      { type: 'line', chordpro: '[G]Oh [D/G]Señor cuan [C/G]innumerables son [G]tus obras,' },
      { type: 'line', chordpro: 'has [F]hecho todas [C/E]ellas con [G/D]sabiduría, [C/D] [D/F#]' },
      { type: 'line', chordpro: '[G]aun el [D/F#]sol y los [Am]astros cuentan [Em]tus verdades,' },
      { type: 'line', chordpro: 'me [F]gozo al [C/E]saber que soy tu hijo [C/A-G/B-C-D/F#]hoy.' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: 'Tu eres mi [G][D/F#]Dios, te [F][E]alabaré, Tu me has [Am]hecho hijo' },
      { type: 'line', chordpro: '[E/G#]tuyo yo te [Am][D]alabaré, Tu eres mi [G]Dios, [D/F#]' },
      { type: 'line', chordpro: 'te [F][E]alabaré, Tu me has [C/A][G/B]hecho una [B/D#]nueva [Em7]criatura' },
      { type: 'line', chordpro: 'Eres mi [Am]padre yo te [D][G]alabaré. [D]' },

      { type: 'section', label: 'Puente' },
      { type: 'line', chordpro: 'Nada [F]puede [C/E]igualar tu [G/D]grandeza, [Bb]dependemos' },
      { type: 'line', chordpro: 'de [F/A]tu [C]señorío, en ti [Em]espera [C/A]mi vida, mi' },
      { type: 'line', chordpro: '[Em]razón [F]mi alegría eres [C/A]Tu Oh [C/A-G/B-C]Señor. [D/F#]' },

      { type: 'section', label: 'Coro 2' },
      { type: 'line', chordpro: 'Tu eres mi [G][D/F#]Dios, te [F][E]alabaré, Tu me has [Am]hecho hijo' },
      { type: 'line', chordpro: '[E/G#]tuyo yo te [Am][D]alabaré, Tu eres mi [G]Dios, [D/F#]' },
      { type: 'line', chordpro: 'te [F]alabaré, [E]' },
      { type: 'line', chordpro: 'Tu me has [C/A][G/B]hecho una [B/D#]nueva [Em7]criatura' },
      { type: 'line', chordpro: 'Eres mi [Am]padre yo te [D][G]alabaré. [D]' },

      { type: 'instrumental', text: 'Intermedio musical: /// C/A - G/B - B/D# Em7 /// Am D G D' },

      { type: 'section', label: 'Final' },
      { type: 'line', chordpro: 'Tu me has [C/A][G/B]hecho una [B/D#]nueva [Em7]criatura' },
      { type: 'line', chordpro: 'Eres mi [Am]padre yo te [D][G]alabaré.' },
      { type: 'instrumental', text: 'Final: F - G' },
    ],
  },

  {
    id: 'senor-te-exaltamos',
    title: 'Señor te Exaltamos',
    author: 'Semilla de Mostaza',
    key: 'A',
    notation: 'en',
    needsReview: false,
    blocks: [
      { type: 'instrumental', text: 'Intro: // Amaj7 - D2/A // (x8)   luego Dmaj7 - C#m7 - D/E' },

      { type: 'section', label: 'Estrofa' },
      { type: 'line', chordpro: '[A]Señor te exaltamos [A/C#]y te damos [D]loor con [D/E]nuestras [E/F#]voces' },
      { type: 'line', chordpro: '[A]te [A/C#]alabamos hoy nuestro gran [D]Dios [D/E] [C#/F#]' },
      { type: 'line', chordpro: '[F#m]venimos ante [C#m7]ti [Bm7]dándote gloria [A/G]y [G/F]alabanza' },
      { type: 'line', chordpro: '[A/E]porque tú eres [D/E]grande oh mi [A]Señor' },
      { type: 'instrumental', text: '1ª vez: Dmaj7 - C#m7 - D/E     2ª vez: D - A' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: 'Señor tú eres [Bm7]digno, [E][E/G#]Señor tú eres [Amaj7]digno [Em7]' },
      { type: 'line', chordpro: 'eres [G#m7b5]digno de [C#m][F#m7]adoración' },
      { type: 'instrumental', text: '(se repite: "Señor te exaltamos...")' },

      { type: 'section', label: 'Estrofa 2' },
      { type: 'line', chordpro: '[A#dim][Bm7]Toda la tierra [A/C#]te adorará' },
      { type: 'line', chordpro: '[D]bendecirá a Aquel que [E2/G#]nos [G/A]libertó' },
      { type: 'line', chordpro: '[D]Abriré mi boca, [A]y [G#m7b5]ti [C#m]cantaré' },
      { type: 'line', chordpro: '[F#m]gloria a [B6][Em7]ti, yo te [F#/A]daré' },

      { type: 'section', label: 'Coro 2' },
      { type: 'line', chordpro: '[Dmaj7]Hosanna, [A/C#]Cordero del [F#m7]Señor [C6]' },
      { type: 'line', chordpro: '[A/B][E][C#]hosanna, [F#m]gloria a [B6]ti [Em7]yo te [F#/A]daré' },
      { type: 'line', chordpro: '[Bm7]porque tú eres [D/E]grande, oh mi [A]Señor [F#m7]' },
    ],
  },

  {
    id: 'gozo-servir-cristo',
    title: 'Gozo da Servir a Cristo',
    author: 'Himno 471',
    key: 'E',
    notation: 'en',
    needsReview: false,
    blocks: [
      { type: 'section', label: 'Estrofa 1' },
      { type: 'line', chordpro: '[E]Gozo da servir a Cristo [B7][E]' },
      { type: 'line', chordpro: '[A]en la vida diaria [E]aquí;' },
      { type: 'line', chordpro: '[B]gozo, y grande [E]alegría,' },
      { type: 'line', chordpro: '[Gb]siempre Él me da a [Gb7]mí. [B]' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: '[E]Gozo hay, sí, en servir a Cristo, [C#][C#7]' },
      { type: 'line', chordpro: '[Gbm]gozo en el corazón. [Gb7][B][Gb][B]' },
      { type: 'line', chordpro: '[E]Cada día Él da poder, [Gbm][B]' },
      { type: 'line', chordpro: '[B]me ayuda a vencer [E]' },
      { type: 'line', chordpro: '[A]y da gozo, gozo en el corazón. [C#7][Gbm][A][E][B][E]' },

      { type: 'section', label: 'Estrofa 2' },
      { type: 'line', chordpro: '[E]Gozo da servir a Cristo, [B7][E]' },
      { type: 'line', chordpro: '[A]gozo que triunfante [E]está' },
      { type: 'line', chordpro: '[B]en la pena o [E]tristeza:' },
      { type: 'line', chordpro: '[Gb]Cristo en todo vence [Gb7]ya. [B]' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: '[E]Gozo hay, sí, en servir a Cristo, [C#][C#7]' },
      { type: 'line', chordpro: '[Gbm]gozo en el corazón. [Gb7][B][Gb][B]' },
      { type: 'line', chordpro: '[E]Cada día Él da poder, [Gbm][B]' },
      { type: 'line', chordpro: '[B]me ayuda a vencer [E]' },
      { type: 'line', chordpro: '[A]y da gozo, gozo en el corazón. [C#7][Gbm][A][E][B][E]' },

      { type: 'section', label: 'Estrofa 3' },
      { type: 'line', chordpro: '[E]Gozo da servir a Cristo, [B7][E]' },
      { type: 'line', chordpro: '[A]aunque solo ande [E]yo;' },
      { type: 'line', chordpro: '[B]es el gozo [E]permanente' },
      { type: 'line', chordpro: '[Gb]que el Calvario nos [Gb7]logró. [B]' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: '[E]Gozo hay, sí, en servir a Cristo, [C#][C#7]' },
      { type: 'line', chordpro: '[Gbm]gozo en el corazón. [Gb7][B][Gb][B]' },
      { type: 'line', chordpro: '[E]Cada día Él da poder, [Gbm][B]' },
      { type: 'line', chordpro: '[B]me ayuda a vencer [E]' },
      { type: 'line', chordpro: '[A]y da gozo, gozo en el corazón. [C#7][Gbm][A][E][B][E]' },

      { type: 'section', label: 'Estrofa 4' },
      { type: 'line', chordpro: '[E]Gozo da servir a Cristo, [B7][E]' },
      { type: 'line', chordpro: '[A]gozo en la [E]oscuridad,' },
      { type: 'line', chordpro: '[B]porque tengo el [E]secreto' },
      { type: 'line', chordpro: '[Gb]de la Luz y la [Gb7]Verdad. [B]' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: '[E]Gozo hay, sí, en servir a Cristo, [C#][C#7]' },
      { type: 'line', chordpro: '[Gbm]gozo en el corazón. [Gb7][B][Gb][B]' },
      { type: 'line', chordpro: '[E]Cada día Él da poder, [Gbm][B]' },
      { type: 'line', chordpro: '[B]me ayuda a vencer [E]' },
      { type: 'line', chordpro: '[A]y da gozo, gozo en el corazón. [C#7][Gbm][A][E][B][E]' },
    ],
  },
];
