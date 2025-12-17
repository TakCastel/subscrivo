import React from 'react';
import { Subscription, Recurrence } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { Edit2, ChevronRight, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ServiceLogo } from './ServiceLogo';
import { sortSubscriptions } from '../utils/subscriptions';

interface Props {
  subscriptions: Subscription[];
  onEdit: (sub: Subscription) => void;
  onDelete: (id: string) => void;
}

export const SubscriptionList: React.FC<Props> = ({ subscriptions, onEdit, onDelete }) => {
  const { t, config, getCategoryLabel, dateLocale } = useLanguage();
  
  const sortedSubs = sortSubscriptions(subscriptions);
  
  const formatMoney = (num: number) => new Intl.NumberFormat(dateLocale, { style: 'currency', currency: config.currencyCode }).format(num);

  const getDayLabel = (sub: Subscription) => {
    if (sub.recurrence === Recurrence.WEEKLY) {
        // day 0 = Sunday, 1 = Monday
        const d = new Date();
        // Reset to a known Sunday
        d.setDate(d.getDate() - d.getDay() + sub.day);
        return `${t('list.every')} ${d.toLocaleDateString(dateLocale, { weekday: 'long' })}`;
    }
    return `${t('list.on')} ${sub.day}`;
  };

  return (
    <div className="sticky top-24">
      <div className="flex justify-between items-baseline mb-6 px-2">
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">{t('list.title')}</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-500">{subscriptions.length}</span>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 rounded-[32px] shadow-soft dark:shadow-none border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        {sortedSubs.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-full mx-auto mb-4 flex items-center justify-center text-zinc-300">
                <Edit2 size={24} />
            </div>
            <p className="text-zinc-900 dark:text-white font-bold mb-1">{t('list.empty_title')}</p>
            <p className="text-zinc-500 text-sm">{t('list.empty_desc')}</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-50 dark:divide-zinc-800 max-h-[600px] overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {sortedSubs.map((sub, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={sub.id} 
                  className="group flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-black transition-colors cursor-pointer" 
                  onClick={() => onEdit(sub)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-sm border border-zinc-100 dark:border-zinc-800 p-2 flex-shrink-0">
                        <ServiceLogo 
                          name={sub.name} 
                          logo={sub.logo} 
                          domain={sub.domain}
                          color={sub.color} 
                          className="w-full h-full object-contain"
                        />
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm truncate">{sub.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                             {sub.recurrence === Recurrence.WEEKLY && <Repeat size={10} />}
                             {getDayLabel(sub)}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${CATEGORY_COLORS[sub.category] || 'bg-zinc-100 text-zinc-500'}`}>
                          {getCategoryLabel(sub.category)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className="font-extrabold text-zinc-900 dark:text-white text-sm block">
                        {formatMoney(sub.price)}
                        </span>
                        {sub.recurrence === Recurrence.WEEKLY && (
                            <span className="text-[10px] text-zinc-400 font-medium">/ {t('rec.weekly').toLowerCase().slice(0, 4)}</span>
                        )}
                    </div>
                    <ChevronRight size={16} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};