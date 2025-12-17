import { Recurrence, Subscription } from '../types';

export interface MonthlyStats {
  totalCost: number;
  paidThisMonth: number;
  remainingThisMonth: number;
  nextPayment: { sub: Subscription; date: number } | null;
}

/**
 * Calcule les métriques mensuelles en tenant compte des récurrences hebdo.
 * On parcourt chaque jour du mois pour obtenir un coût réel et le prochain paiement.
 */
export const computeMonthlyStats = (
  subscriptions: Subscription[],
  currentDate: Date,
): MonthlyStats => {
  const currentDay = currentDate.getDate();
  let totalCost = 0;
  let paidThisMonth = 0;
  let remainingThisMonth = 0;
  let nextPayment: { sub: Subscription; date: number } | null = null;
  let minDiff = Number.MAX_SAFE_INTEGER;

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
    const dayOfWeek = dateObj.getDay();

    subscriptions.forEach((sub) => {
      const matches =
        sub.recurrence === Recurrence.WEEKLY ? sub.day === dayOfWeek : sub.day === d;

      if (!matches) return;

      totalCost += sub.price;
      if (d < currentDay) {
        paidThisMonth += sub.price;
        return;
      }

      remainingThisMonth += sub.price;
      const diff = d - currentDay;
      if (diff >= 0 && diff < minDiff) {
        minDiff = diff;
        nextPayment = { sub, date: d };
      }
    });
  }

  return { totalCost, paidThisMonth, remainingThisMonth, nextPayment };
};

