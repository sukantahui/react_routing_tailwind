const questions = [
  {
    "id": 1,
    "question": "What is the primary function and signature of Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #1 - Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'. Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'."
  },
  {
    "id": 2,
    "question": "What is the exact return type of Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #2 - Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a). Always avoid common pitfall: Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)."
  },
  {
    "id": 3,
    "question": "Which package does Writing Mathematical Expressions in Java belong to, and does it require an explicit import?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #3 - Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'. Always avoid common pitfall: Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination trap exists in Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #4 - Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt(). Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt()."
  },
  {
    "id": 5,
    "question": "How does Writing Mathematical Expressions in Java handle negative numerical arguments?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #5 - Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y). Always avoid common pitfall: Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y)."
  },
  {
    "id": 6,
    "question": "What happens if you pass an integer argument to Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #1 - Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'. Always avoid common pitfall: Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'."
  },
  {
    "id": 7,
    "question": "Can Writing Mathematical Expressions in Java be called without an object instance (static method)?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #2 - Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a). Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)."
  },
  {
    "id": 8,
    "question": "How do you write a Java expression for a mathematical formula using Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #3 - Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'. Always avoid common pitfall: Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'."
  },
  {
    "id": 9,
    "question": "What runtime value or exception is produced if invalid input is given to Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #4 - Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt(). Always avoid common pitfall: Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt()."
  },
  {
    "id": 10,
    "question": "How does Writing Mathematical Expressions in Java differ from its counterpart method?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #5 - Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y). Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y)."
  },
  {
    "id": 11,
    "question": "How does BlueJ display the output of Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #1 - Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'. Always avoid common pitfall: Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'."
  },
  {
    "id": 12,
    "question": "How do parentheses affect operator precedence when combined with Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #2 - Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a). Always avoid common pitfall: Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)."
  },
  {
    "id": 13,
    "question": "What is the difference between float and double overloads in Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #3 - Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'. Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'."
  },
  {
    "id": 14,
    "question": "How is Writing Mathematical Expressions in Java used in Section B class design programs?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #4 - Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt(). Always avoid common pitfall: Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt()."
  },
  {
    "id": 15,
    "question": "Why is explicit casting required when assigning the result of Writing Mathematical Expressions in Java to an integer?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #5 - Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y). Always avoid common pitfall: Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y)."
  },
  {
    "id": 16,
    "question": "How does Writing Mathematical Expressions in Java evaluate floating-point boundary values (0.0, -0.0, NaN)?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #1 - Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'. Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'."
  },
  {
    "id": 17,
    "question": "What is the significance of Math.PI and Math.E in calculations involving Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #2 - Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a). Always avoid common pitfall: Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #3 - Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'. Always avoid common pitfall: Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'."
  },
  {
    "id": 19,
    "question": "How is Writing Mathematical Expressions in Java tested in Section A 2-mark output prediction questions?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #4 - Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt(). Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt()."
  },
  {
    "id": 20,
    "question": "How does integer division (e.g. 1/2) affect formulas using Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #5 - Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y). Always avoid common pitfall: Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y)."
  },
  {
    "id": 21,
    "question": "What happens if you use the '^' operator instead of Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #1 - Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'. Always avoid common pitfall: Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'."
  },
  {
    "id": 22,
    "question": "How does Banker's rounding apply when evaluating Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #2 - Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a). Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)."
  },
  {
    "id": 23,
    "question": "Can Writing Mathematical Expressions in Java be used in conditional if-else statements?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #3 - Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'. Always avoid common pitfall: Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'."
  },
  {
    "id": 24,
    "question": "How do you generate an arbitrary range using Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #4 - Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt(). Always avoid common pitfall: Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt()."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full 100/100 on Writing Mathematical Expressions in Java?",
    "shortAnswer": "Writing Mathematical Expressions in Java: Fundamental ICSE rule #5 - Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, Writing Mathematical Expressions in Java is a core mathematical library topic. In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence. Key syllabus rule: Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y). Always avoid common pitfall: Omitting the * operator: writing 2a instead of 2 * a causes compile error.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// MathExpressionsDemo.java\n// Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y)."
  }
];

export default questions;
