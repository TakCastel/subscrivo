import { describe, expect, it, beforeEach } from 'vitest';
import { loadSubscriptions, saveSubscriptions, loadTheme, saveTheme, loadCountry, saveCountry } from './storageService';
import { Subscription, Category, Recurrence } from '../types';

const sampleSub: Subscription = {
  id: '1',
  name: 'Test',
  price: 10,
  day: 1,
  recurrence: Recurrence.MONTHLY,
  category: Category.OTHER,
  color: '#000',
};

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('migre les anciennes clés de subscriptions', () => {
    localStorage.setItem('submeez_data', JSON.stringify([sampleSub]));
    const loaded = loadSubscriptions();
    expect(loaded).toHaveLength(1);
    expect(localStorage.getItem('subscrivo_data')).not.toBeNull();
    expect(localStorage.getItem('submeez_data')).toBeNull();
  });

  it('sauvegarde et charge les subscriptions', () => {
    saveSubscriptions([sampleSub]);
    const loaded = loadSubscriptions();
    expect(loaded[0].name).toBe('Test');
  });

  it('migre et persiste le thème', () => {
    localStorage.setItem('velora_theme', 'dark');
    expect(loadTheme()).toBe('dark');
    expect(localStorage.getItem('subscrivo_theme')).toBe('dark');

    saveTheme('light');
    expect(loadTheme()).toBe('light');
  });

  it('migre et persiste le pays', () => {
    localStorage.setItem('subcal_country', 'US');
    expect(loadCountry()).toBe('US');
    expect(localStorage.getItem('subscrivo_country')).toBe('US');

    saveCountry('FR');
    expect(loadCountry()).toBe('FR');
  });
});

