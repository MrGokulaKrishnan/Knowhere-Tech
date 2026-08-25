import type { Lesson } from '@/types';

export const SQL_LESSONS: Lesson[] = [
  {
    id: 'sql-intro',
    moduleKey: 'sql',
    title: 'Introduction to Relational Databases & RDBMS',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['sql', 'database', 'rdbms', 'schema', 'tables'],
    explanation: 'Relational Database Management Systems (PostgreSQL, MySQL), tables, rows, columns, data integrity constraints, Primary Keys (PK), Foreign Keys (FK), and DDL/DML fundamentals.',
    beginnerExplanation: 'A relational database is like a collection of interlinked Excel spreadsheets. Primary keys give each row a unique passport ID, and Foreign keys link records across different sheets.',
    technicalExplanation: 'RDBMS engines maintain structured relations according to relational algebra. Primary keys enforce entity uniqueness via unique B-Tree indexes, while foreign keys guarantee referential integrity across relational schemas.',
    keyPoints: [
      'Relational Model: Tables (Relations), Rows (Tuples), Columns (Attributes)',
      'Primary Key (PK): Uniquely identifies a record and automatically creates a clustered/unique index',
      'Foreign Key (FK): Enforces referential integrity pointing to PK of another relation'
    ],
    codeExample: `CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(20) DEFAULT 'PENDING',
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`,
    codeLanguage: 'sql',
    codeLines: [
      { code: 'CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)', token: 'FOREIGN KEY', explanation: 'Enforces referential integrity constraint linking orders to valid users.' }
    ],
    quiz: [
      {
        id: 'q-sql-1',
        type: 'mcq',
        question: 'What is the role of a Foreign Key constraint in an RDBMS?',
        options: ['Encrypts database tables on disk', 'Enforces referential integrity between matching columns in two tables', 'Speeds up full text searches', 'Automatically backs up table rows'],
        answer: 1,
        explanation: 'Foreign keys guarantee that values in child records correspond to existing parent primary keys.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-sql-1',
        type: 'predict-output',
        question: 'What constraint prevents duplicate values in a column?',
        answer: 'UNIQUE',
        hint: 'Constraint ensuring all column values are distinct.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sql-1',
        question: 'What is the difference between DDL, DML, and DCL in SQL?',
        level: 'beginner',
        answer: 'DDL (Data Definition Language) modifies schema structure (CREATE, ALTER, DROP, TRUNCATE). DML (Data Manipulation Language) manages table rows (SELECT, INSERT, UPDATE, DELETE). DCL (Data Control Language) handles security permissions (GRANT, REVOKE).',
        example: 'CREATE TABLE is DDL; INSERT INTO is DML.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'sql-select',
    moduleKey: 'sql',
    title: 'SELECT Queries, Filtering & Pagination',
    slug: 'select',
    difficulty: 'beginner',
    duration: 14,
    order: 2,
    prerequisites: ['sql-intro'],
    tags: ['sql', 'select', 'where', 'order-by', 'pagination', 'limit'],
    explanation: 'Extracting data with SELECT, column aliasing, predicate filtering (WHERE, LIKE, IN, BETWEEN, IS NULL), sorting (ORDER BY), and pagination (LIMIT / OFFSET vs Keyset pagination).',
    beginnerExplanation: 'SELECT is how you search and filter your spreadsheet: "Show me all active users whose names start with G, sorted by join date, top 10 results."',
    technicalExplanation: 'The database query engine executes WHERE predicates during sequential table scans or index range scans. For large datasets, Keyset Pagination (`WHERE id > last_seen_id LIMIT 20`) is much faster than `OFFSET 100000` because it avoids scanning discarded rows.',
    keyPoints: [
      'Logical Query Order: FROM -> WHERE -> SELECT -> ORDER BY -> LIMIT',
      'Wildcards: `LIKE \'user_%\'` or `ILIKE` for case-insensitive matching',
      'Keyset Pagination: Scalable alternative to slow high-offset pagination in production'
    ],
    codeExample: `SELECT 
    id,
    username,
    email,
    created_at
FROM users
WHERE status = 'ACTIVE' 
  AND created_at >= '2026-01-01'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;`,
    codeLanguage: 'sql',
    codeLines: [
      { code: 'WHERE status = \'ACTIVE\' AND created_at >= \'2026-01-01\'', token: 'WHERE', explanation: 'Filters rows evaluated by the query optimizer.' }
    ],
    quiz: [
      {
        id: 'q-sql-2',
        type: 'mcq',
        question: 'Why does `OFFSET 1000000 LIMIT 20` perform poorly on large database tables?',
        options: ['It locks the entire database', 'The database engine must still scan and discard 1,000,000 rows before returning 20', 'OFFSET is unsupported in modern SQL', 'It requires an exclusive table write lock'],
        answer: 1,
        explanation: 'OFFSET requires scanning and throwing away all offset rows before returning the target page.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-sql-2',
        type: 'predict-output',
        question: 'Which clause is used to sort SQL query results in descending order?',
        answer: 'DESC',
        hint: 'Keyword for descending sort order.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sql-2',
        question: 'What is Keyset (Cursor) Pagination and why is it preferred over OFFSET?',
        level: 'intermediate',
        answer: 'Keyset pagination uses indexed sequential keys (`WHERE id > :lastSeenId ORDER BY id ASC LIMIT 20`). The database seeks directly to the index position in O(1) time without scanning and discarding previous pages, providing consistent sub-millisecond response times even on page 1,000,000.',
        example: 'Mobile infinite scrolling feeds always use cursor/keyset pagination.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'sql-joins',
    moduleKey: 'sql',
    title: 'Relational Queries & SQL JOIN Operations',
    slug: 'joins',
    difficulty: 'intermediate',
    duration: 16,
    order: 3,
    prerequisites: ['sql-select'],
    tags: ['sql', 'joins', 'inner-join', 'left-join', 'right-join', 'full-join'],
    explanation: 'Combining multi-table data using INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN, CROSS JOIN, and Self-Joins with foreign key optimization.',
    beginnerExplanation: 'A JOIN links two tables together: when you want to view a customer\'s details along with all the orders they placed, a JOIN matches their customer ID across both tables.',
    technicalExplanation: 'The query optimizer evaluates JOIN algorithms (Nested Loop Join for indexed lookups, Hash Join for large unsorted sets, Merge Join for pre-sorted inputs). Unmatched left rows in LEFT JOIN are populated with NULL values.',
    keyPoints: [
      'INNER JOIN: Intersects matching rows present in both left and right relations',
      'LEFT JOIN: Returns 100% of left table rows + matching right table rows (NULL on unmatched)',
      'Index Foreign Keys: Always place B-Tree indexes on FK columns to prevent full table scans during joins'
    ],
    codeExample: `SELECT 
    u.id AS user_id,
    u.username,
    o.id AS order_id,
    COALESCE(o.total_amount, 0.00) AS total_amount,
    o.status AS order_status
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'ACTIVE'
ORDER BY u.id;`,
    codeLanguage: 'sql',
    codeLines: [
      { code: 'LEFT JOIN orders o ON u.id = o.user_id', token: 'LEFT JOIN', explanation: 'Retains all users even if they have zero orders recorded.' }
    ],
    visualizer: 'sql-joins',
    quiz: [
      {
        id: 'q-sql-3',
        type: 'mcq',
        question: 'Which JOIN returns all rows from the Left table even if there are no matching records in the Right table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'NATURAL JOIN'],
        answer: 1,
        explanation: 'LEFT JOIN preserves all rows from the left table, filling unmatched right columns with NULL.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-sql-3',
        type: 'predict-output',
        question: 'What value is filled into non-matching right columns in a LEFT JOIN?',
        answer: 'NULL',
        hint: 'Standard SQL missing value indicator.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sql-3',
        question: 'What is a Self-Join and what is a practical enterprise use case?',
        level: 'intermediate',
        answer: 'A Self-Join is a regular join where a table is joined with itself. Common use cases include hierarchical organizational charts (finding an employee\'s manager where manager_id points to another employee id in the same table) or category trees.',
        example: 'SELECT e.name AS emp, m.name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;'
      }
    ],
    xpReward: 20
  },
  {
    id: 'sql-aggregates',
    moduleKey: 'sql',
    title: 'Aggregate Functions & GROUP BY Operations',
    slug: 'aggregates',
    difficulty: 'intermediate',
    duration: 14,
    order: 4,
    prerequisites: ['sql-joins'],
    tags: ['aggregates', 'group-by', 'having', 'count', 'sum', 'avg'],
    explanation: 'Summarizing dataset metrics using aggregate functions (COUNT, SUM, AVG, MIN, MAX), row partitioning with GROUP BY, and aggregate filtering with HAVING.',
    beginnerExplanation: 'GROUP BY organizes data into piles (e.g. by department) and calculates summary numbers for each pile (e.g. average salary per department).',
    technicalExplanation: 'Aggregate functions process subsets of rows collapsed by GROUP BY. WHERE filters individual rows before grouping occurs; HAVING filters grouped summaries after aggregation computation.',
    keyPoints: [
      'Aggregate Functions: COUNT(*), SUM(col), AVG(col), MIN(col), MAX(col)',
      'GROUP BY: Categorizes rows sharing common values into summary rows',
      'HAVING vs WHERE: WHERE filters rows prior to aggregation; HAVING filters aggregated groups'
    ],
    codeExample: `SELECT 
    department,
    COUNT(id) AS total_employees,
    ROUND(AVG(salary), 2) AS average_salary,
    MAX(salary) AS highest_salary
FROM employees
WHERE is_active = TRUE
GROUP BY department
HAVING COUNT(id) >= 5
ORDER BY average_salary DESC;`,
    codeLanguage: 'sql',
    codeLines: [
      { code: 'HAVING COUNT(id) >= 5', token: 'HAVING', explanation: 'Filters aggregate results, showing only departments with 5 or more active employees.' }
    ],
    quiz: [
      {
        id: 'q-sql-4',
        type: 'mcq',
        question: 'Why cannot aggregate functions like `COUNT()` or `SUM()` be used inside a `WHERE` clause?',
        options: ['SQL syntax limitations', 'The WHERE clause executes before rows are grouped and aggregated', 'WHERE only supports string columns', 'Aggregates require explicit database locks'],
        answer: 1,
        explanation: 'WHERE filters individual candidate rows before grouping occurs; use HAVING to filter aggregated results.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-sql-4',
        type: 'predict-output',
        question: 'Which aggregate function calculates the arithmetic mean of a numeric column?',
        answer: 'AVG',
        hint: 'Function calculating average values.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sql-4',
        question: 'What is the difference between COUNT(*) and COUNT(column_name)?',
        level: 'intermediate',
        answer: '`COUNT(*)` counts all rows in the result set regardless of NULL values. `COUNT(column_name)` counts only rows where the specified column contains a non-NULL value.',
        example: 'If table has 10 rows and 2 have NULL email, COUNT(*) is 10 while COUNT(email) is 8.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'sql-indexes',
    moduleKey: 'sql',
    title: 'Indexes, B-Trees & Query Optimization',
    slug: 'indexes',
    difficulty: 'advanced',
    duration: 18,
    order: 5,
    prerequisites: ['sql-aggregates'],
    tags: ['indexes', 'b-tree', 'optimization', 'explain-analyze', 'performance'],
    explanation: 'Database indexing internals: B-Tree vs Hash indexes, Clustered vs Non-Clustered indexes, Composite indexes (Leftmost Prefix Rule), and interpreting `EXPLAIN ANALYZE` query plans.',
    beginnerExplanation: 'An index is the index at the back of a textbook: instead of reading all 1,000 pages to find "Spring Boot", you flip to page 942 instantly.',
    technicalExplanation: 'B-Tree indexes maintain self-balancing multi-way search trees with O(log n) lookup. A Covering Index satisfies all columns in the SELECT clause directly from the index tree, eliminating expensive heap table lookups.',
    keyPoints: [
      'Clustered Index: Determines physical row storage order on disk (Primary Key in MySQL InnoDB)',
      'Leftmost Prefix Rule: Composite index `(A, B, C)` supports queries on `(A)`, `(A, B)`, and `(A, B, C)` but NOT `(B, C)` alone',
      'EXPLAIN ANALYZE: Reveals actual execution costs, sequential scans vs index scans'
    ],
    codeExample: `-- Create high-performance composite index
CREATE INDEX idx_users_status_created 
ON users (status, created_at DESC);

-- Analyze execution plan
EXPLAIN ANALYZE
SELECT id, username, email
FROM users
WHERE status = 'ACTIVE' 
  AND created_at >= '2026-01-01'
ORDER BY created_at DESC;`,
    codeLanguage: 'sql',
    codeLines: [
      { code: 'CREATE INDEX idx_users_status_created ON users (status, created_at DESC);', token: 'CREATE INDEX', explanation: 'Creates composite B-Tree index supporting filtering and pre-sorted ordering.' }
    ],
    quiz: [
      {
        id: 'q-sql-5',
        type: 'mcq',
        question: 'Given a composite index on columns `(department_id, salary)`, which WHERE clause can utilize this index efficiently?',
        options: ['WHERE salary > 50000', 'WHERE department_id = 10', 'WHERE bonus > 1000', 'WHERE hire_date > \'2026-01-01\''],
        answer: 1,
        explanation: 'Due to the Leftmost Prefix Rule, the composite index can only be used if queries filter on the leading column (department_id).',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-sql-5',
        type: 'predict-output',
        question: 'What SQL command is used to inspect the database query planner\'s execution path?',
        answer: 'EXPLAIN',
        hint: 'Command prefix to display query plan.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sql-5',
        question: 'What are the drawbacks of creating too many indexes on a database table?',
        level: 'intermediate',
        answer: '1. Slower Writes: Every INSERT, UPDATE, and DELETE must update the base table and all corresponding B-Tree index structures. 2. Storage Overhead: Indexes consume substantial disk space and RAM in the buffer pool. 3. Optimizer Confusion: Too many overlapping indexes can cause the query optimizer to select suboptimal execution plans.',
        example: 'Index write-heavy logging tables sparingly.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'sql-transactions',
    moduleKey: 'sql',
    title: 'Transactions, ACID Properties & Isolation Levels',
    slug: 'transactions',
    difficulty: 'advanced',
    duration: 18,
    order: 6,
    prerequisites: ['sql-indexes'],
    tags: ['transactions', 'acid', 'isolation-levels', 'concurrency', 'locking'],
    explanation: 'ACID guarantees (Atomicity, Consistency, Isolation, Durability), transaction boundaries (COMMIT, ROLLBACK), Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable), and concurrency phenomena (Dirty Reads, Non-Repeatable Reads, Phantom Reads).',
    beginnerExplanation: 'A transaction is an all-or-nothing deal: when transferring money between bank accounts, either both the deduction and deposit succeed, or everything is canceled safely.',
    technicalExplanation: 'RDBMS implementations enforce ACID using Write-Ahead Logging (WAL) and Multi-Version Concurrency Control (MVCC). Repeatable Read uses snapshot isolation to ensure queries see a consistent point-in-time state without locking concurrent readers.',
    keyPoints: [
      'ACID: Atomicity (all-or-nothing), Consistency (rules preserved), Isolation (concurrent safety), Durability (persisted on disk)',
      'MVCC: Multi-Version Concurrency Control allows non-blocking reads during active writes',
      'Isolation Levels: Read Committed (default in Postgres), Repeatable Read (default in MySQL InnoDB), Serializable (strictest)'
    ],
    codeExample: `BEGIN TRANSACTION;

-- Deduct from Account A
UPDATE accounts 
SET balance = balance - 500.00 
WHERE account_id = 'ACC_1001' AND balance >= 500.00;

-- Credit to Account B
UPDATE accounts 
SET balance = balance + 500.00 
WHERE account_id = 'ACC_2002';

-- Record Ledger Audit
INSERT INTO ledger_entries (from_acc, to_acc, amount, created_at)
VALUES ('ACC_1001', 'ACC_2002', 500.00, NOW());

COMMIT;`,
    codeLanguage: 'sql',
    codeLines: [
      { code: 'COMMIT;', token: 'COMMIT', explanation: 'Persists all modifications atomically and releases transactional locks.' }
    ],
    quiz: [
      {
        id: 'q-sql-6',
        type: 'mcq',
        question: 'Which transaction phenomenon occurs when a transaction reads uncommitted data written by another concurrent transaction that is later rolled back?',
        options: ['Phantom Read', 'Dirty Read', 'Non-Repeatable Read', 'Lost Update'],
        answer: 1,
        explanation: 'A Dirty Read happens when a transaction reads uncommitted, dirty modifications from another transaction.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-sql-6',
        type: 'predict-output',
        question: 'Which SQL command rolls back all changes in an active transaction block?',
        answer: 'ROLLBACK',
        hint: 'Command to cancel uncommitted transaction.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sql-6',
        question: 'Explain the difference between Optimistic and Pessimistic Locking.',
        level: 'advanced',
        answer: 'Pessimistic Locking (`SELECT ... FOR UPDATE`) locks the row immediately at the database level, preventing any other transaction from reading/modifying it until the lock is released (best for high-contention financial writes). Optimistic Locking checks a `@Version` column during update; if the version changed since read, it throws an `OptimisticLockException` without database-level row locks (best for read-heavy web apps).',
        example: 'Spring Data JPA `@Version` on entities implements optimistic locking.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'sql-normalization',
    moduleKey: 'sql',
    title: 'Database Normalization & Denormalization',
    slug: 'normalization',
    difficulty: 'intermediate',
    duration: 16,
    order: 7,
    prerequisites: ['sql-transactions'],
    tags: ['normalization', '1nf', '2nf', '3nf', 'bcnf', 'denormalization'],
    explanation: 'Schema design methodology: 1NF (atomic columns), 2NF (remove partial dependencies), 3NF (remove transitive dependencies), Boyce-Codd Normal Form (BCNF), and intentional denormalization tradeoffs for read-heavy high-throughput architectures.',
    beginnerExplanation: 'Normalization is organizing your closet so every item has one dedicated drawer, preventing duplicate copies and messy clutter.',
    technicalExplanation: '3NF ensures every non-key attribute is dependent on "the key, the whole key, and nothing but the key". Denormalization selectively introduces controlled redundancy to avoid expensive multi-table joins in high-traffic read operations.',
    keyPoints: [
      '1NF: Atomic column values with no repeating groups',
      '2NF: 1NF + All non-key attributes fully functionally dependent on the entire primary key',
      '3NF: 2NF + No transitive dependencies (no non-key column determines another non-key column)',
      'Denormalization Tradeoff: Faster read performance at the cost of duplicate data and complex update consistency'
    ],
    codeExample: `-- 3NF Normalized Schema Design
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL REFERENCES categories(id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id),
    product_id INT NOT NULL REFERENCES products(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL -- Historical price snapshot
);`,
    codeLanguage: 'sql',
    codeLines: [
      { code: 'unit_price DECIMAL(10, 2) NOT NULL', token: 'historical snapshot', explanation: 'Intentional snapshot preservation protecting historic financial records against future product price updates.' }
    ],
    quiz: [
      {
        id: 'q-sql-7',
        type: 'mcq',
        question: 'Which Normal Form requires removing partial dependencies where a non-key column depends on only part of a composite primary key?',
        options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Fifth Normal Form (5NF)'],
        answer: 1,
        explanation: '2NF requires tables in 1NF to have all non-key columns depend on the complete composite primary key.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-sql-7',
        type: 'predict-output',
        question: 'What is the primary risk of an unnormalized database schema?',
        answer: 'Data redundancy and update anomalies',
        hint: 'Inconsistencies when updating duplicate records.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sql-7',
        question: 'When is it appropriate to intentionally denormalize a database schema in production?',
        level: 'advanced',
        answer: 'Denormalization is appropriate in read-heavy architectures (e.g. analytics reporting, e-commerce product catalogs) where complex multi-table JOINs create CPU and latency bottlenecks. By pre-aggregating or embedding related attributes into the primary table, queries return in O(1) single-table reads at the cost of slight storage increase and update coordination.',
        example: 'Caching `total_order_amount` directly on the `orders` table to avoid joining `order_items` on every user dashboard view.'
      }
    ],
    xpReward: 20
  }
];
