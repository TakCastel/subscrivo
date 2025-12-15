import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with higher z-index than SubscriptionForm */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-zinc-900/60 backdrop-blur-sm"
          />
          
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-zinc-950 rounded-[32px] w-full max-w-sm shadow-2xl p-6 pointer-events-auto border border-zinc-200 dark:border-zinc-800"
            >
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
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-xl font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {t('modal.cancel')}
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 py-3 px-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                  >
                    {t('modal.confirm')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};