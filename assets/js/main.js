// Enhanced Main JavaScript for academy.itbjazz
import { fetchModules, fetchModuleBySlug, fetchEvents, fetchObjectives } from './supabase.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeAnimations();
    initializeScrollEffects();
    initializeParallax();
});

async function initializeApp() {
    // Load The Catz' Module poster on homepage
    await loadCatzModulePoster();
    
    // Load upcoming events
    await loadUpcomingEvents();
    
    // Load objectives if on homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        await loadObjectives();
    }
}

// Enhanced animation initialization
function initializeAnimations() {
    // Initialize WOW.js for scroll animations
    if (typeof WOW !== 'undefined') {
        new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        }).init();
    }

    // Add custom animations
    addCustomAnimations();
}

// Enhanced scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header.transparent');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll effect
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('#section-hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
        
        lastScrollTop = scrollTop;
    });
}

// Enhanced parallax initialization
function initializeParallax() {
    // Initialize jarallax if available
    if (typeof jarallax !== 'undefined') {
        jarallax(document.querySelectorAll('.jarallax'));
    }
}

// Add custom animations
function addCustomAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card, .hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-main, .btn-outline-light');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

async function loadCatzModulePoster() {
    try {
        const catzModule = await fetchModuleBySlug('catz');
        if (catzModule && catzModule.poster_url) {
            const posterImg = document.getElementById('catz-poster');
            const posterImgDetail = document.getElementById('catz-poster-detail');
            
            if (posterImg) {
                posterImg.src = catzModule.poster_url;
                posterImg.alt = `Poster for ${catzModule.title}`;
                // Add fade-in effect
                posterImg.style.opacity = '0';
                posterImg.onload = () => {
                    posterImg.style.transition = 'opacity 0.5s ease';
                    posterImg.style.opacity = '1';
                };
            }
            
            if (posterImgDetail) {
                posterImgDetail.src = catzModule.poster_url;
                posterImgDetail.alt = `Poster for ${catzModule.title}`;
                posterImgDetail.style.opacity = '0';
                posterImgDetail.onload = () => {
                    posterImgDetail.style.transition = 'opacity 0.5s ease';
                    posterImgDetail.style.opacity = '1';
                };
            }
        }
    } catch (error) {
        console.error('Error loading Catz module poster:', error);
    }
}

async function loadUpcomingEvents() {
    try {
        const events = await fetchEvents();
        const eventsByType = {};
        
        // Group events by type
        events.forEach(event => {
            if (!eventsByType[event.type]) {
                eventsByType[event.type] = event;
            }
        });
        
        // Update event cards with real data if available
        updateEventCard('klinik', eventsByType['Klinik']);
        updateEventCard('mentoring', eventsByType['Mentoring']);
        updateEventCard('jam-and-jazz', eventsByType['Jam and Jazz']);
        
    } catch (error) {
        console.error('Error loading upcoming events:', error);
    }
}

function updateEventCard(type, event) {
    const cardElement = document.querySelector(`[data-event-type="${type}"]`);
    if (cardElement && event) {
        const titleElement = cardElement.querySelector('h5');
        const descriptionElement = cardElement.querySelector('p');
        const badgeElement = cardElement.querySelector('.badge');
        
        if (titleElement) titleElement.textContent = event.title;
        if (descriptionElement) descriptionElement.textContent = event.description || getDefaultDescription(type);
        if (badgeElement) badgeElement.textContent = event.status || 'Upcoming';
    }
}

function getDefaultDescription(type) {
    const descriptions = {
        'klinik': 'Kocheng Klinik sessions are being prepared. Watch this space.',
        'mentoring': 'Mentoring sessions are in the works. Details soon.',
        'jam-and-jazz': 'Our next Jam and Jazz is brewing. Stay tuned.'
    };
    return descriptions[type] || 'Event details coming soon.';
}

async function loadObjectives() {
    try {
        const objectives = await fetchObjectives();
        // Objectives are currently hardcoded in HTML, but this could be used to dynamically load them
        console.log('Objectives loaded:', objectives);
    } catch (error) {
        console.error('Error loading objectives:', error);
    }
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Enhanced module card creation
function createModuleCard(module) {
    return `
        <div class="col-lg-4 col-md-6">
            <div class="card bg-dark-2 border-0 hover module-card">
                <div class="card-body p-0">
                    <a href="catz.html" class="d-block">
                        <div class="relative overflow-hidden rounded-top">
                            <img src="${module.poster_url || 'assets/images/placeholder-poster.jpg'}" 
                                 class="w-100 hover-scale-1-1" 
                                 alt="${module.title}"
                                 style="height: 200px; object-fit: cover;">
                            <div class="abs w-100 h-100 start-0 top-0 hover-op-1 radial-gradient-color"></div>
                            <div class="abs top-0 end-0 p-3">
                                <span class="badge bg-main-600">${module.status}</span>
                            </div>
                        </div>
                        <div class="p-4">
                            <h5 class="mb-2 text-gradient">${module.title}</h5>
                            <p class="text-muted mb-3">${module.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">${formatDate(module.created_at)}</small>
                                <span class="text-main-600">
                                    <i class="fa fa-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Enhanced smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize smooth scrolling
initializeSmoothScrolling();

// Add loading states
function showLoading(element) {
    element.innerHTML = `
        <div class="d-flex justify-content-center align-items-center py-5">
            <div class="spinner-border text-main-600" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
}

// Add error states
function showError(element, message) {
    element.innerHTML = `
        <div class="text-center py-5">
            <i class="fa fa-exclamation-triangle fs-60 text-warning mb-4"></i>
            <h4 class="mb-3">Error</h4>
            <p class="text-muted mb-4">${message}</p>
            <button class="btn btn-main" onclick="location.reload()">Retry</button>
        </div>
    `;
}

// Enhanced mobile menu toggle
function initializeMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Initialize mobile menu
initializeMobileMenu();

// Add intersection observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all wow elements
    document.querySelectorAll('.wow').forEach(el => {
        observer.observe(el);
    });
}

// Initialize intersection observer
initializeIntersectionObserver();

// Export functions for use in other modules
window.academyUtils = {
    createModuleCard,
    formatDate,
    loadCatzModulePoster,
    loadUpcomingEvents,
    showLoading,
    showError,
    createRippleEffect
};

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .module-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .module-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .mobile-menu {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        background: var(--bg-dark-2);
        z-index: 9999;
        transition: left 0.3s ease;
    }
    
    .mobile-menu.active {
        left: 0;
    }
    
    .menu-btn.active {
        transform: rotate(90deg);
    }
`;
document.head.appendChild(style);