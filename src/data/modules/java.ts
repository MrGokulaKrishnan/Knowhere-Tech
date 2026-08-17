import type { Lesson } from '@/types';

export const JAVA_LESSONS: Lesson[] = [
  {
    id: 'java-intro',
    moduleKey: 'java',
    title: 'What is Java & Platform Independence',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 8,
    order: 1,
    prerequisites: [],
    tags: ['java', 'basics', 'wora', 'jvm', 'enterprise'],
    explanation: 'Java is a robust, class-based, object-oriented programming language designed for maximum cross-platform portability following the "Write Once, Run Anywhere" (WORA) philosophy. Java 25 LTS powers enterprise microservices, cloud native workloads, Android apps, and high-frequency backend systems.',
    beginnerExplanation: 'Think of Java like a universal translator for computers. When you write instructions in Java, it doesn\'t lock into Windows, Mac, or Linux directly. Instead, Java converts it into a universal format (Bytecode) that any computer with a JVM engine can run flawlessly.',
    technicalExplanation: 'Java source code (.java) is compiled by javac into platform-neutral Bytecode (.class). At runtime, the Java Virtual Machine (JVM) loads the bytecode, verifies execution safety, and employs adaptive Just-In-Time (JIT) compilation and tiered compilation (C1/C2) to translate hot bytecode sequences directly into optimized native CPU machine instructions.',
    keyPoints: [
      'WORA: Write Once, Run Anywhere across any OS architecture',
      'Memory Safety: Garbage collection automatically manages heap memory',
      'Strong Static Typing: Type validation at compile time eliminates entire classes of runtime bugs',
      'Modern Java 25 LTS baseline: Virtual Threads, Pattern Matching, Records, and Sealed Classes',
      'Ecosystem: Powering Spring Boot, Kafka, Spark, Elastic, and Kubernetes native backends'
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // Welcome to Modern Java!
        String version = "Java 25 LTS";
        System.out.println("Hello, " + version + " Developer!");
        
        // Modern Java Feature: Local variable type inference
        var isJobReady = true;
        if (isJobReady) {
            System.out.println("StackPath is ready for your full stack journey.");
        }
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public class Main {', token: 'public class', explanation: 'Class declaration. In Java, every executable statement belongs within a class whose name matches the filename (Main.java).' },
      { code: '    public static void main(String[] args) {', token: 'public static void main', explanation: 'The standard entry-point signature. public (accessible by JVM), static (no instance required to invoke), void (returns nothing).' },
      { code: '        String version = "Java 25 LTS";', token: 'String', explanation: 'String reference variable assigned to an interned literal stored in the JVM String Constant Pool.' },
      { code: '        System.out.println("Hello, " + version + " Developer!");', token: 'System.out.println', explanation: 'Outputs text to standard output stream with an appended newline delimiter.' },
      { code: '        var isJobReady = true;', token: 'var', explanation: 'Local variable type inference (Java 10+), compiler infers boolean type at compile-time with zero runtime overhead.' },
      { code: '        if (isJobReady) {', token: 'if', explanation: 'Conditional branch statement evaluating a boolean truth value.' }
    ],
    visualizer: 'jvm-compilation',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What allows Java to achieve "Write Once, Run Anywhere" (WORA)?',
        options: [
          'Direct compilation into Intel x86 Assembly',
          'Intermediate bytecode interpreted and JIT-compiled by the JVM',
          'Automatic translation into C++ source code',
          'WebAssembly browser plugins'
        ],
        answer: 1,
        explanation: 'Java source files compile to bytecode (.class) which any platform-specific JVM can execute without re-compilation.',
        points: 10
      },
      {
        id: 'q2',
        type: 'true-false',
        question: 'The `var` keyword in modern Java makes it dynamically typed like JavaScript.',
        options: ['True', 'False'],
        answer: 1,
        explanation: 'False! `var` in Java is compile-time type inference. The variable remains strictly statically typed once inferred.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'What is the output of the following Java snippet?',
        code: `int a = 10;
int b = 20;
System.out.println("Result: " + a + b);`,
        answer: 'Result: 1020',
        hint: 'String concatenation operates from left to right with the + operator unless parentheses are used.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'What is the difference between JDK, JRE, and JVM?',
        level: 'beginner',
        answer: 'JVM (Java Virtual Machine) executes bytecode and handles memory management (GC). JRE (Java Runtime Environment) = JVM + core standard class libraries. JDK (Java Development Kit) = JRE + developer tools such as the javac compiler, jar archiver, and debuggers.',
        example: 'JDK is required to write & compile code. JRE/JVM is required only to run compiled .class files.'
      },
      {
        id: 'iq2',
        question: 'Why doesn\'t Java support multiple inheritance with classes?',
        level: 'intermediate',
        answer: 'To avoid the "Diamond Problem" where a subclass inherits conflicting implementations from two parents with the same method signature. Java instead supports multiple inheritance of type and behavior through Interfaces (using default methods with explicit conflict resolution rules).',
        example: 'class C extends A, B // Compile Error in Java!'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-jvm',
    moduleKey: 'java',
    title: 'JVM Architecture & Memory Management',
    slug: 'jvm',
    difficulty: 'beginner',
    duration: 12,
    order: 2,
    prerequisites: ['java-intro'],
    tags: ['jvm', 'heap', 'stack', 'garbage-collection', 'metaspace'],
    explanation: 'Deep dive into JVM internals: ClassLoader subsystem, Runtime Data Areas (Heap, Stack, Method Area/Metaspace, PC Registers, Native Method Stack), Execution Engine (Interpreter, JIT, GC), and memory allocation.',
    beginnerExplanation: 'Your computer memory is divided into rooms: The Stack room is for quick local tasks (method calls and simple variables). The Heap room is a large warehouse where all objects and data structures live. The Garbage Collector is the robot janitor that cleans up unused objects so memory never runs out.',
    technicalExplanation: 'The JVM divides memory into Thread-Private areas (Stack, PC Register, Native Stack) and Thread-Shared areas (Heap, Metaspace). Objects are allocated in Heap Young Generation (Eden + Survivor spaces) and promoted to Old Generation via generational GC algorithms (G1, ZGC, Shenandoah).',
    keyPoints: [
      'Stack: Thread-private, stores method frames, primitive locals, and object references',
      'Heap: Thread-shared, holds all instantiated objects and arrays',
      'Metaspace: Stores class metadata in native memory (replaced PermGen in Java 8)',
      'Modern GCs (ZGC, G1) achieve sub-millisecond pause times in modern enterprise apps',
      'JIT Compiler (Tiered C1/C2) optimizes hot execution paths to raw machine instructions'
    ],
    codeExample: `public class MemoryDemo {
    // Primitive instance variable (stored on Heap inside object)
    private int id = 101;

    public static void main(String[] args) {
        // 'localVal' stored on current Thread's Stack
        int localVal = 50;
        
        // 'demo' reference on Stack pointing to MemoryDemo object on Heap
        MemoryDemo demo = new MemoryDemo();
        demo.process(localVal);
    }
    
    public void process(int input) {
        String msg = new String("Processing: " + input); // String object on Heap
        System.out.println(msg);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '    private int id = 101;', token: 'private int id', explanation: 'Instance field allocated on the Heap as part of the MemoryDemo object instance.' },
      { code: '        int localVal = 50;', token: 'int localVal', explanation: 'Local primitive variable allocated directly inside the stack frame of main().' },
      { code: '        MemoryDemo demo = new MemoryDemo();', token: 'new MemoryDemo()', explanation: 'Instantiates object in Eden space of JVM Heap; reference pointer stored in stack variable demo.' },
      { code: '        demo.process(localVal);', token: 'demo.process', explanation: 'Pushes a new method execution stack frame onto the calling thread stack.' }
    ],
    visualizer: 'jvm-compilation',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'Where are objects instantiated with the `new` keyword allocated in the JVM?',
        options: ['Thread Stack', 'Heap Memory', 'Program Counter Register', 'CPU L1 Cache'],
        answer: 1,
        explanation: 'All object instances in Java reside on the Heap and are managed by the Garbage Collector.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'find-bug',
        question: 'Which line causes a Memory Leak or StackOverflowError in recursive scenarios?',
        code: `public void infinite() {
    infinite(); // No base case!
}`,
        answer: 'Unbounded recursion exhausts stack memory causing java.lang.StackOverflowError.',
        hint: 'Every method call creates a new Stack Frame. Infinite calls overflow the thread stack.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'What is the difference between Stack and Heap memory in Java?',
        level: 'beginner',
        answer: 'Stack memory is thread-safe, fast, LIFO-structured, and stores method invocation frames, local primitives, and reference handles. Heap memory is shared across all threads, stores all objects/arrays, is larger, and is managed by Garbage Collection.',
        example: 'StackOverflowError vs OutOfMemoryError: Java heap space.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-oop-encapsulation',
    moduleKey: 'java',
    title: 'OOP: Encapsulation & Records',
    slug: 'encapsulation',
    difficulty: 'beginner',
    duration: 10,
    order: 3,
    prerequisites: ['java-intro'],
    tags: ['oop', 'encapsulation', 'records', 'immutability', 'getters-setters'],
    explanation: 'Encapsulation is the OOP pillar of bundling state (fields) and behavior (methods) while shielding internal data representation from direct external manipulation using access modifiers.',
    beginnerExplanation: 'Encapsulation is like a capsule medicine or a bank ATM. You don\'t open the bank vault directly with a crowbar; you use the ATM screen (public methods) that checks your PIN and balance before giving you cash.',
    technicalExplanation: 'Encapsulation safeguards invariant constraints by making fields private and exposing validated public accessors/mutators. In modern Java (16+ and 25 LTS), immutable data-carrier classes are succinctly implemented using `record`, which auto-generates private final fields, canonical constructors, accessors, equals(), hashCode(), and toString().',
    keyPoints: [
      'Private fields + Public getters/setters protect data integrity',
      'Validation logic runs inside setters before updating state',
      'Modern Java `record` provides concise immutable data carriers',
      'Encapsulation reduces coupling and facilitates future implementation changes'
    ],
    codeExample: `// Traditional Encapsulation with validation
public class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialDeposit) {
        this.accountNumber = accountNumber;
        this.deposit(initialDeposit);
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit must be positive!");
        this.balance += amount;
    }

    public double getBalance() { return balance; }
}

// Modern Java Record (Immutable DTO)
public record UserDto(Long id, String username, String email) {
    // Compact constructor for validation
    public UserDto {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException("Username required");
        }
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '    private double balance;', token: 'private', explanation: 'Hides internal balance variable from unauthorized direct modification.' },
      { code: '    public void deposit(double amount) {', token: 'deposit', explanation: 'Public method enforcing business rules and validation prior to state modification.' },
      { code: 'public record UserDto(Long id, String username, String email) {', token: 'record', explanation: 'Java Record: creates an immutable class with final fields, getters (id(), username(), email()), equals, and hashCode.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'Which modern Java feature provides boilerplate-free immutable data transfer objects (DTOs)?',
        options: ['enum', 'record', 'interface', 'abstract class'],
        answer: 1,
        explanation: 'Java records (introduced standard in Java 16) are concise immutable data carriers.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'complete-method',
        question: 'Write a valid Java Record definition for a Product with id (Long), name (String), and price (double).',
        code: `public record Product(...) {}`,
        answer: 'public record Product(Long id, String name, double price) {}',
        hint: 'Specify components inside the record parentheses.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'What are Java Records and how do they differ from normal classes?',
        level: 'intermediate',
        answer: 'Java Records are specialized immutable classes where state is declared in the header. The compiler automatically creates private final fields, accessor methods, canonical constructor, equals(), hashCode(), and toString(). Records cannot extend other classes (they implicitly extend java.lang.Record) but can implement interfaces.',
        example: 'public record Coordinates(int x, int y) {}'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-oop-polymorphism',
    moduleKey: 'java',
    title: 'OOP: Inheritance & Polymorphism',
    slug: 'polymorphism',
    difficulty: 'beginner',
    duration: 14,
    order: 4,
    prerequisites: ['java-oop-encapsulation'],
    tags: ['oop', 'inheritance', 'polymorphism', 'interfaces', 'overriding'],
    explanation: 'Inheritance allows a subclass to acquire properties and methods from a superclass. Polymorphism ("many forms") enables a single interface or reference type to represent different underlying implementations at runtime via Dynamic Method Dispatch.',
    beginnerExplanation: 'Think of the interface `Vehicle` with a `start()` method. A `Car`, a `Motorcycle`, and a `Rocket` are all Vehicles, but when you tell each to `start()`, they execute completely different engines in their own unique way.',
    technicalExplanation: 'Java implements runtime polymorphism via Dynamic Method Dispatch using the vtable (virtual method table). The JVM resolves the concrete overridden method based on the actual object type residing in Heap memory, rather than the reference type on the Stack.',
    keyPoints: [
      'Compile-time polymorphism: Method Overloading (same name, distinct parameter signatures)',
      'Runtime polymorphism: Method Overriding (@Override in subclass, dynamic dispatch)',
      '`super` keyword accesses parent constructors and superclass methods',
      'Interfaces specify behavioral contracts without enforcing state'
    ],
    codeExample: `// Polymorphic Interface
public interface PaymentProcessor {
    void processPayment(double amount);
}

public class StripePayment implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via Stripe API.");
    }
}

public class CryptoPayment implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Settling $" + amount + " on Ethereum Blockchain.");
    }
}

// Client code using polymorphic reference
public class CheckoutService {
    public void checkout(PaymentProcessor processor, double total) {
        // Resolved dynamically at runtime!
        processor.processPayment(total);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public interface PaymentProcessor {', token: 'interface', explanation: 'Defines an abstract contract that multiple classes can fulfill.' },
      { code: '    @Override', token: '@Override', explanation: 'Compiler annotation ensuring the method accurately overrides a signature in the parent contract.' },
      { code: '    public void checkout(PaymentProcessor processor, double total) {', token: 'PaymentProcessor processor', explanation: 'Loose coupling: Accepts any concrete implementation of PaymentProcessor.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'Which mechanism determines which overridden method to execute at runtime in Java?',
        options: ['Static Binding', 'Dynamic Method Dispatch', 'Preprocessor Directives', 'Bytecode Obfuscation'],
        answer: 1,
        explanation: 'Dynamic Method Dispatch uses the object\'s actual runtime type in the heap to resolve overridden methods.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'What is printed by this polymorphic call?',
        code: `class Animal { void sound() { System.out.print("Generic "); } }
class Dog extends Animal { void sound() { System.out.print("Bark! "); } }

Animal a = new Dog();
a.sound();`,
        answer: 'Bark! ',
        hint: 'The actual object in heap is a Dog instance.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Can you override static or private methods in Java?',
        level: 'intermediate',
        answer: 'No. Private methods are not visible to subclasses. Static methods belong to the class rather than an object instance; declaring a static method with the same signature in a subclass results in Method Hiding, not overriding (resolved at compile time by reference type).',
        example: 'Static methods use compile-time binding.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-collections-streams',
    moduleKey: 'java',
    title: 'Collections Framework & Stream API',
    slug: 'collections-streams',
    difficulty: 'intermediate',
    duration: 15,
    order: 5,
    prerequisites: ['java-oop-polymorphism'],
    tags: ['collections', 'streams', 'lambda', 'hashmap', 'arraylist', 'java25'],
    explanation: 'The Java Collections Framework provides standardized data structures (List, Set, Map, Queue). The Stream API (Java 8+) introduces declarative, functional data processing pipelines for filtering, mapping, and aggregating collection elements with parallel execution support.',
    beginnerExplanation: 'Think of Collections like your storage boxes (lists of items, bags of unique cards, phonebooks of names and numbers). The Stream API is like a conveyor belt factory pipeline where you filter out defects, transform products, and pack them neatly in one fluid motion.',
    technicalExplanation: 'Streams use lazy evaluation with intermediate operations (`filter`, `map`, `flatMap`, `sorted`) that build an execution pipeline, terminating only when a terminal operation (`collect`, `forEach`, `reduce`, `count`) is invoked. Map implementations like `HashMap` employ bucket arrays with linked lists transitioning to red-black trees at threshold TREEIFY_THRESHOLD (8) for O(log n) worst-case lookups.',
    keyPoints: [
      'List (ArrayList, LinkedList): Ordered, indexed, allows duplicates',
      'Set (HashSet, TreeSet): Unique elements, HashSet uses hashing for O(1) ops',
      'Map (HashMap, ConcurrentHashMap): Key-Value pairs with unique keys',
      'Streams: Lazy evaluation, non-mutating pipelines, parallelStream() capabilities'
    ],
    codeExample: `import java.util.*;
import java.util.stream.Collectors;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> skills = List.of("Java", "Spring Boot", "Docker", "AWS", "React", "SQL");

        // Declarative Stream Pipeline: Filter, Transform, Collect
        List<String> filtered = skills.stream()
            .filter(s -> s.length() > 3)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());

        System.out.println("Mastered: " + filtered);

        // Grouping with Map & Collectors
        Map<Integer, List<String>> byLength = skills.stream()
            .collect(Collectors.groupingBy(String::length));
            
        System.out.println("By Length: " + byLength);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '        List<String> filtered = skills.stream()', token: 'skills.stream()', explanation: 'Creates a sequential Stream pipeline from the source list.' },
      { code: '            .filter(s -> s.length() > 3)', token: '.filter', explanation: 'Intermediate filter operation taking a Predicate functional interface.' },
      { code: '            .map(String::toUpperCase)', token: '.map', explanation: 'Method reference transforming each String element to uppercase.' },
      { code: '            .collect(Collectors.toList());', token: '.collect', explanation: 'Terminal operation collecting the processed elements into a new immutable/mutable List.' }
    ],
    visualizer: 'dsa-sorting',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'When is a Java Stream pipeline actually executed?',
        options: [
          'Immediately when stream() is called',
          'Whenever an intermediate operation like map() is added',
          'Only when a terminal operation like collect() or forEach() is invoked',
          'During garbage collection'
        ],
        answer: 2,
        explanation: 'Streams are lazy; intermediate operations are not evaluated until a terminal operation is called.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'predict-output',
        question: 'What is the result of this stream pipeline?',
        code: `List<Integer> nums = List.of(1, 2, 3, 4, 5);
int sum = nums.stream().filter(n -> n % 2 == 0).mapToInt(n -> n * 2).sum();
System.out.println(sum);`,
        answer: '12',
        hint: 'Even numbers: 2, 4 -> Doubled: 4, 8 -> Sum: 12.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'How does HashMap work internally in Java?',
        level: 'intermediate',
        answer: 'HashMap uses an array of Node<K,V> buckets. When put(key, value) is called, it calculates hash(key) to find the bucket index. If collisions occur, it chains nodes in a linked list. In Java 8+, if a bucket exceeds 8 elements (and array length >= 64), the linked list converts to a balanced Red-Black Tree (TreeNode) improving search time from O(n) to O(log n).',
        example: 'O(1) average time complexity for get and put operations.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-virtual-threads',
    moduleKey: 'java',
    title: 'Modern Concurrency & Virtual Threads (Project Loom)',
    slug: 'virtual-threads',
    difficulty: 'advanced',
    duration: 15,
    order: 6,
    prerequisites: ['java-collections-streams'],
    tags: ['concurrency', 'virtual-threads', 'loom', 'java25', 'multithreading'],
    explanation: 'Virtual Threads (standardized in Java 21 LTS and optimized in Java 25) revolutionize high-throughput concurrent Java applications by decoupling user-mode threads from heavy OS platform threads.',
    beginnerExplanation: 'Classic platform threads are like reserving an entire freight train for one passenger — expensive and you can only run a few hundred at a time. Virtual Threads are like passengers taking individual seats on shared carrier trains. You can comfortably spawn 1,000,000 virtual threads without crashing your computer!',
    technicalExplanation: 'Traditional OS platform threads consume ~1MB of stack memory and require kernel-level context switching. Virtual Threads (`Thread.ofVirtual()`) are managed entirely in JVM user space, storing small stack frames on the Heap. When a virtual thread performs blocking I/O (e.g., database query or HTTP call), the JVM unmounts it from the carrier ForkJoinPool thread, allowing other virtual threads to run with near-zero throughput penalty.',
    keyPoints: [
      'Millions of concurrent threads without memory exhaustion',
      'Thread-per-request model without reactive complexity (e.g., WebFlux/RxJava)',
      'Compatible with existing synchronous blocking APIs (JDBC, RestTemplate, Socket)',
      'Structured Concurrency and Scoped Values provide safe thread coordination in modern Java'
    ],
    codeExample: `import java.util.concurrent.Executors;
import java.time.Duration;

public class VirtualThreadDemo {
    public static void main(String[] args) throws Exception {
        // Spawning a single Virtual Thread directly
        Thread vThread = Thread.ofVirtual().name("vt-worker").start(() -> {
            System.out.println("Running on: " + Thread.currentThread());
        });
        vThread.join();

        // High-throughput executor for 10,000 concurrent tasks
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 10_000; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    // Non-blocking sleep: Carrier thread is unmounted and freed!
                    Thread.sleep(Duration.ofMillis(100));
                    if (taskId % 2000 == 0) {
                        System.out.println("Completed task #" + taskId + " on " + Thread.currentThread());
                    }
                    return taskId;
                });
            }
        } // Executor auto-closes and awaits completion
        System.out.println("All 10,000 virtual tasks finished!");
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '        Thread.ofVirtual().name("vt-worker").start(() -> {', token: 'Thread.ofVirtual()', explanation: 'Creates and launches a lightweight JVM-managed Virtual Thread.' },
      { code: '        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {', token: 'newVirtualThreadPerTaskExecutor()', explanation: 'Creates an ExecutorService that spawns a new Virtual Thread for each submitted task.' },
      { code: '                    Thread.sleep(Duration.ofMillis(100));', token: 'Thread.sleep', explanation: 'When blocking occurs, JVM parks the virtual thread and yields the underlying OS carrier thread.' }
    ],
    visualizer: 'jvm-compilation',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What happens when a Virtual Thread encounters a blocking I/O operation?',
        options: [
          'The entire operating system freezes',
          'The OS carrier thread is unmounted and reused by other virtual threads',
          'The thread throws a ThreadInterruptedException',
          'The JVM crashes due to thread starvation'
        ],
        answer: 1,
        explanation: 'The JVM unmounts the virtual thread from its carrier thread during blocking I/O, allowing other work to execute on the carrier.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'choose-correct',
        question: 'Which method creates an Executor that assigns a fresh Virtual Thread to every task?',
        code: '',
        answer: 'Executors.newVirtualThreadPerTaskExecutor()',
        hint: 'Factory method on java.util.concurrent.Executors.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Why do Virtual Threads make reactive programming (like Spring WebFlux) largely unnecessary for standard I/O bound backends?',
        level: 'advanced',
        answer: 'Reactive programming was adopted to bypass OS thread limits by writing non-blocking asynchronous callbacks. Virtual Threads allow developers to write simple, debuggable, synchronous, blocking code (thread-per-request) with stack traces while achieving identical or superior throughput because blocking I/O does not block OS threads.',
        example: 'Standard synchronous Spring Boot with Virtual Threads easily handles 50,000+ concurrent requests.'
      }
    ],
    xpReward: 25
  }
];
