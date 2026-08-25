import type { Lesson } from '@/types';

export const ADVANCED_JAVA_LESSONS: Lesson[] = [
  {
    id: 'adv-virtual-threads',
    moduleKey: 'advanced-java',
    title: 'Virtual Threads & Project Loom',
    slug: 'virtual-threads',
    difficulty: 'advanced',
    duration: 16,
    order: 1,
    prerequisites: ['java-intro'],
    tags: ['concurrency', 'virtual-threads', 'loom', 'java25', 'high-throughput'],
    explanation: 'Project Loom introduces lightweight user-mode Virtual Threads to the JVM. Millions of virtual threads can be spawned concurrently on minimal memory, revolutionizing high-throughput server architectures.',
    beginnerExplanation: 'Traditional platform threads are like heavy buses—you can only run a few thousand before running out of road (memory). Virtual Threads are like lightweight bicycles—you can launch 1,000,000 at once without crashing the server.',
    technicalExplanation: 'Virtual threads (M:N scheduling) are managed directly by the JVM. When a virtual thread performs blocking I/O (network socket read, JDBC database call), the JVM unmounts it from its underlying carrier ForkJoinPool OS thread, freeing the carrier to execute other virtual threads.',
    keyPoints: [
      'M:N Threading: Millions of virtual threads multiplexed across small carrier OS thread pool',
      'Blocking I/O becomes cheap: Write straightforward synchronous-style code without reactive complexity',
      'Structured Concurrency: Scope-based task management with `StructuredTaskScope`'
    ],
    codeExample: `import java.util.concurrent.Executors;

public class VirtualThreadsDemo {
    public static void main(String[] args) {
        // Launch 10,000 concurrent virtual threads
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 10_000; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    Thread.sleep(100); // Non-blocking to carrier thread!
                    if (taskId % 2500 == 0) {
                        System.out.println("Virtual Task " + taskId + " completed on: " + Thread.currentThread());
                    }
                    return taskId;
                });
            }
        } // Executor auto-joins all virtual threads upon block exit
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'Executors.newVirtualThreadPerTaskExecutor()', token: 'newVirtualThreadPerTaskExecutor', explanation: 'Creates an ExecutorService launching an unbounded number of lightweight virtual threads.' }
    ],
    quiz: [
      {
        id: 'q-adv-1',
        type: 'mcq',
        question: 'What happens to a carrier OS thread when a Virtual Thread executes a blocking socket or database call?',
        options: ['The OS thread freezes entirely', 'The virtual thread is unmounted, allowing the carrier thread to process other tasks', 'The JVM throws an IllegalThreadStateException', 'The virtual thread consumes 1MB heap stack'],
        answer: 1,
        explanation: 'The JVM unmounts blocking virtual threads from the carrier OS thread, achieving massive throughput.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-adv-1',
        type: 'predict-output',
        question: 'Are Virtual Threads managed by the OS kernel or the JVM runtime?',
        answer: 'JVM runtime',
        hint: 'Managed as user-mode threads by the JVM.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-adv-1',
        question: 'Why should you generally avoid thread pooling for Virtual Threads in Java 25?',
        level: 'advanced',
        answer: 'Platform threads are pooled because they are expensive OS resources (~1MB memory, slow instantiation). Virtual threads are so lightweight (~few hundred bytes, microsecond creation) that pooling them adds unnecessary synchronization overhead. You simply instantiate a new virtual thread per task and let it collect upon completion.',
        example: 'Use `Executors.newVirtualThreadPerTaskExecutor()` instead of a fixed thread pool.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'adv-streams',
    moduleKey: 'advanced-java',
    title: 'Streams API & Functional Data Pipelines',
    slug: 'streams',
    difficulty: 'advanced',
    duration: 15,
    order: 2,
    prerequisites: ['java-collections-streams'],
    tags: ['streams', 'lambdas', 'functional', 'collectors', 'parallel-streams'],
    explanation: 'Declarative data manipulation using Java Streams, intermediate operations (filter, map, flatMap), terminal operations (collect, reduce), and parallel stream fork-join execution.',
    beginnerExplanation: 'A Stream is an assembly line for data. Items flow through conveyor belt stations where they are filtered, transformed, and packaged into a final list.',
    technicalExplanation: 'Streams are lazy pipelines evaluated only upon invocation of a terminal operation. Stream operations leverage Spliterators and the ForkJoinPool for parallel computation across multi-core CPU architectures.',
    keyPoints: [
      'Lazy Evaluation: Intermediate operations are deferred until terminal execution',
      'Collectors: `groupingBy()`, `partitioningBy()`, `toUnmodifiableList()`',
      'Parallel Streams: `parallelStream()` splits workload across common ForkJoinPool'
    ],
    codeExample: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class StreamsDemo {
    public record Developer(String name, String tier, int salary) {}

    public static void main(String[] args) {
        List<Developer> devs = List.of(
            new Developer("Alice", "SENIOR", 140000),
            new Developer("Bob", "MID", 95000),
            new Developer("Charlie", "SENIOR", 155000),
            new Developer("Diana", "LEAD", 185000)
        );

        // Group developers by tier and calculate average salary
        Map<String, Double> avgSalaryByTier = devs.stream()
            .collect(Collectors.groupingBy(
                Developer::tier,
                Collectors.averagingInt(Developer::salary)
            ));

        System.out.println("Salary Metrics: " + avgSalaryByTier);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'Collectors.groupingBy(Developer::tier, ...)', token: 'groupingBy', explanation: 'Classifies stream elements into a Map according to tier classification.' }
    ],
    quiz: [
      {
        id: 'q-adv-2',
        type: 'mcq',
        question: 'When are intermediate operations like `.filter()` and `.map()` actually executed in a Stream pipeline?',
        options: ['Immediately as they are declared', 'When the terminal operation (e.g. .collect()) is invoked', 'During class loading', 'In a separate daemon thread'],
        answer: 1,
        explanation: 'Streams are lazy; intermediate operations produce no work until a terminal operation triggers processing.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-adv-2',
        type: 'predict-output',
        question: 'Which method transforms a Stream<List<T>> into a flattened Stream<T>?',
        answer: 'flatMap',
        hint: 'Flattens nested collections into a single stream.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-adv-2',
        question: 'What is the difference between map() and flatMap() in the Java Streams API?',
        level: 'intermediate',
        answer: 'map() takes a function transforming 1 item into 1 output item (1:1 mapping). flatMap() takes a function transforming 1 item into a Stream of 0 or more items and flattens the resulting streams into a single consolidated output stream (1:N mapping).',
        example: 'List<List<String>> -> flatMap(List::stream) -> List<String>'
      }
    ],
    xpReward: 20
  },
  {
    id: 'adv-pattern-matching',
    moduleKey: 'advanced-java',
    title: 'Pattern Matching & Modern Syntax',
    slug: 'pattern-matching',
    difficulty: 'advanced',
    duration: 14,
    order: 3,
    prerequisites: ['java-control-flow'],
    tags: ['pattern-matching', 'switch', 'records', 'sealed-classes', 'java25'],
    explanation: 'Modern Java 21/25 Pattern Matching for instanceof, exhaustive switch pattern matching, Record deconstruction patterns, and guard clauses with `when`.',
    beginnerExplanation: 'Pattern matching is like an X-ray scanner: it checks what kind of object you have, unpacks its inner contents, and validates conditions all in one single clean line.',
    technicalExplanation: 'Pattern matching compiler transforms complex type checking and casting into type-safe pattern matching bytecodes with exhaustive case validation enforced at compile time.',
    keyPoints: [
      'Instanceof Pattern Matching: `if (obj instanceof String s && s.length() > 5)`',
      'Record Patterns: `case Order(var id, Customer(var name), var total)` deconstructs nested state',
      'Guard Conditions: `case Integer i when i > 100 -> ...`'
    ],
    codeExample: `public class PatternMatchingDemo {
    public sealed interface Payment permits CardPayment, CryptoPayment {}
    public record CardPayment(String cardNumber, double amount) implements Payment {}
    public record CryptoPayment(String walletAddress, double amount, String coin) implements Payment {}

    public static String processPayment(Payment payment) {
        // Exhaustive switch pattern matching with Record deconstruction
        return switch (payment) {
            case CardPayment(var num, var amt) when amt > 5000 -> 
                "Flagged large card transaction on: " + num.substring(num.length() - 4);
            case CardPayment(var num, var amt) -> 
                "Approved card charge: $" + amt;
            case CryptoPayment(var wallet, var amt, var coin) -> 
                "Verified " + amt + " " + coin + " from " + wallet;
        };
    }

    public static void main(String[] args) {
        Payment p = new CardPayment("4532-1234-8899-7722", 120.0);
        System.out.println(processPayment(p));
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'case CardPayment(var num, var amt) when amt > 5000 ->', token: 'when', explanation: 'Record pattern deconstruction with conditional guard clause.' }
    ],
    quiz: [
      {
        id: 'q-adv-3',
        type: 'mcq',
        question: 'What keyword adds a boolean conditional guard to a pattern matching switch case in modern Java?',
        options: ['if', 'when', 'guard', 'where'],
        answer: 1,
        explanation: '`when` is the keyword used for guard conditions in pattern matching switch cases.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-adv-3',
        type: 'predict-output',
        question: 'Does a sealed interface switch statement require a default branch if all permitted subtypes are matched?',
        answer: 'No',
        hint: 'Exhaustive matching of all permitted subtypes eliminates need for default.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-adv-3',
        question: 'How do Sealed Interfaces and Pattern Matching enable Algebraic Data Types (ADTs) in Java?',
        level: 'advanced',
        answer: 'Sealed interfaces restrict which classes can implement a type (Sum Type), while Records model immutable data structures (Product Type). Together, they form Algebraic Data Types where the compiler guarantees exhaustive branch handling during switch pattern matching without runtime fallback errors.',
        example: 'sealed interface Result permits Success, Failure'
      }
    ],
    xpReward: 20
  },
  {
    id: 'adv-concurrency',
    moduleKey: 'advanced-java',
    title: 'Concurrent Collections, Locks & Atomics',
    slug: 'concurrency',
    difficulty: 'advanced',
    duration: 18,
    order: 4,
    prerequisites: ['adv-virtual-threads'],
    tags: ['concurrency', 'reentrantlock', 'concurrenthashmap', 'atomic', 'completablefuture'],
    explanation: 'Deep dive into java.util.concurrent: Explicit ReentrantLock, ReadWriteLock, AtomicInteger (CAS), ConcurrentHashMap internal bucket segmentation, and CompletableFuture asynchronous composition.',
    beginnerExplanation: 'When multiple people edit a Google Doc simultaneously, the system ensures no one overwrites each other. Java concurrency tools protect shared memory when many threads run at once.',
    technicalExplanation: 'ConcurrentHashMap utilizes Compare-And-Swap (CAS) instructions and synchronized node locking per bucket bin rather than table-wide locking, providing lock-free reads and high concurrent write scalability.',
    keyPoints: [
      'CAS (Compare-And-Swap): Hardware-level atomic lock-free operations in AtomicInteger/Long',
      'ConcurrentHashMap: Bucket-level synchronization with zero table-wide locks during reads',
      'CompletableFuture: Non-blocking asynchronous callback pipelines (`thenApply`, `thenCompose`, `allOf`)'
    ],
    codeExample: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class ConcurrencyDemo {
    private static final ConcurrentHashMap<String, AtomicInteger> accessCounter = new ConcurrentHashMap<>();

    public static void main(String[] args) {
        // Atomic thread-safe counter increment
        accessCounter.computeIfAbsent("API_USERS", k -> new AtomicInteger()).incrementAndGet();

        // Asynchronous non-blocking pipeline
        CompletableFuture.supplyAsync(() -> "User Data from Remote Microservice")
            .thenApply(String::toUpperCase)
            .thenAccept(result -> System.out.println("Async Processed: " + result))
            .join();
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'accessCounter.computeIfAbsent(..., k -> new AtomicInteger()).incrementAndGet();', token: 'computeIfAbsent', explanation: 'Atomic bucket computation preventing race conditions.' }
    ],
    quiz: [
      {
        id: 'q-adv-4',
        type: 'mcq',
        question: 'What hardware-level CPU mechanism allows AtomicInteger to update values without locking?',
        options: ['Interrupt Handler', 'Compare-And-Swap (CAS)', 'Memory Bus Master', 'Branch Prediction'],
        answer: 1,
        explanation: 'CAS atomic instructions compare expected memory content with old value and swap in the new value atomically.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-adv-4',
        type: 'predict-output',
        question: 'Which is faster for concurrent read-heavy maps: Collections.synchronizedMap() or ConcurrentHashMap?',
        answer: 'ConcurrentHashMap',
        hint: 'ConcurrentHashMap allows simultaneous non-blocking reads.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-adv-4',
        question: 'Explain how ConcurrentHashMap achieves high concurrency without locking the entire table.',
        level: 'advanced',
        answer: 'Prior to Java 8, ConcurrentHashMap used Segment-based locks (16 segments). In Java 8+, it uses volatile reads and CAS for empty bins, and synchronizes only on the head node of a specific bucket bin for updates. Reads are 100% lock-free, and concurrent writes on distinct buckets proceed in parallel.',
        example: 'Two threads writing to bucket #3 and bucket #12 do not block each other.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'adv-memory-gc',
    moduleKey: 'advanced-java',
    title: 'JVM Memory Architecture & ZGC Tuning',
    slug: 'memory-gc',
    difficulty: 'advanced',
    duration: 16,
    order: 5,
    prerequisites: ['java-jvm'],
    tags: ['jvm', 'memory', 'garbage-collection', 'zgc', 'g1gc', 'heap'],
    explanation: 'Comprehensive analysis of JVM Heap generations (Eden, Survivor, Tenured), Weak Generational Hypothesis, Garbage Collectors (G1GC vs ZGC sub-millisecond pauses), and troubleshooting OutOfMemoryError / memory leaks.',
    beginnerExplanation: 'The Garbage Collector is the automated recycling truck of the JVM. When objects are no longer used by your program, it sweeps them away so your computer never runs out of RAM.',
    technicalExplanation: 'The Generational ZGC employs colored pointers and load barriers to perform concurrent marking, relocation, and compaction with pause times strictly under 1 millisecond regardless of heap size (from 16MB to 16TB).',
    keyPoints: [
      'Weak Generational Hypothesis: Most objects die shortly after allocation in Eden space',
      'ZGC (Z Garbage Collector): Ultra-low latency concurrent collector with <1ms pause times',
      'Diagnose memory issues using heap dumps (`jcmd <pid> GC.heap_dump`) and VisualVM'
    ],
    codeExample: `// JVM Flags for ultra-low latency enterprise microservices:
// java -XX:+UseZGC -XX:+ZGenerational -Xms4g -Xmx4g -jar app.jar

public class GcMetricsDemo {
    public static void main(String[] args) {
        System.out.println("JVM Garbage Collection Baseline: Generational ZGC");
        System.out.println("Sub-millisecond pause times for high-frequency trading & real-time APIs.");
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '-XX:+UseZGC -XX:+ZGenerational', token: 'UseZGC', explanation: 'Enables modern low-latency generational Z Garbage Collector.' }
    ],
    quiz: [
      {
        id: 'q-adv-5',
        type: 'mcq',
        question: 'What is the primary architectural goal of the ZGC (Z Garbage Collector)?',
        options: ['Minimize CPU core count', 'Keep GC pause times consistently under 1 millisecond regardless of heap size', 'Eliminate all Heap allocations', 'Replace the JIT compiler'],
        answer: 1,
        explanation: 'ZGC is engineered for ultra-low latency with sub-millisecond maximum pause times.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-adv-5',
        type: 'predict-output',
        question: 'Which JVM memory generation do newly allocated objects land in first?',
        answer: 'Eden',
        hint: 'The young generation allocation space.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-adv-5',
        question: 'What causes a memory leak in Java if the Garbage Collector is automatic?',
        level: 'advanced',
        answer: 'A Java memory leak occurs when unused objects remain strongly reachable through active GC Roots (e.g., forgotten static collection entries, unclosed listeners, unclosed thread locals). Because active references still point to these objects, the GC cannot collect them, gradually exhausting the heap.',
        example: 'A static Map caching user sessions without an eviction policy or weak references.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'adv-reflection-annotations',
    moduleKey: 'advanced-java',
    title: 'Reflection & Custom Annotations',
    slug: 'reflection-annotations',
    difficulty: 'advanced',
    duration: 15,
    order: 6,
    prerequisites: ['adv-pattern-matching'],
    tags: ['reflection', 'annotations', 'proxies', 'metaprogramming', 'spring-internals'],
    explanation: 'Understanding runtime metaprogramming in Java: Declaring custom `@interface` annotations, reading metadata with Reflection API (`java.lang.reflect`), Dynamic Proxies, and how Spring Boot DI containers function internally.',
    beginnerExplanation: 'Annotations are sticky notes attached to classes and methods. Reflection is the flashlight that frameworks use to read those sticky notes and auto-wire your application.',
    technicalExplanation: 'Custom annotations with `@Retention(RetentionPolicy.RUNTIME)` are preserved in compiled class bytecodes. Spring IoC scans these annotations using reflection and wraps target beans in Dynamic Proxies (`java.lang.reflect.Proxy` or CGLIB) to inject transactional and security interceptors.',
    keyPoints: [
      'Annotation Retention Policies: SOURCE (discarded), CLASS (in bytecode), RUNTIME (accessible via reflection)',
      'Reflection API: `Class.forName()`, `getDeclaredMethods()`, `setAccessible(true)`',
      'Dynamic Proxies: Intercepts method invocations for AOP aspects (Transactions, Logging, Security)'
    ],
    codeExample: `import java.lang.annotation.*;
import java.lang.reflect.Method;

// Custom runtime annotation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface AutoLog {
    String value() default "TRACE";
}

public class ReflectionDemo {
    @AutoLog("AUDIT")
    public void executePayment() {
        System.out.println("Processing payment transaction...");
    }

    public static void main(String[] args) throws Exception {
        ReflectionDemo demo = new ReflectionDemo();
        
        // Inspect annotations using Reflection
        for (Method method : demo.getClass().getDeclaredMethods()) {
            if (method.isAnnotationPresent(AutoLog.class)) {
                AutoLog log = method.getAnnotation(AutoLog.class);
                System.out.println("Discovered @AutoLog(" + log.value() + ") on method: " + method.getName());
                method.invoke(demo);
            }
        }
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '@Retention(RetentionPolicy.RUNTIME)', token: 'RUNTIME', explanation: 'Mandatory retention policy for reflection access at runtime.' }
    ],
    quiz: [
      {
        id: 'q-adv-6',
        type: 'mcq',
        question: 'Which annotation retention policy is required for an annotation to be inspected at runtime by Spring Boot or the Reflection API?',
        options: ['RetentionPolicy.SOURCE', 'RetentionPolicy.CLASS', 'RetentionPolicy.RUNTIME', 'RetentionPolicy.NATIVE'],
        answer: 2,
        explanation: 'RUNTIME retention ensures the annotation metadata is preserved in the JVM memory space at runtime.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-adv-6',
        type: 'predict-output',
        question: 'Which method on java.lang.Class returns all methods declared in that class?',
        answer: 'getDeclaredMethods',
        hint: 'Returns array of Method objects.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-adv-6',
        question: 'How does Spring Boot utilize Dynamic Proxies for `@Transactional` methods?',
        level: 'advanced',
        answer: 'When a bean has a `@Transactional` method, Spring wraps the bean in a Dynamic Proxy (JDK Dynamic Proxy if interface present, or CGLIB subclass proxy). When callers invoke the method, the proxy intercepts the call, begins a database transaction, invokes the actual target method, and then commits or rolls back based on exceptions.',
        example: 'Proxy -> TransactionManager.begin() -> TargetMethod() -> TransactionManager.commit()'
      }
    ],
    xpReward: 20
  }
];
