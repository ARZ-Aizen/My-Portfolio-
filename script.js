// Mobile Menu Toggle
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('mobileMenu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Active Navigation Link Handler
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('section');

// Function to remove active class from all links
function removeActiveClasses() {
    navLinks.forEach(link => {
        link.classList.remove('text-gray-800', 'border-b-4', 'border-blue-500');
        link.classList.add('text-gray-500');
    });
    mobileNavLinks.forEach(link => {
        link.classList.remove('text-white', 'bg-blue-500');
    });
}

// Function to add active class
function addActiveClass(sectionId) {
    removeActiveClasses();
    
    // Desktop nav
    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.remove('text-gray-500');
        activeLink.classList.add('text-gray-800', 'border-b-4', 'border-blue-500');
    }

    // Mobile nav
    const activeMobileLink = document.querySelector(`.mobile-nav-link[href="#${sectionId}"]`);
    if (activeMobileLink) {
        activeMobileLink.classList.add('text-white', 'bg-blue-500');
    }
}

// Click handler for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const sectionId = this.getAttribute('data-section');
        addActiveClass(sectionId);
    });
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const sectionId = this.getAttribute('href').substring(1);
        addActiveClass(sectionId);
        menu.classList.add('hidden'); // Close mobile menu after click
    });
});

// Intersection Observer for scroll detection
// Animate elements on scroll
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // 20% of element visible
};

const animateObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    animateObserver.observe(el);
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            addActiveClass(sectionId);
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Set initial active state (home)
addActiveClass('home');

// Animate achievements when scrolled into view
const achievementCards = document.querySelectorAll('.achievement-card');

const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.3
});

achievementCards.forEach(card => achievementObserver.observe(card));

