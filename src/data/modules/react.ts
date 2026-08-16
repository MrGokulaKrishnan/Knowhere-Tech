import type { Lesson } from '@/types';

export const REACT_LESSONS: Lesson[] = [
  {
    id: 'react-hooks-architecture',
    moduleKey: 'react',
    title: 'React 19 Hooks, State & Component Architecture',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['react', 'hooks', 'usestate', 'useeffect', 'components', 'react19'],
    explanation: 'React is a component-driven declarative UI library. React 19 emphasizes concurrent rendering, actions, compiler optimizations, and robust hook-based state management.',
    beginnerExplanation: 'React is like building with LEGO blocks. Each block (Component) contains its own design (HTML), logic (JavaScript), and memory (State). When the memory changes, React automatically repaints just that one block without refreshing the entire web page.',
    technicalExplanation: 'React maintains a Virtual DOM tree representation. State updates trigger Fiber reconciliation, performing diffing algorithms to batch and commit minimal mutations to the real browser DOM. Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`) allow functional components to hook into React fiber state and lifecycles.',
    keyPoints: [
      'Unidirectional Data Flow: Props flow down from parents; events bubble up from children',
      'State Immutability: Always return new object/array copies using spread operator (`...`)',
      'Hook Rules: Call hooks only at top-level of function components, never inside loops or conditions',
      'React 19: Actions, `use()` hook for promises, and enhanced compiler-level memoization'
    ],
    codeExample: `import React, { useState, useEffect } from 'react';

export function DeveloperTracker() {
    const [skills, setSkills] = useState<string[]>(['Java 25', 'Spring Boot 3']);
    const [input, setInput] = useState('');

    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        // Immutability: create new array reference
        setSkills(prev => [...prev, input.trim()]);
        setInput('');
    };

    return (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h2 className="text-white font-bold mb-3">Learned Technologies</h2>
            <ul className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, idx) => (
                    <li key={idx} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-mono">
                        {skill}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Add skill (e.g., Docker, AWS)..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-1 text-sm text-white"
                />
                <button type="submit" className="bg-cyan-500 text-slate-950 px-4 py-1 rounded font-semibold text-sm">
                    Add
                </button>
            </form>
        </div>
    );
}`,
    codeLanguage: 'javascript',
    codeLines: [
      { code: '    const [skills, setSkills] = useState<string[]>(...);', token: 'useState', explanation: 'Declares a reactive state variable that triggers component re-render upon update.' },
      { code: '        setSkills(prev => [...prev, input.trim()]);', token: '[...prev, ...]', explanation: 'Creates a brand new array reference via spread syntax preserving state immutability.' }
    ],
    visualizer: 'rest-lifecycle',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'Why should you never mutate state directly (e.g., `skills.push(item)`) in React?',
        options: [
          'It crashes the computer hardware',
          'React relies on object reference equality comparison to detect changes and trigger re-renders',
          'JavaScript syntax does not permit array mutations',
          'It causes CSS styling errors'
        ],
        answer: 1,
        explanation: 'React compares previous and next state references (`prev !== next`). Mutating in-place keeps the same reference, so React skips re-rendering.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'complete-method',
        question: 'How do you update state based on previous state value safely in useState?',
        code: 'setCount(...)',
        answer: 'setCount(prev => prev + 1)',
        hint: 'Use the functional updater form with prev parameter.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'What is the Virtual DOM and how does reconciliation work in React?',
        level: 'intermediate',
        answer: 'The Virtual DOM is an in-memory lightweight JavaScript object tree mirroring the real DOM. When state changes, React constructs a new Virtual DOM tree, runs the reconciliation diffing algorithm (Fiber) to compute the minimum set of changes required, and efficiently batches batch updates to the real browser DOM, avoiding expensive layout reflows.',
        example: 'React Fiber architecture enables interruptible concurrent rendering.'
      }
    ],
    xpReward: 20
  }
];
