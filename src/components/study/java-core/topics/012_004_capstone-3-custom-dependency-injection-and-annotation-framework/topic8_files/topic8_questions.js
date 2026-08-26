const topic8_questions = [
  {
    "question": "How does building a custom DI framework from scratch enhance your ability to debug enterprise Spring Boot applications?",
    "shortAnswer": "It demystifies framework 'magic', allowing you to instantly understand stack traces involving NoSuchBeanDefinitionException, UnsatisfiedDependencyException, ClassCastException in dynamic proxies, and ClassLoader hierarchy leaks.",
    "explanation": "Deep architectural mastery of enterprise Java runtimes.",
    "hint": "Eliminates framework mystery and enables pinpoint debugging of bean lifecycles and proxy issues.",
    "level": "Intermediate",
    "codeExample": "context.getBean(Service.class);"
  },
  {
    "question": "What is the ultimate design philosophy of Inversion of Control in software architecture?",
    "shortAnswer": "Separating object creation and configuration from business execution, allowing software components to remain modular, decoupled, and easily testable.",
    "explanation": "Separation of concerns and decoupled architecture.",
    "hint": "Separates object creation from execution logic for modularity and testability.",
    "level": "Beginner",
    "codeExample": "Dependency Injection enables seamless unit testing."
  }
];

export default topic8_questions;
