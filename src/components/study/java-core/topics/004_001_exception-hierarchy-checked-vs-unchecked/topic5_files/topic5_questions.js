const topic5_questions = [
  {
    "question": "What is the Java compiler's 'Catch or Specify' requirement for Checked Exceptions?",
    "shortAnswer": "Code that invokes a method throwing a Checked Exception MUST satisfy one of two rules: 1. 'Catch': Enclose the call inside a 'try-catch' block and handle it. 2. 'Specify': Declare the exception in the enclosing method's signature using the 'throws' keyword to propagate it up the call stack.",
    "explanation": "Failing to do either results in a compilation error: 'unreported exception; must be caught or declared to be thrown'.",
    "hint": "Must either catch with try-catch or specify with throws clause.",
    "level": "Beginner",
    "codeExample": "void m() throws IOException { ... } // Specify\\ntry { m(); } catch(IOException e) {} // Catch"
  }
];

export default topic5_questions;