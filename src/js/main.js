// Main JavaScript for Academy ITBJazz homepage
import { getModules, getUpcomingEvents, objectivesData, placeholderEvents } from './supabase.js'

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeHomepage()
})

async function initializeHomepage() {
  try {
    await Promise.all([
      renderOverviewCards(),
      renderUpcomingEvents(),
      renderCatzModule()
    ])
  } catch (error) {
    console.error('Error initializing homepage:', error)
  }
}

// Render overview cards (exclude Kroyokeanjes' Lead Sheet)
function renderOverviewCards() {
  const overviewGrid = document.getElementById('overview-grid')
  if (!overviewGrid) return

  const cardsHTML = objectivesData.map(obj => `
    <div class="card">
      <div class="card-header">
        <div class="badge badge-primary">${obj.pillar}</div>
      </div>
      <div class="card-content">
        ${obj.objective ? `<p class="mb-4">${obj.objective}</p>` : ''}
        ${obj.kpi ? `<p class="text-sm text-gray-600 mb-2"><strong>KPI:</strong> ${obj.kpi}</p>` : ''}
        ${obj.initiative ? `<p class="text-sm text-gray-600 mb-2"><strong>Initiative:</strong> ${obj.initiative}</p>` : ''}
        ${obj.target_output ? `<p class="text-sm font-medium"><strong>Target Output:</strong> ${obj.target_output}</p>` : ''}
      </div>
    </div>
  `).join('')

  overviewGrid.innerHTML = cardsHTML
}

// Render upcoming events strip
async function renderUpcomingEvents() {
  const upcomingGrid = document.getElementById('upcoming-grid')
  if (!upcomingGrid) return

  let events = []
  
  try {
    // Try to get events from Supabase
    const supabaseEvents = await getUpcomingEvents()
    if (supabaseEvents.length > 0) {
      events = supabaseEvents
    } else {
      // Fallback to placeholder events
      events = placeholderEvents
    }
  } catch (error) {
    // Fallback to placeholder events
    events = placeholderEvents
  }

  const eventsHTML = events.slice(0, 3).map(event => {
    const slug = event.type.toLowerCase().replace(/\s+/g, '-')
    return `
      <div class="card">
        <div class="card-header">
          <div class="badge badge-warning">Upcoming</div>
        </div>
        <div class="card-content">
          <h4 class="card-title">${event.title || event.type}</h4>
          <p class="text-sm text-gray-600 mb-4">${event.description || 'Details coming soon...'}</p>
        </div>
        <div class="card-footer">
          <a href="/events/${slug}" class="btn btn-secondary btn-sm">View Page</a>
        </div>
      </div>
    `
  }).join('')

  upcomingGrid.innerHTML = eventsHTML
}

// Render The Catz' Module poster card
async function renderCatzModule() {
  const catzContainer = document.getElementById('catz-module')
  if (!catzContainer) return

  let module = null
  
  try {
    // Try to get the module from Supabase
    const modules = await getModules()
    module = modules.find(m => m.slug === 'catz')
  } catch (error) {
    console.error('Error fetching Catz module:', error)
  }

  // Fallback data if not found in Supabase
  if (!module) {
    module = {
      title: 'The Catz\' Module',
      description: 'A growing PDF-based module series inspired by The Real ITBJazz Book.',
      poster_url: '/images/catz-module-poster.jpg', // Placeholder image
      slug: 'catz'
    }
  }

  const posterHTML = `
    <div class="poster-card" onclick="navigateToModule('${module.slug}')">
      <img src="${module.poster_url}" alt="Poster for ${module.title}" onerror="this.src='/images/placeholder-poster.jpg'">
      <div class="poster-overlay">
        <h3>${module.title}</h3>
        <p>${module.description}</p>
      </div>
    </div>
  `

  catzContainer.innerHTML = posterHTML
}

// Navigation function
window.navigateToModule = function(slug) {
  window.location.href = `/modules/${slug}`
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const targetId = e.target.getAttribute('href').substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
})

// Add loading states
function showLoading(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    element.innerHTML = `
      <div class="flex items-center justify-center p-8">
        <div class="text-gray-500">Loading...</div>
      </div>
    `
  }
}

// Handle errors gracefully
function showError(elementId, message) {
  const element = document.getElementById(elementId)
  if (element) {
    element.innerHTML = `
      <div class="flex items-center justify-center p-8">
        <div class="text-gray-500">${message}</div>
      </div>
    `
  }
}
