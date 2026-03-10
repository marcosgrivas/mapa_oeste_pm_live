# Project Overview

This is a web-based interactive map project. It displays geographical data for territories and city blocks (`manzanas`) on an OpenStreetMap base layer using the Leaflet.js library. The application is a single `index.html` file that loads polygon data from `territorios.geojson` and `manzanas.geojson`.

The core functionality includes:
-   Displaying territories at low zoom levels.
-   Displaying city blocks at high zoom levels.
-   A button to locate the user on the map.
-   A button to download a PDF map.

The project is structured as a simple static website, with no build process.

# How to Run the Project

This project must be run from a local web server because it uses the `fetch()` API to load GeoJSON files, which is subject to CORS policies when running from `file:///`.

### Using Python's built-in server:

1.  Open a terminal in the project's root directory.
2.  Run the following command:
    ```bash
    python -m http.server 8000
    ```
3.  Open your web browser and navigate to `http://localhost:8000`.

### Using VS Code Live Server:

1.  Install the "Live Server" extension in VS Code.
2.  Right-click on the `index.html` file.
3.  Select "Open with Live Server".

# Development Conventions

-   **Main File:** All the application logic is contained within `index.html`.
-   **Styling:** CSS is embedded in a `<style>` tag in the `<head>` of the `index.html` file.
-   **Logic:** JavaScript is embedded in a `<script>` tag at the end of the `<body>` in `index.html`.
-   **Data:** Geographical data is stored in `.geojson` files.
    -   `territorios.geojson`: Contains the polygons for the territories. Each feature has an `id_terr` property.
    -   `manzanas.geojson`: Contains the polygons for the city blocks. Each feature has an `id_mza` and an `id_terr` property.
-   **Map Behavior:**
    -   At zoom level 16 or higher, the map shows the `manzanas` layer.
    -   At zoom levels lower than 16, the map shows the `territorios` layer.
-   **Coloring:**
    -   The `README.md` and `colores.txt` indicate an intention to color territories based on `id_terr`.
    -   However, the current implementation in `index.html` uses a fixed color for all territories and another for all `manzanas`. The `colores.txt` file contains a mapping of territory IDs to hex color codes, which can be used to implement the intended coloring scheme.
