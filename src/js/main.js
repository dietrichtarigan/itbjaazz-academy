// Main JavaScript for Academy ITBJazz homepage
import { getModules, getUpcomingEvents, objectivesData, placeholderEvents } from './supabase.js'

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeHomepage()
  initializeNavbar()
})

// Initialize navbar functionality
function initializeNavbar() {
  const navbar = document.getElementById('navbar')
  const navbarToggle = document.getElementById('navbar-toggle')
  const navbarNav = document.getElementById('navbar-nav')
  const navLinks = document.querySelectorAll('.navbar-nav a')

  // Mobile menu toggle with improved animation
  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', function(e) {
      e.stopPropagation()
      const isActive = navbarToggle.classList.contains('active')
      
      if (isActive) {
        // Close menu
        navbarToggle.classList.remove('active')
        navbarNav.classList.remove('active')
        document.body.style.overflow = ''
      } else {
        // Open menu
        navbarToggle.classList.add('active')
        navbarNav.classList.add('active')
        document.body.style.overflow = 'hidden'
      }
    })

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarToggle.classList.remove('active')
        navbarNav.classList.remove('active')
        document.body.style.overflow = ''
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target) && navbarNav.classList.contains('active')) {
        navbarToggle.classList.remove('active')
        navbarNav.classList.remove('active')
        document.body.style.overflow = ''
      }
    })

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navbarNav.classList.contains('active')) {
        navbarToggle.classList.remove('active')
        navbarNav.classList.remove('active')
        document.body.style.overflow = ''
      }
    })
  }

  // Enhanced navbar scroll effect
  let scrollTimer = null
  window.addEventListener('scroll', function() {
    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }
    
    const scrollY = window.scrollY
    
    if (scrollY > 20) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
    
    // Add subtle parallax effect
    scrollTimer = setTimeout(() => {
      if (scrollY > 100) {
        navbar.style.transform = `translateY(${Math.min(scrollY * 0.1, 10)}px)`
      } else {
        navbar.style.transform = 'translateY(0)'
      }
    }, 10)
  })

  // Smooth scrolling for anchor links
  navLinks.forEach(link => {
    if (link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', function(e) {
        e.preventDefault()
        const targetId = this.getAttribute('href').substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      })
    }
  })

  // Active link highlighting
  function setActiveLink() {
    const sections = ['overview', 'catz-highlight', 'upcoming', 'about']
    const scrollPosition = window.scrollY + 100

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId)
      if (section) {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'))
          const activeLink = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`)
          if (activeLink) {
            activeLink.classList.add('active')
          }
        }
      }
    })

    // Handle home section
    if (scrollPosition < 200) {
      navLinks.forEach(link => link.classList.remove('active'))
      const homeLink = document.querySelector('.navbar-nav a[href="/"]')
      if (homeLink) {
        homeLink.classList.add('active')
      }
    }
  }

  // Update active link on scroll
  window.addEventListener('scroll', setActiveLink)
}

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
