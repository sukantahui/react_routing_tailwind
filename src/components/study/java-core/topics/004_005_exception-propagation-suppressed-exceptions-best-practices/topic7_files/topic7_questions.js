const topic7_questions = [
  {
    "question": "Why does Effective Java Item 77 state: 'Do not ignore exceptions' and why is an empty catch block considered disastrous?",
    "shortAnswer": "An empty catch block silently ignores the exception as if nothing went wrong. The program continues executing with corrupted data, missing records, and invalid state with zero logs or alerts, turning simple bugs into impossible-to-diagnose production nightmares.",
    "explanation": "SonarQube flags empty catch blocks as critical major security code smells.",
    "hint": "Empty catch blocks cause silent failures, data corruption, and impossible-to-debug defects.",
    "level": "Beginner",
    "codeExample": "// NEVER DO THIS: catch (Exception e) {} // Silent disaster!"
  }
];

export default topic7_questions;