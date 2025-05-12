document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const slideCounter = document.getElementById('slide-counter');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const closeMenuBtn = document.getElementById('close-menu');
    const slideNavMenu = document.querySelector('.slide-nav-menu');
    const menuItems = document.querySelectorAll('.slide-nav-menu li');
    
    // Modal elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal-close');
    
    let currentSlideIndex = 0;
    const totalSlides = 38;
    
    // Update slide counter display
    function updateSlideCounter() {
        slideCounter.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
    }
    
    // Show specific slide
    function showSlide(index) {
        // Handle out of bounds indices
        if (index < 0) {
            index = 0;
        } else if (index >= totalSlides) {
            index = totalSlides - 1;
        }
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the current slide
        slides[index].classList.add('active');
        currentSlideIndex = index;
        
        // Update counter
        updateSlideCounter();
        
        // Update active menu item
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        menuItems[currentSlideIndex].classList.add('active');
    }
    
    // Navigate to previous slide
    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }
    
    // Navigate to next slide
    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }
    
    // Toggle navigation menu
    function toggleMenu() {
        slideNavMenu.classList.toggle('active');
    }
    
    // Close navigation menu
    function closeMenu() {
        slideNavMenu.classList.remove('active');
    }
    
    // Add event listeners to buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    menuToggleBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    
    // Add event listeners to menu items
    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showSlide(index);
            closeMenu();
        });
    });
    
    // Make all images in slides clickable
    const makeImagesClickable = () => {
        // Find all images in slides (except for small icons)
        const slidesImages = document.querySelectorAll('.visualization-image, .powerbi-image img, .tableau-image img, .sql-query-image-item img, .visualization-result img, .dataframe-output img, .finding-card img, .team-member-img img:not([width="100"]):not([height="100"])');
        
        slidesImages.forEach(img => {
            // Add zoomable class to all images
            img.classList.add('zoomable');
            
            // Add click event listener
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        });
    };
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Arrow key navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
            // Right arrow, Space, or Page Down goes to next slide
            nextSlide();
        } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
            // Left arrow or Page Up goes to previous slide
            prevSlide();
        } else if (event.key === 'Home') {
            // Home key goes to first slide
            showSlide(0);
        } else if (event.key === 'End') {
            // End key goes to last slide
            showSlide(totalSlides - 1);
        } else if (event.key === 'Escape') {
            // Escape key closes menu or modal
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            } else {
                closeMenu();
            }
        }
    });
    
    // Touch events for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const threshold = 100; // Minimum swipe distance
        
        // Left swipe (next slide)
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        }
        
        // Right swipe (previous slide)
        if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
    
    // Automatically adjust to window resizing
    window.addEventListener('resize', () => {
        // Refresh the current slide display if needed
        showSlide(currentSlideIndex);
    });
    
    // Initialize with the first slide
    showSlide(0);
    
    // Make images clickable after a short delay to ensure all content is loaded
    setTimeout(makeImagesClickable, 1000);
    
    // Also make images clickable when the page fully loads
    window.onload = makeImagesClickable;
}); 