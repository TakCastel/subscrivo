import { CountryCode, Subscription } from '../shared/config/types';

const SUB_KEY = 'subscrivo_data';
const THEME_KEY = 'subscrivo_theme';
const COUNTRY_KEY = 'subscrivo_country';

const legacySubKeys = ['submeez_data', 'velora_data', 'subcal_data'];
const legacyThemeKeys = ['submeez_theme', 'velora_theme'];
const legacyCountryKeys = ['submeez_country', 'velora_country', 'subcal_country'];

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const loadSubscriptions = (): Subscription[] => {
  if (typeof localStorage === 'undefined') return [];

  for (const key of legacySubKeys) {
    const old = localStorage.getItem(key);
    if (old) {
      localStorage.setItem(SUB_KEY, old);
      localStorage.removeItem(key);
      return safeParse<Subscription[]>(old, []);
    }
  }

  return safeParse<Subscription[]>(localStorage.getItem(SUB_KEY), []);
};

export const saveSubscriptions = (subs: Subscription[]) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(SUB_KEY, JSON.stringify(subs));
};

export const loadTheme = (): 'light' | 'dark' => {
  if (typeof localStorage === 'undefined') return 'light';
  for (const key of legacyThemeKeys) {
    const old = localStorage.getItem(key) as 'light' | 'dark' | null;
    if (old) {
      localStorage.setItem(THEME_KEY, old);
      localStorage.removeItem(key);
      return old;
    }
  }
  const saved = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const saveTheme = (theme: 'light' | 'dark') => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
};

export const loadCountry = (): CountryCode | null => {
  if (typeof localStorage === 'undefined') return null;
  for (const key of legacyCountryKeys) {
    const old = localStorage.getItem(key) as CountryCode | null;
    if (old) {
      localStorage.setItem(COUNTRY_KEY, old);
      localStorage.removeItem(key);
      return old;
    }
  }
  return (localStorage.getItem(COUNTRY_KEY) as CountryCode | null) || null;
};

export const saveCountry = (country: CountryCode) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(COUNTRY_KEY, country);
};

