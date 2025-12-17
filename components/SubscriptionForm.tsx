import React, { useEffect, useMemo, useState } from 'react';
import { Subscription, Category, PresetService, Recurrence } from '../types';
import { X, Check, Search, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ServiceLogo } from './ServiceLogo';
import {
  filterPresetsByCountryAndSearch,
  groupPresetsByCategory,
  matchPresetFromName,
} from '../utils/subscriptions';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Modal } from './ui/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sub: Omit<Subscription, 'id'>) => void;
  editData?: Subscription | null;
  initialDay?: number;
  onDelete?: (id: string) => void;
}

export const SubscriptionForm: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  editData,
  initialDay,
  onDelete,
}) => {
  const { t, country, config, getCategoryLabel } = useLanguage();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [day, setDay] = useState('1');
  const [recurrence, setRecurrence] = useState<Recurrence>(Recurrence.MONTHLY);
  const [category, setCategory] = useState<Category>(Category.OTHER);
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [domain, setDomain] = useState<string | undefined>(undefined);
  const [color, setColor] = useState('#64748b');

  const [searchTerm, setSearchTerm] = useState('');
  const [showPresets, setShowPresets] = useState(true);

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setName(editData.name);
        setPrice(editData.price.toString());
        setDay(editData.day.toString());
        setRecurrence(editData.recurrence || Recurrence.MONTHLY);
        setCategory(editData.category);
        setLogo(editData.logo);
        setDomain(editData.domain);
        setColor(editData.color);
        setShowPresets(false);
      } else {
        resetForm();
        if (initialDay) setDay(initialDay.toString());
      }
    }
  }, [isOpen, editData, initialDay]);

  const resetForm = () => {
    setName('');
    setPrice('');
    setDay(new Date().getDate().toString());
    setRecurrence(Recurrence.MONTHLY);
    setCategory(Category.OTHER);
    setLogo(undefined);
    setDomain(undefined);
    setColor('#64748b');
    setSearchTerm('');
    setShowPresets(true);
  };

  const handleSelectPreset = (preset: PresetService) => {
    setName(preset.name);
    if (preset.defaultPrice) setPrice(preset.defaultPrice.toString());
    setCategory(preset.category);
    setColor(preset.color);
    setLogo(preset.logo);
    setDomain(preset.domain);
    setShowPresets(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    const matchedPreset = matchPresetFromName(newName);

    if (matchedPreset) {
      setLogo(matchedPreset.logo);
      setColor(matchedPreset.color);
      setCategory(matchedPreset.category);
      setDomain(matchedPreset.domain);
    } else {
      setLogo(undefined);
      setDomain(undefined);
      if (newName.includes('.') && !newName.includes(' ')) {
        setDomain(newName);
      }
      if (color === '#64748b') setColor('#64748b');
    }
  };

  const handleRecurrenceChange = (newRecurrence: Recurrence) => {
    setRecurrence(newRecurrence);
    if (newRecurrence === Recurrence.WEEKLY) {
      const currentDay = new Date().getDay();
      setDay(currentDay.toString());
    } else {
      setDay(new Date().getDate().toString());
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !day) return;

    onSave({
      name,
      price: parseFloat(price.replace(',', '.')),
      day: parseInt(day),
      recurrence,
      category,
      color,
      logo,
      domain,
    });
    onClose();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (editData && onDelete) {
      onDelete(editData.id);
    }
  };

  const groupedPresets = useMemo(() => {
    const filtered = filterPresetsByCountryAndSearch(country, searchTerm);
    return groupPresetsByCategory(filtered);
  }, [searchTerm, country]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 12 }}
        className="bg-white dark:bg-zinc-950 rounded-[40px] w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-zinc-200 dark:border-zinc-800"
      >
        <div className="p-6 pb-2 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {editData ? t('form.edit_title') : t('form.add_title')}
          </h2>
          <IconButton aria-label="Fermer" onClick={onClose} className="bg-zinc-100 dark:bg-zinc-800">
            <X size={20} />
          </IconButton>
        </div>

        <div className="overflow-y-auto px-6 pb-6 scroll-smooth custom-scrollbar relative">
          {showPresets && !editData ? (
            <div className="space-y-6 pt-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder={`${t('form.search_placeholder')}...`}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl focus:ring-0 focus:bg-zinc-200 dark:focus:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 font-semibold transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <Search className="absolute left-4 top-4 text-zinc-400" size={20} />
              </div>

              <div className="space-y-8">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    setName(searchTerm);
                    setShowPresets(false);
                  }}
                  className="border-dashed"
                >
                  <span>{t('form.not_in_list')}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{t('form.create_manual')}</span>
                </Button>

                {Object.entries(groupedPresets).map(([catName, services]: [string, PresetService[]]) => {
                  if (services.length === 0) return null;
                  return (
                    <div key={catName}>
                      <h3 className="sticky top-0 bg-white dark:bg-zinc-950 py-2 mb-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest z-30">
                        {getCategoryLabel(catName as Category)}
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        {services.map((service, idx) => (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.02 }}
                            key={service.id}
                            onClick={() => handleSelectPreset(service)}
                            className="flex flex-col items-center p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-black border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-none transition-all group text-center h-32 justify-center"
                          >
                            <div className="w-12 h-12 mb-3 rounded-xl overflow-hidden bg-white shadow-sm p-2 group-hover:scale-110 transition-transform">
                              <ServiceLogo
                                name={service.name}
                                logo={service.logo}
                                domain={service.domain}
                                color={service.color}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 line-clamp-1 w-full">
                              {service.name}
                            </span>
                            {service.defaultPrice && (
                              <span className="text-[10px] text-zinc-400 font-bold mt-1">
                                {service.defaultPrice}
                                {config.currency}
                              </span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6 pt-4">
              <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-3xl">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm p-3 flex-shrink-0">
                  <ServiceLogo
                    name={name}
                    logo={logo}
                    domain={domain}
                    color={color}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white truncate">
                    {name || 'Nouveau service'}
                  </h3>
                  {!editData && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="px-0 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
                      onClick={() => setShowPresets(true)}
                    >
                      <Search size={12} />
                      {t('form.change_service')}
                    </Button>
                  )}
                </div>
              </div>

              <Input
                id="subscription-name"
                label={t('form.name_label')}
                value={name}
                onChange={handleNameChange}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  id="subscription-recurrence"
                  label={t('form.recurrence_label')}
                  value={recurrence}
                  onChange={(e) => handleRecurrenceChange(e.target.value as Recurrence)}
                >
                  <option value={Recurrence.MONTHLY}>{t('rec.monthly')}</option>
                  <option value={Recurrence.WEEKLY}>{t('rec.weekly')}</option>
                </Select>

                <Input
                  id="subscription-price"
                  label={t('form.price_label')}
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor={recurrence === Recurrence.MONTHLY ? 'subscription-day' : 'subscription-weekday'}
                    className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2"
                  >
                    {recurrence === Recurrence.MONTHLY ? t('form.day_label') : t('form.weekday_label')}
                  </label>
                  {recurrence === Recurrence.MONTHLY ? (
                    <div className="relative">
                      <Input
                        id="subscription-day"
                        type="number"
                        min="1"
                        max="31"
                        required
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        className="pr-10"
                      />
                      <CalendarIcon
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                        size={18}
                      />
                    </div>
                  ) : (
                    <Select
                      id="subscription-weekday"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option value="1">{t('day.1')}</option>
                      <option value="2">{t('day.2')}</option>
                      <option value="3">{t('day.3')}</option>
                      <option value="4">{t('day.4')}</option>
                      <option value="5">{t('day.5')}</option>
                      <option value="6">{t('day.6')}</option>
                      <option value="0">{t('day.0')}</option>
                    </Select>
                  )}
                </div>
              </div>

              <Select
                id="subscription-category"
                label={t('form.category_label')}
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
              >
                {Object.values(Category).map((cat) => (
                  <option key={cat} value={cat}>
                    {getCategoryLabel(cat)}
                  </option>
                ))}
              </Select>

              <div className="pt-4 flex gap-3">
                {editData && onDelete && (
                  <IconButton
                    type="button"
                    aria-label={t('modal.confirm')}
                    onClick={handleDelete}
                    className="bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-2xl"
                  >
                    <Trash2 size={24} />
                  </IconButton>
                )}
                <Button type="submit" className="flex-1 text-lg gap-2">
                  <Check size={20} strokeWidth={3} />
                  {editData ? t('form.save') : t('form.add')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </Modal>
  );
};

