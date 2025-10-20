/* Modern Portfolio Main JavaScript */
/* Core utilities and interactions */

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.setupImageLazyLoading();
    this.setupExternalLinks();
    this.addStaggeredAnimations();
    this.setupSidebarNavigation();
  }

  setupImageLazyLoading() {
    // Use native lazy loading with intersection observer fallback
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    } else {
      // Fallback for browsers that don't support native lazy loading
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  setupExternalLinks() {
    // Add target="_blank" and rel attributes to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  addStaggeredAnimations() {
    // Add staggered delays to grid items
    const gridItems = document.querySelectorAll('.bento-item, .timeline-item');
    gridItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 100}ms`;
      item.classList.add('reveal');
    });
  }

  setupSidebarNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    let currentActiveSection = null;

    // Update active link
    const updateActiveLink = (sectionId) => {
      if (currentActiveSection === sectionId) return;
      currentActiveSection = sectionId;

      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.sidebar-nav-link[data-section="${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    };

    // Check if scrolled to bottom (or very close)
    const isAtBottom = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Check if within 50px of bottom to account for rounding and slight scroll differences
      return (scrollTop + windowHeight) >= (documentHeight - 50);
    };

    // Combined scroll handler
    const handleScroll = this.throttle(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // If at bottom, always show Connect
      if (isAtBottom()) {
        updateActiveLink('three');
        return;
      }

      // Otherwise, find which section is most visible
      let maxVisibility = 0;
      let mostVisibleSection = null;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibility) {
          maxVisibility = visibleHeight;
          mostVisibleSection = section;
        }
      });

      if (mostVisibleSection) {
        updateActiveLink(mostVisibleSection.getAttribute('id'));
      }
    }, 100);

    // Listen to scroll
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load

    // Smooth scroll on click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Force update after scroll animation completes
          setTimeout(() => handleScroll(), 800);
        }
      });
    });
  }

  // Utility: Copy to clipboard
  copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve();
    }
  }

  // Utility: Show toast notification
  showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: var(--space-6);
      right: var(--space-6);
      background: var(--color-surface-elevated);
      color: var(--color-text-primary);
      padding: var(--space-4) var(--space-6);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--color-border);
      z-index: var(--z-tooltip);
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Utility: Debounce function
  debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Utility: Throttle function
  throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize app
const app = new PortfolioApp();

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}
