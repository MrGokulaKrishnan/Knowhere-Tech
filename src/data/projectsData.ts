export interface ProjectItem {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  xp: number;
  stack: string[];
  desc: string;
  features: string[];
  architecture: string;
  dbSchema: string[];
  apiEndpoints: string[];
  dockerComposeSnippet?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Student Management System',
    level: 'beginner',
    duration: '2 weeks',
    xp: 200,
    stack: ['Java 25', 'Spring Boot 3', 'Spring Data JPA', 'H2 / MySQL', 'Bootstrap'],
    desc: 'Foundational full stack application demonstrating clean layered architecture (Controller -> Service -> Repository), form validations, and database CRUD operations.',
    features: [
      'Student record creation, modification, search, and deletion',
      'Course enrollment and grading calculator',
      'Server-side validation using Jakarta Bean Validation',
      'Pagination and sorting with Spring Data Pageable'
    ],
    architecture: 'Standard Model-View-Controller (MVC) with Thymeleaf / REST API layers and H2 memory database for instant local development.',
    dbSchema: ['students (id PK, first_name, last_name, email UNIQUE, enrolled_date)', 'courses (id PK, title, credits, code UNIQUE)', 'enrollments (id PK, student_id FK, course_id FK, grade)'],
    apiEndpoints: ['GET /api/v1/students?page=0&size=10', 'POST /api/v1/students', 'GET /api/v1/students/{id}', 'PUT /api/v1/students/{id}', 'DELETE /api/v1/students/{id}']
  },
  {
    id: 'p2',
    title: 'Library Management System',
    level: 'beginner',
    duration: '2 weeks',
    xp: 250,
    stack: ['Java 25', 'Spring Boot 3', 'Spring Data JPA', 'MySQL', 'Flyway'],
    desc: 'Enterprise resource tracking system managing books, borrowers, fine calculations, and automated return reminders.',
    features: [
      'Book cataloging with ISBN lookup and category classification',
      'Member issuance tracking with overdue fee computation',
      'Database migrations using Flyway',
      'Custom repository queries with Spring Data @Query and JPQL'
    ],
    architecture: 'Layered Spring Boot service with transactional business boundaries and database schema versioning.',
    dbSchema: ['books (id PK, isbn UNIQUE, title, author, total_copies, available_copies)', 'members (id PK, name, phone, email, membership_type)', 'loans (id PK, book_id FK, member_id FK, issue_date, due_date, return_date, fine_amount)'],
    apiEndpoints: ['GET /api/v1/books', 'POST /api/v1/loans/issue', 'POST /api/v1/loans/return/{loanId}', 'GET /api/v1/members/{id}/fines']
  },
  {
    id: 'p3',
    title: 'Task Management Kanban Application',
    level: 'intermediate',
    duration: '3 weeks',
    xp: 350,
    stack: ['React 19', 'Spring Boot 3', 'Spring Security', 'JWT', 'MySQL', 'Tailwind CSS'],
    desc: 'Modern collaborative Kanban board application with drag-and-drop task state transitions, tags, priorities, and token-based authentication.',
    features: [
      'Stateless user authentication with JWT access and refresh tokens',
      'Kanban columns (TODO, IN_PROGRESS, REVIEW, DONE) with drag-and-drop',
      'Role-based permissions (ADMIN, MEMBER, VIEWER)',
      'Global exception handling with ProblemDetail (RFC 7807)'
    ],
    architecture: 'Decoupled architecture: React 19 Single Page App communicating over REST APIs with a Spring Boot security backend.',
    dbSchema: ['users (id PK, username, email, password_hash, role)', 'boards (id PK, title, owner_id FK)', 'tasks (id PK, board_id FK, title, description, status, priority, assignee_id FK)'],
    apiEndpoints: ['POST /api/v1/auth/login', 'POST /api/v1/auth/register', 'GET /api/v1/boards/{id}/tasks', 'PATCH /api/v1/tasks/{id}/status']
  },
  {
    id: 'p4',
    title: 'Personal Expense & Budget Tracker',
    level: 'intermediate',
    duration: '3 weeks',
    xp: 350,
    stack: ['React 19', 'Spring Boot 3', 'PostgreSQL', 'Recharts', 'Docker'],
    desc: 'Interactive financial tracker providing spending category analytics, monthly budget forecasts, and CSV statement exports.',
    features: [
      'Multi-currency expense logging and tagging',
      'Dynamic charts and breakdown visualizations using Recharts',
      'Monthly spending limit notifications and budget threshold alerts',
      'Containerized development environment using Docker Compose'
    ],
    architecture: 'React dashboard with PostgreSQL analytical queries and automated monthly summary aggregation jobs.',
    dbSchema: ['users (id PK, email, preferred_currency)', 'categories (id PK, name, icon_slug, budget_limit)', 'transactions (id PK, user_id FK, category_id FK, amount, currency, timestamp, notes)'],
    apiEndpoints: ['GET /api/v1/analytics/monthly-summary', 'POST /api/v1/transactions', 'GET /api/v1/transactions/export-csv']
  },
  {
    id: 'p5',
    title: 'Full Stack E-Commerce Platform',
    level: 'intermediate',
    duration: '5 weeks',
    xp: 500,
    stack: ['React 19', 'Spring Boot 3', 'Spring Security', 'MySQL', 'Stripe API', 'Docker'],
    desc: 'Complete commercial platform with shopping cart state management, checkout payments, order state machines, and administrative inventory controls.',
    features: [
      'Product browsing, full-text search, and multi-facet filtering',
      'Cart session management and discount voucher engine',
      'Stripe Payment Intent webhook integration',
      'Order fulfillment lifecycle (PLACED -> PAID -> SHIPPED -> DELIVERED)'
    ],
    architecture: 'Enterprise monolith with clean DTO mappings (MapStruct), transactional isolation, and idempotent payment webhooks.',
    dbSchema: ['products (id PK, title, sku UNIQUE, price, stock, category_id FK)', 'orders (id PK, user_id FK, total_amount, status, payment_intent_id)', 'order_items (id PK, order_id FK, product_id FK, quantity, unit_price)'],
    apiEndpoints: ['GET /api/v1/products?search=laptop', 'POST /api/v1/checkout/create-payment-intent', 'POST /api/v1/webhooks/stripe', 'GET /api/v1/orders/my-orders']
  },
  {
    id: 'p6',
    title: 'Developer Job Portal & Application Tracking',
    level: 'intermediate',
    duration: '5 weeks',
    xp: 500,
    stack: ['React 19', 'Spring Boot 3', 'PostgreSQL', 'AWS S3', 'Spring Mail'],
    desc: 'Two-sided recruitment marketplace where companies post tech openings and candidates submit resumes with automated status tracking.',
    features: [
      'Role segregation for Job Seekers vs Employer Recruiters',
      'Resume file upload to AWS S3 / MinIO with secure pre-signed URLs',
      'Automated candidate email status notifications via Spring Mail',
      'Application tracking pipeline with stage-wise status updates'
    ],
    architecture: 'Spring Boot backend integrated with cloud object storage for binary resumes and SMTP mail servers for transactional alerts.',
    dbSchema: ['companies (id PK, name, logo_url, website)', 'jobs (id PK, company_id FK, title, description, location_type, salary_range)', 'applications (id PK, job_id FK, user_id FK, resume_s3_url, status, applied_at)'],
    apiEndpoints: ['GET /api/v1/jobs', 'POST /api/v1/jobs', 'POST /api/v1/applications/{jobId}/apply', 'PATCH /api/v1/applications/{id}/status']
  },
  {
    id: 'p7',
    title: 'Real-Time Chat & Collaboration Engine',
    level: 'advanced',
    duration: '4 weeks',
    xp: 600,
    stack: ['React 19', 'Spring Boot 3', 'Spring WebSockets (STOMP)', 'Redis', 'Docker'],
    desc: 'High-concurrency chat platform supporting public/private channels, online presence indicators, and message history caching with Redis.',
    features: [
      'Full-duplex real-time communication using STOMP over WebSockets',
      'Redis Pub/Sub for horizontal scaling across multiple Spring Boot instances',
      'User presence heartbeat and typing indicators',
      'Message persistence with pagination for historical chat replay'
    ],
    architecture: 'Event-driven WebSocket gateway backed by Redis Pub/Sub cluster ensuring cross-node message broadcast synchronization.',
    dbSchema: ['chat_rooms (id PK, name, is_private, created_at)', 'room_members (room_id FK, user_id FK, joined_at)', 'messages (id PK, room_id FK, sender_id FK, content, timestamp)'],
    apiEndpoints: ['WS /ws-chat (STOMP endpoint)', 'GET /api/v1/rooms/{id}/history?limit=50', 'POST /api/v1/rooms']
  },
  {
    id: 'p8',
    title: 'Production Enterprise SaaS with AWS & CI/CD',
    level: 'advanced',
    duration: '8 weeks',
    xp: 1000,
    stack: ['React 19', 'Spring Boot 3', 'Virtual Threads', 'PostgreSQL', 'Docker', 'GitHub Actions', 'AWS ECS', 'Terraform'],
    desc: 'The capstone portfolio project: A multi-tenant production microservice system deployed on AWS with automated GitHub Actions CI/CD, Prometheus monitoring, and zero-downtime rolling updates.',
    features: [
      'Multi-tenant tenant isolation with dynamic database schemas',
      'High-throughput asynchronous workloads powered by Java 25 Virtual Threads',
      'Comprehensive testing suite: Unit tests (JUnit 5/Mockito) and Integration tests (Testcontainers)',
      'Automated GitHub Actions CI/CD building Docker images pushed to AWS ECR',
      'Infrastructure as Code (Terraform) provisioning AWS VPC, ALB, ECS Fargate, and RDS'
    ],
    architecture: 'Cloud-Native architecture on AWS: Route 53 -> CloudFront (React) + ALB -> ECS Fargate Cluster (Spring Boot) -> Aurora PostgreSQL Multi-AZ + Redis Cluster.',
    dbSchema: ['tenants (id PK, name, plan, db_schema)', 'audit_logs (id PK, tenant_id FK, actor_id, action, timestamp, metadata_json)', 'billing_subscriptions (id PK, tenant_id FK, stripe_sub_id, status)'],
    apiEndpoints: ['POST /api/v1/auth/sso', 'GET /api/v1/tenant/metrics', 'GET /actuator/health', 'GET /actuator/prometheus']
  }
];
