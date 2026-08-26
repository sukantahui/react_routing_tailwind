const topic3_questions = [
  {
    "question": "What differentiates 'java.lang.Exception' from 'java.lang.Error' in terms of application design?",
    "shortAnswer": "'java.lang.Exception' represents recoverable conditions that a reasonable application should anticipate, catch, and handle gracefully (e.g. falling back to defaults if a file is missing). 'java.lang.Error' represents fatal system conditions from which recovery is impossible.",
    "explanation": "Exception handling forms the core of application fault-tolerance and resilience.",
    "hint": "Exceptions are recoverable application conditions; Errors are fatal system failures.",
    "level": "Beginner",
    "codeExample": "try { readFile(); } catch (IOException e) { loadDefaults(); }"
  }
];

export default topic3_questions;