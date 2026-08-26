const topic7_questions = [
  {
    "question": "Why do methods on 'java.io.PrintWriter' (like print and println) NOT declare 'throws IOException', and how do you detect errors?",
    "shortAnswer": "PrintWriter was specifically designed for convenient, clutter-free printing without requiring try-catch blocks around every single print statement. Instead of throwing checked IOExceptions, PrintWriter catches them internally and sets an internal error flag. Developers verify stream health by calling 'pw.checkError()', which flushes the stream and returns true if any error occurred.",
    "explanation": "Same error model used by System.out (java.io.PrintStream).",
    "hint": "Swallows checked exceptions to eliminate boilerplate; call checkError() to verify health.",
    "level": "Intermediate",
    "codeExample": "pw.println(\"text\"); if (pw.checkError()) { /* handle error */ }"
  }
];

export default topic7_questions;