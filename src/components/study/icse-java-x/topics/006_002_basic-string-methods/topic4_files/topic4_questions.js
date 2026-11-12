const questions = [
  {
    "id": 1,
    "question": "What is the return type of trim() in class String?",
    "shortAnswer": "String",
    "explanation": "Returns a new String with leading and trailing whitespace omitted.",
    "hint": "Returns new String",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char[]",
      "int"
    ],
    "correctAnswer": 1,
    "codeExample": "String clean = s.trim();"
  },
  {
    "id": 2,
    "question": "Does trim() remove internal spaces between words?",
    "shortAnswer": "No, it removes ONLY leading and trailing whitespace.",
    "explanation": "Spaces between words are completely preserved.",
    "hint": "Internal spaces preserved",
    "level": "basic",
    "options": [
      "Yes, removes all spaces",
      "No, only leading and trailing",
      "Only leading spaces",
      "Only trailing spaces"
    ],
    "correctAnswer": 1,
    "codeExample": "\"A B\".trim(); // \"A B\""
  },
  {
    "id": 3,
    "question": "What is the output of: \"   Barrackpore   \".trim()?",
    "shortAnswer": "\"Barrackpore\"",
    "explanation": "All 3 leading and 3 trailing spaces are stripped.",
    "hint": "Strip both ends",
    "level": "basic",
    "options": [
      "\"Barrackpore\"",
      "\"   Barrackpore\"",
      "\"Barrackpore   \"",
      "\"Barrack pore\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"   Barrackpore   \".trim(); // \"Barrackpore\""
  },
  {
    "id": 4,
    "question": "What is the output of: \"  Hello   World  \".trim()?",
    "shortAnswer": "\"Hello   World\"",
    "explanation": "Leading and trailing spaces are removed; the 3 internal spaces remain.",
    "hint": "Internal whitespace preserved",
    "level": "intermediate",
    "options": [
      "\"HelloWorld\"",
      "\"Hello World\"",
      "\"Hello   World\"",
      "\"  Hello World  \""
    ],
    "correctAnswer": 2,
    "codeExample": "\"  Hello   World  \".trim(); // \"Hello   World\""
  },
  {
    "id": 5,
    "question": "What does \"    \".trim() (only spaces) return?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "When all characters are whitespace, the result is an empty string of length 0.",
    "hint": "All spaces become empty string",
    "level": "basic",
    "options": [
      "\" \"",
      "\"\" (empty string)",
      "null",
      "Throws Exception"
    ],
    "correctAnswer": 1,
    "codeExample": "\"    \".trim(); // \"\""
  },
  {
    "id": 6,
    "question": "What does \"\".trim() (already empty string) return?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "Returns empty string without modification.",
    "hint": "Empty string unchanged",
    "level": "basic",
    "options": [
      "\"\"",
      "null",
      "-1",
      "Throws Exception"
    ],
    "correctAnswer": 0,
    "codeExample": "\"\".trim(); // \"\""
  },
  {
    "id": 7,
    "question": "What happens if the calling string has no leading or trailing whitespace?",
    "shortAnswer": "Returns the original String reference (this) without allocating new memory.",
    "explanation": "Java optimizes by returning the calling string reference if no trimming is needed.",
    "hint": "Optimization when no spaces exist",
    "level": "intermediate",
    "options": [
      "Throws Exception",
      "Allocates a new identical string",
      "Returns original string reference (this)",
      "Returns null"
    ],
    "correctAnswer": 2,
    "codeExample": "String s = \"Java\"; s.trim() == s; // true"
  },
  {
    "id": 8,
    "question": "Does trim() modify the original string?",
    "shortAnswer": "No, String objects are immutable; trim() returns a NEW string.",
    "explanation": "Original string remains unchanged.",
    "hint": "Immutability principle",
    "level": "basic",
    "options": [
      "Yes, modifies in-place",
      "No, Strings are immutable",
      "Only if stored in pool",
      "Only in BlueJ"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = \" A \"; s.trim(); // s is still \" A \""
  },
  {
    "id": 9,
    "question": "What is the output of: String s = \" ICSE \"; s.trim(); System.out.println(s.length());?",
    "shortAnswer": "6",
    "explanation": "Because s was not reassigned (s = s.trim()), s still references \" ICSE \" of length 6.",
    "hint": "Immutability reassignment check",
    "level": "intermediate",
    "options": [
      "4",
      "6",
      "5",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "s remains unchanged without assignment"
  },
  {
    "id": 10,
    "question": "Which characters does trim() remove based on ASCII value?",
    "shortAnswer": "Any character with Unicode code <= '\\u0020' (ASCII 32 and below).",
    "explanation": "This includes space (32), tab '\\t' (9), newline '\\n' (10), carriage return '\\r' (13).",
    "hint": "Characters <= ASCII 32",
    "level": "advanced",
    "options": [
      "Only spacebar (32)",
      "Characters with ASCII <= 32 (including \\t, \\n, \\r)",
      "All non-alphabetic chars",
      "Only tabs"
    ],
    "correctAnswer": 1,
    "codeExample": "ASCII <= 32"
  },
  {
    "id": 11,
    "question": "What is the output of: \"\\n\\tHello\\r\\n\".trim()?",
    "shortAnswer": "\"Hello\"",
    "explanation": "Whitespace characters '\\n', '\\t', '\\r' are all <= ASCII 32 and are trimmed.",
    "hint": "Trims all ASCII <= 32 whitespace",
    "level": "intermediate",
    "options": [
      "\"Hello\"",
      "\"\\tHello\"",
      "\"Hello\\r\\n\"",
      "\"\\n\\tHello\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"\\n\\tHello\\r\\n\".trim(); // \"Hello\""
  },
  {
    "id": 12,
    "question": "Why is trim() commonly chained with Scanner: in.nextLine().trim()?",
    "shortAnswer": "To sanitize user input and prevent leading/trailing space errors in word comparisons.",
    "explanation": "Users frequently hit spacebar before or after typing input.",
    "hint": "Sanitizing user input",
    "level": "basic",
    "options": [
      "Required to compile",
      "To sanitize user input from accidental spaces",
      "To convert to lowercase",
      "To speed up JVM"
    ],
    "correctAnswer": 1,
    "codeExample": "String name = sc.nextLine().trim();"
  },
  {
    "id": 13,
    "question": "What does \"A B C \".trim().length() evaluate to?",
    "shortAnswer": "5",
    "explanation": "\"A B C \" (length 6) trimmed is \"A B C\" (length 5).",
    "hint": "Trims single trailing space",
    "level": "basic",
    "options": [
      "6",
      "5",
      "3",
      "7"
    ],
    "correctAnswer": 1,
    "codeExample": "\"A B C \".trim().length(); // 5"
  },
  {
    "id": 14,
    "question": "What happens if trim() is invoked on null: String s = null; s.trim();?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Calling any instance method on null throws NullPointerException.",
    "hint": "Null dereference",
    "level": "basic",
    "options": [
      "Returns null",
      "\"\"",
      "Throws NullPointerException",
      "Compile error"
    ],
    "correctAnswer": 2,
    "codeExample": "null.trim(); // NullPointerException"
  },
  {
    "id": 15,
    "question": "In Java 11+, what method was introduced that handles full Unicode whitespace beyond ASCII 32?",
    "shortAnswer": "strip()",
    "explanation": "strip() is Unicode-aware (handles em-space, thin space, etc.), unlike trim() which only handles <= 32.",
    "hint": "strip() method in Java 11",
    "level": "advanced",
    "options": [
      "clean()",
      "strip()",
      "trimUnicode()",
      "removeSpaces()"
    ],
    "correctAnswer": 1,
    "codeExample": "s.strip();"
  },
  {
    "id": 16,
    "question": "What is the output of: \"  ICSE  \".trim().equals(\"ICSE\")?",
    "shortAnswer": "true",
    "explanation": "\"  ICSE  \".trim() produces \"ICSE\", matching \"ICSE\".",
    "hint": "Trimmed equals comparison",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile error",
      "NullPointerException"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 17,
    "question": "What is the output of: \"  ICSE  \".trim() == \"ICSE\"?",
    "shortAnswer": "It depends, but typically false (trim creates a new String on the Heap).",
    "explanation": "'==' checks references; trim creates a new heap string distinct from the pooled literal.",
    "hint": "Reference comparison after trim",
    "level": "advanced",
    "options": [
      "Always true",
      "false (different references)",
      "Compile error",
      "Runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "false (reference check)"
  },
  {
    "id": 18,
    "question": "How can you remove ALL spaces from a String including internal spaces?",
    "shortAnswer": "s.replace(\" \", \"\")",
    "explanation": "replace(\" \", \"\") removes every single spacebar character throughout the string.",
    "hint": "Remove all whitespace idiom",
    "level": "intermediate",
    "options": [
      "s.trim()",
      "s.replace(\" \", \"\")",
      "s.clean()",
      "s.removeAll(' ')"
    ],
    "correctAnswer": 1,
    "codeExample": "s.replace(\" \", \"\")"
  },
  {
    "id": 19,
    "question": "What does \"\\t  BlueJ  \\n\".trim() return?",
    "shortAnswer": "\"BlueJ\"",
    "explanation": "Both tabs and spaces and newlines are stripped from ends.",
    "hint": "Mixed whitespace trimming",
    "level": "basic",
    "options": [
      "\"BlueJ\"",
      "\"  BlueJ  \"",
      "\"\\tBlueJ\"",
      "\"BlueJ\\n\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"BlueJ\""
  },
  {
    "id": 20,
    "question": "What is the output of: \"  A  B  \".trim().indexOf(' ')?",
    "shortAnswer": "1",
    "explanation": "Trimmed string is \"A  B\". First space is at index 1.",
    "hint": "First space after trim",
    "level": "intermediate",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 1,
    "codeExample": "\"A  B\".indexOf(' ') = 1"
  },
  {
    "id": 21,
    "question": "What is the output of: \"  A  B  \".trim().lastIndexOf(' ')?",
    "shortAnswer": "2",
    "explanation": "Trimmed string is \"A  B\". Second space is at index 2.",
    "hint": "Last space after trim",
    "level": "intermediate",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 1,
    "codeExample": "\"A  B\".lastIndexOf(' ') = 2"
  },
  {
    "id": 22,
    "question": "Can trim() take any parameters?",
    "shortAnswer": "No, trim() takes zero arguments.",
    "explanation": "Signature has empty parameter list: public String trim().",
    "hint": "Zero arguments",
    "level": "basic",
    "options": [
      "Yes, char to trim",
      "No, zero parameters",
      "Yes, boolean flag",
      "Optional regex"
    ],
    "correctAnswer": 1,
    "codeExample": "public String trim()"
  },
  {
    "id": 23,
    "question": "What does \"123 \".trim() + 4 evaluate to?",
    "shortAnswer": "\"1234\"",
    "explanation": "\"123 \".trim() gives \"123\", then + 4 concatenates to \"1234\".",
    "hint": "Trim then string concatenation",
    "level": "basic",
    "options": [
      "127",
      "\"1234\"",
      "\"123 4\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"123\" + 4 = \"1234\""
  },
  {
    "id": 24,
    "question": "What is the output of: \"   .   \".trim()?",
    "shortAnswer": "\".\"",
    "explanation": "The single dot character is preserved; leading and trailing spaces are removed.",
    "hint": "Non-whitespace preserved",
    "level": "basic",
    "options": [
      "\"\"",
      "\".\"",
      "\"   .   \"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\".\""
  },
  {
    "id": 25,
    "question": "In ICSE word-counting programs, why is trimming the sentence before processing critical?",
    "shortAnswer": "To ensure leading/trailing spaces don't falsely increment the word count.",
    "explanation": "Counting spaces to count words fails if leading or trailing spaces exist.",
    "hint": "Accurate word counting",
    "level": "intermediate",
    "options": [
      "Required by compiler",
      "Prevents false word count increments from edge spaces",
      "Converts string to array",
      "Speeds up loop"
    ],
    "correctAnswer": 1,
    "codeExample": "Input sanitization for word count"
  }
];

export default questions;
