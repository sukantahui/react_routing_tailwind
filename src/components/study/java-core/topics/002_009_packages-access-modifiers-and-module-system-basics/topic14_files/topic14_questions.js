const topic14_questions = [
  {
    question: "What is the difference between 'exports' and 'opens' in a 'module-info.java' descriptor?",
    shortAnswer: "'exports' makes public classes in the package accessible at both compile-time and runtime. 'opens' allows runtime deep reflection (including private field access) by frameworks like Spring Boot or Jackson without exposing compile-time access.",
    explanation: "If you don't 'open' a package, reflection frameworks like Hibernate will fail with an IllegalAccessException.",
    hint: "'exports' for compile-time public API; 'opens' for runtime reflection by frameworks.",
    level: "Advanced",
    codeExample: "module com.app { exports com.app.api; opens com.app.model to spring.core; }"
  }
];

export default topic14_questions;