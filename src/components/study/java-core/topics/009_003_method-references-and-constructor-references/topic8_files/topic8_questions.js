const topic8_questions = [
  {
    "question": "How does the Java compiler resolve two-parameter functional interfaces (like 'BiPredicate<String, String>') when assigned an unbound method reference ('String::startsWith')?",
    "shortAnswer": "When an unbound instance method reference ('ClassName::method') is assigned to a multi-parameter functional interface SAM (e.g. 'BiPredicate<T, U>'), the compiler designates the FIRST parameter ('T') as the TARGET INSTANCE on which the method is invoked, and routes the remaining parameters ('U, ...') as the ARGUMENTS passed into that method. Thus, 'String::startsWith' is automatically transformed into '(s1, s2) -> s1.startsWith(s2)'.",
    "explanation": "Internal compiler routing mechanics for unbound instance method references.",
    "hint": "First parameter becomes the invocation receiver object, and subsequent parameters become the method arguments.",
    "level": "Advanced",
    "codeExample": "BiPredicate<String, String> p = String::startsWith; // Equivalent: (s1, s2) -> s1.startsWith(s2)"
  }
];

export default topic8_questions;