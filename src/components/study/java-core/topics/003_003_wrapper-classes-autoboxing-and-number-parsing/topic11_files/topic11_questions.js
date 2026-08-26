const topic11_questions = [
  {
    question: "What is the allowed radix (base) range when parsing numbers using 'Integer.parseInt(str, radix)' in Java?",
    shortAnswer: "The radix must be between 'Character.MIN_RADIX' (2) and 'Character.MAX_RADIX' (36). Base 2 parses binary, Base 8 parses octal, Base 16 parses hex, and Base 36 uses digits 0-9 and all 26 English letters A-Z.",
    explanation: "Supplying a radix < 2 or > 36 throws NumberFormatException.",
    hint: "Minimum radix is 2; maximum radix is 36.",
    level: "Intermediate",
    codeExample: "int hex = Integer.parseInt(\"DEADBEEF\", 16);"
  }
];

export default topic11_questions;
