import { ref } from 'vue';

const THEME_COLORS = { dark: '#0e0b16', light: '#f7f5fb' };

// Shared state: index.html has already applied the saved theme before Vue starts.
const theme = ref(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

function apply(value) {
  theme.value = value;
  const root = document.documentElement;
  if (value === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[value]);

  try {
    localStorage.setItem('theme', value);
  } catch {
    // Private browsing / storage disabled: the toggle still works for this visit.
  }
}

export function useTheme() {
  return {
    theme,
    toggle: () => apply(theme.value === 'light' ? 'dark' : 'light'),
  };
}
