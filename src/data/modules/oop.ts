import type { Lesson } from '@/types';

export const OOP_LESSONS: Lesson[] = [
  {
    id: 'oop-classes-objects',
    moduleKey: 'oop',
    title: 'Classes, Objects, Constructors & Memory',
    slug: 'classes-objects',
    difficulty: 'beginner',
    duration: 10,
    order: 1,
    prerequisites: ['java-intro'],
    tags: ['oop', 'classes', 'objects', 'constructors', 'this'],
    explanation: 'A Class in Java is a blueprint or template defining the state (fields) and behavior (methods) of a concept. An Object is an active instance of that class allocated on the JVM Heap memory.',
    beginnerExplanation: 'Think of a class like an architect\'s blueprint for a house. The blueprint itself is not a house you can live in; but using that blueprint, you can build 100 real houses (objects), each with its own address, wall color, and occupants.',
    technicalExplanation: 'When `new ClassName()` executes, the JVM allocates memory in the Eden space of the Heap, initializes instance fields to default zero/null values, invokes the matching constructor bytecode (`<init>`), and returns a 64-bit reference address to the object.',
    keyPoints: [
      'Class: Blueprint defining fields and methods',
      'Object: Live memory instance allocated on the Heap',
      'Constructor: Special method with same name as class, runs during instantiation',
      'this keyword: Reference pointer to the current executing object instance',
      'Default constructor provided by compiler only if no explicit constructor exists'
    ],
    codeExample: `public class Developer {
    // State (Instance Fields)
    private String name;
    private String primarySkill;
    private int experienceYears;

    // Parameterized Constructor
    public Developer(String name, String primarySkill, int experienceYears) {
        this.name = name;
        this.primarySkill = primarySkill;
        this.experienceYears = experienceYears;
    }

    // Behavior (Instance Method)
    public void codeFeature(String featureName) {
        System.out.println(this.name + " is shipping " + featureName + " using " + this.primarySkill);
    }
}

// Object Instantiation in client code:
// Developer dev1 = new Developer("Alex", "Java 25", 4);
// dev1.codeFeature("Auth Service");`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public class Developer {', token: 'public class', explanation: 'Defines the Developer blueprint visible to other packages.' },
      { code: '    private String name;', token: 'private', explanation: 'Field access modifier ensuring state cannot be mutated externally without methods.' },
      { code: '    public Developer(String name, String primarySkill, int experienceYears) {', token: 'Constructor', explanation: 'Initializes new object state when called via the new keyword.' },
      { code: '        this.name = name;', token: 'this', explanation: 'Differentiates the instance field this.name from the local constructor parameter name.' }
    ],
    visualizer: 'jvm-compilation',
    quiz: [
      {
        id: 'q-oop-1',
        type: 'mcq',
        question: 'What happens when you define an explicit constructor in a Java class?',
        options: [
          'The compiler stops providing the default no-argument constructor',
          'The class becomes abstract and cannot be instantiated',
          'All fields become static automatically',
          'The JVM throws a CompilationError'
        ],
        answer: 0,
        explanation: 'Once any explicit constructor is defined, the Java compiler ceases to auto-generate the default no-arg constructor.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-oop-1',
        type: 'complete-method',
        question: 'Complete the constructor assignment using the `this` keyword.',
        code: `public class Server {
    private int port;
    public Server(int port) {
        // assign port here
    }
}`,
        answer: 'this.port = port;',
        hint: 'Use this.port to refer to the class field.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-oop-1',
        question: 'What is the purpose of constructor chaining using this() and super() in Java?',
        level: 'intermediate',
        answer: 'Constructor chaining allows one constructor to invoke another overloaded constructor in the same class using this(...), or invoke a parent class constructor using super(...). The call must always be the first statement in the constructor body.',
        example: 'public User(String name) { this(name, "DEFAULT_ROLE"); }'
      }
    ],
    xpReward: 20
  },
  {
    id: 'oop-encapsulation',
    moduleKey: 'oop',
    title: 'Encapsulation & Access Modifiers',
    slug: 'encapsulation',
    difficulty: 'beginner',
    duration: 10,
    order: 2,
    prerequisites: ['oop-classes-objects'],
    tags: ['oop', 'encapsulation', 'access-modifiers', 'data-hiding'],
    explanation: 'Encapsulation is the mechanism of wrapping data (variables) and code acting on the data (methods) together as a single unit, while restricting direct access to internal components.',
    beginnerExplanation: 'Imagine an ATM machine. You do not open the bank safe with a wrench to take money. Instead, you interact with the ATM screen keypad (public methods), which verifies your PIN and card balance before dispensing cash.',
    technicalExplanation: 'Encapsulation enforces data invariants and business validation rules. Fields are declared `private` and accessed via `public` accessors (getters) and mutators (setters). Access modifiers in Java are: `private` (class only), default/package-private (package only), `protected` (package + subclasses), and `public` (everywhere).',
    keyPoints: [
      'Data Hiding: Prevents unauthorized or invalid state modifications',
      'Validation: Mutators validate arguments before committing state updates',
      'Flexibility: Internal field representations can change without breaking client code',
      'Access Modifiers: private, default, protected, public'
    ],
    codeExample: `public class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative.");
        }
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public void withdraw(double amount) {
        if (amount <= 0 || amount > this.balance) {
            throw new IllegalStateException("Invalid withdrawal amount.");
        }
        this.balance -= amount;
    }

    public double getBalance() {
        return this.balance;
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '    private double balance;', token: 'private', explanation: 'Restricts direct balance manipulation from external classes.' },
      { code: '    public void withdraw(double amount) {', token: 'withdraw', explanation: 'Public mutator enforcing balance validity before deducting funds.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q-oop-enc-1',
        type: 'mcq',
        question: 'Which access modifier allows access within the same package and by subclasses in other packages?',
        options: ['private', 'default (package-private)', 'protected', 'public'],
        answer: 2,
        explanation: 'protected gives visibility to classes in the same package as well as subclasses located in external packages.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-oop-enc-1',
        type: 'find-bug',
        question: 'Identify the encapsulation violation in this class.',
        code: `public class User {
    public String passwordHash;
}`,
        answer: 'passwordHash should be private with secure accessor methods.',
        hint: 'Fields should not be declared public.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-oop-enc-1',
        question: 'Why is Encapsulation considered the cornerstone of robust object-oriented software design?',
        level: 'beginner',
        answer: 'Encapsulation decouples internal data structures from external APIs. It ensures classes remain in a valid state at all times by centralizing validation in methods, making code maintainable, testable, and resilient to breaking changes.',
        example: 'Setters validate input invariants before updating fields.'
      }
    ],
    xpReward: 20
  },
  {
    id: 'oop-inheritance',
    moduleKey: 'oop',
    title: 'Inheritance & the super Keyword',
    slug: 'inheritance',
    difficulty: 'beginner',
    duration: 12,
    order: 3,
    prerequisites: ['oop-encapsulation'],
    tags: ['oop', 'inheritance', 'extends', 'super', 'reusability'],
    explanation: 'Inheritance is an "is-a" relationship mechanism where a subclass inherits state and behaviors from a superclass using the `extends` keyword.',
    beginnerExplanation: 'Think of inheritance like family traits. A child inherits eye color and height from parents, but the child can also learn new unique skills like playing guitar or speaking multiple languages.',
    technicalExplanation: 'Java supports single class inheritance (`class B extends A`). All classes in Java implicitly inherit from `java.lang.Object`. Subclass constructors invoke `super()` implicitly or explicitly as their first instruction to ensure parent state is properly initialized.',
    keyPoints: [
      'Code Reusability: Common fields and methods live in the superclass',
      'Single Inheritance: A class can extend only one superclass in Java',
      'super keyword: Used to call parent constructor or superclass methods',
      'final classes: Cannot be extended (e.g., java.lang.String)'
    ],
    codeExample: `// Superclass
public class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public double calculatePay() {
        return this.baseSalary;
    }
}

// Subclass
public class SoftwareEngineer extends Employee {
    private double bonus;

    public SoftwareEngineer(String name, double baseSalary, double bonus) {
        super(name, baseSalary); // Call superclass constructor
        this.bonus = bonus;
    }

    @Override
    public double calculatePay() {
        return super.calculatePay() + this.bonus;
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public class SoftwareEngineer extends Employee {', token: 'extends', explanation: 'Establishes that SoftwareEngineer is-an Employee.' },
      { code: '        super(name, baseSalary);', token: 'super()', explanation: 'Delegates initialization of name and baseSalary to Employee constructor.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q-oop-inh-1',
        type: 'mcq',
        question: 'What is the top-level root class for all classes in Java?',
        options: ['java.lang.Class', 'java.lang.Object', 'java.lang.System', 'java.lang.Base'],
        answer: 1,
        explanation: 'Every class in Java directly or indirectly extends java.lang.Object.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-oop-inh-1',
        type: 'predict-output',
        question: 'What does this code output?',
        code: `class Parent { Parent() { System.out.print("P "); } }
class Child extends Parent { Child() { System.out.print("C "); } }
new Child();`,
        answer: 'P C ',
        hint: 'Parent constructor executes before child constructor.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-oop-inh-1',
        question: 'Why does Java disallow multiple inheritance with classes?',
        level: 'intermediate',
        answer: 'To prevent ambiguity known as the Diamond Problem, where a class inherits conflicting implementations of the same method from two different parent classes. Java resolves this by allowing multiple inheritance of types through Interfaces.',
        example: 'Interfaces with default methods resolve conflicts explicitly using InterfaceName.super.method().'
      }
    ],
    xpReward: 20
  },
  {
    id: 'oop-polymorphism',
    moduleKey: 'oop',
    title: 'Polymorphism & Dynamic Method Dispatch',
    slug: 'polymorphism',
    difficulty: 'intermediate',
    duration: 12,
    order: 4,
    prerequisites: ['oop-inheritance'],
    tags: ['oop', 'polymorphism', 'overriding', 'dynamic-dispatch', 'vtable'],
    explanation: 'Polymorphism allows one interface or reference type to take many forms at runtime. Method overriding paired with dynamic method dispatch enables runtime selection of concrete behavior.',
    beginnerExplanation: 'Think of a universal remote control with a "Power" button. When you point it at a TV, speaker, or projector, pressing "Power" turns on each device according to its own internal mechanism.',
    technicalExplanation: 'The JVM resolves overridden instance method calls at runtime using a virtual method table (vtable). The actual method executed is determined by the runtime class of the object stored on the Heap, not the reference type on the Stack.',
    keyPoints: [
      'Compile-time Polymorphism: Method Overloading (same name, distinct parameter lists)',
      'Runtime Polymorphism: Method Overriding (subclass overrides parent method with identical signature)',
      'vtable: JVM table mapping virtual method offsets to concrete memory addresses',
      'Static, private, and final methods cannot be overridden'
    ],
    codeExample: `public interface MessageService {
    void sendMessage(String recipient, String message);
}

public class EmailService implements MessageService {
    @Override
    public void sendMessage(String recipient, String message) {
        System.out.println("Emailing " + recipient + ": " + message);
    }
}

public class SlackService implements MessageService {
    @Override
    public void sendMessage(String recipient, String message) {
        System.out.println("Posting to Slack #" + recipient + ": " + message);
    }
}

// Client utilizes interface reference:
// MessageService svc = new SlackService();
// svc.sendMessage("dev-team", "Build Passed!");`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public interface MessageService {', token: 'interface', explanation: 'Contract declaring polymorphic method signatures.' },
      { code: '    @Override', token: '@Override', explanation: 'Ensures the compiler validates the overridden signature.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q-oop-poly-1',
        type: 'mcq',
        question: 'Which of the following methods CANNOT be overridden in Java?',
        options: ['public void execute()', 'protected int compute()', 'public final void lock()', 'void render()'],
        answer: 2,
        explanation: 'Methods marked with the final keyword cannot be overridden by subclasses.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-oop-poly-1',
        type: 'predict-output',
        question: 'What is printed by this snippet?',
        code: `class Shape { void draw() { System.out.print("Shape "); } }
class Circle extends Shape { void draw() { System.out.print("Circle "); } }
Shape s = new Circle();
s.draw();`,
        answer: 'Circle ',
        hint: 'Dynamic dispatch resolves to the Heap object type Circle.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-oop-poly-1',
        question: 'What is the difference between Method Overloading and Method Overriding?',
        level: 'beginner',
        answer: 'Method Overloading happens at compile time in the same class (same name, different parameter types/count, return type alone does not differentiate). Method Overriding happens at runtime in a subclass (identical name, identical parameters, covariant return type allowed).',
        example: 'overload: add(int, int) and add(double, double) vs override: @Override public String toString()'
      }
    ],
    xpReward: 20
  },
  {
    id: 'oop-abstraction-interfaces',
    moduleKey: 'oop',
    title: 'Abstraction, Abstract Classes & Interfaces',
    slug: 'abstraction-interfaces',
    difficulty: 'intermediate',
    duration: 14,
    order: 5,
    prerequisites: ['oop-polymorphism'],
    tags: ['oop', 'abstraction', 'interfaces', 'default-methods', 'contracts'],
    explanation: 'Abstraction hides implementation complexity and exposes only essential contract specifications. Java provides abstract classes and interfaces to construct layered architectures.',
    beginnerExplanation: 'When you drive a car, you press the gas pedal to accelerate. You do not need to know how fuel injection timing and spark plugs work under the hood. The pedal is the abstract interface.',
    technicalExplanation: 'An `abstract class` can hold state (fields), constructors, and both abstract and concrete methods. An `interface` defines behavior contracts and can contain abstract methods, `default` methods (Java 8+), `static` methods, and `private` helper methods (Java 9+). Classes can implement multiple interfaces.',
    keyPoints: [
      'Abstract classes cannot be directly instantiated with new',
      'Interfaces enable loose coupling and multiple behavior inheritance',
      'default methods in interfaces allow backward-compatible API evolution',
      'Functional Interfaces have exactly one abstract method (SAM) and work with lambdas'
    ],
    codeExample: `// Abstract Base with Template Method Pattern
public abstract class ReportGenerator {
    // Template Method
    public final void generateReport() {
        fetchData();
        formatOutput();
        exportFile();
    }

    protected abstract void fetchData();
    protected abstract void formatOutput();

    private void exportFile() {
        System.out.println("Exporting report to disk.");
    }
}

// Interface Contract
public interface Schedulable {
    void scheduleJob(String cronExpression);

    default void cancelJob() {
        System.out.println("Job cancelled default handler.");
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public abstract class ReportGenerator {', token: 'abstract class', explanation: 'Class that cannot be directly instantiated, designed for extension.' },
      { code: '    protected abstract void fetchData();', token: 'abstract void', explanation: 'Forces concrete subclasses to supply their own implementation.' },
      { code: '    default void cancelJob() {', token: 'default', explanation: 'Provides an optional default implementation in an interface.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q-oop-abs-1',
        type: 'mcq',
        question: 'When should you prefer an Abstract Class over an Interface in modern Java?',
        options: [
          'When you need to share state (non-static mutable fields) or common constructor logic',
          'When you need multiple inheritance',
          'When using lambda expressions',
          'Whenever building REST APIs'
        ],
        answer: 0,
        explanation: 'Abstract classes are preferred when subclasses must inherit instance state or constructor initializations.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-oop-abs-1',
        type: 'find-bug',
        question: 'Why does this code fail to compile?',
        code: `public abstract class Engine {}
Engine e = new Engine();`,
        answer: 'Cannot instantiate an abstract class directly.',
        hint: 'Abstract classes cannot be initialized with the new keyword.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-oop-abs-1',
        question: 'What are Default Methods in Java Interfaces and why were they introduced?',
        level: 'intermediate',
        answer: 'Default methods (introduced in Java 8) allow interfaces to define method bodies with the default keyword. They were introduced to enable interface evolution (such as adding forEach() and stream() to Collection) without breaking existing third-party implementations.',
        example: 'default void log() { System.out.println("Default log"); }'
      }
    ],
    xpReward: 20
  },
  {
    id: 'oop-records-immutability',
    moduleKey: 'oop',
    title: 'Modern Java Records & Immutability Patterns',
    slug: 'records-immutability',
    difficulty: 'intermediate',
    duration: 12,
    order: 6,
    prerequisites: ['oop-abstraction-interfaces'],
    tags: ['oop', 'records', 'immutability', 'java25', 'dto'],
    explanation: 'Java Records are transparent, shallowly immutable data carriers that eliminate boilerplate getters, constructors, equals(), hashCode(), and toString() methods.',
    beginnerExplanation: 'Writing a standard data class used to require 50 lines of repetitive boilerplate code. With Java Records, you define your data in a single clean line: `public record User(Long id, String name) {}`.',
    technicalExplanation: 'Records implicitly extend `java.lang.Record`. All component fields are `private final`. Records cannot extend other classes, cannot declare instance fields outside the header, but can implement interfaces and define static fields/methods.',
    keyPoints: [
      'Shallow Immutability: Component references are final and unmodifiable',
      'Canonical Constructor: Automatically generated from header components',
      'Compact Constructor: Allows validation and normalization without duplicating field assignments',
      'Built-in value-based equality via equals() and hashCode()'
    ],
    codeExample: `// Modern Immutable Record DTO
public record PaymentRequest(String transactionId, double amount, String currency) {
    // Compact Constructor for Invariant Validation
    public PaymentRequest {
        if (transactionId == null || transactionId.isBlank()) {
            throw new IllegalArgumentException("Transaction ID is required");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        currency = currency.toUpperCase(); // normalization
    }

    // Custom helper method inside record
    public boolean isUsd() {
        return "USD".equals(this.currency);
    }
}

// Usage:
// PaymentRequest req = new PaymentRequest("tx-101", 99.50, "usd");
// System.out.println(req.amount()); // 99.50 (Accessor syntax without 'get')`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public record PaymentRequest(String transactionId, double amount, String currency) {', token: 'record', explanation: 'Creates immutable class with final fields, canonical constructor, and accessors.' },
      { code: '    public PaymentRequest {', token: 'Compact Constructor', explanation: 'Runs validation before assigning parameters to final fields.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q-oop-rec-1',
        type: 'mcq',
        question: 'What is the naming convention for accessor methods on a Java Record?',
        options: ['getId()', 'id()', 'fetchId()', 'valueId()'],
        answer: 1,
        explanation: 'Record accessors match the component name directly (e.g. user.name() instead of user.getName()).',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-oop-rec-1',
        type: 'choose-correct',
        question: 'Can a Java Record declare additional non-static instance fields inside its body?',
        code: '',
        answer: 'No, records cannot declare additional instance fields.',
        hint: 'All instance fields must be declared in the record header.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-oop-rec-1',
        question: 'How do Java Records differ from Lombok @Value or @Data annotations?',
        level: 'intermediate',
        answer: 'Java Records are native first-class JVM constructs with official serialization protocols, pattern matching destructuring, and reflection support (isRecord()), whereas Lombok relies on compile-time annotation processing to generate traditional class bytecode.',
        example: 'Records participate natively in pattern matching: if (obj instanceof User(var id, var name))'
      }
    ],
    xpReward: 25
  },
  {
    id: 'oop-sealed-classes',
    moduleKey: 'oop',
    title: 'Sealed Classes & Pattern Matching',
    slug: 'sealed-classes',
    difficulty: 'advanced',
    duration: 14,
    order: 7,
    prerequisites: ['oop-records-immutability'],
    tags: ['oop', 'sealed-classes', 'pattern-matching', 'algebraic-types', 'java25'],
    explanation: 'Sealed classes and interfaces restrict which other classes or interfaces may extend or implement them, enabling safe domain modeling and exhaustive pattern matching in switch statements.',
    beginnerExplanation: 'Normally, anyone can extend your public class. With a Sealed class, you say: "Only Triangle, Circle, and Square are allowed to extend Shape, and no other shape can ever exist in this system."',
    technicalExplanation: 'A sealed class declares permitted subclasses using `permits`. Permitted subclasses must be `final`, `sealed`, or `non-sealed`. This enables algebraic data types (ADT) and allows the Java compiler to verify exhaustiveness in switch expressions without requiring a `default` branch.',
    keyPoints: [
      'sealed keyword: Declares explicit permitted hierarchy with permits clause',
      'Subclass Modifiers: Permitted subclasses must be final, sealed, or non-sealed',
      'Exhaustive Pattern Matching: Compiler enforces coverage of all possible types in switch',
      'Domain Modeling: Perfect for state machines, AST nodes, and API result types'
    ],
    codeExample: `// Sealed Domain Result Model
public sealed interface ServiceResult<T> permits ServiceResult.Success, ServiceResult.Failure {
    record Success<T>(T data, long timestamp) implements ServiceResult<T> {}
    record Failure<T>(String errorCode, String errorMessage) implements ServiceResult<T> {}
}

// Exhaustive Pattern Matching in Java 25
public class ResultProcessor {
    public static void handle(ServiceResult<String> result) {
        String outcome = switch (result) {
            case ServiceResult.Success<String>(var data, var ts) -> "Data: " + data + " at " + ts;
            case ServiceResult.Failure<String>(var code, var msg) -> "Error [" + code + "]: " + msg;
            // No default branch needed! Compiler proves exhaustiveness.
        };
        System.out.println(outcome);
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'public sealed interface ServiceResult<T> permits ServiceResult.Success, ServiceResult.Failure {', token: 'sealed ... permits', explanation: 'Restricts implementations strictly to Success and Failure.' },
      { code: '        String outcome = switch (result) {', token: 'pattern matching switch', explanation: 'Exhaustively matches record patterns and deconstructs component variables.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q-oop-sea-1',
        type: 'mcq',
        question: 'What happens in a pattern matching switch over a sealed hierarchy if all permitted types are covered?',
        options: [
          'A default branch is still strictly mandatory',
          'The compiler verifies exhaustiveness and omits the default clause requirement',
          'The code fails bytecode verification',
          'It throws a RuntimeException'
        ],
        answer: 1,
        explanation: 'Because the compiler knows all permitted subtypes of a sealed hierarchy, it proves exhaustiveness without a default branch.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-oop-sea-1',
        type: 'complete-method',
        question: 'Which modifier must a permitted subclass of a sealed class specify if it wants to open up for further extension?',
        code: `public non-sealed class OpenSubclass extends BaseSealed {}`,
        answer: 'non-sealed',
        hint: 'Use the non-sealed keyword.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-oop-sea-1',
        question: 'How do Sealed Classes enhance domain-driven architecture in Java?',
        level: 'advanced',
        answer: 'Sealed classes allow developers to create closed type hierarchies representing sum types / algebraic data types. They model domain states with mathematical completeness, eliminating defensive default cases and preventing unauthorized subclasses from violating domain invariants.',
        example: 'sealed interface OrderState permits Pending, Shipped, Delivered, Cancelled'
      }
    ],
    xpReward: 25
  },
  {
    id: 'oop-solid-principles',
    moduleKey: 'oop',
    title: 'SOLID Design Principles & Clean Architecture',
    slug: 'solid-principles',
    difficulty: 'advanced',
    duration: 15,
    order: 8,
    prerequisites: ['oop-sealed-classes'],
    tags: ['oop', 'solid', 'architecture', 'clean-code', 'design-patterns'],
    explanation: 'The five SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) guide maintainable, extensible software architecture.',
    beginnerExplanation: 'SOLID is a checklist for writing clean code that doesn\'t become a messy tangled ball of yarn as your application grows over the years.',
    technicalExplanation: 'Single Responsibility Principle (SRP): A class should have one reason to change. Open/Closed Principle (OCP): Open for extension, closed for modification. Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types. Interface Segregation Principle (ISP): Clients should not depend on interfaces they do not use. Dependency Inversion Principle (DIP): High-level modules should depend on abstractions, not concrete implementations.',
    keyPoints: [
      'S: Single Responsibility Principle (SRP)',
      'O: Open/Closed Principle (OCP)',
      'L: Liskov Substitution Principle (LSP)',
      'I: Interface Segregation Principle (ISP)',
      'D: Dependency Inversion Principle (DIP) - Core to Spring Framework'
    ],
    codeExample: `// Dependency Inversion Principle (DIP) in Practice
// Abstraction contract
public interface NotificationChannel {
    void dispatch(String recipient, String message);
}

// High-level service depends on abstraction
public class OrderNotificationService {
    private final NotificationChannel channel;

    // Injected via constructor (Loose coupling)
    public OrderNotificationService(NotificationChannel channel) {
        this.channel = channel;
    }

    public void notifyCustomer(String customerEmail, String orderId) {
        channel.dispatch(customerEmail, "Your order #" + orderId + " is confirmed.");
    }
}

// Concrete Implementations (easily swapped or mocked in unit tests)
public class EmailChannel implements NotificationChannel {
    @Override
    public void dispatch(String recipient, String message) { /* send SMTP */ }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '    public OrderNotificationService(NotificationChannel channel) {', token: 'Dependency Inversion', explanation: 'High-level business service depends on the interface abstraction, not concrete email/SMS clients.' }
    ],
    visualizer: 'oop-inheritance',
    quiz: [
      {
        id: 'q-oop-sol-1',
        type: 'mcq',
        question: 'Which SOLID principle is directly implemented by Spring Boot\'s Dependency Injection container?',
        options: [
          'Single Responsibility Principle',
          'Open/Closed Principle',
          'Liskov Substitution Principle',
          'Dependency Inversion Principle'
        ],
        answer: 3,
        explanation: 'Dependency Inversion Principle (DIP) states that high-level modules should depend on abstractions, which Spring achieves via Inversion of Control (IoC) and Dependency Injection.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-oop-sol-1',
        type: 'choose-correct',
        question: 'Which principle is violated if a class handles both Database Persistence and PDF Invoice Rendering?',
        code: '',
        answer: 'Single Responsibility Principle (SRP)',
        hint: 'It has more than one reason to change.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-oop-sol-1',
        question: 'Explain the Liskov Substitution Principle (LSP) and how violating it causes runtime bugs.',
        level: 'advanced',
        answer: 'LSP states that objects of a superclass should be replaceable with objects of its subclasses without altering the correctness of the program. A classic violation is a Square class extending Rectangle where overriding setWidth() also modifies height, breaking client assumptions that width and height can vary independently.',
        example: 'Subclasses must honor the pre-conditions and post-conditions of the parent contract.'
      }
    ],
    xpReward: 30
  }
];
