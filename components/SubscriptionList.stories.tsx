import type { Meta, StoryObj } from '@storybook/react';
import { SubscriptionList } from './SubscriptionList';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Recurrence, Category, Subscription } from '../types';

const sampleSubs: Subscription[] = [
  { id: '1', name: 'Netflix', price: 15, day: 10, recurrence: Recurrence.MONTHLY, category: Category.ENTERTAINMENT, color: '#E50914' },
  { id: '2', name: 'Gym', price: 30, day: 2, recurrence: Recurrence.WEEKLY, category: Category.HEALTH, color: '#10B981' },
  { id: '3', name: 'Mobile', price: 20, day: 5, recurrence: Recurrence.MONTHLY, category: Category.UTILITIES, color: '#2563EB' },
];

const meta: Meta<typeof SubscriptionList> = {
  title: 'Métiers/SubscriptionList',
  component: SubscriptionList,
  decorators: [
    (Story) => (
      <LanguageProvider>
        <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen max-w-3xl">
          <Story />
        </div>
      </LanguageProvider>
    ),
  ],
  args: {
    subscriptions: sampleSubs,
    onEdit: () => {},
    onDelete: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SubscriptionList>;

export const Default: Story = {};

