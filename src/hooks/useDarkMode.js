import { useCallback, useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

/* -------------------------------------------------------------------------- */
/* Module-level store                                                          */
/* Every caller of useDarkMode() reads the SAME state, so toggling from the    */
/* Navbar is immediately visible to Hero (and any other consumer) without      */
/* wiring up a Context provider.                                               */
/* -------------------------------------------------------------------------- */

const listeners = new Set();

let currentTheme = 'light';
let hasExplicitChoice = false;
let initialized = false;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const getMediaQueryList = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }
  return window.matchMedia(MEDIA_QUERY);
};

/** Safari < 14 and older Chrome only expose addListener/removeListener. */
const addMediaListener = (mql, handler) => {
  if (!mql) return;
  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', handler);
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(handler);
  }
};

const removeMediaListener = (mql, handler) => {
  if (!mql) return;
  if (typeof mql.removeEventListener === 'function') {
    mql.removeEventListener('change', handler);
  } else if (typeof mql.removeListener === 'function') {
    mql.removeListener(handler);
  }
};

/** @returns {'light'|'dark'|null} null means the user has never chosen manually. */
const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null; // private mode / blocked cookies / sandboxed iframe
  }
};

const getSystemTheme = () => (getMediaQueryList()?.matches ? 'dark' : 'light');

const applyTheme = (value) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', value === 'dark'); // Tailwind darkMode: 'class'
  root.setAttribute('data-theme', value); // CSS variables under [data-theme="dark"]
  root.style.colorScheme = value; // native scrollbars and form controls
};

const init = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const stored = readStoredTheme();
  hasExplicitChoice = stored !== null;
  currentTheme = stored ?? getSystemTheme();
  applyTheme(currentTheme);
};

const setTheme = (nextTheme, explicit) => {
  if (currentTheme === nextTheme && hasExplicitChoice === explicit) return;
  currentTheme = nextTheme;
  hasExplicitChoice = explicit;
  applyTheme(nextTheme);
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => {
  init();
  return currentTheme; // primitive string, so it stays referentially stable
};

const getServerSnapshot = () => 'light';

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export default function useDarkMode() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Track the OS theme live, but only while the user has made no explicit choice.
  useEffect(() => {
    init();

    const mql = getMediaQueryList();
    if (!mql) return undefined;

    // Re-sync once: the OS theme may have changed between the first render
    // and the moment this effect runs.
    if (!hasExplicitChoice) {
      setTheme(mql.matches ? 'dark' : 'light', false);
    }

    const handleChange = (event) => {
      if (hasExplicitChoice) return; // user has overridden, so ignore the OS
      setTheme(event.matches ? 'dark' : 'light', false);
    };

    addMediaListener(mql, handleChange);
    return () => removeMediaListener(mql, handleChange);
  }, []);

  // A manual toggle counts as an explicit choice: persist it and stop following the OS.
  const toggleTheme = useCallback(() => {
    const next = currentTheme === 'dark' ? 'light' : 'dark';
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the theme still works for this session even without storage.
    }
    setTheme(next, true);
  }, []);

  return [theme, toggleTheme];
}

export { useDarkMode };