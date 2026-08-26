const topic6_questions = [
  {
    "question": "How does the Java compiler determine which overloaded constructor to call when using a Constructor Reference ('ClassName::new')?",
    "shortAnswer": "The compiler selects the matching constructor based on the parameter types and argument count of the target Functional Interface SAM. If the target is 'Supplier<T>' (0 args), the no-arg constructor is invoked. If the target is 'Function<A, T>' (1 arg), the single-arg constructor accepting type A is invoked. If the target is 'BiFunction<A, B, T>' (2 args), the two-arg constructor accepting types (A, B) is invoked.",
    "explanation": "Overloaded constructor reference resolution mechanics in Java 8.",
    "hint": "Selected automatically based on the parameter list of the target Functional Interface SAM (Supplier=0, Function=1, BiFunction=2).",
    "level": "Intermediate",
    "codeExample": "Supplier<User> s = User::new; Function<String, User> f = User::new;"
  }
];

export default topic6_questions;