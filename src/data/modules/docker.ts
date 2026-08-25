import type { Lesson } from '@/types';

export const DOCKER_LESSONS: Lesson[] = [
  {
    id: 'docker-intro',
    moduleKey: 'docker',
    title: 'Docker Introduction',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['docker'],
    explanation: 'Containers vs VMs',
    beginnerExplanation: 'Beginner explanation for Docker Introduction.',
    technicalExplanation: 'Technical explanation for Docker Introduction.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Docker Introduction?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Docker Introduction',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Docker Introduction',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Docker Introduction?',
        level: 'beginner',
        answer: 'Answer for Docker Introduction'
      }
    ],
    xpReward: 10
  },
  {
    id: 'docker-dockerfile',
    moduleKey: 'docker',
    title: 'Dockerfiles',
    slug: 'dockerfile',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['dockerfile'],
    explanation: 'Multi-stage Java 25 Dockerfile',
    beginnerExplanation: 'Beginner explanation for Dockerfiles.',
    technicalExplanation: 'Technical explanation for Dockerfiles.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Dockerfiles?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Dockerfiles',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Dockerfiles',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Dockerfiles?',
        level: 'beginner',
        answer: 'Answer for Dockerfiles'
      }
    ],
    xpReward: 10,
    visualizer: 'docker-architecture'
  },
  {
    id: 'docker-compose',
    moduleKey: 'docker',
    title: 'Docker Compose',
    slug: 'compose',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['compose'],
    explanation: 'Docker Compose',
    beginnerExplanation: 'Beginner explanation for Docker Compose.',
    technicalExplanation: 'Technical explanation for Docker Compose.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Docker Compose?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Docker Compose',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Docker Compose',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Docker Compose?',
        level: 'beginner',
        answer: 'Answer for Docker Compose'
      }
    ],
    xpReward: 10
  }
];
