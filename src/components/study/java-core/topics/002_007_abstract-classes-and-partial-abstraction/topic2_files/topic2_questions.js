const topic2_questions = [
  {
    question: "Why does the Java compiler prohibit creating an object of an abstract class ('new AbstractClass()')?",
    shortAnswer: "Because an abstract class is conceptually incomplete and may contain abstract methods with no code body; if an instance were created, calling an abstract method would have no bytecode to execute.",
    explanation: "To guarantee runtime reliability, Java permits instantiation only of fully concrete subclasses.",
    hint: "Incomplete definition with missing method bodies would cause undefined runtime behavior.",
    level: "Beginner",
    codeExample: "// Compile Error: Base b = new Base();"
  }
];

export default topic2_questions;