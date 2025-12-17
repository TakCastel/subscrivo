import type { Meta, StoryObj } from '@storybook/react';
import { Stats } from './Stats';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Recurrence, Category, Subscription } from '../types';

const sampleSubs: Subscription[] = [
  { id: '1', name: 'Netflix', price: 15, day: 10, recurrence: Recurrence.MONTHLY, category: Category.ENTERTAINMENT, color: '#E50914' },
  { id: '2', name: 'Gym', price: 30, day: 2, recurrence: Recurrence.WEEKLY, category: Category.HEALTH, color: '#10B981' },
];

const meta: Meta<typeof Stats> = {
  title: 'Métiers/Stats',
  component: Stats,
  decorators: [
    (Story) => (
      <LanguageProvider>
        <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
          <Story />
        </div>
      </LanguageProvider>
    ),
  ],
  args: {
    subscriptions: sampleSubs,
    currentDate: new Date('2025-01-15'),
  },
};

export default meta;
type Story = StoryObj<typeof Stats>;

export const Default: Story = {};

