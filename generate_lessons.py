import os
import json

def make_lesson(module_key, id_, slug, title, tags, expl, visualizer=None):
    lesson = f"""  {{
    id: '{id_}',
    moduleKey: '{module_key}',
    title: '{title}',
    slug: '{slug}',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: {tags},
    explanation: '{expl}',
    beginnerExplanation: 'Beginner explanation for {title}.',
    technicalExplanation: 'Technical explanation for {title}.',
    keyPoints: ['Point 1', 'Point 2'],
    quiz: [
      {{
        id: 'q1',
        type: 'mcq',
        question: 'What is {title}?',
        options: ['A', 'B', 'C', 'D'],
        answer: 0,
        explanation: 'Explanation for {title}',
        points: 10
      }}
    ],
    practice: [
      {{
        id: 'p1',
        type: 'predict-output',
        question: 'Practice for {title}',
        answer: 'answer'
      }}
    ],
    interviewQuestions: [
      {{
        id: 'iq1',
        question: 'Interview question for {title}?',
        level: 'beginner',
        answer: 'Answer for {title}'
      }}
    ],
    xpReward: 10"""
    if visualizer:
        lesson += f",\n    visualizer: '{visualizer}'"
    lesson += "\n  }"
    return lesson

def generate_file(filename, array_name, module_key, lessons_data):
    content = f"import type {{ Lesson }} from '@/types';\n\nexport const {array_name}: Lesson[] = [\n"
    
    lessons_str = ",\n".join([make_lesson(module_key, l['id'], l['slug'], l['title'], l['tags'], l['expl'], l.get('visualizer')) for l in lessons_data])
    content += lessons_str
    content += "\n];\n"
    
    with open(f"c:\\Knowhere\\src\\data\\modules\\{filename}", "w", encoding="utf-8") as f:
        f.write(content)

