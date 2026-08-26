const topic11_questions = [
  {
    "question": "What is an 'Effectively Final' variable in Java (introduced in Java 8) and why must captured variables be effectively final?",
    "shortAnswer": "A variable is 'effectively final' if its value is never modified after initialization, even if the 'final' keyword is omitted. Captured variables must be effectively final because the JVM creates a copy of the primitive/reference inside the inner class on the heap; allowing mutations would create synchronization discrepancies between stack frames and the heap.",
    "explanation": "Applies equally to Anonymous Inner Classes, Method-Local classes, and Java 8 Lambdas.",
    "hint": "A variable that is never reassigned; copies are passed to the inner class on heap.",
    "level": "Intermediate",
    "codeExample": "int x = 10; Runnable r = () -> System.out.println(x); // x is effectively final"
  }
];

export default topic11_questions;