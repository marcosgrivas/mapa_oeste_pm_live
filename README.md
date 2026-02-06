# Mapa de Territorios

Este proyecto publica un **mapa web interactivo** basado en **OpenStreetMap + Leaflet**, con una visualización clara de **territorios y manzanas**, pensado para uso real (orientación, asignación y consulta).

El desarrollo se hace **localmente** y GitHub Pages se usa **solo como publicación final**.

---

## 🧭 Qué muestra el mapa

- 🗺 **Mapa base**: OpenStreetMap
- 🟦 **Vista general**: Territorios (polígonos + etiquetas centradas)
- 🟨 **Vista de detalle**: Manzanas (polígonos + etiquetas)
- 🎨 Colores consistentes por `id_terr`
- 🏷 Etiquetas con halo blanco (sin cajas)

Regla de zoom:
- Zoom bajo → **solo territorios**
- Zoom alto → **solo manzanas**

---

## 📁 Estructura del proyecto

```
/mapa-territorios
│
├── index.html
├── manzanas.geojson
├── territorios.geojson
├── general.pdf
├── general.png
└── README.md
```

---

## 🛠 Requisitos

- Navegador moderno (Chrome, Edge, Firefox)
- **Servidor local** (imprescindible para `fetch()`)
- Python o VS Code (cualquiera de los dos alcanza)

---

## 🚀 Desarrollo local (RECOMENDADO)

### Opción A — Python (rápida y universal)

1. Abrí una terminal en la carpeta del proyecto
2. Ejecutá:

```bash
python -m http.server 8000
```

3. Abrí el navegador en:

```
http://localhost:8000
```

✔ Cambios en HTML / CSS / JS → **F5 y listo**

---

### Opción B — VS Code (cómoda)

1. Abrí el proyecto en VS Code
2. Instalá la extensión **Live Server**
3. Clic derecho en `index.html` → **Open with Live Server**

✔ Recarga automática
✔ Ideal para ajustar estilos y etiquetas

---

## ⚠️ Importante

- ❌ No abrir el archivo con doble click (`file://`)
- ❌ No desarrollar contra GitHub Pages
- ✔ Siempre usar servidor local

Leaflet y `fetch()` **necesitan HTTP**.

---

## 🔄 Flujo de trabajo recomendado

1. Desarrollo y pruebas **en local**
2. Ajuste fino de estilos, zoom y etiquetas
3. Cuando todo está correcto:

```bash
git add .
git commit -m "Ajustes de visualización del mapa"
git push
```

4. GitHub Pages publica la versión final

---

## 🎨 Colores de territorios

Los colores se asignan por `id_terr` y están definidos en la función:

```js
colorPorTerritorio(id)
```

Esto garantiza coherencia entre:
- QGIS
- Mapa web
- PDF impreso

---

## 🧩 Próximas mejoras posibles

- 📍 Ubicación del usuario
- 🧭 Botón "volver a vista general"
- 🧾 Popup con información por manzana
- 📱 Ajustes específicos para celular

---

## 🧠 Criterio de diseño

Este mapa prioriza:
- legibilidad
- simplicidad
- estabilidad

No busca mostrar todo al mismo tiempo, sino **mostrar lo correcto en cada escala**.

---

**Proyecto pensado para personas reales, no solo para verse bien en pantalla.**

