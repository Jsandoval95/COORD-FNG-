# FNG Boletín - Flipbook Viewer

Una aplicación web moderna y responsiva para visualizar documentos PDF como un flipbook interactivo.

## 🚀 Inicio rápido

1. **Coloca tu PDF** en la carpeta `uploads/boletin.pdf`
2. **Abre** `index.html` en tu navegador
3. **¡Disfruta!** Navega con los botones o teclado

## 📋 Guía de instalación detallada

### Opción 1: Abrir directamente (simple)
```
FNG/
└── index.html  ← Haz doble clic aquí
```

### Opción 2: Servidor local (recomendado)

**Con Python 3:**
```bash
cd FNG
python -m http.server 8000
# Luego abre: http://localhost:8000
```

**Con Node.js:**
```bash
cd FNG
npx http-server
# Luego abre: http://localhost:8080
```

## 🎮 Controles

| Acción | Método |
|--------|--------|
| Página siguiente | Botón "Siguiente →" o Flecha derecha |
| Página anterior | Botón "← Anterior" o Flecha izquierda |
| Ir a una página | Haz clic en su miniatura |

## ⚙️ Personalización

### Cambiar el archivo PDF
Edita `js/main.js`, línea 13:
```javascript
const pdfUrl = 'uploads/mi-documento.pdf'; // Cambia el nombre
```

### Cambiar colores
Edita `css/style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Cambia #667eea y #764ba2 por tus colores */
```

### Cambiar tamaño del visor
Edita `css/style.css`:
```css
.flipbook-wrapper {
    min-height: 600px; /* Aumenta o disminuye aquí */
}
```

## 📱 Responsive
- ✅ Desktop (pantallas grandes)
- ✅ Tablet (medianas)
- ✅ Móvil (pequeñas)

## 🔧 Tecnologías

- **HTML5**: Estructura
- **CSS3**: Estilos y diseño responsivo
- **JavaScript (Vanilla)**: Sin dependencias externas
- **PDF.js**: Renderizado de PDFs (CDN)

## 🐛 Solución de problemas

**P: Dice "Error al cargar el PDF"**
R: Verifica que:
- El archivo existe en `uploads/boletin.pdf`
- Está usando un servidor local (no abrir archivo directo)
- El archivo PDF no está dañado

**P: Las miniaturas son muy lentas**
R: 
- Usa un servidor local
- Reduce el tamaño del PDF
- Cierra otras pestañas

**P: No funciona en mi navegador antiguo**
R: Usa Chrome, Firefox, Safari o Edge actualizados (últimas 2 versiones)

## 📚 Estructura de carpetas

```
FNG/
├── index.html          (HTML principal)
├── README.md           (Este archivo)
├── QUICKSTART.md       (Esta guía rápida)
├── css/
│   └── style.css       (Estilos)
├── js/
│   └── main.js         (Lógica JavaScript)
└── uploads/
    └── boletin.pdf     (Tu archivo PDF)
```

## ✨ Características

✅ Visualización de PDF  
✅ Miniaturas de páginas  
✅ Navegación por teclado  
✅ Diseño responsivo  
✅ Sin dependencias externas (excepto PDF.js vía CDN)  
✅ Interfaz intuitiva  
✅ Indicador de página actual  

## 📝 Notas

- El archivo PDF se renderiza completamente en el navegador
- No se envían datos a servidores externos
- Funciona offline después del primer carga (excepto PDF.js)

## 🆘 ¿Problemas?

1. Abre la consola (F12 o Cmd+Option+I)
2. Busca mensajes de error rojos
3. Verifica que el archivo PDF existe
4. Reinicia el navegador

---

**FNG Boletín © 2026**
