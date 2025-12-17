import { Category, PresetService, Recurrence, Subscription } from '../types';
import { PRESET_SERVICES } from '../constants';

export const sortSubscriptions = (subs: Subscription[]): Subscription[] =>
  [...subs].sort((a, b) => {
    if (a.recurrence === b.recurrence) return a.day - b.day;
    // Priorité aux mensuels pour l’affichage combiné
    return a.recurrence === Recurrence.WEEKLY ? 1 : -1;
  });

export const filterPresetsByCountryAndSearch = (
  country: string,
  search: string,
): PresetService[] => {
  const term = search.toLowerCase();
  return PRESET_SERVICES.filter((s) => {
    const matchesCountry = s.countries.includes('GLOBAL') || s.countries.includes(country as any);
    const matchesSearch = term ? s.name.toLowerCase().includes(term) : true;
    return matchesCountry && matchesSearch;
  });
};

export const groupPresetsByCategory = (presets: PresetService[]) => {
  const groups: Record<string, PresetService[]> = {};
  Object.values(Category).forEach((cat) => (groups[cat] = []));
  presets.forEach((service) => {
    if (!groups[service.category]) groups[service.category] = [];
    groups[service.category].push(service);
  });
  return groups;
};

export const matchPresetFromName = (name: string): PresetService | undefined => {
  const normalizedName = name.toLowerCase().trim();
  if (!normalizedName) return undefined;
  return PRESET_SERVICES.find(
    (p) =>
      normalizedName.includes(p.name.toLowerCase()) ||
      (normalizedName.length > 3 && p.name.toLowerCase().includes(normalizedName)),
  );
};

