const topic16_questions = [
  {
    "question": "What is a 'Local Record' (introduced in Java 16) and how does it enhance method-level data modeling?",
    "shortAnswer": "A Local Record allows declaring an immutable data carrier record directly inside a method body. Unlike traditional method-local classes, local records are implicitly static (holding no outer reference) and automatically generate constructors, getters, equals(), hashCode(), and toString() in a single line.",
    "explanation": "Ideal for intermediate aggregation in Stream pipelines and temporary tuple return values.",
    "hint": "An immutable data carrier record declared directly inside a method block.",
    "level": "Intermediate",
    "codeExample": "void m() { record TempData(int id, String name) {} ... }"
  }
];

export default topic16_questions;