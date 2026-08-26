const topic4_questions = [
  {
    "question": "What happens if a developer places 'catch (IOException e)' BEFORE 'catch (FileNotFoundException e)' in Java?",
    "shortAnswer": "The Java compiler generates a COMPILE ERROR: 'exception java.io.FileNotFoundException has already been caught'. Because 'FileNotFoundException' is a subclass of 'IOException', the first catch block would intercept all file errors, making the second catch block completely unreachable dead code.",
    "explanation": "The compiler strictly enforces the Subclass-First ordering rule for catch blocks.",
    "hint": "Causes a compile error because the subclass catch block becomes unreachable.",
    "level": "Beginner",
    "codeExample": "// Order: catch (FileNotFoundException e) {} catch (IOException e) {}"
  }
];

export default topic4_questions;