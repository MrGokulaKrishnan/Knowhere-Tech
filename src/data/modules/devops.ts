import type { Lesson } from '@/types';

export const DEVOPS_LESSONS: Lesson[] = [
  {
    id: 'docker-fundamentals',
    moduleKey: 'docker',
    title: 'Docker Containerization & Docker Compose',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['docker', 'containers', 'dockerfile', 'compose', 'microservices'],
    explanation: 'Docker packages applications, their runtime dependencies, configurations, and environment into portable, isolated containers running on the host OS kernel.',
    beginnerExplanation: 'Think of shipping physical cargo: Before shipping containers existed, loading barrels, bags, and boxes on ships was chaotic and broke easily. Docker provides standard standardized digital shipping containers so your Java app and MySQL run identically on your laptop, AWS, and production servers.',
    technicalExplanation: 'Docker leverages Linux kernel namespaces (for PID, NET, IPC, MOUNT isolation) and cgroups (control groups for CPU/memory resource limits) with Union Filesystems (Overlay2) to construct lightweight, layered images from a Dockerfile.',
    keyPoints: [
      'Image: Immutable read-only layered template built from a Dockerfile',
      'Container: Running isolated process instance with a thin writable layer',
      'Multi-stage Dockerfile: Builds Java code with JDK in stage 1, copies JAR to lightweight JRE in stage 2 (cuts image from 600MB to 120MB)',
      'Docker Compose: Orchestrates multi-container networks (React + Spring Boot + MySQL + Redis)'
    ],
    codeExample: `# Multi-Stage Dockerfile for Spring Boot 3 (Java 25)
# Stage 1: Build JAR with Maven & JDK
FROM eclipse-temurin:25-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Production JRE Runtime
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    codeLanguage: 'docker',
    codeLines: [
      { code: 'FROM eclipse-temurin:25-jdk-alpine AS builder', token: 'AS builder', explanation: 'Stage 1 build environment containing heavy compiler tools.' },
      { code: 'COPY --from=builder /app/target/*.jar app.jar', token: '--from=builder', explanation: 'Extracts only the compiled binary artifact, discarding compiler and source code to minimize attack surface.' }
    ],
    visualizer: 'git-workflow',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is the primary benefit of multi-stage Docker builds?',
        options: [
          'They allow containers to run without an operating system',
          'They drastically reduce production image size by separating build tools from runtime',
          'They bypass Docker security checks',
          'They convert Java bytecode to C++'
        ],
        answer: 1,
        explanation: 'Multi-stage builds leave compiler tools in the build container, keeping the final production image small and secure.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'choose-correct',
        question: 'Which command runs a container in detached background mode mapping port 8080 to host 8080?',
        code: '',
        answer: 'docker run -d -p 8080:8080 my-app',
        hint: 'Use -d for detached mode and -p for port forwarding.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'What is the difference between a Virtual Machine (VM) and a Docker Container?',
        level: 'beginner',
        answer: 'A Virtual Machine includes a full guest operating system on top of a hypervisor, consuming gigabytes of RAM and taking minutes to boot. Docker Containers share the host OS kernel and isolate user processes via namespaces and cgroups, booting in milliseconds with negligible memory overhead.',
        example: 'Containers share kernel; VMs virtualize hardware and kernel.'
      }
    ],
    xpReward: 20
  }
];
