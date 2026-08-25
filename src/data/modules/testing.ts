import type { Lesson } from '@/types';

export const TESTING_LESSONS: Lesson[] = [
  {
    id: 'test-junit',
    moduleKey: 'testing',
    title: 'JUnit',
    slug: 'junit',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['testing'],
    explanation: 'JUnit',
    beginnerExplanation: 'Beginner explanation for JUnit.',
    technicalExplanation: 'Technical explanation for JUnit.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is JUnit?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for JUnit',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for JUnit',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for JUnit?',
        level: 'beginner',
        answer: 'Answer for JUnit'
      }
    ],
    xpReward: 10
  },
  {
    id: 'test-mockito',
    moduleKey: 'testing',
    title: 'Mockito',
    slug: 'mockito',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['testing'],
    explanation: 'Mockito',
    beginnerExplanation: 'Beginner explanation for Mockito.',
    technicalExplanation: 'Technical explanation for Mockito.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Mockito?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Mockito',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Mockito',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Mockito?',
        level: 'beginner',
        answer: 'Answer for Mockito'
      }
    ],
    xpReward: 10
  }
];
