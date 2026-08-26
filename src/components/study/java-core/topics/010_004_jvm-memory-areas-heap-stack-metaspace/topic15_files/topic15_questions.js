const topic15_questions = [
  {
    "question": "How does the JVM locate the appropriate catch block when an exception is thrown inside a method?",
    "shortAnswer": "The JVM inspects the method's Exception Table stored in Frame Data, matching the current Program Counter (PC) register within the [from, to] bytecode offset range and comparing the thrown exception type against the catch type.",
    "explanation": "If matched, PC jumps directly to the handler offset; if unmatched, the frame pops and the exception propagates.",
    "hint": "Matches current PC against the [from, to] ranges in the Exception Table.",
    "level": "Advanced",
    "codeExample": "Exception table: from=0, to=4, target=7, type=java/lang/ArithmeticException"
  },
  {
    "question": "What is the role of Dynamic Linking in the Frame Data section?",
    "shortAnswer": "It holds a reference to the Runtime Constant Pool for the current class to translate symbolic method and field references into direct memory references at runtime.",
    "explanation": "Enables late binding and polymorphism.",
    "hint": "Points to the Runtime Constant Pool to resolve symbolic references.",
    "level": "Intermediate",
    "codeExample": "Translates symbolic #12 into direct vtable method address."
  }
];

export default topic15_questions;
