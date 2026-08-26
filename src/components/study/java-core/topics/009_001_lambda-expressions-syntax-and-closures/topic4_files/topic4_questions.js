const topic4_questions = [
  {
    "question": "What is a 'Functional Interface' in Java and what types of methods are permitted inside it?",
    "shortAnswer": "A 'Functional Interface' (Single Abstract Method / SAM interface) is an interface that declares EXACTLY ONE abstract method. In addition to that single abstract method, a Functional Interface may contain: (1) any number of 'default' methods, (2) any number of 'static' methods, and (3) abstract method declarations that match public methods of 'java.lang.Object' (such as 'equals()', 'hashCode()', or 'toString()'), as these are automatically fulfilled by all Java classes.",
    "explanation": "Comprehensive rule definition of Functional Interfaces in Java 8.",
    "hint": "Must have exactly 1 abstract method; can have unlimited default, static, and Object class methods.",
    "level": "Intermediate",
    "codeExample": "@FunctionalInterface interface Transformer<T, R> { R transform(T input); default void log() {} }"
  }
];

export default topic4_questions;