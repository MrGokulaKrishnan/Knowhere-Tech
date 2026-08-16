export interface InterviewQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  example?: string;
}

export const INTERVIEW_QUESTIONS: InterviewQ[] = [
  // JAVA & MODERN FEATURES
  {
    id: 'j1',
    category: 'Java',
    question: 'What is the difference between JDK, JRE, and JVM?',
    level: 'beginner',
    answer: 'JDK (Java Development Kit) contains the javac compiler, debuggers, and tools needed to develop Java apps. JRE (Java Runtime Environment) contains the libraries and JVM needed to run apps. JVM (Java Virtual Machine) executes bytecode, translates it to native CPU instructions via JIT, and manages runtime memory with the Garbage Collector.',
    example: 'JDK = JRE + Tools\nJRE = JVM + Standard Class Libraries'
  },
  {
    id: 'j2',
    category: 'Java',
    question: 'How do Virtual Threads differ from traditional Platform Threads?',
    level: 'advanced',
    answer: 'Platform threads are 1:1 wrappers over OS threads, consuming ~1MB of memory and expensive context-switch cycles (limited to ~5,000 threads). Virtual Threads (Project Loom in Java 21/25) are M:N lightweight user-mode threads managed by the JVM. Hundreds of thousands can run concurrently with near-zero memory footprint because blocking I/O unmounts them from carrier OS threads.',
    example: 'try (var executor = Executors.newVirtualThreadPerTaskExecutor()) { ... }'
  },
  {
    id: 'j3',
    category: 'Java',
    question: 'What are Java Records and when should you prefer them over standard classes?',
    level: 'intermediate',
    answer: 'Records (Java 16+) are specialized immutable classes that eliminate boilerplate. They auto-generate private final fields, canonical constructors, getters, equals(), hashCode(), and toString(). Use them for DTOs, API payloads, and value objects where state is immutable.',
    example: 'public record UserProfileDto(Long id, String name, String email) {}'
  },
  {
    id: 'j4',
    category: 'Java',
    question: 'What is the difference between `==` and `.equals()` in Java?',
    level: 'beginner',
    answer: '`==` compares primitive values or reference memory addresses (whether two variables point to the exact same object in the heap). `.equals()` is a method meant to evaluate semantic/logical equality of object state.',
    example: 'String a = new String("hi");\nString b = new String("hi");\na == b -> false (different addresses)\na.equals(b) -> true (same character sequence)'
  },
  {
    id: 'j5',
    category: 'Java',
    question: 'How does HashMap handle hash collisions in Java 8+?',
    level: 'intermediate',
    answer: 'HashMap uses an array of buckets. When a collision occurs, entries are chained into a singly-linked list. Once a single bucket exceeds TREEIFY_THRESHOLD (8 entries) and the capacity is at least 64, the list is transformed into a balanced Red-Black Tree (TreeNode), reducing worst-case lookup from O(n) to O(log n).',
    example: 'Average lookup: O(1). Worst-case with high collisions: O(log n).'
  },
  {
    id: 'j6',
    category: 'Java',
    question: 'What is the difference between fail-fast and fail-safe iterators?',
    level: 'intermediate',
    answer: 'Fail-fast iterators (e.g., ArrayList, HashMap) throw ConcurrentModificationException immediately if the underlying collection is modified during iteration without using iterator methods. Fail-safe / weakly-consistent iterators (e.g., CopyOnWriteArrayList, ConcurrentHashMap) operate on a clone or snapshot of the collection and never throw ConcurrentModificationException.',
    example: 'ConcurrentHashMap provides thread-safe weakly consistent iteration.'
  },

  // SPRING BOOT
  {
    id: 'sb1',
    category: 'Spring Boot',
    question: 'What is Dependency Injection (DI) and Inversion of Control (IoC)?',
    level: 'beginner',
    answer: 'Inversion of Control (IoC) is a design principle where the control of object creation and lifecycle is delegated from the application code to the framework container (ApplicationContext). Dependency Injection (DI) is the concrete pattern where dependencies are supplied (injected) via constructor, setter, or field, enabling loose coupling and unit testability with mocks.',
    example: '@Service\npublic class UserService {\n  private final UserRepository repo;\n  public UserService(UserRepository repo) { this.repo = repo; }\n}'
  },
  {
    id: 'sb2',
    category: 'Spring Boot',
    question: 'What is the difference between `@Component`, `@Service`, `@Repository`, and `@Controller`?',
    level: 'beginner',
    answer: 'All four are stereotype annotations that register beans in the IoC container. `@Component` is the generic stereotype. `@Service` denotes business logic components. `@Repository` denotes data access and enables automatic Spring persistence exception translation. `@Controller` / `@RestController` handles HTTP requests in the web layer.',
    example: '@RestController = @Controller + @ResponseBody'
  },
  {
    id: 'sb3',
    category: 'Spring Boot',
    question: 'How does Spring Boot Auto-Configuration work under the hood?',
    level: 'intermediate',
    answer: 'Spring Boot checks the classpath, existing bean definitions, and property files on startup. Using `@EnableAutoConfiguration` and metadata from `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`, it evaluates `@ConditionalOnClass`, `@ConditionalOnMissingBean`, and `@ConditionalOnProperty` to configure embedded Tomcat, DataSource, Jackson, and security automatically if you haven\'t defined your own.',
    example: 'Adding spring-boot-starter-data-jpa auto-configures EntityManager and HikariCP pool.'
  },
  {
    id: 'sb4',
    category: 'Spring Boot',
    question: 'What is the role of Spring Data JPA and Hibernate in the stack?',
    level: 'intermediate',
    answer: 'JPA (Jakarta Persistence API) is the official specification for Object-Relational Mapping (ORM) in Java. Hibernate is the popular JPA implementation that translates Java entity mappings and queries into SQL dialects. Spring Data JPA is an abstraction on top of JPA that provides repository interfaces (`JpaRepository`) with automatic query method generation.',
    example: 'public interface OrderRepository extends JpaRepository<Order, Long> { List<Order> findByStatus(String status); }'
  },

  // SQL & DATABASES
  {
    id: 'sq1',
    category: 'SQL',
    question: 'Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN.',
    level: 'beginner',
    answer: 'INNER JOIN returns only rows that have matching records in both tables. LEFT JOIN returns all rows from the left table and matching rows from the right (with NULL for non-matches). FULL OUTER JOIN returns all rows from both tables, filling NULL wherever a match is missing.',
    example: 'SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id;'
  },
  {
    id: 'sq2',
    category: 'SQL',
    question: 'What are ACID properties in database transactions?',
    level: 'intermediate',
    answer: 'Atomicity (all operations commit or all roll back), Consistency (database transitions from one valid state to another satisfying all schema constraints), Isolation (concurrent transactions execute without interfering with each other based on isolation level), and Durability (committed data is permanently stored even through power crashes).',
    example: 'Handled in Spring with the @Transactional annotation.'
  },
  {
    id: 'sq3',
    category: 'SQL',
    question: 'What is database indexing and when can an index degrade performance?',
    level: 'intermediate',
    answer: 'An index is a B-Tree or Hash data structure that allows the query engine to find rows in O(log n) time without full table scans. Indexes degrade write performance (INSERT, UPDATE, DELETE) because every write must also rebalance and update the index tree, and indexes consume additional disk and buffer pool RAM.',
    example: 'Index columns used in WHERE, JOIN, and ORDER BY clauses.'
  },

  // REACT & FRONTEND
  {
    id: 'r1',
    category: 'React',
    question: 'What is the difference between `useState` and `useRef` in React 19?',
    level: 'beginner',
    answer: '`useState` holds component state that triggers a re-render when its value is updated. `useRef` holds a mutable `.current` property that persists across renders without triggering a re-render when changed, commonly used for DOM access and storing mutable values like timers.',
    example: 'const count = useState(0); // triggers re-render\nconst timerRef = useRef(null); // does not trigger re-render'
  },
  {
    id: 'r2',
    category: 'React',
    question: 'How do you prevent unnecessary re-renders of React child components?',
    level: 'intermediate',
    answer: 'Use `React.memo` to memoize component output based on shallow prop comparison, `useCallback` to cache function references passed as props, and `useMemo` to memoize expensive computations. Also keep component state localized rather than lifting it too high.',
    example: 'const memoizedCallback = useCallback(() => doSomething(a), [a]);'
  },

  // DOCKER & DEVOPS
  {
    id: 'd1',
    category: 'Docker',
    question: 'What is the difference between a Docker Image and a Docker Container?',
    level: 'beginner',
    answer: 'A Docker Image is an immutable, read-only snapshot/template with layered filesystems containing application code, runtime libraries, and config. A Docker Container is a running, isolated execution instance of an image with a thin writable container layer on top.',
    example: 'Image = Class Blueprint\nContainer = Object Instance'
  },
  {
    id: 'd2',
    category: 'DevOps',
    question: 'Explain the difference between Continuous Integration (CI) and Continuous Deployment (CD).',
    level: 'beginner',
    answer: 'CI automatically builds, lints, and executes automated test suites on every code push to catch defects early. CD takes passed CI builds and automatically packages them (e.g. into Docker containers) and deploys them to staging or production environments without manual intervention.',
    example: 'GitHub Actions workflow triggering `mvn test` -> `docker build` -> `AWS ECS deploy`.'
  },

  // AWS CLOUD
  {
    id: 'aws1',
    category: 'AWS',
    question: 'How would you architect a secure Java Full Stack application on AWS?',
    level: 'intermediate',
    answer: 'Host the React frontend as static assets in an Amazon S3 bucket served globally through Amazon CloudFront CDN. Host the Spring Boot backend on Amazon ECS (Fargate) or EC2 instances inside a Private Subnet behind an Application Load Balancer (ALB) in a Public Subnet. Place the MySQL database in an Amazon RDS Multi-AZ instance inside isolated DB subnets, with AWS Secrets Manager storing database credentials.',
    example: 'CloudFront (React) -> ALB -> ECS (Spring Boot) -> RDS (MySQL)'
  },

  // SYSTEM DESIGN
  {
    id: 'sd1',
    category: 'System Design',
    question: 'What is the CAP Theorem and how does it apply to modern distributed databases?',
    level: 'intermediate',
    answer: 'The CAP Theorem states that in a distributed data store, you can only guarantee two out of three: Consistency (every read receives the latest write), Availability (every non-failing node returns a response), and Partition Tolerance (system continues functioning despite network packet loss). Since network partitions are inevitable in real networks, distributed systems must choose between CP (e.g., MongoDB, HBase) or AP (e.g., Cassandra, DynamoDB).',
    example: 'Banking ledgers choose CP; social media feeds choose AP.'
  },
  {
    id: 'sd2',
    category: 'System Design',
    question: 'How does Redis Caching improve throughput and what cache invalidation strategies exist?',
    level: 'intermediate',
    answer: 'Redis is an in-memory key-value store providing sub-millisecond data reads, offloading repetitive database queries. Common strategies include Cache-Aside (app reads cache; if miss, reads DB and writes to cache), Write-Through (writes directly to cache and DB simultaneously), and Write-Behind (writes to cache immediately, asynchronously flushing to DB). TTL (Time-To-Live) prevents stale data.',
    example: 'Cache-Aside pattern with 10-minute TTL on user profiles.'
  }
];
