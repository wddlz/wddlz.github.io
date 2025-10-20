/* Theme Management */
/* Force dark mode only */

class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Always use dark mode
    this.setTheme('dark');
  }

  setTheme(theme) {
    // Force dark mode always
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  toggleTheme() {
    // No-op - theme switching disabled
  }

  getTheme() {
    return 'dark';
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
