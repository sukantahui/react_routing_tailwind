const questions = [
  {
    "id": 1,
    "question": "What is the method signature of charAt() in class String?",
    "shortAnswer": "public char charAt(int index)",
    "explanation": "Returns the char value at the specified zero-based index.",
    "hint": "Signature check",
    "level": "basic",
    "options": [
      "public int charAt(int index)",
      "public char charAt(int index)",
      "public String charAt(int index)",
      "public void charAt(char ch)"
    ],
    "correctAnswer": 1,
    "codeExample": "char ch = str.charAt(0);"
  },
  {
    "id": 2,
    "question": "What is the return type of charAt(int index)?",
    "shortAnswer": "char",
    "explanation": "It returns a primitive 16-bit Unicode char value.",
    "hint": "Returns primitive char",
    "level": "basic",
    "options": [
      "int",
      "char",
      "String",
      "byte"
    ],
    "correctAnswer": 1,
    "codeExample": "char c = \"ICSE\".charAt(0);"
  },
  {
    "id": 3,
    "question": "What happens if index < 0 or index >= length() in charAt(index)?",
    "shortAnswer": "java.lang.StringIndexOutOfBoundsException is thrown at runtime.",
    "explanation": "Any index outside the valid range [0, length() - 1] causes StringIndexOutOfBoundsException.",
    "hint": "Out of bounds exception",
    "level": "basic",
    "options": [
      "Returns '\\0'",
      "Returns -1",
      "Throws StringIndexOutOfBoundsException",
      "Compile error"
    ],
    "correctAnswer": 2,
    "codeExample": "\"ICSE\".charAt(10); // Exception"
  },
  {
    "id": 4,
    "question": "What is the output of: \"WEST BENGAL\".charAt(4)?",
    "shortAnswer": "' ' (spacebar character)",
    "explanation": "Indices: 0:'W', 1:'E', 2:'S', 3:'T', 4:' ' (space).",
    "hint": "Index 4 is the space",
    "level": "intermediate",
    "options": [
      "'T'",
      "' ' (space)",
      "'B'",
      "'E'"
    ],
    "correctAnswer": 1,
    "codeExample": "\"WEST BENGAL\".charAt(4); // ' '"
  },
  {
    "id": 5,
    "question": "How do you extract the first character of any non-empty String 'str'?",
    "shortAnswer": "str.charAt(0)",
    "explanation": "Strings are zero-indexed, so index 0 points to the first character.",
    "hint": "First index is 0",
    "level": "basic",
    "options": [
      "str.charAt(1)",
      "str.charAt(0)",
      "str.first()",
      "str.charAt(str.length())"
    ],
    "correctAnswer": 1,
    "codeExample": "char first = str.charAt(0);"
  },
  {
    "id": 6,
    "question": "How do you extract the last character of any non-empty String 'str'?",
    "shortAnswer": "str.charAt(str.length() - 1)",
    "explanation": "The last valid index is length() - 1.",
    "hint": "Last valid index",
    "level": "basic",
    "options": [
      "str.charAt(str.length())",
      "str.charAt(str.length() - 1)",
      "str.last()",
      "str.charAt(-1)"
    ],
    "correctAnswer": 1,
    "codeExample": "char last = str.charAt(str.length() - 1);"
  },
  {
    "id": 7,
    "question": "What is the output of: \"BlueJ\".charAt(\"BlueJ\".length())?",
    "shortAnswer": "Throws StringIndexOutOfBoundsException",
    "explanation": "length() is 5, but valid indices are 0 to 4. Accessing index 5 causes an out-of-bounds exception.",
    "hint": "Index equal to length is invalid",
    "level": "intermediate",
    "options": [
      "'J'",
      "'\\0'",
      "StringIndexOutOfBoundsException",
      "Compile error"
    ],
    "correctAnswer": 2,
    "codeExample": "\"BlueJ\".charAt(5); // Exception"
  },
  {
    "id": 8,
    "question": "Can charAt() take negative numbers like charAt(-1)?",
    "shortAnswer": "No, negative indices always throw StringIndexOutOfBoundsException.",
    "explanation": "Java does not support negative indexing like Python.",
    "hint": "No negative indexing in Java",
    "level": "basic",
    "options": [
      "Yes, returns last char",
      "No, throws StringIndexOutOfBoundsException",
      "Returns '\\0'",
      "Returns space"
    ],
    "correctAnswer": 1,
    "codeExample": "str.charAt(-1); // Exception"
  },
  {
    "id": 9,
    "question": "What is the output of: char ch = \"9\".charAt(0); int val = ch - '0'; System.out.println(val);?",
    "shortAnswer": "9",
    "explanation": "'9' has ASCII 57, '0' has ASCII 48. 57 - 48 = 9 (converts digit character to integer).",
    "hint": "Character to digit conversion",
    "level": "intermediate",
    "options": [
      "57",
      "9",
      "48",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "'9' - '0' = 9"
  },
  {
    "id": 10,
    "question": "What is the output of: String s = \"Kolkata\"; System.out.println((char)(s.charAt(0) + 32));?",
    "shortAnswer": "'k'",
    "explanation": "s.charAt(0) is 'K' (ASCII 75). 75 + 32 = 107, which is ASCII for 'k'.",
    "hint": "ASCII uppercase to lowercase shift",
    "level": "intermediate",
    "options": [
      "'K'",
      "'k'",
      "107",
      "'L'"
    ],
    "correctAnswer": 1,
    "codeExample": "(char)('K' + 32) = 'k'"
  },
  {
    "id": 11,
    "question": "How can you count vowels in a String using charAt()?",
    "shortAnswer": "Loop with i from 0 to length - 1, checking charAt(i) against 'A','E','I','O','U'.",
    "explanation": "A linear scan with charAt(i) inspecting each character individually.",
    "hint": "Vowel checking algorithm",
    "level": "basic",
    "options": [
      "Use str.vowels()",
      "Traverse with charAt(i) and test if vowel",
      "Use str.indexOf(\"vowel\")",
      "Use charAt(length)"
    ],
    "correctAnswer": 1,
    "codeExample": "if (\"AEIOUaeiou\".indexOf(s.charAt(i)) != -1) count++;"
  },
  {
    "id": 12,
    "question": "What is the output of: System.out.println(\"Java\".charAt(1) == 'a');?",
    "shortAnswer": "true",
    "explanation": "Index 1 in \"Java\" is 'a'. 'a' == 'a' evaluates to true.",
    "hint": "Primitive char comparison with ==",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 0,
    "codeExample": "'a' == 'a' -> true"
  },
  {
    "id": 13,
    "question": "What does \"\".charAt(0) throw?",
    "shortAnswer": "StringIndexOutOfBoundsException",
    "explanation": "An empty string has length 0, so even index 0 is out of bounds.",
    "hint": "Empty string has no indices",
    "level": "intermediate",
    "options": [
      "NullPointerException",
      "StringIndexOutOfBoundsException",
      "Returns '\\0'",
      "Returns space"
    ],
    "correctAnswer": 1,
    "codeExample": "\"\".charAt(0); // StringIndexOutOfBoundsException"
  },
  {
    "id": 14,
    "question": "Is charAt() an O(1) constant time operation in Java?",
    "shortAnswer": "Yes, constant time O(1).",
    "explanation": "Underlying character array elements are accessed directly by index offset in memory.",
    "hint": "Direct array lookup",
    "level": "advanced",
    "options": [
      "Yes, O(1)",
      "No, O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "codeExample": "O(1) time complexity"
  },
  {
    "id": 15,
    "question": "Can you modify a character in a String using charAt() like str.charAt(0) = 'X'?",
    "shortAnswer": "No, compile error: unexpected type, required variable, found value.",
    "explanation": "Strings are immutable; charAt() returns a value, not a mutable variable reference.",
    "hint": "Strings are immutable",
    "level": "intermediate",
    "options": [
      "Yes, changes the string",
      "No, compile error",
      "Throws runtime exception",
      "Only in Java 17"
    ],
    "correctAnswer": 1,
    "codeExample": "str.charAt(0) = 'X'; // Compile error"
  },
  {
    "id": 16,
    "question": "What is the output of: System.out.println((int)\"A\".charAt(0));?",
    "shortAnswer": "65",
    "explanation": "'A' cast to int yields its ASCII/Unicode decimal value 65.",
    "hint": "ASCII code of 'A'",
    "level": "basic",
    "options": [
      "65",
      "97",
      "0",
      "1"
    ],
    "correctAnswer": 0,
    "codeExample": "(int)'A' = 65"
  },
  {
    "id": 17,
    "question": "What is the output of: System.out.println((int)\"a\".charAt(0));?",
    "shortAnswer": "97",
    "explanation": "'a' cast to int yields its ASCII decimal value 97.",
    "hint": "ASCII code of 'a'",
    "level": "basic",
    "options": [
      "65",
      "97",
      "32",
      "0"
    ],
    "correctAnswer": 1,
    "codeExample": "(int)'a' = 97"
  },
  {
    "id": 18,
    "question": "What is the output of: System.out.println((int)\" \".charAt(0));?",
    "shortAnswer": "32",
    "explanation": "The space character ' ' has ASCII code 32.",
    "hint": "ASCII code of space",
    "level": "basic",
    "options": [
      "0",
      "32",
      "16",
      "255"
    ],
    "correctAnswer": 1,
    "codeExample": "(int)' ' = 32"
  },
  {
    "id": 19,
    "question": "What is the output of: String s = \"Barrackpore\"; char c = s.charAt(s.length() - 2);?",
    "shortAnswer": "'r'",
    "explanation": "Length is 11. Last char is 'e' (10). Second-last char is 'r' at index 9.",
    "hint": "Second to last character",
    "level": "intermediate",
    "options": [
      "'o'",
      "'r'",
      "'e'",
      "'p'"
    ],
    "correctAnswer": 1,
    "codeExample": "s.charAt(9) = 'r'"
  },
  {
    "id": 20,
    "question": "What is the difference between charAt(0) and substring(0, 1)?",
    "shortAnswer": "charAt(0) returns primitive char; substring(0, 1) returns a String object of length 1.",
    "explanation": "Primitive vs reference object return type.",
    "hint": "Primitive char vs String",
    "level": "intermediate",
    "options": [
      "No difference",
      "charAt returns char; substring returns String",
      "charAt returns int; substring returns char",
      "substring is faster"
    ],
    "correctAnswer": 1,
    "codeExample": "char c = s.charAt(0); String sub = s.substring(0, 1);"
  },
  {
    "id": 21,
    "question": "What happens if a student writes: char c = str.charAt(str.length() - 1); when str is empty \"\"?",
    "shortAnswer": "Throws StringIndexOutOfBoundsException (index -1 is illegal).",
    "explanation": "0 - 1 = -1, which is an invalid negative index.",
    "hint": "Empty string gives -1 index",
    "level": "intermediate",
    "options": [
      "Returns '\\0'",
      "Throws StringIndexOutOfBoundsException",
      "Throws NullPointerException",
      "Returns empty string"
    ],
    "correctAnswer": 1,
    "codeExample": "\"\".charAt(-1); // Exception"
  },
  {
    "id": 22,
    "question": "How do you check if character at index i is an uppercase letter using Character wrapper?",
    "shortAnswer": "Character.isUpperCase(str.charAt(i))",
    "explanation": "Character.isUpperCase(char ch) returns boolean true if character is 'A' through 'Z'.",
    "hint": "Character wrapper method",
    "level": "basic",
    "options": [
      "str.isUpperCase(i)",
      "Character.isUpperCase(str.charAt(i))",
      "str.charAt(i).isUpper()",
      "Character.checkUpper(i)"
    ],
    "correctAnswer": 1,
    "codeExample": "Character.isUpperCase(s.charAt(i))"
  },
  {
    "id": 23,
    "question": "What does \"ICSE 2026\".charAt(4) return?",
    "shortAnswer": "' ' (spacebar character)",
    "explanation": "Indices: 0:'I', 1:'C', 2:'S', 3:'E', 4:' '.",
    "hint": "Character at index 4",
    "level": "basic",
    "options": [
      "'E'",
      "' ' (space)",
      "'2'",
      "'0'"
    ],
    "correctAnswer": 1,
    "codeExample": "\"ICSE 2026\".charAt(4); // ' '"
  },
  {
    "id": 24,
    "question": "What is the output of: System.out.println(\"Java\".charAt(0) + \"Java\".charAt(1));?",
    "shortAnswer": "171",
    "explanation": "Numeric addition of char values: 'J' (74) + 'a' (97) = 171 (promoted to int addition!).",
    "hint": "Char arithmetic promotion to int",
    "level": "intermediate",
    "options": [
      "\"Ja\"",
      "171",
      "74",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "'J' (74) + 'a' (97) = 171"
  },
  {
    "id": 25,
    "question": "In ICSE palindrome string programs, what is the two-pointer condition using charAt()?",
    "shortAnswer": "while(left < right) { if(str.charAt(left) != str.charAt(right)) return false; left++; right--; }",
    "explanation": "Compare characters from both ends moving towards the center.",
    "hint": "Two pointer palindrome check",
    "level": "advanced",
    "options": [
      "Check only middle char",
      "Compare charAt(left) with charAt(right)",
      "Convert to integer",
      "Use charAt(0) only"
    ],
    "correctAnswer": 1,
    "codeExample": "Palindrome two-pointer comparison"
  }
];

export default questions;
