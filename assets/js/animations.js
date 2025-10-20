/* Scroll Animations */
/* Modern Intersection Observer-based scroll reveals */

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupObservers());
    } else {
      this.setupObservers();
    }
  }

  setupObservers() {
    // Reveal animations
    this.revealObserver = new IntersectionObserver(
      this.handleReveal.bind(this),
      this.observerOptions
    );

    // Observe all elements with .reveal class
    document.querySelectorAll('.reveal').forEach(element => {
      this.revealObserver.observe(element);
    });

    // Smooth scroll for anchor links
    this.setupSmoothScroll();
  }

  handleReveal(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optionally unobserve after revealing
        this.revealObserver.unobserve(entry.target);
      }
    });
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');

        // Skip empty anchors or just "#"
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  // Add staggered reveal effect to children
  staggerReveal(parentSelector, delay = 100) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    const children = parent.querySelectorAll('.reveal');
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * delay}ms`;
    });
  }

  // Parallax effect for hero backgrounds
  setupParallax(selector, speed = 0.5) {
    const element = document.querySelector(selector);
    if (!element) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      element.style.transform = `translateY(${scrolled * speed}px)`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // Progress indicator for case study pages
  setupProgressIndicator() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    let ticking = false;

    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;

      progressBar.style.width = `${Math.min(progress, 100)}%`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    });

    // Initial update
    updateProgress();
  }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollAnimations;
}
