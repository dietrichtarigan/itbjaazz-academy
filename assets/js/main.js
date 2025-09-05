// Main JavaScript for academy.itbjazz
import { fetchModules, fetchModuleBySlug, fetchEvents, fetchObjectives } from './supabase.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
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

async function loadCatzModulePoster() {
    try {
        const catzModule = await fetchModuleBySlug('catz');
        if (catzModule && catzModule.poster_url) {
            const posterImg = document.getElementById('catz-poster');
            const posterImgDetail = document.getElementById('catz-poster-detail');
            
            if (posterImg) {
                posterImg.src = catzModule.poster_url;
                posterImg.alt = `Poster for ${catzModule.title}`;
            }
            
            if (posterImgDetail) {
                posterImgDetail.src = catzModule.poster_url;
                posterImgDetail.alt = `Poster for ${catzModule.title}`;
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

// Utility function to create module cards
function createModuleCard(module) {
    return `
        <div class="col-lg-4 col-md-6">
            <div class="card bg-dark-2 border-0 hover">
                <div class="card-body p-0">
                    <a href="catz.html" class="d-block">
                        <div class="relative overflow-hidden rounded-top">
                            <img src="${module.poster_url || 'assets/images/placeholder-poster.jpg'}" 
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

// Export functions for use in other modules
window.academyUtils = {
    createModuleCard,
    formatDate,
    loadCatzModulePoster,
    loadUpcomingEvents
};
