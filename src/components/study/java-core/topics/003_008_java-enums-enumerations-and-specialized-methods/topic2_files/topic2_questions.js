const topic2_questions = [
  {
    "question": "Can an enum in Java explicitly extend another class using the 'extends' keyword?",
    "shortAnswer": "NO. Because the Java compiler automatically and implicitly makes every enum inherit from 'java.lang.Enum<E>'. Since Java does not support multiple class inheritance, an enum cannot extend any other class (though it CAN implement one or more interfaces).",
    "explanation": "All enum classes are also implicitly final and cannot be subclassed.",
    "hint": "Every enum implicitly extends java.lang.Enum; multiple inheritance of classes is forbidden.",
    "level": "Intermediate",
    "codeExample": "// enum Bad extends Parent {} // COMPILE ERROR: Cannot extend another class"
  }
];

export default topic2_questions;