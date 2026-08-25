import { useState, useCallback, useMemo } from 'react';
import { ALL_MODULES_META } from '@/data/modules/meta';
import { INTERVIEW_QUESTIONS } from '@/data/interviewData';
import { PROJECTS_DATA } from '@/data/projectsData';
import type { SearchResult } from '@/types';

export function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo((): SearchResult[] => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // 1. Search Curriculum Modules & Lessons
    for (const mod of ALL_MODULES_META) {
      for (const lesson of mod.lessons) {
        if (
          lesson.title.toLowerCase().includes(q) ||
          lesson.tags?.some((t: string) => t.toLowerCase().includes(q)) ||
          lesson.explanation?.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'lesson',
            id: lesson.id,
            title: lesson.title,
            description: `${mod.title} • ${lesson.explanation?.slice(0, 85)}...`,
            module: mod.title,
            url: `/${mod.key}/${lesson.slug}`,
          });
        }
      }
    }

    // 2. Search Interview Questions Bank
    for (const iq of INTERVIEW_QUESTIONS) {
      if (
        iq.question.toLowerCase().includes(q) ||
        iq.category.toLowerCase().includes(q) ||
        iq.answer.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'interview',
          id: iq.id,
          title: iq.question,
          description: `[${iq.category}] ${iq.answer.slice(0, 85)}...`,
          module: `${iq.category} Interview`,
          url: '/interview',
        });
      }
    }

    // 3. Search Full Stack Projects
    for (const proj of PROJECTS_DATA) {
      if (
        proj.title.toLowerCase().includes(q) ||
        proj.desc.toLowerCase().includes(q) ||
        proj.stack.some(s => s.toLowerCase().includes(q))
      ) {
        results.push({
          type: 'project',
          id: proj.id,
          title: proj.title,
          description: `${proj.stack.slice(0, 3).join(', ')} • ${proj.desc.slice(0, 75)}...`,
          module: `${proj.level.toUpperCase()} Project`,
          url: '/projects',
        });
      }
    }

    return results.slice(0, 16);
  }, [query]);

  const clear = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clear };
}
