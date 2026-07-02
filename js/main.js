// Flipbook viewer using PDF.js
let currentPage = 1;
let totalPages = 0;
let pdfDoc = null;
const scale = 2.0;
const thumbnailScale = 0.3;

// Set worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// URL de OneDrive convertida a descarga directa
const ONEDRIVE_URL = 'https://1drv.ms/b/c/5323a698abf18282/IQRvGr3Yt8qZFiVcQvpkPGk0JAP1IlVVuEBVQzNl4wJ6NU?download=1';

// Ruta local como fallback
const LOCAL_PDF_PATH = 'uploads/boletin.pdf';

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    showLoadingState();
    
    try {
        // Intenta primero con OneDrive
        console.log('Intentando cargar desde OneDrive...');
        await loadPDF(ONEDRIVE_URL);
        hideLoadingState();
        renderPage(currentPage);
        generateThumbnails();
        setupEventListeners();
    } catch (oneDriveError) {
        console.warn('Error loading from OneDrive, trying local file...', oneDriveError);
        
        try {
            // Fallback a archivo local
            console.log('Intentando cargar archivo local...');
            await loadPDF(LOCAL_PDF_PATH);
            hideLoadingState();
            renderPage(currentPage);
            generateThumbnails();
            setupEventListeners();
        } catch (localError) {
            console.error('Error loading local PDF:', localError);
            hideLoadingState();
            showErrorMessage(
                '<strong>⚠️ Error al cargar el PDF</strong>' +
                '<br><br>Por favor intenta una de las siguientes soluciones:' +
                '<br><br>1. <strong>Opción Local (Recomendada):</strong>' +
                '<br>   - Descarga tu PDF' +
                '<br>   - Crea una carpeta "uploads" en el proyecto' +
                '<br>   - Coloca el PDF como "uploads/boletin.pdf"' +
                '<br>   - Recarga la página' +
                '<br><br>2. <strong>Opción OneDrive:</strong>' +
                '<br>   - Abre el archivo en OneDrive' +
                '<br>   - Copia el link compartido' +
                '<br>   - Asegúrate que sea públicamente accesible'
            );
        }
    }
});

// Show loading indicator
function showLoadingState() {
    const flipbook = document.getElementById('flipbook');
    flipbook.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Cargando PDF...</p>
        </div>
    `;
}

// Hide loading indicator
function hideLoadingState() {
    const loader = document.querySelector('.loading-container');
    if (loader) {
        loader.remove();
    }
}

// Show error message
function showErrorMessage(message) {
    const flipbook = document.getElementById('flipbook');
    flipbook.innerHTML = `<div class="error-message">${message}</div>`;
}

// Load PDF document
async function loadPDF(url) {
    if (typeof pdfjsLib === 'undefined') {
        throw new Error('PDF.js library not loaded');
    }
    
    try {
        // Añade parámetro para evitar CORS
        const urlWithParams = url.includes('?') ? `${url}&nocache=${Date.now()}` : `${url}?nocache=${Date.now()}`;
        
        pdfDoc = await pdfjsLib.getDocument({
            url: urlWithParams,
            withCredentials: false,
            cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
            cMapPacked: true
        }).promise;
        
        totalPages = pdfDoc.numPages;
        updatePageInfo();
        console.log(`PDF cargado exitosamente. Total de páginas: ${totalPages}`);
    } catch (error) {
        throw new Error(`No se pudo cargar el PDF: ${error.message}`);
    }
}

// Render a specific page
async function renderPage(pageNumber) {
    if (!pdfDoc || pageNumber < 1 || pageNumber > totalPages) return;
    
    try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        // Render page to canvas
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
        
        // Clear previous content and add canvas
        const flipbook = document.getElementById('flipbook');
        flipbook.innerHTML = '';
        flipbook.appendChild(canvas);
        
        currentPage = pageNumber;
        updatePageInfo();
        updateActiveThumbnail();
    } catch (error) {
        console.error('Error rendering page:', error);
    }
}

// Generate thumbnails for all pages
async function generateThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    container.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        try {
            const page = await pdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: thumbnailScale });
            
            // Create canvas for thumbnail
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            // Render page to canvas
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // Create thumbnail wrapper
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (i === 1) thumbnail.classList.add('active');
            thumbnail.dataset.page = i;
            
            // Add page number
            const number = document.createElement('div');
            number.className = 'thumbnail-number';
            number.textContent = i;
            
            // Append canvas and number
            thumbnail.appendChild(canvas);
            thumbnail.appendChild(number);
            
            // Add click event
            thumbnail.addEventListener('click', () => {
                renderPage(i);
            });
            
            container.appendChild(thumbnail);
        } catch (error) {
            console.error(`Error generating thumbnail for page ${i}:`, error);
        }
    }
}

// Update page information
function updatePageInfo() {
    document.getElementById('pageInfo').textContent = `Página ${currentPage} de ${totalPages}`;
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

// Update active thumbnail
function updateActiveThumbnail() {
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    const activeThumbnail = document.querySelector(`[data-page="${currentPage}"]`);
    if (activeThumbnail) {
        activeThumbnail.classList.add('active');
        activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Setup button event listeners
function setupEventListeners() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            renderPage(currentPage - 1);
        }
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentPage < totalPages) {
            renderPage(currentPage + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            renderPage(currentPage - 1);
        } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            renderPage(currentPage + 1);
        }
    });
}
