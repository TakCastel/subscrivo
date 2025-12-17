import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmModal } from './ConfirmModal';
import { LanguageProvider } from '../contexts/LanguageContext';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Métiers/ConfirmModal',
  component: ConfirmModal,
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
    onConfirm: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {};

