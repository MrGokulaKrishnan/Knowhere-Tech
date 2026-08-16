import type { Lesson } from '@/types';

export const SPRING_LESSONS: Lesson[] = [
  {
    id: 'spring-ioc-di',
    moduleKey: 'spring',
    title: 'Spring Framework: IoC & Dependency Injection',
    slug: 'ioc',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['spring', 'ioc', 'dependency-injection', 'beans', 'autowired'],
    explanation: 'Inversion of Control (IoC) delegates object instantiation and lifecycle management to the Spring Container (ApplicationContext). Dependency Injection (DI) wires collaborating objects together.',
    beginnerExplanation: 'Instead of having your house build its own electric power plant (`new PowerPlant()`), you simply plug into the wall outlet. The power company (Spring) creates and manages the power source for you automatically.',
    technicalExplanation: 'The Spring IoC Container reads component annotations (`@Component`, `@Service`, `@Repository`, `@Configuration`), instantiates beans in the BeanFactory, handles circular dependency detection, and injects dependencies via Constructor Injection (the recommended production approach) ensuring immutability and easy test isolation.',
    keyPoints: [
      'IoC Container manages entire bean lifecycles: Instantiate -> Populate -> Initialize -> Destroy',
      'Prefer Constructor Injection over Field Injection (@Autowired on fields is discouraged)',
      'Bean Scopes: Singleton (default, one per container), Prototype, Request, Session',
      '@Configuration + @Bean for external third-party library configuration'
    ],
    codeExample: `// Production-Grade Constructor Injection (Spring Boot 3+)
@Service
public class OrderService {

    private final PaymentGateway paymentGateway;
    private final OrderRepository orderRepository;

    // In modern Spring, @Autowired is optional on single constructors!
    public OrderService(PaymentGateway paymentGateway, OrderRepository orderRepository) {
        this.paymentGateway = paymentGateway;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public OrderResponse processOrder(OrderRequest request) {
        // Business logic execution
        PaymentReceipt receipt = paymentGateway.charge(request.amount());
        Order savedOrder = orderRepository.save(new Order(request, receipt));
        return new OrderResponse(savedOrder.getId(), "SUCCESS");
    }
}`,
    codeLanguage: 'java',
    codeLines: [
      { code: '@Service', token: '@Service', explanation: 'Registers OrderService as a managed singleton Bean in the Spring IoC Container.' },
      { code: '    private final PaymentGateway paymentGateway;', token: 'final', explanation: 'Immutability: Dependencies cannot be reassigned after construction.' },
      { code: '    public OrderService(PaymentGateway paymentGateway, OrderRepository orderRepository) {', token: 'Constructor', explanation: 'Constructor injection allows clean unit testing by passing mock dependencies without Spring context.' }
    ],
    visualizer: 'rest-lifecycle',
    quiz: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is the default Bean scope in the Spring Framework IoC Container?',
        options: ['Prototype', 'Singleton', 'Session', 'Request'],
        answer: 1,
        explanation: 'By default, Spring creates exactly one shared singleton instance of each bean per ApplicationContext.',
        points: 10
      }
    ],
    practice: [
      {
        id: 'p1',
        type: 'find-bug',
        question: 'Why is field injection with @Autowired on private fields discouraged in production code?',
        code: `@Service
public class UserService {
    @Autowired
    private UserRepository userRepository; // Field Injection
}`,
        answer: 'Field injection prevents immutability (fields cannot be final), makes unit testing without reflection difficult, and masks circular dependencies.',
        hint: 'Use Constructor Injection with final fields instead.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq1',
        question: 'Explain the lifecycle of a Spring Bean.',
        level: 'intermediate',
        answer: 'Spring Bean Lifecycle: (1) Bean Definition loading, (2) Instantiation of bean object, (3) Dependency Injection (property population), (4) BeanNameAware / ApplicationContextAware callbacks, (5) BeanPostProcessor pre-initialization, (6) @PostConstruct / InitializingBean afterPropertiesSet(), (7) Custom init-method, (8) BeanPostProcessor post-initialization, (9) Bean ready in container, (10) On shutdown: @PreDestroy / DisposableBean destroy().',
        example: 'Hooks like @PostConstruct allow initialization tasks after injection.'
      }
    ],
    xpReward: 20
  }
];
