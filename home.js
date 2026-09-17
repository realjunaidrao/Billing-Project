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

    // --- 4. Consultation Form API Integration ---
    const leadForm = document.getElementById('lead-form');
    const formMessage = document.getElementById('form-message');

    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = leadForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            const payload = {
                name: document.getElementById('practice').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formMessage.classList.add('hidden');

            try {
                const response = await fetch('http://127.0.0.1:8000/api/submissions/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || 'Server rejected the request.');
                }

                formMessage.innerHTML = `✅ <strong>Success!</strong> ${responseData.message || 'Consultation request submitted successfully.'}`;
                formMessage.style.backgroundColor = '#D1FAE5';
                formMessage.style.color = '#065F46';
                formMessage.classList.remove('hidden');
                leadForm.reset();
            } catch (error) {
                formMessage.textContent = `❌ ${error.message || 'Could not connect to the backend server.'}`;
                formMessage.style.backgroundColor = '#FEE2E2';
                formMessage.style.color = '#991B1B';
                formMessage.classList.remove('hidden');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});