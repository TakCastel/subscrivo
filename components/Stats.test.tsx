import { render, screen } from '@testing-library/react';
import { Stats } from './Stats';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Category, Recurrence, Subscription } from '../types';

const wrap = (ui: React.ReactNode) => render(<LanguageProvider>{ui}</LanguageProvider>);

const sampleSubs: Subscription[] = [
  { id: '1', name: 'Netflix', price: 15, day: 10, recurrence: Recurrence.MONTHLY, category: Category.ENTERTAINMENT, color: '#E50914' },
  { id: '2', name: 'Gym', price: 30, day: 2, recurrence: Recurrence.WEEKLY, category: Category.HEALTH, color: '#10B981' },
];

describe('Stats', () => {
  it('affiche le total mensuel', () => {
    wrap(<Stats subscriptions={sampleSubs} currentDate={new Date('2025-01-15')} />);
    expect(screen.getByText(/Total/)).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import { Stats } from './Stats';
import { Recurrence, Subscription, Category } from '../types';

const subs: Subscription[] = [
  { id: '1', name: 'Netflix', price: 15, day: 5, recurrence: Recurrence.MONTHLY, category: Category.ENTERTAINMENT, color: '#E50914' },
  { id: '2', name: 'Basic-Fit', price: 20, day: 2, recurrence: Recurrence.WEEKLY, category: Category.HEALTH, color: '#FF4E00' },
];

describe('Stats', () => {
  it('affiche le total', () => {
    render(<Stats subscriptions={subs} currentDate={new Date('2025-01-15')} />);
    expect(screen.getByText(/€|$/)).toBeInTheDocument();
  });

  it('affiche le prochain paiement', () => {
    render(<Stats subscriptions={subs} currentDate={new Date('2025-01-01')} />);
    expect(screen.getByText(/Netflix|Basic-Fit/)).toBeInTheDocument();
  });
});

