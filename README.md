# BIVG — Business Intelligence Portfolio

Portfolio web profesional de **Marcos**, especialista en Business Intelligence. Construido con HTML, CSS y JavaScript puros, sin dependencias npm. Publicado en [bivg.es](https://bivg.es) vía GitHub Pages.

---

## Stack utilizado

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura de todas las páginas |
| CSS puro (main.css) | Estilos, variables CSS, animaciones, responsive |
| JavaScript vanilla | Scroll reveal, navbar, menú mobile |
| [Chart.js 4.4](https://www.chartjs.org/) | Dashboards interactivos (vía CDN) |
| Google Fonts | Syne, DM Sans, JetBrains Mono |
| SVG inline | Previews de portfolio, gauge OEE, pirámide edad |

---

## Estructura de archivos

```
bivg-portfolio/
├── index.html           # Portfolio principal
├── ventas.html          # Sales Performance Dashboard
├── rrhh.html            # HR Analytics Dashboard
├── financiero.html      # Financial Performance Dashboard
├── operaciones.html     # Operations Control Tower
├── 404.html             # Página de error (GitHub Pages)
├── robots.txt           # SEO
├── sitemap.xml          # SEO
├── CNAME                # Dominio personalizado bivg.es
├── assets/
│   ├── css/
│   │   └── main.css     # Todos los estilos compartidos
│   ├── img/
│   │   ├── og-card.png           # Imagen social (og:image) 1200x630
│   │   └── og-card-source.html   # Fuente HTML para regenerar la imagen
│   └── js/
│       └── main.js      # Scroll reveal + navbar + menú + filter pills
└── README.md
```

---

## Ejecutar en local

No se necesita servidor ni build. Simplemente abre `index.html` en cualquier navegador moderno:

```bash
# Opción 1: abrir directamente
open index.html        # macOS
start index.html       # Windows

# Opción 2: servidor local con Python
python -m http.server 8080
# Luego visita http://localhost:8080

# Opción 3: con Node.js (npx)
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
4. El sitio estará disponible en `https://TU_USUARIO.github.io/bivg-portfolio`

Para usar dominio personalizado `bivg.es`:
- Añade un archivo `CNAME` con el contenido `bivg.es`
- Configura el DNS de tu dominio con un registro A apuntando a las IPs de GitHub Pages

---

## Páginas incluidas

- **index.html** — Hero con badge de certificación, sobre mí, portfolio, stack tecnológico y contacto
- **ventas.html** — KPIs, evolución mensual, donut canal, top productos, barras agrupadas, regiones y bubble chart
- **rrhh.html** — KPIs, movimientos plantilla, departamentos, pirámide de edad, rotación/absentismo
- **financiero.html** — KPIs, waterfall P&L, cuenta de resultados, ingresos vs 2023, budget vs real, cashflow
- **operaciones.html** — KPIs, gauge OEE SVG, producción diaria, estado líneas, pedidos, heatmap lead time, Pareto

---

## Identidad visual

- **Fondo:** `#09090B` dark industrial
- **Acento:** `#F97316` naranja fuego
- **Tipografía display:** Syne 800
- **Tipografía cuerpo:** DM Sans 400
- **Tipografía mono:** JetBrains Mono
- Grain/noise texture sutil, grid lines decorativas, bordes con glow naranja en hover
