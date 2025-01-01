document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');

    const nav = document.querySelector('nav');
    const navUl = nav.querySelector('ul');
    nav.insertBefore(menuToggle, navUl);

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        const isExpanded = navUl.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navUl.classList.remove('active');
            }
        });
    });

    // Form handling
    const quoteForm = document.getElementById('quoteForm');
    const quoteResult = document.getElementById('quoteResult');

    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = quoteForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Collect form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData.entries());

            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            quoteResult.innerHTML = `
                <div class="alert alert-success">
                    Thank you ${data.name}! We'll get back to you soon about your safari inquiry.
                </div>
            `;
            quoteForm.reset();

        } catch (error) {
            quoteResult.innerHTML = `
                <div class="alert alert-error">
                    Sorry, there was an error submitting your form. Please try again.
                </div>
            `;
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and itinerary items
    document.querySelectorAll('section, .item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});