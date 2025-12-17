import type { Meta, StoryObj } from '@storybook/react';
import { SubscriptionForm } from './SubscriptionForm';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Category, Recurrence, Subscription } from '../types';

const editSub: Subscription = {
  id: '1',
  name: 'Netflix',
  price: 15,
  day: 10,
  recurrence: Recurrence.MONTHLY,
  category: Category.ENTERTAINMENT,
  color: '#E50914',
};

const meta: Meta<typeof SubscriptionForm> = {
  title: 'Métiers/SubscriptionForm',
  component: SubscriptionForm,
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
  args: {
    isOpen: true,
    onClose: () => {},
    onSave: () => {},
    editData: editSub,
    onDelete: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SubscriptionForm>;

export const EditMode: Story = {};

export const CreateMode: Story = {
  args: { editData: undefined, initialDay: 5 },
};

