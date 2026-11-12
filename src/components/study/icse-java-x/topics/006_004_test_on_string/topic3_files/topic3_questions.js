const questions = [
  {
    "id": 1,
    "question": "What is the primary ICSE board syllabus objective tested in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "The CISCE Board syllabus tests candidate proficiency in String manipulation methods, loop traversal, condition evaluation, and clean class/variable design for Piglatin Word Transformation & Syllable Encoding Test Paper.",
    "explanation": "In ICSE Class X Computer Applications, string handling is tested extensively across both Section A (short answer output predictions) and Section B (15-mark program implementations). Mastering Piglatin Word Transformation & Syllable Encoding Test Paper ensures maximum score potential.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "basic",
    "options": [
      "The CISCE Board syllabus tests candidate proficiency in String manipulation methods, loop traversal, condition evaluation, and clean class/variable design for Piglatin Word Transformation & Syllable Encoding Test Paper.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #1"
  },
  {
    "id": 2,
    "question": "Which Java String class methods are most critically required in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "The core methods are charAt(), length(), substring(), indexOf(), toUpperCase(), toLowerCase(), equals(), and compareTo().",
    "explanation": "These methods form the mechanical foundation of all string processing algorithms in ICSE exams. Each method must be used with exact parameter signatures and return types.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "basic",
    "options": [
      "The core methods are charAt(), length(), substring(), indexOf(), toUpperCase(), toLowerCase(), equals(), and compareTo().",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #2"
  },
  {
    "id": 3,
    "question": "What is the most frequent cause of StringIndexOutOfBoundsException in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "Using a loop boundary of 'i <= s.length()' instead of 'i < s.length()' triggers StringIndexOutOfBoundsException at index equal to length().",
    "explanation": "Because Java strings are 0-indexed, the valid indices range strictly from 0 to s.length() - 1. Accessing index s.length() immediately crashes with a runtime exception.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "basic",
    "options": [
      "Using a loop boundary of 'i <= s.length()' instead of 'i < s.length()' triggers StringIndexOutOfBoundsException at index equal to length().",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #3"
  },
  {
    "id": 4,
    "question": "Why is immutability of String objects a critical concept in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "Strings in Java cannot be altered once instantiated on the Heap. All operations like toUpperCase() or replace() return a NEW String object.",
    "explanation": "If you execute 'str.toUpperCase();' without assigning it back ('str = str.toUpperCase();'), the original string remains completely unchanged.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "basic",
    "options": [
      "Strings in Java cannot be altered once instantiated on the Heap. All operations like toUpperCase() or replace() return a NEW String object.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #4"
  },
  {
    "id": 5,
    "question": "How should Scanner input be handled when reading strings with spaces in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "Always use scanner.nextLine() instead of scanner.next() to read complete multi-word sentences including whitespace.",
    "explanation": "scanner.next() only reads up to the first whitespace delimiter, dropping the remainder of the sentence. For sentences, nextLine() is strictly mandatory.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "basic",
    "options": [
      "Always use scanner.nextLine() instead of scanner.next() to read complete multi-word sentences including whitespace.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #5"
  },
  {
    "id": 6,
    "question": "What is the exact penalty for omitting the Variable Description Table in ICSE Section B programs?",
    "shortAnswer": "CISCE board marking schemes deduct 2 to 3 marks out of 15 for omitting the Variable Description Table.",
    "explanation": "The table must document Variable Name, Data Type, and Purpose in a clear tabular format following the program source code.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "basic",
    "options": [
      "CISCE board marking schemes deduct 2 to 3 marks out of 15 for omitting the Variable Description Table.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #6"
  },
  {
    "id": 7,
    "question": "How does case-sensitivity affect character and string comparisons in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "Uppercase letters have lower ASCII values ('A'=65) than lowercase ('a'=97). Normal comparisons treat them as completely distinct.",
    "explanation": "To perform case-insensitive checks in board programs, always normalize strings using toUpperCase(), toLowerCase(), or equalsIgnoreCase().",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "basic",
    "options": [
      "Uppercase letters have lower ASCII values ('A'=65) than lowercase ('a'=97). Normal comparisons treat them as completely distinct.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #7"
  },
  {
    "id": 8,
    "question": "Why should String comparison never use the '==' operator in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "'==' compares Heap object memory addresses, whereas '.equals()' compares actual textual character sequences.",
    "explanation": "Two separate String objects containing identical text ('HELLO') will return false under '==' if they reside at different memory addresses.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "basic",
    "options": [
      "'==' compares Heap object memory addresses, whereas '.equals()' compares actual textual character sequences.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #8"
  },
  {
    "id": 9,
    "question": "What is the significance of the return value of compareTo() when sorting in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "compareTo() returns 0 if equal, negative if calling string precedes argument, and positive if calling string follows argument.",
    "explanation": "In Bubble sort or Selection sort, 's1.compareTo(s2) > 0' signifies that s1 is alphabetically larger than s2 and must be swapped for ascending order.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "compareTo() returns 0 if equal, negative if calling string precedes argument, and positive if calling string follows argument.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #9"
  },
  {
    "id": 10,
    "question": "How do you convert a primitive numeric value to its String representation in Java?",
    "shortAnswer": "Using String.valueOf(number) or Integer.toString(number) or through empty string concatenation: \"\" + number.",
    "explanation": "String.valueOf() is the cleanest and most efficient library approach prescribed in the ICSE syllabus.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "Using String.valueOf(number) or Integer.toString(number) or through empty string concatenation: \"\" + number.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #10"
  },
  {
    "id": 11,
    "question": "What is the difference between single-argument substring(int begin) and dual-argument substring(int begin, int end)?",
    "shortAnswer": "Single-argument extracts from begin to the end of string. Dual-argument extracts from begin up to end - 1 (exclusive end).",
    "explanation": "In 'COMPUTER'.substring(2, 5), characters at indices 2 ('M'), 3 ('P'), and 4 ('U') are returned, excluding index 5.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "Single-argument extracts from begin to the end of string. Dual-argument extracts from begin up to end - 1 (exclusive end).",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #11"
  },
  {
    "id": 12,
    "question": "What happens when indexOf() fails to find a specified character or substring?",
    "shortAnswer": "indexOf() returns -1, indicating that the character or substring is absent.",
    "explanation": "Never assume indexOf() returns 0 on failure; 0 represents the first valid index position.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "indexOf() returns -1, indicating that the character or substring is absent.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #12"
  },
  {
    "id": 13,
    "question": "How can trailing spaces prevent StringIndexOutOfBoundsException during word extraction?",
    "shortAnswer": "Appending a space delimiter ensures the last word has a closing space to trigger its processing logic cleanly.",
    "explanation": "If 's = s + \" \"' is not performed, the final word accumulated inside the loop remains unprocessed when the loop finishes.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "Appending a space delimiter ensures the last word has a closing space to trigger its processing logic cleanly.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #13"
  },
  {
    "id": 14,
    "question": "How are characters classified using the Character wrapper class in Piglatin Word Transformation & Syllable Encoding Test Paper?",
    "shortAnswer": "Using static methods Character.isLetter(ch), Character.isDigit(ch), Character.isUpperCase(ch), and Character.isWhitespace(ch).",
    "explanation": "These boolean methods evaluate char arguments against Unicode specifications without needing manual ASCII arithmetic.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "Using static methods Character.isLetter(ch), Character.isDigit(ch), Character.isUpperCase(ch), and Character.isWhitespace(ch).",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #14"
  },
  {
    "id": 15,
    "question": "What is the ASCII value range for digits '0' through '9'?",
    "shortAnswer": "Digits '0' to '9' occupy ASCII values 48 to 57.",
    "explanation": "To convert char digit to integer: 'int digit = ch - '0';' (e.g., '5' (53) - '0' (48) = 5).",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "Digits '0' to '9' occupy ASCII values 48 to 57.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #15"
  },
  {
    "id": 16,
    "question": "How does BlueJ handle String inputs when executing methods directly on workbench objects?",
    "shortAnswer": "BlueJ displays a dialogue box where String arguments must be enclosed in double quotes (e.g. \"Kolkata\").",
    "explanation": "Entering text without double quotes in BlueJ workbench method call prompts a syntax evaluation error.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "BlueJ displays a dialogue box where String arguments must be enclosed in double quotes (e.g. \"Kolkata\").",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #16"
  },
  {
    "id": 17,
    "question": "Can a Java String contain escape sequences like '\\n' and '\\t'?",
    "shortAnswer": "Yes, escape sequences allow embedding newlines ('\\n'), tabs ('\\t'), double quotes ('\\\"'), and backslashes ('\\\\').",
    "explanation": "Escape sequences occupy exactly one character position in string length.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "Yes, escape sequences allow embedding newlines ('\\n'), tabs ('\\t'), double quotes ('\\\"'), and backslashes ('\\\\').",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #17"
  },
  {
    "id": 18,
    "question": "What is the time complexity of Bubble Sort on an array of N Strings?",
    "shortAnswer": "Bubble Sort has a time complexity of O(N^2) comparisons in both average and worst cases.",
    "explanation": "Outer loop runs N-1 times, inner loop runs up to N-1-i times, totaling N*(N-1)/2 comparisons.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "intermediate",
    "options": [
      "Bubble Sort has a time complexity of O(N^2) comparisons in both average and worst cases.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #18"
  },
  {
    "id": 19,
    "question": "How do you check whether a String is empty or contains only whitespace?",
    "shortAnswer": "Use 's.trim().isEmpty()' or 's.trim().length() == 0'.",
    "explanation": "trim() strips whitespace, after which checking length == 0 validates true emptiness.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "advanced",
    "options": [
      "Use 's.trim().isEmpty()' or 's.trim().length() == 0'.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #19"
  },
  {
    "id": 20,
    "question": "What is the difference between charAt() and substring() when extracting a single character?",
    "shortAnswer": "charAt() returns a primitive 'char' data type, while substring(i, i + 1) returns a 'String' object.",
    "explanation": "Primitive chars can be tested with '==' and converted with Character methods; String objects require .equals().",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "advanced",
    "options": [
      "charAt() returns a primitive 'char' data type, while substring(i, i + 1) returns a 'String' object.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #20"
  },
  {
    "id": 21,
    "question": "How do you convert a String into a character array in Java?",
    "shortAnswer": "Using the char[] arr = s.toCharArray() method.",
    "explanation": "toCharArray() creates a new char array on the Heap containing a copy of all characters in the string.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "advanced",
    "options": [
      "Using the char[] arr = s.toCharArray() method.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #21"
  },
  {
    "id": 22,
    "question": "How does trim() handle whitespace in the middle of a string?",
    "shortAnswer": "trim() ONLY removes whitespace from the extreme beginning and end; internal whitespace remains untouched.",
    "explanation": "' \" A B \" .trim()' produces '\"A B\"', retaining the middle space.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "advanced",
    "options": [
      "trim() ONLY removes whitespace from the extreme beginning and end; internal whitespace remains untouched.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #22"
  },
  {
    "id": 23,
    "question": "What is the default value of String instance variables in an uninitialized Java class?",
    "shortAnswer": "Because String is a reference object type, its default instance variable value is null.",
    "explanation": "Invoking any method on a null String reference triggers NullPointerException.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "advanced",
    "options": [
      "Because String is a reference object type, its default instance variable value is null.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #23"
  },
  {
    "id": 24,
    "question": "How can you extract words from a sentence using split() vs manual looping in ICSE exams?",
    "shortAnswer": "Manual looping is preferred in ICSE board exams; split(\" \") is acceptable only if question does not restrict loops.",
    "explanation": "CISCE board examiners award full marks for manual charAt() loops with space checking as it demonstrates raw algorithm skill.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "advanced",
    "options": [
      "Manual looping is preferred in ICSE board exams; split(\" \") is acceptable only if question does not restrict loops.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #24"
  },
  {
    "id": 25,
    "question": "What is the best strategy to maximize marks in ICSE Board String questions?",
    "shortAnswer": "Write clean class declarations, use Scanner for input, parenthesize conditions, comment key steps, and append a complete Variable Description Table.",
    "explanation": "Following this structured approach guarantees full marks (15/15) in Section B programming problems.",
    "hint": "Review ICSE Class 10 BlueJ String specifications.",
    "level": "advanced",
    "options": [
      "Write clean class declarations, use Scanner for input, parenthesize conditions, comment key steps, and append a complete Variable Description Table.",
      "Incorrect: Violates Java language specification and ICSE marking criteria.",
      "Incorrect: Leads to runtime NullPointerException or StringIndexOutOfBoundsException.",
      "Incorrect: Causes type mismatch error during compilation."
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Board Example for Piglatin Transformation Test\n// Method / Algorithmic implementation rule #25"
  }
];

export default questions;
