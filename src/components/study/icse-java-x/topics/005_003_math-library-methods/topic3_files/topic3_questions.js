const questions = [
  {
    "id": 1,
    "question": "What is the primary function and signature of Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #1 - Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double."
  },
  {
    "id": 2,
    "question": "What is the exact return type of Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #2 - Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0. Always avoid common pitfall: Negative ceil trap: Math.ceil(-3.8) is -3.0 (NOT -4.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0."
  },
  {
    "id": 3,
    "question": "Which package does Math.floor(x) vs Math.ceil(x) belong to, and does it require an explicit import?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #3 - Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0. Always avoid common pitfall: Expecting an integer return: Math.floor(4.5) returns double 4.0, NOT int 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination trap exists in Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #4 - Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0."
  },
  {
    "id": 5,
    "question": "How does Math.floor(x) vs Math.ceil(x) handle negative numerical arguments?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #5 - High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil. Always avoid common pitfall: Negative ceil trap: Math.ceil(-3.8) is -3.0 (NOT -4.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil."
  },
  {
    "id": 6,
    "question": "What happens if you pass an integer argument to Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #1 - Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double. Always avoid common pitfall: Expecting an integer return: Math.floor(4.5) returns double 4.0, NOT int 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double."
  },
  {
    "id": 7,
    "question": "Can Math.floor(x) vs Math.ceil(x) be called without an object instance (static method)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #2 - Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0."
  },
  {
    "id": 8,
    "question": "How do you write a Java expression for a mathematical formula using Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #3 - Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0. Always avoid common pitfall: Negative ceil trap: Math.ceil(-3.8) is -3.0 (NOT -4.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0."
  },
  {
    "id": 9,
    "question": "What runtime value or exception is produced if invalid input is given to Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #4 - Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0. Always avoid common pitfall: Expecting an integer return: Math.floor(4.5) returns double 4.0, NOT int 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0."
  },
  {
    "id": 10,
    "question": "How does Math.floor(x) vs Math.ceil(x) differ from its counterpart method?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #5 - High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil."
  },
  {
    "id": 11,
    "question": "How does BlueJ display the output of Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #1 - Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double. Always avoid common pitfall: Negative ceil trap: Math.ceil(-3.8) is -3.0 (NOT -4.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double."
  },
  {
    "id": 12,
    "question": "How do parentheses affect operator precedence when combined with Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #2 - Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0. Always avoid common pitfall: Expecting an integer return: Math.floor(4.5) returns double 4.0, NOT int 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0."
  },
  {
    "id": 13,
    "question": "What is the difference between float and double overloads in Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #3 - Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0."
  },
  {
    "id": 14,
    "question": "How is Math.floor(x) vs Math.ceil(x) used in Section B class design programs?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #4 - Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0. Always avoid common pitfall: Negative ceil trap: Math.ceil(-3.8) is -3.0 (NOT -4.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0."
  },
  {
    "id": 15,
    "question": "Why is explicit casting required when assigning the result of Math.floor(x) vs Math.ceil(x) to an integer?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #5 - High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil. Always avoid common pitfall: Expecting an integer return: Math.floor(4.5) returns double 4.0, NOT int 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil."
  },
  {
    "id": 16,
    "question": "How does Math.floor(x) vs Math.ceil(x) evaluate floating-point boundary values (0.0, -0.0, NaN)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #1 - Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double."
  },
  {
    "id": 17,
    "question": "What is the significance of Math.PI and Math.E in calculations involving Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #2 - Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0. Always avoid common pitfall: Negative ceil trap: Math.ceil(-3.8) is -3.0 (NOT -4.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #3 - Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0. Always avoid common pitfall: Expecting an integer return: Math.floor(4.5) returns double 4.0, NOT int 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0."
  },
  {
    "id": 19,
    "question": "How is Math.floor(x) vs Math.ceil(x) tested in Section A 2-mark output prediction questions?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #4 - Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0."
  },
  {
    "id": 20,
    "question": "How does integer division (e.g. 1/2) affect formulas using Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #5 - High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil. Always avoid common pitfall: Negative ceil trap: Math.ceil(-3.8) is -3.0 (NOT -4.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil."
  },
  {
    "id": 21,
    "question": "What happens if you use the '^' operator instead of Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #1 - Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double. Always avoid common pitfall: Expecting an integer return: Math.floor(4.5) returns double 4.0, NOT int 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Return Type: Both Math.floor() and Math.ceil() ALWAYS return a double."
  },
  {
    "id": 22,
    "question": "How does Banker's rounding apply when evaluating Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #2 - Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.floor Direction: Always rounds DOWN (leftward on the number line): Math.floor(4.7) = 4.0; Math.floor(-4.7) = -5.0."
  },
  {
    "id": 23,
    "question": "Can Math.floor(x) vs Math.ceil(x) be used in conditional if-else statements?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #3 - Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0. Always avoid common pitfall: Negative ceil trap: Math.ceil(-3.8) is -3.0 (NOT -4.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Math.ceil Direction: Always rounds UP (rightward on the number line): Math.ceil(4.2) = 5.0; Math.ceil(-4.2) = -4.0."
  },
  {
    "id": 24,
    "question": "How do you generate an arbitrary range using Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #4 - Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0. Always avoid common pitfall: Expecting an integer return: Math.floor(4.5) returns double 4.0, NOT int 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// Exact Integer: If the argument is already an exact integer, both return the identical double: Math.floor(5.0) = 5.0, Math.ceil(5.0) = 5.0."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full 100/100 on Math.floor(x) vs Math.ceil(x)?",
    "shortAnswer": "Math.floor(x) vs Math.ceil(x): Fundamental ICSE rule #5 - High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.floor(x) vs Math.ceil(x) is a core mathematical library topic. Math.floor(double a) returns the largest double value that is less than or equal to the argument (rounds down toward negative infinity). Math.ceil(double a) returns the smallest double value that is greater than or equal to the argument (rounds up toward positive infinity). Both ALWAYS return double. Key syllabus rule: High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil. Always avoid common pitfall: Negative floor trap: Math.floor(-3.2) is -4.0 (NOT -3.0).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// MathFloorCeilDemo.java\n// High Frequency ICSE Traps: Output prediction questions constantly test negative decimals with floor and ceil."
  }
];

export default questions;
