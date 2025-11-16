// Polyfill for requestAnimationFrame
const requestAnimFrame = (() => {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// Easing functions
const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// Get the current scroll position
const getCurrentScroll = () => {
  if (window.pageYOffset !== undefined) {
    return window.pageYOffset;
  } else if (window.scrollY !== undefined) {
    return window.scrollY;
  } else {
    return (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }
};

// Check if element is in viewport
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Smooth scroll to element with offset and callback
const smoothScrollTo = (element, offset = 0, callback) => {
  if (!element) return;

  const start = getCurrentScroll();
  const target = element.getBoundingClientRect().top + start - offset;
  const duration = 800; // ms
  let startTime = null;

  const animateScroll = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const timeElapsed = timestamp - startTime;
    const run = easeInOutQuad(Math.min(timeElapsed / duration, 1));
    
    window.scrollTo(0, start + (target - start) * run);
    
    if (timeElapsed < duration) {
      requestAnimFrame(animateScroll);
    } else if (typeof callback === 'function') {
      callback();
    }
  };

  requestAnimFrame(animateScroll);
};

// Smooth scroll to top with callback
const scrollToTop = (callback) => {
  const start = getCurrentScroll();
  const duration = 600; // ms
  let startTime = null;

  const animateScroll = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const timeElapsed = timestamp - startTime;
    const run = easeInOutQuad(Math.min(timeElapsed / duration, 1));
    
    window.scrollTo(0, start - start * run);
    
    if (timeElapsed < duration) {
      requestAnimFrame(animateScroll);
    } else if (typeof callback === 'function') {
      callback();
    }
  };

  requestAnimFrame(animateScroll);
};

// Handle scroll events with throttling
const initSmoothScrolling = () => {
  // Handle anchor links
  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) {
      const anchor = e.target.closest('a[href^="#"]');
      const href = anchor.getAttribute('href');
      
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80; // Adjust based on your header height
        smoothScrollTo(target, headerOffset, () => {
          // Update URL without adding to history
          history.replaceState(null, null, href);
        });
      }
    }
  });

  // Add smooth scrolling to all scrollable containers
  document.querySelectorAll('.scroll-container').forEach(container => {
    container.style.scrollBehavior = 'smooth';
    container.style.WebkitOverflowScrolling = 'touch';
  });

  // Handle back/forward navigation
  window.addEventListener('popstate', () => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        smoothScrollTo(target, 80);
      }
    }
  });
};

// Initialize on page load
const init = () => {
  // Wait for fonts to load for accurate scroll calculations
  if (document.fonts) {
    document.fonts.ready.then(() => {
      initSmoothScrolling();
    });
  } else {
    initSmoothScrolling();
  }

  // Handle initial hash in URL
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        smoothScrollTo(target, 80);
      }, 100);
    }
  }
};

// Export public API
export {
  smoothScrollTo,
  scrollToTop,
  initSmoothScrolling,
  isInViewport
};

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
  
  // Make functions available globally
  window.smoothScrollTo = smoothScrollTo;
  window.scrollToTop = scrollToTop;
}
