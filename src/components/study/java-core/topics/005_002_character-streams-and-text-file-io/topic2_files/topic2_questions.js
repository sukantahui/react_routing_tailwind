const topic2_questions = [
  {
    "question": "Why does the 'Reader.read()' method return an 'int' instead of a 'char' in Java?",
    "shortAnswer": "Because 'char' is an unsigned 16-bit type (range 0 to 65535) and cannot represent the End-Of-File sentinel signal (-1). By returning an 'int' (32-bit signed), the method can return valid character codes (0 to 65535) while using '-1' unambiguously to signal EOF.",
    "explanation": "If read() returned char, there would be no way to distinguish char '\\uFFFF' (65535) from EOF.",
    "hint": "An int is required to accommodate the special -1 End-of-File (EOF) sentinel value.",
    "level": "Beginner",
    "codeExample": "int ch = reader.read(); if (ch == -1) { /* EOF reached */ }"
  }
];

export default topic2_questions;