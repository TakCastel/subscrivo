import { describe, expect, it } from 'vitest';
import { Recurrence, Subscription, Category } from '../types';
import { computeMonthlyStats } from './stats';

const makeSub = (partial: Partial<Subscription>): Subscription => ({
  id: partial.id || 'id',
  name: partial.name || 'Service',
  price: partial.price ?? 0,
  day: partial.day ?? 1,
  recurrence: partial.recurrence ?? Recurrence.MONTHLY,
  category: partial.category ?? Category.OTHER,
  color: partial.color ?? '#000',
  logo: partial.logo,
  domain: partial.domain,
});

describe('computeMonthlyStats', () => {
  it('calcule correctement les totaux et le prochain paiement (mensuel + hebdo)', () => {
    const currentDate = new Date('2025-01-15T00:00:00Z');
    const subs: Subscription[] = [
      makeSub({ id: 'monthly-paid', price: 10, day: 10, recurrence: Recurrence.MONTHLY }),
      makeSub({ id: 'monthly-upcoming', price: 20, day: 20, recurrence: Recurrence.MONTHLY }),
      // 4 mardis en janvier 2025 : 7,14,21,28
      makeSub({ id: 'weekly', price: 5, day: 2, recurrence: Recurrence.WEEKLY }),
    ];

    const stats = computeMonthlyStats(subs, currentDate);

    expect(stats.totalCost).toBe(50); // 10 + 20 + (5 * 4)
    expect(stats.paidThisMonth).toBe(20); // 10 (monthly) + 10 (weekly 2 occurrences)
    expect(stats.remainingThisMonth).toBe(30); // 20 (monthly) + 10 (weekly rest)
    expect(stats.nextPayment?.sub.id).toBe('monthly-upcoming');
    expect(stats.nextPayment?.date).toBe(20);
  });

  it('retourne null quand aucun paiement restant', () => {
    const currentDate = new Date('2025-01-31T00:00:00Z');
    const subs: Subscription[] = [
      makeSub({ id: 'monthly', price: 30, day: 1, recurrence: Recurrence.MONTHLY }),
    ];

    const stats = computeMonthlyStats(subs, currentDate);

    expect(stats.remainingThisMonth).toBe(0);
    expect(stats.nextPayment).toBeNull();
  });
});

