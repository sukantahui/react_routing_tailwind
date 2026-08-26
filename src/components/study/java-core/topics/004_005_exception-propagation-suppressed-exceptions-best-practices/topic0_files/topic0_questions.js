const topic0_questions = [
  {
    "question": "What is 'Exception Propagation' in Java and what happens to the method call stack during propagation?",
    "shortAnswer": "When an exception occurs inside a method that lacks a matching 'catch' block, the JVM immediately drops (unwinds) the current method stack frame and passes (bubbles) the active exception object up to the calling method. This process repeats up the call stack until an enclosing catch block is found or the main thread terminates.",
    "explanation": "Allows low-level errors to be handled centrally at higher architectural layers.",
    "hint": "Unhandled exceptions bubble up the call stack, popping stack frames until caught.",
    "level": "Beginner",
    "codeExample": "// Level3 (fails) -> Level2 (propagates) -> Level1 (catches)"
  }
];

export default topic0_questions;