// topic5_questions.js
const questions = [
  {
    question: "Why would you use an interface for a payment system?",
    shortAnswer: "To support multiple payment methods (Credit Card, PayPal, etc.) without changing the checkout logic.",
    explanation: "The interface defines the contract; each payment method implements it. The checkout code depends only on the interface.",
    hint: "Think of 'program to an interface, not an implementation'.",
    level: "intermediate",
    codeExample: "Payment p = new CreditCardPayment(...); p.processPayment(100);"
  },
  {
    question: "How does the Comparable interface help in sorting student records?",
    shortAnswer: "It provides a natural ordering by implementing compareTo(). Collections.sort() uses it.",
    explanation: "You define how students compare (e.g., by marks, by name) inside compareTo().",
    hint: "Without Comparable, you would need a separate Comparator.",
    level: "basic",
    codeExample: "public int compareTo(Student other) { return this.marks - other.marks; }"
  },
  {
    question: "What is the DAO pattern and why is it interface-based?",
    shortAnswer: "DAO (Data Access Object) separates database operations from business logic. Interfaces allow swapping database implementations.",
    explanation: "You define CRUD methods in an interface, then provide concrete classes for MySQL, PostgreSQL, MongoDB, etc.",
    hint: "Lets you change databases without touching the rest of the code.",
    level: "expert",
    codeExample: "UserDAO dao = new UserDAOMySQL(); // can replace with UserDAOPostgreSQL()"
  },
  {
    question: "Can you give a real-world example where multiple unrelated classes implement the same interface?",
    shortAnswer: "Java's Serializable – classes like String, ArrayList, and custom classes all implement it.",
    explanation: "They have nothing in common except the ability to be serialized.",
    hint: "Also Runnable – Thread, TimerTask, and custom tasks.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "What is the advantage of using an interface for a service layer?",
    shortAnswer: "It allows loose coupling and easy unit testing (mock implementations).",
    explanation: "Controllers depend on service interfaces, not concrete classes. You can swap real service with a mock during testing.",
    hint: "Dependency injection frameworks (Spring) rely on this.",
    level: "expert",
    codeExample: "class UserController { private UserService service; }"
  },
  {
    question: "How would you design a plugin system using interfaces?",
    shortAnswer: "Define a Plugin interface with methods like execute(), initialize(), etc. Plugins implement it and are loaded dynamically.",
    explanation: "The main application only knows the interface; new plugins can be added without recompiling the core.",
    hint: "Think of browser extensions or IDE plugins.",
    level: "expert",
    codeExample: "interface Plugin { void run(); } class HelloPlugin implements Plugin { public void run() { ... } }"
  },
  {
    question: "In the payment example, can we add a new payment method (e.g., Google Pay) without modifying existing code?",
    shortAnswer: "Yes, just create a new class that implements Payment. The PaymentProcessor remains unchanged.",
    explanation: "This follows the Open/Closed Principle (open for extension, closed for modification).",
    hint: "That's the power of interfaces.",
    level: "intermediate",
    codeExample: "class GooglePayPayment implements Payment { ... }"
  },
  {
    question: "What is a common mistake when using Comparable?",
    shortAnswer: "Forgetting that compareTo() must be consistent with equals().",
    explanation: "If compareTo() returns 0 for two objects, equals() should return true, otherwise collections like TreeSet may misbehave.",
    hint: "Also, ensure compareTo() is transitive and reflexive.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Why use an interface for DAO instead of an abstract class?",
    shortAnswer: "Because DAO implementations (MySQL, PostgreSQL) share no common state; they only need to fulfill the contract. Interfaces are lighter.",
    explanation: "Abstract classes would force a common base, which is unnecessary and restrictive.",
    hint: "Use abstract class only if you need to share fields or helper methods.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What does 'program to an interface, not an implementation' mean in practice?",
    shortAnswer: "Use interface types for variables, parameters, and return types instead of concrete classes.",
    explanation: "Example: `List<String> list = new ArrayList<>();` not `ArrayList<String> list = new ArrayList<>();`",
    hint: "It makes your code more flexible.",
    level: "intermediate",
    codeExample: "Payment payment = new CreditCardPayment(...); // good"
  },
  {
    question: "Can an interface have a default method that provides a common implementation for all DAOs?",
    shortAnswer: "Yes, for example a default method `default void log(String msg)` that all DAOs can use.",
    explanation: "But be careful – default methods cannot access instance fields unless the interface provides getters.",
    hint: "Useful for cross-cutting concerns like logging.",
    level: "expert",
    codeExample: "default void logAccess() { System.out.println(\"Access at \" + new Date()); }"
  },
  {
    question: "How do you test code that depends on an interface?",
    shortAnswer: "Create a mock implementation of the interface for testing, or use a mocking framework like Mockito.",
    explanation: "You can control the mock's behavior (return values, exceptions) to test edge cases.",
    hint: "Interfaces make unit testing much easier.",
    level: "intermediate",
    codeExample: "Payment mockPayment = mock(Payment.class); when(mockPayment.processPayment(anyDouble())).thenReturn(true);"
  },
  {
    question: "In a microservice architecture, where are interfaces used?",
    shortAnswer: "To define API contracts (REST or gRPC) between services, often using OpenAPI or Protobuf interfaces.",
    explanation: "Even within a service, interfaces separate layers (controller → service → repository).",
    hint: "Interfaces define boundaries.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the difference between using an interface and a functional interface in practical code?",
    shortAnswer: "Functional interfaces (single abstract method) can be used with lambda expressions, simplifying code for callbacks, event handlers, and streams.",
    explanation: "Examples: Runnable, Comparator, Predicate.",
    hint: "If your interface has only one abstract method, consider @FunctionalInterface.",
    level: "intermediate",
    codeExample: "Runnable r = () -> System.out.println(\"Hello\");"
  },
  {
    question: "Can you use an interface to define constants that multiple classes share?",
    shortAnswer: "Yes, but it's considered an anti-pattern (Constant Interface Anti-Pattern). Better to use a class with private constructor or enums.",
    explanation: "Implementing an interface for constants pollutes the namespace and leaks implementation detail.",
    hint: "Use static imports instead.",
    level: "expert",
    codeExample: "public interface Constants { int MAX = 100; } // avoid this"
  },
  {
    question: "How does the Java Collections Framework use interfaces?",
    shortAnswer: "Core interfaces like Collection, List, Set, Map define contracts. Implementations (ArrayList, HashSet, HashMap) provide concrete behavior.",
    explanation: "This allows polymorphic algorithms (e.g., Collections.sort() works on any List).",
    hint: "You can write methods that accept List, not ArrayList.",
    level: "intermediate",
    codeExample: "public void printList(List<?> list) { for (Object o : list) System.out.println(o); }"
  },
  {
    question: "What is a real-world use of the Comparator interface?",
    shortAnswer: "Sorting objects by different criteria (e.g., sort students by name, then by marks).",
    explanation: "You can create multiple Comparator implementations without modifying the Student class.",
    hint: "Useful when you need multiple sort orders.",
    level: "intermediate",
    codeExample: "Comparator<Student> byName = Comparator.comparing(Student::getName);"
  },
  {
    question: "How would you use an interface to implement the Strategy design pattern?",
    shortAnswer: "Define a Strategy interface with a method (e.g., execute()). Concrete strategies implement it. The context class holds a reference to the Strategy interface.",
    explanation: "This allows swapping algorithms at runtime.",
    hint: "Example: Sorting strategy (BubbleSort, QuickSort) implement SortStrategy.",
    level: "expert",
    codeExample: "interface SortStrategy { void sort(int[] arr); } class BubbleSort implements SortStrategy { ... }"
  },
  {
    question: "In the payment example, what if you need to add a transaction fee for credit cards only?",
    shortAnswer: "Implement it inside CreditCardPayment's processPayment method. Other payment methods remain unchanged.",
    explanation: "Each implementation is independent.",
    hint: "Interfaces allow varying behavior per implementation.",
    level: "intermediate",
    codeExample: ""
  },
  {
    question: "Why is it a good practice to have small, focused interfaces (Interface Segregation Principle)?",
    shortAnswer: "Clients are not forced to depend on methods they don't use. It reduces coupling and makes code easier to understand.",
    explanation: "Instead of a monolithic Worker interface, split into Eatable, Sleepable, Workable.",
    hint: "Split large interfaces into role-specific ones.",
    level: "expert",
    codeExample: "interface Eatable { void eat(); } interface Workable { void work(); }"
  },
  {
    question: "Can you use an interface to define a callback mechanism?",
    shortAnswer: "Yes, define an interface with a callback method, and pass an implementation to the event source.",
    explanation: "Common in GUI programming (e.g., ActionListener) and asynchronous operations.",
    hint: "Callback interfaces are often functional interfaces.",
    level: "intermediate",
    codeExample: "interface ClickListener { void onClick(); } button.setListener(() -> System.out.println(\"Clicked\"));"
  },
  {
    question: "How would you use interfaces to implement dependency injection manually?",
    shortAnswer: "Pass interface implementations via constructor parameters. The high-level module depends only on the interface.",
    explanation: "Example: `PaymentService` accepts a `Payment` interface in its constructor.",
    hint: "No framework needed – pure Java.",
    level: "expert",
    codeExample: "class Checkout { private Payment payment; Checkout(Payment payment) { this.payment = payment; } }"
  },
  {
    question: "What is the role of interfaces in layered architecture?",
    shortAnswer: "Each layer (Presentation, Business, Persistence) defines interfaces for the layer below, allowing independent changes.",
    explanation: "The business layer defines a Repository interface; the persistence layer implements it.",
    hint: "Prevents tight coupling between layers.",
    level: "expert",
    codeExample: "interface UserRepository { User findById(int id); } class UserRepositoryImpl implements UserRepository { ... }"
  },
  {
    question: "Can an interface be used as a type for a collection of mixed objects?",
    shortAnswer: "Yes, e.g., `List<Payment>` can hold CreditCardPayment, PayPalPayment, etc.",
    explanation: "This is polymorphism in action.",
    hint: "Allows you to process all payments uniformly.",
    level: "intermediate",
    codeExample: "List<Payment> payments = Arrays.asList(new CreditCardPayment(...), new PayPalPayment(...));"
  },
  {
    question: "How do you ensure that an interface remains stable over time?",
    shortAnswer: "Design it carefully, keep it focused, and use default methods for non-breaking additions.",
    explanation: "Once published, changing an interface breaks all implementations. Default methods allow evolution.",
    hint: "Think twice before adding abstract methods.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is a practical use of static methods in interfaces?",
    shortAnswer: "Factory methods: `List.of()`, `Set.of()`, `Comparator.naturalOrder()`.",
    explanation: "They provide convenient ways to create objects related to the interface.",
    hint: "Also utility methods that operate on interface types.",
    level: "intermediate",
    codeExample: "List<String> list = List.of(\"a\", \"b\", \"c\");"
  },
  {
    question: "Can you use an interface to implement a feature toggle?",
    shortAnswer: "Yes, have two implementations of the same interface – one with the new feature, one without. Choose at runtime.",
    explanation: "Use configuration to decide which implementation to instantiate.",
    hint: "Great for A/B testing or gradual rollouts.",
    level: "expert",
    codeExample: "Feature f = config.isEnabled() ? new NewFeature() : new OldFeature();"
  },
  {
    question: "Why would you use an interface for a remote service client (e.g., REST API)?",
    shortAnswer: "The interface defines the API contract. Different implementations can handle HTTP, mock, or cached versions.",
    explanation: "You can easily swap between a real HTTP client and a fake for testing.",
    hint: "Also useful for multiple API versions.",
    level: "expert",
    codeExample: "interface WeatherService { Weather getWeather(String city); }"
  },
  {
    question: "What is the 'Adapter' pattern and how does it use interfaces?",
    shortAnswer: "An adapter class implements a target interface and wraps an existing class that does not implement that interface.",
    explanation: "Allows incompatible interfaces to work together.",
    hint: "Example: adapting a legacy logging system to a new Logger interface.",
    level: "expert",
    codeExample: "class LegacyLoggerAdapter implements Logger { private LegacyLogger legacy; public void log(String msg) { legacy.write(msg); } }"
  },
  {
    question: "How would you design a notification system using interfaces?",
    shortAnswer: "Define a Notifier interface with send(message) method. Implement EmailNotifier, SMSNotifier, PushNotifier.",
    explanation: "The system can send notifications via any channel without changing the core logic.",
    hint: "Easily add SlackNotifier later.",
    level: "intermediate",
    codeExample: "interface Notifier { void send(String msg); } class EmailNotifier implements Notifier { ... }"
  }
];

export default questions;