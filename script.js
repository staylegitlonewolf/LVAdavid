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

// Scroll to next section functionality
function scrollToNextSection() {
    const currentScrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Find the next section to scroll to
    const sections = document.querySelectorAll('section');
    let nextSection = null;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // If we're currently in this section or before it, and it's below current viewport
        if (sectionTop > currentScrollPosition + windowHeight * 0.5) {
            nextSection = section;
            break;
        }
    }
    
    // If no next section found, scroll to bottom
    if (!nextSection) {
        window.scrollTo({
            top: documentHeight - windowHeight,
            behavior: 'smooth'
        });
        return;
    }
    
    // Scroll to the next section
    const targetPosition = nextSection.offsetTop - 80; // Account for fixed navbar
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Show/hide scroll arrow based on scroll position
function toggleScrollArrow() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (!scrollArrow) return;
    
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show arrow if not at bottom, hide if at bottom
    if (scrollPosition + windowHeight >= documentHeight - 100) {
        scrollArrow.style.opacity = '0';
        scrollArrow.style.pointerEvents = 'none';
    } else {
        scrollArrow.style.opacity = '1';
        scrollArrow.style.pointerEvents = 'auto';
    }
}

// Mobile Navigation Toggle Functionality
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        // Toggle menu visibility
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize (if screen becomes larger)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Fullscreen Functionality
function initFullscreenToggle() {
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    if (!fullscreenToggle) return;
    
    // Enhanced fullscreen API support detection
    const fullscreenEnabled = document.fullscreenEnabled || 
                             document.webkitFullscreenEnabled || 
                             document.mozFullScreenEnabled || 
                             document.msFullscreenEnabled;
    
    // Check if fullscreen API is supported
    if (!fullscreenEnabled) {
        console.log('Fullscreen API not supported');
        fullscreenToggle.style.display = 'none';
        return;
    }
    
    // Enhanced device detection for Android
    const userAgent = navigator.userAgent.toLowerCase();
    const isIPhone = /iphone|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobile = /mobile|android|iphone|ipad|phone/.test(userAgent);
    
    console.log('Device detection:', { isIPhone, isAndroid, isMobile, userAgent });
    
    // Hide button on iPhone (iOS Safari doesn't support fullscreen)
    if (isIPhone) {
        console.log('Hiding fullscreen button on iPhone');
        fullscreenToggle.style.display = 'none';
        return;
    }
    
    // For Android, we'll show the button but handle potential issues
    if (isAndroid) {
        console.log('Android device detected - fullscreen may have limitations');
    }
    
    // Update debug info
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.innerHTML = `
            Device: ${isAndroid ? 'Android' : isIPhone ? 'iPhone' : 'Desktop'}<br>
            Fullscreen API: ${fullscreenEnabled ? 'Supported' : 'Not Supported'}<br>
            Browser: ${userAgent.split(' ').slice(-2).join(' ')}
        `;
    }
    
    // Check if fullscreen was previously enabled and restore it
    const wasFullscreen = localStorage.getItem('fullscreen') === 'true';
    if (wasFullscreen) {
        console.log('Restoring fullscreen state from localStorage');
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
            requestFullscreen();
        }, 500);
    }
    
    // Helper function to request fullscreen
    async function requestFullscreen() {
        const element = document.documentElement;
        const icon = fullscreenToggle.querySelector('i');
        
        try {
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                await element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            } else {
                throw new Error('No fullscreen method available');
            }
            
            // Update icon and add fullscreen class
            icon.className = 'fas fa-compress';
            document.documentElement.setAttribute('data-fullscreen', 'true');
            localStorage.setItem('fullscreen', 'true');
            console.log('Successfully entered fullscreen mode');
            
        } catch (error) {
            console.error('Failed to enter fullscreen:', error);
            
            // For Android, try alternative approach
            if (isAndroid) {
                console.log('Trying alternative fullscreen approach for Android');
                try {
                    if (element.webkitRequestFullscreen) {
                        await element.webkitRequestFullscreen();
                        icon.className = 'fas fa-compress';
                        document.documentElement.setAttribute('data-fullscreen', 'true');
                        localStorage.setItem('fullscreen', 'true');
                        console.log('Android fullscreen successful');
                    }
                } catch (androidError) {
                    console.error('Android fullscreen also failed:', androidError);
                    alert('Fullscreen mode is not supported on this device/browser');
                }
            } else {
                alert('Fullscreen mode is not supported on this device/browser');
            }
        }
    }
    
    // Helper function to exit fullscreen
    async function exitFullscreen() {
        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
            
            // Update icon and remove fullscreen class
            const icon = fullscreenToggle.querySelector('i');
            icon.className = 'fas fa-expand';
            document.documentElement.removeAttribute('data-fullscreen');
            localStorage.setItem('fullscreen', 'false');
            console.log('Successfully exited fullscreen mode');
            
        } catch (error) {
            console.error('Failed to exit fullscreen:', error);
        }
    }
    
    function toggleFullscreen() {
        const icon = fullscreenToggle.querySelector('i');
        
        // Check current fullscreen state
        const isFullscreen = !!(document.fullscreenElement || 
                               document.webkitFullscreenElement || 
                               document.mozFullScreenElement || 
                               document.msFullscreenElement);
        
        if (!isFullscreen) {
            // Enter fullscreen
            requestFullscreen();
        } else {
            // Exit fullscreen
            exitFullscreen();
        }
        
        // Add visual feedback
        fullscreenToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            fullscreenToggle.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Add click event listener
    fullscreenToggle.addEventListener('click', toggleFullscreen);
    
    // Listen for fullscreen change events to keep UI in sync
    document.addEventListener('fullscreenchange', updateFullscreenState);
    document.addEventListener('webkitfullscreenchange', updateFullscreenState);
    document.addEventListener('mozfullscreenchange', updateFullscreenState);
    document.addEventListener('MSFullscreenChange', updateFullscreenState);
    
    // Preserve fullscreen state when navigating
    const navLinks = document.querySelectorAll('a[href]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if this is a navigation link (not a hash link or external link)
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                // Save current fullscreen state before navigation
                const isFullscreen = !!(document.fullscreenElement || 
                                       document.webkitFullscreenElement || 
                                       document.mozFullScreenElement || 
                                       document.msFullscreenElement);
                localStorage.setItem('fullscreen', isFullscreen ? 'true' : 'false');
                console.log('Saving fullscreen state before navigation:', isFullscreen);
            }
        });
    });
    
    function updateFullscreenState() {
        const icon = fullscreenToggle.querySelector('i');
        const isFullscreen = !!(document.fullscreenElement || 
                               document.webkitFullscreenElement || 
                               document.mozFullScreenElement || 
                               document.msFullscreenElement);
        
        if (isFullscreen) {
            icon.className = 'fas fa-compress';
            document.documentElement.setAttribute('data-fullscreen', 'true');
            localStorage.setItem('fullscreen', 'true');
            console.log('Fullscreen state updated: entered');
        } else {
            icon.className = 'fas fa-expand';
            document.documentElement.removeAttribute('data-fullscreen');
            localStorage.setItem('fullscreen', 'false');
            console.log('Fullscreen state updated: exited');
        }
    }
}

