import type { Lesson } from '@/types';

export const SECURITY_LESSONS: Lesson[] = [
  {
    id: 'sec-auth',
    moduleKey: 'security',
    title: 'Authentication vs Authorization — Securing Spring Boot APIs',
    slug: 'auth',
    difficulty: 'intermediate',
    duration: 15,
    order: 1,
    prerequisites: [],
    tags: ['security', 'authentication', 'authorization', 'spring-security', 'roles', 'bcrypt'],
    explanation: 'Security in Spring Boot applications involves two related but distinct concepts: Authentication (proving who you are) and Authorization (determining what you\'re allowed to do). Spring Security provides a comprehensive framework for both, with filter chains, password hashing, and role-based access control.',
    beginnerExplanation: 'Authentication is like showing your ID card at the entrance of a building — "Prove you are who you claim to be." Authorization is like the security guard checking if your ID grants access to the 5th floor — "I know who you are, but are you ALLOWED here?" Every secure API needs both: verify identity, then check permissions. Without authentication, anyone can pretend to be anyone. Without authorization, every authenticated user can access everything.',
    technicalExplanation: 'Spring Security works as a chain of servlet filters wrapping your application. Every HTTP request passes through SecurityFilterChain before reaching your controllers. Key filters: UsernamePasswordAuthenticationFilter (form login), BearerTokenAuthenticationFilter (JWT). Authentication flow: extract credentials → AuthenticationManager → AuthenticationProvider → UserDetailsService → load user → validate → create Authentication object → store in SecurityContext. Authorization uses AccessDecisionManager and voter-based decisions.',
    keyPoints: [
      'Authentication: Verifying identity — "Who are you?" (login with credentials)',
      'Authorization: Verifying permissions — "What can you do?" (role-based access)',
      '@EnableWebSecurity + SecurityFilterChain: Configure Spring Security behavior',
      'BCryptPasswordEncoder: Hash passwords with adaptive cost — NEVER store plain text',
      '@PreAuthorize("hasRole(\'ADMIN\')"): Method-level authorization',
      'SecurityContext: Thread-local storage for the authenticated user during a request',
      'UserDetails + UserDetailsService: Spring Security\'s interfaces for loading user data',
      'GrantedAuthority: Represents a permission/role (ROLE_USER, ROLE_ADMIN)'
    ],
    codeExample: `// Spring Security Configuration (Spring Boot 3.x)
@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // Enables @PreAuthorize on methods
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for REST APIs
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()   // Public: login, register
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // Admin only
                .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()
                .anyRequest().authenticated()  // Everything else needs login
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt with strength 12: slow enough to prevent brute force
        return new BCryptPasswordEncoder(12);
    }
}

// Service handling registration with secure password storage
@Service
public class AuthService {
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private UserRepository userRepository;

    public User register(RegisterRequest req) {
        // NEVER store plain text passwords!
        String hashedPassword = passwordEncoder.encode(req.getPassword());

        User user = User.builder()
            .email(req.getEmail())
            .password(hashedPassword)   // Store the BCrypt hash
            .roles(Set.of("ROLE_USER"))
            .build();
        return userRepository.save(user);
    }

    public boolean verifyPassword(String rawPassword, String storedHash) {
        // BCrypt verify: hashes rawPassword and compares to stored hash
        return passwordEncoder.matches(rawPassword, storedHash);
    }
}

// Method-level security with @PreAuthorize
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping                               // Any authenticated user
    @PreAuthorize("isAuthenticated()")
    public List<UserDTO> getAllUsers() { ... }

    @DeleteMapping("/{id}")                   // Admin only
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) { ... }

    @GetMapping("/me")                        // User can only access their own data
    @PreAuthorize("authentication.principal.id == #userId")
    public UserDTO getMyProfile() { ... }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '.sessionManagement(session -> session.sessionCreationPolicy(STATELESS))', token: 'STATELESS', explanation: 'REST APIs must be stateless — no server-side HTTP sessions. Each request carries its own JWT token for authentication. This enables horizontal scaling without sticky sessions.' },
      { code: '.requestMatchers("/api/auth/**").permitAll()', token: 'permitAll()', explanation: 'Authentication endpoints (/login, /register) must be publicly accessible — you can\'t require login to login! permitAll() skips security checks for matching URLs.' },
      { code: 'return new BCryptPasswordEncoder(12);', token: 'BCryptPasswordEncoder(12)', explanation: 'BCrypt is a slow, adaptive hashing algorithm. The number 12 is the "cost factor" — BCrypt performs 2^12 = 4096 rounds. This makes brute-force attacks computationally impractical. Higher = slower but safer.' },
      { code: 'passwordEncoder.matches(rawPassword, storedHash)', token: 'passwordEncoder.matches', explanation: 'BCrypt stores the salt inside the hash string. matches() extracts the salt, hashes the raw password with it, and compares — you never see the original password.' },
      { code: '@PreAuthorize("hasRole(\'ADMIN\')")', token: '@PreAuthorize', explanation: 'Method-level security: Spring checks authorization BEFORE executing the method. If the user lacks the ADMIN role, Spring throws AccessDeniedException → 403 Forbidden response.' }
    ],
    quiz: [
      {
        id: 'q-sec-1',
        type: 'mcq',
        question: 'A user successfully logs in. They then try to access /api/admin/users but get 403 Forbidden. What does this mean?',
        options: [
          'Their login credentials were wrong — authentication failed',
          'They are authenticated but their account lacks the ADMIN role — authorization failed',
          'The server is down and cannot process the request',
          'Their session has expired and they must log in again'
        ],
        answer: 1,
        explanation: '403 Forbidden means authentication SUCCEEDED (they logged in fine) but authorization FAILED (they don\'t have the ADMIN role). If authentication failed, the response would be 401 Unauthorized. If the session expired, they\'d also get 401 when trying to use their expired token.',
        points: 20
      },
      {
        id: 'q-sec-2',
        type: 'mcq',
        question: 'Why should you NEVER store passwords as plain text in a database?',
        options: [
          'Plain text passwords take more storage space than hashed passwords',
          'Plain text is not allowed by the Java language specification',
          'If the database is breached, attackers gain all user passwords immediately — including any they reused on other sites',
          'Java cannot compare plain text strings efficiently'
        ],
        answer: 2,
        explanation: 'Database breaches happen. If passwords are stored as plain text, every user\'s password is instantly compromised — including accounts on other websites where they reused the same password. BCrypt hashes are one-way: even if attackers get the database, they can\'t reverse the hash to find the original password.',
        points: 20
      },
      {
        id: 'q-sec-3',
        type: 'mcq',
        question: 'What does BCryptPasswordEncoder.matches(rawPassword, encodedPassword) do?',
        options: [
          'Compares both strings with .equals() method',
          'Extracts the salt from encodedPassword, hashes rawPassword with it, and compares the result',
          'Decrypts the encodedPassword and compares with rawPassword',
          'Sends both passwords to a secure comparison server'
        ],
        answer: 1,
        explanation: 'BCrypt hashes include the salt embedded in the hash string. matches() extracts that salt, applies BCrypt with that salt to the raw password, and compares the resulting hash to the stored one — without ever reversing the hash. This is one-way: you can verify but never recover the original password.',
        points: 25
      }
    ],
    practice: [
      {
        id: 'p-sec-1',
        type: 'find-bug',
        question: 'Find the security vulnerabilities in this code:\npublic User login(String email, String password) {\n    User user = userRepository.findByEmail(email);\n    if (user.getPassword().equals(password)) {\n        return user;\n    }\n    throw new LoginFailedException();\n}',
        code: 'public User login(String email, String password) {\n    User user = userRepository.findByEmail(email);\n    if (user.getPassword().equals(password)) {\n        return user;\n    }\n    throw new LoginFailedException();\n}',
        answer: 'Two critical bugs:\n1. Password comparison with .equals() means passwords are stored as plain text — catastrophic security failure. Fix: passwordEncoder.matches(password, user.getPassword()).\n2. NullPointerException if email not found (user is null). Fix: use Optional.findByEmail(email).orElseThrow().',
        hint: 'How should passwords be stored? What if the user doesn\'t exist?'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sec-1',
        question: 'Explain the Spring Security filter chain and how requests flow through it.',
        level: 'intermediate',
        answer: 'Spring Security wraps your application with a chain of servlet filters. Every HTTP request flows through all filters in order before reaching your controllers. Key filters in JWT REST setup:\n1. CorsFilter — handles CORS preflight requests\n2. JwtAuthenticationFilter (custom) — extracts JWT from Authorization header, validates it, loads UserDetails, sets SecurityContext\n3. ExceptionTranslationFilter — converts Spring Security exceptions to HTTP 401/403\n4. FilterSecurityInterceptor — checks authorization rules\nIf authentication/authorization fails at any filter, the request is rejected with 401 or 403 — your controller never executes.',
        example: 'Request → [CorsFilter] → [JwtFilter] → [ExceptionFilter] → [AuthorizationFilter] → Controller'
      }
    ],
    xpReward: 65
  },
  {
    id: 'sec-jwt',
    moduleKey: 'security',
    title: 'JWT Authentication — Stateless API Security',
    slug: 'jwt',
    difficulty: 'intermediate',
    duration: 16,
    order: 2,
    prerequisites: ['sec-auth'],
    tags: ['jwt', 'json-web-token', 'spring-security', 'bearer-token', 'claims', 'signature', 'jjwt'],
    explanation: 'JSON Web Tokens (JWT) are the standard for stateless authentication in REST APIs. A JWT is a compact, self-contained token that carries the user\'s identity and claims, digitally signed so the server can verify its authenticity without database lookups.',
    beginnerExplanation: 'A JWT is like a digitally signed concert wristband. When you buy a ticket (login), the system gives you a wristband (JWT token) with your name, seat section, and VIP status printed on it. At every door (API endpoint), staff check the wristband — they verify the digital signature is authentic, read your permissions directly from it, and let you in. No need to call the box office (database) every time.',
    technicalExplanation: 'A JWT has three Base64URL-encoded parts separated by dots: Header.Payload.Signature. Header specifies algorithm (HS256, RS256). Payload contains claims: registered (iss, sub, exp, iat), public, and private claims. Signature = HMACSHA256(base64(header) + "." + base64(payload), secret). Server validation: decode header → verify algorithm → verify signature → check exp (expiration). Store in HTTP-only cookie or Authorization header (Bearer). Never store in localStorage (XSS vulnerable).',
    keyPoints: [
      'JWT Structure: Header.Payload.Signature (three Base64URL parts separated by dots)',
      'Header: Algorithm type (HS256, RS256) and token type (JWT)',
      'Payload: Claims — user ID, email, roles, expiration time (exp), issued at (iat)',
      'Signature: Cryptographic proof that the token was not tampered with',
      'Bearer Token: Sent in "Authorization: Bearer <token>" header with every request',
      'Expiration (exp): JWT tokens should expire — typically 15min to 24h for access tokens',
      'Refresh Token: Long-lived token (7 days) used to get new access tokens without re-login',
      'NEVER store sensitive data in JWT payload — it is Base64 encoded, not encrypted (anyone can decode it)'
    ],
    codeExample: `// JWT Service with JJWT library (Spring Boot)
@Service
public class JwtService {

    @Value("\${app.jwt.secret}")
    private String secretKey;

    @Value("\${app.jwt.expiration-ms:900000}")  // Default: 15 minutes
    private long expirationMs;

    // Generate a JWT token after successful login
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities()
            .stream().map(GrantedAuthority::getAuthority).toList());

        return Jwts.builder()
            .claims(claims)
            .subject(userDetails.getUsername())    // user email/username
            .issuedAt(new Date())                  // When token was created
            .expiration(new Date(System.currentTimeMillis() + expirationMs))
            .signWith(getSigningKey())              // Sign with HMAC-SHA256
            .compact();                            // Build the JWT string
    }

    // Extract the username from a JWT token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Validate token: signature valid AND not expired
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = Jwts.parser()
            .verifyWith(getSigningKey())  // Verify signature
            .build()
            .parseSignedClaims(token)
            .getPayload();
        return resolver.apply(claims);
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

// JWT Filter — runs on every HTTP request
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(
            HttpServletRequest req, HttpServletResponse res,
            FilterChain chain) throws Exception {

        String authHeader = req.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(req, res);  // No token — pass along (will fail auth later)
            return;
        }

        String jwt = authHeader.substring(7);  // Remove "Bearer " prefix
        String username = jwtService.extractUsername(jwt);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails user = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, user)) {
                var authToken = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        chain.doFilter(req, res);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '.subject(userDetails.getUsername())', token: '.subject()', explanation: 'The "sub" (subject) claim identifies the user this token belongs to — typically the email or user ID. This is extracted on every request to identify who is making the API call.' },
      { code: '.expiration(new Date(System.currentTimeMillis() + expirationMs))', token: '.expiration()', explanation: '"exp" claim specifies when this token expires. After this time, isTokenExpired() returns true and the token is rejected — user must login again or use a refresh token.' },
      { code: '.signWith(getSigningKey())', token: '.signWith()', explanation: 'Signs the token with HMAC-SHA256 using a secret key. Any modification to the payload invalidates the signature — this is how the server detects tampered tokens.' },
      { code: 'String jwt = authHeader.substring(7);', token: 'substring(7)', explanation: 'Removes the "Bearer " prefix (7 characters including the space) from the Authorization header value to get the raw JWT string: "Bearer eyJ..." → "eyJ..."' }
    ],
    quiz: [
      {
        id: 'q-sec-4',
        type: 'mcq',
        question: 'A JWT token\'s payload contains the user\'s email and roles. Is this information secure from other users?',
        options: [
          'Yes — the payload is encrypted with AES-256',
          'No — the payload is only Base64 encoded (not encrypted) and can be decoded by anyone',
          'Yes — only the server can decode JWT payloads',
          'Depends — only if the token uses RS256 instead of HS256'
        ],
        answer: 1,
        explanation: 'JWT payloads are Base64URL ENCODED, not encrypted. Anyone can decode them using online tools or atob(). This is why you should NEVER put sensitive data (passwords, credit card numbers, full PII) in JWT claims. The signature prevents TAMPERING, not reading. For encrypted JWTs, use JWE (JSON Web Encryption).',
        points: 25
      },
      {
        id: 'q-sec-5',
        type: 'mcq',
        question: 'Why do access JWT tokens have short expiration times (15 minutes) while refresh tokens last 7-30 days?',
        options: [
          'Access tokens are larger so they expire faster to save memory',
          'Short access token expiry limits damage if stolen — attacker window is small; refresh tokens enable re-authentication without password re-entry',
          'JWTs longer than 15 minutes are rejected by browser security policies',
          'Short expiry makes the API faster since tokens are validated less frequently'
        ],
        answer: 1,
        explanation: 'If an access token is stolen (via XSS or man-in-the-middle), short expiry (15 min) limits the attacker\'s window — the token becomes useless quickly. Refresh tokens (stored securely, HTTP-only cookie) can get new access tokens. If a refresh token is compromised, you can revoke it in the database.',
        points: 25
      }
    ],
    practice: [
      {
        id: 'p-sec-2',
        type: 'predict-output',
        question: 'A JWT token is: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImV4cCI6MTcyMzk4NTYwMH0.SIGNATURE\nWhat information can you read without the secret key?',
        answer: 'You can decode the header (algorithm: HS256, type: JWT) and payload (sub: user@example.com, roles: [ROLE_USER], exp: expiration timestamp) using any Base64 decoder — NO secret key needed to read. However, you CANNOT verify the signature without the secret key, so you can\'t trust the data. This is why JWT payload must not contain secrets.',
        hint: 'JWT payload is Base64 encoded, not encrypted. What can Base64 be decoded without?'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-sec-2',
        question: 'Explain the access token + refresh token pattern and why it\'s more secure than a single long-lived JWT.',
        level: 'intermediate',
        answer: 'Single long-lived JWTs (e.g., 30-day expiry) are dangerous: if stolen, the attacker has 30 days of access with no way to revoke it (JWTs are stateless). The access + refresh pattern addresses this:\n• Access Token: Short-lived (15 min), stored in memory/header. Used for API calls.\n• Refresh Token: Long-lived (7-30 days), stored in HTTP-only cookie (XSS safe). Used ONLY to get new access tokens.\nIf access token is stolen, 15-minute window limits damage. Refresh tokens can be invalidated in the database (breaking true statelessness, but enabling revocation). On logout: delete refresh token from DB — attacker\'s refresh token becomes useless.',
        example: 'Login → [access_token: 15min, refresh_token: 7 days in HTTP-only cookie]\nAccess token expires → POST /auth/refresh with cookie → new access token\nLogout → delete refresh token from DB'
      }
    ],
    xpReward: 70
  }
];
