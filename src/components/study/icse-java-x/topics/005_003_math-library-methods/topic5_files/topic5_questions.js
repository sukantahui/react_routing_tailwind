const questions = [
  {
    "id": 1,
    "question": "What is the primary function and signature of Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #1 - Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0. Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0."
  },
  {
    "id": 2,
    "question": "What is the exact return type of Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #2 - Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0. Always avoid common pitfall: Assuming Math.random() can return 1.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0."
  },
  {
    "id": 3,
    "question": "Which package does Math.random() and Range Scaling belong to, and does it require an explicit import?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #3 - Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive. Always avoid common pitfall: Missing the '+ 1' in range size causing upper bound exclusion.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination trap exists in Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #4 - Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6. Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6."
  },
  {
    "id": 5,
    "question": "How does Math.random() and Range Scaling handle negative numerical arguments?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #5 - Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6). Always avoid common pitfall: Assuming Math.random() can return 1.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6)."
  },
  {
    "id": 6,
    "question": "What happens if you pass an integer argument to Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #1 - Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0. Always avoid common pitfall: Missing the '+ 1' in range size causing upper bound exclusion.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0."
  },
  {
    "id": 7,
    "question": "Can Math.random() and Range Scaling be called without an object instance (static method)?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #2 - Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0. Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0."
  },
  {
    "id": 8,
    "question": "How do you write a Java expression for a mathematical formula using Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #3 - Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive. Always avoid common pitfall: Assuming Math.random() can return 1.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive."
  },
  {
    "id": 9,
    "question": "What runtime value or exception is produced if invalid input is given to Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #4 - Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6. Always avoid common pitfall: Missing the '+ 1' in range size causing upper bound exclusion.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6."
  },
  {
    "id": 10,
    "question": "How does Math.random() and Range Scaling differ from its counterpart method?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #5 - Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6). Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6)."
  },
  {
    "id": 11,
    "question": "How does BlueJ display the output of Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #1 - Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0. Always avoid common pitfall: Assuming Math.random() can return 1.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0."
  },
  {
    "id": 12,
    "question": "How do parentheses affect operator precedence when combined with Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #2 - Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0. Always avoid common pitfall: Missing the '+ 1' in range size causing upper bound exclusion.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0."
  },
  {
    "id": 13,
    "question": "What is the difference between float and double overloads in Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #3 - Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive. Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive."
  },
  {
    "id": 14,
    "question": "How is Math.random() and Range Scaling used in Section B class design programs?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #4 - Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6. Always avoid common pitfall: Assuming Math.random() can return 1.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6."
  },
  {
    "id": 15,
    "question": "Why is explicit casting required when assigning the result of Math.random() and Range Scaling to an integer?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #5 - Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6). Always avoid common pitfall: Missing the '+ 1' in range size causing upper bound exclusion.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6)."
  },
  {
    "id": 16,
    "question": "How does Math.random() and Range Scaling evaluate floating-point boundary values (0.0, -0.0, NaN)?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #1 - Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0. Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0."
  },
  {
    "id": 17,
    "question": "What is the significance of Math.PI and Math.E in calculations involving Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #2 - Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0. Always avoid common pitfall: Assuming Math.random() can return 1.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #3 - Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive. Always avoid common pitfall: Missing the '+ 1' in range size causing upper bound exclusion.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive."
  },
  {
    "id": 19,
    "question": "How is Math.random() and Range Scaling tested in Section A 2-mark output prediction questions?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #4 - Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6. Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6."
  },
  {
    "id": 20,
    "question": "How does integer division (e.g. 1/2) affect formulas using Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #5 - Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6). Always avoid common pitfall: Assuming Math.random() can return 1.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6)."
  },
  {
    "id": 21,
    "question": "What happens if you use the '^' operator instead of Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #1 - Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0. Always avoid common pitfall: Missing the '+ 1' in range size causing upper bound exclusion.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Range: Returns a double value in the half-open range: 0.0 <= Math.random() < 1.0."
  },
  {
    "id": 22,
    "question": "How does Banker's rounding apply when evaluating Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #2 - Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0. Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Never Returns 1.0: The upper bound 1.0 is exclusive; it will never return exactly 1.0."
  },
  {
    "id": 23,
    "question": "Can Math.random() and Range Scaling be used in conditional if-else statements?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #3 - Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive. Always avoid common pitfall: Assuming Math.random() can return 1.0.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Integer Scaling Formula: (int)(Math.random() * (max - min + 1)) + min generates integers between min and max inclusive."
  },
  {
    "id": 24,
    "question": "How do you generate an arbitrary range using Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #4 - Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6. Always avoid common pitfall: Missing the '+ 1' in range size causing upper bound exclusion.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Dice Roll Example: (int)(Math.random() * 6) + 1 yields random integers from 1 to 6."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full 100/100 on Math.random() and Range Scaling?",
    "shortAnswer": "Math.random() and Range Scaling: Fundamental ICSE rule #5 - Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.random() and Range Scaling is a core mathematical library topic. Math.random() generates a pseudorandom double value greater than or equal to 0.0 and strictly less than 1.0 [0.0, 1.0). To generate integers in an arbitrary range [min, max], developers scale and shift the formula: (int)(Math.random() * (max - min + 1)) + min. Key syllabus rule: Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6). Always avoid common pitfall: The classic cast precedence bug: (int) Math.random() * 10 evaluates to 0 * 10 = 0 every time!",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// MathRandomDemo.java\n// Parentheses Precedence: Casting '(int) Math.random() * 6' ALWAYS evaluates to 0 because (int) casts the [0, 1) decimal to 0 first! Must write: (int)(Math.random() * 6)."
  }
];

export default questions;
