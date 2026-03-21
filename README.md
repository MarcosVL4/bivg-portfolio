# BIVG — Business Intelligence Portfolio

Portfolio web profesional de **Marcos**, especialista en Business Intelligence. Construido con HTML, CSS y JavaScript puros, sin dependencias npm. Publicado en [bivg.es](https://bivg.es) via GitHub Pages.

---

## Stack utilizado

| Tecnologia | Uso |
|---|---|
| HTML5 semantico | Estructura de todas las paginas |
| CSS puro (main.css) | Estilos, variables CSS, animaciones, responsive |
| JavaScript vanilla | Scroll reveal, navbar, menu mobile |
| [Chart.js 4.4](https://www.chartjs.org/) | Dashboards interactivos (via CDN) |
| Google Fonts | Syne, DM Sans, JetBrains Mono |
| SVG inline | Previews de portfolio, gauge OEE, piramide edad |

---

## Estructura de archivos

```
bivg-portfolio/
├── index.html           # Portfolio principal
├── ventas.html          # Sales Performance Dashboard
├── rrhh.html            # HR Analytics Dashboard
├── financiero.html      # Financial Performance Dashboard
├── operaciones.html     # Operations Control Tower
├── assets/
│   ├── css/
│   │   └── main.css     # Todos los estilos compartidos
│   └── js/
│       └── main.js      # Scroll reveal + navbar + menu
└── README.md
```

---

## Ejecutar en local

No se necesita servidor ni build. Simplemente abre `index.html` en cualquier navegador moderno:

```bash
# Opcion 1: abrir directamente
open index.html        # macOS
start index.html       # Windows

# Opcion 2: servidor local con Python
python -m http.server 8080
# Luego visita http://localhost:8080

# Opcion 3: con Node.js (npx)
npx serve .
```

---

## Desplegar en GitHub Pages

1. Crea un repositorio en GitHub (ej. `bivg-portfolio`)
2. Sube los archivos:

```bash
git init
git add .
git commit -m "feat: initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/bivg-portfolio.git
git push -u origin main
```

3. En GitHub → Settings → Pages → Source: **Deploy from branch** → `main` → `/ (root)`
4. El sitio estara disponible en `https://TU_USUARIO.github.io/bivg-portfolio`

Para usar dominio personalizado `bivg.es`:
- Añade un archivo `CNAME` con el contenido `bivg.es`
- Configura el DNS de tu dominio con un registro A apuntando a las IPs de GitHub Pages

---

## Paginas incluidas

- **index.html** — Hero con badge de certificacion, sobre mi, portfolio, stack tecnologico y contacto
- **ventas.html** — KPIs, evolucion mensual, donut canal, top productos, barras agrupadas, regiones y bubble chart
- **rrhh.html** — KPIs, movimientos plantilla, departamentos, piramide de edad, rotacion/absentismo
- **financiero.html** — KPIs, waterfall P&L, cuenta de resultados, ingresos vs 2023, budget vs real, cashflow
- **operaciones.html** — KPIs, gauge OEE SVG, produccion diaria, estado lineas, pedidos, heatmap lead time, Pareto

---

## Identidad visual

- **Fondo:** `#09090B` dark industrial
- **Acento:** `#F97316` naranja fuego
- **Tipografia display:** Syne 800
- **Tipografia cuerpo:** DM Sans 400
- **Tipografia mono:** JetBrains Mono
- Grain/noise texture sutil, grid lines decorativas, bordes con glow naranja en hover
