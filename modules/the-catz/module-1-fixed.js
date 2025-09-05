// Fixed JavaScript for The Catz Module 1
// This file contains the complete implementation to prevent navigation redirects

(function() {
    'use strict';
    
    // Module data from MDX frontmatter
    const moduleData = {
        title: "The Catz Module 1",
        author: "ITBJazz Faculty",
        tags: ["The Catz' Module", "Jazz Fundamentals"],
        heroVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        heroAudio: "/media/catz-intro.mp3",
        resources: [
            { label: "PDF Handout", url: "/files/catz-module1-handout.pdf" },
            { label: "Reference Playlist", url: "https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT" }
        ],
        sections: [
            { id: "intro-to-piano", title: "Introduction to Piano" },
            { id: "music-theories", title: "Music Theories You Have to Master" },
            { id: "band-with-piano", title: "How to Play in a Band with Piano" },
            { id: "look-up-to", title: "Jazz Pianists You Can Look Up To" },
            { id: "listen-and-practice", title: "Jazz Pieces You Can Listen and Practice To" }
        ]
    };

    // Progress tracking
    const STORAGE_KEY = 'catz-m1-progress';
    
    function getProgress() {
        try { 
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; 
        } catch { 
            return {}; 
        }
    }
    
    function setProgress(p) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
        renderProgressCount();
    }

    function renderProgressCount() {
        const p = getProgress();
        const done = ['intro-to-piano','music-theories','band-with-piano','look-up-to','listen-and-practice']
            .filter(id => !!p[id]).length;
        const el = document.querySelector('#progressText');
        if (el) el.textContent = `${done}/5`;
        
        // Update progress ring visual
        const ring = document.getElementById('progressRing');
        if (ring) {
            const percentage = (done/5) * 360;
            ring.style.background = `conic-gradient(var(--primary-color) ${percentage}deg, var(--gray-300) ${percentage}deg)`;
            ring.textContent = `${Math.round((done/5) * 100)}%`;
        }
    }

    function safeScrollTo(id) {
        const t = document.getElementById(id);
        if (!t) return;
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`); // update hash tanpa reload
    }

    function renderSections() {
        const sectionList = document.getElementById('sectionList');
        if (!sectionList) return;
        
        sectionList.innerHTML = moduleData.sections.map(section => `
            <li>
                <button type="button" class="section-item tracker-item" role="checkbox" aria-checked="false" data-section="${section.id}" data-no-router="true">
                    <span class="section-checkbox" aria-hidden="true"></span>
                    <span class="section-text">${section.title}</span>
                </button>
            </li>
        `).join('');
    }

    function renderContent() {
        const contentBody = document.getElementById('contentBody');
        
        // This would normally load from MDX file, but for now we'll use static content
        contentBody.innerHTML = `
            <h2 id="intro-to-piano">Introduction to Piano</h2>
            <p>Piano adalah fondasi yang kuat untuk memahami jazz. Dalam bagian ini, kita akan mempelajari dasar-dasar teknik piano yang esensial untuk bermain jazz.</p>
            
            <h3>Posisi dan Postur</h3>
            <ul>
                <li><strong>Posisi duduk</strong>: Duduk tegak dengan punggung lurus, kaki rata di lantai</li>
                <li><strong>Tinggi kursi</strong>: Siku harus sejajar dengan tuts piano</li>
                <li><strong>Jarak dari piano</strong>: Lengan harus membentuk sudut 90 derajat</li>
            </ul>

            <h3>Teknik Dasar</h3>
            <ul>
                <li><strong>Finger positioning</strong>: Gunakan ujung jari, bukan bantalan jari</li>
                <li><strong>Wrist movement</strong>: Gerakan pergelangan tangan yang halus dan rileks</li>
                <li><strong>Arm weight</strong>: Gunakan berat lengan untuk menghasilkan suara yang konsisten</li>
            </ul>

            <h2 id="music-theories">Music Theories You Have to Master</h2>
            <p>Teori musik adalah bahasa jazz. Tanpa pemahaman teori yang solid, sulit untuk berimprovisasi dan berkomunikasi dengan musisi lain.</p>

            <h3>1. Scales</h3>
            <p>Scales adalah fondasi dari semua improvisasi jazz. Beberapa scale penting yang harus dikuasai:</p>
            <ul>
                <li><strong>Major Scale</strong>: Dasar dari semua scale lainnya</li>
                <li><strong>Minor Scale</strong>: Natural, harmonic, dan melodic minor</li>
                <li><strong>Pentatonic Scale</strong>: Scale 5 nada yang sangat berguna untuk improvisasi</li>
                <li><strong>Blues Scale</strong>: Scale dengan "blue notes" yang khas jazz</li>
            </ul>

            <h3>2. Chords</h3>
            <p>Pemahaman chord adalah kunci untuk bermain jazz:</p>
            <ul>
                <li><strong>Triads</strong>: Major, minor, diminished, augmented</li>
                <li><strong>Seventh Chords</strong>: Maj7, min7, dom7, min7b5, dim7</li>
                <li><strong>Extended Chords</strong>: 9th, 11th, 13th chords</li>
                <li><strong>Altered Chords</strong>: b9, #9, #11, b13</li>
            </ul>

            <h2 id="band-with-piano">How to Play in a Band with Piano</h2>
            <p>Bermain piano dalam band jazz membutuhkan pendekatan yang berbeda dari bermain solo. Di sini kita akan mempelajari peran dan teknik yang tepat.</p>

            <h3>1. Which Role to Fill</h3>
            <p>Piano dalam jazz band bisa mengambil berbagai peran:</p>
            <ul>
                <li><strong>Comping</strong>: Mengiringi soloist dengan chord progressions</li>
                <li><strong>Soloing</strong>: Berimprovisasi sebagai lead instrument</li>
                <li><strong>Bass Line</strong>: Memainkan walking bass line (dalam trio tanpa bass)</li>
                <li><strong>Harmony</strong>: Menyediakan harmoni dan warna chord</li>
            </ul>

            <h2 id="look-up-to">Jazz Pianists You Can Look Up To</h2>
            <p>Mempelajari dari master adalah cara terbaik untuk mengembangkan style dan teknik. Berikut adalah beberapa pianis jazz legendaris yang wajib dipelajari:</p>

            <h3>1. Thelonious Monk</h3>
            <ul>
                <li><strong>Style</strong>: Unik, angular, dan rhythmically complex</li>
                <li><strong>What to learn</strong>: Rhythm, space, dan penggunaan silence</li>
                <li><strong>Key recordings</strong>: "Round Midnight", "Blue Monk"</li>
            </ul>

            <h3>2. Oscar Peterson</h3>
            <ul>
                <li><strong>Style</strong>: Virtuosic, technical brilliance</li>
                <li><strong>What to learn</strong>: Technique, speed, dan precision</li>
                <li><strong>Key recordings</strong>: "Night Train", "C Jam Blues"</li>
            </ul>

            <h2 id="listen-and-practice">Jazz Pieces You Can Listen and Practice To</h2>
            <p>Berikut adalah beberapa lagu jazz yang wajib didengarkan dan dipelajari:</p>

            <h3>Notable Pieces</h3>
            <ol>
                <li><strong>"Autumn Leaves"</strong> - Joseph Kosma</li>
                <li><strong>"Blue Moon"</strong> - Richard Rodgers</li>
                <li><strong>"All the Things You Are"</strong> - Jerome Kern</li>
                <li><strong>"Summertime"</strong> - George Gershwin</li>
                <li><strong>"Take Five"</strong> - Paul Desmond</li>
            </ol>

            <h3>How to Approach Learning a Piece</h3>
            <p>Langkah-langkah sistematis untuk mempelajari lagu jazz:</p>
            <ol>
                <li><strong>Listen First</strong>: Dengarkan berbagai versi dari lagu tersebut</li>
                <li><strong>Analyze the Form</strong>: Identifikasi struktur AABA, ABAC, dll.</li>
                <li><strong>Learn the Melody</strong>: Hafalkan melodi utama</li>
                <li><strong>Study the Harmony</strong>: Analisis chord progression</li>
                <li><strong>Practice Slowly</strong>: Mulai dengan tempo lambat</li>
                <li><strong>Add Your Style</strong>: Eksperimen dengan improvisasi</li>
            </ol>
        `;
    }

    // Tracker item handling - specific and isolated
    function handleTrackerClick(e) {
        const item = e.target.closest('.tracker-item');
        if (!item) return;
        
        // Prevent all further event propagation
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();

        const id = item.dataset.section;
        const p = getProgress();
        p[id] = !p[id];
        setProgress(p);

        item.setAttribute('aria-checked', String(p[id]));
        item.classList.toggle('is-checked', p[id]);

        safeScrollTo(id);
        return false;
    }

    // Accordion handling - specific and isolated
    function handleAccordionClick(e) {
        const btn = e.target.closest('.accordion-toggle');
        if (!btn) return;
        
        // Prevent all further event propagation
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();

        const panel = document.getElementById('programPanel');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (panel) {
            panel.hidden = expanded;
        }
        return false;
    }

    // Media player handling - specific and isolated
    function handleMediaClick(e) {
        const btn = e.target.closest('.media-control');
        if (!btn) return;
        
        // Prevent all further event propagation
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();

        // Toggle play/pause
        const isPlaying = btn.textContent === '⏸';
        btn.textContent = isPlaying ? '▶' : '⏸';
        
        if (!isPlaying) {
            // Load video if not loaded
            const mediaPlaceholder = document.getElementById('mediaPlaceholder');
            if (mediaPlaceholder && mediaPlaceholder.innerHTML.includes('Click to load media')) {
                mediaPlaceholder.innerHTML = `
                    <iframe 
                        src="${moduleData.heroVideo}" 
                        title="Module intro" 
                        loading="lazy" 
                        frameborder="0" 
                        allowfullscreen
                        style="width: 100%; height: 100%; border-radius: 0.5rem;">
                    </iframe>
                `;
            }
        }
        return false;
    }

    // Remove any existing global handlers that might cause navigation
    function cleanupGlobalHandlers() {
        if (window.__legacyGlobalHandler) {
            document.removeEventListener('click', window.__legacyGlobalHandler, true);
            window.__legacyGlobalHandler = undefined;
        }
        
        // Additional cleanup for common router/SPA patterns
        ['__reactInternalInstance', '__vueParentComponent', '__angularComponent'].forEach(prop => {
            if (window[prop]) {
                delete window[prop];
            }
        });
    }

    // Safe event handling - prevent all navigation for interactive elements with highest priority
    function setupSafeInteractionHandler() {
        const safeInteractionHandler = function(e) {
            const interactive = e.target.closest('.tracker-item, .accordion-toggle, .media-control, [data-no-router="true"], button[type="button"]');
            if (interactive) {
                e.preventDefault();
                e.stopPropagation();
                if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                return false;
            }
        };

        // Add the safe handler with capture=true and highest priority
        document.addEventListener('click', safeInteractionHandler, true);
        
        // Add specific handlers
        document.addEventListener('click', handleTrackerClick, true);
        document.addEventListener('click', handleAccordionClick, true);
        document.addEventListener('click', handleMediaClick, true);
    }

    // Initialize everything
    function init() {
        console.log('Initializing Catz Module (Fixed Version)...');
        
        // Clean up any existing problematic handlers
        cleanupGlobalHandlers();
        
        // Setup safe interaction handling
        setupSafeInteractionHandler();
        
        // Render content
        renderSections();
        renderContent();
        renderProgressCount();
        
        // Init UI from storage
        const p = getProgress();
        document.querySelectorAll('.tracker-item').forEach(btn => {
            const id = btn.dataset.section;
            const checked = !!p[id];
            btn.setAttribute('aria-checked', String(checked));
            btn.classList.toggle('is-checked', checked);
        });
        
        // Final defensive measure: ensure our elements are properly isolated
        setTimeout(() => {
            document.querySelectorAll('.tracker-item, .accordion-toggle, .media-control').forEach(el => {
                // Ensure proper attributes
                el.setAttribute('data-no-router', 'true');
                if (el.tagName !== 'BUTTON') {
                    el.setAttribute('role', 'button');
                    el.setAttribute('tabindex', '0');
                }
                
                // Add specific event listener if not already added
                if (!el.hasAttribute('data-handler-added')) {
                    el.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                        
                        if (el.classList.contains('tracker-item')) {
                            handleTrackerClick(e);
                        } else if (el.classList.contains('accordion-toggle')) {
                            handleAccordionClick(e);
                        } else if (el.classList.contains('media-control')) {
                            handleMediaClick(e);
                        }
                        
                        return false;
                    }, true);
                    
                    el.setAttribute('data-handler-added', 'true');
                }
            });
        }, 100);
        
        console.log('Catz Module initialized successfully (Fixed Version)');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Make functions available globally for testing
    window.CatzModuleFixed = {
        getProgress,
        setProgress,
        renderProgressCount,
        safeScrollTo,
        handleTrackerClick,
        handleAccordionClick,
        handleMediaClick,
        cleanupGlobalHandlers,
        init
    };

})();
