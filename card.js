function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

function filterGenres(category) {
    const cards = document.querySelectorAll('.subgenre-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}


// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Add scroll animations
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.subgenre-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }
    });
});

// Initialize card animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.subgenre-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Back to Top Button Functionality
const backToTopButton = document.getElementsByIClass('backToTopButton');

// Show/hide button based on scroll position
function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

// Smooth scroll to top function
function scrollToTop() {
    const scrollStep = -window.scrollY / (2000 / 15); // Slower scroll (adjust 1000 for speed)

    function step() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// Event listeners
window.addEventListener('scroll', toggleBackToTopButton);
backToTopButton.addEventListener('click', scrollToTop);


// Throttle scroll events for better performance
let ticking = false;

function updateBackToTopButton() {
    toggleBackToTopButton();
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateBackToTopButton);
        ticking = true;
    }
}

