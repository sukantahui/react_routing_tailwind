const topic1_questions = [
  {
    "question": "What are the core syntactic rules of Java's Double Colon ('::') operator?",
    "shortAnswer": "1. 'Target::MethodName': Left side is the target class or object reference; right side is the method name or the 'new' keyword. 2. 'NO Parentheses ()': Parentheses must NEVER be written after the method name (e.g. 'Integer::parseInt', NOT 'Integer::parseInt()'), because you are referencing the method itself as a functional handle, not invoking it. 3. 'Implicit Argument Binding': The compiler automatically routes the functional interface's arguments to the referenced method based on matching types.",
    "explanation": "Syntax grammar rules of Java 8 double colon operator (JLS §15.13).",
    "hint": "Target::MethodName with NO parentheses and NO argument lists.",
    "level": "Beginner",
    "codeExample": "Function<String, Integer> f = Integer::parseInt; // No () allowed!"
  }
];

export default topic1_questions;