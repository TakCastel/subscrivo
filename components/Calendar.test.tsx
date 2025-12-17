import { render, screen } from '@testing-library/react';
import { Calendar } from './Calendar';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Category, Recurrence, Subscription } from '../types';

const wrap = (ui: React.ReactNode) => render(<LanguageProvider>{ui}</LanguageProvider>);

const sampleSubs: Subscription[] = [
  { id: '1', name: 'Netflix', price: 15, day: 10, recurrence: Recurrence.MONTHLY, category: Category.ENTERTAINMENT, color: '#E50914' },
];

describe('Calendar', () => {
  it('affiche les jours et abonnements', () => {
    wrap(
      <Calendar
        currentDate={new Date('2025-01-15')}
        subscriptions={sampleSubs}
        onEdit={() => {}}
        onAdd={() => {}}
        onMoveSubscription={() => {}}
      />,
    );
    expect(screen.getByTestId('day-cell-10')).toBeInTheDocument();
    expect(screen.getByText('Netflix')).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './Calendar';
import { Recurrence, Subscription, Category } from '../types';

const subs: Subscription[] = [
  { id: '1', name: 'Netflix', price: 15, day: 5, recurrence: Recurrence.MONTHLY, category: Category.ENTERTAINMENT, color: '#E50914' },
];

describe('Calendar', () => {
  it('affiche un abonnement sur le bon jour', () => {
    render(
      <Calendar
        currentDate={new Date('2025-01-01')}
        subscriptions={subs}
        onEdit={() => {}}
        onAdd={() => {}}
        onMoveSubscription={() => {}}
      />,
    );
    expect(screen.getByText('Netflix')).toBeInTheDocument();
  });

  it('déclenche onAdd quand on clique sur un jour vide', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(
      <Calendar
        currentDate={new Date('2025-01-01')}
        subscriptions={subs}
        onEdit={() => {}}
        onAdd={onAdd}
        onMoveSubscription={() => {}}
      />,
    );
    const dayCell = screen.getByTestId('day-cell-1');
    await user.click(dayCell);
    expect(onAdd).toHaveBeenCalled();
  });
});

