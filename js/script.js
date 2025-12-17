
        // Menu mobile
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Emp\u00eacher la propagation du clic
                navLinks.classList.toggle('active');
            });

            // Fermer le menu quand on clique sur un lien
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

            // Fermer le menu quand on clique en dehors
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav')) {
                    navLinks.classList.remove('active');
                }
            });
        }

        // Smooth scroll
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

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci pour votre message ! Nous vous contacterons très bientôt.');
            e.target.reset();
        });
        // Initialiser AOS (Animate On Scroll)
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100
        });

        // Animate stats numbers
        const animateStats = () => {
            const statNumbers = document.querySelectorAll('.stat-number');
            let hasAnimated = false;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        statNumbers.forEach(stat => {
                            const finalValue = stat.textContent;
                            const number = parseInt(finalValue);
                            let currentValue = 0;
                            const increment = number / 50;
                            const duration = 1500;
                            const steps = 50;
                            const stepDuration = duration / steps;

                            const counter = setInterval(() => {
                                currentValue += increment;
                                if (currentValue >= number) {
                                    stat.textContent = finalValue;
                                    clearInterval(counter);
                                } else {
                                    stat.textContent = Math.floor(currentValue) + '+';
                                }
                            }, stepDuration);
                        });
                    }
                });
            }, { threshold: 0.5 });

            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                observer.observe(statsSection);
            }
        };

        // Call animate stats when page loads
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', animateStats);
        } else {
            animateStats();
        }
    