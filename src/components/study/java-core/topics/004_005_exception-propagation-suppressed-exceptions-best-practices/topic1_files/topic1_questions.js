const topic1_questions = [
  {
    "question": "What is 'Stack Unwinding' and how does the JVM handle 'finally' blocks during the unwinding process?",
    "shortAnswer": "'Stack Unwinding' is the process where the JVM pops stack frames off the thread call stack one by one during exception propagation. As each stack frame is dismantled, the JVM guarantees that any enclosing 'finally' block in that frame is executed before the frame is discarded.",
    "explanation": "Guarantees resource integrity across all intermediate method layers.",
    "hint": "The JVM pops stack frames one by one, executing each frame's finally block during teardown.",
    "level": "Intermediate",
    "codeExample": "// Frame3 (finally runs) -> Frame2 (finally runs) -> Frame1 (catch runs)"
  }
];

export default topic1_questions;