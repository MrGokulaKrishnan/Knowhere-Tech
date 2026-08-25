import type { Lesson } from '@/types';

export const SPRING_BOOT_LESSONS: Lesson[] = [
  {
    id: 'sb-intro',
    moduleKey: 'spring-boot',
    title: 'Spring Boot Intro',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['spring boot', 'starter'],
    explanation: 'Spring Boot 3 / Java 25 Starters',
    beginnerExplanation: 'Beginner explanation for Spring Boot Intro.',
    technicalExplanation: 'Technical explanation for Spring Boot Intro.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Spring Boot Intro?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Spring Boot Intro',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Spring Boot Intro',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Spring Boot Intro?',
        level: 'beginner',
        answer: 'Answer for Spring Boot Intro'
      }
    ],
    xpReward: 10
  },
  {
    id: 'sb-rest',
    moduleKey: 'spring-boot',
    title: 'REST Controllers',
    slug: 'rest-controllers',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['rest'],
    explanation: 'Building RESTful endpoints',
    beginnerExplanation: 'Beginner explanation for REST Controllers.',
    technicalExplanation: 'Technical explanation for REST Controllers.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is REST Controllers?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for REST Controllers',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for REST Controllers',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for REST Controllers?',
        level: 'beginner',
        answer: 'Answer for REST Controllers'
      }
    ],
    xpReward: 10,
    visualizer: 'rest-lifecycle'
  },
  {
    id: 'sb-jpa',
    moduleKey: 'spring-boot',
    title: 'Spring Data JPA',
    slug: 'jpa',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['jpa'],
    explanation: 'Database access',
    beginnerExplanation: 'Beginner explanation for Spring Data JPA.',
    technicalExplanation: 'Technical explanation for Spring Data JPA.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Spring Data JPA?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Spring Data JPA',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Spring Data JPA',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Spring Data JPA?',
        level: 'beginner',
        answer: 'Answer for Spring Data JPA'
      }
    ],
    xpReward: 10
  },
  {
    id: 'sb-exception',
    moduleKey: 'spring-boot',
    title: 'Exception Handling',
    slug: 'exception-handling',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['exception'],
    explanation: 'Global exception handling',
    beginnerExplanation: 'Beginner explanation for Exception Handling.',
    technicalExplanation: 'Technical explanation for Exception Handling.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Exception Handling?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Exception Handling',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Exception Handling',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Exception Handling?',
        level: 'beginner',
        answer: 'Answer for Exception Handling'
      }
    ],
    xpReward: 10
  }
];
