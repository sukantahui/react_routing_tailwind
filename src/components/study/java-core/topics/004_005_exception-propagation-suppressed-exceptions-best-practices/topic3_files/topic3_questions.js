const topic3_questions = [
  {
    "question": "How do you systematically read and debug a Java stack trace from top to bottom?",
    "shortAnswer": "1. Read the very top line: Identifies the exception type (e.g. NullPointerException) and descriptive error message. 2. Look at the FIRST 'at ...' line containing your application's package name: Identifies the exact file name and line number where the error was thrown. 3. Read downwards: Traces the chain of method calls leading up to that failure.",
    "explanation": "Mastery of stack trace reading is the single most important practical debugging skill in Java.",
    "hint": "Top line is error type/message; first application line is the exact crash point; lines below trace callers.",
    "level": "Beginner",
    "codeExample": "// Exception in thread 'main' java.lang.NPE: msg\\n// at com.app.Service.run(Service.java:42)"
  }
];

export default topic3_questions;