// 1. Mapa base
  const map = L.map('map').setView([-42.768, -65.038], 14); // ajustamos después

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // 2. Ubicación del usuario
  let userMarker;

  function locateUser() {
    map.locate({ setView: true, maxZoom: 17 });
  }

  map.on('locationfound', e => {
    if (userMarker) map.removeLayer(userMarker);
    userMarker = L.circleMarker(e.latlng, {
      radius: 8,
      fillColor: '#007bff',
      color: '#fff',
      weight: 2,
      fillOpacity: 1
    }).addTo(map);
  });

  map.on('locationerror', () => {
    alert('No se pudo obtener la ubicación.');
  });

// CAPAS QGIS
let layerTerritorios;
let layerManzanas;

const territoryLabels = [];
const manzanaLabels = [];

// Cargar territorios
fetch('data/territorios.geojson')
  .then(res => res.json())
  .then(data => {
    layerTerritorios = L.geoJSON(data, {
      style: feature => ({
        color: '#000000',
        weight: 2,
        fillOpacity: 0
      }),
      onEachFeature: (feature, layer) => {
        const center = layer.getBounds().getCenter();
        const labelStyle = 'font-weight: bold; color: white; background: black; border-radius: 50%; text-align: center; transform: translate(-50%, -50%);';
        const label = L.marker(center, {
          icon: L.divIcon({
            className: '', // No class
            html: `<div style="${labelStyle}">${feature.properties.id_terr}</div>`
          })
        }).addTo(map);
        territoryLabels.push(label);
      }
    });
    layerTerritorios.addTo(map); // visible por defecto
    map.fire('zoomend'); // Trigger initial sizing
  });

// Cargar manzanas
fetch('data/manzanas.geojson')
  .then(res => res.json())
  .then(data => {
    layerManzanas = L.geoJSON(data, {
      style: feature => ({
        stroke: false,
        fillColor: '#b8a47a',
        fillOpacity: 0.6
      }),
      onEachFeature: (feature, layer) => {
        const center = layer.getBounds().getCenter();
        const labelStyle = 'font-weight: 300; color: black; transform: translate(-50%, -50%); white-space: nowrap; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;';
        const label = L.marker(center, {
          icon: L.divIcon({
            className: '', // No class
            html: `<div style="${labelStyle}">${feature.properties.id_mza}</div>`
          })
        }).addTo(map);
        manzanaLabels.push(label);
      }
    });
    layerManzanas.addTo(map);
    map.fire('zoomend'); // Trigger initial sizing
  });

// === Dynamic Label Sizing ===
map.on('zoomend', function () {
  const zoom = map.getZoom();
  // Formula to calculate meters per pixel at a certain zoom level and latitude
  const metersPerPixel = 156543.03 * Math.cos(map.getCenter().lat * Math.PI / 180) / Math.pow(2, zoom);

  // --- CONFIGURACIÓN MANUAL "METERS AT SCALE" ---
  // Define el tamaño que quieres que la etiqueta ocupe en el "mundo real", en metros.
  // Cámbialos hasta que estés conforme.
  const manzanaLabelHeightMeters = 8;   // Altura del texto de la manzana en metros
  const territoryLabelHeightMeters = 25; // Altura del texto del territorio en metros
  // -----------------------------------------

  const newManzanaFontSize = Math.round(manzanaLabelHeightMeters / metersPerPixel);
  const newTerritoryFontSize = Math.round(territoryLabelHeightMeters / metersPerPixel);

  // Apply styles to manzana labels
  manzanaLabels.forEach(label => {
    const element = label.getElement();
    if (element) {
      const div = element.firstChild;
      div.style.fontSize = `${newManzanaFontSize}px`;
    }
  });

  // Apply styles to territory labels
  territoryLabels.forEach(label => {
    const element = label.getElement();
    if (element) {
      const div = element.firstChild;
      div.style.fontSize = `${newTerritoryFontSize}px`;

      // Adjust circle size based on font size
      const newSize = newTerritoryFontSize * 1.6; // 1.6 is a good multiplier
      div.style.width = `${newSize}px`;
      div.style.height = `${newSize}px`;
      div.style.lineHeight = `${newSize}px`;
    }
  });
});
