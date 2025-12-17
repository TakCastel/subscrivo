import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Ouvrir</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold mb-2">Modal Story</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Contenu de test.</p>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setOpen(false)}>Fermer</Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

