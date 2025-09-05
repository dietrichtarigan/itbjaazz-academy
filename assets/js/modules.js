// Enhanced Modules page JavaScript
import { fetchModules } from './supabase.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadModules();
    initializeModuleAnimations();
    initializeSearch();
    initializeFilters();
});

async function loadModules() {
    const modulesGrid = document.getElementById('modules-grid');
    if (!modulesGrid) return;

    try {
        // Show enhanced loading spinner
        showEnhancedLoading(modulesGrid);

        const modules = await fetchModules();
        
        if (modules.length === 0) {
            // Show enhanced empty state
            showEnhancedEmptyState(modulesGrid);
            return;
        }

        // Render modules with staggered animation
        renderModulesWithAnimation(modules, modulesGrid);
        
    } catch (error) {
        console.error('Error loading modules:', error);
        showEnhancedError(modulesGrid, error);
    }
}

function showEnhancedLoading(container) {
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="card bg-dark-2 border-0">
                <div class="card-body p-5">
                    <div class="spinner-border text-main-600 mb-4" role="status">
                        <span class="visually-hidden">Loading modules...</span>
                    </div>
                    <h4 class="mb-3 text-gradient">Loading Modules</h4>
                    <p class="text-muted">Please wait while we fetch the latest learning modules...</p>
                </div>
            </div>
        </div>
    `;
}

function showEnhancedEmptyState(container) {
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="card bg-dark-2 border-0">
                <div class="card-body p-5">
                    <div class="empty-state-icon mb-4">
                        <i class="fa fa-book-open fs-60 text-main-600"></i>
                    </div>
                    <h4 class="mb-3 text-gradient">No Modules Available</h4>
                    <p class="text-muted mb-4">Check back soon for new learning modules and resources.</p>
                    <a href="../index.html" class="btn btn-main">
                        <i class="fa fa-home me-2"></i>Back to Home
                    </a>
                </div>
            </div>
        </div>
    `;
}

function showEnhancedError(container, error) {
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="card bg-dark-2 border-0">
                <div class="card-body p-5">
                    <div class="error-icon mb-4">
                        <i class="fa fa-exclamation-triangle fs-60 text-warning"></i>
                    </div>
                    <h4 class="mb-3 text-gradient">Error Loading Modules</h4>
                    <p class="text-muted mb-4">There was a problem loading the modules. Please try again later.</p>
                    <div class="d-flex gap-3 justify-content-center">
                        <button class="btn btn-main" onclick="location.reload()">
                            <i class="fa fa-refresh me-2"></i>Retry
                        </button>
                        <a href="../index.html" class="btn btn-outline-light">
                            <i class="fa fa-home me-2"></i>Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderModulesWithAnimation(modules, container) {
    container.innerHTML = '';
    
    modules.forEach((module, index) => {
        const moduleCard = createEnhancedModuleCard(module);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = moduleCard;
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(30px)';
        
        container.appendChild(cardElement);
        
        // Staggered animation
        setTimeout(() => {
            cardElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function createEnhancedModuleCard(module) {
    const slug = module.slug || 'catz';
    const posterUrl = module.poster_url || '../../assets/images/placeholder-poster.jpg';
    const statusColor = getStatusColor(module.status);
    
    return `
        <div class="col-lg-4 col-md-6">
            <div class="card bg-dark-2 border-0 hover module-card">
                <div class="card-body p-0">
                    <a href="${slug}.html" class="d-block">
                        <div class="relative overflow-hidden rounded-top">
                            <img src="${posterUrl}" 
                                 class="w-100 hover-scale-1-1" 
                                 alt="${module.title}"
                                 style="height: 250px; object-fit: cover;"
                                 loading="lazy">
                            <div class="abs w-100 h-100 start-0 top-0 hover-op-1 radial-gradient-color"></div>
                            <div class="abs top-0 end-0 p-3">
                                <span class="badge ${statusColor}">${module.status}</span>
                            </div>
                            <div class="abs bottom-0 start-0 end-0 p-3">
                                <div class="text-white">
                                    <h5 class="mb-1">${module.title}</h5>
                                    <small class="text-white-50">Click to view details</small>
                                </div>
                            </div>
                        </div>
                        <div class="p-4">
                            <p class="text-muted mb-3">${module.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">
                                    <i class="fa fa-calendar me-1"></i>
                                    ${formatDate(module.created_at)}
                                </small>
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

function getStatusColor(status) {
    const colors = {
        'published': 'bg-success',
        'draft': 'bg-warning-600',
        'upcoming': 'bg-info',
        'past': 'bg-secondary'
    };
    return colors[status] || 'bg-secondary';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Enhanced module animations
function initializeModuleAnimations() {
    // Add hover effects to module cards
    document.addEventListener('mouseover', function(e) {
        const moduleCard = e.target.closest('.module-card');
        if (moduleCard) {
            moduleCard.style.transform = 'translateY(-10px) scale(1.02)';
            moduleCard.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        const moduleCard = e.target.closest('.module-card');
        if (moduleCard) {
            moduleCard.style.transform = 'translateY(0) scale(1)';
            moduleCard.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
        }
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const moduleCards = document.querySelectorAll('.module-card');
            
            moduleCards.forEach(card => {
                const title = card.querySelector('h5').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.parentElement.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
        });
    }
}

// Initialize filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            const moduleCards = document.querySelectorAll('.module-card');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter modules
            moduleCards.forEach(card => {
                const status = card.querySelector('.badge').textContent.toLowerCase();
                
                if (filter === 'all' || status === filter) {
                    card.parentElement.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
        });
    });
}

// Add enhanced CSS for module cards
const moduleStyles = document.createElement('style');
moduleStyles.textContent = `
    .module-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 15px;
        overflow: hidden;
        position: relative;
    }
    
    .module-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(47, 178, 171, 0.1), rgba(39, 207, 167, 0.1));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }
    
    .module-card:hover::before {
        opacity: 1;
    }
    
    .module-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .module-card img {
        transition: transform 0.3s ease;
    }
    
    .module-card:hover img {
        transform: scale(1.1);
    }
    
    .badge {
        font-size: 0.7rem;
        font-weight: 600;
        padding: 6px 12px;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .search-input {
        background: var(--bg-dark-2);
        border: 1px solid var(--border-color);
        color: var(--text-light);
        border-radius: 25px;
        padding: 12px 20px;
        transition: all 0.3s ease;
    }
    
    .search-input:focus {
        border-color: var(--brand-primary);
        box-shadow: 0 0 0 3px rgba(47, 178, 171, 0.1);
        outline: none;
    }
    
    .filter-btn {
        background: var(--bg-dark-2);
        border: 1px solid var(--border-color);
        color: var(--text-muted);
        padding: 8px 16px;
        border-radius: 20px;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--brand-primary);
        color: white;
        border-color: var(--brand-primary);
    }
    
    .empty-state-icon,
    .error-icon {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(moduleStyles);