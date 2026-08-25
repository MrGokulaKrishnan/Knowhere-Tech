import type { Lesson } from '@/types';

export const LINUX_LESSONS: Lesson[] = [
  {
    id: 'linux-basics',
    moduleKey: 'linux',
    title: 'Linux Basics',
    slug: 'basics',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['linux'],
    explanation: 'Linux directory hierarchy',
    beginnerExplanation: 'Beginner explanation for Linux Basics.',
    technicalExplanation: 'Technical explanation for Linux Basics.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Linux Basics?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Linux Basics',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Linux Basics',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Linux Basics?',
        level: 'beginner',
        answer: 'Answer for Linux Basics'
      }
    ],
    xpReward: 10,
    visualizer: 'linux-terminal'
  },
  {
    id: 'linux-filesystem',
    moduleKey: 'linux',
    title: 'Filesystem',
    slug: 'filesystem',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['filesystem'],
    explanation: 'Permissions',
    beginnerExplanation: 'Beginner explanation for Filesystem.',
    technicalExplanation: 'Technical explanation for Filesystem.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Filesystem?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Filesystem',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Filesystem',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Filesystem?',
        level: 'beginner',
        answer: 'Answer for Filesystem'
      }
    ],
    xpReward: 10,
    visualizer: 'linux-terminal'
  },
  {
    id: 'linux-processes',
    moduleKey: 'linux',
    title: 'Processes',
    slug: 'processes',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['processes'],
    explanation: 'Process management',
    beginnerExplanation: 'Beginner explanation for Processes.',
    technicalExplanation: 'Technical explanation for Processes.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is Processes?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for Processes',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for Processes',
        answer: 'answer'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Interview question for Processes?',
        level: 'beginner',
        answer: 'Answer for Processes'
      }
    ],
    xpReward: 10,
    visualizer: 'linux-terminal'
  }
];
