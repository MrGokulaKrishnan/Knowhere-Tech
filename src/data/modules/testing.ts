import type { Lesson } from '@/types';

export const TESTING_LESSONS: Lesson[] = [
  {
    id: 'test-junit',
    moduleKey: 'testing',
    title: 'JUnit 5 — Writing Reliable Unit Tests',
    slug: 'junit',
    difficulty: 'beginner',
    duration: 14,
    order: 1,
    prerequisites: [],
    tags: ['junit5', 'unit-testing', 'assertions', 'test-driven-development', 'spring-boot-test'],
    explanation: 'JUnit 5 is the de facto standard testing framework for Java. Unit tests verify that individual methods and classes work correctly in isolation. Well-tested code enables confident refactoring, catches regressions, and serves as living documentation of how your code is supposed to behave.',
    beginnerExplanation: 'A unit test is like a quality control inspector at a factory. Before a product (your method) leaves the production line, the inspector checks: "Does this method do exactly what it\'s supposed to do?" JUnit gives you the tools to write these inspections. If you change the method later and the test fails, you immediately know something broke — without having to test everything manually.',
    technicalExplanation: 'JUnit 5 consists of three modules: JUnit Platform (test engine), JUnit Jupiter (new API with @Test, @BeforeEach, etc.), and JUnit Vintage (backward compatibility with JUnit 4). Test lifecycle: @BeforeAll (once before all tests), @BeforeEach (before each test), @Test (test method), @AfterEach (after each), @AfterAll (once after all). Assertions use static methods from org.junit.jupiter.api.Assertions. @ParameterizedTest + @ValueSource enable data-driven tests.',
    keyPoints: [
      '@Test: Marks a method as a test case — JUnit discovers and runs it automatically',
      '@BeforeEach: Runs before EVERY test method — use to reset state, create fresh objects',
      '@AfterEach: Runs after every test — cleanup, close resources',
      '@BeforeAll / @AfterAll: Runs once for the entire test class — must be static',
      'assertEquals(expected, actual): Fails test if values don\'t match',
      'assertThrows(Exception.class, () -> code): Verifies code throws expected exception',
      'assertNotNull(object): Fails if object is null',
      'TDD Red-Green-Refactor: Write failing test → make it pass → clean up code'
    ],
    codeExample: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

// Class under test
class Calculator {
    public int add(int a, int b) { return a + b; }
    public int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Cannot divide by zero");
        return a / b;
    }
}

// Test class (convention: ClassName + Test)
class CalculatorTest {

    private Calculator calculator;   // Object under test

    @BeforeEach   // Runs before EACH test — fresh calculator every time
    void setUp() {
        calculator = new Calculator();
    }

    @Test
    @DisplayName("Adding two positive numbers returns correct sum")
    void add_twoPositiveNumbers_returnsSum() {
        // Arrange — set up test data
        int a = 5, b = 3;

        // Act — execute the method being tested
        int result = calculator.add(a, b);

        // Assert — verify the outcome
        assertEquals(8, result, "5 + 3 should equal 8");
    }

    @Test
    @DisplayName("Dividing by zero throws ArithmeticException")
    void divide_byZero_throwsArithmeticException() {
        // assertThrows verifies the EXACT exception type is thrown
        ArithmeticException ex = assertThrows(
            ArithmeticException.class,
            () -> calculator.divide(10, 0)
        );
        assertEquals("Cannot divide by zero", ex.getMessage());
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 5, 100})
    @DisplayName("Adding any number to zero returns the number itself")
    void add_anyNumberToZero_returnsSameNumber(int number) {
        assertEquals(number, calculator.add(number, 0));
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '@BeforeEach\nvoid setUp() { calculator = new Calculator(); }', token: '@BeforeEach', explanation: 'Creates a fresh Calculator instance before EACH test. This ensures tests are isolated — one test\'s side effects cannot affect another. Never share mutable state between tests.' },
      { code: 'assertEquals(8, result, "5 + 3 should equal 8");', token: 'assertEquals', explanation: 'First arg = expected value, Second = actual result, Third (optional) = message shown when test fails. Always put expected first — it\'s a JUnit convention.' },
      { code: 'assertThrows(ArithmeticException.class, () -> calculator.divide(10, 0))', token: 'assertThrows', explanation: 'Verifies that executing the lambda throws the specified exception. The lambda (() ->) wraps the code that should throw. Returns the exception so you can assert on its message too.' },
      { code: '@ParameterizedTest\n@ValueSource(ints = {1, 2, 3, 5, 100})', token: '@ParameterizedTest', explanation: 'Runs the same test multiple times with different inputs. @ValueSource supplies the values. Much better than copy-pasting the same test with different numbers.' }
    ],
    quiz: [
      {
        id: 'q-test-1',
        type: 'mcq',
        question: 'What is the purpose of @BeforeEach in JUnit 5?',
        options: [
          'It runs the annotated method before the entire test class begins (once)',
          'It marks a method as the main test to run',
          'It runs the annotated method before EACH individual test method',
          'It skips the test if a condition is not met'
        ],
        answer: 2,
        explanation: '@BeforeEach runs before EVERY single @Test method in the class. Its primary purpose is to create a fresh, clean state (new object instances) before each test so tests don\'t affect each other. @BeforeAll (which must be static) runs only once before all tests.',
        points: 15
      },
      {
        id: 'q-test-2',
        type: 'mcq',
        question: 'In JUnit 5\'s assertEquals(expected, actual), which argument goes first?',
        options: [
          'The actual result from your method goes first',
          'The expected value goes first, actual result goes second',
          'The order doesn\'t matter for assertEquals',
          'A custom message always goes first'
        ],
        answer: 1,
        explanation: 'Convention: assertEquals(EXPECTED, ACTUAL). The expected value (what you think it should be) goes first, the actual result (what your code returned) goes second. This matters because when a test fails, JUnit reports "expected: <X> but was: <Y>" — confusing those makes error messages misleading.',
        points: 15
      },
      {
        id: 'q-test-3',
        type: 'mcq',
        question: 'What does the AAA pattern stand for in unit testing?',
        options: [
          'Analyze, Apply, Assert',
          'Arrange, Act, Assert',
          'Automate, Annotate, Assure',
          'All, Any, Assert'
        ],
        answer: 1,
        explanation: 'AAA = Arrange (set up test data and objects), Act (call the method being tested), Assert (verify the result is what you expected). This pattern makes tests readable and structured. Every well-written unit test follows this three-phase structure.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p-test-1',
        type: 'find-bug',
        question: 'What is wrong with this test?\n@Test\nvoid testAdd() {\n    Calculator calc = new Calculator();\n    int result = calc.add(2, 3);\n    System.out.println("Result: " + result);\n}',
        code: '@Test\nvoid testAdd() {\n    Calculator calc = new Calculator();\n    int result = calc.add(2, 3);\n    System.out.println("Result: " + result);\n}',
        answer: 'No assertion! The test will always PASS even if add() returns the wrong value. Replace System.out.println with: assertEquals(5, result, "2 + 3 should equal 5"); A test without an assertion is not a test — it\'s just code that runs.',
        hint: 'What tells JUnit whether the test passed or failed?'
      },
      {
        id: 'p-test-2',
        type: 'complete-method',
        question: 'Complete this test to verify that findById() throws NotFoundException when the user doesn\'t exist:\n@Test\nvoid findById_nonExistentUser_throwsNotFoundException() {\n    // Write the assertThrows call here\n    // userService.findById(999L) should throw NotFoundException\n}',
        answer: 'assertThrows(NotFoundException.class, () -> userService.findById(999L));\n\nOr with message assertion:\nNotFoundException ex = assertThrows(\n    NotFoundException.class,\n    () -> userService.findById(999L)\n);\nassertEquals("User not found with id: 999", ex.getMessage());',
        hint: 'Use assertThrows(ExceptionType.class, () -> methodThatShouldThrow())'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-test-1',
        question: 'Explain the Test-Driven Development (TDD) cycle.',
        level: 'intermediate',
        answer: 'TDD follows a Red-Green-Refactor cycle:\n1. RED: Write a failing test for the functionality you want to add. It must fail first — if it passes immediately, you\'re not testing anything new.\n2. GREEN: Write the minimum code necessary to make the test pass. Don\'t worry about elegance yet.\n3. REFACTOR: Clean up the code — remove duplication, improve naming, extract methods — while keeping all tests passing.\nThis cycle keeps code tested, focused, and minimal. Tests become a specification that drives design.',
        example: '1. Write test: assertEquals(5, calc.add(2,3)) → RED (method doesn\'t exist)\n2. Add add() method returning 5 → GREEN\n3. Make it proper: return a + b → REFACTOR'
      }
    ],
    xpReward: 50
  },
  {
    id: 'test-mockito',
    moduleKey: 'testing',
    title: 'Mockito — Mocking Dependencies in Unit Tests',
    slug: 'mockito',
    difficulty: 'intermediate',
    duration: 15,
    order: 2,
    prerequisites: ['test-junit'],
    tags: ['mockito', 'mocking', 'unit-testing', 'verify', 'when-thenreturn', 'stubbing', 'spy'],
    explanation: 'Mockito is the most popular Java mocking framework. When unit testing a service, you don\'t want to actually hit the database or call external APIs — that would make tests slow, unreliable, and hard to isolate. Mockito creates fake "mock" objects that simulate dependencies, letting you test your logic in complete isolation.',
    beginnerExplanation: 'When testing your OrderService, you don\'t actually want to send real emails or charge real credit cards. Instead, you use Mockito to create a "fake" EmailService that records what messages it received, and a "fake" PaymentService that always returns success. Your OrderService thinks it\'s talking to real services — but you\'re in full control. It\'s like rehearsing a play with stand-ins instead of the real actors.',
    technicalExplanation: 'Mockito uses bytecode manipulation (cglib/ByteBuddy) to create subclasses/proxy implementations of your types at runtime. @Mock creates a mock where all methods return default values (null, 0, false). @InjectMocks creates the class under test and injects @Mock/@Spy fields into it. when().thenReturn() stubs method behavior. verify() asserts that specific interactions happened. @Spy wraps real objects, letting you stub specific methods while calling real implementations for others.',
    keyPoints: [
      '@Mock: Creates a mock object — all methods return default values unless stubbed',
      '@InjectMocks: Creates the class being tested and injects @Mock fields into it',
      '@ExtendWith(MockitoExtension.class): Activates Mockito annotations in JUnit 5',
      'when(mock.method(arg)).thenReturn(value): Stubs what a mock returns when called',
      'when(mock.method()).thenThrow(new Exception()): Makes the mock throw an exception',
      'verify(mock).method(arg): Asserts that the method was called with specific arguments',
      'verify(mock, times(2)).method(): Asserts method was called exactly twice',
      'ArgumentCaptor: Captures arguments passed to mocked methods for assertions'
    ],
    codeExample: `import org.junit.jupiter.api.*;
import org.mockito.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)   // Enables @Mock and @InjectMocks
class OrderServiceTest {

    @Mock
    private UserRepository userRepository;    // Fake repo — no database

    @Mock
    private EmailService emailService;        // Fake email — no real emails

    @InjectMocks
    private OrderService orderService;        // Real class, gets mocks injected

    @Test
    @DisplayName("Creating order sends confirmation email to user")
    void createOrder_validOrder_sendsConfirmationEmail() {
        // Arrange — stub the mock's behavior
        User mockUser = new User(1L, "Alice", "alice@example.com");
        when(userRepository.findById(1L))
            .thenReturn(Optional.of(mockUser));  // Return fake user

        CreateOrderRequest request = new CreateOrderRequest(1L, List.of("item1", "item2"));

        // Act — execute real service logic
        Order result = orderService.createOrder(request);

        // Assert — verify outcome
        assertNotNull(result);
        assertEquals(1L, result.getUserId());

        // Verify interaction: email was sent with correct address
        verify(emailService).sendOrderConfirmation("alice@example.com", result);
        verify(emailService, times(1)).sendOrderConfirmation(any(), any());
    }

    @Test
    @DisplayName("Creating order for non-existent user throws UserNotFoundException")
    void createOrder_userNotFound_throwsException() {
        // Stub: repository returns empty for user ID 99
        when(userRepository.findById(99L))
            .thenReturn(Optional.empty());

        CreateOrderRequest request = new CreateOrderRequest(99L, List.of("item1"));

        // Verify service throws the right exception
        assertThrows(UserNotFoundException.class,
            () -> orderService.createOrder(request));

        // Email should NEVER be sent if user doesn't exist
        verify(emailService, never()).sendOrderConfirmation(any(), any());
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '@Mock\nprivate UserRepository userRepository;', token: '@Mock', explanation: 'Creates a mock UserRepository. No actual database is touched — all method calls return null/empty by default unless you stub them with when().' },
      { code: '@InjectMocks\nprivate OrderService orderService;', token: '@InjectMocks', explanation: 'Creates a real OrderService instance and automatically injects all @Mock fields into it via constructor/setter/field injection. This is how your service gets fake collaborators.' },
      { code: 'when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));', token: 'when().thenReturn()', explanation: 'Stubbing: "when findById is called with argument 1L, return this Optional containing mockUser." Without this, findById would return null.' },
      { code: 'verify(emailService, never()).sendOrderConfirmation(any(), any());', token: 'verify(_, never())', explanation: 'Asserts sendOrderConfirmation was called zero times. "any()" matches any argument of that type. Essential for confirming your error paths don\'t accidentally send emails.' }
    ],
    quiz: [
      {
        id: 'q-test-4',
        type: 'mcq',
        question: 'What is the main purpose of using Mockito mocks in unit tests?',
        options: [
          'To make tests run faster on slower hardware',
          'To test the database and external services together in one test',
          'To isolate the class under test from its real dependencies (DB, APIs, etc.)',
          'To automatically generate test data from production'
        ],
        answer: 2,
        explanation: 'Mocks replace real dependencies (database, email service, payment gateway) with fake objects you control. This isolates the unit you\'re testing — testing your OrderService logic independently from whether the database or email server is working. Tests become fast, deterministic, and reliable.',
        points: 20
      },
      {
        id: 'q-test-5',
        type: 'mcq',
        question: 'What does "verify(emailService, times(2)).sendEmail(any())" assert?',
        options: [
          'The emailService is not null and has exactly 2 methods',
          'sendEmail() was called at least 2 times',
          'sendEmail() was called exactly 2 times with any argument',
          'The email was delivered to 2 recipients successfully'
        ],
        answer: 2,
        explanation: 'verify(mock, times(N)).method(args) asserts that the method was called EXACTLY N times. times(2) means the mock\'s sendEmail() must have been invoked exactly twice — not once, not three times. any() matches any argument value.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-test-3',
        type: 'complete-method',
        question: 'Stub the productRepository to throw ProductNotFoundException when findById is called with ID 999:\n// when(productRepository.findById(999L)) → should throw ProductNotFoundException',
        answer: 'when(productRepository.findById(999L))\n    .thenThrow(new ProductNotFoundException("Product not found: 999"));\n\n// Then in the test:\nassertThrows(ProductNotFoundException.class,\n    () -> productService.getProductById(999L));',
        hint: 'Use thenThrow() instead of thenReturn() to simulate exceptions'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-test-2',
        question: 'What is the difference between @Mock and @Spy in Mockito?',
        level: 'intermediate',
        answer: '@Mock creates a complete fake — all methods return default values (null, 0, false) unless stubbed. It does NOT call real method implementations. @Spy wraps a real object — by default it calls the REAL methods, but you can stub specific methods to return fake values. Use @Mock when you want full control over a dependency. Use @Spy when you want to test a mostly-real object but need to override specific expensive/slow operations.',
        example: '@Mock UserRepository — all methods fake, never touches DB\n@Spy UserService — real methods run, but you can stub userService.calculateDiscount() to return 50 without real logic'
      }
    ],
    xpReward: 60
  }
];
