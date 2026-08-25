import type { Lesson } from '@/types';

export const NETWORKING_LESSONS: Lesson[] = [
  {
    id: 'net-basics',
    moduleKey: 'networking',
    title: 'Basics',
    slug: 'basics',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['net'],
    explanation: 'Basics',
    beginnerExplanation: 'Beginner explanation for Basics.',
    technicalExplanation: 'Technical explanation for Basics.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Basics?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Basics',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Basics',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Basics?',
        level: 'beginner',
        answer: 'Answer for Basics'
      }
    ],
    xpReward: 10
  }
];
