const questions = [
  {
    "id": 1,
    "question": "What is the return type of the concat(String str) method in Java?",
    "shortAnswer": "String",
    "explanation": "concat() returns a newly constructed String containing the merged character sequences.",
    "hint": "Returns a String object.",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char[]",
      "StringBuilder"
    ],
    "correctAnswer": 1,
    "codeExample": "String res = s1.concat(s2);"
  },
  {
    "id": 2,
    "question": "What does this print: String s = \"Java\"; s.concat(\"2026\"); System.out.println(s);",
    "shortAnswer": "Java",
    "explanation": "String objects are immutable. Since s was not reassigned (s = s.concat(...)), s remains \"Java\".",
    "hint": "Strings are immutable; return value was not stored.",
    "level": "basic",
    "options": [
      "Java2026",
      "Java",
      "null",
      "Compile Error"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = \"Java\"; s.concat(\"2026\"); System.out.println(s); // Java"
  },
  {
    "id": 3,
    "question": "What happens when you pass null to concat(): \"Hello\".concat(null)?",
    "shortAnswer": "NullPointerException is thrown at runtime.",
    "explanation": "concat() does not allow null parameters. Passing null causes an immediate NullPointerException.",
    "hint": "concat does not tolerate null.",
    "level": "intermediate",
    "options": [
      "\"Hellonull\"",
      "NullPointerException",
      "Compile error",
      "\"Hello\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"Hello\".concat(null); // java.lang.NullPointerException"
  },
  {
    "id": 4,
    "question": "How does the '+' operator differ from concat() when appending an integer?",
    "shortAnswer": "'+' converts the integer to String automatically; concat() causes a compilation error if an int is passed.",
    "explanation": "'+' accepts any primitive and implicitly converts it, whereas concat() strictly requires a String parameter.",
    "hint": "Parameter type check.",
    "level": "intermediate",
    "options": [
      "No difference",
      "concat() is faster and converts int automatically",
      "'+' allows primitives; concat() only takes String objects",
      "'+' throws NullPointerException on int"
    ],
    "correctAnswer": 2,
    "codeExample": "\"Age: \" + 16; // Valid\n// \"Age: \".concat(16); // Error"
  },
  {
    "id": 5,
    "question": "What does \"ICSE\".concat(\"\") return in standard JVM implementations?",
    "shortAnswer": "The exact same String instance \"ICSE\" (same reference).",
    "explanation": "When concatenating an empty string of length 0, Java optimizes by returning the calling String reference (this).",
    "hint": "Optimization when parameter length is 0.",
    "level": "advanced",
    "options": [
      "A newly allocated String",
      "The exact same reference (this)",
      "null",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = \"ICSE\"; System.out.println(s.concat(\"\") == s); // true"
  },
  {
    "id": 6,
    "question": "What is the output of: \"A\".concat(\"B\").concat(\"C\")?",
    "shortAnswer": "\"ABC\"",
    "explanation": "Chaining concat calls appends 'B' to 'A' giving \"AB\", then appends 'C' giving \"ABC\".",
    "hint": "Chained concatenation",
    "level": "basic",
    "options": [
      "\"ABC\"",
      "\"A B C\"",
      "\"CBA\"",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"A\".concat(\"B\").concat(\"C\"); // \"ABC\""
  },
  {
    "id": 7,
    "question": "What is the output of: String s = \"Kolkata\"; System.out.println(s.concat(\" Metro\").length());?",
    "shortAnswer": "13",
    "explanation": "\"Kolkata Metro\" has 7 + 1 + 5 = 13 characters.",
    "hint": "Concatenate then measure length",
    "level": "basic",
    "options": [
      "12",
      "13",
      "14",
      "7"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Kolkata Metro\".length() = 13"
  },
  {
    "id": 8,
    "question": "Does concat() modify the invoking String object?",
    "shortAnswer": "No, String is immutable; a new String object is allocated on the Heap.",
    "explanation": "Strings in Java cannot be altered once created.",
    "hint": "Immutability principle",
    "level": "basic",
    "options": [
      "Yes, modifies in-place",
      "No, Strings are immutable",
      "Only if length > 10",
      "Only in BlueJ"
    ],
    "correctAnswer": 1,
    "codeExample": "s1.concat(s2); // s1 unchanged"
  },
  {
    "id": 9,
    "question": "What happens if both strings are non-empty in concat()?",
    "shortAnswer": "A new String object is created on the Heap containing both characters sequences.",
    "explanation": "Memory is allocated for the combined length.",
    "hint": "Heap allocation",
    "level": "intermediate",
    "options": [
      "Added to String Constant Pool",
      "Allocated on Heap",
      "Stored on CPU register",
      "Stored in Stack"
    ],
    "correctAnswer": 1,
    "codeExample": "New heap object"
  },
  {
    "id": 10,
    "question": "What is the output of: String s1 = \"Hi\"; String s2 = s1.concat(\"\"); System.out.println(s1 == s2);?",
    "shortAnswer": "true",
    "explanation": "Concatenating empty string returns the same reference (this).",
    "hint": "Reference equality on empty concat",
    "level": "advanced",
    "options": [
      "true",
      "false",
      "Compile error",
      "Runtime error"
    ],
    "correctAnswer": 0,
    "codeExample": "s1 == s2 is true"
  },
  {
    "id": 11,
    "question": "What is the output of: System.out.println(\"10\".concat(\"20\"));?",
    "shortAnswer": "\"1020\"",
    "explanation": "String concatenation combines text, not mathematical addition.",
    "hint": "Textual combination",
    "level": "basic",
    "options": [
      "30",
      "\"1020\"",
      "1020",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"10\".concat(\"20\") = \"1020\""
  },
  {
    "id": 12,
    "question": "Can you pass a char primitive directly to concat(), such as s.concat('A')?",
    "shortAnswer": "No, compile error: char cannot be converted to String.",
    "explanation": "concat() accepts only a String argument.",
    "hint": "Type compatibility",
    "level": "basic",
    "options": [
      "Yes, appends 'A'",
      "No, compile error",
      "Throws runtime error",
      "Converts to int"
    ],
    "correctAnswer": 1,
    "codeExample": "s.concat('A'); // compile error"
  },
  {
    "id": 13,
    "question": "How do you append a primitive char 'ch' using concat()?",
    "shortAnswer": "s = s.concat(String.valueOf(ch)); or s = s.concat(\"\" + ch);",
    "explanation": "Convert primitive char to String before passing to concat.",
    "hint": "Convert char to String first",
    "level": "intermediate",
    "options": [
      "s.concat(ch)",
      "s.concat(String.valueOf(ch))",
      "s.concatChar(ch)",
      "s.append(ch)"
    ],
    "correctAnswer": 1,
    "codeExample": "s.concat(String.valueOf(ch))"
  },
  {
    "id": 14,
    "question": "What is the output of: String s = null; System.out.println(s + \"Java\");?",
    "shortAnswer": "\"nullJava\"",
    "explanation": "'+' operator converts null reference to the four-letter string \"null\".",
    "hint": "Plus operator null handling",
    "level": "intermediate",
    "options": [
      "\"Java\"",
      "\"nullJava\"",
      "NullPointerException",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "null + \"Java\" = \"nullJava\""
  },
  {
    "id": 15,
    "question": "What is the output of: String s = null; System.out.println(s.concat(\"Java\"));?",
    "shortAnswer": "NullPointerException",
    "explanation": "Calling an instance method on null throws NullPointerException.",
    "hint": "Instance method on null",
    "level": "intermediate",
    "options": [
      "\"nullJava\"",
      "NullPointerException",
      "\"Java\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "null.concat(\"Java\") -> NullPointerException"
  },
  {
    "id": 16,
    "question": "What is the time complexity of s1.concat(s2)?",
    "shortAnswer": "O(m + n), where m and n are lengths of s1 and s2.",
    "explanation": "Both character arrays must be copied into the new destination array.",
    "hint": "Linear in total length",
    "level": "advanced",
    "options": [
      "O(1)",
      "O(m + n)",
      "O(m * n)",
      "O(log n)"
    ],
    "correctAnswer": 1,
    "codeExample": "O(m + n)"
  },
  {
    "id": 17,
    "question": "What is the output of: String s = \"Barrack\"; s = s.concat(\"pore\"); System.out.println(s);?",
    "shortAnswer": "\"Barrackpore\"",
    "explanation": "s is explicitly reassigned to the new concatenated String object.",
    "hint": "Reassignment stores result",
    "level": "basic",
    "options": [
      "\"Barrack\"",
      "\"Barrackpore\"",
      "\"pore\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "s = s.concat(\"pore\")"
  },
  {
    "id": 18,
    "question": "How many String objects are created by: String s = \"A\".concat(\"B\").concat(\"C\"); (ignoring literals in pool)?",
    "shortAnswer": "2 heap String objects (\"AB\" and \"ABC\").",
    "explanation": "First concat creates \"AB\", second concat creates \"ABC\".",
    "hint": "Intermediate object creation",
    "level": "advanced",
    "options": [
      "1",
      "2",
      "3",
      "0"
    ],
    "correctAnswer": 1,
    "codeExample": "2 heap objects"
  },
  {
    "id": 19,
    "question": "Why is StringBuilder.append() preferred over repeated concat() inside loops?",
    "shortAnswer": "concat() creates new String objects on each iteration, causing high memory churn and O(n^2) time.",
    "explanation": "StringBuilder mutates an internal buffer without creating intermediate strings.",
    "hint": "Loop performance",
    "level": "intermediate",
    "options": [
      "concat() is deprecated",
      "concat() creates unnecessary intermediate objects causing O(n^2) cost",
      "StringBuilder is synchronized",
      "concat() throws errors in loops"
    ],
    "correctAnswer": 1,
    "codeExample": "Avoids intermediate heap objects"
  },
  {
    "id": 20,
    "question": "What does \"West \".concat(\"Bengal\").indexOf('B') return?",
    "shortAnswer": "5",
    "explanation": "\"West Bengal\" has 'B' at index 5.",
    "hint": "Concatenate then find index",
    "level": "basic",
    "options": [
      "4",
      "5",
      "6",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"West Bengal\".indexOf('B') = 5"
  },
  {
    "id": 21,
    "question": "What does \"Hello \".concat(\"World \").trim() evaluate to?",
    "shortAnswer": "\"Hello World\"",
    "explanation": "Concatenation gives \"Hello World \", then trim removes the trailing space.",
    "hint": "Concat then trim",
    "level": "intermediate",
    "options": [
      "\"HelloWorld\"",
      "\"Hello World\"",
      "\"Hello World \"",
      "\"HelloWorld \""
    ],
    "correctAnswer": 1,
    "codeExample": "\"Hello World\""
  },
  {
    "id": 22,
    "question": "What is the output of: \"0\".concat(\"1\").concat(\"2\").charAt(1)?",
    "shortAnswer": "'1'",
    "explanation": "\"012\" at index 1 is character '1'.",
    "hint": "Concat then charAt",
    "level": "basic",
    "options": [
      "'0'",
      "'1'",
      "'2'",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "'1'"
  },
  {
    "id": 23,
    "question": "What happens if s1 has length 0: \"\".concat(\"Shyamnagar\")?",
    "shortAnswer": "Returns a String containing \"Shyamnagar\".",
    "explanation": "Concatenating with empty string returns the argument's characters.",
    "hint": "Empty prefix",
    "level": "basic",
    "options": [
      "\"\"",
      "\"Shyamnagar\"",
      "null",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Shyamnagar\""
  },
  {
    "id": 24,
    "question": "What is the output of: System.out.println(\"Java \".concat(10 + 20 + \" Points\"));?",
    "shortAnswer": "\"Java 30 Points\"",
    "explanation": "10 + 20 evaluates to 30, then concatenated to \"30 Points\", then passed to concat.",
    "hint": "Expression evaluation order",
    "level": "intermediate",
    "options": [
      "\"Java 1020 Points\"",
      "\"Java 30 Points\"",
      "Error",
      "\"Java 10 Points\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"Java 30 Points\""
  },
  {
    "id": 25,
    "question": "In ICSE Section A output predictions, what is the most common student mistake regarding concat()?",
    "shortAnswer": "Assuming s.concat(\"...\") updates s without writing 's = s.concat(...)'.",
    "explanation": "Forgetting that String immutability requires variable reassignment.",
    "hint": "Immutability trap",
    "level": "basic",
    "options": [
      "Confusing + and concat",
      "Assuming s is modified without reassignment",
      "Spelling concat as append",
      "None"
    ],
    "correctAnswer": 1,
    "codeExample": "Forgetting reassignment"
  }
];

export default questions;
