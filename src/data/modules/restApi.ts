import type { Lesson } from '@/types';

export const REST_API_LESSONS: Lesson[] = [
  {
    id: 'rest-intro',
    moduleKey: 'rest-api',
    title: 'REST Architecture — Designing APIs Like a Pro',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 13,
    order: 1,
    prerequisites: [],
    tags: ['rest', 'api', 'http', 'stateless', 'uniform-interface', 'json', 'spring-boot'],
    explanation: 'REST (Representational State Transfer) is an architectural style for designing web APIs that are scalable, stateless, and easy to consume. Every major tech company\'s API — GitHub, Twitter, Stripe, Google Maps — follows REST principles. Spring Boot makes building REST APIs straightforward with @RestController.',
    beginnerExplanation: 'Think of a REST API like a restaurant menu. The menu lists all available dishes (endpoints like /api/users, /api/orders). You order using a specific method — "I want to GET the menu", "I want to POST a new order", "I want to DELETE my reservation". The restaurant (server) brings back a response with the dish (JSON data) and a status code (200=success, 404=not found). You never know or care how the kitchen works inside.',
    technicalExplanation: 'REST defines 6 architectural constraints: 1) Stateless — each request contains all needed information; server stores no client session. 2) Client-Server — separation of concerns; UI and data are independent. 3) Cacheable — responses declare if they can be cached. 4) Uniform Interface — consistent resource identification via URIs, manipulation via representations, self-descriptive messages. 5) Layered System — client cannot tell if connected directly to server or load balancer. 6) Code on Demand (optional) — server can send executable code.',
    keyPoints: [
      'Resource: A noun representing a concept — /users, /orders, /products (always plural)',
      'Stateless: Server stores NO session — each request must be fully self-contained (use JWT)',
      'Uniform Interface: Use HTTP methods consistently — don\'t make your own verb-based URLs',
      'JSON: JavaScript Object Notation — the universal data format for REST APIs',
      '@RestController: Spring Boot annotation combining @Controller + @ResponseBody',
      '@GetMapping, @PostMapping, @PutMapping, @DeleteMapping: Map HTTP methods to handler methods',
      'HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error'
    ],
    codeExample: `// Spring Boot REST Controller Example
@RestController
@RequestMapping("/api/users")   // Base URL: /api/users
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users → list all users
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    // GET /api/users/{id} → get one user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());  // 404 if not found
    }

    // POST /api/users → create a new user
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserRequest req) {
        UserDTO created = userService.create(req);
        URI location = URI.create("/api/users/" + created.getId());
        return ResponseEntity.created(location).body(created);  // 201 Created
    }

    // PUT /api/users/{id} → update a user
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest req) {
        return ResponseEntity.ok(userService.update(id, req));
    }

    // DELETE /api/users/{id} → remove a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();  // 204 No Content
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '@RestController', token: '@RestController', explanation: 'Combines @Controller (registers as Spring bean) + @ResponseBody (serializes return values to JSON automatically). Every method return becomes a JSON response.' },
      { code: '@RequestMapping("/api/users")', token: '@RequestMapping', explanation: 'Sets the base URL path for all endpoints in this controller. All sub-mappings are appended: @GetMapping("/{id}") becomes GET /api/users/{id}.' },
      { code: '@PathVariable Long id', token: '@PathVariable', explanation: 'Extracts the {id} value from the URL path. GET /api/users/42 → id=42. Spring automatically converts the String to Long.' },
      { code: '@RequestBody CreateUserRequest req', token: '@RequestBody', explanation: 'Deserializes the JSON request body into a Java object automatically. Jackson library handles the JSON→Object conversion.' },
      { code: 'ResponseEntity.created(location).body(created)', token: 'ResponseEntity.created', explanation: 'Returns HTTP 201 Created with a Location header pointing to the new resource URL — the correct REST convention for successful POST requests.' }
    ],
    visualizer: 'rest-lifecycle',
    quiz: [
      {
        id: 'q-rest-1',
        type: 'mcq',
        question: 'What does "stateless" mean in the context of REST APIs?',
        options: [
          'The API never stores data in a database',
          'The server stores no client session state — each request contains all required information',
          'The API always returns the same response regardless of the request body',
          'REST APIs cannot maintain user login state'
        ],
        answer: 1,
        explanation: 'Stateless means the server never remembers previous requests. Each request must be completely self-contained — including authentication (JWT token). This enables horizontal scaling: any server instance can handle any request without needing shared session storage.',
        points: 20
      },
      {
        id: 'q-rest-2',
        type: 'mcq',
        question: 'Which REST endpoint design follows best practices for creating a new product?',
        options: [
          'GET /api/createProduct',
          'POST /api/createProduct',
          'POST /api/products',
          'POST /api/product/new'
        ],
        answer: 2,
        explanation: 'REST best practices: use nouns (not verbs) for URLs — the HTTP method IS the verb. Use plural form (/products not /product). The action (create) is implied by POST. So: POST /api/products = "create a new product".',
        points: 20
      },
      {
        id: 'q-rest-3',
        type: 'mcq',
        question: 'What HTTP status code should a REST API return when a requested resource is not found?',
        options: ['200 OK', '201 Created', '400 Bad Request', '404 Not Found'],
        answer: 3,
        explanation: '404 Not Found means the requested resource (e.g., user with ID 999) does not exist. 200=success, 201=created, 400=bad request (invalid input), 401=unauthorized, 403=forbidden, 500=server error.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-rest-1',
        type: 'choose-correct',
        question: 'Match the HTTP method to the correct CRUD operation:\nPOST → ?\nGET → ?\nPUT → ?\nDELETE → ?',
        answer: 'POST → Create (new resource)\nGET → Read (fetch resource)\nPUT → Update (replace entire resource)\nDELETE → Delete (remove resource)\n\nAlso: PATCH → Partial Update (modify specific fields only)',
        hint: 'Think of CRUD: Create, Read, Update, Delete'
      },
      {
        id: 'p-rest-2',
        type: 'find-bug',
        question: 'What\'s wrong with this REST endpoint design?\nGET /api/getUser?userId=5\nPOST /api/deleteUser\nGET /api/getAllUsers',
        code: 'GET /api/getUser?userId=5\nPOST /api/deleteUser\nGET /api/getAllUsers',
        answer: '3 violations: 1) "getUser" has a verb — should be GET /api/users/5 (noun + path param). 2) "deleteUser" uses POST — DELETE should use DELETE /api/users/{id}. 3) "getAllUsers" has a verb — should be GET /api/users (plural noun, GET implies "get all").',
        hint: 'URLs should be nouns, HTTP methods should be verbs. Never put verbs in URLs.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-rest-1',
        question: 'What is the difference between PUT and PATCH in REST APIs?',
        level: 'intermediate',
        answer: 'PUT replaces the ENTIRE resource with the provided data. If you send PUT /api/users/5 with only {"name": "Alice"}, all other fields (email, phone, etc.) become null/default — it\'s a full replacement. PATCH applies a PARTIAL update — only the fields provided are modified, others remain unchanged. Use PUT when replacing a complete resource, PATCH for updating specific fields (e.g., just the email address).',
        example: 'PUT /api/users/5 {"name":"Alice"} → replaces all fields\nPATCH /api/users/5 {"email":"new@email.com"} → only updates email'
      }
    ],
    xpReward: 50
  },
  {
    id: 'rest-methods',
    moduleKey: 'rest-api',
    title: 'HTTP Methods, Status Codes & Request/Response',
    slug: 'methods',
    difficulty: 'beginner',
    duration: 11,
    order: 2,
    prerequisites: ['rest-intro'],
    tags: ['http', 'methods', 'status-codes', 'headers', 'json', 'curl', 'postman'],
    explanation: 'HTTP (HyperText Transfer Protocol) is the foundation of all REST API communication. Every API call is an HTTP request with a method, URL, headers, and optional body — and every response has a status code, headers, and body. Understanding these deeply is fundamental to building and debugging APIs.',
    beginnerExplanation: 'HTTP is the language your browser and apps use to talk to servers. When you click "Submit" on a form, your browser sends an HTTP POST request containing your form data. The server processes it and replies with an HTTP response — either "200 OK (here\'s your data)" or "400 Bad Request (you sent invalid data)". Status codes are the server\'s way of giving you a quick summary of what happened.',
    technicalExplanation: 'HTTP/1.1 is text-based. HTTP/2 uses binary framing with multiplexing. HTTP/3 uses QUIC over UDP. Request anatomy: Method SP Request-URI SP HTTP-Version CRLF Headers CRLF Body. Response anatomy: HTTP-Version SP Status-Code SP Reason CRLF Headers CRLF Body. Idempotency: GET/PUT/DELETE are idempotent (calling N times = same as calling once). POST is NOT idempotent. Safety: GET/HEAD are "safe" — they have no side effects.',
    keyPoints: [
      'GET: Retrieve data — safe and idempotent — NEVER modify data with GET',
      'POST: Create a resource — NOT idempotent (calling twice creates two resources)',
      'PUT: Replace entire resource — idempotent',
      'PATCH: Partial update — update only specified fields',
      'DELETE: Remove a resource — idempotent',
      '2xx Success: 200 OK, 201 Created, 204 No Content',
      '4xx Client Errors: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity',
      '5xx Server Errors: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable'
    ],
    codeExample: `# Testing REST APIs with curl

# GET — retrieve all products
curl -X GET https://api.shop.com/api/products \\
  -H "Authorization: Bearer eyJhbGc..."

# POST — create a new product  
curl -X POST https://api.shop.com/api/products \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGc..." \\
  -d '{
    "name": "Java 25 Mastery Course",
    "price": 2999,
    "category": "education"
  }'

# Response: 201 Created
# {
#   "id": 42,
#   "name": "Java 25 Mastery Course",
#   "price": 2999,
#   "createdAt": "2025-08-25T10:30:00Z"
# }

# PUT — replace a product
curl -X PUT https://api.shop.com/api/products/42 \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGc..." \\
  -d '{"name": "Java 25 Mastery Course v2", "price": 3499, "category": "education"}'

# PATCH — update only the price
curl -X PATCH https://api.shop.com/api/products/42 \\
  -H "Content-Type: application/json" \\
  -d '{"price": 1999}'

# DELETE — remove a product
curl -X DELETE https://api.shop.com/api/products/42 \\
  -H "Authorization: Bearer eyJhbGc..."
# Response: 204 No Content (empty body, success)`,
    codeLanguage: 'bash',
    codeLines: [
      { code: '-H "Authorization: Bearer eyJhbGc..."', token: 'Authorization: Bearer', explanation: 'The Authorization header carries the JWT token. "Bearer" is the token scheme — the server extracts and validates the JWT to identify the requesting user.' },
      { code: '-H "Content-Type: application/json"', token: 'Content-Type', explanation: 'Tells the server what format the request body is in. Without this header, Spring Boot won\'t know to deserialize the body as JSON — you\'ll get 415 Unsupported Media Type.' },
      { code: '-d \'{"name": "...", "price": 2999}\'', token: '-d', explanation: '-d (data) sets the request body. The single quotes handle the JSON curly braces. This is sent as the HTTP request body.' }
    ],
    quiz: [
      {
        id: 'q-rest-4',
        type: 'mcq',
        question: 'A user submits a form with an invalid email address. Which HTTP status code should the server return?',
        options: ['200 OK', '404 Not Found', '400 Bad Request', '500 Internal Server Error'],
        answer: 2,
        explanation: '400 Bad Request means the client sent a request with invalid data. This is the correct response for validation failures (invalid email, missing required fields, etc.). The error response body should explain what\'s wrong so the client can fix it.',
        points: 15
      },
      {
        id: 'q-rest-5',
        type: 'mcq',
        question: 'Which HTTP method is both SAFE (no side effects) and IDEMPOTENT (same result if called multiple times)?',
        options: ['POST', 'PUT', 'GET', 'PATCH'],
        answer: 2,
        explanation: 'GET is both safe (it only reads, never modifies data) and idempotent (calling GET /api/users/5 ten times returns the same user each time). POST is neither — it creates new resources each call. PUT is idempotent but not safe (it modifies data).',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-rest-3',
        type: 'predict-output',
        question: 'Your API returns HTTP 401 when you call GET /api/users. What does this mean and how do you fix it?',
        answer: '401 Unauthorized means you are not authenticated — the request is missing or has an invalid/expired JWT token in the Authorization header. Fix: include a valid "Authorization: Bearer <valid_jwt_token>" header. Note: 401 = not authenticated (who are you?); 403 = authenticated but not allowed (I know who you are, but you can\'t do this).',
        hint: 'Think: is 401 about identity (who are you?) or permissions (what can you do?)'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-rest-2',
        question: 'Explain the difference between HTTP 401 Unauthorized and 403 Forbidden.',
        level: 'beginner',
        answer: '401 Unauthorized means the client is NOT authenticated — no valid credentials/token were provided. The solution is to log in and include a valid JWT token. 403 Forbidden means the client IS authenticated (we know who they are) but does NOT have permission to access the resource. Example: a regular user trying to access /api/admin endpoints. Despite the confusing naming, 401 = "who are you?" and 403 = "I know who you are, but you can\'t do this".',
        example: 'No token → 401 Unauthorized\nUser token accessing admin endpoint → 403 Forbidden'
      }
    ],
    xpReward: 40
  }
];
