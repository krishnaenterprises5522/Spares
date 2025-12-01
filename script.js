// We use the PDF.js library loaded in HTML
const url = './LS.pdf';

// Set the worker source (required for PDF.js)
pdfjsLib.GlobalWorkerOptions.workerSrc = 
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

const container = document.getElementById('pdf-container');

// Load the PDF
pdfjsLib.getDocument(url).promise.then(pdf => {
    console.log('PDF Loaded. Total pages: ' + pdf.numPages);

    // Loop through every page in the PDF
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        renderPage(pdf, pageNum);
    }

}).catch(err => {
    console.error('Error loading PDF:', err);
    container.innerHTML = `<p style="text-align:center; padding:20px;">
        Error loading document.<br>
        Please check that <b>LS.pdf</b> is in the same folder.
    </p>`;
});

// Function to render a single page
function renderPage(pdf, pageNum) {
    pdf.getPage(pageNum).then(page => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        container.appendChild(canvas);

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        page.render(renderContext);
    });
}
