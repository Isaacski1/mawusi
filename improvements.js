/**
 * Mawusi Restaurant - Website Improvements
 * This file contains all the enhancements for better UX and SEO
 */

// ==================== FLOATING WHATSAPP BUTTON ====================
document.addEventListener('DOMContentLoaded', function() {
  // Create floating WhatsApp button
  const whatsappButton = document.createElement('a');
  whatsappButton.href = 'https://wa.me/233549175604?text=Hi%20Mawusi,%20I%20want%20to%20order%20food';
  whatsappButton.target = '_blank';
  whatsappButton.className = 'floating-whatsapp';
  whatsappButton.innerHTML = `
    <i class="fab fa-whatsapp"></i>
    <span class="tooltip">Chat on WhatsApp</span>
  `;
  whatsappButton.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 27px;
    color: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 999;
    transition: all 0.3s ease;
    text-decoration: none;
  `;
  
  whatsappButton.onmouseover = function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.4)';
  };
  
  whatsappButton.onmouseout = function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  };
  
  document.body.appendChild(whatsappButton);

  // Mobile footer navigation
  const mobileFooterNav = document.createElement('div');
  mobileFooterNav.className = 'mobile-footer-nav';
  mobileFooterNav.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    z-index: 998;
    border-top: 1px solid #eee;
  `;
  
  const actions = [
    { icon: 'fas fa-phone', label: 'Call', href: 'tel:+233244046745' },
    { icon: 'fas fa-shopping-cart', label: 'Order', href: 'order-food.html' },
    { icon: 'fas fa-utensils', label: 'Menu', href: 'menu-card.html' }
  ];
  
  actions.forEach(action => {
    const btn = document.createElement('a');
    btn.href = action.href;
    if (action.href.startsWith('https')) btn.target = '_blank';
    btn.className = 'mobile-action-btn';
    btn.style.cssText = `
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px;
      text-decoration: none;
      color: #362725;
      font-size: 12px;
    `;
    btn.innerHTML = `<i style="font-size: 20px; margin-bottom: 4px;" class="${action.icon}"></i>${action.label}`;
    mobileFooterNav.appendChild(btn);
  });
  
  // Show on mobile screens
  const showMobileNav = () => {
    if (window.innerWidth <= 768) {
      mobileFooterNav.style.display = 'flex';
    } else {
      mobileFooterNav.style.display = 'none';
    }
  };
  
  document.body.appendChild(mobileFooterNav);
  showMobileNav();
  window.addEventListener('resize', showMobileNav);
});

// ==================== HERO SECTION CTA ====================
function addHeroCTA() {
  const heroBanner = document.querySelector('.banner-area');
  if (heroBanner) {
    // Add urgency to existing CTA
    const existingCTA = heroBanner.querySelector('.food-btn');
    if (existingCTA) {
      existingCTA.innerHTML = '<span>Order Now - 30 Min Delivery!</span>';
      existingCTA.style.animation = 'pulse 2s infinite';
    }
  }
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @media (max-width: 768px) {
    body {
      padding-bottom: 80px;
    }
  }
`;
document.head.appendChild(style);

// ==================== TESTIMONIALS WIDGET ====================
function addTestimonials() {
  const testimonials = [
    {
      name: 'Kwame A.',
      text: 'Best jollof rice in Swedru! Fresh, hot, and delivered on time.',
      rating: 5
    },
    {
      name: 'Ama B.',
      text: 'Love the fufu and light soup. Authentic taste, reasonable prices.',
      rating: 5
    },
    {
      name: 'Kofi K.',
      text: 'Fast delivery and excellent customer service. Will order again!',
      rating: 5
    },
    {
      name: 'Yaa Y.',
      text: 'My family loves Mawusi! The portions are generous and food is always fresh.',
      rating: 5
    }
  ];

  const section = document.querySelector('.testimonial-section') || document.querySelector('.section-wrapper');
  if (!section) return;

  const container = document.createElement('div');
  container.className = 'testimonials-container';
  container.style.cssText = `
    margin-top: 60px;
    padding: 40px 20px;
    background: #f9f9f9;
    border-radius: 8px;
  `;
  
  const title = document.createElement('h3');
  title.textContent = '⭐ What Our Customers Say';
  title.style.cssText = 'text-align: center; margin-bottom: 30px; color: #362725;';
  container.appendChild(title);

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;';

  testimonials.forEach(testimonial => {
    const card = document.createElement('div');
    card.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    
    const stars = '⭐'.repeat(testimonial.rating);
    card.innerHTML = `
      <div style="margin-bottom: 10px; font-size: 14px;">${stars}</div>
      <p style="font-style: italic; margin-bottom: 15px; color: #696969;">"${testimonial.text}"</p>
      <p style="font-weight: bold; color: #362725;">- ${testimonial.name}</p>
    `;
    
    grid.appendChild(card);
  });

  container.appendChild(grid);
  
  // Insert after section-wrapper if it exists
  if (section.parentNode) {
    section.parentNode.insertBefore(container, section.nextSibling);
  }
}

// ==================== FORM IMPROVEMENTS ====================
function improveFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
      // Add real-time validation feedback
      input.addEventListener('blur', function() {
        if (!this.value.trim()) {
          this.style.borderColor = '#dc3545';
          this.style.backgroundColor = '#fff5f5';
        } else {
          this.style.borderColor = '#28a745';
          this.style.backgroundColor = '#f5fff5';
        }
      });

      input.addEventListener('focus', function() {
        this.style.borderColor = '#80bdff';
        this.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
      });
    });

    // Add better form submission
    form.addEventListener('submit', function(e) {
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#dc3545';
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields');
      }
    });
  });
}

// ==================== IMAGE LAZY LOADING ====================
function enableLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// ==================== PERFORMANCE TRACKING ====================
function trackPerformance() {
  if (window.performance) {
    window.addEventListener('load', function() {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      console.log('Page Load Time:', pageLoadTime + 'ms');
      
      // Send to analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          'value': pageLoadTime,
          'event_category': 'performance'
        });
      }
    });
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
  addHeroCTA();
  improveFormValidation();
  enableLazyLoading();
  trackPerformance();
  
  console.log('✅ Mawusi Restaurant improvements loaded successfully!');
});
