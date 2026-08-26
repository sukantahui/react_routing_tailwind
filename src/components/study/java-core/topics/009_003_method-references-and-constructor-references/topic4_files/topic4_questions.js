const topic4_questions = [
  {
    "question": "What is a 'Bound Instance Method Reference' ('instanceRef::instanceMethodName') and why is 'System.out::println' an example?",
    "shortAnswer": "A 'Bound Instance Method Reference' is bound to a specific, pre-existing object instance outside the lambda. When invoked, the method is always called on that exact object instance, and the functional interface arguments are passed as method parameters. 'System.out::println' is a bound instance method reference because 'System.out' is a specific, pre-instantiated 'java.io.PrintStream' object; the method reference binds the 'println' method to that specific 'System.out' instance.",
    "explanation": "Bound instance method reference mechanics and object target binding.",
    "hint": "Bound to a specific existing object instance; method calls are dispatched directly to that object.",
    "level": "Intermediate",
    "codeExample": "PrintStream out = System.out; Consumer<String> c = out::println;"
  }
];

export default topic4_questions;