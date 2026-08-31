const topic0_questions = [
  {
    "question": "What is a 'Method Reference' in Java 8 and when can a lambda expression be replaced with one?",
    "shortAnswer": "A 'Method Reference' is a compact, high-readability syntactic shortcut for a lambda expression that does nothing other than invoke an existing method directly by its name. Whenever a lambda expression merely forwards its parameters directly to an existing named method without any modification, calculation, or extra arguments (e.g. 's → System.out.println(s)'), it can be cleanly replaced with a method reference ('System.out::println').",
    "explanation": "Fundamental definition of Method References in Java 8.",
    "hint": "Syntactic sugar for lambdas that do nothing but call an existing named method with matching arguments.",
    "level": "Beginner",
    "codeExample": "s → System.out.println(s) === System.out::println"
  }
];

export default topic0_questions;