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
      { type: 'line', chordpro: '[G]Oh Señor cuan innumerables son tus [D/G]obras, [C/G] [G]' },
      { type: 'line', chordpro: '[F]has hecho todas ellas con [C/E]sabiduría, [G/D] [C/D] [D/F#]' },
      { type: 'line', chordpro: '[G]aun el sol y los astros [D/F#]cuentan tus [Am]verdades, [Em]' },
      { type: 'line', chordpro: '[F]me gozo al saber que soy [C/E]tu hijo hoy. [C/A-G/B-C-D/F#]' },

      { type: 'section', label: 'Coro' },
      { type: 'line', chordpro: '[G]Tu eres mi Dios, [D/F#]te alabaré, [F]Tu me has hecho [E]hijo [Am]' },
      { type: 'line', chordpro: '[E/G#]tuyo yo te alabaré, [Am]Tu eres mi [D]Dios, [G][D/F#]' },
      { type: 'line', chordpro: '[F]te alabaré, [E]Tu me has hecho una [C/A]nueva [G/B]criatura [B/D#][Em7]' },
      { type: 'line', chordpro: '[Am]eres mi padre yo te alabaré. [D][G] //' },

      { type: 'section', label: 'Puente' },
      { type: 'line', chordpro: '[F]Nada puede igualar tu [C/E]grandeza, [G/D]dependemos [Bb]' },
      { type: 'line', chordpro: '[F/A]de tu señorío, [C]en ti espera mi vida, mi [Em][C/A]' },
      { type: 'line', chordpro: '[Em]razón mi alegría eres [F]Tu Oh [C/A]Señor. [D/F#]' },

      { type: 'section', label: 'Coro 2' },
      { type: 'line', chordpro: '[G]Tu eres mi Dios, [D/F#]te alabaré, [F]Tu me has hecho [E]hijo [Am]' },
      { type: 'line', chordpro: '[E/G#]tuyo yo te alabaré, [Am]Tu eres mi [D]Dios, [G][D/F#]' },
      { type: 'line', chordpro: '[F]te alabaré, [E]' },
      { type: 'line', chordpro: '[C/A]///Tu me has hecho una [G/B]nueva [B/D#]criatura [Em7]' },
      { type: 'line', chordpro: '[Am]Eres mi padre yo te alabaré.///[D][G]' },

      { type: 'instrumental', text: 'Intermedio musical /// C/A - G/B - B/D# Em7 /// Am D G D' },

      { type: 'section', label: 'Final' },
      { type: 'line', chordpro: '[C/A]///Tu me has hecho una [G/B]nueva [B/D#]criatura/// [Em7]' },
      { type: 'line', chordpro: '[Am]Eres mi padre yo te alabaré.// [D][G]' },
      { type: 'instrumental', text: 'Final: F - G' },
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
