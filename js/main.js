document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion Functionality
  initFaqAccordions();

  // 2. Lightbox Preview Functionality
  initLightbox();

  // 3. Form Handling & Systeme.io Auto-Redirect / Local Storage Save
  initForms();

  // 4. Mobile Menu Toggle
  initMobileMenu();

  // 5. UTM & Query Parameters Auto-Forwarder for Systeme.io Forms
  initUtmForwarder();

  // 6. Smooth Scroll for Anchor Links
  initSmoothScroll();

  // 7. Scroll Reveal Animation Handler
  initScrollReveal();

  // 8. Interactive Modal for Material de Apoyo Cards
  initMaterialCardsModal();
});

/**
 * FAQ Accordion Handler
 */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordions for clean single view
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Lightbox Image Preview Handler
 */
function initLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const triggers = document.querySelectorAll('[data-lightbox-src]');

  if (!lightbox) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src');
      const caption = trigger.getAttribute('data-lightbox-caption') || '';

      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * Lead Form Handler with Systeme.io Action Support & Local Storage Personalization
 */
function initForms() {
  const optinForms = document.querySelectorAll('form.systeme-optin-form, #optin-form');

  optinForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const nameInput = form.querySelector('input[name="first_name"], input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (nameInput) {
        localStorage.setItem('vivesano_user_name', nameInput.value.trim());
      }
      if (emailInput) {
        localStorage.setItem('vivesano_user_email', emailInput.value.trim());
      }

      // Check if action attribute is configured to a real external endpoint (e.g. systeme.io)
      const actionUrl = form.getAttribute('action');
      const isCustomAction = actionUrl && actionUrl !== '#' && !actionUrl.includes('YOUR_SYSTEME_IO');

      if (!isCustomAction) {
        // Client-side fallback mode (Direct redirect to gracias.html)
        e.preventDefault();
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg class="animate-spin" style="width:1.2rem;height:1.2rem;animation:spin 1s linear infinite;" fill="none" viewBox="0 0 24 24">
              <circle style="opacity:0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path style="opacity:0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ENVIANDO REGISTRO...
          `;
        }

        setTimeout(() => {
          window.location.href = 'gracias.html';
        }, 600);
      } else {
        // Form submits natively to Systeme.io endpoint
        if (submitBtn) {
          submitBtn.innerHTML = 'PROCESANDO REGISTRO...';
        }
      }
    });
  });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '4.5rem';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.backgroundColor = '#FFFFFF';
      navLinks.style.padding = '1.5rem';
      navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      navLinks.style.borderBottom = '1px solid #E0E7E2';
    }
  });
}

/**
 * Forward URL UTM parameters to hidden form inputs for Systeme.io tracking
 */
function initUtmForwarder() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    utmParams.forEach(param => {
      if (urlParams.has(param)) {
        let input = form.querySelector(`input[name="${param}"]`);
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = param;
          form.appendChild(input);
        }
        input.value = urlParams.get(param);
      }
    });
  });
}

/**
 * Smooth Scroll for internal anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile nav if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && window.innerWidth <= 992) {
          navLinks.style.display = 'none';
        }
      }
    });
  });
}

/**
 * Scroll Reveal Animation Handler (IntersectionObserver)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Interactive Modal Handler for Material de Apoyo Cards
 */
function initMaterialCardsModal() {
  const cards = document.querySelectorAll('.material-card');
  if (!cards.length) return;

  // Create modal element dynamically if not present
  let modalOverlay = document.getElementById('material-preview-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'material-preview-modal';
    modalOverlay.className = 'preview-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="preview-modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-material-title">
        <button type="button" class="preview-modal-close" id="material-modal-close" aria-label="Cerrar vista previa">&times;</button>
        <div class="preview-modal-body">
          <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border:1px solid #E2E8F0;">
            <img id="modal-material-img" src="" alt="Vista previa en HD" style="width:100%; height:auto; display:block;">
          </div>
          <div style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <span id="modal-material-tag" class="status-pill status-pill-green" style="margin-bottom:1rem; display:inline-flex;">MATERIAL PDF</span>
              <h3 id="modal-material-title" style="font-family:var(--font-serif); font-size:1.75rem; color:var(--color-emerald-deep); margin-bottom:0.75rem;"></h3>
              <p id="modal-material-desc" style="color:var(--color-text-muted); font-size:1.02rem; line-height:1.6; margin-bottom:1.5rem;"></p>

              <div style="background-color:#F8FAF9; padding:1.25rem; border-radius:var(--radius-md); border:1px solid #E4EAE6; margin-bottom:1.5rem;">
                <h4 style="font-size:0.8rem; font-weight:800; color:var(--color-vive-blue-deep); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.75rem;">Lo que descubrirás en este material:</h4>
                <ul id="modal-material-features" style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem; font-size:0.925rem; color:var(--color-text-main);">
                </ul>
              </div>
            </div>

            <a href="#formulario" id="modal-material-cta" class="btn btn-primary btn-full btn-gold" style="text-align:center; justify-content:center;">
              DESCARGAR ESTE RECURSO GRATIS
              <svg style="width:1.2rem;height:1.2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  const materialData = {
    "1": {
      title: "Diario Digestivo",
      tag: "📓 REGISTRO & SEGUIMIENTO DIARIO",
      desc: "Registra lo que comes y cómo te sientes para entender tu propio patrón digestivo día con día sin complicaciones.",
      img: "assets/images/guide/diario-digestivo-mockup.jpg",
      features: [
        "✓ Registro de horarios de comida y nivel de saciedad.",
        "✓ Escala visual de síntomas para identificar molestias al instante.",
        "✓ Rastreador de agua, energía cotidiana y nivel de descanso.",
        "✓ Sección de observaciones para detectar alimentos sensibles."
      ]
    },
    "2": {
      title: "8 Semáforos Digestivos",
      tag: "🚦 DIAGNÓSTICO VISUAL RÁPIDO",
      desc: "Uno para cada señal clave de tu cuerpo (gases, inflamación, pesadez, tránsito), para que identifiques en qué color está tu cuerpo.",
      img: "assets/images/guide/semaforos-digestivos-mockup.jpg",
      features: [
        "🟢 Color Verde: Digestión ligera, energía sostenida y equilibrio.",
        "🟡 Color Ámbar: Sensibilidad leve o pesadez tras ciertas comidas.",
        "🔴 Color Rojo: Inflamación notable o malestar que requiere descanso.",
        "✓ Guía visual para escuchar tus señales sin ansiedad."
      ]
    },
    "3": {
      title: "Semáforo FODMAP",
      tag: "🥗 CLASIFICACIÓN DE ALIMENTOS",
      desc: "Identifica de forma rápida y visual qué alimentos son amables con tu intestino y cuáles pueden estar provocando tus gases.",
      img: "assets/images/guide/semaforo-fodmap-mockup.jpg",
      features: [
        "🟢 Bajo FODMAP: Calabacita, espinacas, zanahoria, quinoa, fresas.",
        "🟡 Moderado FODMAP: Camote, lentejas cocidas, melón.",
        "🔴 Alto FODMAP (Trigger): Ajo, cebolla, trigo, manzanilla en exceso.",
        "✓ Tabla de sustituciones inteligentes para cocinar delicioso."
      ]
    },
    "4": {
      title: "Guía FODMAP: Descubre por qué te inflamas",
      tag: "🧘‍♀️ GUÍA PRÁCTICA & EJERCICIO COMBINACIONES",
      desc: "Conoce qué alimentos le dan descanso a tu digestión, cuáles conviene limitar y un ejercicio interactivo para revisar tus combinaciones diarias.",
      img: "assets/images/guide/guia-fodmap-mockup.jpg",
      features: [
        "✓ Explicación sencilla de la fermentación intestinal sin modismos médicos.",
        "✓ Pautas de descanso digestivo y combinaciones amables.",
        "✓ Ejercicio práctico de combinación de platos paso a paso.",
        "✓ Recomendaciones de hábitos post-comida para evitar la inflamación."
      ]
    }
  };

  const closeBtn = document.getElementById('material-modal-close');
  const modalImg = document.getElementById('modal-material-img');
  const modalTag = document.getElementById('modal-material-tag');
  const modalTitle = document.getElementById('modal-material-title');
  const modalDesc = document.getElementById('modal-material-desc');
  const modalFeatures = document.getElementById('modal-material-features');
  const modalCta = document.getElementById('modal-material-cta');

  cards.forEach(card => {
    const openModal = () => {
      const matId = card.getAttribute('data-material');
      const data = materialData[matId];
      if (!data) return;

      if (modalImg) modalImg.src = data.img;
      if (modalTag) modalTag.textContent = data.tag;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalDesc) modalDesc.textContent = data.desc;
      
      if (modalFeatures) {
        modalFeatures.innerHTML = data.features.map(f => `
          <li style="display:flex; align-items:flex-start; gap:0.5rem;">
            <span style="color:var(--color-status-green-text); font-weight:bold;">${f.charAt(0)}</span>
            <span>${f.substring(1)}</span>
          </li>
        `).join('');
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    card.addEventListener('click', openModal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });

  if (modalCta) {
    modalCta.addEventListener('click', () => {
      closeModal();
    });
  }
}

