const topic4_questions = [
  {
    question: "Can an abstract method exist inside a regular (concrete) class in Java?",
    shortAnswer: "No! If a class declares or inherits an abstract method without implementing it, the class MUST be explicitly declared 'abstract' by the developer.",
    explanation: "Failure to declare the class as abstract causes a compile-time error.",
    hint: "Abstract methods can only live inside abstract classes or interfaces.",
    level: "Beginner",
    codeExample: "// Compile Error: class Normal { abstract void run(); }"
  }
];

export default topic4_questions;