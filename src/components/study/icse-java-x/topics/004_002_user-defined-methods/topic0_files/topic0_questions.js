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
    "question": "Question 6 on Method Declaration and Signature: What rule or execution behavior applies in scenario 6?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 6 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Method Declaration and Signature"
  },
  {
    "id": 7,
    "question": "Question 7 on Method Declaration and Signature: What rule or execution behavior applies in scenario 7?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 7 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Method Declaration and Signature"
  },
  {
    "id": 8,
    "question": "Question 8 on Method Declaration and Signature: What rule or execution behavior applies in scenario 8?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 8 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Method Declaration and Signature"
  },
  {
    "id": 9,
    "question": "Question 9 on Method Declaration and Signature: What rule or execution behavior applies in scenario 9?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 9 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Method Declaration and Signature"
  },
  {
    "id": 10,
    "question": "Question 10 on Method Declaration and Signature: What rule or execution behavior applies in scenario 10?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 10 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "basic",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Method Declaration and Signature"
  },
  {
    "id": 11,
    "question": "Question 11 on Method Declaration and Signature: What rule or execution behavior applies in scenario 11?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 11 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Method Declaration and Signature"
  },
  {
    "id": 12,
    "question": "Question 12 on Method Declaration and Signature: What rule or execution behavior applies in scenario 12?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 12 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Method Declaration and Signature"
  },
  {
    "id": 13,
    "question": "Question 13 on Method Declaration and Signature: What rule or execution behavior applies in scenario 13?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 13 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Method Declaration and Signature"
  },
  {
    "id": 14,
    "question": "Question 14 on Method Declaration and Signature: What rule or execution behavior applies in scenario 14?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 14 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Method Declaration and Signature"
  },
  {
    "id": 15,
    "question": "Question 15 on Method Declaration and Signature: What rule or execution behavior applies in scenario 15?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 15 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Method Declaration and Signature"
  },
  {
    "id": 16,
    "question": "Question 16 on Method Declaration and Signature: What rule or execution behavior applies in scenario 16?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 16 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Method Declaration and Signature"
  },
  {
    "id": 17,
    "question": "Question 17 on Method Declaration and Signature: What rule or execution behavior applies in scenario 17?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 17 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Method Declaration and Signature"
  },
  {
    "id": 18,
    "question": "Question 18 on Method Declaration and Signature: What rule or execution behavior applies in scenario 18?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 18 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "intermediate",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Method Declaration and Signature"
  },
  {
    "id": 19,
    "question": "Question 19 on Method Declaration and Signature: What rule or execution behavior applies in scenario 19?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 19 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Method Declaration and Signature"
  },
  {
    "id": 20,
    "question": "Question 20 on Method Declaration and Signature: What rule or execution behavior applies in scenario 20?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 20 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Method Declaration and Signature"
  },
  {
    "id": 21,
    "question": "Question 21 on Method Declaration and Signature: What rule or execution behavior applies in scenario 21?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 21 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Method Declaration and Signature"
  },
  {
    "id": 22,
    "question": "Question 22 on Method Declaration and Signature: What rule or execution behavior applies in scenario 22?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 22 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Method Declaration and Signature"
  },
  {
    "id": 23,
    "question": "Question 23 on Method Declaration and Signature: What rule or execution behavior applies in scenario 23?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 23 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Method Declaration and Signature"
  },
  {
    "id": 24,
    "question": "Question 24 on Method Declaration and Signature: What rule or execution behavior applies in scenario 24?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 24 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Method Declaration and Signature"
  },
  {
    "id": 25,
    "question": "Question 25 on Method Declaration and Signature: What rule or execution behavior applies in scenario 25?",
    "shortAnswer": "Method signature consists of method name and formal parameter types in order.",
    "explanation": "Modular programming with methods divides complex problems into small, reusable components. Question 25 reviews method design and execution rules.",
    "hint": "Testing Method Declaration and Signature.",
    "level": "advanced",
    "options": [
      "Violates Java syntax",
      "Method signature consists of method name and formal parameter types in order.",
      "Requires static import",
      "Causes memory leak"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Method Declaration and Signature"
  }
];

export default questions;
