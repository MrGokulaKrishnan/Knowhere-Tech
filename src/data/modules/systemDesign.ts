import type { Lesson } from '@/types';

export const SYSTEM_DESIGN_LESSONS: Lesson[] = [
  {
    id: 'sd-intro',
    moduleKey: 'system-design',
    title: 'System Design Fundamentals — Thinking at Scale',
    slug: 'intro',
    difficulty: 'intermediate',
    duration: 16,
    order: 1,
    prerequisites: [],
    tags: ['system-design', 'scalability', 'availability', 'reliability', 'latency', 'throughput'],
    explanation: 'System Design is the process of defining a system\'s architecture, components, data flow, and interfaces to satisfy specified requirements. For software engineers, it means designing scalable systems that handle millions of users reliably. This is a key skill tested in senior engineering interviews.',
    beginnerExplanation: 'System design is deciding HOW to build something before you start coding. Imagine you need to build Instagram. Where do you store billions of photos? How do you handle 10 million users logging in simultaneously? What happens if a server crashes mid-upload? System design answers all these "what if" questions before writing a single line of code. It\'s like an architect designing a building before construction begins — the foundation must support the load you\'re planning for.',
    technicalExplanation: 'Key metrics: Latency (time for one request: P50/P95/P99 percentiles), Throughput (requests per second/RPS), Availability (% uptime: 99.9%=8.7h downtime/yr, 99.99%=52min/yr), Durability (probability data survives: S3=11 nines). Scalability: Vertical (bigger machine — limited, expensive) vs Horizontal (more machines — harder but unlimited). Reliability: fault tolerance through redundancy. The fundamental trade-off: strong consistency vs high availability (CAP theorem). Back-of-envelope estimation: essential for interview sizing decisions.',
    keyPoints: [
      'Latency: Time for one request to complete — P99 means "99% of requests complete within X ms"',
      'Throughput: Requests processed per second (RPS/QPS) — system\'s capacity',
      'Availability: % of time system is operational — 99.9% = 8.7 hours downtime per year',
      'Vertical Scaling (Scale Up): Bigger CPU/RAM on same machine — quick but hits limits',
      'Horizontal Scaling (Scale Out): More instances behind a load balancer — unlimited but complex',
      'Stateless Services: Each request is independent — easy to scale horizontally',
      'Bottleneck: Single component limiting overall system performance — identify and fix first',
      'Back-of-Envelope: Estimate numbers before designing — QPS, storage, bandwidth needs'
    ],
    codeExample: `// Back-of-Envelope Estimation Example — Design a URL Shortener

// Assumptions:
// - 100M new URLs shortened per day
// - 10:1 read-to-write ratio = 1 billion reads/day
// - URLs stored for 10 years

// ─── Throughput ───────────────────────────────
const writesPerDay = 100_000_000;
const writesPerSecond = writesPerDay / (24 * 3600);  // ≈ 1,157 writes/sec

const readsPerDay = 1_000_000_000;
const readsPerSecond = readsPerDay / (24 * 3600);     // ≈ 11,574 reads/sec

// ─── Storage ──────────────────────────────────
const avgUrlSize = 500;         // bytes per URL entry
const totalUrls = 100_000_000 * 365 * 10;  // 365 billion URLs over 10 years
const storageNeeded = totalUrls * avgUrlSize;
// → 365 billion × 500 bytes ≈ 182 TB over 10 years

// ─── Bandwidth ────────────────────────────────
const readBandwidth = readsPerSecond * avgUrlSize;  // ≈ 5.6 MB/s reads
const writeBandwidth = writesPerSecond * avgUrlSize; // ≈ 0.56 MB/s writes

/*
 Decision: 
 - Database: 182TB → Use Cassandra or DynamoDB (distributed, handles large scale)
 - Cache: Reads are 10x writes → Cache hot URLs in Redis (90% cache hit rate)
 - Application Servers: 11,574 RPS → 10 servers at 1,200 RPS each
 - CDN: Serve cached redirects at edge for global low latency
*/`,
    codeLanguage: 'javascript',
    codeLines: [
      { code: 'const writesPerSecond = writesPerDay / (24 * 3600)', token: '24 * 3600', explanation: 'Convert per-day numbers to per-second: 24 hours × 3600 seconds = 86,400 seconds/day. This gives you QPS (Queries Per Second) — the key metric for sizing servers.' },
      { code: '182 TB over 10 years', token: '182 TB', explanation: 'Storage estimation guides database selection. 182TB is too large for a single SQL server (vertical limit ~tens of TB) — this means you need a distributed database like Cassandra or DynamoDB from day one.' }
    ],
    quiz: [
      {
        id: 'q-sd-1',
        type: 'mcq',
        question: 'Your Java API can handle 500 requests/second on one server. Traffic doubles to 1000 RPS. Which is the BETTER scaling approach?',
        options: [
          'Upgrade to a server with double the RAM and CPU (vertical scaling)',
          'Add a second identical server behind a load balancer (horizontal scaling)',
          'Write faster Java code to handle the load on the same server',
          'Reject 50% of incoming requests until traffic decreases'
        ],
        answer: 1,
        explanation: 'Horizontal scaling (add servers) is preferred for web applications: it\'s more flexible (add/remove as needed), has no single point of failure (if one server dies, others continue), and can scale to millions of RPS with enough servers. Vertical scaling eventually hits hardware limits and creates a single point of failure.',
        points: 20
      },
      {
        id: 'q-sd-2',
        type: 'mcq',
        question: 'What does it mean for a system to be "stateless"?',
        options: [
          'The system never stores data in a database',
          'Each request is fully self-contained — the server needs no memory of previous requests',
          'The system always returns the same response to the same URL',
          'The system has no configuration or environment variables'
        ],
        answer: 1,
        explanation: 'A stateless service stores no client state between requests. Each request contains all information needed (like a JWT token for identity). This enables horizontal scaling: any server can handle any request without shared session state. Stateful systems (storing sessions) require "sticky sessions" or shared session storage — complex and limiting.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-sd-1',
        type: 'predict-output',
        question: 'Estimate: How many requests per second does WhatsApp handle if it has 2 billion users and each sends an average of 30 messages per day?',
        answer: '2,000,000,000 users × 30 messages/day = 60,000,000,000 messages/day\n÷ 86,400 seconds/day ≈ 694,444 messages/second ≈ ~700,000 RPS\n\nThis is why WhatsApp uses Erlang (designed for millions of concurrent connections) and a highly distributed architecture. No single server can handle 700K RPS — you need thousands of servers with intelligent routing.',
        hint: 'Convert total daily messages to per-second: divide by 86,400'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sd-1',
        question: 'Walk me through how you would approach a system design interview question.',
        level: 'intermediate',
        answer: 'Follow the RESHADED framework:\n1. Requirements: Clarify functional (what it does) and non-functional (scale, latency, consistency)\n2. Estimation: Back-of-envelope for QPS, storage, bandwidth\n3. High-Level Design: Core components — client, API servers, database, cache\n4. API Design: Key endpoints and data contracts\n5. Deep Dive: Focus on the hardest parts — data model, scaling bottleneck, consistency\n6. Evaluate Trade-offs: SQL vs NoSQL, cache invalidation, consistency vs availability\n\nAlways start with requirements before jumping to solutions. Ask: "How many users? Read-heavy or write-heavy? What\'s the acceptable latency?"',
        example: '"Design Instagram" → start with: 10M DAU, 100M photos, photo upload <5s, feed load <200ms → then architecture decisions follow from these numbers'
      }
    ],
    xpReward: 60
  },
  {
    id: 'sd-load-balancer',
    moduleKey: 'system-design',
    title: 'Load Balancing, Caching & CDN',
    slug: 'load-balancer',
    difficulty: 'intermediate',
    duration: 15,
    order: 2,
    prerequisites: ['sd-intro'],
    tags: ['load-balancer', 'caching', 'redis', 'cdn', 'nginx', 'reverse-proxy', 'cache-strategies'],
    explanation: 'Load balancers distribute incoming traffic across multiple servers, while caches store frequently accessed data in fast memory to avoid expensive database queries. Together, they are the primary tools for scaling web applications from hundreds to millions of users.',
    beginnerExplanation: 'A load balancer is like a restaurant host. When customers arrive, the host doesn\'t send everyone to the same table — they distribute people evenly across available tables (servers). Caching is like a waiter remembering your regular order. Instead of going to the kitchen (database) every time, they tell you "the usual?" — much faster. CDN is like opening branches of the restaurant in every city instead of one central location — customers get served from wherever is closest.',
    technicalExplanation: 'Load balancing algorithms: Round Robin (equal distribution), Least Connections (route to least loaded server), IP Hash (same client → same server for session stickiness), Weighted (powerful servers get more traffic). Nginx/HAProxy operate at L4 (TCP) or L7 (HTTP). Cache eviction policies: LRU (Least Recently Used), LFU (Least Frequently Used), TTL (Time-to-Live expiry). Cache-aside (lazy loading): app checks cache first, loads from DB on miss, populates cache. Write-through: update cache and DB simultaneously. Redis supports: strings, hashes, lists, sorted sets, pub/sub, distributed locks.',
    keyPoints: [
      'Load Balancer: Distributes traffic across multiple servers — eliminates single point of failure',
      'Round Robin: Each server gets requests in sequence — works well for equal-capacity servers',
      'Cache-Aside: App checks Redis → on miss, fetch from DB → store in Redis → serve client',
      'TTL (Time-to-Live): Cache entries expire automatically — prevents serving stale data',
      'Cache Invalidation: Update or delete cache when underlying data changes — hardest problem',
      'CDN: Content Delivery Network — serves static assets (images, JS/CSS) from edge servers globally',
      'Redis: In-memory key-value store — used for session storage, rate limiting, pub/sub, queues',
      'Cache Hit Rate: % of requests served from cache — 90%+ means database is rarely needed'
    ],
    codeExample: `// Spring Boot — Redis Caching with @Cacheable
@Service
public class ProductService {

    @Autowired private ProductRepository productRepository;

    // Cache product by ID — Redis key: "products::42"
    // If cached, return from Redis without DB query
    @Cacheable(value = "products", key = "#id")
    public ProductDTO getProductById(Long id) {
        // Only runs on cache MISS — fetches from PostgreSQL
        return productRepository.findById(id)
            .map(this::toDTO)
            .orElseThrow(() -> new ProductNotFoundException(id));
    }

    // Update DB AND invalidate cache so next read gets fresh data
    @CacheEvict(value = "products", key = "#id")
    public ProductDTO updateProduct(Long id, UpdateProductRequest req) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
        product.setName(req.getName());
        product.setPrice(req.getPrice());
        return toDTO(productRepository.save(product));
    }

    // Cache all products — evict when any product changes
    @Cacheable(value = "products", key = "'all'")
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(this::toDTO).toList();
    }
}

# application.properties — Redis cache configuration
spring.cache.type=redis
spring.data.redis.host=\${REDIS_HOST:localhost}
spring.data.redis.port=6379
spring.cache.redis.time-to-live=300000   # 5 minutes TTL

# Nginx load balancer config (round-robin to 3 Spring Boot instances)
upstream spring_backend {
    server 10.0.1.10:8080;
    server 10.0.1.11:8080;
    server 10.0.1.12:8080;
    keepalive 32;     # Maintain 32 persistent connections to each backend
}

server {
    listen 80;
    server_name api.example.com;

    location /api/ {
        proxy_pass http://spring_backend;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '@Cacheable(value = "products", key = "#id")', token: '@Cacheable', explanation: 'Spring checks Redis for key "products::42" before executing the method. On cache hit, returns cached value instantly. On miss, executes method, caches the result, then returns it. Zero DB query on cache hit.' },
      { code: '@CacheEvict(value = "products", key = "#id")', token: '@CacheEvict', explanation: 'Removes the cache entry after the method runs. Ensures the next read fetches fresh data from the database. Critical: always evict or update cache when underlying data changes, or users see stale data.' },
      { code: 'spring.cache.redis.time-to-live=300000', token: 'time-to-live', explanation: 'TTL = 300,000ms = 5 minutes. Cached product data automatically expires after 5 minutes. Even without explicit eviction, stale data won\'t persist forever. Choose TTL based on how often data changes.' }
    ],
    quiz: [
      {
        id: 'q-sd-3',
        type: 'mcq',
        question: 'Your product catalog has 10,000 products, queried 1 million times/day. Most queries are for the same 100 popular products. Which caching strategy helps most?',
        options: [
          'Cache every product with a 30-day TTL',
          'Use cache-aside with a short TTL — most requests will cache hit the popular products',
          'Cache nothing — database queries are always faster than cache',
          'Pre-load all 10,000 products into cache on server startup'
        ],
        answer: 1,
        explanation: 'Cache-aside with short TTL exploits the 80/20 rule — 80% of traffic hits 20% of data. The 100 popular products will quickly populate the cache and achieve 90%+ hit rate, meaning the database only handles 10% of requests. This reduces DB load by 10x. Pre-loading all 10,000 wastes cache memory and has complex invalidation.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-sd-2',
        type: 'explain',
        question: 'What is the "cache invalidation problem" and why is it considered one of the hardest problems in computer science?',
        answer: 'Cache invalidation means knowing WHEN to remove or update cached data so users don\'t see stale information. It\'s hard because:\n1. Distributed systems: Data may be cached on multiple servers/CDN nodes simultaneously\n2. Timing: Between cache write and DB write, another request may read stale data\n3. Dependencies: Caching a user profile may need invalidating: their posts cache, feed cache, friend list cache\n4. Race conditions: Two updates simultaneously can create split-brain (cache has version A, DB has version B)\n\nCommon strategies: TTL (auto-expire), event-driven invalidation (message queue on DB update), write-through (update cache and DB together), versioned keys (cache key includes data version number).',
        hint: 'Think about what happens when data in the database changes but the cache still has the old value.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sd-2',
        question: 'Design a rate limiter for an API that allows 100 requests per minute per user.',
        level: 'intermediate',
        answer: 'Use Redis sliding window counter:\n• Key: "rate_limit:{userId}:{current_minute}" (e.g., rate_limit:user123:20250825-1430)\n• On each request: INCR the key, SET TTL to 60 seconds on creation\n• If INCR returns > 100: reject with HTTP 429 Too Many Requests\n• Redis operations are atomic — no race conditions\n\nSpring implementation: Custom filter or @RateLimiter aspect using Bucket4j library or manual Redis INCR. Return headers: X-RateLimit-Limit: 100, X-RateLimit-Remaining: 45, X-RateLimit-Reset: 1724578200',
        example: 'Redis keys:\nrate_limit:user123:2025082514 → 45 (45 requests in this minute)\nrate_limit:user123:2025082515 → 1 (first request in new minute)'
      }
    ],
    xpReward: 65
  },
  {
    id: 'sd-database',
    moduleKey: 'system-design',
    title: 'Database Design at Scale — SQL vs NoSQL & Sharding',
    slug: 'database',
    difficulty: 'advanced',
    duration: 18,
    order: 3,
    prerequisites: ['sd-load-balancer'],
    tags: ['database-scaling', 'sharding', 'replication', 'cap-theorem', 'nosql', 'acid', 'consistency'],
    explanation: 'Choosing and scaling the right database is often the most critical system design decision. Understanding SQL vs NoSQL trade-offs, the CAP theorem, replication, and sharding is essential for designing systems that handle terabytes of data with sub-100ms query times.',
    beginnerExplanation: 'A single database server can handle a limited number of queries per second. When your app grows beyond that, you need a strategy. Replication is making backup copies — the master handles writes, copies go to replicas which handle reads (like having one original + photocopies for reference). Sharding is splitting data across multiple databases — user IDs 1-10M on DB1, 10M-20M on DB2 (like splitting a phone book into A-M and N-Z volumes).',
    technicalExplanation: 'CAP Theorem: A distributed system can guarantee at most 2 of 3: Consistency (all nodes see same data), Availability (system always responds), Partition Tolerance (survives network splits). CA (RDBMS: MySQL), CP (MongoDB, HBase), AP (Cassandra, DynamoDB). PACELC extends CAP: even without partitions, there\'s a latency-consistency trade-off. Read Replicas: asynchronous replication for read scaling (replication lag = eventual consistency). Sharding: horizontal partitioning by shard key (user_id modulo N). Consistent hashing prevents re-sharding all data when adding nodes.',
    keyPoints: [
      'CAP Theorem: Choose 2 of 3 in a distributed system — Consistency, Availability, Partition Tolerance',
      'SQL (PostgreSQL/MySQL): ACID transactions, JOINs, complex queries — vertical scale limit',
      'NoSQL (MongoDB/DynamoDB/Cassandra): Flexible schema, horizontal scale, eventual consistency',
      'Read Replica: Async copy of primary DB — handles read traffic, eventual consistency',
      'Sharding (Horizontal Partitioning): Split data across multiple DB instances by shard key',
      'Shard Key: Field used to distribute data — must have high cardinality and even distribution',
      'Consistent Hashing: Add/remove shards without remapping all data',
      'Database Index: Data structure speeding up queries at cost of write overhead'
    ],
    codeExample: `// Sharding Strategy in Spring Boot
@Service
public class UserShardingService {

    // 4 PostgreSQL shards
    private static final int NUM_SHARDS = 4;
    private final Map<Integer, DataSource> shards;

    // Determine which shard a user belongs to
    public DataSource getShardForUser(Long userId) {
        int shardIndex = (int) (userId % NUM_SHARDS);
        return shards.get(shardIndex);
    }

    // User 1001 → shard 1 (1001 % 4 = 1)
    // User 1002 → shard 2 (1002 % 4 = 2)
    // User 1004 → shard 0 (1004 % 4 = 0)
    public User findUser(Long userId) {
        DataSource shard = getShardForUser(userId);
        // Execute query against the correct shard
        JdbcTemplate jdbc = new JdbcTemplate(shard);
        return jdbc.queryForObject("SELECT * FROM users WHERE id = ?",
            userRowMapper, userId);
    }
}

/* SQL vs NoSQL Decision Matrix:

   Use SQL (PostgreSQL) when:
   ✓ Data has clear relationships (JOINs needed)
   ✓ ACID transactions are critical (banking, orders)
   ✓ Complex queries with aggregations (reports)
   ✓ Schema is well-defined and stable
   ✓ Data fits vertically scaled server (<few TB)

   Use NoSQL when:
   ✓ Massive scale (>10M writes/day)
   ✓ Flexible/dynamic schema
   ✓ Key-value access pattern (no JOINs needed)
   ✓ Eventual consistency is acceptable
   ✓ Geographic distribution required

CAP Theorem Examples:
  PostgreSQL: CA — consistent & available, not partition-tolerant
  MongoDB: CP — consistent & partition-tolerant, may sacrifice availability
  Cassandra: AP — available & partition-tolerant, eventually consistent
*/`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'int shardIndex = (int) (userId % NUM_SHARDS);', token: 'userId % NUM_SHARDS', explanation: 'Modulo sharding: user_id % 4 routes to one of 4 shards. Simple but problem: adding a 5th shard requires remapping 80% of data. Consistent hashing solves this by only remapping data on the affected shard boundary.' }
    ],
    quiz: [
      {
        id: 'q-sd-4',
        type: 'mcq',
        question: 'According to the CAP theorem, what must a distributed system sacrifice during a network partition?',
        options: [
          'Performance and speed',
          'Either Consistency OR Availability — you cannot have both during a partition',
          'Durability of stored data',
          'Security and encryption'
        ],
        answer: 1,
        explanation: 'CAP theorem: during a network partition (servers can\'t communicate), you must choose: (CP) Reject requests to ensure consistency — Availability sacrificed. (AP) Serve possibly stale data to ensure availability — Consistency sacrificed. (CA) Assume no partitions — not realistic for distributed systems. Most cloud databases choose CP (MongoDB) or AP (Cassandra/DynamoDB).',
        points: 25
      },
      {
        id: 'q-sd-5',
        type: 'mcq',
        question: 'You are designing a URL shortener. The shard key options are: (A) random UUID, (B) user_id, (C) short URL code. Which is BEST and why?',
        options: [
          'A: Random UUID — ensures even distribution across shards',
          'B: user_id — keeps all URLs for a user on one shard for fast user queries',
          'C: short URL code — the key accessed most frequently during redirects',
          'Both A and C — depends on traffic pattern'
        ],
        answer: 2,
        explanation: 'For a URL shortener, the dominant operation is redirect: receive short code → look up long URL. Sharding by short code means the redirect query always hits exactly one shard without cross-shard coordination. If sharded by user_id, redirect queries need to know which user owns that code first — requiring an extra lookup.',
        points: 25
      }
    ],
    practice: [
      {
        id: 'p-sd-3',
        type: 'explain',
        question: 'When would you choose Cassandra over PostgreSQL for a high-traffic application?',
        answer: 'Choose Cassandra when:\n1. Write-heavy workload: Cassandra handles millions of writes/second with linear horizontal scaling. PostgreSQL writes are limited by single-master throughput.\n2. Time-series or append-only data: IoT sensor data, event logs, activity feeds — Cassandra\'s LSM tree excels.\n3. Geographic distribution: Multi-region active-active deployment without a single master.\n4. Predictable access patterns: If you always query by partition key (userId + date range), Cassandra is extremely fast.\n\nChoose PostgreSQL when you need JOINs, ACID transactions, complex aggregations, or have a normalized relational schema. Many companies use both: PostgreSQL for transactional data, Cassandra for time-series/activity data.',
        hint: 'Think about write throughput, data model (key-value vs relational), and consistency requirements.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sd-3',
        question: 'Design the database architecture for a social media platform with 500M users.',
        level: 'advanced',
        answer: 'Multi-database architecture:\n• User profiles/auth: PostgreSQL (relational, ACID, 500M rows manageable with read replicas)\n• Posts/timeline: Cassandra (write-heavy, time-series access by user_id + timestamp, partition tolerant)\n• User relationships (followers): Graph database or PostgreSQL with sharding by user_id\n• Media storage: S3 (not a DB — object storage for photos/videos)\n• Feed cache: Redis sorted sets (pre-computed feeds for active users, TTL 24h)\n• Search: Elasticsearch (full-text search on posts, usernames)\n• Analytics: Redshift/BigQuery (OLAP — batch processed, not real-time)\n\nSharding user data: consistent hash on user_id across 10+ PostgreSQL shards. Read replicas in multiple regions for global low latency.',
        example: 'Write tweet → PostgreSQL (metadata) + Cassandra (timeline) + Redis (fan-out to followers\' feeds) + S3 (media)'
      }
    ],
    xpReward: 80
  }
];
