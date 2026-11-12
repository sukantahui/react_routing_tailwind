/**
 * Questions & Self-Assessment for Topic 0: Introduction to Strings in Java
 * Target: ICSE Class X Computer Applications (Java)
 * Coder & AccoTax - Sukanta Hui
 */

const questions = [
  {
    id: 1,
    question: "What is a String in Java, and is it a primitive data type?",
    shortAnswer: "No, a String in Java is NOT a primitive data type; it is a class and reference data type.",
    explanation: "In Java, String is a predefined class residing in the java.lang package. Variables of type String hold memory references pointing to String objects allocated on the Heap, unlike primitive types (int, char, float) which store raw binary values directly on the stack.",
    hint: "Recall that primitive types in Java begin with lowercase letters (int, char), whereas String starts with a capital 'S'.",
    level: "basic",
    options: [
      "A primitive data type like char or int",
      "A reference data type and an instance of java.lang.String",
      "A special dynamic array of float values",
      "A hardware register inside the JVM"
    ],
    correctAnswer: 1,
    codeExample: "String student = \"Swadeep\"; // 'student' is a reference variable pointing to a String object"
  },
  {
    id: 2,
    question: "In which Java standard package is the String class located, and why don't we need to import it?",
    shortAnswer: "It is in java.lang, which is imported automatically by the Java compiler into every compilation unit.",
    explanation: "The java.lang package provides core classes fundamental to the design of the Java programming language. The compiler automatically imports java.lang.* into all Java source files, so no explicit import statement is required.",
    hint: "This package also contains System, Math, and Object.",
    level: "basic",
    options: [
      "java.util (imported manually via import java.util.*)",
      "java.io (used for input/output streams)",
      "java.lang (automatically imported by JVM)",
      "java.text (used for date formatting)"
    ],
    correctAnswer: 2,
    codeExample: "// No 'import java.lang.String;' needed!\nString city = \"Barrackpore\";"
  },
  {
    id: 3,
    question: "What is the critical difference between the character literal 'A' and the string literal \"A\" in Java?",
    shortAnswer: "'A' is a 16-bit primitive character, whereas \"A\" is an object of type String containing one character.",
    explanation: "'A' uses single quotes and is of primitive type char requiring 2 bytes of memory. \"A\" uses double quotes and is an instance of java.lang.String which carries object overhead (header, reference pointer, char array, hash code caching).",
    hint: "Single quotes = primitive char; double quotes = String object.",
    level: "basic",
    options: [
      "They are identical and can be used interchangeably",
      "'A' is a 2-byte primitive char; \"A\" is a full-fledged String object",
      "'A' is an object; \"A\" is a primitive literal",
      "\"A\" cannot be stored in variables, only printed"
    ],
    correctAnswer: 1,
    codeExample: "char ch = 'A';       // 2 bytes primitive\nString str = \"A\";   // String object reference"
  },
  {
    id: 4,
    question: "How are character indices numbered in a Java String?",
    shortAnswer: "Strings in Java are 0-indexed, meaning the first character is at index 0 and the last is at index (length - 1).",
    explanation: "Java follows zero-based indexing for all contiguous indexed sequences including arrays and Strings. If a String has 9 characters, its valid indices are 0, 1, 2, 3, 4, 5, 6, 7, 8.",
    hint: "Index count starts at zero, not one.",
    level: "basic",
    options: [
      "1 to length",
      "0 to (length - 1)",
      "-1 to length",
      "Arbitrary indices assigned by OS"
    ],
    correctAnswer: 1,
    codeExample: "String s = \"ICSE\";\n// Index 0: 'I', Index 1: 'C', Index 2: 'S', Index 3: 'E'"
  },
  {
    id: 5,
    question: "What runtime exception occurs if you access an invalid index in a String?",
    shortAnswer: "java.lang.StringIndexOutOfBoundsException is thrown.",
    explanation: "Whenever you invoke charAt(index) or substring() with an index < 0 or >= length(), Java verifies array bounds and immediately throws StringIndexOutOfBoundsException (which inherits from IndexOutOfBoundsException).",
    hint: "Look for 'IndexOutOfBounds' with 'String' prefix.",
    level: "basic",
    options: [
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "StringIndexOutOfBoundsException",
      "IllegalArgumentException"
    ],
    correctAnswer: 2,
    codeExample: "String town = \"Naihati\"; // length = 7\n// char c = town.charAt(7); // Throws StringIndexOutOfBoundsException"
  },
  {
    id: 6,
    question: "How do you obtain the total number of characters in a String object?",
    shortAnswer: "By invoking the method str.length() with parentheses.",
    explanation: "For String objects, length is a method defined in the String class: public int length(). For arrays, length is a built-in property (arr.length) without parentheses. This is a very common ICSE board exam trick question.",
    hint: "Strings use the length() method; arrays use the length variable.",
    level: "basic",
    options: [
      "str.length (without parentheses)",
      "str.length() (with parentheses)",
      "str.size()",
      "str.count()"
    ],
    correctAnswer: 1,
    codeExample: "String s = \"Shyamnagar\";\nint len = s.length(); // len = 10"
  },
  {
    id: 7,
    question: "What is the return type of the length() method in java.lang.String?",
    shortAnswer: "int (32-bit signed integer).",
    explanation: "The prototype of the length method is: public int length(). It returns an int indicating the number of 16-bit Unicode characters present in the string sequence.",
    hint: "It returns an integer count.",
    level: "basic",
    options: [
      "long",
      "short",
      "int",
      "double"
    ],
    correctAnswer: 2,
    codeExample: "int n = \"Barrackpore\".length();"
  },
  {
    id: 8,
    question: "What encoding standard is used internally by Java to represent characters in a String?",
    shortAnswer: "16-bit Unicode (UTF-16 code units).",
    explanation: "Java character system is built upon 16-bit Unicode, allowing it to represent characters and alphabets from nearly all world languages (English, Bengali, Devanagari, Greek, Kanji, symbols).",
    hint: "Allows international character representation in 2 bytes.",
    level: "intermediate",
    options: [
      "7-bit pure ASCII only",
      "8-bit Latin-1 only",
      "16-bit Unicode (UTF-16)",
      "32-bit EBCDIC"
    ],
    correctAnswer: 2,
    codeExample: "String bengali = \"স্বাগতম\"; // Fully supported by Java 16-bit Unicode"
  },
  {
    id: 9,
    question: "What does the method charAt(int index) return?",
    shortAnswer: "It returns the primitive char value at the specified index position.",
    explanation: "The method prototype is: public char charAt(int index). It retrieves the character located at the specified 0-based offset.",
    hint: "It returns a single character.",
    level: "basic",
    options: [
      "A String of length 1",
      "A primitive char value",
      "The ASCII integer code of the character",
      "A byte value"
    ],
    correctAnswer: 1,
    codeExample: "char ch = \"Ichapur\".charAt(0); // ch = 'I'"
  },
  {
    id: 10,
    question: "What is the result of the expression: \"Sukanta\".charAt(2)?",
    shortAnswer: "'k'",
    explanation: "Indices of \"Sukanta\" are: 0 -> 'S', 1 -> 'u', 2 -> 'k', 3 -> 'a', 4 -> 'n', 5 -> 't', 6 -> 'a'. Hence charAt(2) yields 'k'.",
    hint: "Count starting from 0: S(0), u(1), k(2).",
    level: "basic",
    options: [
      "'S'",
      "'u'",
      "'k'",
      "'a'"
    ],
    correctAnswer: 2,
    codeExample: "char letter = \"Sukanta\".charAt(2); // 'k'"
  },
  {
    id: 11,
    question: "What is an empty String in Java?",
    shortAnswer: "A String object containing zero characters (\"\") whose length() is 0.",
    explanation: "An empty string is an allocated, valid String instance that contains no characters: \"\". Its length is 0. It is NOT null; invoking methods on \"\" is completely safe and does not throw NullPointerException.",
    hint: "Difference between having an empty wallet vs having no wallet at all.",
    level: "intermediate",
    options: [
      "A string whose reference is null",
      "A string containing a single whitespace \" \"",
      "A valid String object with zero characters and length() == 0",
      "An uninitialized string variable"
    ],
    correctAnswer: 2,
    codeExample: "String s = \"\";\nSystem.out.println(s.length()); // 0\nSystem.out.println(s.isEmpty()); // true"
  },
  {
    id: 12,
    question: "What is the difference between an empty string (\"\") and a null string reference?",
    shortAnswer: "\"\" is an object with length 0; null means the reference points to no object in memory.",
    explanation: "When String s = \"\", memory is allocated for a String object on Heap and calling s.length() returns 0. When String s = null, no object exists in Heap; calling s.length() triggers java.lang.NullPointerException.",
    hint: "null has no object to invoke methods on.",
    level: "intermediate",
    options: [
      "There is no difference in Java",
      "\"\" has allocated memory and methods can be called; null points nowhere and calling methods throws NullPointerException",
      "null has length 0; \"\" has length -1",
      "\"\" can only be created with 'new' keyword"
    ],
    correctAnswer: 1,
    codeExample: "String s1 = \"\";     s1.length(); // OK -> 0\nString s2 = null;   s2.length(); // Throws NullPointerException"
  },
  {
    id: 13,
    question: "Can primitive data types in Java be assigned directly to a String reference variable?",
    shortAnswer: "No, a primitive like int or char cannot be directly assigned to a String variable without conversion.",
    explanation: "Java is strongly typed. Writing String s = 100; or String s = 'A'; will cause a compile-time error: 'incompatible types: int cannot be converted to java.lang.String'. You must use String.valueOf(100), Integer.toString(100), or \"\" + 100.",
    hint: "String is an object reference type, not a numeric primitive.",
    level: "intermediate",
    options: [
      "Yes, Java automatically converts all primitives implicitly on assignment",
      "No, explicit conversion via String.valueOf() or concatenation is required",
      "Only boolean values can be assigned directly",
      "Only floating-point numbers can be assigned directly"
    ],
    correctAnswer: 1,
    codeExample: "// String s = 100; // Compile Error!\nString s = String.valueOf(100); // Valid"
  },
  {
    id: 14,
    question: "What is the output of: System.out.println(\"Java\" + 10 + 20);?",
    shortAnswer: "\"Java1020\"",
    explanation: "Evaluation proceeds from left to right. \"Java\" + 10 performs String concatenation yielding \"Java10\". Then \"Java10\" + 20 performs another string concatenation resulting in \"Java1020\".",
    hint: "Left-to-right evaluation promotes numbers to Strings once a String is encountered.",
    level: "intermediate",
    options: [
      "Java30",
      "Java1020",
      "Error: cannot add integer to string",
      "Java 30"
    ],
    correctAnswer: 1,
    codeExample: "System.out.println(\"Java\" + 10 + 20);   // \"Java1020\"\nSystem.out.println(\"Java\" + (10 + 20)); // \"Java30\""
  },
  {
    id: 15,
    question: "What is the output of: System.out.println(10 + 20 + \"Java\");?",
    shortAnswer: "\"30Java\"",
    explanation: "Evaluation starts left-to-right: 10 + 20 are both integers, so numeric addition is performed first giving 30. Then 30 + \"Java\" converts 30 to a string and concatenates, producing \"30Java\".",
    hint: "Arithmetic happens first before encountering the string literal.",
    level: "intermediate",
    options: [
      "1020Java",
      "30Java",
      "Java30",
      "Compile-time error"
    ],
    correctAnswer: 1,
    codeExample: "System.out.println(10 + 20 + \"Java\"); // \"30Java\""
  },
  {
    id: 16,
    question: "Why are Strings in Java designed to be immutable?",
    shortAnswer: "For security, caching in the String Constant Pool, thread-safety, and stable hash code generation.",
    explanation: "Immutability ensures that once a String object is created, its character array cannot be altered. This prevents security exploits (e.g. changing database connection URLs or usernames in flight), allows safe sharing of string literals in the SCP, and ensures thread safety across concurrent execution.",
    hint: "Immutable means cannot be modified after creation.",
    level: "advanced",
    options: [
      "To save disk space on the computer hard drive",
      "For security, String Constant Pool caching, thread safety, and HashCode stability",
      "Because the Java virtual machine cannot resize heap memory",
      "Because characters in Java are 8-bit"
    ],
    correctAnswer: 1,
    codeExample: "String s = \"Barrackpore\";\ns.toUpperCase(); // Creates a new string, does NOT change 's'\nSystem.out.println(s); // Still prints \"Barrackpore\""
  },
  {
    id: 17,
    question: "What happens to the original object when you execute: String s = \"Hello\"; s = s + \" World\";?",
    shortAnswer: "A new String object \"Hello World\" is created on the Heap, and 's' points to it. The original \"Hello\" remains unchanged.",
    explanation: "Because Strings are immutable, \"Hello\" cannot be expanded in place. The JVM allocates a brand new String object containing \"Hello World\" and reassigns reference variable 's' to this new address. The original \"Hello\" remains in memory (SCP/Heap).",
    hint: "Reassignment changes what 's' points to, not the original object.",
    level: "advanced",
    options: [
      "The \"Hello\" object in memory is expanded to add \" World\"",
      "A new String object \"Hello World\" is created, and 's' points to the new object",
      "Both objects merge into a single primitive char array",
      "A compile-time error occurs"
    ],
    correctAnswer: 1,
    codeExample: "String s = \"Hello\";\ns = s + \" World\"; // New object allocated!"
  },
  {
    id: 18,
    question: "Which of the following creates a String object using a character array?",
    shortAnswer: "char[] ch = {'J', 'a', 'v', 'a'}; String s = new String(ch);",
    explanation: "The java.lang.String class provides overloaded constructors, one of which accepts a char[] array: public String(char[] value). This copies the elements of the character array into a new immutable String.",
    hint: "Use new String() passing the char array as argument.",
    level: "intermediate",
    options: [
      "String s = (String) ch;",
      "String s = new String(ch);",
      "String s = ch.toString();",
      "String s = ch.toSentence();"
    ],
    correctAnswer: 1,
    codeExample: "char[] letters = {'C', 'o', 'd', 'e', 'r'};\nString brand = new String(letters); // \"Coder\""
  },
  {
    id: 19,
    question: "What does the method isEmpty() do in java.lang.String?",
    shortAnswer: "It returns true if length() is 0, and false otherwise.",
    explanation: "The prototype is: public boolean isEmpty(). It checks whether the string has a length of zero (i.e. this.length() == 0).",
    hint: "Checks if the string contains zero characters.",
    level: "basic",
    options: [
      "Checks if the string reference is null",
      "Checks if length() == 0",
      "Checks if the string contains only spaces",
      "Deletes all characters from the string"
    ],
    correctAnswer: 1,
    codeExample: "\"Abhronila\".isEmpty(); // false\n\"\".isEmpty();          // true"
  },
  {
    id: 20,
    question: "How do escape sequences such as \\n and \\t affect the length() of a String?",
    shortAnswer: "Each valid escape sequence represents a single 16-bit character, so each adds exactly 1 to length().",
    explanation: "Escape sequences like \\n (newline) or \\t (horizontal tab) are parsed by the compiler as single Unicode characters (\\n has ASCII 10, \\t has ASCII 9). Therefore, \"A\\nB\" has 3 characters: 'A', '\\n', and 'B'.",
    hint: "A backslash escape pair represents one single character.",
    level: "intermediate",
    options: [
      "They add 2 to the length because there are two typed symbols",
      "They add 1 to the length because each escape sequence evaluates to one char",
      "They are ignored and add 0 to the length",
      "They cause an InvalidCharacterException"
    ],
    correctAnswer: 1,
    codeExample: "String s = \"A\\tB\";\nSystem.out.println(s.length()); // Output: 3"
  },
  {
    id: 21,
    question: "In real-life school administration software, why is input sanitization (like trim()) required for student names?",
    shortAnswer: "To prevent accidental leading and trailing whitespace from corrupting database lookups and searches.",
    explanation: "Users frequently hit spacebar before or after entering their names on online admission forms. For example, ' Tuhina ' vs 'Tuhina'. If stored directly, searching for 'Tuhina' will fail equality checks. Cleaning with trim() standardizes input.",
    hint: "Removes extra whitespace before comparisons.",
    level: "intermediate",
    options: [
      "To convert letters to binary numbers",
      "To eliminate accidental spaces before/after text that cause database mismatch",
      "To encrypt student passwords",
      "To compile the source code into bytecode"
    ],
    correctAnswer: 1,
    codeExample: "String raw = \"  Tuhina Roy  \";\nString clean = raw.trim(); // \"Tuhina Roy\""
  },
  {
    id: 22,
    question: "What is the ASCII value of character 'A' and character 'a'?",
    shortAnswer: "'A' is 65, and 'a' is 97 (difference of 32).",
    explanation: "In ASCII / Unicode: Uppercase letters 'A' to 'Z' span 65 to 90. Lowercase letters 'a' to 'z' span 97 to 122. Digits '0' to '9' span 48 to 57. The difference between any uppercase letter and its lowercase counterpart is exactly 32 ('a' - 'A' = 97 - 65 = 32).",
    hint: "Capital 'A' is 65; lowercase 'a' is 97.",
    level: "basic",
    options: [
      "'A' = 97, 'a' = 65",
      "'A' = 65, 'a' = 97",
      "'A' = 48, 'a' = 58",
      "'A' = 1, 'a' = 26"
    ],
    correctAnswer: 1,
    codeExample: "System.out.println((int)'A'); // 65\nSystem.out.println((int)'a'); // 97"
  },
  {
    id: 23,
    question: "What happens if you print a String variable whose value is null?",
    shortAnswer: "System.out.println prints the four-letter text \"null\" without throwing an exception.",
    explanation: "PrintStream.print(String s) handles null gracefully by converting null into the literal string \"null\" via String.valueOf(null). It does NOT throw NullPointerException when passed directly to println.",
    hint: "println has internal null-safety checks.",
    level: "advanced",
    options: [
      "It throws a NullPointerException immediately",
      "It prints nothing and halts program execution",
      "It prints the text \"null\"",
      "It prints memory address 0x0000"
    ],
    correctAnswer: 2,
    codeExample: "String s = null;\nSystem.out.println(s); // Prints: null"
  },
  {
    id: 24,
    question: "Which of the following is NOT a method of the java.lang.String class?",
    shortAnswer: "reverse() is NOT a method of java.lang.String.",
    explanation: "Because String objects are immutable, java.lang.String does not have an in-place reverse() method. To reverse a string, programmers must use a manual loop or convert to StringBuilder / StringBuffer which provide reverse().",
    hint: "String is immutable, so it cannot reverse itself in-place.",
    level: "advanced",
    options: [
      "charAt(int index)",
      "length()",
      "reverse()",
      "toUpperCase()"
    ],
    correctAnswer: 2,
    codeExample: "// \"Java\".reverse(); // Compile error: method reverse() does not exist in String!"
  },
  {
    id: 25,
    question: "Why should ICSE students NEVER use 'char ch = str[0];' to read characters from a String?",
    shortAnswer: "Because square brackets [] are exclusively for arrays; Strings require str.charAt(0).",
    explanation: "In C and C++, strings are null-terminated char arrays where str[0] is valid. In Java, String is an encapsulated object, not an array of primitives. Index access is exclusively exposed via public char charAt(int index). Using [] on a String causes compile error: 'array required, but String found'.",
    hint: "Square bracket indexing only works on true arrays, not String objects.",
    level: "expert",
    options: [
      "Because [] is deprecated in modern Java",
      "Because String is a class and requires the charAt() method; [] only works on arrays",
      "Because [] returns an int instead of a char",
      "Because [] deletes the character at that index"
    ],
    correctAnswer: 1,
    codeExample: "String name = \"Debangshu\";\n// char c = name[0]; // ERROR: array required, but String found\nchar c = name.charAt(0); // CORRECT"
  },
  {
    id: 26,
    question: "What is the result of evaluating: \"Barrackpore\".length() == 11?",
    shortAnswer: "true",
    explanation: "Characters in \"Barrackpore\" are B-a-r-r-a-c-k-p-o-r-e (11 characters total). Calling .length() returns 11. 11 == 11 evaluates to boolean true.",
    hint: "Count each letter: B(1), a(2), r(3), r(4), a(5), c(6), k(7), p(8), o(9), r(10), e(11).",
    level: "basic",
    options: [
      "false",
      "true",
      "Compilation error",
      "StringIndexOutOfBoundsException"
    ],
    correctAnswer: 1,
    codeExample: "boolean match = \"Barrackpore\".length() == 11; // true"
  }
];

export default questions;
