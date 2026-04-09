// Dark Mode Toggle

const toggle = document.querySelectorAll('.darkModeToggle');
const htmlElement = document.documentElement;

// Function to apply theme
const applyTheme = (theme) => {
    htmlElement.setAttribute('data-bs-theme', theme);
    
    // CHANGE IS HERE: Use .forEach to update all checkboxes at once
    toggle.forEach(el => {
        el.checked = (theme === 'dark');
    });
};

// Initial Load: Check localStorage, then OS preference
const savedTheme = localStorage.getItem('theme');
const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme(systemDarkMode.matches ? 'dark' : 'light');
}

// Manual Toggle: This part was already correct in your snippet!
toggle.forEach(toggle => {
    toggle.addEventListener('change', () => {
        const newTheme = toggle.checked ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// System Change: Update only if user hasn't set a manual preference
systemDarkMode.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
