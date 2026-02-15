document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('toggle');

        // Basic animation for opening (optional enhancement could go here)
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(18, 18, 18, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.textAlign = 'center';
        } else {
            navLinks.removeAttribute('style');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('toggle');
            }
        });
    });

    // Smooth Scrolling for Anchor Links (Handled by CSS scroll-behavior usually, but good fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Add CSS for fade-in-section dynamically or ensures it's in CSS
    // Let's add the class styling here in JS if not in CSS,
    // or arguably better to put in CSS. I'll inject a style tag for these specific animations
    // so I don't have to edit CSS again just for this.
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            will-change: opacity, visibility;
        }
        .fade-in-section.visible {
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(style);

    // Typing Effect for Hero Subtitle? (Maybe later)
});
