const topic0_questions = [
  {
    "question": "What is the primary capability provided by the Java Reflection API?",
    "shortAnswer": "The Reflection API allows a running Java application to dynamically inspect class metadata, access internal fields, invoke methods, and instantiate objects without knowing their concrete types at compile time.",
    "explanation": "Forms the foundational backbone of all modern Java frameworks.",
    "hint": "Dynamic runtime introspection and execution without compile-time binding.",
    "level": "Beginner",
    "codeExample": "Class<?> clazz = Class.forName('com.example.Service'); Object instance = clazz.getDeclaredConstructor().newInstance();"
  },
  {
    "question": "Why do frameworks like Spring and Hibernate rely heavily on Java Reflection?",
    "shortAnswer": "Because user classes (Controllers, Services, JPA Entities) do not exist when the framework is compiled. Reflection allows the framework to dynamically discover user annotations, instantiate beans, and inject dependencies at application startup.",
    "explanation": "Enables loose coupling and inversion of control.",
    "hint": "Frameworks can discover and wire user classes dynamically without compile-time knowledge.",
    "level": "Intermediate",
    "codeExample": "@Autowired and @Entity scanning via Reflection"
  }
];

export default topic0_questions;
