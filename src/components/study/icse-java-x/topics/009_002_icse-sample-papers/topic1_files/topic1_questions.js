const questions = [
  {
    "id": 1,
    "question": "In ICSE Sample Paper 2, what is the mandatory penalty for omitting the Variable Description Table (VDT) in a Section B program?",
    "shortAnswer": "Up to 2 to 3 marks are deducted according to official CISCE marking rubrics.",
    "explanation": "CISCE guidelines allocate specific marks for documentation. Omitting the VDT results in direct penalty.",
    "hint": "Documentation is evaluated as part of the 15-mark program scheme.",
    "level": "basic",
    "options": [
      "Up to 2 to 3 marks are deducted according to official CISCE marking rubrics.",
      "The entire program is awarded zero marks.",
      "No marks are deducted because VDT is completely optional.",
      "Bonus marks are awarded if code comments are present."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Class Design - BookFair Purchase Billing"
  },
  {
    "id": 2,
    "question": "Which keyword in Java prevents an instantiated class variable from being re-assigned?",
    "shortAnswer": "final",
    "explanation": "The `final` keyword defines constants in Java whose values cannot be changed once initialized.",
    "hint": "Used to declare constant variables like PI.",
    "level": "basic",
    "options": [
      "final",
      "static",
      "const",
      "immutable"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: 1D Array - Bubble Sort Ascending"
  },
  {
    "id": 3,
    "question": "What is the return data type of `Character.isLetterOrDigit(char ch)` in Java?",
    "shortAnswer": "boolean",
    "explanation": "Methods of the Character class starting with `is` return a boolean value (`true` or `false`).",
    "hint": "Checks a condition and returns true or false.",
    "level": "basic",
    "options": [
      "boolean",
      "int",
      "char",
      "String"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: String Processing - Piglatin Word Translation"
  },
  {
    "id": 4,
    "question": "What is the return type of `Math.round(7.4)` when passed a `double` argument?",
    "shortAnswer": "long",
    "explanation": "When the parameter is double, `Math.round(double a)` returns a 64-bit signed integer (`long`).",
    "hint": "Double rounds to long; float rounds to int.",
    "level": "basic",
    "options": [
      "long",
      "int",
      "double",
      "float"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Special Number Logic - Spy or Duck Number"
  },
  {
    "id": 5,
    "question": "What value is returned by `\"APPLICATION\".indexOf('P')`?",
    "shortAnswer": "1",
    "explanation": "The first occurrence of 'P' is at index 1 ('A' is at index 0, 'P' is at index 1).",
    "hint": "Java strings use 0-based indexing.",
    "level": "basic",
    "options": [
      "1",
      "2",
      "0",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: 2D Array - Matrix Boundary Elements Display & Sum"
  },
  {
    "id": 6,
    "question": "What is the result of evaluating `15 % 4 + 3 * 2`?",
    "shortAnswer": "9",
    "explanation": "15 % 4 = 3. 3 * 2 = 6. 3 + 6 = 9.",
    "hint": "% and * have higher precedence than +, evaluated left to right.",
    "level": "basic",
    "options": [
      "9",
      "12",
      "7",
      "6"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Method Overloading - Series Calculation"
  },
  {
    "id": 7,
    "question": "What does the expression `\"HELLO\".substring(1, 4)` yield?",
    "shortAnswer": "\"ELL\"",
    "explanation": "Substring from index 1 inclusive to 4 exclusive extracts characters at indices 1, 2, and 3: 'E', 'L', 'L'.",
    "hint": "Characters at index 1, 2, 3.",
    "level": "basic",
    "options": [
      "\"ELL\"",
      "\"ELLO\"",
      "\"HEL\"",
      "\"LLO\""
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Class Design - BookFair Purchase Billing"
  },
  {
    "id": 8,
    "question": "Which loop construct in Java is guaranteed to execute at least once?",
    "shortAnswer": "do-while loop",
    "explanation": "Because condition testing occurs at the bottom (exit-controlled), a do-while loop executes at least once.",
    "hint": "Exit-controlled loop.",
    "level": "basic",
    "options": [
      "do-while loop",
      "while loop",
      "for loop",
      "enhanced for loop"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: 1D Array - Bubble Sort Ascending"
  },
  {
    "id": 9,
    "question": "How many bytes does a `float` primitive data type occupy in Java?",
    "shortAnswer": "4 bytes (32 bits)",
    "explanation": "In Java, float is a single-precision 32-bit (4-byte) IEEE 754 floating point number.",
    "hint": "Half the storage size of a double (8 bytes).",
    "level": "basic",
    "options": [
      "4 bytes (32 bits)",
      "8 bytes (64 bits)",
      "2 bytes (16 bits)",
      "1 byte (8 bits)"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: String Processing - Piglatin Word Translation"
  },
  {
    "id": 10,
    "question": "Which package is automatically imported into every Java program without an explicit import statement?",
    "shortAnswer": "java.lang",
    "explanation": "The `java.lang` package containing String, Math, System, and wrapper classes is implicitly imported.",
    "hint": "Contains fundamental classes like System and String.",
    "level": "basic",
    "options": [
      "java.lang",
      "java.util",
      "java.io",
      "java.text"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Special Number Logic - Spy or Duck Number"
  },
  {
    "id": 11,
    "question": "What is the output when `int a = 5; int b = a++ + ++a;` is executed?",
    "shortAnswer": "12",
    "explanation": "a++ uses 5 and becomes 6. ++a increments 6 to 7 and uses 7. b = 5 + 7 = 12.",
    "hint": "Post-increment uses then increments; pre-increment increments then uses.",
    "level": "intermediate",
    "options": [
      "12",
      "11",
      "13",
      "10"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: 2D Array - Matrix Boundary Elements Display & Sum"
  },
  {
    "id": 12,
    "question": "What is the state of `s1 == s2` vs `s1.equals(s2)` for `String s1 = new String(\"BLUEJ\"); String s2 = new String(\"BLUEJ\");`?",
    "shortAnswer": "s1 == s2 is false; s1.equals(s2) is true",
    "explanation": "`==` compares object memory addresses (two distinct heap objects), whereas `equals()` compares character contents.",
    "hint": "== compares references, equals() compares character sequence.",
    "level": "intermediate",
    "options": [
      "s1 == s2 is false; s1.equals(s2) is true",
      "Both s1 == s2 and s1.equals(s2) are true",
      "Both s1 == s2 and s1.equals(s2) are false",
      "s1 == s2 is true; s1.equals(s2) is false"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Method Overloading - Series Calculation"
  },
  {
    "id": 13,
    "question": "What is the time complexity of the Bubble Sort algorithm in the worst-case scenario?",
    "shortAnswer": "O(n^2)",
    "explanation": "Bubble Sort requires n*(n-1)/2 comparisons in the worst case, giving a quadratic O(n^2) time complexity.",
    "hint": "Nested comparisons of adjacent elements.",
    "level": "intermediate",
    "options": [
      "O(n^2)",
      "O(n log n)",
      "O(n)",
      "O(1)"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Class Design - BookFair Purchase Billing"
  },
  {
    "id": 14,
    "question": "Which condition correctly identifies the primary diagonal elements of an N x N matrix `mat`?",
    "shortAnswer": "i == j",
    "explanation": "Primary diagonal elements occur where the row index `i` equals the column index `j` (e.g. [0][0], [1][1], [2][2]).",
    "hint": "Row equals column.",
    "level": "intermediate",
    "options": [
      "i == j",
      "i + j == N - 1",
      "i + j == N",
      "i != j"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: 1D Array - Bubble Sort Ascending"
  },
  {
    "id": 15,
    "question": "What is the secondary diagonal condition in an N x N square matrix `mat[i][j]`?",
    "shortAnswer": "i + j == N - 1",
    "explanation": "In 0-based indexing, the secondary (anti-diagonal) elements satisfy the property `i + j == N - 1`.",
    "hint": "Indices sum to N - 1.",
    "level": "intermediate",
    "options": [
      "i + j == N - 1",
      "i == j",
      "i + j == N",
      "i - j == 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: String Processing - Piglatin Word Translation"
  },
  {
    "id": 16,
    "question": "What does the expression `Character.toUpperCase('a')` return?",
    "shortAnswer": "'A'",
    "explanation": "Converts the lowercase character 'a' to uppercase 'A'.",
    "hint": "Transforms character to uppercase.",
    "level": "intermediate",
    "options": [
      "'A'",
      "\"A\"",
      "65",
      "'a'"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Special Number Logic - Spy or Duck Number"
  },
  {
    "id": 17,
    "question": "What is the value of `Math.ceil(-4.2)` in Java?",
    "shortAnswer": "-4.0",
    "explanation": "`Math.ceil(x)` returns the smallest integer greater than or equal to x. For -4.2, that integer is -4.0.",
    "hint": "Smallest integer >= -4.2.",
    "level": "intermediate",
    "options": [
      "-4.0",
      "-5.0",
      "-4",
      "-5"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: 2D Array - Matrix Boundary Elements Display & Sum"
  },
  {
    "id": 18,
    "question": "What does `\"COMPUTER\".compareTo(\"COMPASS\")` return?",
    "shortAnswer": "A positive integer",
    "explanation": "Comparison is character-by-character. At index 4, 'U' (ASCII 85) is greater than 'A' (ASCII 65). 85 - 65 = 20 > 0.",
    "hint": "'U' has higher ASCII than 'A'.",
    "level": "intermediate",
    "options": [
      "A positive integer",
      "A negative integer",
      "0",
      "false"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Method Overloading - Series Calculation"
  },
  {
    "id": 19,
    "question": "Can a constructor in Java have a `void` return type?",
    "shortAnswer": "No, constructors cannot specify any return type, not even void.",
    "explanation": "If a return type like `void` is specified, Java treats it as an ordinary method, not a constructor.",
    "hint": "Specifying void turns a constructor into a normal method.",
    "level": "intermediate",
    "options": [
      "No, constructors cannot specify any return type, not even void.",
      "Yes, constructors always return void.",
      "Yes, constructors can return any primitive type.",
      "Only default constructors can return void."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Class Design - BookFair Purchase Billing"
  },
  {
    "id": 20,
    "question": "What happens if a Binary Search is executed on an unsorted array?",
    "shortAnswer": "Binary search fails and produces incorrect results because elements are not ordered.",
    "explanation": "Binary search relies strictly on the sorted precondition to halve the search interval.",
    "hint": "Binary search requires array to be sorted.",
    "level": "intermediate",
    "options": [
      "Binary search fails and produces incorrect results because elements are not ordered.",
      "Binary search automatically sorts the array first.",
      "Binary search executes as a linear search instead.",
      "A runtime exception is thrown by the JVM."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: 1D Array - Bubble Sort Ascending"
  },
  {
    "id": 21,
    "question": "What is the defining characteristic of a Disarium Number?",
    "shortAnswer": "Sum of its digits powered with their respective positional index equals the number itself.",
    "explanation": "For example, 135 = 1^1 + 3^2 + 5^3 = 1 + 9 + 125 = 135.",
    "hint": "1^1 + 3^2 + 5^3 = 135.",
    "level": "advanced",
    "options": [
      "Sum of its digits powered with their respective positional index equals the number itself.",
      "Sum of factorials of digits equals the number itself.",
      "Sum of cubes of digits equals the number itself.",
      "Square of the sum of digits equals the number itself."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: String Processing - Piglatin Word Translation"
  },
  {
    "id": 22,
    "question": "What is the defining characteristic of a Tech Number?",
    "shortAnswer": "An even-digit number whose square of the sum of its two halves equals the number.",
    "explanation": "For example, 3025: halves are 30 and 25. (30 + 25)^2 = 55^2 = 3025.",
    "hint": "3025 -> (30 + 25)^2 = 3025.",
    "level": "advanced",
    "options": [
      "An even-digit number whose square of the sum of its two halves equals the number.",
      "A number that has an even number of 1s in its binary form.",
      "A number whose digital root recursively evaluates to 1.",
      "A number whose reverse is equal to its square."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Special Number Logic - Spy or Duck Number"
  },
  {
    "id": 23,
    "question": "What is an Evil Number in computer number theory?",
    "shortAnswer": "A positive number that has an even number of 1's in its binary representation.",
    "explanation": "For example, 9 in binary is 1001, which has two 1's (even), making it an Evil Number.",
    "hint": "Binary expansion contains an even count of set bits (1s).",
    "level": "advanced",
    "options": [
      "A positive number that has an even number of 1's in its binary representation.",
      "A number divisible by 13.",
      "A number whose digits sum to an odd prime.",
      "A number that has an odd number of 1's in its binary representation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: 2D Array - Matrix Boundary Elements Display & Sum"
  },
  {
    "id": 24,
    "question": "In method overloading, what distinguishes one overloaded method from another?",
    "shortAnswer": "Method signature (number, type, or order of parameters).",
    "explanation": "Methods must have different parameter lists (data types, number of parameters, or sequence). Differing return type alone is invalid.",
    "hint": "Parameter list differences define overloading.",
    "level": "advanced",
    "options": [
      "Method signature (number, type, or order of parameters).",
      "Only the return type of the method.",
      "Only the access specifier (public vs private).",
      "The names of parameter variables."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Method Overloading - Series Calculation"
  },
  {
    "id": 25,
    "question": "What is the primary condition for an N x N matrix to be classified as an Identity Matrix?",
    "shortAnswer": "All principal diagonal elements are 1, and all other non-diagonal elements are 0.",
    "explanation": "An identity matrix I satisfies mat[i][j] == 1 when i == j, and mat[i][j] == 0 when i != j.",
    "hint": "Diagonal is 1, non-diagonals are 0.",
    "level": "advanced",
    "options": [
      "All principal diagonal elements are 1, and all other non-diagonal elements are 0.",
      "All matrix elements are 1.",
      "The determinant is 0.",
      "Row sums and column sums are equal."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Class X Model Paper 2\n// Target: 100/100 Marks Standard\n// Key Focus: Class Design - BookFair Purchase Billing"
  }
];

export default questions;