# Data based on prompt and meta.ts
data = [
    {
        "filename": "springBoot.ts",
        "array_name": "SPRING_BOOT_LESSONS",
        "module_key": "spring-boot",
        "lessons": [
            {"id": "sb-intro", "slug": "intro", "title": "Spring Boot Intro", "tags": "['spring boot', 'starter']", "expl": "Spring Boot 3 / Java 25 Starters"},
            {"id": "sb-rest", "slug": "rest-controllers", "title": "REST Controllers", "tags": "['rest']", "expl": "Building RESTful endpoints", "visualizer": "rest-lifecycle"},
            {"id": "sb-jpa", "slug": "jpa", "title": "Spring Data JPA", "tags": "['jpa']", "expl": "Database access"},
            {"id": "sb-exception", "slug": "exception-handling", "title": "Exception Handling", "tags": "['exception']", "expl": "Global exception handling"}
        ]
    },
    {
        "filename": "restApi.ts",
        "array_name": "REST_API_LESSONS",
        "module_key": "rest-api",
        "lessons": [
            {"id": "rest-intro", "slug": "intro", "title": "REST Fundamentals", "tags": "['rest']", "expl": "REST architectural constraints", "visualizer": "rest-lifecycle"},
            {"id": "rest-methods", "slug": "methods", "title": "HTTP Methods", "tags": "['http']", "expl": "HTTP Methods", "visualizer": "rest-lifecycle"}
        ]
    },
    {
        "filename": "docker.ts",
        "array_name": "DOCKER_LESSONS",
        "module_key": "docker",
        "lessons": [
            {"id": "docker-intro", "slug": "intro", "title": "Docker Introduction", "tags": "['docker']", "expl": "Containers vs VMs"},
            {"id": "docker-dockerfile", "slug": "dockerfile", "title": "Dockerfiles", "tags": "['dockerfile']", "expl": "Multi-stage Java 25 Dockerfile", "visualizer": "docker-architecture"},
            {"id": "docker-compose", "slug": "compose", "title": "Docker Compose", "tags": "['compose']", "expl": "Docker Compose"}
        ]
    },
    {
        "filename": "git.ts",
        "array_name": "GIT_LESSONS",
        "module_key": "git",
        "lessons": [
            {"id": "git-basics", "slug": "basics", "title": "Git Fundamentals", "tags": "['git']", "expl": "git init, add, commit", "visualizer": "git-workflow"},
            {"id": "git-workflow", "slug": "workflow", "title": "Git Workflow", "tags": "['branching']", "expl": "git branch, merge", "visualizer": "git-workflow"}
        ]
    },
    {
        "filename": "linux.ts",
        "array_name": "LINUX_LESSONS",
        "module_key": "linux",
        "lessons": [
            {"id": "linux-basics", "slug": "basics", "title": "Linux Basics", "tags": "['linux']", "expl": "Linux directory hierarchy", "visualizer": "linux-terminal"},
            {"id": "linux-filesystem", "slug": "filesystem", "title": "Filesystem", "tags": "['filesystem']", "expl": "Permissions", "visualizer": "linux-terminal"},
            {"id": "linux-processes", "slug": "processes", "title": "Processes", "tags": "['processes']", "expl": "Process management", "visualizer": "linux-terminal"}
        ]
    },
    {
        "filename": "react.ts",
        "array_name": "REACT_LESSONS",
        "module_key": "react",
        "lessons": [
            {"id": "react-intro", "slug": "intro", "title": "React Introduction", "tags": "['react']", "expl": "React Intro", "visualizer": "react-reconciliation"},
            {"id": "react-components", "slug": "components", "title": "Components", "tags": "['react']", "expl": "Components", "visualizer": "react-reconciliation"},
            {"id": "react-state", "slug": "state", "title": "State", "tags": "['react']", "expl": "State", "visualizer": "react-reconciliation"},
            {"id": "react-effects", "slug": "effects", "title": "Effects", "tags": "['react']", "expl": "Effects", "visualizer": "react-reconciliation"},
            {"id": "react-hooks", "slug": "hooks", "title": "Hooks", "tags": "['react']", "expl": "Hooks", "visualizer": "react-reconciliation"},
            {"id": "react-router", "slug": "router", "title": "Router", "tags": "['react']", "expl": "Router", "visualizer": "react-reconciliation"}
        ]
    },
    {
        "filename": "aws.ts",
        "array_name": "AWS_LESSONS",
        "module_key": "aws",
        "lessons": [
            {"id": "aws-intro", "slug": "intro", "title": "AWS Introduction", "tags": "['aws']", "expl": "AWS Intro"},
            {"id": "aws-ec2", "slug": "ec2", "title": "EC2", "tags": "['aws']", "expl": "EC2"},
            {"id": "aws-s3", "slug": "s3", "title": "S3", "tags": "['aws']", "expl": "S3"},
            {"id": "aws-rds", "slug": "rds", "title": "RDS", "tags": "['aws']", "expl": "RDS"},
            {"id": "aws-ecs", "slug": "ecs", "title": "ECS", "tags": "['aws']", "expl": "ECS"}
        ]
    },
    {
        "filename": "testing.ts",
        "array_name": "TESTING_LESSONS",
        "module_key": "testing",
        "lessons": [
            {"id": "test-junit", "slug": "junit", "title": "JUnit", "tags": "['testing']", "expl": "JUnit"},
            {"id": "test-mockito", "slug": "mockito", "title": "Mockito", "tags": "['testing']", "expl": "Mockito"}
        ]
    },
    {
        "filename": "systemDesign.ts",
        "array_name": "SYSTEM_DESIGN_LESSONS",
        "module_key": "system-design",
        "lessons": [
            {"id": "sd-intro", "slug": "intro", "title": "System Design Basics", "tags": "['sd']", "expl": "SD Intro"},
            {"id": "sd-load-balancer", "slug": "load-balancer", "title": "Load Balancing", "tags": "['sd']", "expl": "LB"},
            {"id": "sd-database", "slug": "database", "title": "Database", "tags": "['sd']", "expl": "DB"}
        ]
    },
    {
        "filename": "security.ts",
        "array_name": "SECURITY_LESSONS",
        "module_key": "security",
        "lessons": [
            {"id": "sec-auth", "slug": "auth", "title": "Auth", "tags": "['sec']", "expl": "Auth"},
            {"id": "sec-jwt", "slug": "jwt", "title": "JWT", "tags": "['sec']", "expl": "JWT"}
        ]
    },
    {
        "filename": "html.ts",
        "array_name": "HTML_LESSONS",
        "module_key": "html",
        "lessons": [
            {"id": "html-structure", "slug": "structure", "title": "Structure", "tags": "['html']", "expl": "Structure"},
            {"id": "html-semantic", "slug": "semantic", "title": "Semantic", "tags": "['html']", "expl": "Semantic"},
            {"id": "html-forms", "slug": "forms", "title": "Forms", "tags": "['html']", "expl": "Forms"}
        ]
    },
    {
        "filename": "css.ts",
        "array_name": "CSS_LESSONS",
        "module_key": "css",
        "lessons": [
            {"id": "css-box-model", "slug": "box-model", "title": "Box Model", "tags": "['css']", "expl": "Box Model"},
            {"id": "css-flexbox", "slug": "flexbox", "title": "Flexbox", "tags": "['css']", "expl": "Flexbox"},
            {"id": "css-grid", "slug": "grid", "title": "Grid", "tags": "['css']", "expl": "Grid"},
            {"id": "css-responsive", "slug": "responsive", "title": "Responsive", "tags": "['css']", "expl": "Responsive"}
        ]
    },
    {
        "filename": "javascript.ts",
        "array_name": "JAVASCRIPT_LESSONS",
        "module_key": "javascript",
        "lessons": [
            {"id": "js-fundamentals", "slug": "fundamentals", "title": "Fundamentals", "tags": "['js']", "expl": "Fundamentals"},
            {"id": "js-functions", "slug": "functions", "title": "Functions", "tags": "['js']", "expl": "Functions"},
            {"id": "js-async", "slug": "async", "title": "Async", "tags": "['js']", "expl": "Async"},
            {"id": "js-dom", "slug": "dom", "title": "DOM", "tags": "['js']", "expl": "DOM"},
            {"id": "js-es6", "slug": "es6", "title": "ES6", "tags": "['js']", "expl": "ES6"}
        ]
    },
    {
        "filename": "networking.ts",
        "array_name": "NETWORKING_LESSONS",
        "module_key": "networking",
        "lessons": [
            {"id": "net-basics", "slug": "basics", "title": "Basics", "tags": "['net']", "expl": "Basics"}
        ]
    }
]

for d in data:
    generate_file(d['filename'], d['array_name'], d['module_key'], d['lessons'])

print("Generated files")
