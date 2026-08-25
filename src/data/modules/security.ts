import type { Lesson } from '@/types';

export const SECURITY_LESSONS: Lesson[] = [
  {
    id: 'sec-auth',
    moduleKey: 'security',
    title: 'Auth',
    slug: 'auth',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['sec'],
    explanation: 'Auth',
    beginnerExplanation: 'Beginner explanation for Auth.',
    technicalExplanation: 'Technical explanation for Auth.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Auth?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Auth',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Auth',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Auth?',
        level: 'beginner',
        answer: 'Answer for Auth'
      }
    ],
    xpReward: 10
  },
  {
    id: 'sec-jwt',
    moduleKey: 'security',
    title: 'JWT',
    slug: 'jwt',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['sec'],
    explanation: 'JWT',
    beginnerExplanation: 'Beginner explanation for JWT.',
    technicalExplanation: 'Technical explanation for JWT.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is JWT?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for JWT',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for JWT',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for JWT?',
        level: 'beginner',
        answer: 'Answer for JWT'
      }
    ],
    xpReward: 10
  }
];
