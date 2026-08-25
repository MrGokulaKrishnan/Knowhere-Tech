import type { Lesson } from '@/types';

export const GIT_LESSONS: Lesson[] = [
  {
    id: 'git-basics',
    moduleKey: 'git',
    title: 'Git Fundamentals',
    slug: 'basics',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['git'],
    explanation: 'git init, add, commit',
    beginnerExplanation: 'Beginner explanation for Git Fundamentals.',
    technicalExplanation: 'Technical explanation for Git Fundamentals.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Git Fundamentals?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Git Fundamentals',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Git Fundamentals',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Git Fundamentals?',
        level: 'beginner',
        answer: 'Answer for Git Fundamentals'
      }
    ],
    xpReward: 10,
    visualizer: 'git-workflow'
  },
  {
    id: 'git-workflow',
    moduleKey: 'git',
    title: 'Git Workflow',
    slug: 'workflow',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['branching'],
    explanation: 'git branch, merge',
    beginnerExplanation: 'Beginner explanation for Git Workflow.',
    technicalExplanation: 'Technical explanation for Git Workflow.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Git Workflow?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Git Workflow',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Git Workflow',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Git Workflow?',
        level: 'beginner',
        answer: 'Answer for Git Workflow'
      }
    ],
    xpReward: 10,
    visualizer: 'git-workflow'
  }
];
