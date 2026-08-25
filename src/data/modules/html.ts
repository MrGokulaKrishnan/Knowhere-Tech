import type { Lesson } from '@/types';

export const HTML_LESSONS: Lesson[] = [
  {
    id: 'html-structure',
    moduleKey: 'html',
    title: 'Structure',
    slug: 'structure',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['html'],
    explanation: 'Structure',
    beginnerExplanation: 'Beginner explanation for Structure.',
    technicalExplanation: 'Technical explanation for Structure.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Structure?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Structure',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Structure',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Structure?',
        level: 'beginner',
        answer: 'Answer for Structure'
      }
    ],
    xpReward: 10
  },
  {
    id: 'html-semantic',
    moduleKey: 'html',
    title: 'Semantic',
    slug: 'semantic',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['html'],
    explanation: 'Semantic',
    beginnerExplanation: 'Beginner explanation for Semantic.',
    technicalExplanation: 'Technical explanation for Semantic.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Semantic?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Semantic',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Semantic',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Semantic?',
        level: 'beginner',
        answer: 'Answer for Semantic'
      }
    ],
    xpReward: 10
  },
  {
    id: 'html-forms',
    moduleKey: 'html',
    title: 'Forms',
    slug: 'forms',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['html'],
    explanation: 'Forms',
    beginnerExplanation: 'Beginner explanation for Forms.',
    technicalExplanation: 'Technical explanation for Forms.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Forms?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Forms',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Forms',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Forms?',
        level: 'beginner',
        answer: 'Answer for Forms'
      }
    ],
    xpReward: 10
  }
];
