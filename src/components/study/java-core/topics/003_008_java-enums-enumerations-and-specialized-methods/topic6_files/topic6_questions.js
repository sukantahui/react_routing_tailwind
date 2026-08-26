const topic6_questions = [
  {
    "question": "How do you attach custom properties (like integer codes or description strings) to Java enum constants?",
    "shortAnswer": "Declare final instance variables in the enum, define a private constructor accepting those parameters, and supply the arguments in parentheses right next to each constant declaration (e.g. 'OK(200, \"Success\")'). Add public getter methods to expose the values.",
    "explanation": "Constants must be listed FIRST before any fields, constructors, or methods.",
    "hint": "Declare instance fields, add private constructor, and pass parameters to constants.",
    "level": "Beginner",
    "codeExample": "public enum Code { SUCCESS(0), ERROR(1); private final int c; Code(int c){this.c=c;} }"
  }
];

export default topic6_questions;