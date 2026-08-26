const topic8_questions = [
  {
    "question": "When is the 'permits' clause optional on a sealed class or interface?",
    "shortAnswer": "When all permitted subclasses or records are declared within the same source file (.java file). The compiler infers the permits list automatically.",
    "explanation": "Reduces boilerplate when defining closed algebraic sum types in one file.",
    "hint": "When all subclasses are declared in the exact same .java source file.",
    "level": "Intermediate",
    "codeExample": "sealed interface Result {} record Ok() implements Result {} record Err() implements Result {}"
  },
  {
    "question": "Why don't Java Records implementing a sealed interface need to declare the 'final' keyword?",
    "shortAnswer": "Because all Java Records are implicitly final by specification. The compiler recognizes this and considers the sealed modifier requirement fully satisfied.",
    "explanation": "Records cannot be extended, making them naturally sealed leaves.",
    "hint": "Records are implicitly final by language specification.",
    "level": "Beginner",
    "codeExample": "record Success(String data) implements SealedResponse {} // Valid and implicitly final"
  }
];

export default topic8_questions;
