// Flipbook viewer using PDF.js
let currentPage = 1;
let totalPages = 0;
let pdfDoc = null;
const scale = 2.0;
const thumbnailScale = 0.3;

// Set worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    // URL del PDF desde Google Drive (descarga directa)
    const pdfUrl = 'https://drive.google.com/uc?export=download&id=1pYaIsEbq7przqTOIopdF1Ek4nJLg1PBW';
    
    try {
        await loadPDF(pdfUrl);
        renderPage(currentPage);
        generateThumbnails();
        setupEventListeners();
    } catch (error) {
        console.error('Error loading PDF:', error);
        document.getElementById('flipbook').innerHTML = '<p style="color: red;">Error al cargar el PDF desde Google Drive. Verifica tu conexión a Internet.</p>';
    }
});

// Load PDF document
async function loadPDF(url) {
    if (typeof pdfjsLib === 'undefined') {
        throw new Error('PDF.js library not loaded');
    }
    
    try {
        pdfDoc = await pdfjsLib.getDocument(url).promise;
        totalPages = pdfDoc.numPages;
        updatePageInfo();
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
