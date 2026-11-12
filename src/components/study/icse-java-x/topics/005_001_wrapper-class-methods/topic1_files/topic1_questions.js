const questions = [
  {
    "id": 1,
    "question": "What is the return type of Long.parseLong?",
    "shortAnswer": "long",
    "explanation": "Long.parseLong returns long.",
    "hint": "Returns long",
    "level": "basic",
    "options": [
      "int",
      "double",
      "long",
      "void"
    ],
    "correctAnswer": 2,
    "codeExample": "long val = Long.parseLong(\"7003756860\");"
  },
  {
    "id": 2,
    "question": "What exception is thrown if the String does not contain a parsable number in Long.parseLong?",
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
    "codeExample": "Long.parseLong(\"abc\"); // NumberFormatException"
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
    "question": "Question 6 on Long.parseLong: How does Long.parseLong evaluate numeric input 6?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 6 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Long.parseLong"
  },
  {
    "id": 7,
    "question": "Question 7 on Long.parseLong: How does Long.parseLong evaluate numeric input 7?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 7 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Long.parseLong"
  },
  {
    "id": 8,
    "question": "Question 8 on Long.parseLong: How does Long.parseLong evaluate numeric input 8?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 8 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Long.parseLong"
  },
  {
    "id": 9,
    "question": "Question 9 on Long.parseLong: How does Long.parseLong evaluate numeric input 9?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 9 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Long.parseLong"
  },
  {
    "id": 10,
    "question": "Question 10 on Long.parseLong: How does Long.parseLong evaluate numeric input 10?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 10 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Long.parseLong"
  },
  {
    "id": 11,
    "question": "Question 11 on Long.parseLong: How does Long.parseLong evaluate numeric input 11?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 11 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Long.parseLong"
  },
  {
    "id": 12,
    "question": "Question 12 on Long.parseLong: How does Long.parseLong evaluate numeric input 12?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 12 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Long.parseLong"
  },
  {
    "id": 13,
    "question": "Question 13 on Long.parseLong: How does Long.parseLong evaluate numeric input 13?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 13 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Long.parseLong"
  },
  {
    "id": 14,
    "question": "Question 14 on Long.parseLong: How does Long.parseLong evaluate numeric input 14?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 14 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Long.parseLong"
  },
  {
    "id": 15,
    "question": "Question 15 on Long.parseLong: How does Long.parseLong evaluate numeric input 15?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 15 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Long.parseLong"
  },
  {
    "id": 16,
    "question": "Question 16 on Long.parseLong: How does Long.parseLong evaluate numeric input 16?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 16 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Long.parseLong"
  },
  {
    "id": 17,
    "question": "Question 17 on Long.parseLong: How does Long.parseLong evaluate numeric input 17?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 17 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Long.parseLong"
  },
  {
    "id": 18,
    "question": "Question 18 on Long.parseLong: How does Long.parseLong evaluate numeric input 18?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 18 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Long.parseLong"
  },
  {
    "id": 19,
    "question": "Question 19 on Long.parseLong: How does Long.parseLong evaluate numeric input 19?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 19 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Long.parseLong"
  },
  {
    "id": 20,
    "question": "Question 20 on Long.parseLong: How does Long.parseLong evaluate numeric input 20?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 20 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Long.parseLong"
  },
  {
    "id": 21,
    "question": "Question 21 on Long.parseLong: How does Long.parseLong evaluate numeric input 21?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 21 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Long.parseLong"
  },
  {
    "id": 22,
    "question": "Question 22 on Long.parseLong: How does Long.parseLong evaluate numeric input 22?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 22 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Long.parseLong"
  },
  {
    "id": 23,
    "question": "Question 23 on Long.parseLong: How does Long.parseLong evaluate numeric input 23?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 23 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Long.parseLong"
  },
  {
    "id": 24,
    "question": "Question 24 on Long.parseLong: How does Long.parseLong evaluate numeric input 24?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 24 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Long.parseLong"
  },
  {
    "id": 25,
    "question": "Question 25 on Long.parseLong: How does Long.parseLong evaluate numeric input 25?",
    "shortAnswer": "Converts large numeric strings into primitive 64-bit long integer.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 25 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Long.parseLong.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts large numeric strings into primitive 64-bit long integer.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Long.parseLong"
  }
];

export default questions;
