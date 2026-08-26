const topic7_questions = [
  {
    "question": "How do you create a custom Checked Exception in Java and what compiler requirements does it enforce?",
    "shortAnswer": "Create a class that directly extends 'java.lang.Exception' (or any checked subclass). Any method that throws this exception MUST declare it in its 'throws' signature clause, and all callers are strictly forced by the compiler to handle it with 'try-catch' or propagate it with 'throws'.",
    "explanation": "Forces callers to acknowledge and handle recoverable business conditions.",
    "hint": "Extend Exception; compiler enforces catch-or-specify mandate.",
    "level": "Beginner",
    "codeExample": "public class CustomCheckedEx extends Exception { public CustomCheckedEx(String m){super(m);} }"
  }
];

export default topic7_questions;