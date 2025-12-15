import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CountryCode, CountryConfig, Category } from '../types';
import { COUNTRIES } from '../constants';

// Mapping des locales BCP 47 pour Intl
const DATE_LOCALES: Record<CountryCode, string> = {
  FR: 'fr-FR',
  US: 'en-US',
  UK: 'en-GB',
  DE: 'de-DE',
  ES: 'es-ES',
  IT: 'it-IT',
  GLOBAL: 'en-US'
};

// Types de traduction
type TranslationKey = 
  | 'stats.total' | 'stats.active_subs' | 'stats.remaining' | 'stats.next_payment' | 'stats.no_payment' | 'stats.on'
  | 'calendar.add'
  | 'list.title' | 'list.count' | 'list.empty_title' | 'list.empty_desc' | 'list.on' | 'list.every'
  | 'form.edit_title' | 'form.add_title' | 'form.search_placeholder' | 'form.not_in_list' | 'form.create_manual'
  | 'form.name_label' | 'form.price_label' | 'form.day_label' | 'form.weekday_label' | 'form.category_label' | 'form.change_service' | 'form.recurrence_label'
  | 'form.save' | 'form.add'
  | 'rec.monthly' | 'rec.weekly'
  | 'day.0' | 'day.1' | 'day.2' | 'day.3' | 'day.4' | 'day.5' | 'day.6'
  | 'cat.entertainment' | 'cat.utilities' | 'cat.work' | 'cat.health' | 'cat.transport' | 'cat.food' | 'cat.other'
  | 'modal.delete_title' | 'modal.delete_message' | 'modal.cancel' | 'modal.confirm';

