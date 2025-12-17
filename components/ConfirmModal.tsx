import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useLanguage();

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="bg-white dark:bg-zinc-950 rounded-[32px] shadow-2xl p-6 border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>
          
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-2">
            {t('modal.delete_title')}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-8">
            {t('modal.delete_message')}
          </p>

          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              {t('modal.cancel')}
            </Button>
            <Button variant="danger" className="flex-1" onClick={onConfirm}>
              {t('modal.confirm')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};