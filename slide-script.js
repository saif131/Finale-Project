document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const slideCounter = document.getElementById('slide-counter');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const closeMenuBtn = document.getElementById('close-menu');
    const slideNavMenu = document.querySelector('.slide-nav-menu');
    const menuItems = document.querySelectorAll('.slide-nav-menu li');    let currentSlideIndex = 0;
    
    // Array of actual slide IDs that exist (mapping navigation index to slide ID)
    const slideIds = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,           // 0-9: slides 1-10
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,  // 10-19: slides 11-20
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,  // 20-29: slides 21-30
        31, 32, 35, 36, 37, 38, 39, 40, 41       // 30-38: slides 31-32, then 35-41
    ];
    
    const totalSlides = slideIds.length;
    
    // Update slide counter display
    function updateSlideCounter() {
        slideCounter.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
    }    // Show specific slide
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
        
        // Show the current slide using the mapped slide ID
        const actualSlideId = slideIds[index];
        const targetSlide = document.getElementById(`slide-${actualSlideId}`);
        if (targetSlide) {
            targetSlide.classList.add('active');
        }
        
        currentSlideIndex = index;
        
        // Update counter
        updateSlideCounter();
        
        // Update active menu item
        menuItems.forEach(item => {
            item.classList.remove('active');
            const slideNumber = item.getAttribute('data-slide');
            if (slideNumber !== null && parseInt(slideNumber) === index) {
                item.classList.add('active');
            }
        });
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
    closeMenuBtn.addEventListener('click', closeMenu);    // Add event listeners to menu items
    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            const slideNumber = item.getAttribute('data-slide');
            if (slideNumber !== null) {
                showSlide(parseInt(slideNumber));
                closeMenu();
            }
            // If it's a section header without data-slide, do nothing
        });
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
            // Escape key closes menu
            closeMenu();
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
}); 
