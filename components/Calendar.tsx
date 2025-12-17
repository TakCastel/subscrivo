import React, { useState } from 'react';
import { Subscription, Recurrence } from '../types';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ServiceLogo } from './ServiceLogo';

interface CalendarProps {
  currentDate: Date;
  subscriptions: Subscription[];
  onEdit: (sub: Subscription) => void;
  onAdd: (day: number) => void;
  onMoveSubscription?: (id: string, newDay: number) => void;
}

// Helpers remplaçant date-fns
const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const getDay = (date: Date) => date.getDay(); // 0 is Sunday
const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day; // Adjust to Sunday
  return new Date(d.setDate(diff));
};
const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const Calendar: React.FC<CalendarProps> = ({ currentDate, subscriptions, onEdit, onAdd, onMoveSubscription }) => {
  const { t, dateLocale, config } = useLanguage();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [dragOverDay, setDragOverDay] = useState<number | null>(null);

  // Calendar logic
  const firstDayOfMonth = startOfMonth(currentDate);
  const startingDayIndex = getDay(firstDayOfMonth); // 0 (Sun) - 6 (Sat)
  const daysCount = getDaysInMonth(currentDate);

  // Generate localized week days
  const weekDays = [];
  const start = startOfWeek(new Date()); // Today's week start (Sunday)
  for (let i = 0; i < 7; i++) {
    weekDays.push(addDays(start, i).toLocaleDateString(dateLocale, { weekday: 'short' }));
  }

  const getSubsForDay = (dayOfMonth: number) => {
     // Determine the day of week for this specific date (e.g., is the 15th a Monday?)
     const currentDayDate = new Date(year, month, dayOfMonth);
     const dayOfWeek = currentDayDate.getDay();

     return subscriptions.filter(s => {
        if (s.recurrence === Recurrence.WEEKLY) {
            return s.day === dayOfWeek;
        }
        // Default Monthly
        return s.day === dayOfMonth;
     });
  };

  const handleDragStart = (e: React.DragEvent, subId: string) => {
    e.dataTransfer.setData('subId', subId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    setDragOverDay(day);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverDay(null);
  };

  const handleDrop = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    setDragOverDay(null);
    const subId = e.dataTransfer.getData('subId');
    if (subId && onMoveSubscription) {
        // Warning: Moving a weekly subscription via drag/drop in a monthly view is ambiguous.
        // For now, assume it converts to monthly or changes the weekly day?
        // Implementation simplifiée: on passe juste le nouveau jour du mois.
        // App.tsx devra gérer si c'est un changement de date mensuelle.
        onMoveSubscription(subId, day);
    }
  };

  const blanks = Array(startingDayIndex).fill(null);
  const days = Array.from({ length: daysCount }, (_, i) => i + 1);
  const monthKey = `${year}-${month}`;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-[32px] shadow-soft dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-6">
      {/* Header Days */}
      <div className="grid grid-cols-7 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center text-[11px] font-extrabold text-zinc-400 uppercase tracking-widest">
            {day.replace('.', '')}
          </div>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        key={monthKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-7 gap-2 auto-rows-fr"
      >
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="min-h-[100px]" />
        ))}
        
        {days.map(day => {
          const daysSubs = getSubsForDay(day);
          const isToday = day === new Date().getDate() && 
                          month === new Date().getMonth() && 
                          year === new Date().getFullYear();
          const isDragTarget = dragOverDay === day;

          // Check if we should use grid layout (more than 2 items)
          const useGridLayout = daysSubs.length > 2;

          return (
            <div
              key={`day-${day}`} 
              className={`
                min-h-[100px] p-2 rounded-2xl relative group transition-all duration-200 border
                ${isToday 
                    ? 'bg-zinc-900 dark:bg-zinc-800 text-white border-transparent shadow-lg shadow-zinc-900/20' 
                    : isDragTarget 
                        ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800' 
                        : 'bg-zinc-50 dark:bg-black border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900'
                }
              `}
              onDragOver={(e) => handleDragOver(e, day)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, day)}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                   onAdd(day);
                }
              }}
              data-testid={`day-cell-${day}`}
            >
              <div className="flex justify-between items-start mb-2 pointer-events-none">
                 <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {day}
                 </span>
                 
                 {/* Invisible Add Trigger Area covering header */}
                 <button 
                     onClick={(e) => { e.stopPropagation(); onAdd(day); }}
                     className={`pointer-events-auto w-6 h-6 rounded-full flex items-center justify-center transition-all ${isToday ? 'text-zinc-400 hover:text-white' : 'text-zinc-300 hover:text-zinc-900 dark:hover:text-white'} opacity-0 group-hover:opacity-100`}
                 >
                    <Plus size={14} />
                 </button>
              </div>

              {/* Items Container */}
              <div className={`flex ${useGridLayout ? 'grid grid-cols-2 gap-1.5' : 'flex-col gap-1.5'}`}>
                {daysSubs.map(sub => (
                  <motion.div
                    key={`${sub.id}-${day}`} // Unique key for recursives in same month
                    draggable
                    onDragStart={(e) => handleDragStart(e, sub.id)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(sub);
                    }}
                    className={`
                      cursor-grab active:cursor-grabbing
                      ${useGridLayout ? 'aspect-square justify-center p-1 rounded-xl' : 'flex items-center gap-2 p-1.5 pr-2.5 rounded-full'}
                      text-xs font-bold 
                      shadow-sm hover:shadow-md transition-all z-10 relative
                      ${isToday 
                        ? 'bg-zinc-800 dark:bg-zinc-700 text-white border border-zinc-700' 
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800'
                      }
                    `}
                    title={`${sub.name} - ${sub.price}${config.currency}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`${useGridLayout ? 'w-6 h-6' : 'w-4 h-4'} rounded-full overflow-hidden flex-shrink-0 bg-white`}>
                        <ServiceLogo 
                            name={sub.name} 
                            logo={sub.logo}
                            domain={sub.domain}
                            color={sub.color} 
                        />
                    </div>
                    {!useGridLayout && <span className="truncate hidden sm:inline">{sub.name}</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};