const topic10_questions = [
  {
    question: "What is the technical difference between 'Integer.parseInt(str)' and 'Integer.valueOf(str)'?",
    shortAnswer: "'Integer.parseInt(str)' returns a primitive 'int' directly. 'Integer.valueOf(str)' returns an 'Integer' wrapper object and leverages the internal IntegerCache pool for memory optimization.",
    explanation: "Use parseInt() when assigning to primitive 'int', and valueOf() when populating Collections or working with wrapper objects.",
    hint: "parseInt returns primitive int; valueOf returns wrapper Integer object.",
    level: "Beginner",
    codeExample: "int a = Integer.parseInt(\"42\");\nInteger b = Integer.valueOf(\"42\");"
  }
];

export default topic10_questions;
