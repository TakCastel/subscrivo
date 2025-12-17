import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  args: {
    children: <div>Contenu de carte</div>,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Padded: Story = {
  args: { padding: 'lg' },
};

