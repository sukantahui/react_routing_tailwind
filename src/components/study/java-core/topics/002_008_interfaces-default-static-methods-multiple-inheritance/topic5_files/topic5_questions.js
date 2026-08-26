const topic5_questions = [
  {
    question: "What are the implicit modifiers applied to regular methods in an interface?",
    shortAnswer: "They are implicitly 'public' and 'abstract'.",
    explanation: "Even if declared simply as 'void run();', the compiler translates it to 'public abstract void run();'.",
    hint: "Implicitly public and abstract.",
    level: "Beginner",
    codeExample: "interface Worker { void work(); // public abstract void work(); }"
  }
];

export default topic5_questions;