const TRANSLATIONS: Record<CountryCode, Record<string, string>> = {
  FR: {
    'stats.total': 'Total Mensuel',
    'stats.active_subs': 'abonnements actifs',
    'stats.remaining': 'Reste à payer',
    'stats.next_payment': 'Prochain Prélèvement',
    'stats.no_payment': 'Aucun prélèvement à venir',
    'stats.on': 'Le',
    'calendar.add': 'Ajouter',
    'list.title': 'Vos Abonnements',
    'list.count': 'services',
    'list.empty_title': 'Aucun abonnement',
    'list.empty_desc': 'Ajoutez-en un pour commencer',
    'list.on': 'Le',
    'list.every': 'Tous les',
    'form.edit_title': 'Modifier',
    'form.add_title': 'Ajouter un service',
    'form.search_placeholder': 'Rechercher un service',
    'form.not_in_list': 'Pas dans la liste ?',
    'form.create_manual': 'Créer manuellement',
    'form.name_label': 'Nom du service',
    'form.price_label': 'Prix',
    'form.day_label': 'Jour du mois',
    'form.weekday_label': 'Jour de la semaine',
    'form.category_label': 'Catégorie',
    'form.recurrence_label': 'Fréquence',
    'form.change_service': 'Changer de service',
    'form.save': 'Sauvegarder',
    'form.add': 'Ajouter au calendrier',
    'rec.monthly': 'Mensuel',
    'rec.weekly': 'Hebdomadaire',
    'day.0': 'Dimanche',
    'day.1': 'Lundi',
    'day.2': 'Mardi',
    'day.3': 'Mercredi',
    'day.4': 'Jeudi',
    'day.5': 'Vendredi',
    'day.6': 'Samedi',
    'cat.entertainment': 'Divertissement',
    'cat.utilities': 'Factures & Énergie',
    'cat.work': 'Pro & Tech',
    'cat.health': 'Santé & Bien-être',
    'cat.transport': 'Transport',
    'cat.food': 'Alimentation',
    'cat.other': 'Autre',
    'modal.delete_title': 'Supprimer cet abonnement ?',
    'modal.delete_message': 'Cette action est irréversible. Voulez-vous vraiment continuer ?',
    'modal.cancel': 'Annuler',
    'modal.confirm': 'Supprimer'
  },
  US: {
    'stats.total': 'Monthly Total',
    'stats.active_subs': 'active subs',
    'stats.remaining': 'Remaining',
    'stats.next_payment': 'Next Payment',
    'stats.no_payment': 'No upcoming payments',
    'stats.on': 'On',
    'calendar.add': 'Add',
    'list.title': 'Your Subscriptions',
    'list.count': 'services',
    'list.empty_title': 'No subscriptions',
    'list.empty_desc': 'Add one to get started',
    'list.on': 'On',
    'list.every': 'Every',
    'form.edit_title': 'Edit',
    'form.add_title': 'Add Service',
    'form.search_placeholder': 'Search for a service',
    'form.not_in_list': 'Not in the list?',
    'form.create_manual': 'Create manually',
    'form.name_label': 'Service Name',
    'form.price_label': 'Price',
    'form.day_label': 'Day of Month',
    'form.weekday_label': 'Day of Week',
    'form.category_label': 'Category',
    'form.recurrence_label': 'Frequency',
    'form.change_service': 'Change service',
    'form.save': 'Save Changes',
    'form.add': 'Add to Calendar',
    'rec.monthly': 'Monthly',
    'rec.weekly': 'Weekly',
    'day.0': 'Sunday',
    'day.1': 'Monday',
    'day.2': 'Tuesday',
    'day.3': 'Wednesday',
    'day.4': 'Thursday',
    'day.5': 'Friday',
    'day.6': 'Saturday',
    'cat.entertainment': 'Entertainment',
    'cat.utilities': 'Utilities',
    'cat.work': 'Work & Tech',
    'cat.health': 'Health',
    'cat.transport': 'Transport',
    'cat.food': 'Food',
    'cat.other': 'Other',
    'modal.delete_title': 'Delete subscription?',
    'modal.delete_message': 'This action cannot be undone. Are you sure you want to proceed?',
    'modal.cancel': 'Cancel',
    'modal.confirm': 'Delete'
  },
  UK: {
    'stats.total': 'Monthly Total',
    'stats.active_subs': 'active subs',
    'stats.remaining': 'Remaining',
    'stats.next_payment': 'Next Payment',
    'stats.no_payment': 'No upcoming payments',
    'stats.on': 'On',
    'calendar.add': 'Add',
    'list.title': 'Your Subscriptions',
    'list.count': 'services',
    'list.empty_title': 'No subscriptions',
    'list.empty_desc': 'Add one to get started',
    'list.on': 'On',
    'list.every': 'Every',
    'form.edit_title': 'Edit',
    'form.add_title': 'Add Service',
    'form.search_placeholder': 'Search for a service',
    'form.not_in_list': 'Not in the list?',
    'form.create_manual': 'Create manually',
    'form.name_label': 'Service Name',
    'form.price_label': 'Price',
    'form.day_label': 'Day of Month',
    'form.weekday_label': 'Day of Week',
    'form.category_label': 'Category',
    'form.recurrence_label': 'Frequency',
    'form.change_service': 'Change service',
    'form.save': 'Save Changes',
    'form.add': 'Add to Calendar',
    'rec.monthly': 'Monthly',
    'rec.weekly': 'Weekly',
    'day.0': 'Sunday',
    'day.1': 'Monday',
    'day.2': 'Tuesday',
    'day.3': 'Wednesday',
    'day.4': 'Thursday',
    'day.5': 'Friday',
    'day.6': 'Saturday',
    'cat.entertainment': 'Entertainment',
    'cat.utilities': 'Utilities',
    'cat.work': 'Work & Tech',
    'cat.health': 'Health',
    'cat.transport': 'Transport',
    'cat.food': 'Food',
    'cat.other': 'Other',
    'modal.delete_title': 'Delete subscription?',
    'modal.delete_message': 'This action cannot be undone. Are you sure you want to proceed?',
    'modal.cancel': 'Cancel',
    'modal.confirm': 'Delete'
  },
  DE: {
    'stats.total': 'Monatliche Gesamtsumme',
    'stats.active_subs': 'aktive Abos',
    'stats.remaining': 'Verbleibend',
    'stats.next_payment': 'Nächste Zahlung',
    'stats.no_payment': 'Keine anstehenden Zahlungen',
    'stats.on': 'Am',
    'calendar.add': 'Hinzufügen',
    'list.title': 'Deine Abos',
    'list.count': 'Dienste',
    'list.empty_title': 'Keine Abonnements',
    'list.empty_desc': 'Füge eins hinzu, um zu starten',
    'list.on': 'Am',
    'list.every': 'Jeden',
    'form.edit_title': 'Bearbeiten',
    'form.add_title': 'Dienst hinzufügen',
    'form.search_placeholder': 'Suche nach einem Dienst',
    'form.not_in_list': 'Nicht in der Liste?',
    'form.create_manual': 'Manuell erstellen',
    'form.name_label': 'Dienstname',
    'form.price_label': 'Preis',
    'form.day_label': 'Tag des Monats',
    'form.weekday_label': 'Wochentag',
    'form.category_label': 'Kategorie',
    'form.recurrence_label': 'Intervall',
    'form.change_service': 'Dienst ändern',
    'form.save': 'Speichern',
    'form.add': 'Zum Kalender hinzufügen',
    'rec.monthly': 'Monatlich',
    'rec.weekly': 'Wöchentlich',
    'day.0': 'Sonntag',
    'day.1': 'Montag',
    'day.2': 'Dienstag',
    'day.3': 'Mittwoch',
    'day.4': 'Donnerstag',
    'day.5': 'Freitag',
    'day.6': 'Samstag',
    'cat.entertainment': 'Unterhaltung',
    'cat.utilities': 'Rechnungen',
    'cat.work': 'Arbeit & Tech',
    'cat.health': 'Gesundheit',
    'cat.transport': 'Transport',
    'cat.food': 'Essen',
    'cat.other': 'Andere',
    'modal.delete_title': 'Abo löschen?',
    'modal.delete_message': 'Diese Aktion kann nicht rückgängig gemacht werden. Fortfahren?',
    'modal.cancel': 'Abbrechen',
    'modal.confirm': 'Löschen'
  },
  ES: {
    'stats.total': 'Total Mensual',
    'stats.active_subs': 'suscripciones activas',
    'stats.remaining': 'Restante',
    'stats.next_payment': 'Próximo Pago',
    'stats.no_payment': 'No hay pagos próximos',
    'stats.on': 'El',
    'calendar.add': 'Añadir',
    'list.title': 'Tus Suscripciones',
    'list.count': 'servicios',
    'list.empty_title': 'Sin suscripciones',
    'list.empty_desc': 'Añade una para empezar',
    'list.on': 'El',
    'list.every': 'Cada',
    'form.edit_title': 'Editar',
    'form.add_title': 'Añadir Servicio',
    'form.search_placeholder': 'Buscar un servicio',
    'form.not_in_list': '¿No está en la lista?',
    'form.create_manual': 'Crear manualmente',
    'form.name_label': 'Nombre del servicio',
    'form.price_label': 'Precio',
    'form.day_label': 'Día del mes',
    'form.weekday_label': 'Día de la semana',
    'form.category_label': 'Categoría',
    'form.recurrence_label': 'Frecuencia',
    'form.change_service': 'Cambiar servicio',
    'form.save': 'Guardar',
    'form.add': 'Añadir al calendario',
    'rec.monthly': 'Mensual',
    'rec.weekly': 'Semanal',
    'day.0': 'Domingo',
    'day.1': 'Lunes',
    'day.2': 'Martes',
    'day.3': 'Miércoles',
    'day.4': 'Jueves',
    'day.5': 'Viernes',
    'day.6': 'Sábado',
    'cat.entertainment': 'Entretenimiento',
    'cat.utilities': 'Facturas',
    'cat.work': 'Trabajo & Tech',
    'cat.health': 'Salud',
    'cat.transport': 'Transporte',
    'cat.food': 'Comida',
    'cat.other': 'Otro',
    'modal.delete_title': '¿Eliminar suscripción?',
    'modal.delete_message': 'Esta acción no se puede deshacer. ¿Seguro que quieres continuar?',
    'modal.cancel': 'Cancelar',
    'modal.confirm': 'Eliminar'
  },
  IT: {
    'stats.total': 'Totale Mensile',
    'stats.active_subs': 'abbonamenti attivi',
    'stats.remaining': 'Rimanente',
    'stats.next_payment': 'Prossimo Pagamento',
    'stats.no_payment': 'Nessun pagamento imminente',
    'stats.on': 'Il',
    'calendar.add': 'Aggiungi',
    'list.title': 'I tuoi Abbonamenti',
    'list.count': 'servizi',
    'list.empty_title': 'Nessun abbonamento',
    'list.empty_desc': 'Aggiungine uno per iniziare',
    'list.on': 'Il',
    'list.every': 'Ogni',
    'form.edit_title': 'Modifica',
    'form.add_title': 'Aggiungi Servizio',
    'form.search_placeholder': 'Cerca un servizio',
    'form.not_in_list': 'Non in lista?',
    'form.create_manual': 'Crea manualmente',
    'form.name_label': 'Nome del servizio',
    'form.price_label': 'Prezzo',
    'form.day_label': 'Giorno del mese',
    'form.weekday_label': 'Giorno della settimana',
    'form.category_label': 'Categoria',
    'form.recurrence_label': 'Frequenza',
    'form.change_service': 'Cambia servizio',
    'form.save': 'Salva',
    'form.add': 'Aggiungi al calendario',
    'rec.monthly': 'Mensile',
    'rec.weekly': 'Settimanale',
    'day.0': 'Domenica',
    'day.1': 'Lunedì',
    'day.2': 'Martedì',
    'day.3': 'Mercoledì',
    'day.4': 'Giovedì',
    'day.5': 'Venerdì',
    'day.6': 'Sabato',
    'cat.entertainment': 'Intrattenimento',
    'cat.utilities': 'Bollette',
    'cat.work': 'Lavoro & Tech',
    'cat.health': 'Salute',
    'cat.transport': 'Trasporti',
    'cat.food': 'Cibo',
    'cat.other': 'Altro',
    'modal.delete_title': 'Eliminare l\'abbonamento?',
    'modal.delete_message': 'Questa azione non può essere annullata. Sei sicuro di voler procedere?',
    'modal.cancel': 'Annulla',
    'modal.confirm': 'Elimina'
  },
  GLOBAL: {
    'stats.total': 'Monthly Total',
    'stats.active_subs': 'active subs',
    'stats.remaining': 'Remaining',
    'stats.next_payment': 'Next Payment',
    'stats.no_payment': 'No upcoming payments',
    'stats.on': 'On',
    'calendar.add': 'Add',
    'list.title': 'Your Subscriptions',
    'list.count': 'services',
    'list.empty_title': 'No subscriptions',
    'list.empty_desc': 'Add one to get started',
    'list.on': 'On',
    'list.every': 'Every',
    'form.edit_title': 'Edit',
    'form.add_title': 'Add Service',
    'form.search_placeholder': 'Search for a service',
    'form.not_in_list': 'Not in the list?',
    'form.create_manual': 'Create manually',
    'form.name_label': 'Service Name',
    'form.price_label': 'Price',
    'form.day_label': 'Day of Month',
    'form.weekday_label': 'Day of Week',
    'form.category_label': 'Category',
    'form.recurrence_label': 'Frequency',
    'form.change_service': 'Change service',
    'form.save': 'Save Changes',
    'form.add': 'Add to Calendar',
    'rec.monthly': 'Monthly',
    'rec.weekly': 'Weekly',
    'day.0': 'Sunday',
    'day.1': 'Monday',
    'day.2': 'Tuesday',
    'day.3': 'Wednesday',
    'day.4': 'Thursday',
    'day.5': 'Friday',
    'day.6': 'Saturday',
    'cat.entertainment': 'Entertainment',
    'cat.utilities': 'Utilities',
    'cat.work': 'Work & Tech',
    'cat.health': 'Health',
    'cat.transport': 'Transport',
    'cat.food': 'Food',
    'cat.other': 'Other',
    'modal.delete_title': 'Delete subscription?',
    'modal.delete_message': 'This action cannot be undone. Are you sure you want to proceed?',
    'modal.cancel': 'Cancel',
    'modal.confirm': 'Delete'
  }
};

