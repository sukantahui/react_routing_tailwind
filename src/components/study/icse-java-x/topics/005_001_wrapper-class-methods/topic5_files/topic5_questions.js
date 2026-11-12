const questions = [
  {
    "id": 1,
    "question": "What is the return type of Integer.toString?",
    "shortAnswer": "String",
    "explanation": "Integer.toString returns String.",
    "hint": "Returns String",
    "level": "basic",
    "options": [
      "int",
      "double",
      "String",
      "void"
    ],
    "correctAnswer": 2,
    "codeExample": "String val = Integer.toString(\"100\");"
  },
  {
    "id": 2,
    "question": "What exception is thrown if the String does not contain a parsable number in Integer.toString?",
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
    "codeExample": "Integer.toString(\"abc\"); // NumberFormatException"
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
    "question": "Question 6 on Integer.toString: How does Integer.toString evaluate numeric input 6?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 6 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Integer.toString"
  },
  {
    "id": 7,
    "question": "Question 7 on Integer.toString: How does Integer.toString evaluate numeric input 7?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 7 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Integer.toString"
  },
  {
    "id": 8,
    "question": "Question 8 on Integer.toString: How does Integer.toString evaluate numeric input 8?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 8 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Integer.toString"
  },
  {
    "id": 9,
    "question": "Question 9 on Integer.toString: How does Integer.toString evaluate numeric input 9?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 9 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Integer.toString"
  },
  {
    "id": 10,
    "question": "Question 10 on Integer.toString: How does Integer.toString evaluate numeric input 10?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 10 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "basic",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Integer.toString"
  },
  {
    "id": 11,
    "question": "Question 11 on Integer.toString: How does Integer.toString evaluate numeric input 11?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 11 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Integer.toString"
  },
  {
    "id": 12,
    "question": "Question 12 on Integer.toString: How does Integer.toString evaluate numeric input 12?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 12 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Integer.toString"
  },
  {
    "id": 13,
    "question": "Question 13 on Integer.toString: How does Integer.toString evaluate numeric input 13?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 13 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Integer.toString"
  },
  {
    "id": 14,
    "question": "Question 14 on Integer.toString: How does Integer.toString evaluate numeric input 14?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 14 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Integer.toString"
  },
  {
    "id": 15,
    "question": "Question 15 on Integer.toString: How does Integer.toString evaluate numeric input 15?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 15 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Integer.toString"
  },
  {
    "id": 16,
    "question": "Question 16 on Integer.toString: How does Integer.toString evaluate numeric input 16?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 16 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Integer.toString"
  },
  {
    "id": 17,
    "question": "Question 17 on Integer.toString: How does Integer.toString evaluate numeric input 17?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 17 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Integer.toString"
  },
  {
    "id": 18,
    "question": "Question 18 on Integer.toString: How does Integer.toString evaluate numeric input 18?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 18 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "intermediate",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Integer.toString"
  },
  {
    "id": 19,
    "question": "Question 19 on Integer.toString: How does Integer.toString evaluate numeric input 19?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 19 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Integer.toString"
  },
  {
    "id": 20,
    "question": "Question 20 on Integer.toString: How does Integer.toString evaluate numeric input 20?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 20 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Integer.toString"
  },
  {
    "id": 21,
    "question": "Question 21 on Integer.toString: How does Integer.toString evaluate numeric input 21?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 21 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Integer.toString"
  },
  {
    "id": 22,
    "question": "Question 22 on Integer.toString: How does Integer.toString evaluate numeric input 22?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 22 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Integer.toString"
  },
  {
    "id": 23,
    "question": "Question 23 on Integer.toString: How does Integer.toString evaluate numeric input 23?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 23 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Integer.toString"
  },
  {
    "id": 24,
    "question": "Question 24 on Integer.toString: How does Integer.toString evaluate numeric input 24?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 24 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Integer.toString"
  },
  {
    "id": 25,
    "question": "Question 25 on Integer.toString: How does Integer.toString evaluate numeric input 25?",
    "shortAnswer": "Converts primitive number into its String textual representation.",
    "explanation": "Wrapper methods perform robust data type parsing and validation. Question 25 reviews conversion mechanics and exception boundaries.",
    "hint": "Testing Integer.toString.",
    "level": "advanced",
    "options": [
      "Throws compile error",
      "Converts primitive number into its String textual representation.",
      "Returns 0 always",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Integer.toString"
  }
];

export default questions;
