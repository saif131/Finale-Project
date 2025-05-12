document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add responsive menu toggle for mobile
    const header = document.querySelector('header');
    if (header) {
        const nav = header.querySelector('nav');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'menu-toggle';
        toggleBtn.innerHTML = '&#9776;'; // Hamburger icon
        toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        header.insertBefore(toggleBtn, nav);
        
        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Add animation to tech cards on hover
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add click event to expand code containers
    const codeContainers = document.querySelectorAll('.code-container');
    codeContainers.forEach(container => {
        const heading = container.querySelector('h3');
        if (heading) {
            heading.style.cursor = 'pointer';
            const content = container.querySelector('pre, .table-responsive, .pdf-embed');
            if (content) {
                heading.addEventListener('click', () => {
                    content.classList.toggle('expanded');
                    heading.classList.toggle('expanded');
                });
            }
        }
    });
}); 