// Department Filter Functionality
function initDepartmentFilter() {
    const deptButtons = document.querySelectorAll('.dept-btn');
    const teamMembers = document.querySelectorAll('.team-member');
    const noStaffMessage = document.getElementById('noStaffMessage');
    const teamGrid = document.querySelector('.team-grid');

    deptButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedDept = button.getAttribute('data-department');
            
            // Update active button
            deptButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter team members
            let visibleMembers = 0;
            
            teamMembers.forEach(member => {
                const memberDept = member.getAttribute('data-department');
                
                if (selectedDept === 'all' || memberDept === selectedDept) {
                    member.style.display = 'block';
                    visibleMembers++;
                } else {
                    member.style.display = 'none';
                }
            });
            
            // Show/hide no staff message
            if (visibleMembers === 0) {
                teamGrid.style.display = 'none';
                noStaffMessage.style.display = 'block';
            } else {
                teamGrid.style.display = 'grid';
                noStaffMessage.style.display = 'none';
            }
        });
    });
}

// Initialize scroll arrow functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - initializing fullscreen functionality');
    console.log('User Agent:', navigator.userAgent);
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize fullscreen toggle
    initFullscreenToggle();
    
    // Initialize department filter (for team page)
    initDepartmentFilter();
    
    // Add scroll event listener for arrow visibility
    window.addEventListener('scroll', toggleScrollArrow);
    
    // Initial check for arrow visibility
    toggleScrollArrow();
});