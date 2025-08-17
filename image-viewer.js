/**
 * Interactive Image Viewer
 * A reusable popup image viewer with zoom and pan functionality
 */

class ImageViewer {
    constructor() {
        this.viewer = null;
        this.currentImage = null;
        this.zoomLevel = 1;
        this.minZoom = 0.5;
        this.maxZoom = 4;
        this.zoomStep = 0.25;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
        
        this.init();
    }
    
    init() {
        // Create viewer HTML structure
        this.createViewer();
        // Bind event handlers
        this.bindEvents();
    }
    
    createViewer() {
        const viewerHTML = `
            <div id="image-viewer" class="image-viewer">
                <div class="viewer-overlay"></div>
                <div class="viewer-container">
                    <button class="viewer-close" aria-label="Close viewer">×</button>
                    <div class="viewer-controls">
                        <button class="viewer-zoom-in" aria-label="Zoom in">+</button>
                        <button class="viewer-zoom-out" aria-label="Zoom out">−</button>
                        <button class="viewer-reset" aria-label="Reset zoom">Reset</button>
                        <span class="viewer-zoom-level">100%</span>
                    </div>
                    <div class="viewer-image-container">
                        <img class="viewer-image" alt="Enlarged view">
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', viewerHTML);
        this.viewer = document.getElementById('image-viewer');
    }
    
    bindEvents() {
        const closeBtn = this.viewer.querySelector('.viewer-close');
        const overlay = this.viewer.querySelector('.viewer-overlay');
        const zoomInBtn = this.viewer.querySelector('.viewer-zoom-in');
        const zoomOutBtn = this.viewer.querySelector('.viewer-zoom-out');
        const resetBtn = this.viewer.querySelector('.viewer-reset');
        const imageContainer = this.viewer.querySelector('.viewer-image-container');
        const image = this.viewer.querySelector('.viewer-image');
        
        // Close events
        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());
        
        // Zoom controls
        zoomInBtn.addEventListener('click', () => this.zoomIn());
        zoomOutBtn.addEventListener('click', () => this.zoomOut());
        resetBtn.addEventListener('click', () => this.resetZoom());
        
        // Mouse wheel zoom
        imageContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        });
        
        // Drag to pan
        image.addEventListener('mousedown', (e) => this.startDrag(e));
        image.addEventListener('mousemove', (e) => this.drag(e));
        image.addEventListener('mouseup', () => this.endDrag());
        image.addEventListener('mouseleave', () => this.endDrag());
        
        // Touch events for mobile
        image.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        image.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.drag(e.touches[0]);
        });
        image.addEventListener('touchend', () => this.endDrag());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (!this.viewer.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case '+':
                case '=':
                    this.zoomIn();
                    break;
                case '-':
                case '_':
                    this.zoomOut();
                    break;
                case '0':
                    this.resetZoom();
                    break;
            }
        });
    }
    
    open(imageSrc, altText = '') {
        const image = this.viewer.querySelector('.viewer-image');
        image.src = imageSrc;
        image.alt = altText;
        this.currentImage = image;
        
        // Reset state
        this.resetZoom();
        
        // Show viewer
        this.viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.viewer.classList.remove('active');
        document.body.style.overflow = '';
        this.currentImage = null;
    }
    
    zoomIn() {
        if (this.zoomLevel < this.maxZoom) {
            this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, this.maxZoom);
            this.applyZoom();
        }
    }
    
    zoomOut() {
        if (this.zoomLevel > this.minZoom) {
            this.zoomLevel = Math.max(this.zoomLevel - this.zoomStep, this.minZoom);
            this.applyZoom();
        }
    }
    
    resetZoom() {
        this.zoomLevel = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.applyZoom();
    }
    
    applyZoom() {
        if (!this.currentImage) return;
        
        this.currentImage.style.transform = `scale(${this.zoomLevel}) translate(${this.translateX}px, ${this.translateY}px)`;
        
        // Update zoom level display
        const zoomDisplay = this.viewer.querySelector('.viewer-zoom-level');
        zoomDisplay.textContent = `${Math.round(this.zoomLevel * 100)}%`;
        
        // Update button states
        const zoomInBtn = this.viewer.querySelector('.viewer-zoom-in');
        const zoomOutBtn = this.viewer.querySelector('.viewer-zoom-out');
        
        zoomInBtn.disabled = this.zoomLevel >= this.maxZoom;
        zoomOutBtn.disabled = this.zoomLevel <= this.minZoom;
    }
    
    startDrag(e) {
        if (this.zoomLevel <= 1) return;
        
        this.isDragging = true;
        this.startX = e.clientX - this.translateX;
        this.startY = e.clientY - this.translateY;
        this.currentImage.style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging || this.zoomLevel <= 1) return;
        
        e.preventDefault();
        this.translateX = e.clientX - this.startX;
        this.translateY = e.clientY - this.startY;
        
        // Apply limits to prevent image from going too far
        const maxTranslate = (this.zoomLevel - 1) * 100;
        this.translateX = Math.max(-maxTranslate, Math.min(maxTranslate, this.translateX));
        this.translateY = Math.max(-maxTranslate, Math.min(maxTranslate, this.translateY));
        
        this.applyZoom();
    }
    
    endDrag() {
        this.isDragging = false;
        if (this.currentImage) {
            this.currentImage.style.cursor = this.zoomLevel > 1 ? 'grab' : 'zoom-in';
        }
    }
}

// Initialize the image viewer
const imageViewer = new ImageViewer();

// Function to make any image clickable for the viewer
function makeImageViewable(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        // Add visual indicator that image is clickable
        element.style.cursor = 'zoom-in';
        
        // Add click handler
        element.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get image source
            let imageSrc;
            if (element.tagName === 'IMG') {
                imageSrc = element.src;
            } else {
                // If it's a container, find the image inside
                const img = element.querySelector('img');
                if (img) {
                    imageSrc = img.src;
                }
            }
            
            if (imageSrc) {
                imageViewer.open(imageSrc, element.alt || 'Artwork view');
            }
        });
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            if (!element.style.transition) {
                element.style.transition = 'transform 0.3s ease';
            }
            element.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Make Antumbra cover art viewable
    makeImageViewable('.cover-art');
    
    // You can add more images here in the future
    // Example: makeImageViewable('.artist-image');
});