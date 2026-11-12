const questions = [
  {
    "id": 1,
    "question": "What is the primary function and signature of Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #1 - Overloaded Types: Overloaded for int, long, float, and double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Overloaded Types: Overloaded for int, long, float, and double. Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Overloaded Types: Overloaded for int, long, float, and double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Overloaded Types: Overloaded for int, long, float, and double."
  },
  {
    "id": 2,
    "question": "What is the exact return type of Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #2 - Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)). Always avoid common pitfall: Mixing up negative values: Math.min(-10, -5) is -10.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c))."
  },
  {
    "id": 3,
    "question": "Which package does Math.max(a, b) and Math.min(a, b) belong to, and does it require an explicit import?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #3 - Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5. Always avoid common pitfall: Assuming result is always integer when one parameter is double.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination trap exists in Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #4 - Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10). Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10)."
  },
  {
    "id": 5,
    "question": "How does Math.max(a, b) and Math.min(a, b) handle negative numerical arguments?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #5 - Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));. Always avoid common pitfall: Mixing up negative values: Math.min(-10, -5) is -10.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));."
  },
  {
    "id": 6,
    "question": "What happens if you pass an integer argument to Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #1 - Overloaded Types: Overloaded for int, long, float, and double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Overloaded Types: Overloaded for int, long, float, and double. Always avoid common pitfall: Assuming result is always integer when one parameter is double.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Overloaded Types: Overloaded for int, long, float, and double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Overloaded Types: Overloaded for int, long, float, and double."
  },
  {
    "id": 7,
    "question": "Can Math.max(a, b) and Math.min(a, b) be called without an object instance (static method)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #2 - Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)). Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c))."
  },
  {
    "id": 8,
    "question": "How do you write a Java expression for a mathematical formula using Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #3 - Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5. Always avoid common pitfall: Mixing up negative values: Math.min(-10, -5) is -10.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5."
  },
  {
    "id": 9,
    "question": "What runtime value or exception is produced if invalid input is given to Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #4 - Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10). Always avoid common pitfall: Assuming result is always integer when one parameter is double.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10)."
  },
  {
    "id": 10,
    "question": "How does Math.max(a, b) and Math.min(a, b) differ from its counterpart method?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #5 - Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));. Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));."
  },
  {
    "id": 11,
    "question": "How does BlueJ display the output of Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #1 - Overloaded Types: Overloaded for int, long, float, and double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Overloaded Types: Overloaded for int, long, float, and double. Always avoid common pitfall: Mixing up negative values: Math.min(-10, -5) is -10.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Overloaded Types: Overloaded for int, long, float, and double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Overloaded Types: Overloaded for int, long, float, and double."
  },
  {
    "id": 12,
    "question": "How do parentheses affect operator precedence when combined with Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #2 - Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)). Always avoid common pitfall: Assuming result is always integer when one parameter is double.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c))."
  },
  {
    "id": 13,
    "question": "What is the difference between float and double overloads in Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #3 - Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5. Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5."
  },
  {
    "id": 14,
    "question": "How is Math.max(a, b) and Math.min(a, b) used in Section B class design programs?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #4 - Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10). Always avoid common pitfall: Mixing up negative values: Math.min(-10, -5) is -10.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10)."
  },
  {
    "id": 15,
    "question": "Why is explicit casting required when assigning the result of Math.max(a, b) and Math.min(a, b) to an integer?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #5 - Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));. Always avoid common pitfall: Assuming result is always integer when one parameter is double.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));."
  },
  {
    "id": 16,
    "question": "How does Math.max(a, b) and Math.min(a, b) evaluate floating-point boundary values (0.0, -0.0, NaN)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #1 - Overloaded Types: Overloaded for int, long, float, and double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Overloaded Types: Overloaded for int, long, float, and double. Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Overloaded Types: Overloaded for int, long, float, and double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Overloaded Types: Overloaded for int, long, float, and double."
  },
  {
    "id": 17,
    "question": "What is the significance of Math.PI and Math.E in calculations involving Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #2 - Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)). Always avoid common pitfall: Mixing up negative values: Math.min(-10, -5) is -10.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c))."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #3 - Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5. Always avoid common pitfall: Assuming result is always integer when one parameter is double.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5."
  },
  {
    "id": 19,
    "question": "How is Math.max(a, b) and Math.min(a, b) tested in Section A 2-mark output prediction questions?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #4 - Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10). Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10)."
  },
  {
    "id": 20,
    "question": "How does integer division (e.g. 1/2) affect formulas using Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #5 - Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));. Always avoid common pitfall: Mixing up negative values: Math.min(-10, -5) is -10.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));."
  },
  {
    "id": 21,
    "question": "What happens if you use the '^' operator instead of Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #1 - Overloaded Types: Overloaded for int, long, float, and double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Overloaded Types: Overloaded for int, long, float, and double. Always avoid common pitfall: Assuming result is always integer when one parameter is double.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Overloaded Types: Overloaded for int, long, float, and double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Overloaded Types: Overloaded for int, long, float, and double."
  },
  {
    "id": 22,
    "question": "How does Banker's rounding apply when evaluating Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #2 - Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)). Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c)).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Two Arguments: Accepts exactly two arguments; to find max of three, nest calls: Math.max(a, Math.max(b, c))."
  },
  {
    "id": 23,
    "question": "Can Math.max(a, b) and Math.min(a, b) be used in conditional if-else statements?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #3 - Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5. Always avoid common pitfall: Mixing up negative values: Math.min(-10, -5) is -10.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Type Promotion: If comparing int and double, int is widened to double and the result is double: Math.max(5, 7.5) returns 7.5."
  },
  {
    "id": 24,
    "question": "How do you generate an arbitrary range using Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #4 - Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10). Always avoid common pitfall: Assuming result is always integer when one parameter is double.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Negative Comparison: Math.max(-10, -5) returns -5 (since -5 is greater than -10)."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full 100/100 on Math.max(a, b) and Math.min(a, b)?",
    "shortAnswer": "Math.max(a, b) and Math.min(a, b): Fundamental ICSE rule #5 - Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.max(a, b) and Math.min(a, b) is a core mathematical library topic. Math.max(a, b) returns the greater of two values; Math.min(a, b) returns the smaller of two values. Both methods are overloaded for int, long, float, and double types, returning a result matching the type of the arguments. Key syllabus rule: Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));. Always avoid common pitfall: Attempting to pass three arguments: Math.max(a, b, c) causes compile error; must nest calls.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// MathMaxMinDemo.java\n// Clamping Pattern: Restricting values within range: int clamped = Math.max(minVal, Math.min(val, maxVal));."
  }
];

export default questions;
