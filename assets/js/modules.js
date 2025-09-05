// Modules page JavaScript
import { fetchModules } from './supabase.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadModules();
});

async function loadModules() {
    const modulesGrid = document.getElementById('modules-grid');
    if (!modulesGrid) return;

    try {
        // Show loading spinner
        modulesGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading modules...</span>
                </div>
            </div>
        `;

        const modules = await fetchModules();
        
        if (modules.length === 0) {
            // Show empty state
            modulesGrid.innerHTML = `
                <div class="col-12 text-center">
                    <div class="card bg-dark-2 border-0">
                        <div class="card-body p-5">
                            <i class="fa fa-book-open fs-60 text-muted mb-4"></i>
                            <h4 class="mb-3">No Modules Available</h4>
                            <p class="text-muted">Check back soon for new learning modules.</p>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        // Render modules
        modulesGrid.innerHTML = modules.map(module => createModuleCard(module)).join('');
        
    } catch (error) {
        console.error('Error loading modules:', error);
        modulesGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="card bg-dark-2 border-0">
                    <div class="card-body p-5">
                        <i class="fa fa-exclamation-triangle fs-60 text-warning mb-4"></i>
                        <h4 class="mb-3">Error Loading Modules</h4>
                        <p class="text-muted">There was a problem loading the modules. Please try again later.</p>
                        <button class="btn btn-main mt-3" onclick="location.reload()">Retry</button>
                    </div>
                </div>
            </div>
        `;
    }
}

function createModuleCard(module) {
    const slug = module.slug || 'catz'; // Default to catz for now
    const posterUrl = module.poster_url || '../../assets/images/placeholder-poster.jpg';
    
    return `
        <div class="col-lg-4 col-md-6">
            <div class="card bg-dark-2 border-0 hover">
                <div class="card-body p-0">
                    <a href="${slug}.html" class="d-block">
                        <div class="relative overflow-hidden rounded-top">
                            <img src="${posterUrl}" 
                                 class="w-100 hover-scale-1-1" 
                                 alt="${module.title}"
                                 style="height: 200px; object-fit: cover;">
                            <div class="abs w-100 h-100 start-0 top-0 hover-op-1 radial-gradient-color"></div>
                        </div>
                        <div class="p-4">
                            <span class="badge bg-main-600 mb-2">${module.status}</span>
                            <h5 class="mb-2">${module.title}</h5>
                            <p class="text-muted mb-3">${module.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">${formatDate(module.created_at)}</small>
                                <span class="text-main-600">View Details →</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
