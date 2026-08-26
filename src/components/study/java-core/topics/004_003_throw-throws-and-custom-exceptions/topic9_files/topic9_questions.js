const topic9_questions = [
  {
    "question": "What are the 4 canonical constructors that every production custom exception class should implement?",
    "shortAnswer": "1. No-arg constructor: 'public MyException() { super(); }' 2. Message constructor: 'public MyException(String msg) { super(msg); }' 3. Cause constructor: 'public MyException(Throwable cause) { super(cause); }' 4. Message + Cause constructor: 'public MyException(String msg, Throwable cause) { super(msg, cause); }'",
    "explanation": "Conforms to standard Java idioms and enables seamless exception chaining.",
    "hint": "No-arg, String message, Throwable cause, and String message + Throwable cause.",
    "level": "Intermediate",
    "codeExample": "public MyEx(String m, Throwable c) { super(m, c); }"
  }
];

export default topic9_questions;