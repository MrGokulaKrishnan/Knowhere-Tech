import type { Lesson } from '@/types';

export const SQL_LESSONS: Lesson[] = [
  {
    id: 'sql-joins-deep',
    moduleKey: 'sql',
    title: 'Relational Queries & SQL JOIN Operations',
    slug: 'joins',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['sql', 'joins', 'inner-join', 'left-join', 'relational-database'],
    explanation: 'SQL JOIN operations combine columns from one or more tables based on a related common key (Primary Key - Foreign Key relationship).',
    beginnerExplanation: 'If you have a sheet of "Users" and another sheet of "Orders", a JOIN connects them so you can see which user bought which item in a single neat spreadsheet.',
    technicalExplanation: 'The relational database optimizer processes JOIN clauses using algorithms such as Nested Loop Join, Hash Join, or Merge Join depending on table statistics, presence of B-Tree indexes on foreign keys, and dataset sizing.',
    keyPoints: [
      'INNER JOIN: Intersects matching rows in both left and right relations',
      'LEFT JOIN: Returns 100% of left table rows + matched right table rows (NULL on unmatched)',
      'RIGHT JOIN: Returns 100% of right table rows + matched left table rows',
      'Always ensure Foreign Key columns have B-Tree indexes to avoid expensive table scans'
    ],
    codeExample: `-- High performance JOIN with filtering and ordering
SELECT 
    u.id AS user_id,
    u.name,
    u.email,
    COUNT(o.id) AS total_orders,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'COMPLETED'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`,
    codeLanguage: 'sql',
    codeLines: [
      { code: 'FROM users u', token: 'FROM users u', explanation: 'Designates Table A as the driving left relation in the query plan.' },
      { code: 'LEFT JOIN orders o ON u.id = o.user_id', token: 'LEFT JOIN', explanation: 'Retains all users even if they have zero orders recorded in the orders table.' },
      { code: 'HAVING COUNT(o.id) > 0', token: 'HAVING', explanation: 'Filters aggregate grouped rows after the GROUP BY execution phase.' }
    ],
    visualizer: 'sql-joins',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'Which clause is used to filter aggregated group results produced by GROUP BY?',
        options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
        answer: 1,
        explanation: 'WHERE filters raw rows before aggregation; HAVING filters aggregated groups.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'complete-method',
        question: 'Complete the query to return all products and their category names:',
        code: `SELECT p.name, c.title FROM products p ... categories c ON p.category_id = c.id;`,
        answer: 'SELECT p.name, c.title FROM products p JOIN categories c ON p.category_id = c.id;',
        hint: 'Use standard INNER JOIN or JOIN keyword.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'What is the execution order of a SQL SELECT query?',
        level: 'intermediate',
        answer: 'SQL queries execute in this logical order: (1) FROM & JOINs, (2) WHERE filters, (3) GROUP BY, (4) HAVING filters, (5) SELECT column expressions, (6) DISTINCT, (7) ORDER BY, (8) LIMIT / OFFSET pagination.',
        example: 'Understanding this helps optimize queries and explain why aliases in SELECT cannot be used in WHERE clauses.'
      }
    ],
    xpReward: 20
  }
];
