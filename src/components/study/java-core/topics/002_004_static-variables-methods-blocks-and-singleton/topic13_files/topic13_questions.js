const topic13_questions = [
  {
    question: "What is Eager Initialization in the Singleton pattern and what are its pros and cons?",
    shortAnswer: "The singleton instance is created as a 'private static final' field at the moment the class is loaded by the ClassLoader. Pro: Simple and inherently thread-safe. Con: Wastes memory if the application never actually uses the instance.",
    explanation: "If the class has other static methods, accessing them triggers eager instantiation even if the singleton itself isn't needed.",
    hint: "Created at class loading time; simple & thread-safe, but may waste memory.",
    level: "Intermediate",
    codeExample: "private static final Singleton INSTANCE = new Singleton();"
  }
];

export default topic13_questions;