const questions = [
  {
    "id": 1,
    "question": "What is the return type of replace(char oldChar, char newChar)?",
    "shortAnswer": "String",
    "explanation": "replace() returns a newly created String containing the replaced characters.",
    "hint": "Returns String.",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char",
      "char[]"
    ],
    "correctAnswer": 1,
    "codeExample": "String s2 = s1.replace('a', 'o');"
  },
  {
    "id": 2,
    "question": "How many occurrences of oldChar does replace('a', 'e') replace?",
    "shortAnswer": "ALL occurrences in the string.",
    "explanation": "The replace() method replaces every single matching occurrence found throughout the string.",
    "hint": "Replaces all matches.",
    "level": "basic",
    "options": [
      "Only the first one",
      "Only the last one",
      "ALL occurrences",
      "None"
    ],
    "correctAnswer": 2,
    "codeExample": "\"banana\".replace('a', 'o'); // \"bonono\""
  },
  {
    "id": 3,
    "question": "What does this print: String s = \"MISSISSIPPI\"; System.out.println(s.replace('I', 'A'));?",
    "shortAnswer": "MASSASSAPPA",
    "explanation": "All 4 occurrences of 'I' are replaced with 'A'.",
    "hint": "Every 'I' turns into 'A'.",
    "level": "basic",
    "options": [
      "MASSISSIPPI",
      "MASSASSAPPA",
      "MISSISSIPPI",
      "MASSASSAPPI"
    ],
    "correctAnswer": 1,
    "codeExample": "\"MISSISSIPPI\".replace('I', 'A'); // MASSASSAPPA"
  },
  {
    "id": 4,
    "question": "What does \"Kolkata\".replace('z', 'y') return?",
    "shortAnswer": "The original String \"Kolkata\" (same reference).",
    "explanation": "When oldChar is not present in the string, Java optimizes by returning the calling string reference (this).",
    "hint": "Character 'z' is not found.",
    "level": "intermediate",
    "options": [
      "\"Kolkata\"",
      "\"\"",
      "null",
      "Throws Exception"
    ],
    "correctAnswer": 0,
    "codeExample": "String s = \"Kolkata\"; s.replace('z', 'y') == s; // true"
  },
  {
    "id": 5,
    "question": "How can you remove all spaces from a String variable 'text' in a single line?",
    "shortAnswer": "text = text.replace(\" \", \"\");",
    "explanation": "Replacing space \" \" with empty string \"\" effectively removes every spacebar character.",
    "hint": "Replace space with empty string.",
    "level": "intermediate",
    "options": [
      "text.trim()",
      "text = text.replace(\" \", \"\");",
      "text.delete(' ')",
      "text.removeAll(' ')"
    ],
    "correctAnswer": 1,
    "codeExample": "String clean = \"A B C\".replace(\" \", \"\"); // \"ABC\""
  },
  {
    "id": 6,
    "question": "Does replace() modify the original String object?",
    "shortAnswer": "No, String is immutable; a new String object is returned.",
    "explanation": "Original string remains untouched.",
    "hint": "Immutability principle",
    "level": "basic",
    "options": [
      "Yes, modifies in-place",
      "No, Strings are immutable",
      "Only in heap",
      "Only in BlueJ"
    ],
    "correctAnswer": 1,
    "codeExample": "Original remains unchanged"
  },
  {
    "id": 7,
    "question": "What is the output of: String s = \"JAVA\"; s.replace('A', 'O'); System.out.println(s);?",
    "shortAnswer": "\"JAVA\"",
    "explanation": "s was not reassigned, so s remains unchanged.",
    "hint": "Immutability without reassignment",
    "level": "basic",
    "options": [
      "\"JOVO\"",
      "\"JAVA\"",
      "\"JAVO\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "s is still \"JAVA\""
  },
  {
    "id": 8,
    "question": "Is replace() case-sensitive?",
    "shortAnswer": "Yes, replace('a', 'x') will NOT replace uppercase 'A'.",
    "explanation": "Matches exact Unicode/ASCII values.",
    "hint": "Case sensitive check",
    "level": "basic",
    "options": [
      "No, case-insensitive",
      "Yes, strictly case-sensitive",
      "Configurable",
      "Only for consonants"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Apple\".replace('a', 'o'); // \"Apple\""
  },
  {
    "id": 9,
    "question": "What does \"banana\".replace('a', 'a') return?",
    "shortAnswer": "The same String reference (this) without allocating new memory.",
    "explanation": "Replacing with identical character returns original object.",
    "hint": "Identical replacement optimization",
    "level": "advanced",
    "options": [
      "New object",
      "Original reference (this)",
      "null",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "s.replace('a', 'a') == s"
  },
  {
    "id": 10,
    "question": "What is the output of: \"2025\".replace('5', '6')?",
    "shortAnswer": "\"2026\"",
    "explanation": "Character '5' replaced with '6'.",
    "hint": "Digit replacement",
    "level": "basic",
    "options": [
      "\"2026\"",
      "\"2025\"",
      "\"20256\"",
      "2026"
    ],
    "correctAnswer": 0,
    "codeExample": "\"2025\".replace('5', '6') = \"2026\""
  },
  {
    "id": 11,
    "question": "Can replace() replace words / CharSequences?",
    "shortAnswer": "Yes, overloaded replace(CharSequence target, CharSequence replacement).",
    "explanation": "Replaces occurrences of substring with replacement sequence.",
    "hint": "Sequence replacement overload",
    "level": "basic",
    "options": [
      "No, char only",
      "Yes, accepts CharSequence/String",
      "Only in Java 17",
      "Only single letters"
    ],
    "correctAnswer": 1,
    "codeExample": "\"cat\".replace(\"cat\", \"dog\")"
  },
  {
    "id": 12,
    "question": "What is the output of: \"Barrackpore, Barrackpore\".replace(\"Barrackpore\", \"Shyamnagar\")?",
    "shortAnswer": "\"Shyamnagar, Shyamnagar\"",
    "explanation": "Both occurrences of the word are replaced.",
    "hint": "Replaces all word matches",
    "level": "intermediate",
    "options": [
      "\"Shyamnagar, Barrackpore\"",
      "\"Shyamnagar, Shyamnagar\"",
      "\"Barrackpore, Shyamnagar\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "All occurrences replaced"
  },
  {
    "id": 13,
    "question": "What does \"ab.cd.ef\".replace('.', '/') return?",
    "shortAnswer": "\"ab/cd/ef\"",
    "explanation": "Replaces dots with forward slashes.",
    "hint": "Dot replacement",
    "level": "basic",
    "options": [
      "\"ab/cd/ef\"",
      "\"abcdef\"",
      "\"ab.cd.ef\"",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"ab/cd/ef\""
  },
  {
    "id": 14,
    "question": "How does replace() differ from replaceAll() in class String?",
    "shortAnswer": "replace() treats target as literal text; replaceAll() treats target as a regular expression regex.",
    "explanation": "replace() is literal; replaceAll() uses regex.",
    "hint": "Literal vs regular expression",
    "level": "advanced",
    "options": [
      "No difference",
      "replace() is literal; replaceAll() takes regex",
      "replace() replaces first; replaceAll() replaces all",
      "replace() is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "replace() literal vs replaceAll() regex"
  },
  {
    "id": 15,
    "question": "Why does \"file.txt\".replaceAll(\".\", \"x\") replace all characters instead of just the dot?",
    "shortAnswer": "Because '.' in regex matches any character; replaceAll interprets '.' as a regex wildcard.",
    "explanation": "Regex wildcard matching.",
    "hint": "Regex dot trap",
    "level": "advanced",
    "options": [
      "Bug in Java",
      "In regex '.' matches any character",
      "BlueJ compiler bug",
      "String is corrupt"
    ],
    "correctAnswer": 1,
    "codeExample": "Regex dot matches any character"
  },
  {
    "id": 16,
    "question": "What is the output of: \"1+1=2\".replace('+', '-')?",
    "shortAnswer": "\"1-1=2\"",
    "explanation": "Literal char '+' replaced by '-'.",
    "hint": "Operator character replacement",
    "level": "basic",
    "options": [
      "\"1-1=2\"",
      "\"1+1=2\"",
      "\"2=2\"",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"1-1=2\""
  },
  {
    "id": 17,
    "question": "What does \"\".replace('a', 'b') return?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "Empty string remains empty string.",
    "hint": "Empty string check",
    "level": "basic",
    "options": [
      "\"\"",
      "null",
      "-1",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"\".replace('a', 'b') = \"\""
  },
  {
    "id": 18,
    "question": "What is the output of: \"hello world\".replace(' ', '_')?",
    "shortAnswer": "\"hello_world\"",
    "explanation": "Space replaced by underscore.",
    "hint": "Space to underscore",
    "level": "basic",
    "options": [
      "\"hello_world\"",
      "\"helloworld\"",
      "\"hello world\"",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"hello_world\""
  },
  {
    "id": 19,
    "question": "What happens if target is null in replace(target, replacement)?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Null arguments are not allowed.",
    "hint": "Null argument exception",
    "level": "intermediate",
    "options": [
      "Returns original string",
      "Throws NullPointerException",
      "Replaces with \"null\"",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "NullPointerException"
  },
  {
    "id": 20,
    "question": "What is the output of: \"AAA\".replace(\"AA\", \"B\")?",
    "shortAnswer": "\"BA\"",
    "explanation": "First \"AA\" at indices 0-1 replaced with \"B\"; remaining 'A' at index 2 stays.",
    "hint": "Non-overlapping replacement",
    "level": "advanced",
    "options": [
      "\"B\"",
      "\"BA\"",
      "\"BB\"",
      "\"AB\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"BA\" (non-overlapping)"
  },
  {
    "id": 21,
    "question": "How can you replace all vowels in a sentence with asterisks in ICSE?",
    "shortAnswer": "Loop through vowels or chain replace(): s.replace('a','*').replace('e','*')...",
    "explanation": "Chained replace calls for each vowel.",
    "hint": "Vowel masking pattern",
    "level": "intermediate",
    "options": [
      "s.replaceVowels('*')",
      "Chain replace() or loop with char check",
      "s.mask()",
      "s.trim()"
    ],
    "correctAnswer": 1,
    "codeExample": "Chaining replace for vowels"
  },
  {
    "id": 22,
    "question": "What is the output of: \"abracadabra\".replace('a', 'o')?",
    "shortAnswer": "\"obrocodobro\"",
    "explanation": "All 5 occurrences of 'a' become 'o'.",
    "hint": "All 'a' to 'o'",
    "level": "basic",
    "options": [
      "\"obrocadabra\"",
      "\"obrocodobro\"",
      "\"abracadabra\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"obrocodobro\""
  },
  {
    "id": 23,
    "question": "What does \"Java\".replace('J', 'J') return?",
    "shortAnswer": "\"Java\" (same reference)",
    "explanation": "Identical character replacement optimizes reference return.",
    "hint": "Identical replacement",
    "level": "basic",
    "options": [
      "\"Java\"",
      "\"ava\"",
      "null",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Java\""
  },
  {
    "id": 24,
    "question": "What is the output of: \"A B C\".replace(\" \", \"-\").length()?",
    "shortAnswer": "5",
    "explanation": "\"A-B-C\" has length 5.",
    "hint": "Length after replacement",
    "level": "basic",
    "options": [
      "3",
      "5",
      "6",
      "4"
    ],
    "correctAnswer": 1,
    "codeExample": "\"A-B-C\".length() = 5"
  },
  {
    "id": 25,
    "question": "In ICSE Board examination solutions, when is replace() most useful?",
    "shortAnswer": "In word substitution, vowel masking, and removing punctuation or spaces.",
    "explanation": "String sanitization and game logic.",
    "hint": "Practical exam use cases",
    "level": "basic",
    "options": [
      "Only in loops",
      "In word substitution, vowel encryption, and space removal",
      "For math calculations",
      "For sorting arrays"
    ],
    "correctAnswer": 1,
    "codeExample": "Word substitution and sanitization"
  }
];

export default questions;
