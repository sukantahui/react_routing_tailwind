const topic0_questions = [
  {
    "question": "What is the syntax requirement and runtime effect of the 'throw' keyword in Java?",
    "shortAnswer": "The 'throw' statement must be followed by an instantiated object of type 'Throwable' (or any subclass). When executed, it immediately stops current method execution, creates an active exception state, and begins searching the call stack for an enclosing try-catch handler.",
    "explanation": "Used to explicitly signal precondition violations or business failures.",
    "hint": "Requires an instantiated Throwable object and halts sequential execution immediately.",
    "level": "Beginner",
    "codeExample": "if (balance < 0) throw new IllegalArgumentException(\"Negative balance\");"
  }
];

export default topic0_questions;