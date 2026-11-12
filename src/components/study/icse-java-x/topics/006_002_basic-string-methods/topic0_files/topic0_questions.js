const questions = [
  {
    "id": 1,
    "question": "What is the method signature of length() in class String?",
    "shortAnswer": "public int length()",
    "explanation": "length() is a public instance method returning a 32-bit signed integer representing the character count.",
    "hint": "Signature check",
    "level": "basic",
    "options": [
      "public void length()",
      "public int length()",
      "public long length()",
      "public int length(String s)"
    ],
    "correctAnswer": 1,
    "codeExample": "int len = str.length();"
  },
  {
    "id": 2,
    "question": "What is the return type of length() in Java?",
    "shortAnswer": "int",
    "explanation": "It returns a primitive 32-bit int value.",
    "hint": "Returns an integer",
    "level": "basic",
    "options": [
      "long",
      "short",
      "int",
      "char"
    ],
    "correctAnswer": 2,
    "codeExample": "int n = \"ICSE\".length();"
  },
  {
    "id": 3,
    "question": "How does length() for String differ from length for arrays?",
    "shortAnswer": "String uses a method length(); array uses a public final field length without parentheses.",
    "explanation": "String.length() is an accessor method; array.length is a JVM built-in field.",
    "hint": "Parentheses vs no parentheses",
    "level": "basic",
    "options": [
      "String has length; array has length()",
      "String has length(); array has length",
      "Both use length()",
      "Both use length without ()"
    ],
    "correctAnswer": 1,
    "codeExample": "int l1 = s.length(); int l2 = arr.length;"
  },
  {
    "id": 4,
    "question": "What does \"\".length() (empty string) return?",
    "shortAnswer": "0",
    "explanation": "An empty string contains zero characters.",
    "hint": "Zero characters",
    "level": "basic",
    "options": [
      "0",
      "1",
      "-1",
      "null"
    ],
    "correctAnswer": 0,
    "codeExample": "\"\".length(); // returns 0"
  },
  {
    "id": 5,
    "question": "What does \"   \".length() (three spacebar characters) return?",
    "shortAnswer": "3",
    "explanation": "Each whitespace spacebar is a distinct character with ASCII code 32.",
    "hint": "Spaces count as characters",
    "level": "basic",
    "options": [
      "0",
      "1",
      "3",
      "null"
    ],
    "correctAnswer": 2,
    "codeExample": "\"   \".length(); // returns 3"
  },
  {
    "id": 6,
    "question": "What is the output of: \"Barrackpore\".length()?",
    "shortAnswer": "11",
    "explanation": "Count characters: B-a-r-r-a-c-k-p-o-r-e has 11 letters.",
    "hint": "Count from 1 to 11",
    "level": "basic",
    "options": [
      "10",
      "11",
      "12",
      "9"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Barrackpore\".length(); // 11"
  },
  {
    "id": 7,
    "question": "What happens if length() is invoked on a null String reference?",
    "shortAnswer": "java.lang.NullPointerException is thrown at runtime.",
    "explanation": "Invoking any instance method on a null reference causes the JVM to throw NullPointerException.",
    "hint": "Null dereference",
    "level": "intermediate",
    "options": [
      "Returns 0",
      "Returns -1",
      "Throws NullPointerException",
      "Compile error"
    ],
    "correctAnswer": 2,
    "codeExample": "String s = null; s.length(); // NullPointerException"
  },
  {
    "id": 8,
    "question": "What is the output of: \"Hello\\nWorld\".length()?",
    "shortAnswer": "11",
    "explanation": "The escape sequence '\\n' is counted as a single character. 'Hello' (5) + '\\n' (1) + 'World' (5) = 11.",
    "hint": "'\\n' is 1 character",
    "level": "intermediate",
    "options": [
      "12",
      "11",
      "10",
      "13"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Hello\\nWorld\".length(); // 11"
  },
  {
    "id": 9,
    "question": "What is the output of: \"A\\tB\".length()?",
    "shortAnswer": "3",
    "explanation": "'A' (1) + '\\t' (1) + 'B' (1) = 3.",
    "hint": "Tab escape is 1 char",
    "level": "basic",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 1,
    "codeExample": "\"A\\tB\".length(); // 3"
  },
  {
    "id": 10,
    "question": "In an ICSE for-loop to traverse a String 's', what should be the terminating loop condition?",
    "shortAnswer": "i < s.length() or i <= s.length() - 1",
    "explanation": "String indices range from 0 to length - 1. Writing i <= s.length() causes StringIndexOutOfBoundsException.",
    "hint": "Valid index boundary",
    "level": "intermediate",
    "options": [
      "i <= s.length()",
      "i < s.length()",
      "i < s.length",
      "i == s.length()"
    ],
    "correctAnswer": 1,
    "codeExample": "for(int i = 0; i < s.length(); i++)"
  },
  {
    "id": 11,
    "question": "What happens if a student writes 's.length' without parentheses on a String?",
    "shortAnswer": "Compile error: cannot find symbol variable length.",
    "explanation": "length is not a field in String; it is a method, requiring ().",
    "hint": "Compiler syntax check",
    "level": "basic",
    "options": [
      "Executes normally",
      "Compile-time error",
      "Runtime exception",
      "Returns 0"
    ],
    "correctAnswer": 1,
    "codeExample": "s.length; // compile error"
  },
  {
    "id": 12,
    "question": "What is the maximum theoretical length of a String in Java?",
    "shortAnswer": "Integer.MAX_VALUE (2,147,483,647 characters, bounded by JVM heap).",
    "explanation": "Because length() returns int, the maximum length is bounded by 2^31 - 1 characters.",
    "hint": "Maximum int value",
    "level": "advanced",
    "options": [
      "65,535",
      "1,048,576",
      "2,147,483,647",
      "Unlimited"
    ],
    "correctAnswer": 2,
    "codeExample": "Integer.MAX_VALUE"
  },
  {
    "id": 13,
    "question": "What does \"\\\\\\\\ \".length() return?",
    "shortAnswer": "3",
    "explanation": "Each double backslash '\\\\' represents a single literal backslash character (2 characters), plus 1 trailing space = 3.",
    "hint": "Escaped backslashes",
    "level": "intermediate",
    "options": [
      "5",
      "3",
      "2",
      "4"
    ],
    "correctAnswer": 1,
    "codeExample": "\"\\\\\\\\ \".length(); // 3"
  },
  {
    "id": 14,
    "question": "What does \"Computer \".trim().length() return?",
    "shortAnswer": "8",
    "explanation": "\"Computer \" has length 9. Calling trim() removes the trailing space, resulting in length 8.",
    "hint": "Trim removes trailing space",
    "level": "intermediate",
    "options": [
      "9",
      "8",
      "7",
      "10"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Computer \".trim().length(); // 8"
  },
  {
    "id": 15,
    "question": "Is length() a static method or an instance method?",
    "shortAnswer": "Instance method",
    "explanation": "It must be invoked on a specific String object instance (e.g. s.length()).",
    "hint": "Belongs to an instance",
    "level": "basic",
    "options": [
      "Static method",
      "Instance method",
      "Abstract method",
      "Constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "s.length(); // instance method"
  },
  {
    "id": 16,
    "question": "What is the output of: String s = \"12345\"; System.out.println(s.length() + 5);?",
    "shortAnswer": "10",
    "explanation": "s.length() is integer 5. 5 + 5 evaluates to 10 (numeric addition).",
    "hint": "Integer addition",
    "level": "basic",
    "options": [
      "55",
      "10",
      "123455",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "5 + 5 = 10"
  },
  {
    "id": 17,
    "question": "What is the output of: System.out.println(\"Len: \" + \"ICSE\".length() + 2);?",
    "shortAnswer": "\"Len: 42\"",
    "explanation": "String concatenation happens left to right: \"Len: \" + 4 gives \"Len: 4\", then + 2 gives \"Len: 42\".",
    "hint": "Left to right string concatenation",
    "level": "intermediate",
    "options": [
      "Len: 6",
      "\"Len: 42\"",
      "Len: 4",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Len: \" + 4 + 2 -> \"Len: 42\""
  },
  {
    "id": 18,
    "question": "How can you get the index of the very last character in a String 's'?",
    "shortAnswer": "s.length() - 1",
    "explanation": "Since strings are 0-indexed, the last character is at length() - 1.",
    "hint": "0-based indexing rule",
    "level": "basic",
    "options": [
      "s.length()",
      "s.length() - 1",
      "s.length() + 1",
      "s.lastIndex()"
    ],
    "correctAnswer": 1,
    "codeExample": "int lastIdx = s.length() - 1;"
  },
  {
    "id": 19,
    "question": "What happens if you check the length of a string containing Unicode characters like emojis?",
    "shortAnswer": "Returns the number of UTF-16 code units (emojis often take 2 code units).",
    "explanation": "Java strings use UTF-16 encoding; supplementary characters outside the BMP take 2 code units.",
    "hint": "UTF-16 code units",
    "level": "advanced",
    "options": [
      "Always 1",
      "Number of UTF-16 code units (may be 2 for surrogate pairs)",
      "Throws UnsupportedEncodingException",
      "Returns -1"
    ],
    "correctAnswer": 1,
    "codeExample": "String emoji = \"\\uD83D\\uDE00\"; // length is 2"
  },
  {
    "id": 20,
    "question": "What is the time complexity of length() in Java?",
    "shortAnswer": "O(1) constant time.",
    "explanation": "The length is precalculated and stored as part of the internal byte array or cached in the String object.",
    "hint": "Direct field lookup",
    "level": "advanced",
    "options": [
      "O(n) linear scan",
      "O(1) constant time",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 1,
    "codeExample": "O(1) constant time"
  },
  {
    "id": 21,
    "question": "Can length() ever return a negative value?",
    "shortAnswer": "No, length is always >= 0.",
    "explanation": "The length of a sequence of characters is non-negative.",
    "hint": "Always non-negative",
    "level": "basic",
    "options": [
      "Yes, if string is null",
      "Yes, on error",
      "No, always non-negative",
      "Only in Java 8"
    ],
    "correctAnswer": 2,
    "codeExample": "length() >= 0"
  },
  {
    "id": 22,
    "question": "What is the output of: String s = \"\\\"Java\\\"\"; System.out.println(s.length());?",
    "shortAnswer": "6",
    "explanation": "Characters are: quote (\"), J, a, v, a, quote (\"). Total = 6 characters.",
    "hint": "Escaped quotes count as 1 char each",
    "level": "intermediate",
    "options": [
      "4",
      "6",
      "8",
      "5"
    ],
    "correctAnswer": 1,
    "codeExample": "\"\\\"Java\\\"\".length(); // 6"
  },
  {
    "id": 23,
    "question": "If String[] arr = {\"Shyamnagar\", \"Naihati\"}; what is arr[0].length()?",
    "shortAnswer": "10",
    "explanation": "arr[0] is \"Shyamnagar\", which has 10 characters.",
    "hint": "Length of first array element",
    "level": "intermediate",
    "options": [
      "2",
      "10",
      "7",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Shyamnagar\".length() = 10"
  },
  {
    "id": 24,
    "question": "What does (\"A\" + \"B\" + \"C\").length() evaluate to?",
    "shortAnswer": "3",
    "explanation": "Concatenating produces \"ABC\", which has 3 characters.",
    "hint": "Concatenate then measure",
    "level": "basic",
    "options": [
      "1",
      "2",
      "3",
      "6"
    ],
    "correctAnswer": 2,
    "codeExample": "\"ABC\".length() = 3"
  },
  {
    "id": 25,
    "question": "In ICSE Board evaluation, why is using s.length() in loop conditions preferred over hardcoding numbers?",
    "shortAnswer": "It avoids StringIndexOutOfBoundsException when strings of varying lengths are tested.",
    "explanation": "Dynamic length evaluation adapts to any user input entered via Scanner.",
    "hint": "Dynamic input resilience",
    "level": "basic",
    "options": [
      "Hardcoded numbers are faster",
      "Adapts dynamically to any input without out-of-bounds errors",
      "Required by Java compiler",
      "Saves battery life"
    ],
    "correctAnswer": 1,
    "codeExample": "Avoids index out of bounds"
  }
];

export default questions;
