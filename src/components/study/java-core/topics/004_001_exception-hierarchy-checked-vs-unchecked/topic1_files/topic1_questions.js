const topic1_questions = [
  {
    "question": "What is the root class of the entire Java exception and error hierarchy?",
    "shortAnswer": "'java.lang.Throwable'. Only instances of 'Throwable' (or any of its subclasses) can be thrown by the JVM or the 'throw' statement, and only 'Throwable' subclasses can be specified in a 'catch' clause.",
    "explanation": "Throwable splits directly into two main branches: java.lang.Error and java.lang.Exception.",
    "hint": "java.lang.Throwable is the ultimate superclass of Error and Exception.",
    "level": "Beginner",
    "codeExample": "public class MyCustomException extends Exception { ... } // Subclass of Throwable"
  }
];

export default topic1_questions;