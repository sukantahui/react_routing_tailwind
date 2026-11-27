const questions = [
  {
    "id": 1,
    "question": "What is the return type of the method Math.pow(x, y) in Java?",
    "shortAnswer": "double",
    "explanation": "Math.pow(double a, double b) always returns a primitive double, even when both arguments passed are integers (e.g., Math.pow(2, 3) gives 8.0).",
    "hint": "Recall whether mathematical methods in java.lang.Math return integers or floating-point values.",
    "level": "basic",
    "options": [
      "int",
      "double",
      "float",
      "long"
    ],
    "correctAnswer": 1,
    "codeExample": "double res = Math.pow(3, 2); // res = 9.0"
  },
  {
    "id": 2,
    "question": "What is the output of System.out.println(Math.pow(4, 2));?",
    "shortAnswer": "16.0",
    "explanation": "Math.pow(4, 2) calculates 4 raised to power 2 = 16. Since the return type is double, it prints 16.0 with a decimal point.",
    "hint": "Remember to include .0 for double return types.",
    "level": "basic",
    "options": [
      "16",
      "16.0",
      "16.00",
      "Compilation Error"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.pow(4, 2)); // 16.0"
  },
  {
    "id": 3,
    "question": "Which of the following statements causes a compilation error in Java?",
    "shortAnswer": "int x = Math.pow(2, 3);",
    "explanation": "Math.pow() returns a double value. Assigning a double to an int variable without an explicit cast causes 'possible loss of precision' compile error.",
    "hint": "Look for implicit narrowing conversion from double to int.",
    "level": "basic",
    "options": [
      "double x = Math.pow(2, 3);",
      "int x = (int) Math.pow(2, 3);",
      "int x = Math.pow(2, 3);",
      "double x = Math.pow(2.5, 2);"
    ],
    "correctAnswer": 2,
    "codeExample": "int x = (int) Math.pow(2, 3); // Valid explicit cast"
  },
  {
    "id": 4,
    "question": "What is the value returned by Math.pow(25, 0)?",
    "shortAnswer": "1.0",
    "explanation": "According to mathematical and IEEE 754 rules, any non-zero number raised to the power 0 is 1.0 (as a double).",
    "hint": "Any number to the power 0 equals 1.",
    "level": "basic",
    "options": [
      "0.0",
      "1",
      "1.0",
      "25.0"
    ],
    "correctAnswer": 2,
    "codeExample": "System.out.println(Math.pow(25, 0)); // 1.0"
  },
  {
    "id": 5,
    "question": "What is the output of Math.pow(2, -2)?",
    "shortAnswer": "0.25",
    "explanation": "2^(-2) = 1 / (2^2) = 1 / 4.0 = 0.25.",
    "hint": "A negative exponent represents the reciprocal: a^(-b) = 1 / (a^b).",
    "level": "intermediate",
    "options": [
      "-4.0",
      "0.25",
      "-0.25",
      "4.0"
    ],
    "correctAnswer": 1,
    "codeExample": "double val = Math.pow(2, -2); // 0.25"
  },
  {
    "id": 6,
    "question": "What package contains the Math class in Java, and do we need to import it explicitly?",
    "shortAnswer": "java.lang package; no import is needed.",
    "explanation": "The Math class belongs to java.lang. In Java, all classes inside java.lang are automatically imported into every Java source file by default.",
    "hint": "It is the fundamental language package of Java.",
    "level": "basic",
    "options": [
      "java.util, must be imported",
      "java.math, must be imported",
      "java.lang, automatically imported",
      "java.io, automatically imported"
    ],
    "correctAnswer": 2,
    "codeExample": "// No import java.lang.Math; statement is required"
  },
  {
    "id": 7,
    "question": "What will Math.pow(-3, 3) evaluate to?",
    "shortAnswer": "-27.0",
    "explanation": "(-3) * (-3) * (-3) = -27. Since the exponent is odd, the negative sign is retained, and output is -27.0 (double).",
    "hint": "Negative base raised to an odd power remains negative.",
    "level": "basic",
    "options": [
      "-27",
      "27.0",
      "-27.0",
      "NaN"
    ],
    "correctAnswer": 2,
    "codeExample": "System.out.println(Math.pow(-3, 3)); // -27.0"
  },
  {
    "id": 8,
    "question": "What will Math.pow(-3, 2) evaluate to?",
    "shortAnswer": "9.0",
    "explanation": "(-3)^2 = (-3) * (-3) = +9. As a double value, it returns 9.0.",
    "hint": "Negative base raised to an even power yields a positive result.",
    "level": "basic",
    "options": [
      "-9.0",
      "9.0",
      "9",
      "-9"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.pow(-3, 2)); // 9.0"
  },
  {
    "id": 9,
    "question": "What is the output of System.out.println(Math.pow(8, 1/3));?",
    "shortAnswer": "1.0 (Trap: 1/3 is integer division evaluating to 0)",
    "explanation": "In Java, 1/3 represents integer division which truncates to 0. Therefore, Math.pow(8, 0) is executed, yielding 1.0! To get cube root 2.0, write 1.0/3 or 1/3.0.",
    "hint": "Pay close attention to integer division between 1 and 3.",
    "level": "advanced",
    "options": [
      "2.0",
      "1.0",
      "2",
      "0.0"
    ],
    "correctAnswer": 1,
    "codeExample": "// Common ICSE Exam Trap:\nMath.pow(8, 1/3);     // 1.0 because 1/3 == 0\nMath.pow(8, 1.0/3.0); // 2.0"
  },
  {
    "id": 10,
    "question": "Convert the algebraic expression (a + b)^2 into equivalent Java code.",
    "shortAnswer": "Math.pow(a + b, 2)",
    "explanation": "In Java, exponentiation cannot be written as (a + b)^2 because '^' is the bitwise XOR operator. Math.pow(a + b, 2) or (a + b) * (a + b) must be used.",
    "hint": "Remember that the '^' symbol in Java is XOR, not power.",
    "level": "basic",
    "options": [
      "(a + b)^2",
      "Math.pow(a + b, 2)",
      "pow(a + b, 2)",
      "Math.power(a + b, 2)"
    ],
    "correctAnswer": 1,
    "codeExample": "double exp = Math.pow(a + b, 2);"
  },
  {
    "id": 11,
    "question": "What is the result of Math.pow(0, 0) according to Java standard specification?",
    "shortAnswer": "1.0",
    "explanation": "Java's Math.pow adheres strictly to IEEE 754 standard for floating-point arithmetic, which defines pow(0.0, 0.0) as 1.0.",
    "hint": "Java floating-point standard defines 0^0 as unity.",
    "level": "intermediate",
    "options": [
      "0.0",
      "1.0",
      "NaN",
      "ArithmeticException"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.pow(0, 0)); // 1.0"
  },
  {
    "id": 12,
    "question": "Convert the algebraic expression s = ut + 0.5 * f * t^2 into valid Java code.",
    "shortAnswer": "double s = u * t + 0.5 * f * Math.pow(t, 2);",
    "explanation": "Multiplication must be explicit (*), and t^2 is expressed using Math.pow(t, 2) or (t * t).",
    "hint": "Remember explicit multiplication operators and Math.pow.",
    "level": "intermediate",
    "options": [
      "s = ut + 1/2 * f * t^2;",
      "double s = u * t + 0.5 * f * Math.pow(t, 2);",
      "double s = u * t + (1/2) * f * Math.pow(t, 2);",
      "double s = ut + 0.5 * f * (t * t);"
    ],
    "correctAnswer": 1,
    "codeExample": "double s = u * t + 0.5 * f * Math.pow(t, 2);"
  },
  {
    "id": 13,
    "question": "Why does the statement 'pow(2, 3)' fail to compile in a standard Java program?",
    "shortAnswer": "Math.pow is a static method in Math class and must be prefixed with 'Math.'",
    "explanation": "Because 'pow' is a static method of java.lang.Math, it must be qualified with the class name (Math.pow) unless a static import is used.",
    "hint": "How are static methods called from outside their class?",
    "level": "basic",
    "options": [
      "Because pow is deprecated",
      "Because it must be invoked through class name Math.pow",
      "Because 2 and 3 must be floating point literals",
      "Because pow requires three arguments"
    ],
    "correctAnswer": 1,
    "codeExample": "double r = Math.pow(2, 3); // Correct syntax"
  },
  {
    "id": 14,
    "question": "What is the output of System.out.println(Math.pow(10, 3));?",
    "shortAnswer": "1000.0",
    "explanation": "10^3 = 1000. Double return type ensures output has a decimal point: 1000.0.",
    "hint": "10 cubed formatted as double.",
    "level": "basic",
    "options": [
      "1000",
      "1000.0",
      "100.0",
      "10^3"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.pow(10, 3)); // 1000.0"
  },
  {
    "id": 15,
    "question": "What is the output of Math.pow(100, 0.5);?",
    "shortAnswer": "10.0",
    "explanation": "Raising a number to power 0.5 (1/2) is mathematically equivalent to taking its square root. sqrt(100) = 10.0.",
    "hint": "Power of 1/2 is square root.",
    "level": "intermediate",
    "options": [
      "50.0",
      "10.0",
      "10",
      "0.5"
    ],
    "correctAnswer": 1,
    "codeExample": "double r = Math.pow(100, 0.5); // 10.0"
  },
  {
    "id": 16,
    "question": "What does Math.pow(Double.POSITIVE_INFINITY, 0) return?",
    "shortAnswer": "1.0",
    "explanation": "According to Java documentation, if the second argument is positive or negative zero, the result is always 1.0 even if the first argument is Infinity or NaN.",
    "hint": "Any base with exponent zero yields 1.0.",
    "level": "advanced",
    "options": [
      "Infinity",
      "NaN",
      "1.0",
      "0.0"
    ],
    "correctAnswer": 2,
    "codeExample": "System.out.println(Math.pow(Double.POSITIVE_INFINITY, 0)); // 1.0"
  },
  {
    "id": 17,
    "question": "Which expression correctly casts Math.pow(3, 4) into a long variable?",
    "shortAnswer": "long ans = (long) Math.pow(3, 4);",
    "explanation": "The result of Math.pow is double (81.0). To store it in a long variable, explicit narrowing cast (long) is mandatory.",
    "hint": "Use explicit type cast syntax (long).",
    "level": "intermediate",
    "options": [
      "long ans = Math.pow(3, 4);",
      "long ans = (long) Math.pow(3, 4);",
      "long ans = Long.Math.pow(3, 4);",
      "long ans = Math.powLong(3, 4);"
    ],
    "correctAnswer": 1,
    "codeExample": "long ans = (long) Math.pow(3, 4);"
  },
  {
    "id": 18,
    "question": "Evaluate: double d = Math.pow(2, Math.pow(2, 2)); What is d?",
    "shortAnswer": "16.0",
    "explanation": "Inner call: Math.pow(2, 2) = 4.0. Outer call: Math.pow(2, 4.0) = 16.0.",
    "hint": "Solve inner method call first from inside out.",
    "level": "intermediate",
    "options": [
      "8.0",
      "16.0",
      "16",
      "64.0"
    ],
    "correctAnswer": 1,
    "codeExample": "double d = Math.pow(2, Math.pow(2, 2)); // 2^4 = 16.0"
  },
  {
    "id": 19,
    "question": "What is the output of System.out.println(Math.pow(1, 500));?",
    "shortAnswer": "1.0",
    "explanation": "1 raised to any power is always 1.0.",
    "hint": "1 multiplied by itself any number of times.",
    "level": "basic",
    "options": [
      "500.0",
      "1.0",
      "1",
      "0.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.pow(1, 500)); // 1.0"
  },
  {
    "id": 20,
    "question": "What will Math.pow(-2, 0.5) return in Java?",
    "shortAnswer": "Double.NaN (Not a Number)",
    "explanation": "Square root of a negative number is imaginary/complex. Since double can only represent real numbers, it returns Double.NaN.",
    "hint": "Fractional power of a negative number produces an imaginary number.",
    "level": "advanced",
    "options": [
      "-1.414",
      "NaN",
      "ArithmeticException",
      "0.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.pow(-2, 0.5)); // NaN"
  },
  {
    "id": 21,
    "question": "Convert the formula for volume of sphere V = 4/3 * pi * r^3 into Java code.",
    "shortAnswer": "double v = (4.0 / 3.0) * Math.PI * Math.pow(r, 3);",
    "explanation": "4.0 / 3.0 ensures floating-point division. Math.PI provides the value of pi, and Math.pow(r, 3) gives r cubed.",
    "hint": "Watch out for integer division in 4/3 and use Math.PI.",
    "level": "intermediate",
    "options": [
      "double v = (4 / 3) * Math.PI * Math.pow(r, 3);",
      "double v = (4.0 / 3.0) * Math.PI * Math.pow(r, 3);",
      "double v = 4/3 * 22/7 * r^3;",
      "double v = 1.33 * PI * Math.pow(r, 3);"
    ],
    "correctAnswer": 1,
    "codeExample": "double v = (4.0 / 3.0) * Math.PI * Math.pow(r, 3);"
  },
  {
    "id": 22,
    "question": "What is the return value of Math.pow(0, 5)?",
    "shortAnswer": "0.0",
    "explanation": "0 raised to any positive power is 0.0.",
    "hint": "0 multiplied by itself yields zero.",
    "level": "basic",
    "options": [
      "0",
      "0.0",
      "1.0",
      "NaN"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.pow(0, 5)); // 0.0"
  },
  {
    "id": 23,
    "question": "What is the output of System.out.println(Math.pow(0.5, 2));?",
    "shortAnswer": "0.25",
    "explanation": "0.5 * 0.5 = 0.25 (double).",
    "hint": "Half squared is one quarter.",
    "level": "basic",
    "options": [
      "0.25",
      "1.0",
      "0.5",
      "0.125"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.pow(0.5, 2)); // 0.25"
  },
  {
    "id": 24,
    "question": "In the expression: Math.pow(x, y) + x * y, if x = 2 and y = 3, what is the output?",
    "shortAnswer": "14.0",
    "explanation": "Math.pow(2, 3) = 8.0. x * y = 2 * 3 = 6. 8.0 + 6 = 14.0 (mixed arithmetic promotes to double).",
    "hint": "Math.pow gives double 8.0, and 8.0 + 6 = 14.0.",
    "level": "intermediate",
    "options": [
      "14",
      "14.0",
      "12.0",
      "18.0"
    ],
    "correctAnswer": 1,
    "codeExample": "int x = 2, y = 3;\nSystem.out.println(Math.pow(x, y) + x * y); // 14.0"
  },
  {
    "id": 25,
    "question": "True or False: Math.pow() can be invoked without creating an object of the Math class.",
    "shortAnswer": "True (because Math.pow is a static method)",
    "explanation": "In Java, all methods in the Math class are static methods. Static methods belong to the class rather than an object and are called directly using the class name (Math.pow()).",
    "hint": "Are Math class methods static or instance methods?",
    "level": "basic",
    "options": [
      "True, because all methods in Math class are static",
      "False, an object like 'Math m = new Math();' is compulsory",
      "True, but only inside the main method",
      "False, Math is an abstract class"
    ],
    "correctAnswer": 0,
    "codeExample": "// Static invocation:\ndouble val = Math.pow(4, 3); // No object needed"
  }
];
export default questions;
