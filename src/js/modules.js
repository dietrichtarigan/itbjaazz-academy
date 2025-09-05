// JavaScript for modules page
import { getModules } from './supabase.js'

document.addEventListener('DOMContentLoaded', function() {
  initializeModulesPage()
})

async function initializeModulesPage() {
  await renderModulesGrid()
}

async function renderModulesGrid() {
  const modulesGrid = document.getElementById('modules-grid')
  if (!modulesGrid) return

  try {
    let modules = await getModules()
    
    // Fallback data if no modules in Supabase
    if (modules.length === 0) {
      modules = [
        {
          id: '1',
          title: 'The Catz\' Module',
          slug: 'catz',
          description: 'A growing PDF-based module series inspired by The Real ITBJazz Book. Tap to view.',
          poster_url: '/images/catz-module-poster.jpg',
          status: 'published'
        }
      ]
    }

    const modulesHTML = modules.map(module => `
      <div class="card" onclick="navigateToModule('${module.slug}')">
        <div class="poster-card">
          <img src="${module.poster_url}" alt="Poster for ${module.title}" onerror="this.src='/images/placeholder-poster.jpg'">
          <div class="poster-overlay">
            <h3>${module.title}</h3>
            <p>${module.description}</p>
          </div>
        </div>
      </div>
    `).join('')

    modulesGrid.innerHTML = modulesHTML
    
  } catch (error) {
    console.error('Error loading modules:', error)
    modulesGrid.innerHTML = `
      <div class="col-span-full text-center p-8">
        <p class="text-gray-500">Error loading modules. Please try again later.</p>
      </div>
    `
  }
}

// Navigation function
window.navigateToModule = function(slug) {
  window.location.href = `/modules/${slug}`
}
