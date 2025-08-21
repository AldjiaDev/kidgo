export interface CategoryInfo {
  emoji: string;
  backgroundColor: string;
}

export const categoryMap: Record<string, CategoryInfo> = {
  Accrobranche: {
    emoji: '🌳',
    backgroundColor: 'bg-emerald-100 dark:bg-emerald-900',
  },
  Aquarium: {
    emoji: '🐠',
    backgroundColor: 'bg-cyan-100 dark:bg-cyan-900',
  },
  Arène: {
    emoji: '🏈',
    backgroundColor: 'bg-orange-100 dark:bg-orange-900',
  },
  Bibliothèque: {
    emoji: '📖',
    backgroundColor: 'bg-amber-100 dark:bg-amber-900',
  },
  Bowling: {
    emoji: '🎳',
    backgroundColor: 'bg-purple-100 dark:bg-purple-900',
  },
  'Centre aquatique': {
    emoji: '🏊',
    backgroundColor: 'bg-blue-100 dark:bg-blue-900',
  },
  'Centre commercial': {
    emoji: '🛍️',
    backgroundColor: 'bg-pink-100 dark:bg-pink-900',
  },
  'Centre culturel': {
    emoji: '🏯',
    backgroundColor: 'bg-red-100 dark:bg-red-900',
  },
  'Centre de sciences': {
    emoji: '🧬',
    backgroundColor: 'bg-indigo-100 dark:bg-indigo-900',
  },
  Château: {
    emoji: '🏰',
    backgroundColor: 'bg-stone-100 dark:bg-stone-900',
  },
  Cinéma: {
    emoji: '🍿',
    backgroundColor: 'bg-yellow-100 dark:bg-yellow-900',
  },
  Église: {
    emoji: '⛪️',
    backgroundColor: 'bg-slate-100 dark:bg-slate-900',
  },
  'Escape game': {
    emoji: '🎲',
    backgroundColor: 'bg-teal-100 dark:bg-teal-900',
  },
  Ferme: {
    emoji: '🐓',
    backgroundColor: 'bg-green-100 dark:bg-green-900',
  },
  Hippodrome: {
    emoji: '🐎',
    backgroundColor: 'bg-amber-100 dark:bg-amber-900',
  },
  Jardin: {
    emoji: '🐌',
    backgroundColor: 'bg-rose-100 dark:bg-rose-900',
  },
  'Jardin botanique': {
    emoji: '🌺',
    backgroundColor: 'bg-emerald-100 dark:bg-emerald-900',
  },
  Karting: {
    emoji: '🏎️',
    backgroundColor: 'bg-red-100 dark:bg-red-900',
  },
  Lac: {
    emoji: '🌊',
    backgroundColor: 'bg-sky-100 dark:bg-sky-900',
  },
  'Laser game': {
    emoji: '🎮',
    backgroundColor: 'bg-violet-100 dark:bg-violet-900',
  },
  Librairie: {
    emoji: '📚',
    backgroundColor: 'bg-orange-100 dark:bg-orange-900',
  },
  Marché: {
    emoji: '🛍️',
    backgroundColor: 'bg-lime-100 dark:bg-lime-900',
  },
  'Mini golf': {
    emoji: '🏌️',
    backgroundColor: 'bg-green-100 dark:bg-green-900',
  },
  Monument: {
    emoji: '🗿',
    backgroundColor: 'bg-gray-100 dark:bg-gray-900',
  },
  Musée: {
    emoji: '🏛️',
    backgroundColor: 'bg-neutral-100 dark:bg-neutral-900',
  },
  Opéra: {
    emoji: '🎵',
    backgroundColor: 'bg-purple-100 dark:bg-purple-900',
  },
  Parc: {
    emoji: '🏞️',
    backgroundColor: 'bg-green-100 dark:bg-green-900',
  },
  "Parc d'attractions": {
    emoji: '🎢',
    backgroundColor: 'bg-fuchsia-100 dark:bg-fuchsia-900',
  },
  'Parc de loisirs': {
    emoji: '🎠',
    backgroundColor: 'bg-pink-100 dark:bg-pink-900',
  },
  'Parc de trampolines': {
    emoji: '🏋️‍♀️',
    backgroundColor: 'bg-cyan-100 dark:bg-cyan-900',
  },
  Patinoire: {
    emoji: '⛸️',
    backgroundColor: 'bg-blue-100 dark:bg-blue-900',
  },
  Pâtisserie: {
    emoji: '🍰',
    backgroundColor: 'bg-yellow-100 dark:bg-yellow-900',
  },
  Piscine: {
    emoji: '🏊',
    backgroundColor: 'bg-blue-100 dark:bg-blue-900',
  },
  Place: {
    emoji: '📍',
    backgroundColor: 'bg-red-100 dark:bg-red-900',
  },
  Quartier: {
    emoji: '🏙️',
    backgroundColor: 'bg-zinc-100 dark:bg-zinc-900',
  },
  'Site historique': {
    emoji: '🏯',
    backgroundColor: 'bg-amber-100 dark:bg-amber-900',
  },
  Théâtre: {
    emoji: '🎭',
    backgroundColor: 'bg-indigo-100 dark:bg-indigo-900',
  },
  Zoo: {
    emoji: '🦁',
    backgroundColor: 'bg-orange-100 dark:bg-orange-900',
  },
};

/**
 * Get category information including emoji and background color
 * @param category - The category string
 * @returns CategoryInfo object with emoji and backgroundColor
 */
export function getCategoryInfo(category: string | null | undefined): CategoryInfo {
  if (!category) {
    return {
      emoji: '📍',
      backgroundColor: 'bg-muted',
    };
  }

  // Clean the category string to match our mapping
  const cleanCategory = category.trim();

  return (
    categoryMap[cleanCategory] || {
      emoji: '📍',
      backgroundColor: 'bg-muted',
    }
  );
}

/**
 * Get just the emoji for a category
 * @param category - The category string
 * @returns The emoji string
 */
export function getCategoryEmoji(category: string | null | undefined): string {
  return getCategoryInfo(category).emoji;
}

/**
 * Get just the background color for a category
 * @param category - The category string
 * @returns The background color class string
 */
export function getCategoryBackgroundColor(category: string | null | undefined): string {
  return getCategoryInfo(category).backgroundColor;
}
