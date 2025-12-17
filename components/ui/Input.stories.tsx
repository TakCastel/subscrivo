import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Texte d’aide' },
};

