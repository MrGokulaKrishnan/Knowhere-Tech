import type { Lesson } from '@/types';

export const DOCKER_LESSONS: Lesson[] = [
  {
    id: 'docker-intro',
    moduleKey: 'docker',
    title: 'Docker & Containers — Why They Exist',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['docker', 'containers', 'virtualization', 'images', 'isolation'],
    explanation: 'Docker solves the classic "it works on my machine" problem by packaging your application with all its dependencies into a standardized unit called a container. Containers run identically on any machine that has Docker installed — your laptop, a CI server, or an AWS cloud instance.',
    beginnerExplanation: 'Imagine packing for a trip in a magic suitcase. Whatever you put inside (your app, Java runtime, database config, environment variables) comes out exactly the same at the destination — regardless of whether the destination is Windows, Linux, or a cloud server. That magic suitcase is a Docker container. Without Docker, deploying an app often requires hours of manual setup on each server.',
    technicalExplanation: 'Docker uses Linux kernel features — namespaces (process/network/filesystem isolation) and cgroups (CPU/memory resource limits) — to run isolated processes called containers. Unlike VMs (Virtual Machines), containers share the host OS kernel, making them start in milliseconds and use ~10x less memory. A Docker Image is a read-only filesystem layer stack (Union FS). A Container is a running Image instance with a writable layer. Images are built from Dockerfiles and stored in registries like Docker Hub or AWS ECR.',
    keyPoints: [
      'Container vs VM: Containers share the host OS kernel (lightweight, fast); VMs have a full guest OS (heavy, slow to start)',
      'Docker Image: Read-only template (like a class blueprint) built from a Dockerfile',
      'Docker Container: Running instance of an image (like an object from a class)',
      'Docker Registry: Storage for images (Docker Hub is public; AWS ECR, GitHub Packages are private)',
      'docker run: Pulls image if needed and starts a new container from it',
      'docker ps: Lists all running containers with their IDs, ports, and status'
    ],
    codeExample: `# Pull and run an official image instantly
docker run hello-world

# Run a PostgreSQL container (detached, named, with env vars)
docker run -d \\
  --name postgres-dev \\
  -e POSTGRES_PASSWORD=secret \\
  -e POSTGRES_DB=myapp \\
  -p 5432:5432 \\
  postgres:16

# List running containers
docker ps

# Stop and remove a container
docker stop postgres-dev
docker rm postgres-dev

# See all images downloaded locally
docker images

# Remove an image
docker rmi postgres:16

# View container logs (live)
docker logs -f postgres-dev`,
    codeLanguage: 'bash',
    codeLines: [
      { code: 'docker run -d --name postgres-dev', token: '-d --name', explanation: '-d runs in detached (background) mode. --name assigns a human-readable name instead of a random ID.' },
      { code: '-p 5432:5432', token: '-p', explanation: 'Port mapping: -p <host-port>:<container-port>. Left is your machine port, right is the container\'s internal port.' },
      { code: '-e POSTGRES_PASSWORD=secret', token: '-e', explanation: '-e sets environment variables inside the container. This is how you pass secrets and config at runtime.' },
      { code: 'docker logs -f', token: 'logs -f', explanation: '-f follows/streams logs in real time — equivalent to "tail -f" for container output.' }
    ],
    quiz: [
      {
        id: 'q-docker-1',
        type: 'mcq',
        question: 'What is the key advantage of containers over Virtual Machines (VMs)?',
        options: [
          'Containers have a full guest operating system for better security',
          'Containers share the host OS kernel, making them lightweight and fast to start',
          'Containers can only run on Linux, making them more specialized',
          'Containers require more memory because they are more isolated'
        ],
        answer: 1,
        explanation: 'Containers share the host OS kernel using Linux namespaces and cgroups — they don\'t need to boot a full OS. A container starts in milliseconds and uses MBs of memory. A VM must boot an entire guest OS, taking minutes and consuming GBs.',
        points: 20
      },
      {
        id: 'q-docker-2',
        type: 'mcq',
        question: 'What does the -p 8080:80 flag mean in "docker run -p 8080:80 nginx"?',
        options: [
          'The container uses port 8080 internally and exposes port 80',
          'Port 80 on your machine maps to port 8080 inside the container',
          'Port 8080 on your machine maps to port 80 inside the container',
          'Both ports 8080 and 80 are closed for security'
        ],
        answer: 2,
        explanation: 'Port mapping format is -p HOST:CONTAINER. So -p 8080:80 means: traffic arriving at localhost:8080 on your machine is forwarded to port 80 inside the container where Nginx is listening.',
        points: 20
      },
      {
        id: 'q-docker-3',
        type: 'mcq',
        question: 'What is a Docker Image?',
        options: [
          'A running process with an isolated filesystem and network',
          'A screenshot of your application\'s UI',
          'A read-only template/blueprint used to create containers',
          'A backup of your Docker volumes'
        ],
        answer: 2,
        explanation: 'A Docker Image is an immutable read-only template built from a Dockerfile. It contains the application code, runtime, libraries, and config. When you "run" an image, Docker creates a writable container layer on top of it — the image itself never changes.',
        points: 15
      }
    ],
    practice: [
      {
        id: 'p-docker-1',
        type: 'predict-output',
        question: 'You run: docker run -d -p 3000:8080 myapp:latest\nYour Spring Boot app listens on port 8080 inside the container. Which URL do you use from your browser?',
        answer: 'http://localhost:3000 — The left side of -p is always the host machine port you access from outside.',
        hint: 'Remember: -p HOST_PORT:CONTAINER_PORT — which side do you access from your browser?'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-docker-1',
        question: 'Explain the difference between a Docker Image and a Docker Container.',
        level: 'beginner',
        answer: 'A Docker Image is a read-only template — like a class definition in Java. It contains layered filesystem snapshots with your app code, runtime (JDK), and dependencies. A Container is a running instance of that image — like an object instantiated from a class. You can run many containers from the same image simultaneously, each with its own isolated writable layer, network, and processes. Stopping a container does not affect the image.',
        example: 'Image = blueprint (static); Container = running instance (dynamic)\nLike: Java class vs object'
      }
    ],
    xpReward: 40
  },
  {
    id: 'docker-dockerfile',
    moduleKey: 'docker',
    title: 'Writing Dockerfiles for Java Applications',
    slug: 'dockerfile',
    difficulty: 'intermediate',
    duration: 15,
    order: 2,
    prerequisites: ['docker-intro'],
    tags: ['dockerfile', 'multi-stage-build', 'java', 'spring-boot', 'layers', 'optimization'],
    explanation: 'A Dockerfile is a text script of instructions that Docker executes sequentially to build an image. For Java Spring Boot apps, multi-stage builds dramatically reduce image size by using a separate build stage (with JDK) and a lean runtime stage (with JRE only), resulting in production images under 200MB.',
    beginnerExplanation: 'A Dockerfile is like a recipe for building your app\'s environment. Step 1: Start with a base ingredient (Java runtime). Step 2: Copy your code in. Step 3: Build it. Step 4: Say what command to run when someone "opens" this container. Multi-stage builds are like cooking a meal and only serving the final dish — you don\'t send guests the raw ingredients or dirty pots.',
    technicalExplanation: 'Docker builds images as stacked, cacheable read-only layers. Each instruction (FROM, RUN, COPY, etc.) creates a new layer. Layers are cached — if the instruction and its context haven\'t changed, Docker reuses the cached layer, dramatically speeding up rebuilds. Multi-stage builds use multiple FROM statements; artifacts are COPY --from=<stage> between stages. Only the final stage becomes the shipped image, keeping build tools (JDK, Maven) out of production.',
    keyPoints: [
      'FROM: Base image to start from (eclipse-temurin:25-jdk for build, eclipse-temurin:25-jre for runtime)',
      'WORKDIR: Sets the working directory inside the container for subsequent instructions',
      'COPY: Copies files from your machine into the image filesystem',
      'RUN: Executes a shell command during the image build (mvn package, apt-get install)',
      'EXPOSE: Documents which port the container listens on (does NOT actually publish the port)',
      'CMD: Default command to run when a container starts (can be overridden at runtime)',
      'Multi-stage build: Use separate build and runtime stages to minimize final image size'
    ],
    codeExample: `# Multi-stage Dockerfile for Spring Boot + Java 25
# ─── Stage 1: Build ───────────────────────────────
FROM eclipse-temurin:25-jdk-alpine AS builder
WORKDIR /app

# Copy Maven wrapper and POM first (cached layer if unchanged)
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN ./mvnw dependency:resolve -q

# Now copy source and build the JAR
COPY src ./src
RUN ./mvnw package -DskipTests -q

# ─── Stage 2: Runtime (lean) ─────────────────────
FROM eclipse-temurin:25-jre-alpine AS runtime
WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the built JAR from Stage 1
COPY --from=builder /app/target/*.jar app.jar

# Switch to non-root user
USER appuser

# Document the port
EXPOSE 8080

# Start the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    codeLanguage: 'dockerfile',
    codeLines: [
      { code: 'FROM eclipse-temurin:25-jdk-alpine AS builder', token: 'AS builder', explanation: 'Names this stage "builder" so later stages can reference it. Alpine Linux variant gives a much smaller base image (~60MB vs ~300MB for full Ubuntu).' },
      { code: 'COPY mvnw pom.xml ./', token: 'COPY mvnw pom.xml', explanation: 'Copying dependency files first before source code enables Docker layer caching — if pom.xml didn\'t change, the dependency download layer is reused on next build.' },
      { code: 'COPY --from=builder /app/target/*.jar app.jar', token: '--from=builder', explanation: 'Cross-stage copy: takes the compiled JAR from the builder stage and places it in the runtime stage. JDK, Maven, and source code are NOT included — final image stays lean.' },
      { code: 'RUN addgroup -S appgroup && adduser -S appuser', token: 'adduser', explanation: 'Security best practice: never run containers as root. Creating a dedicated non-root user limits damage if the app is compromised.' }
    ],
    visualizer: 'docker-architecture',
    quiz: [
      {
        id: 'q-docker-4',
        type: 'mcq',
        question: 'Why do multi-stage Docker builds result in smaller final images?',
        options: [
          'They compress all files with gzip automatically',
          'They use a faster internet connection to download smaller packages',
          'Build tools like JDK and Maven are only present in the build stage and excluded from the runtime image',
          'Alpine Linux images automatically delete unused files'
        ],
        answer: 2,
        explanation: 'In a multi-stage build, the final image only contains what you explicitly COPY --from=builder. Build tools like JDK (300MB), Maven, source code, and test dependencies stay in the intermediate build stage and never enter the runtime image. A JRE-only runtime image can be under 100MB.',
        points: 25
      },
      {
        id: 'q-docker-5',
        type: 'mcq',
        question: 'In a Dockerfile, what is the purpose of EXPOSE 8080?',
        options: [
          'It automatically publishes port 8080 to the host machine',
          'It documents which port the application listens on, but does NOT publish it',
          'It blocks all other ports for security',
          'It is required for the container to actually start the application'
        ],
        answer: 1,
        explanation: 'EXPOSE is documentation only — it tells other developers and tools (like docker-compose) which port the app uses, but doesn\'t actually make the port accessible. To actually publish the port, use -p 8080:8080 in "docker run" or the ports: section in docker-compose.yml.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-docker-2',
        type: 'find-bug',
        question: 'Find the issue with this Dockerfile layer ordering:\nFROM eclipse-temurin:25-jre\nWORKDIR /app\nCOPY src ./src\nCOPY pom.xml .\nRUN mvn package\nCMD ["java", "-jar", "target/app.jar"]',
        code: 'FROM eclipse-temurin:25-jre\nWORKDIR /app\nCOPY src ./src\nCOPY pom.xml .\nRUN mvn package\nCMD ["java", "-jar", "target/app.jar"]',
        answer: 'Two bugs: 1) pom.xml should be copied BEFORE src/ to enable caching of the Maven dependency download layer. 2) Using JRE (not JDK) but trying to compile with mvn — JRE cannot compile, only JDK can. Use eclipse-temurin:25-jdk for the build stage.',
        hint: 'Think about layer caching order and whether JRE has the compiler included.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-docker-2',
        question: 'What is Docker layer caching and how do you optimize a Dockerfile to take advantage of it?',
        level: 'intermediate',
        answer: 'Docker caches the result of each Dockerfile instruction as a layer. If the instruction and its inputs haven\'t changed since the last build, Docker reuses the cached layer — skipping execution. To maximize cache hits: copy dependency files (pom.xml, package.json) BEFORE copying source code, because dependencies change less frequently than source. If pom.xml hasn\'t changed, "mvn dependency:resolve" layer is reused even when you change source files, dramatically reducing build times from minutes to seconds.',
        example: '# Optimal layer order for cache efficiency:\nCOPY pom.xml .        # Changes rarely → cached\nRUN mvn dependency:resolve  # Cached if pom unchanged\nCOPY src ./src         # Changes often → cache invalidates here\nRUN mvn package'
      }
    ],
    xpReward: 60
  },
  {
    id: 'docker-compose',
    moduleKey: 'docker',
    title: 'Docker Compose — Multi-Container Applications',
    slug: 'compose',
    difficulty: 'intermediate',
    duration: 14,
    order: 3,
    prerequisites: ['docker-dockerfile'],
    tags: ['docker-compose', 'multi-container', 'services', 'volumes', 'networks', 'spring-boot', 'postgresql'],
    explanation: 'Docker Compose is a tool for defining and running multi-container applications using a single docker-compose.yml file. With one command (docker compose up), you can start your entire stack: Spring Boot API, PostgreSQL database, Redis cache, and any other services, all properly networked together.',
    beginnerExplanation: 'Running a real application requires multiple services working together: your backend code, a database, maybe a cache. Starting each one manually with separate docker run commands is tedious and error-prone. Docker Compose lets you describe your entire application in one YAML file, then start everything with one command. It\'s like a director\'s script for your application\'s services.',
    technicalExplanation: 'Docker Compose creates an isolated network for your services and sets up DNS-based service discovery — containers reference each other by service name (e.g., "postgres", "redis") instead of IP addresses. Volumes mount host directories or named volumes into containers for data persistence. Environment variables from .env files configure services. depends_on controls startup order. Health checks verify services are ready before dependent services start.',
    keyPoints: [
      'services: Defines each container/application in your stack (backend, db, cache)',
      'volumes: Persists data outside the container lifecycle — data survives container restarts',
      'networks: Isolated virtual network; containers communicate by service name',
      'environment: Sets env vars inside containers (DB credentials, app config)',
      'depends_on: Ensures services start in order (db starts before backend)',
      'docker compose up -d: Starts all services in detached background mode',
      'docker compose down -v: Stops all services AND removes volumes (full reset)'
    ],
    codeExample: `# docker-compose.yml for Spring Boot + PostgreSQL + Redis
version: '3.9'

services:
  # ─── Spring Boot Application ─────────────────
  backend:
    build: .
    container_name: knowhere-api
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/knowhere
      - SPRING_DATASOURCE_USERNAME=admin
      - SPRING_DATASOURCE_PASSWORD=\${DB_PASSWORD}
      - SPRING_REDIS_HOST=redis
      - SPRING_REDIS_PORT=6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network

  # ─── PostgreSQL Database ──────────────────────
  postgres:
    image: postgres:16-alpine
    container_name: knowhere-db
    environment:
      - POSTGRES_DB=knowhere
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d knowhere"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  # ─── Redis Cache ──────────────────────────────
  redis:
    image: redis:7-alpine
    container_name: knowhere-cache
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge`,
    codeLanguage: 'yaml',
    codeLines: [
      { code: 'SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/knowhere', token: 'postgres:5432', explanation: '"postgres" here is the SERVICE NAME — Docker Compose provides automatic DNS so containers reference each other by service name, not IP address.' },
      { code: 'volumes:\n  - postgres-data:/var/lib/postgresql/data', token: 'postgres-data:', explanation: 'Named volume persists PostgreSQL data. Without this, all your database data is destroyed every time you run docker compose down.' },
      { code: 'condition: service_healthy', token: 'service_healthy', explanation: 'Waits for the healthcheck to pass before starting the dependent service. Prevents Spring Boot from crashing because it tried to connect before PostgreSQL was ready.' },
      { code: '- POSTGRES_PASSWORD=${DB_PASSWORD}', token: '${DB_PASSWORD}', explanation: 'References a variable from a .env file in the same directory. Never hardcode passwords — use .env files and add .env to .gitignore.' }
    ],
    quiz: [
      {
        id: 'q-docker-6',
        type: 'mcq',
        question: 'In Docker Compose, how does the Spring Boot service connect to the PostgreSQL database?',
        options: [
          'Using the PostgreSQL container\'s IP address (e.g., 172.17.0.3)',
          'Using "localhost" since they are on the same machine',
          'Using the service name defined in docker-compose.yml as the hostname (e.g., "postgres")',
          'Using an external DNS server to resolve the database address'
        ],
        answer: 2,
        explanation: 'Docker Compose creates a shared network where containers discover each other by service name. If your PostgreSQL service is named "postgres" in docker-compose.yml, the JDBC URL is "jdbc:postgresql://postgres:5432/dbname". Using localhost would only reach the container itself.',
        points: 25
      },
      {
        id: 'q-docker-7',
        type: 'mcq',
        question: 'What is the purpose of Docker volumes in docker-compose.yml?',
        options: [
          'To speed up container startup by pre-loading files',
          'To share CPU resources between containers',
          'To persist data outside the container so it survives restarts and recreation',
          'To encrypt communication between containers'
        ],
        answer: 2,
        explanation: 'Without volumes, all data inside a container is lost when it stops (containers are ephemeral). Named volumes store data on the host machine outside the container lifecycle. When you "docker compose up" again, PostgreSQL finds its existing data in the volume and picks up where it left off.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-docker-3',
        type: 'predict-output',
        question: 'You run "docker compose down" after inserting 1000 rows into PostgreSQL. Then run "docker compose up". Will the data still be there?',
        answer: 'Yes — IF you defined a named volume (e.g., postgres-data:/var/lib/postgresql/data). The volume persists on the host. However, "docker compose down -v" (with -v flag) DELETES volumes — all data lost. Always check if -v is included.',
        hint: 'Does docker-compose.yml have a named volume for PostgreSQL data?'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-docker-3',
        question: 'What is the difference between "docker compose down" and "docker compose down -v"?',
        level: 'intermediate',
        answer: '"docker compose down" stops and removes all containers and networks defined in docker-compose.yml, but preserves named volumes — your data survives. "docker compose down -v" additionally deletes all named volumes, completely wiping database data and any other persistent storage. Use "down" for routine stops, use "down -v" only when you intentionally want a fresh database slate (e.g., resetting test data).',
        example: 'Production rule: NEVER run "docker compose down -v" unless you have a backup and intend to lose all data.'
      }
    ],
    xpReward: 60
  }
];
