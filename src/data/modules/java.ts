import type { Lesson } from '@/types';

export const JAVA_LESSONS: Lesson[] = [
  {
    id: 'java-intro',
    moduleKey: 'java',
    title: 'What is Java & Platform Independence',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: [],
    tags: ['java', 'basics', 'wora', 'jvm', 'enterprise'],
    explanation: 'Java is a robust, class-based, object-oriented language designed for maximum portability with the "Write Once, Run Anywhere" (WORA) philosophy. Java 25 LTS powers enterprise microservices, cloud workloads, and high-frequency backend systems.',
    beginnerExplanation: 'Think of Java as a universal blueprint. You write code once, and the Java engine (JVM) translates it so it runs smoothly on Windows, Mac, or Linux without any changes.',
    technicalExplanation: 'Source code (.java) is compiled by javac into platform-neutral Bytecode (.class). The JVM loads bytecode and utilizes tiered JIT compilation (C1/C2) to generate optimized native CPU machine code at runtime.',
    keyPoints: [
      'WORA: Write Once, Run Anywhere across any OS architecture',
      'Memory Safety: Automated garbage collection prevents manual memory leak risks',
      'Strong Static Typing: Type safety verified strictly at compile-time',
      'Java 25 LTS: Modern standard with Virtual Threads, Pattern Matching, and Records'
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        String platform = "Java 25 LTS";
        System.out.println("Welcome to " + platform + " on Knowhere Tech!");
        
        var isReady = true;
        if (isReady) {
            System.out.println("Ready to master full-stack software engineering.");
        }
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public class Main {', token: 'public class', explanation: 'Class declaration matching the filename.' },
      { code: '    public static void main(String[] args) {', token: 'main', explanation: 'Standard JVM execution entry point.' },
      { code: '        var isReady = true;', token: 'var', explanation: 'Local variable type inference introduced in modern Java.' }
    ],
    visualizer: 'jvm-compilation',
    quiz: [
      {
        id: 'q-j1',
        type: 'mcq',
        question: 'What enables Java code to achieve platform independence (WORA)?',
        options: ['Native machine code compilation', 'Bytecode executed by the JVM', 'Browser WebAssembly', 'Direct OS translation'],
        answer: 1,
        explanation: 'Java source compiles to Bytecode (.class) which runs on any platform with an installed JVM.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j1',
        type: 'predict-output',
        question: 'What does this program print?',
        code: 'System.out.println("Java" + " 25");',
        answer: 'Java 25',
        hint: 'String concatenation joins both literals.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j1',
        question: 'Explain the difference between JDK, JRE, and JVM.',
        level: 'beginner',
        answer: 'JDK contains development tools (javac, debugger). JRE contains libraries and JVM to execute programs. JVM interprets and JIT-compiles bytecode into native machine instructions.',
        example: 'JDK = JRE + Tools; JRE = JVM + Core Class Libraries'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-jvm',
    moduleKey: 'java',
    title: 'JVM, JRE & JDK Architecture',
    slug: 'jvm',
    difficulty: 'beginner',
    duration: 12,
    order: 2,
    prerequisites: ['java-intro'],
    tags: ['jvm', 'jre', 'jdk', 'bytecode', 'jit'],
    explanation: 'Understanding the inner architecture of the Java Virtual Machine: ClassLoader subsystems, runtime data areas (Heap, Stack, Metaspace), and execution engines (Interpreter & JIT Compiler).',
    beginnerExplanation: 'The JDK is the toolbox to build software, the JRE is the package that holds the engine, and the JVM is the engine itself running your code.',
    technicalExplanation: 'The JVM manages Heap memory for object instances, Thread Stacks for local frames, and Metaspace for class definitions. The Execution Engine employs adaptive profiling and JIT compilation to boost hot code paths.',
    keyPoints: [
      'ClassLoader Subsystem: Loading, Linking (Verification, Preparation, Resolution), Initialization',
      'Runtime Memory: Heap (shared), Thread Stacks (isolated), Metaspace (native memory)',
      'Tiered Compilation: C1 compiler for rapid startup, C2 server compiler for peak performance'
    ],
    codeExample: `public class MemoryInspector {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        
        System.out.println("Max JVM Heap: " + maxMemory + " MB");
        System.out.println("Free Heap: " + freeMemory + " MB");
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'Runtime runtime = Runtime.getRuntime();', token: 'Runtime', explanation: 'Accesses the current JVM runtime environment.' }
    ],
    visualizer: 'jvm-compilation',
    quiz: [
      {
        id: 'q-j2',
        type: 'mcq',
        question: 'Where are object instances allocated in Java runtime memory?',
        options: ['Thread Stack', 'Metaspace', 'Heap Memory', 'Program Counter Register'],
        answer: 2,
        explanation: 'All object instances in Java are allocated in the Heap and managed by the Garbage Collector.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j2',
        type: 'predict-output',
        question: 'Is local primitive variable stored in Heap or Stack?',
        answer: 'Stack',
        hint: 'Method parameters and local primitives live in Stack frames.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j2',
        question: 'How does the JIT (Just-In-Time) compiler optimize Java performance?',
        level: 'intermediate',
        answer: 'The JIT compiler profiles running bytecode to identify "hot spots" (frequently executed loops/methods) and translates them directly into native CPU machine code, inlining methods and eliminating dead branches.',
        example: 'Tiered compilation balances quick C1 startup with C2 aggressive optimization.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-compilation',
    moduleKey: 'java',
    title: 'Java Compilation & Execution Pipeline',
    slug: 'compilation',
    difficulty: 'beginner',
    duration: 10,
    order: 3,
    prerequisites: ['java-jvm'],
    tags: ['javac', 'bytecode', 'classfile', 'execution'],
    explanation: 'From human-readable .java source code to intermediate .class bytecode to native assembly execution on the CPU.',
    beginnerExplanation: 'Writing code is like writing a recipe in English. Javac translates it into a universal code, and the JVM follows the steps on any machine.',
    technicalExplanation: 'The javac compiler performs lexical analysis, parsing, semantic verification, and generates bytecode instructions (like aload, invokevirtual, ireturn).',
    keyPoints: [
      'Source (.java) -> javac -> Bytecode (.class) -> JVM -> CPU',
      'Bytecode Verifier checks for buffer overflows and illegal memory access before execution',
      'Disassemble bytecode anytime using `javap -c ClassName`'
    ],
    codeExample: `// Compile: javac Application.java
// Inspect: javap -c Application
public class Application {
    public int compute(int a, int b) {
        return a + b; // Generates: iload_1, iload_2, iadd, ireturn
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'return a + b;', token: 'iadd', explanation: 'Bytecode instruction performing integer addition on operand stack.' }
    ],
    visualizer: 'jvm-compilation',
    quiz: [
      {
        id: 'q-j3',
        type: 'mcq',
        question: 'Which tool command disassembles compiled .class files into readable bytecode mnemonics?',
        options: ['java -debug', 'javap -c', 'javac -v', 'jar -tf'],
        answer: 1,
        explanation: 'javap is the Java class file disassembler tool.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j3',
        type: 'predict-output',
        question: 'What file extension is created after running `javac Test.java`?',
        answer: '.class',
        hint: 'The compiled bytecode file extension.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j3',
        question: 'Why does Java use an intermediate bytecode step instead of compiling directly to machine code?',
        level: 'beginner',
        answer: 'Bytecode enables platform portability (WORA). One compiled .class file runs unmodified on x86, ARM, or RISC-V platforms with appropriate JVMs, while also allowing runtime optimizations based on actual runtime workload profiling.',
        example: 'A single JAR can run on Linux cloud servers and macOS developer machines.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-variables',
    moduleKey: 'java',
    title: 'Variables, Data Types & Type Inference',
    slug: 'variables',
    difficulty: 'beginner',
    duration: 12,
    order: 4,
    prerequisites: ['java-intro'],
    tags: ['variables', 'primitives', 'reference-types', 'var', 'data-types'],
    explanation: 'Master Java 8 primitive types (byte, short, int, long, float, double, char, boolean), reference types, wrapper classes, and modern `var` local variable type inference.',
    beginnerExplanation: 'Variables are labeled storage containers for information: numbers, letters, or complex objects. Java requires you to specify what type of item each container holds.',
    technicalExplanation: 'Primitives store raw values directly on the stack. Reference types store 64-bit (or 32-bit compressed OOP) memory addresses pointing to Heap objects. Modern Java uses `var` for compile-time type inference without sacrificing type safety.',
    keyPoints: [
      '8 Primitives: byte (8-bit), short (16-bit), int (32-bit), long (64-bit), float (32-bit), double (64-bit), char (16-bit Unicode), boolean',
      'Autoboxing & Unboxing: Automatic conversion between primitives and wrappers (int <-> Integer)',
      'Local Type Inference: `var` reduces visual noise while maintaining strict compile-time types'
    ],
    codeExample: `public class VariablesDemo {
    public static void main(String[] args) {
        int age = 28;
        double salary = 125000.50;
        char grade = 'A';
        boolean isActive = true;
        
        // Modern Java 10+ Type Inference
        var developerName = "Gokul"; // Inferred as String
        var accountBalance = 5400.75; // Inferred as double
        
        System.out.println(developerName + " is active: " + isActive);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'var developerName = "Gokul";', token: 'var', explanation: 'Compiler statically infers java.lang.String at compile time.' }
    ],
    quiz: [
      {
        id: 'q-j4',
        type: 'mcq',
        question: 'Which of the following is NOT a Java primitive data type?',
        options: ['boolean', 'int', 'String', 'char'],
        answer: 2,
        explanation: 'String is a reference class object in java.lang, not a primitive.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j4',
        type: 'predict-output',
        question: 'What is the default value of an uninitialized boolean instance variable in Java?',
        answer: 'false',
        hint: 'Boolean fields default to false.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j4',
        question: 'What is the difference between Primitive types and Reference types in Java?',
        level: 'beginner',
        answer: 'Primitives hold actual binary values in thread stack memory (fast, no object overhead). Reference types hold memory addresses referencing objects on the heap and support null values, methods, and polymorphism.',
        example: 'int a = 10; (primitive) vs Integer b = 10; (heap object reference)'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-operators',
    moduleKey: 'java',
    title: 'Operators & Expressions',
    slug: 'operators',
    difficulty: 'beginner',
    duration: 10,
    order: 5,
    prerequisites: ['java-variables'],
    tags: ['operators', 'arithmetic', 'logical', 'bitwise', 'ternary'],
    explanation: 'Comprehensive coverage of Java arithmetic, relational, logical (short-circuit && vs &), bitwise, ternary, and precedence rules.',
    beginnerExplanation: 'Operators are math and logic symbols (+, -, *, /, &&, ||) that allow you to calculate, compare, and make decisions in your code.',
    technicalExplanation: 'Short-circuit operators (&&, ||) evaluate the right operand only when necessary, preventing NullPointerExceptions. Bitwise operators (&, |, ^, <<, >>, >>>) manipulate binary bit representations directly.',
    keyPoints: [
      'Short-circuit evaluation: `obj != null && obj.isValid()` safely avoids NPE',
      'Ternary operator: `String status = (score >= 70) ? "PASS" : "FAIL";`',
      'Unsigned right shift `>>>` shifts zero into highest bit position'
    ],
    codeExample: `public class OperatorsDemo {
    public static void main(String[] args) {
        int score = 85;
        boolean hasPassed = score >= 70;
        
        // Ternary operator
        String result = hasPassed ? "Certified Developer" : "Keep Practicing";
        System.out.println("Result: " + result);
        
        // Short-circuit safety check
        String name = null;
        if (name != null && name.length() > 0) {
            System.out.println("Valid Name");
        }
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'String result = hasPassed ? "Certified" : "Retry";', token: '?', explanation: 'Ternary inline conditional expression.' }
    ],
    quiz: [
      {
        id: 'q-j5',
        type: 'mcq',
        question: 'Why is `&&` preferred over `&` for boolean logical operations in conditional statements?',
        options: ['It runs in a separate thread', 'It uses short-circuit evaluation, skipping right operand if left is false', 'It supports floating point values', 'It is faster at binary bit shifting'],
        answer: 1,
        explanation: '&& short-circuits: if the first condition is false, the second condition is never evaluated.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j5',
        type: 'predict-output',
        question: 'What is the output of: `System.out.println(10 % 3);`?',
        answer: '1',
        hint: '10 divided by 3 has a remainder of 1.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j5',
        question: 'Explain the difference between `==` and `.equals()` in Java.',
        level: 'beginner',
        answer: '`==` compares primitive values or reference memory addresses (checking if two variables point to the exact same heap memory location). `.equals()` is a method designed to compare semantic data equality of object contents.',
        example: 'String a = new String("hi"); String b = new String("hi"); a == b is false, but a.equals(b) is true.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-control-flow',
    moduleKey: 'java',
    title: 'Control Flow & Modern Switch Expressions',
    slug: 'control-flow',
    difficulty: 'beginner',
    duration: 14,
    order: 6,
    prerequisites: ['java-operators'],
    tags: ['control-flow', 'if-else', 'switch', 'loops', 'for-each', 'yield'],
    explanation: 'Directing code execution with branching (if/else, switch expressions with arrow syntax `->` and `yield`), iteration (for, enhanced for-each, while, do-while), and jump statements (break, continue).',
    beginnerExplanation: 'Control flow gives your program a brain: "If the user is logged in, show the dashboard; otherwise, show the login screen."',
    technicalExplanation: 'Modern Java features enhanced Switch Expressions that return values directly using `->` arrow syntax with guaranteed exhaustiveness, eliminating error-prone break statements.',
    keyPoints: [
      'Modern Switch Expression: `int days = switch (month) { case FEB -> 28; default -> 30; };`',
      'Enhanced For-Each Loop: Clean iteration over Iterable collections and arrays',
      'Labeled break and continue statements for nested loop control'
    ],
    codeExample: `public class ControlFlowDemo {
    public static void main(String[] args) {
        String role = "ADMIN";
        
        // Modern Java Switch Expression
        int accessLevel = switch (role) {
            case "ADMIN" -> 3;
            case "MANAGER" -> 2;
            case "DEV" -> 1;
            default -> 0;
        };
        
        System.out.println("Access Level: " + accessLevel);
        
        // Enhanced for-each loop
        String[] modules = {"Java", "Spring Boot", "React", "Docker"};
        for (String mod : modules) {
            System.out.println("Module: " + mod);
        }
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'case "ADMIN" -> 3;', token: '->', explanation: 'Arrow syntax returns value directly without requiring break.' }
    ],
    quiz: [
      {
        id: 'q-j6',
        type: 'mcq',
        question: 'Which switch statement feature was introduced to eliminate fall-through bugs without requiring break statements?',
        options: ['Arrow syntax `->` in switch expressions', 'goto statements', 'auto-break modifier', 'return annotations'],
        answer: 0,
        explanation: 'Switch expressions with `->` evaluate only the matched rule without falling through.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j6',
        type: 'predict-output',
        question: 'How many times will `while(false)` execute its body?',
        answer: '0',
        hint: 'Condition is checked before entering the loop.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j6',
        question: 'What is the key advantage of modern Switch Expressions over legacy Switch statements?',
        level: 'intermediate',
        answer: 'Switch expressions can return values, require exhaustive case handling (enforced by the compiler when switching on enums/sealed classes), and eliminate accidental fall-through bugs caused by omitted break statements.',
        example: 'var result = switch(status) { case ACTIVE -> "OK"; case INACTIVE -> "OFF"; };'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-methods',
    moduleKey: 'java',
    title: 'Methods, Parameters & Pass-by-Value',
    slug: 'methods',
    difficulty: 'beginner',
    duration: 12,
    order: 7,
    prerequisites: ['java-control-flow'],
    tags: ['methods', 'pass-by-value', 'overloading', 'varargs', 'recursion'],
    explanation: 'Modularize application logic using methods, understanding strict pass-by-value semantics, method overloading, variable arguments (varargs `...`), and recursion.',
    beginnerExplanation: 'Methods are reusable action blocks (like functions). You feed them inputs (parameters), they do work, and they return a result.',
    technicalExplanation: 'Java is strictly Pass-by-Value at all times. When passing an object reference, the value of the reference pointer is copied into the method frame; the original variable pointer cannot be reassigned from inside the callee.',
    keyPoints: [
      'Pass-by-Value: Value of the argument (primitive value or object reference address) is copied',
      'Method Overloading: Same method name with distinct parameter lists (compile-time polymorphism)',
      'Varargs: `public void log(String... messages)` accepts variable number of arguments as an array'
    ],
    codeExample: `public class MethodsDemo {
    // Overloaded method: 2 parameters
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Overloaded method: Varargs
    public static int add(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }
    
    public static void main(String[] args) {
        System.out.println("Sum 2: " + add(10, 20));
        System.out.println("Sum 4: " + add(5, 10, 15, 20));
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public static int add(int... numbers) {', token: 'int...', explanation: 'Varargs syntax allowing 0 or more integer arguments.' }
    ],
    quiz: [
      {
        id: 'q-j7',
        type: 'mcq',
        question: 'Is Java Pass-by-Reference or Pass-by-Value when passing objects to methods?',
        options: ['Always Pass-by-Reference', 'Always Pass-by-Value', 'Pass-by-Reference for Objects, Pass-by-Value for Primitives', 'Depends on compiler flags'],
        answer: 1,
        explanation: 'Java is strictly Pass-by-Value. For objects, the reference pointer address value is copied.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j7',
        type: 'predict-output',
        question: 'What return type is specified for a method that returns no data?',
        answer: 'void',
        hint: 'Keyword for methods with no return value.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j7',
        question: 'Explain why Java is strictly Pass-by-Value with an object example.',
        level: 'intermediate',
        answer: 'When passing an object, Java copies the reference address value. You can mutate the internal state of the object through that copied reference, but reassigning the parameter variable to `new Object()` inside the method has zero effect on the caller\'s original reference.',
        example: 'void reassign(User u) { u = new User(); } // Caller\'s original User reference remains unchanged.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-arrays',
    moduleKey: 'java',
    title: 'Arrays & Memory Layout',
    slug: 'arrays',
    difficulty: 'beginner',
    duration: 12,
    order: 8,
    prerequisites: ['java-methods'],
    tags: ['arrays', 'memory-layout', 'bounds-checking', 'multidimensional', 'arrays-class'],
    explanation: 'Fixed-size contiguous memory sequences in Java, bounds checking (ArrayIndexOutOfBoundsException), multidimensional arrays, and `java.util.Arrays` utility functions.',
    beginnerExplanation: 'An array is a row of lockers numbered 0 to N-1. Once you build 10 lockers, you cannot add an 11th locker—you must build a new bigger locker room.',
    technicalExplanation: 'In Java, arrays are first-class Heap objects with an intrinsic `.length` field and object header. Array elements occupy contiguous memory cells allowing O(1) random access by memory offset calculation: `baseAddress + index * elementSize`.',
    keyPoints: [
      'O(1) Random Access: Direct calculation to index offset',
      'Fixed Capacity: Array size cannot be resized after allocation',
      'java.util.Arrays utilities: `Arrays.sort()`, `Arrays.binarySearch()`, `Arrays.copyOf()`'
    ],
    codeExample: `import java.util.Arrays;

public class ArraysDemo {
    public static void main(String[] args) {
        int[] scores = {92, 78, 85, 99, 88};
        
        // Sort using Dual-Pivot Quicksort
        Arrays.sort(scores);
        System.out.println("Sorted: " + Arrays.toString(scores));
        
        // Binary Search on sorted array (O(log n))
        int index = Arrays.binarySearch(scores, 88);
        System.out.println("Index of 88: " + index);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'Arrays.sort(scores);', token: 'Arrays.sort', explanation: 'High-performance primitive sort using Dual-Pivot Quicksort.' }
    ],
    quiz: [
      {
        id: 'q-j8',
        type: 'mcq',
        question: 'What is the time complexity of accessing an element in an array by its index?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        answer: 2,
        explanation: 'Array index access is O(1) constant time because memory is contiguous.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j8',
        type: 'predict-output',
        question: 'What is the index of the first element in any Java array?',
        answer: '0',
        hint: 'Java uses 0-based indexing.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j8',
        question: 'How are Java arrays laid out in JVM Heap memory?',
        level: 'intermediate',
        answer: 'Java arrays are allocated on the Heap as an object. They include a standard 12/16-byte object header (Mark Word + Klass Word) plus a 4-byte array length field, followed by contiguous memory slots containing primitive values or 32/64-bit object reference pointers.',
        example: 'int[100] occupies 16-byte header + 4-byte length + (100 * 4 bytes) + padding = ~424 bytes.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-strings',
    moduleKey: 'java',
    title: 'Strings, String Pool & Immutability',
    slug: 'strings',
    difficulty: 'beginner',
    duration: 14,
    order: 9,
    prerequisites: ['java-arrays'],
    tags: ['strings', 'string-pool', 'immutability', 'stringbuilder', 'text-blocks'],
    explanation: 'Deep dive into String immutability, the JVM String Constant Pool, performance of StringBuilder vs StringBuffer, and Java 15+ Text Blocks `"""`.',
    beginnerExplanation: 'When you create a word in Java, it is carved in stone. If you modify it, Java does not change the original word; it creates a brand new word in memory.',
    technicalExplanation: 'Strings are immutable objects backed by a byte array with compact encoding (LATIN1 vs UTF16). Literals are interned in the String Pool inside the Heap to prevent duplicate memory allocations.',
    keyPoints: [
      'Immutability benefits: Thread-safety, Security for DB connection strings, HashMap key stability',
      'String Constant Pool: Reuses identical literal strings via interning',
      'StringBuilder: Mutable non-thread-safe buffer for high-speed string assembly in loops',
      'Text Blocks: Multi-line string formatting with triple quotes `"""`'
    ],
    codeExample: `public class StringsDemo {
    public static void main(String[] args) {
        String s1 = "Knowhere";
        String s2 = "Knowhere";
        System.out.println("Same Pool Reference: " + (s1 == s2)); // true
        
        // Fast mutable string construction
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 3; i++) {
            sb.append("Lesson ").append(i).append("; ");
        }
        System.out.println("Output: " + sb.toString());
        
        // Modern Java Text Block
        String json = """
            {
                "module": "Java",
                "ready": true
            }
            """;
        System.out.println(json);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'StringBuilder sb = new StringBuilder();', token: 'StringBuilder', explanation: 'Avoids creating wasteful intermediate String objects during loop concatenation.' }
    ],
    quiz: [
      {
        id: 'q-j9',
        type: 'mcq',
        question: 'Why should you use StringBuilder instead of `+` concatenation inside a high-iteration loop?',
        options: ['StringBuilder is thread-safe', 'Concatenating with `+` creates O(n) temporary String objects in the Heap on every iteration', 'StringBuilder is synchronized', '`+` operator is deprecated'],
        answer: 1,
        explanation: 'Loop string concatenation with `+` allocates numerous discarded String objects, generating massive GC pressure.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j9',
        type: 'predict-output',
        question: 'What does `"hello".toUpperCase()` return?',
        answer: 'HELLO',
        hint: 'Returns uppercase copy.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j9',
        question: 'Why is String designed to be immutable in Java?',
        level: 'intermediate',
        answer: '1. Security: Sensitive strings (network sockets, database passwords, file paths) cannot be mutated maliciously. 2. Thread-Safety: Immutable objects can be shared across concurrent threads without locks. 3. HashCode Caching: Hash code is calculated once and cached, making Strings reliable HashMap keys. 4. String Pool: Allows sharing string literals across the entire JVM without duplicate memory.',
        example: 'If String was mutable, changing a string passed as a DB URL in one thread would alter it for all other threads.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'java-io',
    moduleKey: 'java',
    title: 'Input / Output Streams & Try-with-Resources',
    slug: 'io',
    difficulty: 'beginner',
    duration: 12,
    order: 10,
    prerequisites: ['java-strings'],
    tags: ['io', 'scanner', 'bufferedreader', 'try-with-resources', 'autocloseable'],
    explanation: 'Reading user input, processing byte and character streams (FileReader, BufferedReader), standard error streams, and automated resource cleanup with Java 7+ Try-with-Resources.',
    beginnerExplanation: 'I/O is how your program talks to the outside world: reading keystrokes from a user, writing to a text file, or sending data across a network cable.',
    technicalExplanation: 'Try-with-resources automatically closes any resource implementing `java.lang.AutoCloseable` upon block exit, preventing OS file descriptor and socket memory leaks even when unexpected exceptions occur.',
    keyPoints: [
      'AutoCloseable Interface: Automatically calls `close()` in reverse instantiation order',
      'BufferedReader vs Scanner: BufferedReader has a large 8KB default buffer for rapid file I/O',
      'System.in, System.out, System.err standard I/O streams'
    ],
    codeExample: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class IoDemo {
    public static void main(String[] args) {
        String data = "Java 25 LTS\\nSpring Boot 3\\nPostgreSQL";
        
        // Automated cleanup with try-with-resources
        try (BufferedReader reader = new BufferedReader(new StringReader(data))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Processing: " + line);
            }
        } catch (IOException e) {
            System.err.println("I/O Error: " + e.getMessage());
        }
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'try (BufferedReader reader = ...)', token: 'try-with-resources', explanation: 'Guarantees reader.close() is invoked even if an IOException is thrown.' }
    ],
    quiz: [
      {
        id: 'q-j10',
        type: 'mcq',
        question: 'What interface must a resource class implement to be managed by a try-with-resources statement?',
        options: ['java.io.Serializable', 'java.lang.AutoCloseable', 'java.lang.Cloneable', 'java.lang.Runnable'],
        answer: 1,
        explanation: 'try-with-resources accepts any object implementing AutoCloseable or Closeable.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-j10',
        type: 'predict-output',
        question: 'Which stream is used for standard error logging in Java?',
        answer: 'System.err',
        hint: 'Standard error stream output.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-j10',
        question: 'How does Try-with-Resources handle suppressed exceptions?',
        level: 'intermediate',
        answer: 'If both the try block and the auto-close operation throw exceptions, the primary exception from the try block is propagated to the caller, while the close() exception is attached as a "suppressed exception" retrievable via `e.getSuppressed()`.',
        example: 'Prevents resource closure exceptions from masking the true root cause exception.'
      }
    ],
    xpReward: 20
  }
];
