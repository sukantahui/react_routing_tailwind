const topic2_questions = [
  {
    "question": "What is the exact bitwise growth formula used by java.util.ArrayList in modern JDKs when capacity is exceeded?",
    "shortAnswer": "The exact formula in the JDK source code ('ArrayList.java') is: 'int newCapacity = oldCapacity + (oldCapacity >> 1);'. This grows the capacity by approximately 50% (1.5x) using a bitwise right-shift for maximum CPU execution speed. For example, 10 grows to 15, then 22, 33, 49, 73, and so on.",
    "explanation": "Standard JDK ArrayList internal growth algorithm.",
    "hint": "'oldCapacity + (oldCapacity >> 1)' increases capacity by 1.5x using bitwise shifting.",
    "level": "Intermediate",
    "codeExample": "int newCapacity = oldCapacity + (oldCapacity >> 1); // 10 -> 15 -> 22 -> 33"
  }
];

export default topic2_questions;