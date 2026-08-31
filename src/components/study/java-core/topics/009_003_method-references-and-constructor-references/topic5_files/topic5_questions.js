const topic5_questions = [
  {
    "question": "What is an 'Unbound Instance Method Reference' ('ClassName::instanceMethodName') and how does the compiler route the target receiver object?",
    "shortAnswer": "In an 'Unbound Instance Method Reference', the method is an instance method, but the left side specifies the Class Name (e.g. 'String::toUpperCase' or 'Student::getName'), NOT an instance variable. The Java compiler resolves this by treating the FIRST argument supplied by the functional interface SAM as the target receiver object on which the instance method is invoked ('(target, args...) → target.method(args...)').",
    "explanation": "Unbound instance method reference mechanics and parameter routing.",
    "hint": "First parameter of the functional interface becomes the target object on which the instance method is called.",
    "level": "Intermediate",
    "codeExample": "Function<String, Integer> length = String::length; // (s) → s.length()"
  }
];

export default topic5_questions;