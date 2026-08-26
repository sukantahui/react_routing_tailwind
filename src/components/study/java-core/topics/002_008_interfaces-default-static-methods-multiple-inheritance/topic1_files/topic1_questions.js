const topic1_questions = [
  {
    question: "What are the default implicit modifiers for variables and methods declared inside an interface in Java?",
    shortAnswer: "Variables are implicitly 'public static final' (constants). Methods without bodies are implicitly 'public abstract'.",
    explanation: "Even if you omit the keywords 'public', 'static', 'final', or 'abstract', the compiler automatically adds them.",
    hint: "Variables = public static final; Methods = public abstract.",
    level: "Beginner",
    codeExample: "interface Test { int X = 10; void run(); }"
  }
];

export default topic1_questions;