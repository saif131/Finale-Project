document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const slideCounter = document.getElementById('slide-counter');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const closeMenuBtn = document.getElementById('close-menu');
    const slideNavMenu = document.querySelector('.slide-nav-menu');
    const menuItems = document.querySelectorAll('.slide-nav-menu li');
    
    let currentSlideIndex = 0;
    const totalSlides = 41;
    
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