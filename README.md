# Cancionero

App simple para ver letra y acordes en el celular/tablet mientras tocas, con transposición de tono y navegación entre canciones deslizando.

## Cómo subirlo a GitHub Pages

1. Creá un repositorio nuevo (puede ser público o privado si tenés GitHub Pages en un plan que lo permita).
2. Subí estos archivos tal cual (manteniendo las carpetas `css/` y `js/`):
   - `index.html`
   - `css/style.css`
   - `js/chords.js`
   - `js/songs.js`
   - `js/app.js`
3. En el repositorio: **Settings → Pages → Branch: main → carpeta `/root`** → Save.
4. En un par de minutos queda publicado en `https://tu-usuario.github.io/nombre-del-repo/`.

## Cómo agregar canciones nuevas

Todo el contenido vive en `js/songs.js`. Cada canción es un objeto con este formato:

```js
{
  id: 'identificador-unico',
  title: 'Nombre de la canción',
  author: 'Autor (opcional)',
  key: 'E',            // tono original, en la misma notación que uses abajo
  notation: 'en',       // 'en' para C D E F G A B, 'es' para DO RE MI FA SOL LA SI
  blocks: [
    { type: 'section', label: 'Estrofa 1' },
    { type: 'line', chordpro: '[E]Traemos hoy ante tu altar [Asus2]nuestras coronas' },
    { type: 'instrumental', text: 'Intro: E - A - E - A' },
    // ...
  ],
}
```

El acorde va pegado justo antes de la palabra o sílaba donde se toca, entre corchetes: `[Acorde]texto`.

Agregá el objeto nuevo dentro del array `SONGS`, con una coma después del anterior, y listo — aparece automáticamente en la lista y en la navegación.

## Pendiente

La canción "Abre Mis Ojos oh Cristo Señor" tiene un `{{completar}}` en la primera estrofa: en la foto original esa parte de la letra estaba tapada con un resaltador. Hay que reemplazar ese texto por la letra correcta directo en `js/songs.js`.
