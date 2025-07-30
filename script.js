// LVA.studio™ - Simplified JavaScript

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const currentThemeSpan = document.getElementById('currentTheme');

// Theme Toggle Functionality
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.className = 'fas fa-moon';
        icon.style.transform = 'rotate(0deg)';
    }
    
    // Add visual feedback
    themeToggle.style.transform = 'scale(1.2)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
    
    // Update theme indicator
    if (currentThemeSpan) {
        currentThemeSpan.textContent = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
    }
}

// Initialize theme toggle icon
function initializeThemeToggle() {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    // Update theme indicator
    if (currentThemeSpan) {
        currentThemeSpan.textContent = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = targetValue / (duration / 16); // 60fps
                let currentValue = 0;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(currentValue);
                }, 16);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Add active class to navigation links on scroll
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Add event listener to theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize active navigation links
    initActiveNavLinks();
    
    // Initialize stats animation
    animateStats();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Image Lightbox Functions
function openImageLightbox(imageSrc, imageTitle) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    
    if (lightbox && lightboxImage && lightboxTitle) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageTitle;
        lightboxTitle.textContent = imageTitle;
        lightbox.style.display = 'flex';
        
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    }
}

function closeImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    
    if (lightbox) {
        lightbox.style.display = 'none';
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('imageLightbox');
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeImageLightbox();
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeImageLightbox();
            }
        });
    }
});