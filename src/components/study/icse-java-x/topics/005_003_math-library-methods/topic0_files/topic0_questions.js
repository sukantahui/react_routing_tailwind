const questions = [
  {
    "id": 1,
    "question": "What is the primary function and signature of Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #1 - Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers. Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers."
  },
  {
    "id": 2,
    "question": "What is the exact return type of Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #2 - Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8. Always avoid common pitfall: Expecting Math.sqrt(-25) to throw an arithmetic exception; it returns NaN.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8."
  },
  {
    "id": 3,
    "question": "Which package does Math.pow(a, b) and Math.sqrt(x) belong to, and does it require an explicit import?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #3 - Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception. Always avoid common pitfall: Writing 'pow(a, b)' without the class prefix 'Math.'.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination trap exists in Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #4 - Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Zero Power: Math.pow(x, 0) always returns 1.0 for any x. Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Zero Power: Math.pow(x, 0) always returns 1.0 for any x."
  },
  {
    "id": 5,
    "question": "How does Math.pow(a, b) and Math.sqrt(x) handle negative numerical arguments?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #5 - Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3); Always avoid common pitfall: Expecting Math.sqrt(-25) to throw an arithmetic exception; it returns NaN.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);"
  },
  {
    "id": 6,
    "question": "What happens if you pass an integer argument to Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #1 - Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers. Always avoid common pitfall: Writing 'pow(a, b)' without the class prefix 'Math.'.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers."
  },
  {
    "id": 7,
    "question": "Can Math.pow(a, b) and Math.sqrt(x) be called without an object instance (static method)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #2 - Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8. Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8."
  },
  {
    "id": 8,
    "question": "How do you write a Java expression for a mathematical formula using Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #3 - Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception. Always avoid common pitfall: Expecting Math.sqrt(-25) to throw an arithmetic exception; it returns NaN.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception."
  },
  {
    "id": 9,
    "question": "What runtime value or exception is produced if invalid input is given to Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #4 - Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Zero Power: Math.pow(x, 0) always returns 1.0 for any x. Always avoid common pitfall: Writing 'pow(a, b)' without the class prefix 'Math.'.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Zero Power: Math.pow(x, 0) always returns 1.0 for any x."
  },
  {
    "id": 10,
    "question": "How does Math.pow(a, b) and Math.sqrt(x) differ from its counterpart method?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #5 - Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3); Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);"
  },
  {
    "id": 11,
    "question": "How does BlueJ display the output of Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #1 - Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers. Always avoid common pitfall: Expecting Math.sqrt(-25) to throw an arithmetic exception; it returns NaN.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers."
  },
  {
    "id": 12,
    "question": "How do parentheses affect operator precedence when combined with Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #2 - Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8. Always avoid common pitfall: Writing 'pow(a, b)' without the class prefix 'Math.'.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8."
  },
  {
    "id": 13,
    "question": "What is the difference between float and double overloads in Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #3 - Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception. Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception."
  },
  {
    "id": 14,
    "question": "How is Math.pow(a, b) and Math.sqrt(x) used in Section B class design programs?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #4 - Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Zero Power: Math.pow(x, 0) always returns 1.0 for any x. Always avoid common pitfall: Expecting Math.sqrt(-25) to throw an arithmetic exception; it returns NaN.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Zero Power: Math.pow(x, 0) always returns 1.0 for any x."
  },
  {
    "id": 15,
    "question": "Why is explicit casting required when assigning the result of Math.pow(a, b) and Math.sqrt(x) to an integer?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #5 - Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3); Always avoid common pitfall: Writing 'pow(a, b)' without the class prefix 'Math.'.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);"
  },
  {
    "id": 16,
    "question": "How does Math.pow(a, b) and Math.sqrt(x) evaluate floating-point boundary values (0.0, -0.0, NaN)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #1 - Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers. Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers."
  },
  {
    "id": 17,
    "question": "What is the significance of Math.PI and Math.E in calculations involving Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #2 - Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8. Always avoid common pitfall: Expecting Math.sqrt(-25) to throw an arithmetic exception; it returns NaN.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #3 - Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception. Always avoid common pitfall: Writing 'pow(a, b)' without the class prefix 'Math.'.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception."
  },
  {
    "id": 19,
    "question": "How is Math.pow(a, b) and Math.sqrt(x) tested in Section A 2-mark output prediction questions?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #4 - Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Zero Power: Math.pow(x, 0) always returns 1.0 for any x. Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Zero Power: Math.pow(x, 0) always returns 1.0 for any x."
  },
  {
    "id": 20,
    "question": "How does integer division (e.g. 1/2) affect formulas using Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #5 - Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3); Always avoid common pitfall: Expecting Math.sqrt(-25) to throw an arithmetic exception; it returns NaN.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);"
  },
  {
    "id": 21,
    "question": "What happens if you use the '^' operator instead of Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #1 - Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers. Always avoid common pitfall: Writing 'pow(a, b)' without the class prefix 'Math.'.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Return Type: Both Math.pow() and Math.sqrt() ALWAYS return a double, even if arguments are integers."
  },
  {
    "id": 22,
    "question": "How does Banker's rounding apply when evaluating Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #2 - Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8. Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Syntax: double res = Math.pow(2, 3); // returns 8.0, not integer 8."
  },
  {
    "id": 23,
    "question": "Can Math.pow(a, b) and Math.sqrt(x) be used in conditional if-else statements?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #3 - Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception. Always avoid common pitfall: Expecting Math.sqrt(-25) to throw an arithmetic exception; it returns NaN.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Negative Square Root: Math.sqrt(negativeNumber) returns Double.NaN (Not a Number), not an exception."
  },
  {
    "id": 24,
    "question": "How do you generate an arbitrary range using Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #4 - Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Zero Power: Math.pow(x, 0) always returns 1.0 for any x. Always avoid common pitfall: Writing 'pow(a, b)' without the class prefix 'Math.'.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Zero Power: Math.pow(x, 0) always returns 1.0 for any x.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Zero Power: Math.pow(x, 0) always returns 1.0 for any x."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full 100/100 on Math.pow(a, b) and Math.sqrt(x)?",
    "shortAnswer": "Math.pow(a, b) and Math.sqrt(x): Fundamental ICSE rule #5 - Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.pow(a, b) and Math.sqrt(x) is a core mathematical library topic. Math.pow(double a, double b) computes a raised to the power b (a^b). Math.sqrt(double x) computes the positive square root of x. Both methods belong to java.lang.Math, are static, and ALWAYS return a double value. Key syllabus rule: Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3); Always avoid common pitfall: Assuming Math.pow(2, 3) returns int 8; it returns double 8.0, causing type mismatch compile errors.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// MathPowSqrtDemo.java\n// Explicit Casting: To store in an integer, explicit cast is mandatory: int p = (int) Math.pow(2, 3);"
  }
];

export default questions;
