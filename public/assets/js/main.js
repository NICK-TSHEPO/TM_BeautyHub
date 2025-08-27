document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded');

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    if (!themeToggle || !themeIcon) {
        console.error('Theme toggle button or icon not found');
    } else {
        console.log('Theme toggle initialized');
        // Apply saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            console.log('Theme toggle clicked');
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeIcon.classList.toggle('fa-moon', !isDark);
            themeIcon.classList.toggle('fa-sun', isDark);
        });
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    } else {
        console.error('Menu toggle or nav menu not found');
    }

    // Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('#services-grid .service-card');
    const workItems = document.querySelectorAll('#work-grid .work-item');

    console.log('Filter buttons:', filterButtons.length);
    console.log('Service cards:', serviceCards.length);
    console.log('Work items:', workItems.length);

    const filterItems = (category) => {
        console.log('Filtering for category:', category);
        serviceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.classList.add('fade-in');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
                card.style.display = 'none';
            }
        });

        workItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.classList.add('fade-in');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.classList.remove('fade-in');
                item.style.display = 'none';
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-pink-700', 'text-white', 'active');
                btn.classList.add('bg-white', 'text-purple-800');
            });
            button.classList.add('bg-pink-700', 'text-white', 'active');
            filterItems(category);
        });
    });

    // Initialize with "All" filter
    filterItems('all');

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formMessage.textContent = "⚠️ Please fill in all fields.";
                formMessage.className = "text-red-600 dark:text-red-400 font-semibold";
                return;
            }

            if (!validateEmail(email)) {
                formMessage.textContent = "⚠️ Please enter a valid email address.";
                formMessage.className = "text-red-600 dark:text-red-400 font-semibold";
                return;
            }

            formMessage.textContent = "✅ Thank you! Your message has been sent.";
            formMessage.className = "text-green-600 dark:text-green-400 font-semibold";
            contactForm.reset();

            setTimeout(() => {
                formMessage.textContent = "";
            }, 4000);
        });
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Scroll Fade-In Animation
    const faders = document.querySelectorAll('.fade-in-section');
    const fadeOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

    const fadeOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    faders.forEach(fader => {
        fadeOnScroll.observe(fader);
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById("scroll-top");

    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});