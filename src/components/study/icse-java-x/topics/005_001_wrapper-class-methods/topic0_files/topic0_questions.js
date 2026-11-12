const questions = [
  {
    "id": 1,
    "question": "What is the return type of Integer.parseInt?",
    "shortAnswer": "int",
    "explanation": "Integer.parseInt returns int.",
    "hint": "Returns int",
    "level": "basic",
    "options": [
      "int",
      "double",
      "int",
      "void"
    ],
    "correctAnswer": 2,
    "codeExample": "int val = Integer.parseInt(\"125\");"
  },
  {
    "id": 2,
    "question": "What exception is thrown if the String does not contain a parsable number in Integer.parseInt?",
    "shortAnswer": "java.lang.NumberFormatException",
    "explanation": "Parsing non-numeric strings like \"ABC\" or \"12.3a\" throws NumberFormatException.",
    "hint": "Number format error",
    "level": "basic",
    "options": [
      "NullPointerException",
      "NumberFormatException",
      "ArrayIndexOutOfBoundsException",
      "ArithmeticException"
    ],
    "correctAnswer": 1,
    "codeExample": "Integer.parseInt(\"abc\"); // NumberFormatException"
  },
  {
    "id": 3,
    "question": "In which Java standard package do Wrapper classes reside?",
    "shortAnswer": "java.lang",
    "explanation": "Integer, Long, Float, Double reside in java.lang, imported automatically.",
    "hint": "java.lang package",
    "level": "basic",
    "options": [
      "java.util",
      "java.lang",
      "java.io",
      "java.math"
    ],
    "correctAnswer": 1,
    "codeExample": "java.lang.Integer"
  },
  {
    "id": 4,
    "question": "What is Autoboxing in Java?",
    "shortAnswer": "Automatic conversion that the Java compiler makes between primitive types and their corresponding wrapper classes.",
    "explanation": "e.g. converting int to Integer automatically.",
    "hint": "Primitive to Wrapper object",
    "level": "basic",
    "options": [
      "Converting String to int",
      "Automatic conversion from primitive to wrapper object",
      "Manual casting",
      "Converting float to int"
    ],
    "correctAnswer": 1,
    "codeExample": "Integer obj = 10; // Autoboxing"
  },
  {
    "id": 5,
    "question": "What is Unboxing in Java?",
    "shortAnswer": "Automatic conversion of a wrapper class object to its corresponding primitive value.",
    "explanation": "e.g. converting Integer to int automatically.",
    "hint": "Wrapper object to primitive",
    "level": "basic",
    "options": [
      "Converting int to String",
      "Automatic conversion from wrapper object to primitive",
      "Garbage collection",
      "Deleting an object"
    ],
    "correctAnswer": 1,
    "codeExample": "int n = obj; // Unboxing"
  },
  {
    "id": 6,
    "question": "Question 6 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 6?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 6 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Integer.parseInt"
  },
  {
    "id": 7,
    "question": "Question 7 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 7?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 7 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Integer.parseInt"
  },
  {
    "id": 8,
    "question": "Question 8 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 8?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 8 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Integer.parseInt"
  },
  {
    "id": 9,
    "question": "Question 9 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 9?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 9 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Integer.parseInt"
  },
  {
    "id": 10,
    "question": "Question 10 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 10?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 10 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Integer.parseInt"
  },
  {
    "id": 11,
    "question": "Question 11 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 11?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 11 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Integer.parseInt"
  },
  {
    "id": 12,
    "question": "Question 12 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 12?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 12 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Integer.parseInt"
  },
  {
    "id": 13,
    "question": "Question 13 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 13?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 13 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Integer.parseInt"
  },
  {
    "id": 14,
    "question": "Question 14 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 14?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 14 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Integer.parseInt"
  },
  {
    "id": 15,
    "question": "Question 15 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 15?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 15 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Integer.parseInt"
  },
  {
    "id": 16,
    "question": "Question 16 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 16?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 16 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Integer.parseInt"
  },
  {
    "id": 17,
    "question": "Question 17 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 17?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 17 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Integer.parseInt"
  },
  {
    "id": 18,
    "question": "Question 18 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 18?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 18 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Integer.parseInt"
  },
  {
    "id": 19,
    "question": "Question 19 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 19?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 19 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Integer.parseInt"
  },
  {
    "id": 20,
    "question": "Question 20 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 20?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 20 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Integer.parseInt"
  },
  {
    "id": 21,
    "question": "Question 21 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 21?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 21 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Integer.parseInt"
  },
  {
    "id": 22,
    "question": "Question 22 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 22?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 22 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Integer.parseInt"
  },
  {
    "id": 23,
    "question": "Question 23 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 23?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 23 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Integer.parseInt"
  },
  {
    "id": 24,
    "question": "Question 24 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 24?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 24 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Integer.parseInt"
  },
  {
    "id": 25,
    "question": "Question 25 on Integer.parseInt: How does Integer.parseInt evaluate numeric input 25?",
    "shortAnswer": "Converts string of numeric digits into primitive 32-bit int.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 25 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.parseInt.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts string of numeric digits into primitive 32-bit int.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Integer.parseInt"
  }
];

export default questions;
