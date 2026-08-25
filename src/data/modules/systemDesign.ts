import type { Lesson } from '@/types';

export const SYSTEM_DESIGN_LESSONS: Lesson[] = [
  {
    id: 'sd-intro',
    moduleKey: 'system-design',
    title: 'System Design Basics',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['sd'],
    explanation: 'SD Intro',
    beginnerExplanation: 'Beginner explanation for System Design Basics.',
    technicalExplanation: 'Technical explanation for System Design Basics.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is System Design Basics?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for System Design Basics',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for System Design Basics',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for System Design Basics?',
        level: 'beginner',
        answer: 'Answer for System Design Basics'
      }
    ],
    xpReward: 10
  },
  {
    id: 'sd-load-balancer',
    moduleKey: 'system-design',
    title: 'Load Balancing',
    slug: 'load-balancer',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['sd'],
    explanation: 'LB',
    beginnerExplanation: 'Beginner explanation for Load Balancing.',
    technicalExplanation: 'Technical explanation for Load Balancing.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Load Balancing?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Load Balancing',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Load Balancing',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Load Balancing?',
        level: 'beginner',
        answer: 'Answer for Load Balancing'
      }
    ],
    xpReward: 10
  },
  {
    id: 'sd-database',
    moduleKey: 'system-design',
    title: 'Database',
    slug: 'database',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['sd'],
    explanation: 'DB',
    beginnerExplanation: 'Beginner explanation for Database.',
    technicalExplanation: 'Technical explanation for Database.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Database?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Database',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Database',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Database?',
        level: 'beginner',
        answer: 'Answer for Database'
      }
    ],
    xpReward: 10
  }
];
