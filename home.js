document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // --- 2. Scroll Reveal Animation ---
    // Uses Intersection Observer to fade in elements when they enter the viewport
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1, // Triggers when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Run animation only once
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 3. Dynamic Number Counters ---
    // Animate numbers counting up in the Stats section
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const speed = 200; // Lower is faster
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    });
    
    // Attach observer to the parent banner to trigger all counters at once
    const statsBanner = document.querySelector('.stats-banner');
    if (statsBanner) {
        counterObserver.observe(statsBanner);
    }

    // --- 4. Interactive Form Handling (DOM Manipulation) ---
    const leadForm = document.getElementById('lead-form');
    const formMessage = document.getElementById('form-message');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            const practiceName = document.getElementById('practice').value;
            
            // Dynamic UI update
            formMessage.innerHTML = `✅ Audit requested for <strong>${practiceName}</strong>. Our team will contact you within 24 hours.`;
            formMessage.classList.remove('hidden');

            // Reset form fields
            leadForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        });
    }
});