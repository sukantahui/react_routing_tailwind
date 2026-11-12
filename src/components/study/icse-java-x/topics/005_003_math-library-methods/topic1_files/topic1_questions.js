const questions = [
  {
    "id": 1,
    "question": "What is the primary function and signature of Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #1 - Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0. Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0."
  },
  {
    "id": 2,
    "question": "What is the exact return type of Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #2 - Math.cbrt Return Type: Always returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.cbrt Return Type: Always returns double. Always avoid common pitfall: Assuming Math.abs() always returns an int; it preserves parameter type (abs(-3.5) is double 3.5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.cbrt Return Type: Always returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.cbrt Return Type: Always returns double."
  },
  {
    "id": 3,
    "question": "Which package does Math.cbrt(x) and Math.abs(x) belong to, and does it require an explicit import?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #3 - Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5. Always avoid common pitfall: Confusing Math.cbrt with square root.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination trap exists in Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #4 - Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case). Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case)."
  },
  {
    "id": 5,
    "question": "How does Math.cbrt(x) and Math.abs(x) handle negative numerical arguments?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #5 - Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Common ICSE Application: Calculating absolute differences in geometric distance and currency change. Always avoid common pitfall: Assuming Math.abs() always returns an int; it preserves parameter type (abs(-3.5) is double 3.5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Common ICSE Application: Calculating absolute differences in geometric distance and currency change."
  },
  {
    "id": 6,
    "question": "What happens if you pass an integer argument to Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #1 - Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0. Always avoid common pitfall: Confusing Math.cbrt with square root.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0."
  },
  {
    "id": 7,
    "question": "Can Math.cbrt(x) and Math.abs(x) be called without an object instance (static method)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #2 - Math.cbrt Return Type: Always returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.cbrt Return Type: Always returns double. Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.cbrt Return Type: Always returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.cbrt Return Type: Always returns double."
  },
  {
    "id": 8,
    "question": "How do you write a Java expression for a mathematical formula using Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #3 - Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5. Always avoid common pitfall: Assuming Math.abs() always returns an int; it preserves parameter type (abs(-3.5) is double 3.5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5."
  },
  {
    "id": 9,
    "question": "What runtime value or exception is produced if invalid input is given to Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #4 - Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case). Always avoid common pitfall: Confusing Math.cbrt with square root.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case)."
  },
  {
    "id": 10,
    "question": "How does Math.cbrt(x) and Math.abs(x) differ from its counterpart method?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #5 - Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Common ICSE Application: Calculating absolute differences in geometric distance and currency change. Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Common ICSE Application: Calculating absolute differences in geometric distance and currency change."
  },
  {
    "id": 11,
    "question": "How does BlueJ display the output of Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #1 - Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0. Always avoid common pitfall: Assuming Math.abs() always returns an int; it preserves parameter type (abs(-3.5) is double 3.5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0."
  },
  {
    "id": 12,
    "question": "How do parentheses affect operator precedence when combined with Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #2 - Math.cbrt Return Type: Always returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.cbrt Return Type: Always returns double. Always avoid common pitfall: Confusing Math.cbrt with square root.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.cbrt Return Type: Always returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.cbrt Return Type: Always returns double."
  },
  {
    "id": 13,
    "question": "What is the difference between float and double overloads in Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #3 - Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5. Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5."
  },
  {
    "id": 14,
    "question": "How is Math.cbrt(x) and Math.abs(x) used in Section B class design programs?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #4 - Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case). Always avoid common pitfall: Assuming Math.abs() always returns an int; it preserves parameter type (abs(-3.5) is double 3.5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case)."
  },
  {
    "id": 15,
    "question": "Why is explicit casting required when assigning the result of Math.cbrt(x) and Math.abs(x) to an integer?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #5 - Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Common ICSE Application: Calculating absolute differences in geometric distance and currency change. Always avoid common pitfall: Confusing Math.cbrt with square root.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Common ICSE Application: Calculating absolute differences in geometric distance and currency change."
  },
  {
    "id": 16,
    "question": "How does Math.cbrt(x) and Math.abs(x) evaluate floating-point boundary values (0.0, -0.0, NaN)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #1 - Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0. Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0."
  },
  {
    "id": 17,
    "question": "What is the significance of Math.PI and Math.E in calculations involving Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #2 - Math.cbrt Return Type: Always returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.cbrt Return Type: Always returns double. Always avoid common pitfall: Assuming Math.abs() always returns an int; it preserves parameter type (abs(-3.5) is double 3.5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.cbrt Return Type: Always returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.cbrt Return Type: Always returns double."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #3 - Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5. Always avoid common pitfall: Confusing Math.cbrt with square root.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5."
  },
  {
    "id": 19,
    "question": "How is Math.cbrt(x) and Math.abs(x) tested in Section A 2-mark output prediction questions?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #4 - Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case). Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case)."
  },
  {
    "id": 20,
    "question": "How does integer division (e.g. 1/2) affect formulas using Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #5 - Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Common ICSE Application: Calculating absolute differences in geometric distance and currency change. Always avoid common pitfall: Assuming Math.abs() always returns an int; it preserves parameter type (abs(-3.5) is double 3.5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Common ICSE Application: Calculating absolute differences in geometric distance and currency change."
  },
  {
    "id": 21,
    "question": "What happens if you use the '^' operator instead of Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #1 - Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0. Always avoid common pitfall: Confusing Math.cbrt with square root.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Cube Root of Negative: Unlike Math.sqrt, Math.cbrt(-27) is valid and returns -3.0."
  },
  {
    "id": 22,
    "question": "How does Banker's rounding apply when evaluating Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #2 - Math.cbrt Return Type: Always returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.cbrt Return Type: Always returns double. Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Math.cbrt Return Type: Always returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.cbrt Return Type: Always returns double."
  },
  {
    "id": 23,
    "question": "Can Math.cbrt(x) and Math.abs(x) be used in conditional if-else statements?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #3 - Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5. Always avoid common pitfall: Assuming Math.abs() always returns an int; it preserves parameter type (abs(-3.5) is double 3.5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Math.abs Overloading: Returns the SAME data type as passed: Math.abs(-5) returns int 5, Math.abs(-5.5) returns double 5.5."
  },
  {
    "id": 24,
    "question": "How do you generate an arbitrary range using Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #4 - Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case). Always avoid common pitfall: Confusing Math.cbrt with square root.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Absolute Value: Distance from zero on the number line; never returns negative (except for Integer.MIN_VALUE overflow edge case)."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full 100/100 on Math.cbrt(x) and Math.abs(x)?",
    "shortAnswer": "Math.cbrt(x) and Math.abs(x): Fundamental ICSE rule #5 - Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.cbrt(x) and Math.abs(x) is a core mathematical library topic. Math.cbrt(double x) returns the cube root of a double value, correctly preserving sign (cube root of negative is negative). Math.abs(x) returns the absolute (positive) magnitude of an argument and is overloaded for int, long, float, and double. Key syllabus rule: Common ICSE Application: Calculating absolute differences in geometric distance and currency change. Always avoid common pitfall: Believing Math.cbrt(-8) returns NaN; it returns -2.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Common ICSE Application: Calculating absolute differences in geometric distance and currency change.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// MathCbrtAbsDemo.java\n// Common ICSE Application: Calculating absolute differences in geometric distance and currency change."
  }
];

export default questions;
