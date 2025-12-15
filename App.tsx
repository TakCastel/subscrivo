import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Moon, Sun, ChevronDown } from 'lucide-react';

// Components & Types
import { Calendar } from './components/Calendar';
import { Stats } from './components/Stats';
import { SubscriptionForm } from './components/SubscriptionForm';
import { SubscriptionList } from './components/SubscriptionList';
import { ConfirmModal } from './components/ConfirmModal'; // Import modal
import { Subscription, CountryCode } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { COUNTRIES } from './constants';

// Date Helpers
const addMonths = (date: Date, amount: number) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + amount);
  return d;
};
const subMonths = (date: Date, amount: number) => addMonths(date, -amount);

// Helper pour les drapeaux
const getFlagUrl = (code: CountryCode | string) => {
  const isoCode = code === 'UK' ? 'gb' : code.toLowerCase();
  return `https://flagcdn.com/w40/${isoCode}.png`;
};

const AppContent = () => {
  const { country, setCountry, config, dateLocale } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Initialisation paresseuse avec migration des données
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    try {
      // MIGRATION LOGIC: Submeez -> Velora -> Subcal -> Subscrivo

      // 1. Check Submeez (Most recent previous name)
      const oldSubmeez = localStorage.getItem('submeez_data');
      if (oldSubmeez) {
        console.log("Migrating data from Submeez to Subscrivo...");
        localStorage.setItem('subscrivo_data', oldSubmeez);
        localStorage.removeItem('submeez_data');
        return JSON.parse(oldSubmeez);
      }

      // 2. Check Velora
      const oldVelora = localStorage.getItem('velora_data');
      if (oldVelora) {
        console.log("Migrating data from Velora to Subscrivo...");
        localStorage.setItem('subscrivo_data', oldVelora);
        localStorage.removeItem('velora_data');
        return JSON.parse(oldVelora);
      }

      // 3. Check Subcal
      const oldSubcal = localStorage.getItem('subcal_data');
      if (oldSubcal) {
        console.log("Migrating data from Subcal to Subscrivo...");
        localStorage.setItem('subscrivo_data', oldSubcal);
        localStorage.removeItem('subcal_data');
        return JSON.parse(oldSubcal);
      }

      const saved = localStorage.getItem('subscrivo_data');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse subscriptions", e);
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [initialDay, setInitialDay] = useState<number | undefined>(undefined);
  
  // Logic for Delete Modal
  const [subToDelete, setSubToDelete] = useState<string | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // MIGRATION THEME
    const oldSubmeezTheme = localStorage.getItem('submeez_theme') as 'light' | 'dark';
    if (oldSubmeezTheme) {
        localStorage.setItem('subscrivo_theme', oldSubmeezTheme);
        localStorage.removeItem('submeez_theme');
        return oldSubmeezTheme;
    }

    const oldVeloraTheme = localStorage.getItem('velora_theme') as 'light' | 'dark';
    if (oldVeloraTheme) {
        localStorage.setItem('subscrivo_theme', oldVeloraTheme);
        localStorage.removeItem('velora_theme');
        return oldVeloraTheme;
    }

    const savedTheme = localStorage.getItem('subscrivo_theme') as 'light' | 'dark';
    if (savedTheme) return savedTheme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  const [showCountryMenu, setShowCountryMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem('subscrivo_data', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('subscrivo_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddSubscription = (data: Omit<Subscription, 'id'>) => {
    if (editingSub) {
      setSubscriptions(prev => prev.map(s => s.id === editingSub.id ? { ...data, id: editingSub.id } : s));
    } else {
      const newSub: Subscription = {
        ...data,
        id: crypto.randomUUID()
      };
      setSubscriptions(prev => [...prev, newSub]);
    }
    setEditingSub(null);
  };

  const handleMoveSubscription = (id: string, newDay: number) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, day: newDay } : s));
  };

  // Request deletion (opens modal)
  const handleDeleteRequest = (id: string) => {
    setSubToDelete(id);
  };

  // Confirm deletion (executed by modal)
  const confirmDelete = () => {
    if (subToDelete) {
      setSubscriptions(prev => prev.filter(s => s.id !== subToDelete));
      
      // If we deleted the item currently being edited in the form, close the form
      if (editingSub?.id === subToDelete) {
        setIsModalOpen(false);
        setEditingSub(null);
      }
      
      setSubToDelete(null);
    }
  };

  const openEdit = (sub: Subscription) => {
    setEditingSub(sub);
    setInitialDay(undefined);
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingSub(null);
    setInitialDay(undefined);
    setIsModalOpen(true);
  };

  const openAddFromCalendar = (day: number) => {
    setEditingSub(null);
    setInitialDay(day);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-24 transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header Minimaliste */}
      <header className="pt-6 pb-2 sticky top-0 z-30 bg-zinc-50/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black font-extrabold text-xl shadow-lg shadow-black/10 dark:shadow-white/10 group cursor-default">
                <span className="group-hover:scale-110 transition-transform duration-300">S.</span>
              </div>
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight hidden sm:block">Subscrivo</h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 bg-white dark:bg-zinc-900 p-1.5 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800">
              {/* Country Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowCountryMenu(!showCountryMenu)}
                  className="flex items-center gap-2 pl-2 pr-2 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all group"
                >
                  <img 
                    src={getFlagUrl(config.code)} 
                    alt={config.name}
                    className="w-5 h-5 object-cover rounded-full ring-2 ring-white dark:ring-zinc-800"
                  />
                  <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hidden sm:block">{config.code}</span>
                  <ChevronDown size={14} className="text-zinc-400" />
                </button>
                
                {showCountryMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowCountryMenu(false)} />
                    <div className="absolute right-0 top-full mt-4 w-64 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-zinc-400/20 dark:shadow-black/50 border border-zinc-100 dark:border-zinc-800 py-3 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-5 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-2">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Select Region</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto scroll-smooth custom-scrollbar px-2">
                        {COUNTRIES.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => {
                              setCountry(c.code);
                              setShowCountryMenu(false);
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                              country === c.code 
                                ? 'bg-zinc-100 dark:bg-zinc-800' 
                                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }`}
                          >
                            <img src={getFlagUrl(c.code)} alt={c.name} className="w-6 h-6 rounded-full object-cover" />
                            <div className="text-left">
                                <span className="block text-sm font-bold text-zinc-900 dark:text-white">{c.name}</span>
                                <span className="block text-xs text-zinc-400 font-medium">{c.currencyCode} ({c.currency})</span>
                            </div>
                            {country === c.code && <div className="ml-auto w-2 h-2 rounded-full bg-zinc-900 dark:bg-white" />}
                          </button>
                        ))}
                        </div>
                    </div>
                  </>
                )}
              </div>

              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800" />

              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <button 
                onClick={openAdd}
                className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full hover:scale-105 transition-transform shadow-lg shadow-zinc-900/20"
              >
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Stats Section */}
        <section>
          <Stats subscriptions={subscriptions} currentDate={currentDate} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Left Column: Calendar */}
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                    {currentDate.toLocaleDateString(dateLocale, { month: 'long', year: 'numeric' })}
                 </h2>
                 <div className="flex gap-2">
                    <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                 </div>
              </div>

              <Calendar 
                currentDate={currentDate} 
                subscriptions={subscriptions} 
                onEdit={openEdit}
                onAdd={openAddFromCalendar}
                onMoveSubscription={handleMoveSubscription}
              />
           </div>

           {/* Right Column: List */}
           <div className="lg:col-span-4">
              <SubscriptionList 
                subscriptions={subscriptions} 
                onEdit={openEdit} 
                onDelete={handleDeleteRequest}
              />
           </div>
        </div>

      </main>

      {/* Modals */}
      <SubscriptionForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddSubscription}
        editData={editingSub}
        initialDay={initialDay}
        onDelete={handleDeleteRequest}
      />

      <ConfirmModal 
        isOpen={!!subToDelete}
        onClose={() => setSubToDelete(null)}
        onConfirm={confirmDelete}
      />

    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;