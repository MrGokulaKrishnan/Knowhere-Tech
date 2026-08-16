import { useState, useCallback, useMemo } from 'react';
import { ALL_MODULES_META } from '@/data/modules/meta';
import type { SearchResult } from '@/types';

export function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo((): SearchResult[] => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    for (const mod of ALL_MODULES_META) {
      for (const lesson of mod.lessons) {
        if (
          lesson.title.toLowerCase().includes(q) ||
          lesson.tags?.some((t: string) => t.toLowerCase().includes(q))
        ) {
          results.push({
            type: 'lesson',
            id: lesson.id,
            title: lesson.title,
            description: lesson.explanation?.slice(0, 80) + '...',
            module: mod.title,
            url: `/${mod.key}/${lesson.slug}`,
          });
        }
      }
    }
    return results.slice(0, 12);
  }, [query]);

  const clear = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clear };
}
