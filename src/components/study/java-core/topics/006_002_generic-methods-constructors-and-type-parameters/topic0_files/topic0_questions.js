const topic0_questions = [
  {
    "question": "What is the primary difference between a Generic Class and a Generic Method in Java?",
    "shortAnswer": "In a Generic Class ('class Box<T>'), the type parameter 'T' is declared at the class level and scoped to the entire class instance. In a Generic Method ('public <T> void doWork(T val)'), the type parameter 'T' is declared and scoped exclusively to that individual method, even inside a non-generic ordinary class.",
    "explanation": "Allows targeted type-safety on utility methods without making the enclosing class generic.",
    "hint": "Generic methods scope <T> exclusively to that method, even within regular non-generic classes.",
    "level": "Beginner",
    "codeExample": "public class Utils { public static <T> void log(T item) { ... } }"
  }
];

export default topic0_questions;