const topic4_questions = [
  {
    question: "What is Unboxing in Java and what method does the compiler invoke to achieve it?",
    shortAnswer: "Unboxing is the automatic extraction of a primitive value from its wrapper object. For 'Integer', the compiler generates a call to 'intValue()' under the hood. For 'Double', it calls 'doubleValue()', and so on.",
    explanation: "Allows wrapper objects to be used directly in arithmetic calculations (+, -, *, /).",
    hint: "Extracts primitive from wrapper object; translated to intValue(), doubleValue(), etc.",
    level: "Beginner",
    codeExample: "int y = x; // When x is Integer, compiler inserts: int y = x.intValue();"
  }
];

export default topic4_questions;