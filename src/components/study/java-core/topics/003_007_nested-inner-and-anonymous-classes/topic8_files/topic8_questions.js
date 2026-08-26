const topic8_questions = [
  {
    "question": "What is an Anonymous Inner Class in Java and how does it differ from a named class?",
    "shortAnswer": "An Anonymous Inner Class is a local inner class with NO explicit name in source code. It is declared and instantiated simultaneously in a single expression using 'new SuperType() { ... }'. It is typically used for one-off implementations of interfaces or abstract classes.",
    "explanation": "The compiler generates synthetic class files like 'Outer$1.class'.",
    "hint": "An unnamed class declared and instantiated in a single expression.",
    "level": "Beginner",
    "codeExample": "Runnable r = new Runnable() { public void run() { ... } };"
  }
];

export default topic8_questions;