const topic7_questions = [
  {
    "question": "What is the canonical coding pattern for writing a background loop that responds gracefully to cancellation requests?",
    "shortAnswer": "The canonical pattern uses 'while (!Thread.currentThread().isInterrupted()) { ... }'. Inside the loop, any blocking methods (like 'Thread.sleep()') that catch 'InterruptedException' must call 'Thread.currentThread().interrupt()' in the catch block to re-assert the interrupt status. When interrupted, the while loop's condition evaluates to 'false', allowing the thread to exit the loop and execute final resource cleanup code gracefully.",
    "explanation": "Standard design pattern from Effective Java and Java Concurrency in Practice.",
    "hint": "Check !isInterrupted() in while loop header and restore interrupt status if catching InterruptedException.",
    "level": "Intermediate",
    "codeExample": "while (!Thread.currentThread().isInterrupted()) { doWork(); }"
  }
];

export default topic7_questions;