import type { Lesson } from '@/types';

export const REST_API_LESSONS: Lesson[] = [
  {
    id: 'rest-intro',
    moduleKey: 'rest-api',
    title: 'REST Fundamentals',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['rest'],
    explanation: 'REST architectural constraints',
    beginnerExplanation: 'Beginner explanation for REST Fundamentals.',
    technicalExplanation: 'Technical explanation for REST Fundamentals.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is REST Fundamentals?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for REST Fundamentals',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for REST Fundamentals',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for REST Fundamentals?',
        level: 'beginner',
        answer: 'Answer for REST Fundamentals'
      }
    ],
    xpReward: 10,
    visualizer: 'rest-lifecycle'
  },
  {
    id: 'rest-methods',
    moduleKey: 'rest-api',
    title: 'HTTP Methods',
    slug: 'methods',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['http'],
    explanation: 'HTTP Methods',
    beginnerExplanation: 'Beginner explanation for HTTP Methods.',
    technicalExplanation: 'Technical explanation for HTTP Methods.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is HTTP Methods?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for HTTP Methods',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for HTTP Methods',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for HTTP Methods?',
        level: 'beginner',
        answer: 'Answer for HTTP Methods'
      }
    ],
    xpReward: 10,
    visualizer: 'rest-lifecycle'
  }
];
