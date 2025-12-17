import { render, screen } from '@testing-library/react';
import { SubscriptionList } from './SubscriptionList';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Category, Recurrence, Subscription } from '../types';

const wrap = (ui: React.ReactNode) => render(<LanguageProvider>{ui}</LanguageProvider>);

const sampleSubs: Subscription[] = [
  { id: '1', name: 'Netflix', price: 15, day: 10, recurrence: Recurrence.MONTHLY, category: Category.ENTERTAINMENT, color: '#E50914' },
  { id: '2', name: 'Gym', price: 30, day: 2, recurrence: Recurrence.WEEKLY, category: Category.HEALTH, color: '#10B981' },
];

describe('SubscriptionList', () => {
  it('rend les abonnements triés', () => {
    wrap(<SubscriptionList subscriptions={sampleSubs} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import { SubscriptionList } from './SubscriptionList';
import { Recurrence, Subscription, Category } from '../types';

const subs: Subscription[] = [
  { id: '1', name: 'Netflix', price: 15, day: 5, recurrence: Recurrence.MONTHLY, category: Category.ENTERTAINMENT, color: '#E50914' },
  { id: '2', name: 'Basic-Fit', price: 20, day: 1, recurrence: Recurrence.WEEKLY, category: Category.HEALTH, color: '#FF4E00' },
];

describe('SubscriptionList', () => {
  it('affiche les abonnements', () => {
    render(<SubscriptionList subscriptions={subs} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Basic-Fit')).toBeInTheDocument();
  });
});

