// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Gallery Implementation
    const galleryGrid = document.querySelector('.gallery-grid');
    const images = [
        { src: 'images/1.png', alt: 'Safari Image 1' },
        { src: 'images/2.png', alt: 'Safari Image 2' },
        { src: 'images/3.png', alt: 'Safari Image 3' },
        { src: 'images/4.png', alt: 'Safari Image 4' },
        { src: 'images/5.png', alt: 'Safari Image 5' },
        { src: 'images/6.png', alt: 'Safari Image 6' },
        { src: 'images/7.png', alt: 'Safari Image 7' },
        { src: 'images/8.png', alt: 'Safari Image 8' },
        { src: 'images/9.png', alt: 'Safari Image 9' },
        { src: 'images/10.png', alt: 'Safari Image 10' },
        { src: 'images/11.png', alt: 'Safari Image 11' },
        { src: 'images/12.png', alt: 'Safari Image 12' },
        { src: 'images/13.png', alt: 'Safari Image 13' },
        { src: 'images/14.png', alt: 'Safari Image 14' }
    ];

    // Populate Gallery
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-aos', 'fade-up');
        galleryItem.setAttribute('data-aos-delay', index * 50);
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}">
        `;
        
        galleryGrid.appendChild(galleryItem);
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Video Background Optimization
    const video = document.getElementById('hero-video');
    if (video) {
        // Ensure video plays on mobile
        video.play().catch(function(error) {
            console.log("Video autoplay failed:", error);
        });

        // Pause video when not in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    }

    // Performance Optimization
    window.addEventListener('load', () => {
        // Lazy load images outside viewport
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if ('loading' in HTMLImageElement.prototype) {
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const lazyLoadScript = document.createElement('script');
            lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(lazyLoadScript);
        }
    });
});