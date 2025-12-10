# Enterprise Dashboard (Vanilla JS)

A high-performance, static dashboard built with:
- **HTML5**
- **Tailwind CSS** (via CDN)
- **Chart.js**
- **Vanilla JavaScript** (No Frameworks)

## How to Run
This is a static website. You do not need `npm`, `node`, or a build server.

1. **Locate the folder** in your file explorer.
2. **Double-click** `index.html`.
3. The dashboard will open in your default browser.

## Project Structure
- `index.html`: The main entry point. Contains the layout skeleton.
- `assets/css/style.css`: Custom animations and scrollbar styles.
- `assets/js`:
    - `main.js`: Core logic for rendering components (Alerts, Inventory Table).
    - `charts.js`: Chart.js configurations (Revenue/Forecast Chart).
    - `data.js`: Mock data used across the application.

## Customization
- **Styling**: Most styling is handled via Tailwind utility classes in `index.html`. Custom CSS is in `assets/css/style.css`.
- **Data**: Edit `assets/js/data.js` to change the numbers and labels.
- **Charts**: Edit `assets/js/charts.js` to modify the chart appearance.

## Dependencies (CDNs)
- Tailwind CSS: `cdn.tailwindcss.com`
- Chart.js: `cdn.jsdelivr.net`
- Lucide Icons: `unpkg.com/lucide`
