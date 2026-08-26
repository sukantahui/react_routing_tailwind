const topic0_questions = [
  {
    "question": "What is the difference between Inversion of Control (IoC) and Dependency Injection (DI)?",
    "shortAnswer": "IoC is the overarching architectural principle where control over object lifecycle and program flow is inverted to a framework; Dependency Injection is the specific design pattern used by the framework to supply required dependencies into dependent objects.",
    "explanation": "IoC is the principle; DI is the implementation mechanism.",
    "hint": "IoC is the broad architectural principle; DI is the concrete delivery mechanism.",
    "level": "Beginner",
    "codeExample": "@Autowired private UserRepository repo;"
  },
  {
    "question": "What major advantages does an IoC container provide to enterprise software?",
    "shortAnswer": "Loose coupling, testability (easy mocking in unit tests), centralized configuration, and automated lifecycle/aspect management (security, caching, transactions).",
    "explanation": "Core value proposition of modern frameworks.",
    "hint": "Loose coupling, easy mock testing, and centralized lifecycle management.",
    "level": "Beginner",
    "codeExample": "container.getBean(OrderService.class);"
  }
];

export default topic0_questions;
