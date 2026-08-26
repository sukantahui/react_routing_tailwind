const topic3_questions = [
  {
    "question": "Why does the ApplicationContext use ConcurrentHashMap to store singleton bean instances?",
    "shortAnswer": "To provide thread-safe, lock-free bean lookups across multiple concurrent request threads without suffering from global synchronization bottlenecks.",
    "explanation": "Ensures thread safety in multi-threaded web containers.",
    "hint": "Thread-safe singleton registry for concurrent web requests.",
    "level": "Beginner",
    "codeExample": "private final Map<Class<?>, Object> singletonRegistry = new ConcurrentHashMap<>();"
  },
  {
    "question": "How does the generic <T> T getBean(Class<T> clazz) method ensure compile-time type safety?",
    "shortAnswer": "By taking a Class<T> token parameter and returning T, callers receive the exact target type without needing explicit manual type casting.",
    "explanation": "Type-safe heterogenous container pattern.",
    "hint": "Uses generic type token Class<T> to eliminate manual casts.",
    "level": "Intermediate",
    "codeExample": "OrderService s = context.getBean(OrderService.class);"
  }
];

export default topic3_questions;
