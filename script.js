/**
 * GLAM STUDIO - JAVASCRIPT CONTROLLER
 * Location: Bhaktapur, Nepal
 * Contact: 9845623870
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, #mobileBookBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const selectServiceBtns = document.querySelectorAll('.select-service-btn');
  const serviceSelect = document.getElementById('serviceSelect');
  const bookingForm = document.getElementById('bookingForm');
  const formFeedback = document.getElementById('formFeedback');
  const appointmentDate = document.getElementById('appointmentDate');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  // Set min date for booking to today
  if (appointmentDate) {
    const today = new Date().toISOString().split('T')[0];
    appointmentDate.min = today;
  }

  /* --------------------------------------------------------------------------
     1. Sticky Header & Back to Top
     -------------------------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header shadow
    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollPos > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Mobile Drawer Navigation
     -------------------------------------------------------------------------- */
  function openMobileDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileDrawer);
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeMobileDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMobileDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  /* --------------------------------------------------------------------------
     3. Active Nav Link on Scroll
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. Portfolio Filtering
     -------------------------------------------------------------------------- */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. Portfolio Lightbox Viewer
     -------------------------------------------------------------------------- */
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || 'Glam Studio Portfolio Look';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgSrc = trigger.getAttribute('data-img');
      const caption = trigger.getAttribute('data-caption');
      openLightbox(imgSrc, caption);
    });
  });

  // Also enable clicking the card itself to open lightbox
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      const trigger = card.querySelector('.lightbox-trigger');
      if (trigger) {
        const imgSrc = trigger.getAttribute('data-img');
        const caption = trigger.getAttribute('data-caption');
        openLightbox(imgSrc, caption);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* --------------------------------------------------------------------------
     6. Quick "Book This Service" Button Connectors
     -------------------------------------------------------------------------- */
  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service-name');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
      
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Highlight dropdown briefly
        setTimeout(() => {
          serviceSelect.focus();
          serviceSelect.style.borderColor = 'var(--color-primary)';
          serviceSelect.style.boxShadow = '0 0 0 4px rgba(197, 160, 89, 0.3)';
          setTimeout(() => {
            serviceSelect.style.borderColor = '';
            serviceSelect.style.boxShadow = '';
          }, 1500);
        }, 600);
      }
    });
  });

  /* --------------------------------------------------------------------------
     7. Booking Form Handler with WhatsApp Integration
     -------------------------------------------------------------------------- */
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = serviceSelect.value;
      const date = appointmentDate.value;
      const time = document.getElementById('appointmentTime').value;
      const channel = document.getElementById('bookingChannel').value;
      const notes = document.getElementById('specialNotes').value.trim();

      if (!name || !phone || !service || !date || !time) {
        showFeedback('Please fill out all required fields marked with *.', 'error');
        return;
      }

      // Success Feedback
      showFeedback(`Thank you, ${name}! Your booking request for ${service} on ${date} (${time}) has been registered. Connecting to Glam Studio WhatsApp...`, 'success');

      // Prepare WhatsApp message
      const waMessage = `✨ *New Appointment Request - Glam Studio Bhaktapur* ✨%0A%0A` +
        `👤 *Client Name:* ${encodeURIComponent(name)}%0A` +
        `📞 *Contact:* ${encodeURIComponent(phone)}%0A` +
        `💄 *Service Requested:* ${encodeURIComponent(service)}%0A` +
        `📅 *Preferred Date:* ${encodeURIComponent(date)}%0A` +
        `⏰ *Preferred Time Slot:* ${encodeURIComponent(time)}%0A` +
        `📲 *Confirmation Method:* ${encodeURIComponent(channel)}%0A` +
        (notes ? `📝 *Notes:* ${encodeURIComponent(notes)}%0A%0A` : `%0A`) +
        `_Sent via Glam Studio Website_`;

      const waUrl = `https://wa.me/9779845623870?text=${waMessage}`;

      // Open WhatsApp in new tab after 1 second
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);

      // Reset form
      bookingForm.reset();
    });
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';

    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 9000);
  }
});
