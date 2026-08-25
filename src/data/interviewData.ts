export interface InterviewQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  example?: string;
  code?: string;
  tags?: string[];
}

export const INTERVIEW_QUESTIONS: InterviewQ[] = [
  // JAVA CORE & JAVA 25
  {
    id: 'j1', category: 'Java', level: 'beginner',
    tags: ['java', 'core'],
    question: 'What is the difference between JDK, JRE, and JVM?',
    answer: 'JDK contains the compiler and tools. JRE contains the libraries and JVM. JVM executes bytecode, translates to native CPU instructions via JIT, and manages runtime memory.',
    example: 'JDK = JRE + Tools\nJRE = JVM + Libraries'
  },
  {
    id: 'j2', category: 'Java', level: 'advanced',
    tags: ['java', 'memory', 'jvm'],
    question: 'Explain the Java Memory Model (Heap, Stack, Metaspace).',
    answer: 'The Heap stores all objects and JRE classes and is managed by Garbage Collection. Stack stores local primitives and object references per thread. Metaspace stores class metadata, static variables, and method definitions.',
    example: 'A new thread creates a new Stack, but shares the Heap and Metaspace.'
  },
  {
    id: 'j3', category: 'Java', level: 'intermediate',
    tags: ['java', 'strings'],
    question: 'How does the String Pool work in Java?',
    answer: 'The String Pool is a special area in the Heap for storing string literals. When a string literal is created, the JVM checks the pool. If it exists, the reference is returned, saving memory.',
    code: 'String s1 = "hello";\nString s2 = "hello"; // Both point to same object in pool',
    example: 's1 == s2 is true for literals, false for new String("hello")'
  },
  {
    id: 'j4', category: 'Java', level: 'intermediate',
    tags: ['java', 'core', 'oop'],
    question: 'What is the equals() and hashCode() contract?',
    answer: 'If two objects are equal according to equals(), they must have the same hashCode(). If they have the same hashCode(), they are not necessarily equal (collisions). If equals() is overridden, hashCode() must also be overridden.',
    example: 'Used heavily in HashMap to place and find keys.'
  },
  {
    id: 'j5', category: 'Java', level: 'beginner',
    tags: ['java', 'exceptions'],
    question: 'Explain the Java Exception Hierarchy.',
    answer: 'Throwable is the root. It branches into Error (severe JVM issues like OutOfMemoryError) and Exception. Exceptions branch into RuntimeException (Unchecked) and Checked Exceptions (must be declared/caught).',
    example: 'IOException is Checked. NullPointerException is Unchecked.'
  },
  {
    id: 'j6', category: 'Java', level: 'advanced',
    tags: ['java', 'generics'],
    question: 'What is Generics Type Erasure?',
    answer: 'Generics are a compile-time feature. The compiler enforces type safety, then erases type parameters and replaces them with their bounds or Object, inserting casts where needed. This ensures backward compatibility with older Java versions.',
    example: 'List<String> becomes List at runtime.'
  },
  {
    id: 'j7', category: 'Java', level: 'advanced',
    tags: ['java', 'concurrency', 'java21'],
    question: 'How do Virtual Threads (Project Loom) work?',
    answer: 'Virtual Threads are lightweight M:N user-mode threads managed by the JVM rather than the OS. Blocking operations yield the carrier OS thread, allowing millions of concurrent virtual threads with near-zero memory overhead.',
    code: 'Thread.startVirtualThread(() -> doWork());'
  },
  {
    id: 'j8', category: 'Java', level: 'intermediate',
    tags: ['java', 'java21'],
    question: 'What is Pattern Matching for switch and instanceof?',
    answer: 'It reduces boilerplate by extracting the casted variable directly. Switch pattern matching allows switching over types, reducing complex if-else chains.',
    code: 'if (obj instanceof String s) { System.out.println(s.length()); }'
  },
  {
    id: 'j9', category: 'Java', level: 'advanced',
    tags: ['java', 'jvm', 'gc'],
    question: 'Explain Garbage Collection algorithms like G1 and ZGC.',
    answer: 'G1 (Garbage First) divides the heap into regions and prioritizes regions with the most garbage to minimize pause times. ZGC (Z Garbage Collector) performs all expensive work concurrently, offering sub-millisecond pauses for multi-terabyte heaps.',
    example: 'ZGC is standard for low-latency Java applications.'
  },
  {
    id: 'j10', category: 'Java', level: 'advanced',
    tags: ['java', 'jvm'],
    question: 'What is the Java ClassLoader and its delegation model?',
    answer: 'ClassLoaders load class files into memory. They follow the Delegation Model: a ClassLoader delegates a load request to its parent before attempting to load it itself. (Bootstrap -> Extension -> Application).',
    example: 'Prevents untrusted code from overriding core Java classes.'
  },

  // OOP ARCHITECTURE & SOLID
  {
    id: 'o1', category: 'OOP', level: 'beginner',
    tags: ['oop', 'solid'],
    question: 'What is the Single Responsibility Principle?',
    answer: 'A class should have one and only one reason to change, meaning it should only have one job. This promotes high cohesion.',
    example: 'A User class handles user state, not database saving.'
  },
  {
    id: 'o2', category: 'OOP', level: 'intermediate',
    tags: ['oop', 'solid'],
    question: 'What is the Open/Closed Principle?',
    answer: 'Software entities should be open for extension but closed for modification. You should be able to add new functionality without changing existing code, typically achieved via polymorphism.',
    example: 'Adding a new PaymentMethod by implementing an interface, rather than modifying the PaymentProcessor class.'
  },
  {
    id: 'o3', category: 'OOP', level: 'advanced',
    tags: ['oop', 'solid'],
    question: 'Explain the Liskov Substitution Principle.',
    answer: 'Subtypes must be substitutable for their base types without altering program correctness. A subclass must not strengthen preconditions or weaken postconditions.',
    example: 'A Square inheriting from Rectangle and breaking width/height mutators violates LSP.'
  },
  {
    id: 'o4', category: 'OOP', level: 'intermediate',
    tags: ['oop', 'solid'],
    question: 'What is the Interface Segregation Principle?',
    answer: 'Clients should not be forced to depend upon interfaces they do not use. Large interfaces should be split into smaller, more specific ones.',
    example: 'Instead of one massive IMachine interface, split into IPrinter and IScanner.'
  },
  {
    id: 'o5', category: 'OOP', level: 'advanced',
    tags: ['oop', 'solid'],
    question: 'Explain the Dependency Inversion Principle.',
    answer: 'High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details.',
    example: 'Using a Logger interface rather than a concrete FileLogger class.'
  },
  {
    id: 'o6', category: 'OOP', level: 'intermediate',
    tags: ['oop', 'java'],
    question: 'Abstract classes vs Interfaces?',
    answer: 'Abstract classes can have state (fields) and constructors, useful for sharing code. Interfaces define a contract. Java 8+ allows interfaces to have default and static methods, but they still cannot hold instance state.',
    example: 'A class can implement multiple interfaces but extend only one abstract class.'
  },
  {
    id: 'o7', category: 'OOP', level: 'intermediate',
    tags: ['oop', 'architecture'],
    question: 'Why favor Composition over Inheritance?',
    answer: 'Inheritance is a tight coupling (is-a). Composition (has-a) offers loose coupling and runtime flexibility. It avoids the fragile base class problem and deep class hierarchies.',
    example: 'A Car HAS an Engine, rather than a Car IS A Vehicle.'
  },
  {
    id: 'o8', category: 'OOP', level: 'beginner',
    tags: ['oop'],
    question: 'What are the rules and benefits of Encapsulation?',
    answer: 'Encapsulation bundles data and methods, hiding internal state via private fields and exposing a public API via methods. This protects data integrity and hides implementation details.',
    example: 'Making a balance field private and only allowing updates via deposit() and withdraw() methods.'
  },
  {
    id: 'o9', category: 'OOP', level: 'intermediate',
    tags: ['oop', 'functional'],
    question: 'What are the benefits of Immutability?',
    answer: 'Immutable objects cannot change state after creation. They are inherently thread-safe, eliminate side-effects, and are ideal for caching and hash keys.',
    example: 'Java Strings and Records are immutable.'
  },
  {
    id: 'o10', category: 'OOP', level: 'beginner',
    tags: ['oop'],
    question: 'Compile-time vs Run-time Polymorphism?',
    answer: 'Compile-time polymorphism is method overloading (same name, different params). Run-time polymorphism is method overriding (subclass redefines inherited method), resolved by late binding.',
    example: 'Overloading: print(int) vs print(String). Overriding: Animal.speak() -> Dog.speak().'
  },

  // DATA STRUCTURES & ALGORITHMS
  {
    id: 'd1', category: 'DSA', level: 'intermediate',
    tags: ['dsa', 'hashmap', 'java'],
    question: 'Explain HashMap internal working & collision resolution.',
    answer: 'HashMap uses an array of buckets. Key hashes map to bucket indices. Collisions are resolved using chaining (linked list). In Java 8+, lists exceeding 8 elements convert to Red-Black trees to optimize O(n) to O(log n).',
    example: 'Average case lookup: O(1).'
  },
  {
    id: 'd2', category: 'DSA', level: 'beginner',
    tags: ['dsa', 'arrays', 'lists'],
    question: 'ArrayList vs LinkedList?',
    answer: 'ArrayList is backed by a dynamic array (O(1) access, O(n) insert/delete). LinkedList is backed by doubly linked nodes (O(n) access, O(1) insert/delete at known points). ArrayList is preferred for CPU cache locality.',
    example: 'Use ArrayList for random access, LinkedList for frequent middle insertions.'
  },
  {
    id: 'd3', category: 'DSA', level: 'advanced',
    tags: ['dsa', 'trees'],
    question: 'BST vs Balanced Trees (AVL, Red-Black)?',
    answer: 'A standard Binary Search Tree can degrade to O(n) if unbalanced (linked list). AVL and Red-Black trees automatically rebalance on insert/delete via rotations to guarantee O(log n) height.',
    example: 'Java TreeMap uses a Red-Black Tree.'
  },
  {
    id: 'd4', category: 'DSA', level: 'intermediate',
    tags: ['dsa', 'sorting'],
    question: 'QuickSort vs MergeSort?',
    answer: 'QuickSort is in-place, worst-case O(n^2), average O(n log n). MergeSort is stable, guaranteed O(n log n) but requires O(n) extra space. QuickSort is faster in practice for arrays due to cache locality.',
    example: 'Java Arrays.sort() uses Dual-Pivot Quicksort for primitives, TimSort (MergeSort variant) for objects.'
  },
  {
    id: 'd5', category: 'DSA', level: 'intermediate',
    tags: ['dsa', 'arrays'],
    question: 'Explain the Two-pointer technique.',
    answer: 'Iterating with two pointers (e.g., start and end) to search, reverse, or solve array problems in O(n) time and O(1) space, especially on sorted arrays.',
    example: 'Finding a pair with a target sum in a sorted array.'
  },
  {
    id: 'd6', category: 'DSA', level: 'intermediate',
    tags: ['dsa', 'arrays'],
    question: 'Explain the Sliding Window technique.',
    answer: 'Used for contiguous subarray or substring problems. A window (defined by left and right pointers) expands and contracts over the array to maintain a specific condition, optimizing O(n^2) brute-force to O(n).',
    example: 'Finding the longest substring without repeating characters.'
  },
  {
    id: 'd7', category: 'DSA', level: 'intermediate',
    tags: ['dsa', 'linked-list'],
    question: 'How does Floyd\'s Cycle Detection work?',
    answer: 'Uses two pointers (Tortoise and Hare) moving at different speeds (1 step and 2 steps). If they meet, there is a cycle. Reverting one to start and stepping both by 1 finds the cycle entry node.',
    example: 'O(n) time, O(1) space cycle detection in Linked Lists.'
  },
  {
    id: 'd8', category: 'DSA', level: 'intermediate',
    tags: ['dsa', 'graphs', 'trees'],
    question: 'BFS vs DFS traversal?',
    answer: 'Breadth-First Search explores layer by layer using a Queue (good for shortest path). Depth-First Search explores as deep as possible before backtracking using a Stack or recursion.',
    example: 'BFS for shortest path in unweighted graphs. DFS for topological sorting or cycle detection.'
  },
  {
    id: 'd9', category: 'DSA', level: 'advanced',
    tags: ['dsa', 'dp'],
    question: 'How to design a Dynamic Programming state transition?',
    answer: 'Identify overlapping subproblems and optimal substructure. Define the state (what represents the subproblem), formulate the recurrence relation (transition from small to large states), and establish base cases.',
    example: 'Fibonacci: dp[i] = dp[i-1] + dp[i-2]'
  },
  {
    id: 'd10', category: 'DSA', level: 'advanced',
    tags: ['dsa', 'heaps'],
    question: 'How to find Top-K elements efficiently?',
    answer: 'Use a Min-Heap of size K. Iterate over the array, push to heap, and if heap size exceeds K, pop the minimum. The remaining K elements are the largest. O(n log k) time.',
    example: 'PriorityQueue in Java.'
  },
  {
    id: 'd11', category: 'DSA', level: 'advanced',
    tags: ['dsa', 'stacks'],
    question: 'What are Monotonic Stacks and their use cases?',
    answer: 'A stack whose elements are strictly increasing or decreasing. Used to efficiently find the "next greater" or "previous smaller" element in O(n) time.',
    example: 'Daily Temperatures problem or Largest Rectangle in Histogram.'
  },
  {
    id: 'd12', category: 'DSA', level: 'intermediate',
    tags: ['dsa', 'graphs'],
    question: 'Adjacency Matrix vs Adjacency List for Graphs?',
    answer: 'Adjacency Matrix uses O(V^2) space, fast O(1) edge lookup, best for dense graphs. Adjacency List uses O(V + E) space, slower edge lookup, best for sparse graphs.',
    example: 'Adjacency List is standard for most graph traversal problems.'
  },

  // SQL & DATABASE ENGINEERING
  {
    id: 's1', category: 'SQL', level: 'beginner',
    tags: ['sql', 'joins'],
    question: 'Explain INNER, LEFT, and FULL JOIN.',
    answer: 'INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table and matching rows from the right (NULLs if missing). FULL JOIN returns all rows from both tables, with NULLs where matches are missing.',
    example: 'SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id;'
  },
  {
    id: 's2', category: 'SQL', level: 'intermediate',
    tags: ['sql', 'indexes', 'b-tree'],
    question: 'How do B-Tree Indexes optimize queries?',
    answer: 'B-Trees store indexed columns in a balanced tree structure, reducing lookup time from O(n) to O(log n). They support exact match, range queries, and sorting. However, they slow down writes (INSERT/UPDATE/DELETE).',
    example: 'Indexing a "username" column for fast login lookups.'
  },
  {
    id: 's3', category: 'SQL', level: 'advanced',
    tags: ['sql', 'indexes'],
    question: 'Clustered vs Non-Clustered Indexes?',
    answer: 'A Clustered Index determines the physical order of data rows in the table (only one per table, usually Primary Key). A Non-Clustered Index contains a copy of indexed columns and a pointer (rowid) to the actual data.',
    example: 'Primary key search uses Clustered index; foreign key search uses Non-clustered.'
  },
  {
    id: 's4', category: 'SQL', level: 'intermediate',
    tags: ['sql', 'acid'],
    question: 'What are ACID properties?',
    answer: 'Atomicity (all-or-nothing transactions), Consistency (data validity constraints maintained), Isolation (concurrent transactions don\'t interfere), Durability (committed data is permanently saved).',
    example: 'Transferring money between two accounts must be Atomic.'
  },
  {
    id: 's5', category: 'SQL', level: 'advanced',
    tags: ['sql', 'transactions'],
    question: 'Explain Database Isolation Levels and anomalies.',
    answer: 'Read Uncommitted (Dirty reads), Read Committed (Non-repeatable reads), Repeatable Read (Phantom reads), Serializable (Highest isolation, lowest concurrency, locks ranges).',
    example: 'Dirty read: reading uncommitted data from a failing transaction.'
  },
  {
    id: 's6', category: 'SQL', level: 'intermediate',
    tags: ['sql', 'design'],
    question: 'Normalization vs Denormalization?',
    answer: 'Normalization divides tables to eliminate data redundancy and anomalies (1NF, 2NF, 3NF). Denormalization intentionally adds redundancy to improve read performance by avoiding expensive joins.',
    example: 'OLTP databases are normalized; OLAP data warehouses are denormalized.'
  },
  {
    id: 's7', category: 'SQL', level: 'intermediate',
    tags: ['sql', 'performance'],
    question: 'How to optimize queries using EXPLAIN?',
    answer: 'EXPLAIN shows the query execution plan. Look for "Seq Scan" (full table scans) which indicate missing indexes, and analyze join strategies (Hash Join vs Nested Loop) and row estimation accuracy.',
    example: 'EXPLAIN ANALYZE SELECT * FROM users WHERE email = "test@test.com";'
  },
  {
    id: 's8', category: 'SQL', level: 'advanced',
    tags: ['sql', 'concurrency'],
    question: 'Optimistic vs Pessimistic Locking?',
    answer: 'Optimistic locking assumes low conflict, using a version column to check if data changed before committing. Pessimistic locking explicitly locks rows (SELECT FOR UPDATE) assuming high conflict.',
    example: 'Optimistic locking is preferred in REST APIs (using @Version in JPA).'
  },
  {
    id: 's9', category: 'SQL', level: 'beginner',
    tags: ['sql'],
    question: 'Difference between WHERE and HAVING?',
    answer: 'WHERE filters rows before aggregation. HAVING filters grouped records after the GROUP BY aggregation has been applied.',
    example: 'SELECT count(id), dept FROM users WHERE status=1 GROUP BY dept HAVING count(id) > 5;'
  },
  {
    id: 's10', category: 'SQL', level: 'intermediate',
    tags: ['sql'],
    question: 'Stored Procedures vs Functions?',
    answer: 'Stored Procedures can execute DML, perform transactions, and return multiple result sets, but cannot be used in a SELECT statement. Functions must return a value, cannot modify database state, and can be embedded in SELECTs.',
    example: 'Use functions for calculations; use procedures for batch updates.'
  },

  // SPRING BOOT & MICROSERVICES
  {
    id: 'sb1', category: 'Spring Boot', level: 'beginner',
    tags: ['spring', 'core'],
    question: 'What comprises the @SpringBootApplication annotation?',
    answer: 'It is a combination of three annotations: @Configuration (declares beans), @EnableAutoConfiguration (auto-configures beans based on classpath), and @ComponentScan (scans for components in the current and sub-packages).',
    code: '@SpringBootApplication\npublic class App { public static void main(String[] args) { SpringApplication.run(App.class, args); } }'
  },
  {
    id: 'sb2', category: 'Spring Boot', level: 'beginner',
    tags: ['spring', 'ioc', 'di'],
    question: 'IoC Container and Dependency Injection types?',
    answer: 'IoC delegates object creation to the Spring Container. DI injects dependencies via Constructor (preferred, allows immutability), Setter (optional dependencies), or Field (not recommended, hard to test).',
    example: 'Constructor injection is enforced via private final fields.'
  },
  {
    id: 'sb3', category: 'Spring Boot', level: 'intermediate',
    tags: ['spring', 'beans'],
    question: 'What are Spring Bean Scopes?',
    answer: 'Singleton (default, one instance per context), Prototype (new instance per request), Request (web: one per HTTP request), Session (web: one per HTTP session), Application (web: one per ServletContext).',
    example: 'Use Singleton for stateless services; Prototype for stateful helpers.'
  },
  {
    id: 'sb4', category: 'Spring Boot', level: 'intermediate',
    tags: ['spring', 'jpa', 'hibernate'],
    question: 'Spring Data JPA vs Hibernate?',
    answer: 'Hibernate is the ORM framework implementing the JPA specification. Spring Data JPA is an abstraction layer over JPA that provides repository interfaces and automatic query generation based on method names.',
    example: 'findByNameAndAge(String name, int age) auto-generates SQL.'
  },
  {
    id: 'sb5', category: 'Spring Boot', level: 'advanced',
    tags: ['spring', 'jpa', 'performance'],
    question: 'What is the N+1 Query problem and how to solve it?',
    answer: 'Fetching a list of N parent entities and then lazily fetching their children executes 1 initial query + N secondary queries. Solve it using JOIN FETCH in JPQL or EntityGraphs to fetch data in a single query.',
    code: '@Query("SELECT o FROM Order o JOIN FETCH o.items")'
  },
  {
    id: 'sb6', category: 'Spring Boot', level: 'advanced',
    tags: ['spring', 'transactions'],
    question: 'Explain @Transactional propagation levels.',
    answer: 'REQUIRED (default, join existing or create new), REQUIRES_NEW (suspend existing, always create new), SUPPORTS (execute in existing or non-transactionally), MANDATORY (must have existing).',
    example: 'REQUIRES_NEW is used for audit logging that must commit even if main tx rolls back.'
  },
  {
    id: 'sb7', category: 'Spring Boot', level: 'intermediate',
    tags: ['spring', 'rest', 'exceptions'],
    question: 'How to implement global exception handling?',
    answer: 'Use @ControllerAdvice or @RestControllerAdvice combined with @ExceptionHandler methods to catch specific exceptions globally and return standardized RFC 7807 ProblemDetail or custom error payloads.',
    example: '@ExceptionHandler(ResourceNotFoundException.class)'
  },
  {
    id: 'sb8', category: 'Spring Boot', level: 'advanced',
    tags: ['spring', 'security', 'jwt'],
    question: 'How does Spring Security JWT filter chain work?',
    answer: 'A custom OncePerRequestFilter extracts the JWT from the Authorization header, validates the signature, extracts user claims, and populates the SecurityContextHolder with an Authentication token to authorize the request.',
    example: 'SecurityContextHolder.getContext().setAuthentication(authToken)'
  },
  {
    id: 'sb9', category: 'Spring Boot', level: 'advanced',
    tags: ['spring', 'microservices', 'resilience'],
    question: 'Explain the Circuit Breaker pattern.',
    answer: 'Prevents cascading failures in microservices. If a downstream service fails repeatedly, the circuit trips (OPEN) and fails fast or returns fallbacks. It periodically checks (HALF_OPEN) to see if the service recovered before closing.',
    example: 'Implemented using Resilience4j.'
  },
  {
    id: 'sb10', category: 'Spring Boot', level: 'advanced',
    tags: ['spring', 'microservices', 'gateway'],
    question: 'What is the API Gateway pattern?',
    answer: 'A single entry point for all clients. It handles cross-cutting concerns like routing, rate limiting, authentication, load balancing, and CORS, forwarding requests to downstream microservices (e.g., Spring Cloud Gateway).',
    example: 'Consolidates multiple microservice URLs into one API surface.'
  },
  {
    id: 'sb11', category: 'Spring Boot', level: 'intermediate',
    tags: ['spring', 'microservices', 'discovery'],
    question: 'What is Service Discovery?',
    answer: 'Microservices register themselves with a central registry (e.g., Netflix Eureka). Other services query the registry to find the dynamic IP/ports of dependencies, enabling client-side load balancing and auto-scaling.',
    example: 'Eliminates hard-coded IPs.'
  },
  {
    id: 'sb12', category: 'Spring Boot', level: 'intermediate',
    tags: ['spring', 'ops', 'monitoring'],
    question: 'What is Spring Boot Actuator?',
    answer: 'Provides production-ready endpoints (/actuator/health, /info, /metrics) to monitor application health, thread dumps, memory usage, and integrates with Prometheus/Grafana.',
    example: 'Liveness and Readiness probes in Kubernetes.'
  },

  // REST API & WEB ARCHITECTURE
  {
    id: 'ra1', category: 'REST API', level: 'intermediate',
    tags: ['api', 'rest', 'graphql', 'grpc'],
    question: 'REST vs GraphQL vs gRPC?',
    answer: 'REST exposes multiple endpoints using standard HTTP methods. GraphQL exposes one endpoint, allowing clients to query exact data. gRPC uses HTTP/2 and Protobufs for high-speed, binary, strongly-typed RPC.',
    example: 'REST for public APIs; GraphQL for complex frontends; gRPC for internal microservices.'
  },
  {
    id: 'ra2', category: 'REST API', level: 'intermediate',
    tags: ['api', 'http'],
    question: 'What is Idempotency in HTTP methods?',
    answer: 'An idempotent method produces the same result no matter how many times it is executed. GET, PUT, DELETE, HEAD, OPTIONS are idempotent. POST and PATCH are not necessarily idempotent.',
    example: 'Deleting a resource twice yields the same final state (resource is gone).'
  },
  {
    id: 'ra3', category: 'REST API', level: 'beginner',
    tags: ['api', 'rest'],
    question: 'PUT vs PATCH?',
    answer: 'PUT replaces the entire resource; missing fields are nullified. PATCH partially updates the resource, modifying only the fields provided in the payload.',
    example: 'PUT /users/1 (full update) vs PATCH /users/1 (update email only).'
  },
  {
    id: 'ra4', category: 'REST API', level: 'beginner',
    tags: ['api', 'http'],
    question: 'HTTP Status Code categories?',
    answer: '2xx: Success (200 OK, 201 Created). 3xx: Redirection. 4xx: Client Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found). 5xx: Server Errors (500 Internal Error, 502 Bad Gateway).',
    example: 'Return 201 Created for POST, 204 No Content for DELETE.'
  },
  {
    id: 'ra5', category: 'REST API', level: 'advanced',
    tags: ['api', 'security', 'rate-limiting'],
    question: 'Rate Limiting Algorithms?',
    answer: 'Token Bucket (tokens added at fixed rate, requests consume tokens), Leaky Bucket (requests enter queue, processed at fixed rate), Fixed Window (counter per minute), Sliding Window Log/Counter (smooth window edges).',
    example: 'Used to prevent DDoS and abuse.'
  },
  {
    id: 'ra6', category: 'REST API', level: 'intermediate',
    tags: ['api', 'design'],
    question: 'API Versioning strategies?',
    answer: 'URI versioning (/v1/users), Query parameter (/users?v=1), Header versioning (Accept-Version: v1), Media Type versioning (Accept: application/vnd.company.v1+json). URI is most common and cache-friendly.',
    example: 'Stripe uses header versioning based on dates.'
  },
  {
    id: 'ra7', category: 'REST API', level: 'intermediate',
    tags: ['api', 'security', 'cors'],
    question: 'What is CORS and how does it work?',
    answer: 'Cross-Origin Resource Sharing is a browser security feature. Before cross-origin requests, browsers send an OPTIONS preflight request. The server must respond with headers (Access-Control-Allow-Origin) authorizing the origin.',
    example: 'Prevents a malicious site from making unauthorized API calls on behalf of the user.'
  },
  {
    id: 'ra8', category: 'REST API', level: 'intermediate',
    tags: ['api', 'security', 'auth'],
    question: 'Stateless vs Stateful Authentication?',
    answer: 'Stateful uses Sessions stored in server memory/DB with a Session ID cookie. Stateless uses JWTs containing signed claims; the server verifies the signature without storing state, enabling easy horizontal scaling.',
    example: 'JWTs are stateless.'
  },

  // REACT 19 & MODERN FRONTEND
  {
    id: 're1', category: 'React', level: 'advanced',
    tags: ['react', 'dom', 'fiber'],
    question: 'Virtual DOM reconciliation & Fiber architecture?',
    answer: 'React keeps an in-memory Virtual DOM. When state changes, it diffs VDOMs to compute minimal real DOM updates. React Fiber (React 16+) introduces a pauseable, priority-based rendering engine to keep the main thread responsive.',
    example: 'Fiber allows chunking render work.'
  },
  {
    id: 're2', category: 'React', level: 'intermediate',
    tags: ['react', 'hooks'],
    question: 'useState vs useEffect hook dependencies?',
    answer: 'useState holds state across renders. useEffect handles side effects. The dependency array dictates when the effect re-runs: omit to run every render, empty [] to run once on mount, or specific vars [x] to run when x changes.',
    example: 'useEffect(() => fetch(id), [id])'
  },
  {
    id: 're3', category: 'React', level: 'intermediate',
    tags: ['react', 'hooks'],
    question: 'Rules of Custom Hooks?',
    answer: 'Custom hooks must start with "use", must call other hooks, and cannot be called conditionally or inside loops. They encapsulate stateful logic for reuse across components.',
    example: 'useFetch(), useAuth()'
  },
  {
    id: 're4', category: 'React', level: 'advanced',
    tags: ['react', 'performance'],
    question: 'useMemo vs useCallback?',
    answer: 'useMemo caches a computed value to prevent expensive recalculations. useCallback caches a function reference to prevent unnecessary child component re-renders (when passed as props to React.memo components).',
    example: 'const fn = useCallback(() => {}, [deps]);'
  },
  {
    id: 're5', category: 'React', level: 'intermediate',
    tags: ['react', 'state'],
    question: 'Context API vs Redux/Zustand?',
    answer: 'Context API is great for low-frequency global state (theme, auth) but re-renders all consumers on change. Redux/Zustand provide optimized selector-based state management, preventing unnecessary re-renders for high-frequency state.',
    example: 'Zustand is boilerplate-free compared to Redux.'
  },
  {
    id: 're6', category: 'React', level: 'advanced',
    tags: ['react', 'react19', 'server-actions'],
    question: 'What are React 19 Server Actions?',
    answer: 'Server Actions allow calling server-side async functions directly from client components (like form actions), automatically handling pending states, mutations, and revalidation without writing separate API endpoints.',
    code: 'action={async (formData) => { "use server"; save(formData); }}'
  },
  {
    id: 're7', category: 'React', level: 'intermediate',
    tags: ['react', 'react19', 'suspense'],
    question: 'React Suspense and use() hook?',
    answer: 'Suspense pauses rendering while waiting for async data, showing a fallback UI. In React 19, the `use()` hook can read promises and context natively, integrating seamlessly with Suspense boundaries.',
    example: '<Suspense fallback={<Loader />}> <Profile /> </Suspense>'
  },
  {
    id: 're8', category: 'React', level: 'beginner',
    tags: ['react', 'forms'],
    question: 'Controlled vs Uncontrolled components?',
    answer: 'Controlled components have their form data managed by React state (value and onChange). Uncontrolled components maintain their own internal state, and data is accessed via refs on submit.',
    example: 'Use Controlled for dynamic validation; Uncontrolled for simple file inputs.'
  },
  {
    id: 're9', category: 'React', level: 'beginner',
    tags: ['react', 'patterns'],
    question: 'Higher Order Components (HOC) vs Hooks?',
    answer: 'HOCs are functions that take a component and return a new wrapped component (used in class eras). Hooks provide a cleaner, composable way to share logic without nested "wrapper hell".',
    example: 'withRouter() is a HOC. useNavigate() is a Hook.'
  },
  {
    id: 're10', category: 'React', level: 'intermediate',
    tags: ['react', 'errors'],
    question: 'What are Error Boundaries?',
    answer: 'Components that catch JavaScript errors anywhere in their child component tree during rendering, in lifecycle methods, and in constructors, rendering a fallback UI instead of crashing the whole app.',
    example: 'Implement static getDerivedStateFromError() in a class component.'
  },

  // DOCKER & CONTAINERIZATION
  {
    id: 'do1', category: 'Docker', level: 'beginner',
    tags: ['docker', 'containers'],
    question: 'Containers vs Virtual Machines?',
    answer: 'VMs abstract hardware and run full Guest OSs, making them heavy. Containers abstract the OS, sharing the host OS kernel. They are lightweight, start instantly, and use minimal memory.',
    example: 'Containers ensure "it works on my machine" applies everywhere.'
  },
  {
    id: 'do2', category: 'Docker', level: 'intermediate',
    tags: ['docker', 'build'],
    question: 'Multi-stage Docker build benefits?',
    answer: 'Multi-stage builds use multiple FROM instructions in a Dockerfile. You compile the app in a bulky builder stage (JDK) and copy only the final artifact to a minimal runtime image (JRE), drastically reducing image size and attack surface.',
    code: 'COPY --from=builder /app/target/app.jar app.jar'
  },
  {
    id: 'do3', category: 'Docker', level: 'intermediate',
    tags: ['docker', 'cache'],
    question: 'How does Docker Layer Caching work?',
    answer: 'Each Dockerfile instruction creates a layer. Docker caches layers to speed up builds. If a layer changes (e.g., source code), all subsequent layers are rebuilt. Always copy dependency manifests (pom.xml/package.json) before source code to utilize caching.',
    example: 'Downloading Maven dependencies is cached unless pom.xml changes.'
  },
  {
    id: 'do4', category: 'Docker', level: 'intermediate',
    tags: ['docker', 'networking'],
    question: 'Docker Bridge vs Host networking?',
    answer: 'Bridge (default) creates a private internal network for containers to communicate, requiring explicit port mapping to the host (-p 8080:80). Host networking removes network isolation, binding the container directly to the host\'s network interface.',
    example: 'Host network is Linux-only.'
  },
  {
    id: 'do5', category: 'Docker', level: 'intermediate',
    tags: ['docker', 'resources'],
    question: 'Container resource limits?',
    answer: 'By default, containers have no limits and can consume all host memory/CPU. You must apply limits (--memory="512m" --cpus="1.5") to prevent out-of-memory (OOM) kills affecting other containers.',
    example: 'Essential in Kubernetes to schedule Pods properly.'
  },
  {
    id: 'do6', category: 'Docker', level: 'beginner',
    tags: ['docker', 'storage'],
    question: 'Docker Volumes vs Bind Mounts?',
    answer: 'Volumes are managed by Docker in a hidden host directory, completely isolated and easy to back up. Bind Mounts map a specific absolute host path into the container, typically used for local development auto-reloading.',
    example: 'Use Volumes for database persistence.'
  },
  {
    id: 'do7', category: 'Docker', level: 'beginner',
    tags: ['docker', 'compose'],
    question: 'Docker Compose orchestration?',
    answer: 'A YAML-based tool to define and run multi-container applications locally. It orchestrates networks, volumes, environment variables, and startup dependencies automatically.',
    example: 'docker-compose up -d'
  },
  {
    id: 'do8', category: 'Docker', level: 'intermediate',
    tags: ['docker', 'security'],
    question: 'Image shrinking techniques?',
    answer: 'Use minimal base images like Alpine Linux or Google Distroless. Avoid installing unnecessary tools, use multi-stage builds, and combine RUN commands to reduce layer count.',
    example: 'FROM eclipse-temurin:21-jre-alpine'
  },

  // DEVOPS, CI/CD & LINUX
  {
    id: 'de1', category: 'DevOps', level: 'intermediate',
    tags: ['git'],
    question: 'Git merge vs rebase?',
    answer: 'Merge creates a new commit joining two branches, preserving history. Rebase rewrites history by moving feature branch commits to the tip of main, creating a linear, clean history without merge commits. Never rebase shared branches.',
    example: 'Rebase keeps the commit tree flat.'
  },
  {
    id: 'de2', category: 'DevOps', level: 'beginner',
    tags: ['ci-cd', 'github-actions'],
    question: 'CI/CD Pipeline Stages?',
    answer: 'Build (compile code, build Docker image), Test (Unit, Integration, Security scans), Package (Push image to registry), Deploy (Update infrastructure/servers to run the new artifact).',
    example: 'GitHub Actions uses Jobs and Steps to automate this on Push.'
  },
  {
    id: 'de3', category: 'DevOps', level: 'intermediate',
    tags: ['linux', 'processes'],
    question: 'Linux process signals (SIGTERM vs SIGKILL)?',
    answer: 'SIGTERM (15) is a polite request to terminate, allowing the app to gracefully shut down (close DB connections). SIGKILL (9) is an absolute OS-level kill that cannot be caught or ignored, terminating immediately.',
    example: 'Docker stop sends SIGTERM, waits 10s, then sends SIGKILL.'
  },
  {
    id: 'de4', category: 'DevOps', level: 'beginner',
    tags: ['linux', 'permissions'],
    question: 'File permissions in octal notation?',
    answer: 'Permissions for Owner, Group, and Others. Read=4, Write=2, Execute=1. Thus, 755 means Owner can RWE (7), Group/Others can R+E (5).',
    example: 'chmod 755 script.sh'
  },
  {
    id: 'de5', category: 'DevOps', level: 'beginner',
    tags: ['linux', 'commands'],
    question: 'grep usage?',
    answer: 'Global Regular Expression Print searches text streams or files for matching patterns.',
    example: 'grep -r "Exception" /var/logs/'
  },
  {
    id: 'de6', category: 'DevOps', level: 'beginner',
    tags: ['linux', 'commands'],
    question: 'find usage?',
    answer: 'Searches the file system for files/directories matching name, size, modification date, or type.',
    example: 'find . -name "*.log" -mtime -7'
  },
  {
    id: 'de7', category: 'DevOps', level: 'beginner',
    tags: ['linux', 'commands', 'networking'],
    question: 'netstat usage?',
    answer: 'Displays active network connections, routing tables, and listening ports to troubleshoot network issues.',
    example: 'netstat -tuln (shows all listening TCP/UDP ports)'
  },
  {
    id: 'de8', category: 'DevOps', level: 'advanced',
    tags: ['ci-cd', 'deployments'],
    question: 'Blue-Green vs Canary Deployments?',
    answer: 'Blue-Green maintains two identical environments; traffic is switched instantly from old (Blue) to new (Green). Canary rolls out the new version to a small subset of users (e.g., 5%) to monitor for errors before full rollout.',
    example: 'Zero-downtime deployment strategies.'
  },

  // AWS CLOUD ENGINEERING
  {
    id: 'aw1', category: 'AWS', level: 'beginner',
    tags: ['aws', 'compute'],
    question: 'EC2 vs ECS vs Fargate?',
    answer: 'EC2 provides raw Virtual Machines (IaaS). ECS manages Docker container deployments across EC2 nodes. Fargate is Serverless compute for ECS, running containers without provisioning underlying EC2 servers.',
    example: 'Fargate abstracts server management completely.'
  },
  {
    id: 'aw2', category: 'AWS', level: 'intermediate',
    tags: ['aws', 'storage', 's3'],
    question: 'S3 Storage Tiers?',
    answer: 'Standard (frequent access), Intelligent-Tiering (auto-moves objects), Standard-IA (Infrequent access, cheaper storage, retrieval fee), Glacier (Archival, cheap, minutes/hours to retrieve).',
    example: 'Use Standard for React assets; Glacier for backups.'
  },
  {
    id: 'aw3', category: 'AWS', level: 'intermediate',
    tags: ['aws', 'databases', 'rds'],
    question: 'RDS Read Replicas vs Multi-AZ?',
    answer: 'Read Replicas (async replication) are for read scaling, improving performance. Multi-AZ (sync replication to a standby instance in another zone) is strictly for High Availability and automated failover.',
    example: 'Multi-AZ protects against hardware failure.'
  },
  {
    id: 'aw4', category: 'AWS', level: 'intermediate',
    tags: ['aws', 'networking', 'vpc'],
    question: 'VPC Subnets (Public vs Private)?',
    answer: 'Public Subnets have a route to the Internet Gateway, assigning public IPs. Private Subnets route internet traffic via a NAT Gateway. Databases and backend APIs must live in Private subnets.',
    example: 'ALB in Public Subnet routes to EC2 in Private Subnet.'
  },
  {
    id: 'aw5', category: 'AWS', level: 'intermediate',
    tags: ['aws', 'networking', 'security'],
    question: 'Security Groups vs NACLs?',
    answer: 'Security Groups act as stateful firewalls at the instance (EC2) level (allow rules only). Network ACLs act as stateless firewalls at the Subnet level (allow and deny rules).',
    example: 'SG automatically allows return traffic.'
  },
  {
    id: 'aw6', category: 'AWS', level: 'beginner',
    tags: ['aws', 'iam', 'security'],
    question: 'IAM Least Privilege Principle?',
    answer: 'Granting users or roles the absolute minimum permissions necessary to perform their task. Use IAM Roles attached to EC2/ECS rather than hardcoding Access Keys in code.',
    example: 'Role allowing s3:PutObject on a specific bucket.'
  },
  {
    id: 'aw7', category: 'AWS', level: 'intermediate',
    tags: ['aws', 'messaging'],
    question: 'SQS vs SNS?',
    answer: 'SQS (Simple Queue Service) is a pull-based 1-to-1 message queue for decoupling workers. SNS (Simple Notification Service) is a push-based 1-to-many Pub/Sub system sending messages to multiple endpoints (Lambdas, SQS, email).',
    example: 'SNS publishes an order event; multiple SQS queues subscribe.'
  },
  {
    id: 'aw8', category: 'AWS', level: 'intermediate',
    tags: ['aws', 'networking'],
    question: 'API Gateway vs ALB?',
    answer: 'ALB (Application Load Balancer) operates at L7, routing traffic to EC2/ECS based on paths. API Gateway is highly featured, offering throttling, auth (Cognito), request validation, and direct Lambda integration.',
    example: 'ALB for standard web apps; API Gateway for Serverless APIs.'
  },

  // SYSTEM DESIGN & DISTRIBUTED SYSTEMS
  {
    id: 'sd1', category: 'System Design', level: 'beginner',
    tags: ['system-design', 'scaling'],
    question: 'Vertical vs Horizontal Scaling?',
    answer: 'Vertical scaling (Scale-up) adds more CPU/RAM to a single server (limited, has downtime). Horizontal scaling (Scale-out) adds more server instances behind a load balancer (virtually infinite, resilient).',
    example: 'Upgrading to an xlarge EC2 vs adding 5 medium EC2s.'
  },
  {
    id: 'sd2', category: 'System Design', level: 'advanced',
    tags: ['system-design', 'cap'],
    question: 'CAP Theorem tradeoffs?',
    answer: 'Consistency, Availability, Partition Tolerance. Since network partitions (P) happen, you must choose between CP (consistent, but returns errors if partitioned) or AP (always available, but might return stale data).',
    example: 'Banking needs CP. Social Media feeds use AP.'
  },
  {
    id: 'sd3', category: 'System Design', level: 'advanced',
    tags: ['system-design', 'hashing'],
    question: 'What is Consistent Hashing?',
    answer: 'A technique to distribute data evenly across a dynamic cluster of nodes. It maps both data keys and nodes to a hash ring. Adding/removing a node only remaps K/N keys, minimizing data movement compared to modulo hashing.',
    example: 'Used heavily in Cassandra and DynamoDB.'
  },
  {
    id: 'sd4', category: 'System Design', level: 'intermediate',
    tags: ['system-design', 'caching', 'redis'],
    question: 'Cache-aside pattern with Redis?',
    answer: 'App checks cache. If miss, app reads from Database, writes to Cache, and returns data. Ensures cache only holds requested data. Invalidation is handled via TTLs or on-write eviction.',
    example: 'Optimizes heavy read-heavy applications.'
  },
  {
    id: 'sd5', category: 'System Design', level: 'intermediate',
    tags: ['system-design', 'messaging'],
    question: 'Message Queues (Kafka vs RabbitMQ)?',
    answer: 'RabbitMQ is a traditional smart broker pushing to dumb consumers (complex routing, messages deleted after ack). Kafka is a dumb broker appending to a distributed log; smart consumers pull and track their own offsets (high throughput, replayable).',
    example: 'RabbitMQ for task queues; Kafka for event streaming and analytics.'
  },
  {
    id: 'sd6', category: 'System Design', level: 'advanced',
    tags: ['system-design', 'databases'],
    question: 'Database Sharding vs Partitioning?',
    answer: 'Partitioning splits a large table into smaller tables within the same database instance. Sharding splits data across completely different database servers based on a Shard Key (e.g., user_id % 4) for massive horizontal scale.',
    example: 'Sharding complicates JOINs and transactions.'
  },
  {
    id: 'sd7', category: 'System Design', level: 'advanced',
    tags: ['system-design', 'rate-limiting'],
    question: 'Rate Limiting Algorithms (Token vs Leaky Bucket)?',
    answer: 'Token Bucket replenishes tokens periodically; allows burst traffic up to bucket capacity. Leaky Bucket adds requests to a queue and processes them at a strict, constant rate, smoothing out bursts entirely.',
    example: 'Token Bucket allows brief API spikes.'
  },
  {
    id: 'sd8', category: 'System Design', level: 'advanced',
    tags: ['system-design', 'microservices', 'saga'],
    question: 'Microservices Data Consistency (Saga Pattern)?',
    answer: 'Since distributed transactions (2PC) lock and block, Sagas maintain consistency via a sequence of local transactions. If one fails, compensating transactions are executed to undo previous steps.',
    example: 'Order -> Payment -> Inventory. If Inventory fails, refund Payment.'
  },
  {
    id: 'sd9', category: 'System Design', level: 'intermediate',
    tags: ['system-design', 'load-balancing'],
    question: 'Load Balancer Strategies?',
    answer: 'Round Robin (cycles through servers), Least Connections (routes to server with fewest active requests), IP Hash (routes same IP to same server for session stickiness).',
    example: 'Least Connections is best for long-lived WebSocket connections.'
  },
  {
    id: 'sd10', category: 'System Design', level: 'intermediate',
    tags: ['system-design', 'api', 'pagination'],
    question: 'API Pagination: Offset vs Cursor?',
    answer: 'Offset uses LIMIT and OFFSET; it gets slow on deep pages (database must scan and discard rows) and causes duplicate items if data shifts. Cursor uses a unique pointer (e.g., last id); it is O(1) index lookup and resilient to data shifts.',
    example: 'Cursor is essential for real-time infinite scroll feeds.'
  },

  // TESTING & QUALITY ASSURANCE
  {
    id: 't1', category: 'Testing', level: 'beginner',
    tags: ['testing', 'types'],
    question: 'Unit vs Integration vs E2E tests?',
    answer: 'Unit: tests a single class/function in isolation using mocks (fast). Integration: tests multiple components together, involving real databases or APIs. E2E: tests entire app flow from UI to Database using browser automation (slow).',
    example: 'Testing Pyramid: Many Unit, fewer Integration, minimal E2E.'
  },
  {
    id: 't2', category: 'Testing', level: 'intermediate',
    tags: ['testing', 'junit'],
    question: 'JUnit 5 @ParameterizedTest?',
    answer: 'Allows running the same test multiple times with different inputs. Inputs can be provided via @ValueSource, @CsvSource, or @MethodSource.',
    code: '@ParameterizedTest\n@ValueSource(ints = {1, 2, 3})\nvoid test(int arg) { ... }'
  },
  {
    id: 't3', category: 'Testing', level: 'intermediate',
    tags: ['testing', 'mockito'],
    question: 'Mockito @Mock vs @Spy?',
    answer: '@Mock creates a completely dummy object where all methods return null/default unless stubbed. @Spy wraps a real object; real methods are executed unless explicitly stubbed.',
    example: 'Use @Mock for dependencies. Use @Spy for partial mocking of the class under test.'
  },
  {
    id: 't4', category: 'Testing', level: 'beginner',
    tags: ['testing', 'tdd'],
    question: 'Test Driven Development (TDD) cycle?',
    answer: 'Red-Green-Refactor. Red: Write a failing test for a new feature. Green: Write the minimal code required to pass the test. Refactor: Improve code structure while keeping tests green.',
    example: 'Ensures 100% code coverage by design.'
  },
  {
    id: 't5', category: 'Testing', level: 'intermediate',
    tags: ['testing', 'metrics'],
    question: 'Code Coverage Metrics?',
    answer: 'Line Coverage (lines executed), Branch Coverage (if/else paths executed), Method Coverage. High coverage doesn\'t guarantee bug-free code, just that the code was executed during tests.',
    example: 'JaCoCo generates coverage reports in Java.'
  },
  {
    id: 't6', category: 'Testing', level: 'advanced',
    tags: ['testing', 'testcontainers'],
    question: 'What is Testcontainers?',
    answer: 'A Java library that supports JUnit tests by spinning up lightweight, throwaway instances of common databases, message brokers, or anything that can run in a Docker container before the test runs.',
    example: 'Guarantees reliable integration tests without requiring local installed databases.'
  }
];
