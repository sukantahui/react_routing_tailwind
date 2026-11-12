const questions = [
  {
    "id": 1,
    "question": "What constitutes a Method Signature in Java?",
    "shortAnswer": "The method name and the parameter list (types and order).",
    "explanation": "Return type and access specifiers are NOT part of the method signature.",
    "hint": "Name and parameter list",
    "level": "basic",
    "options": [
      "Method name and return type",
      "Method name and parameter list",
      "Return type and access specifier",
      "Package name and class name"
    ],
    "correctAnswer": 1,
    "codeExample": "void compute(int a, double b) // signature: compute(int, double)"
  },
  {
    "id": 2,
    "question": "Does Java support Pass-by-Reference for primitive types?",
    "shortAnswer": "No, Java is strictly PASS-BY-VALUE for everything.",
    "explanation": "For primitives, a copy of the value is passed; changes inside the method do not affect the caller.",
    "hint": "Strictly pass-by-value",
    "level": "basic",
    "options": [
      "Yes, using & operator",
      "No, Java is strictly pass-by-value",
      "Only in BlueJ",
      "Only for arrays"
    ],
    "correctAnswer": 1,
    "codeExample": "void swap(int a, int b) // caller variables unchanged"
  },
  {
    "id": 3,
    "question": "What does the 'void' keyword signify as a return type?",
    "shortAnswer": "The method does not return any value to the caller.",
    "explanation": "A void method completes its task without returning data.",
    "hint": "No return value",
    "level": "basic",
    "options": [
      "Returns 0",
      "Returns null",
      "Method does not return any value",
      "Returns boolean false"
    ],
    "correctAnswer": 2,
    "codeExample": "public void display() { ... }"
  },
  {
    "id": 4,
    "question": "What is the scope of a local variable declared inside a method?",
    "shortAnswer": "Accessible ONLY within that method, from its declaration to the closing brace '}'.",
    "explanation": "Local variables are created on the Call Stack and destroyed when method finishes.",
    "hint": "Enclosing method block",
    "level": "basic",
    "options": [
      "Throughout the entire class",
      "Only within the declaring method block",
      "Across all package classes",
      "Global scope"
    ],
    "correctAnswer": 1,
    "codeExample": "void calc() { int x = 10; } // x invisible outside"
  },
  {
    "id": 5,
    "question": "What is Method Overloading?",
    "shortAnswer": "Having multiple methods in the SAME class with the SAME name but DIFFERENT parameter lists.",
    "explanation": "Compile-time polymorphism based on parameter count, types, or order.",
    "hint": "Same name, different parameters",
    "level": "basic",
    "options": [
      "Same name and parameters in subclass",
      "Same name, different parameters in same class",
      "Different return types only",
      "Methods without bodies"
    ],
    "correctAnswer": 1,
    "codeExample": "void print(int x); void print(String s);"
  },
  {
    "id": 6,
    "question": "Question 6 on Method Definition and Body: What rule or execution behavior applies in scenario 6?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 6 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Method Definition and Body"
  },
  {
    "id": 7,
    "question": "Question 7 on Method Definition and Body: What rule or execution behavior applies in scenario 7?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 7 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Method Definition and Body"
  },
  {
    "id": 8,
    "question": "Question 8 on Method Definition and Body: What rule or execution behavior applies in scenario 8?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 8 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Method Definition and Body"
  },
  {
    "id": 9,
    "question": "Question 9 on Method Definition and Body: What rule or execution behavior applies in scenario 9?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 9 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Method Definition and Body"
  },
  {
    "id": 10,
    "question": "Question 10 on Method Definition and Body: What rule or execution behavior applies in scenario 10?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 10 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Method Definition and Body"
  },
  {
    "id": 11,
    "question": "Question 11 on Method Definition and Body: What rule or execution behavior applies in scenario 11?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 11 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Method Definition and Body"
  },
  {
    "id": 12,
    "question": "Question 12 on Method Definition and Body: What rule or execution behavior applies in scenario 12?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 12 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Method Definition and Body"
  },
  {
    "id": 13,
    "question": "Question 13 on Method Definition and Body: What rule or execution behavior applies in scenario 13?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 13 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Method Definition and Body"
  },
  {
    "id": 14,
    "question": "Question 14 on Method Definition and Body: What rule or execution behavior applies in scenario 14?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 14 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Method Definition and Body"
  },
  {
    "id": 15,
    "question": "Question 15 on Method Definition and Body: What rule or execution behavior applies in scenario 15?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 15 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Method Definition and Body"
  },
  {
    "id": 16,
    "question": "Question 16 on Method Definition and Body: What rule or execution behavior applies in scenario 16?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 16 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Method Definition and Body"
  },
  {
    "id": 17,
    "question": "Question 17 on Method Definition and Body: What rule or execution behavior applies in scenario 17?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 17 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Method Definition and Body"
  },
  {
    "id": 18,
    "question": "Question 18 on Method Definition and Body: What rule or execution behavior applies in scenario 18?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 18 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Method Definition and Body"
  },
  {
    "id": 19,
    "question": "Question 19 on Method Definition and Body: What rule or execution behavior applies in scenario 19?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 19 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Method Definition and Body"
  },
  {
    "id": 20,
    "question": "Question 20 on Method Definition and Body: What rule or execution behavior applies in scenario 20?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 20 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Method Definition and Body"
  },
  {
    "id": 21,
    "question": "Question 21 on Method Definition and Body: What rule or execution behavior applies in scenario 21?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 21 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Method Definition and Body"
  },
  {
    "id": 22,
    "question": "Question 22 on Method Definition and Body: What rule or execution behavior applies in scenario 22?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 22 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Method Definition and Body"
  },
  {
    "id": 23,
    "question": "Question 23 on Method Definition and Body: What rule or execution behavior applies in scenario 23?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 23 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Method Definition and Body"
  },
  {
    "id": 24,
    "question": "Question 24 on Method Definition and Body: What rule or execution behavior applies in scenario 24?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 24 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Method Definition and Body"
  },
  {
    "id": 25,
    "question": "Question 25 on Method Definition and Body: What rule or execution behavior applies in scenario 25?",
    "shortAnswer": "The method body executes sequentially and must return a compatible value if non-void.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 25 reviews method design and execution rules.",
    "hint": "Testing Method Definition and Body.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "The method body executes sequentially and must return a compatible value if non-void.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Method Definition and Body"
  }
];

export default questions;