interface LanguageContextType {
  country: CountryCode;
  setCountry: (code: CountryCode) => void;
  t: (key: TranslationKey) => string;
  config: CountryConfig;
  dateLocale: string;
  getCategoryLabel: (cat: Category) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<CountryCode>('FR');

  useEffect(() => {
    // MIGRATION: Check old key
    const old = localStorage.getItem('subcal_country') as CountryCode;
    if (old) {
        localStorage.setItem('velora_country', old);
        localStorage.removeItem('subcal_country');
        setCountry(old);
        return;
    }
    
    const saved = localStorage.getItem('velora_country') as CountryCode;
    if (saved && COUNTRIES.find(c => c.code === saved)) {
      setCountry(saved);
    } 
  }, []);

  const handleSetCountry = (code: CountryCode) => {
    setCountry(code);
    localStorage.setItem('velora_country', code);
  };

  const t = (key: TranslationKey): string => {
    const dict = TRANSLATIONS[country] || TRANSLATIONS['FR'];
    return dict[key] || TRANSLATIONS['US'][key] || TRANSLATIONS['FR'][key] || key;
  };

  const getCategoryLabel = (cat: Category): string => {
    const map: Record<Category, TranslationKey> = {
      [Category.ENTERTAINMENT]: 'cat.entertainment',
      [Category.UTILITIES]: 'cat.utilities',
      [Category.WORK]: 'cat.work',
      [Category.HEALTH]: 'cat.health',
      [Category.TRANSPORT]: 'cat.transport',
      [Category.FOOD]: 'cat.food',
      [Category.OTHER]: 'cat.other'
    };
    return t(map[cat]);
  };

  const config = COUNTRIES.find(c => c.code === country) || COUNTRIES[0];
  const dateLocale = DATE_LOCALES[country] || 'en-US';

  return (
    <LanguageContext.Provider value={{ country, setCountry: handleSetCountry, t, config, dateLocale, getCategoryLabel }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};