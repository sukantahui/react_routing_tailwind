const questions = [
  {
    "id": 1,
    "question": "What is the return type of the method Math.sqrt(x) in Java?",
    "shortAnswer": "double",
    "explanation": "Math.sqrt(double a) always returns a value of primitive type double, regardless of whether the argument passed is an int, float, or double.",
    "hint": "Recall if Math functions return integers or floating-point numbers.",
    "level": "basic",
    "options": [
      "int",
      "double",
      "float",
      "long"
    ],
    "correctAnswer": 1,
    "codeExample": "double res = Math.sqrt(49); // res = 7.0"
  },
  {
    "id": 2,
    "question": "What is the output of System.out.println(Math.sqrt(49));?",
    "shortAnswer": "7.0",
    "explanation": "The square root of 49 is 7. Because Math.sqrt returns a double, it displays 7.0.",
    "hint": "Double values always include a decimal point.",
    "level": "basic",
    "options": [
      "7",
      "7.0",
      "7.0f",
      "49.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(49)); // 7.0"
  },
  {
    "id": 3,
    "question": "What will Math.sqrt(-25) return in Java?",
    "shortAnswer": "Double.NaN (Not a Number)",
    "explanation": "The square root of a negative real number is not defined in the real number system. Java returns Double.NaN. It does NOT throw an exception.",
    "hint": "Think about what Java returns when a real mathematical result is undefined.",
    "level": "intermediate",
    "options": [
      "-5.0",
      "ArithmeticException",
      "NaN",
      "0.0"
    ],
    "correctAnswer": 2,
    "codeExample": "System.out.println(Math.sqrt(-25)); // NaN"
  },
  {
    "id": 4,
    "question": "Which of the following assignments is syntactically invalid without an explicit cast?",
    "shortAnswer": "int root = Math.sqrt(64);",
    "explanation": "Math.sqrt returns double. Assigning double to int requires narrowing casting: int root = (int) Math.sqrt(64);.",
    "hint": "Double cannot be stored in an int without casting.",
    "level": "basic",
    "options": [
      "double root = Math.sqrt(64);",
      "int root = (int) Math.sqrt(64);",
      "int root = Math.sqrt(64);",
      "float root = (float) Math.sqrt(64);"
    ],
    "correctAnswer": 2,
    "codeExample": "int root = (int) Math.sqrt(64); // Correct cast"
  },
  {
    "id": 5,
    "question": "What is the output of System.out.println(Math.sqrt(0));?",
    "shortAnswer": "0.0",
    "explanation": "The square root of 0 is 0.0 as a double.",
    "hint": "Square root of zero.",
    "level": "basic",
    "options": [
      "0",
      "0.0",
      "NaN",
      "null"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(0)); // 0.0"
  },
  {
    "id": 6,
    "question": "Convert the algebraic expression √(x^2 + y^2) into valid Java code.",
    "shortAnswer": "Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))",
    "explanation": "The outer square root is computed via Math.sqrt() and exponents using Math.pow() or (x*x + y*y).",
    "hint": "Use Math.sqrt on the sum of squares.",
    "level": "basic",
    "options": [
      "sqrt(x^2 + y^2)",
      "Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))",
      "Math.sqrt(x^2 + y^2)",
      "Math.root(x*x + y*y)"
    ],
    "correctAnswer": 1,
    "codeExample": "double hyp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));"
  },
  {
    "id": 7,
    "question": "What is the output of Math.sqrt(0.25)?",
    "shortAnswer": "0.5",
    "explanation": "0.5 * 0.5 = 0.25. Therefore, Math.sqrt(0.25) evaluates to 0.5.",
    "hint": "What fraction squared gives one quarter?",
    "level": "intermediate",
    "options": [
      "0.05",
      "0.5",
      "0.025",
      "5.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(0.25)); // 0.5"
  },
  {
    "id": 8,
    "question": "What is the output of System.out.println(Math.sqrt(Math.sqrt(16)));?",
    "shortAnswer": "2.0",
    "explanation": "Inner call: Math.sqrt(16) = 4.0. Outer call: Math.sqrt(4.0) = 2.0.",
    "hint": "Evaluate inner square root first.",
    "level": "intermediate",
    "options": [
      "4.0",
      "2.0",
      "2",
      "16.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(Math.sqrt(16))); // 2.0"
  },
  {
    "id": 9,
    "question": "What does 'NaN' stand for in Java when returned by Math.sqrt(-9)?",
    "shortAnswer": "Not a Number",
    "explanation": "NaN is a constant in the Double and Float wrapper classes representing undefined or unrepresentable floating-point values.",
    "hint": "A standard IEEE floating point state meaning unrepresentable value.",
    "level": "basic",
    "options": [
      "Not a Number",
      "Null and Negative",
      "Negative at Number",
      "No arithmetic Number"
    ],
    "correctAnswer": 0,
    "codeExample": "double d = Math.sqrt(-9); // Double.isNaN(d) == true"
  },
  {
    "id": 10,
    "question": "Convert the quadratic formula term (-b + √(b^2 - 4ac)) / (2a) into Java code.",
    "shortAnswer": "(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)",
    "explanation": "Entire numerator and denominator must be enclosed in parentheses to ensure correct precedence.",
    "hint": "Remember parentheses around numerator and denominator (2*a).",
    "level": "intermediate",
    "options": [
      "-b + Math.sqrt(b*b - 4*a*c) / 2*a",
      "(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)",
      "(-b + sqrt(b^2 - 4ac)) / 2a",
      "(-b + Math.sqrt(Math.pow(b, 2) - 4ac)) / 2a"
    ],
    "correctAnswer": 1,
    "codeExample": "double root = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);"
  },
  {
    "id": 11,
    "question": "What will be the output of System.out.println(Math.sqrt(1));?",
    "shortAnswer": "1.0",
    "explanation": "Square root of 1 is 1.0 (double).",
    "hint": "Square root of 1.",
    "level": "basic",
    "options": [
      "1",
      "1.0",
      "0.0",
      "true"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(1)); // 1.0"
  },
  {
    "id": 12,
    "question": "Evaluate: int a = 9, b = 16; System.out.println(Math.sqrt(a) + Math.sqrt(b)); What is printed?",
    "shortAnswer": "7.0",
    "explanation": "Math.sqrt(9) = 3.0. Math.sqrt(16) = 4.0. 3.0 + 4.0 = 7.0.",
    "hint": "Sum of 3.0 and 4.0.",
    "level": "basic",
    "options": [
      "7",
      "7.0",
      "25.0",
      "5.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(9) + Math.sqrt(16)); // 7.0"
  },
  {
    "id": 13,
    "question": "What is the output of System.out.println(Math.sqrt(a + b)) where a = 9, b = 16?",
    "shortAnswer": "5.0",
    "explanation": "a + b = 9 + 16 = 25. Math.sqrt(25) = 5.0.",
    "hint": "Sum inside the parentheses first.",
    "level": "basic",
    "options": [
      "7.0",
      "5.0",
      "5",
      "25.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(9 + 16)); // 5.0"
  },
  {
    "id": 14,
    "question": "True or False: Math.sqrt() is an overloaded method in java.lang.Math.",
    "shortAnswer": "False (it only has one signature: Math.sqrt(double a))",
    "explanation": "Unlike Math.abs or Math.max, Math.sqrt only has a single version taking a double parameter: public static double sqrt(double a). Other numeric types are implicitly widened to double.",
    "hint": "Check whether there is an int version of sqrt in Java.",
    "level": "intermediate",
    "options": [
      "True, there is Math.sqrt(int) and Math.sqrt(double)",
      "False, only public static double sqrt(double a) exists",
      "True, it is overloaded for all 8 primitive types",
      "False, sqrt is an instance method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Only Math.sqrt(double a) is defined in java.lang.Math"
  },
  {
    "id": 15,
    "question": "What is the output of System.out.println(Math.sqrt(100) * 2);?",
    "shortAnswer": "20.0",
    "explanation": "Math.sqrt(100) = 10.0. 10.0 * 2 = 20.0.",
    "hint": "10.0 times 2.",
    "level": "basic",
    "options": [
      "20",
      "20.0",
      "200.0",
      "10.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(100) * 2); // 20.0"
  },
  {
    "id": 16,
    "question": "What happens when Math.sqrt(Double.POSITIVE_INFINITY) is called?",
    "shortAnswer": "Infinity",
    "explanation": "By Java specifications, if the argument is positive infinity, the result is positive infinity.",
    "hint": "Square root of infinity is infinity.",
    "level": "advanced",
    "options": [
      "Infinity",
      "NaN",
      "Double.MAX_VALUE",
      "ArithmeticException"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.sqrt(Double.POSITIVE_INFINITY)); // Infinity"
  },
  {
    "id": 17,
    "question": "Convert the expression for diagonal of a rectangle d = √(l^2 + w^2) to Java.",
    "shortAnswer": "double d = Math.sqrt(l * l + w * w);",
    "explanation": "Math.sqrt(l * l + w * w) or Math.sqrt(Math.pow(l, 2) + Math.pow(w, 2)) correctly expresses the Pythagorean diagonal.",
    "hint": "Square l and w, add them, and take Math.sqrt.",
    "level": "basic",
    "options": [
      "d = sqrt(l^2 + w^2);",
      "double d = Math.sqrt(l * l + w * w);",
      "double d = Math.sqrt(l^2 + w^2);",
      "double d = Math.sqrt(2 * l + 2 * w);"
    ],
    "correctAnswer": 1,
    "codeExample": "double d = Math.sqrt(l * l + w * w);"
  },
  {
    "id": 18,
    "question": "What is the output of System.out.println(Math.sqrt(625));?",
    "shortAnswer": "25.0",
    "explanation": "25 * 25 = 625. As double, it gives 25.0.",
    "hint": "Square root of 625.",
    "level": "basic",
    "options": [
      "25",
      "25.0",
      "15.0",
      "125.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(625)); // 25.0"
  },
  {
    "id": 19,
    "question": "What is the output of Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2));?",
    "shortAnswer": "5.0",
    "explanation": "3^2 = 9.0, 4^2 = 16.0, 9.0 + 16.0 = 25.0, Math.sqrt(25.0) = 5.0.",
    "hint": "3-4-5 right triangle hypotenuse.",
    "level": "basic",
    "options": [
      "7.0",
      "5.0",
      "25.0",
      "12.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2))); // 5.0"
  },
  {
    "id": 20,
    "question": "What is the output of System.out.println((int) Math.sqrt(81));?",
    "shortAnswer": "9",
    "explanation": "Math.sqrt(81) = 9.0. Explicit cast (int) 9.0 truncates decimal part to produce integer 9.",
    "hint": "Explicit cast converts 9.0 to integer 9.",
    "level": "basic",
    "options": [
      "9.0",
      "9",
      "81",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println((int) Math.sqrt(81)); // 9"
  },
  {
    "id": 21,
    "question": "What is the output of System.out.println(Math.sqrt(100.0 / 4.0));?",
    "shortAnswer": "5.0",
    "explanation": "100.0 / 4.0 = 25.0. Math.sqrt(25.0) = 5.0.",
    "hint": "Divide first, then take square root.",
    "level": "basic",
    "options": [
      "25.0",
      "5.0",
      "5",
      "50.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(100.0 / 4.0)); // 5.0"
  },
  {
    "id": 22,
    "question": "What will Math.sqrt(-0.0) return in Java?",
    "shortAnswer": "-0.0",
    "explanation": "According to IEEE 754 and Java specification, if the argument is negative zero (-0.0), the result is negative zero (-0.0).",
    "hint": "Special IEEE signed zero rule.",
    "level": "advanced",
    "options": [
      "NaN",
      "0.0",
      "-0.0",
      "ArithmeticException"
    ],
    "correctAnswer": 2,
    "codeExample": "System.out.println(Math.sqrt(-0.0)); // -0.0"
  },
  {
    "id": 23,
    "question": "Evaluate: double val = Math.sqrt(144) / 3; What is val?",
    "shortAnswer": "4.0",
    "explanation": "Math.sqrt(144) = 12.0. 12.0 / 3 = 4.0.",
    "hint": "12.0 divided by 3.",
    "level": "basic",
    "options": [
      "4",
      "4.0",
      "48.0",
      "12.0"
    ],
    "correctAnswer": 1,
    "codeExample": "double val = Math.sqrt(144) / 3; // 4.0"
  },
  {
    "id": 24,
    "question": "How to check if Math.sqrt(x) returned an invalid result (NaN) in Java?",
    "shortAnswer": "Double.isNaN(Math.sqrt(x))",
    "explanation": "Because NaN == NaN always evaluates to false, the method Double.isNaN() must be used to test if a value is NaN.",
    "hint": "You cannot compare NaN using ==; use the wrapper method.",
    "level": "advanced",
    "options": [
      "if (Math.sqrt(x) == Double.NaN)",
      "if (Double.isNaN(Math.sqrt(x)))",
      "if (Math.sqrt(x) == null)",
      "if (Math.sqrt(x) < 0)"
    ],
    "correctAnswer": 1,
    "codeExample": "if (Double.isNaN(Math.sqrt(x))) System.out.println(\"Invalid\");"
  },
  {
    "id": 25,
    "question": "What is the output of System.out.println(Math.sqrt(9) * Math.sqrt(9));?",
    "shortAnswer": "9.0",
    "explanation": "Math.sqrt(9) = 3.0. 3.0 * 3.0 = 9.0 (as double).",
    "hint": "3.0 times 3.0.",
    "level": "basic",
    "options": [
      "9",
      "9.0",
      "81.0",
      "3.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.sqrt(9) * Math.sqrt(9)); // 9.0"
  }
];
export default questions;
