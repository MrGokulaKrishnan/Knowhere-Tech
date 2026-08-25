import type { Lesson } from '@/types';

export const NETWORKING_LESSONS: Lesson[] = [
  {
    id: 'net-basics',
    moduleKey: 'networking',
    title: 'How the Internet Works — TCP/IP, DNS & HTTP',
    slug: 'basics',
    difficulty: 'beginner',
    duration: 14,
    order: 1,
    prerequisites: [],
    tags: ['networking', 'tcp-ip', 'dns', 'http', 'https', 'ports', 'protocols'],
    explanation: 'Every time you visit a website, open an API, or deploy a Java Spring Boot application, networks are at work. Understanding TCP/IP, DNS, HTTP/HTTPS, and ports is essential for every full-stack engineer — it determines how your backend communicates with browsers, mobile apps, and other microservices.',
    beginnerExplanation: 'The internet is like a massive postal system. Your computer is a house with an address (IP address). DNS is the address book that converts names like "google.com" into actual addresses. HTTP is the language used on the envelopes. TCP/IP is the postal service that guarantees packages (data packets) actually arrive. Ports are like apartment numbers — your house (server) has many doors (ports) for different services.',
    technicalExplanation: 'The TCP/IP model has 4 layers: Application (HTTP/HTTPS, DNS), Transport (TCP/UDP), Internet (IP, routing), and Link (Ethernet, WiFi). TCP provides reliable, ordered, error-checked delivery via a 3-way handshake (SYN → SYN-ACK → ACK). UDP is faster but unreliable (used for DNS, video streaming). DNS resolution: browser cache → OS cache → Recursive Resolver → Root NS → TLD NS → Authoritative NS → returns A record (IPv4) or AAAA record (IPv6).',
    keyPoints: [
      'IP Address: Unique numeric address for every device (IPv4: 192.168.1.1, IPv6: 2001:db8::1)',
      'DNS: Domain Name System — translates domain names to IP addresses (like a phone book)',
      'TCP: Transmission Control Protocol — reliable, ordered delivery with acknowledgments',
      'UDP: User Datagram Protocol — fast but unordered, no delivery guarantee (DNS, video)',
      'HTTP: HyperText Transfer Protocol — text-based request/response protocol for web',
      'HTTPS: HTTP + TLS/SSL — encrypted version, required for all production applications',
      'Common Ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 5432 (PostgreSQL), 3306 (MySQL), 6379 (Redis), 8080 (Spring Boot dev)'
    ],
    codeExample: `# DNS lookup — find the IP of a domain
nslookup google.com
# → Server: 8.8.8.8
# → Address: 142.250.80.46

# Check HTTP response headers
curl -I https://api.example.com/health
# → HTTP/2 200
# → content-type: application/json
# → x-response-time: 12ms

# Test if a port is open (e.g., PostgreSQL on port 5432)
nc -zv localhost 5432
# → Connection to localhost 5432 port [tcp/postgresql] succeeded!

# See all listening ports on your machine
netstat -tlnp

# Trace the route your packets take to reach google.com
traceroute google.com`,
    codeLanguage: 'bash',
    codeLines: [
      { code: 'nslookup google.com', token: 'nslookup', explanation: 'Queries DNS servers to resolve a domain name to its IP address — essential debugging tool.' },
      { code: 'curl -I https://api.example.com/health', token: 'curl -I', explanation: '-I sends a HEAD request, returning only HTTP response headers without the body — useful for checking status codes and content types.' },
      { code: 'nc -zv localhost 5432', token: 'nc -zv', explanation: 'netcat with -z (scan mode) and -v (verbose) tests if a specific port is open and accepting connections.' }
    ],
    quiz: [
      {
        id: 'q-net-1',
        type: 'mcq',
        question: 'What is the role of DNS (Domain Name System)?',
        options: [
          'Encrypts data sent between client and server',
          'Translates human-readable domain names to IP addresses',
          'Controls the speed of internet connections',
          'Assigns unique ports to each running application'
        ],
        answer: 1,
        explanation: 'DNS is the internet\'s address book — it translates "google.com" into an IP like "142.250.80.46" that routers can actually use to direct traffic. Without DNS, you\'d have to remember IP addresses for every website.',
        points: 15
      },
      {
        id: 'q-net-2',
        type: 'mcq',
        question: 'Which port does a Spring Boot application run on by default in development?',
        options: ['80', '443', '8080', '3000'],
        answer: 2,
        explanation: 'Spring Boot defaults to port 8080 for embedded Tomcat/Netty. Production deployments typically use port 443 (HTTPS) via a reverse proxy like Nginx. You can change this with "server.port=9090" in application.properties.',
        points: 10
      },
      {
        id: 'q-net-3',
        type: 'mcq',
        question: 'What is the key difference between TCP and UDP?',
        options: [
          'TCP is faster, UDP is slower',
          'TCP works over WiFi, UDP works over ethernet only',
          'TCP guarantees ordered reliable delivery, UDP is fast but has no delivery guarantee',
          'TCP is for websites, UDP is only for video games'
        ],
        answer: 2,
        explanation: 'TCP performs a 3-way handshake (SYN-SYN/ACK-ACK) and acknowledges each packet, ensuring reliability and order. UDP just fires packets without confirmation — faster but packets can drop or arrive out of order. REST APIs use TCP; DNS and live video streaming use UDP.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-net-1',
        type: 'predict-output',
        question: 'Your Spring Boot app is running on port 8080. A user types "http://localhost/api/users" in their browser. Will they reach your app?',
        answer: 'No — they will get a "connection refused" error. The browser sends to port 80 (default HTTP), but Spring Boot is listening on 8080. The correct URL is "http://localhost:8080/api/users".',
        hint: 'What port does HTTP use by default when no port is specified?'
      },
      {
        id: 'p-net-2',
        type: 'explain',
        question: 'Explain in simple terms what happens when you type "https://google.com" in your browser and press Enter (step by step).',
        answer: '1. Browser checks DNS cache for google.com IP. 2. If not found, asks DNS resolver → gets IP (142.250.x.x). 3. Browser opens TCP connection to that IP on port 443 (HTTPS). 4. TLS handshake encrypts the channel. 5. Browser sends HTTP GET request. 6. Google\'s server responds with HTML. 7. Browser renders the page.',
        hint: 'Think about DNS, TCP connection, TLS, and HTTP in that order.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-net-1',
        question: 'Explain the difference between HTTP and HTTPS.',
        level: 'beginner',
        answer: 'HTTP (HyperText Transfer Protocol) sends all data in plain text — anyone intercepting the network traffic can read it. HTTPS is HTTP with TLS (Transport Layer Security) encryption layered on top. TLS uses asymmetric key exchange (RSA/ECDH) to establish a symmetric session key, then all data is encrypted. HTTPS is mandatory for production applications that handle passwords, personal data, or payment information. Browsers show a padlock icon for HTTPS and "Not Secure" warnings for plain HTTP.',
        example: 'HTTP request: visible to anyone on the network\nHTTPS: encrypted — only the client and server can read it'
      },
      {
        id: 'iq-net-2',
        question: 'What is a port number and why do services use specific ports?',
        level: 'beginner',
        answer: 'A port is a 16-bit number (0-65535) that identifies a specific process/service on a host. Think of the IP address as the building address and the port as the apartment number. Standard ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 5432 (PostgreSQL), 3306 (MySQL), 6379 (Redis), 27017 (MongoDB), 8080 (Spring Boot). Ports 0-1023 are "well-known" ports requiring admin/root privilege to bind.',
        example: 'A server at 10.0.0.5 can run Spring Boot (8080), PostgreSQL (5432), and Redis (6379) simultaneously — different ports prevent conflicts.'
      }
    ],
    xpReward: 40
  }
];
