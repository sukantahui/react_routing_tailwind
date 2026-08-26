const topic1_questions = [
  {
    "question": "What is Automatic Resource Management (ARM) in Java and when was it introduced?",
    "shortAnswer": "Introduced in Java 7 (Project Coin), ARM (also known as Try-with-Resources) is a language feature that automatically closes any resource declared inside the 'try (Resource r = ...)' parentheses at the end of the statement, eliminating the need for manual 'finally' blocks and 'close()' calls.",
    "explanation": "Any class that implements java.lang.AutoCloseable can be used in ARM.",
    "hint": "Introduced in Java 7; automatically closes resources declared in try parentheses.",
    "level": "Beginner",
    "codeExample": "try (InputStream is = new FileInputStream(\"file.txt\")) { ... }"
  }
];

export default topic1_questions;