// Enhanced Animations and Visual Effects for academy.itbjazz

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeHoverEffects();
    initializeLoadingAnimations();
    initializeParallaxEffects();
    initializeTypingAnimations();
    initializeRippleEffects();
    initializeProgressBars();
});

// Scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add staggered animation for multiple elements
                const siblings = entry.target.parentElement.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling === entry.target) {
                        setTimeout(() => {
                            sibling.classList.add('animate-fadeInUp');
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal, .wow').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced hover effects
function initializeHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.card, .module-card, .hover');
    cards.forEach(card => {
        card.classList.add('hover-lift', 'card-animated');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-main, .btn-outline-light');
    buttons.forEach(button => {
        button.classList.add('btn-animated');
    });

    // Image hover effects
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const container = img.closest('.img-zoom') || img.parentElement;
        if (container) {
            container.classList.add('img-zoom');
        }
    });
}

// Loading animations
function initializeLoadingAnimations() {
    // Create loading spinner
    function createLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        return spinner;
    }

    // Create loading bars
    function createLoadingBars() {
        const container = document.createElement('div');
        container.className = 'loading-bars';
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            bar.className = 'loading-bar';
            container.appendChild(bar);
        }
        return container;
    }

    // Replace loading spinners with enhanced versions
    document.querySelectorAll('.spinner-border').forEach(spinner => {
        const enhancedSpinner = createLoadingSpinner();
        spinner.parentNode.replaceChild(enhancedSpinner, spinner);
    });
}

// Parallax effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.jarallax, .parallax-slow, .parallax-fast');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('parallax-fast') ? 0.5 : 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing animations
function initializeTypingAnimations() {
    const typingElements = document.querySelectorAll('.text-typing');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--brand-primary)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' ? '2px solid var(--brand-primary)' : 'none';
                }, 500);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    });
}

// Ripple effects for buttons
function initializeRippleEffects() {
    const buttons = document.querySelectorAll('.btn-main, .btn-outline-light, .card');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('animate-ripple');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Progress bars animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-circle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressValue = entry.target.querySelector('.progress-value');
                const percentage = parseInt(progressValue.textContent);
                animateProgressBar(entry.target, percentage);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function animateProgressBar(element, percentage) {
    const progressValue = element.querySelector('.progress-value');
    let current = 0;
    const increment = percentage / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= percentage) {
            current = percentage;
            clearInterval(timer);
        }
        
        // Update the conic gradient
        const angle = (current / 100) * 360;
        element.style.background = `conic-gradient(var(--brand-primary) 0deg, var(--brand-primary) ${angle}deg, var(--bg-dark-3) ${angle}deg, var(--bg-dark-3) 360deg)`;
        
        // Update the text
        progressValue.textContent = Math.round(current) + '%';
    }, 20);
}

// Smooth scrolling for anchor links
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

// Floating elements animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.animate-float');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize floating elements
initializeFloatingElements();

// Glow effects
function initializeGlowEffects() {
    const glowElements = document.querySelectorAll('.animate-glow');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('animate-glow');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('animate-glow');
        });
    });
}

// Initialize glow effects
initializeGlowEffects();

// Staggered animations for lists
function initializeStaggeredAnimations() {
    const lists = document.querySelectorAll('.ul-check, .list-unstyled');
    
    lists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.classList.add('scroll-reveal');
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Initialize staggered animations
initializeStaggeredAnimations();

// Mobile menu animations
function initializeMobileMenuAnimations() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Add animation classes
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.add('animate-slideInLeft');
            } else {
                mobileMenu.classList.add('animate-slideInRight');
            }
        });
    }
}

// Initialize mobile menu animations
initializeMobileMenuAnimations();

// Search animations
function initializeSearchAnimations() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('animate-glow');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('animate-glow');
        });
    });
}

// Initialize search animations
initializeSearchAnimations();

// Filter animations
function initializeFilterAnimations() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add click animation
            this.classList.add('animate-bounceIn');
            setTimeout(() => {
                this.classList.remove('animate-bounceIn');
            }, 600);
        });
    });
}

// Initialize filter animations
initializeFilterAnimations();

// Export functions for use in other modules
window.animationUtils = {
    createRipple,
    animateProgressBar,
    initializeScrollAnimations,
    initializeHoverEffects
};
