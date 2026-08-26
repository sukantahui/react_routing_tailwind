const topic3_questions = [
  {
    question: "Why does 'nullRef.staticVariable' NOT throw a NullPointerException in Java?",
    shortAnswer: "Because the Java compiler binds static member access at compile time to the declaring Class type, completely ignoring the runtime value of the reference variable.",
    explanation: "Bytecode uses 'getstatic AcademicConfig.hubName' directly without dereferencing the pointer.",
    hint: "Compiler resolves static access using the compile-time type, ignoring null.",
    level: "Advanced",
    codeExample: "Student s = null; System.out.println(s.ACADEMY); // Works fine!"
  }
];

export default topic3_questions;