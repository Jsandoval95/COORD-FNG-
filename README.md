# FNG Boletín - Flipbook

Visualizador de boletines en formato flipbook interactivo.

## Descripción

Esta página permite visualizar documentos PDF de forma interactiva con navegación por páginas, similar a un libro digital. Incluye miniaturas de todas las páginas para fácil acceso.

## Características

✨ **Funcionalidades**
- Visualización de PDF en navegador
- Navegación página por página
- Miniaturas de todas las páginas
- Controles mediante botones y teclado
- Responsive y adaptable a móviles
- Interfaz limpia y moderna

## Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/coordinacioncomunicacionfng-max/FNG.git
   cd FNG
   ```

2. **Crea la carpeta de archivos**
   ```bash
   mkdir -p uploads
   ```

3. **Agrega tu archivo PDF**
   - Coloca tu archivo PDF en la carpeta `uploads/`
   - Renómbralo como `boletin.pdf` (o cambia el nombre en `js/main.js`)

4. **Abre en el navegador**
   - Abre `index.html` directamente en tu navegador
   - O usa un servidor local (recomendado para mejor rendimiento)

### Usar servidor local (opcional)

Con Python 3:
```bash
python -m http.server 8000
```

Con Node.js:
```bash
npx http-server
```

Luego accede a `http://localhost:8000` en tu navegador.

## Uso

### Controles de navegación
- **Botones**: Usa "Anterior" y "Siguiente" para navegar
- **Teclado**: Usa flechas izquierda (←) y derecha (→)
- **Miniaturas**: Haz clic en cualquier miniatura para ir a esa página

## Estructura de archivos

```
FNG/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos CSS
├── js/
│   └── main.js            # Lógica del flipbook (PDF.js incluido vía CDN)
├── uploads/
│   └── boletin.pdf        # Tu archivo PDF aquí
└── README.md              # Este archivo
```

## Cambiar el archivo PDF

Edita la línea en `js/main.js`:

```javascript
const pdfUrl = 'uploads/boletin.pdf'; // Cambia aquí
```

Reemplaza `'uploads/boletin.pdf'` con la ruta a tu archivo PDF.

## Compatibilidad

- ✅ Chrome/Chromium (v60+)
- ✅ Firefox (v55+)
- ✅ Safari (v12+)
- ✅ Edge (v79+)
- ✅ Navegadores móviles modernos

## Solución de problemas

### "Error al cargar el PDF"
- Verifica que el archivo existe en la carpeta `uploads/`
- Asegúrate de que el nombre del archivo coincida con el especificado en `main.js`
- Si usas un servidor local, intenta limpiar la caché del navegador

### Las miniaturas no se generan
- Asegúrate de que JavaScript está habilitado
- Verifica la consola del navegador (F12) para mensajes de error
- Intenta cargar de nuevo la página

### Rendimiento lento
- Usa un servidor local en lugar de abrir directamente el archivo
- Reduce el tamaño del PDF si es muy grande
- Prueba en un navegador diferente

## Próximas mejoras posibles

- Zoom in/out
- Descarga de PDF
- Pantalla completa
- Búsqueda en el documento
- Modo oscuro
- Anotaciones

## Licencia

FNG Boletín © 2026

## Requisitos técnicos

- Navegador web moderno con soporte para Canvas
- JavaScript habilitado
- Acceso a CDN de PDF.js (https://cdnjs.cloudflare.com)

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para detalles de errores.
