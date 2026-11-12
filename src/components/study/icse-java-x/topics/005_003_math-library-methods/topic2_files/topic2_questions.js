const questions = [
  {
    "id": 1,
    "question": "What is the primary function and signature of Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #1 - Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double. Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double."
  },
  {
    "id": 2,
    "question": "What is the exact return type of Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #2 - Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f). Always avoid common pitfall: Return type trap: Math.rint(4.2) returns double 4.0, while Math.round(4.2) returns long 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f)."
  },
  {
    "id": 3,
    "question": "Which package does Math.round(x) vs Math.rint(x) belong to, and does it require an explicit import?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #3 - Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4. Always avoid common pitfall: Banker's tie trap: Math.rint(1.5) is 2.0, but Math.rint(2.5) is 2.0 (nearest even number!).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination trap exists in Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #4 - Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0. Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0."
  },
  {
    "id": 5,
    "question": "How does Math.round(x) vs Math.rint(x) handle negative numerical arguments?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #5 - ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5). Always avoid common pitfall: Return type trap: Math.rint(4.2) returns double 4.0, while Math.round(4.2) returns long 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5)."
  },
  {
    "id": 6,
    "question": "What happens if you pass an integer argument to Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #1 - Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double. Always avoid common pitfall: Banker's tie trap: Math.rint(1.5) is 2.0, but Math.rint(2.5) is 2.0 (nearest even number!).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double."
  },
  {
    "id": 7,
    "question": "Can Math.round(x) vs Math.rint(x) be called without an object instance (static method)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #2 - Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f). Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f)."
  },
  {
    "id": 8,
    "question": "How do you write a Java expression for a mathematical formula using Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #3 - Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4. Always avoid common pitfall: Return type trap: Math.rint(4.2) returns double 4.0, while Math.round(4.2) returns long 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4."
  },
  {
    "id": 9,
    "question": "What runtime value or exception is produced if invalid input is given to Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #4 - Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0. Always avoid common pitfall: Banker's tie trap: Math.rint(1.5) is 2.0, but Math.rint(2.5) is 2.0 (nearest even number!).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0."
  },
  {
    "id": 10,
    "question": "How does Math.round(x) vs Math.rint(x) differ from its counterpart method?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #5 - ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5). Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5)."
  },
  {
    "id": 11,
    "question": "How does BlueJ display the output of Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #1 - Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double. Always avoid common pitfall: Return type trap: Math.rint(4.2) returns double 4.0, while Math.round(4.2) returns long 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double."
  },
  {
    "id": 12,
    "question": "How do parentheses affect operator precedence when combined with Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #2 - Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f). Always avoid common pitfall: Banker's tie trap: Math.rint(1.5) is 2.0, but Math.rint(2.5) is 2.0 (nearest even number!).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f)."
  },
  {
    "id": 13,
    "question": "What is the difference between float and double overloads in Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #3 - Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4. Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4."
  },
  {
    "id": 14,
    "question": "How is Math.round(x) vs Math.rint(x) used in Section B class design programs?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #4 - Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0. Always avoid common pitfall: Return type trap: Math.rint(4.2) returns double 4.0, while Math.round(4.2) returns long 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0."
  },
  {
    "id": 15,
    "question": "Why is explicit casting required when assigning the result of Math.round(x) vs Math.rint(x) to an integer?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #5 - ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5). Always avoid common pitfall: Banker's tie trap: Math.rint(1.5) is 2.0, but Math.rint(2.5) is 2.0 (nearest even number!).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5)."
  },
  {
    "id": 16,
    "question": "How does Math.round(x) vs Math.rint(x) evaluate floating-point boundary values (0.0, -0.0, NaN)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #1 - Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double. Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double."
  },
  {
    "id": 17,
    "question": "What is the significance of Math.PI and Math.E in calculations involving Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #2 - Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f). Always avoid common pitfall: Return type trap: Math.rint(4.2) returns double 4.0, while Math.round(4.2) returns long 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f)."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #3 - Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4. Always avoid common pitfall: Banker's tie trap: Math.rint(1.5) is 2.0, but Math.rint(2.5) is 2.0 (nearest even number!).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4."
  },
  {
    "id": 19,
    "question": "How is Math.round(x) vs Math.rint(x) tested in Section A 2-mark output prediction questions?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #4 - Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0. Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0."
  },
  {
    "id": 20,
    "question": "How does integer division (e.g. 1/2) affect formulas using Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #5 - ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5). Always avoid common pitfall: Return type trap: Math.rint(4.2) returns double 4.0, while Math.round(4.2) returns long 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5)."
  },
  {
    "id": 21,
    "question": "What happens if you use the '^' operator instead of Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #1 - Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double. Always avoid common pitfall: Banker's tie trap: Math.rint(1.5) is 2.0, but Math.rint(2.5) is 2.0 (nearest even number!).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Return Types: Math.round(double) returns long; Math.round(float) returns int; Math.rint(double) returns double."
  },
  {
    "id": 22,
    "question": "How does Banker's rounding apply when evaluating Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #2 - Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f). Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round Formula: Math.round(x) = (long) Math.floor(x + 0.5f)."
  },
  {
    "id": 23,
    "question": "Can Math.round(x) vs Math.rint(x) be used in conditional if-else statements?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #3 - Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4. Always avoid common pitfall: Return type trap: Math.rint(4.2) returns double 4.0, while Math.round(4.2) returns long 4.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.round(4.5): Returns 5; Math.round(-4.5): Evaluates to floor(-4.5 + 0.5) = floor(-4.0) = -4."
  },
  {
    "id": 24,
    "question": "How do you generate an arbitrary range using Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #4 - Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0. Always avoid common pitfall: Banker's tie trap: Math.rint(1.5) is 2.0, but Math.rint(2.5) is 2.0 (nearest even number!).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// Math.rint Banker's Rounding: If tie, rounds to nearest EVEN integer: Math.rint(2.5) returns 2.0; Math.rint(3.5) returns 4.0."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full 100/100 on Math.round(x) vs Math.rint(x)?",
    "shortAnswer": "Math.round(x) vs Math.rint(x): Fundamental ICSE rule #5 - ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Math.round(x) vs Math.rint(x) is a core mathematical library topic. Math.round() returns the closest long (for double) or int (for float) by adding 0.5 and taking the floor. Math.rint() rounds to the nearest double value; if two integers are equally close (e.g. .5), it rounds to the EVEN integer (Banker's rounding). Key syllabus rule: ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5). Always avoid common pitfall: Negative rounding trap: Math.round(-4.5) evaluates to -4 (NOT -5).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// MathRoundRintDemo.java\n// ICSE Golden Question: Board papers frequently ask the output of Math.round(-3.5) vs Math.rint(-3.5)."
  }
];

export default questions;
