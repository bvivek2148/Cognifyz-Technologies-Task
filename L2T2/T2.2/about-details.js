document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect
    window.addEventListener('scroll', () => {
        const parallax = document.querySelector('.parallax-header');
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText.replace('+', '');
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + '+';
            setTimeout(() => animateCounter(counter), 1);
        }
    };

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelector('.stats-section').querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
});