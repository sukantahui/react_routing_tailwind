const topic12_questions = [
  {
    "question": "When is the memory size and maximum operand stack depth of a JVM Stack Frame determined?",
    "shortAnswer": "At compile time by javac. The compiler calculates the exact number of local variable slots (max_locals) and the maximum operand stack depth (max_stack) and encodes them directly into the method's bytecode Code attribute.",
    "explanation": "Zero dynamic resizing of individual stack frames occurs at runtime.",
    "hint": "Determined at compile time by javac and stored in the Code attribute.",
    "level": "Intermediate",
    "codeExample": "Code attribute: stack=2, locals=3, args_size=2"
  },
  {
    "question": "What is stored in Slot 0 of the Local Variable Table for non-static instance methods?",
    "shortAnswer": "The 'this' reference pointing to the current object instance. For static methods, Slot 0 stores the first method parameter instead.",
    "explanation": "Explains why static methods have no access to 'this'.",
    "hint": "The 'this' reference to the current heap instance.",
    "level": "Beginner",
    "codeExample": "Instance method: Slot 0 = this; Static method: Slot 0 = first arg"
  }
];

export default topic12_questions;
