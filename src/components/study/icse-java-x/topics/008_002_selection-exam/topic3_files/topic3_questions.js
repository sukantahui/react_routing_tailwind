const questions = [
  {
    "question": "What are the official CISCE rules regarding pen color and answer script presentation?",
    "shortAnswer": "Candidates must use either blue or black ballpoint or fountain pen for writing answers. Pencil may only be used for drawing diagrams, tables, and underlines.",
    "explanation": "Do not use red or green ink under any circumstances (those are reserved for examiners and moderators). Write with a consistent shade of blue or black. Use a 2B or HB pencil with a clear ruler to draw box borders for tables, especially the Variable Description Table.",
    "hint": "Carry at least 3 identical blue or black pens into the examination hall.",
    "level": "basic",
    "codeExample": "// Allowed: Blue / Black ink for text; Pencil for VDT borders & diagrams"
  },
  {
    "question": "How should question numbers and sections be marked on the ICSE answer script?",
    "shortAnswer": "Write the Section heading prominently in the center (e.g. 'SECTION A' or 'SECTION B'). Write the question number clearly in the left margin and center (e.g. 'Question 3').",
    "explanation": "Never write question numbers inside your code or squeeze them into margins. Leave 2 blank lines between sub-questions in Question 1 and Question 2. If answering Section B, begin each 15-mark program on a fresh new page.",
    "hint": "Starting each Section B program on a fresh page makes reading effortless for the examiner.",
    "level": "basic",
    "codeExample": "// SECTION B\n// Question 3\npublic class ElectricBill { ... }"
  },
  {
    "question": "Why does `(5 / 9) * (f - 32)` always evaluate to `0.0` in Java?",
    "shortAnswer": "Because both 5 and 9 are integer literals. Integer division truncates the decimal part, giving 0. Then `0 * (f - 32)` is always 0.0.",
    "explanation": "In Java, binary arithmetic on two integers produces an integer. `5 / 9` produces `0`. To fix this, write `(5.0 / 9)` or `(5 / 9.0)` or `((double) 5 / 9)` so the compiler performs floating-point division (`0.5555...`).",
    "hint": "Always include `.0` in division constants for physics and math formulas.",
    "level": "basic",
    "codeExample": "double c = (5.0 / 9) * (f - 32); // Correct"
  },
  {
    "question": "Why does `s1 == s2` fail when comparing strings accepted from `sc.nextLine()`?",
    "shortAnswer": "`==` compares the memory addresses (references) of the two string objects on the heap, not their character contents.",
    "explanation": "User input strings created at runtime are stored in distinct heap memory locations even if they contain the exact same characters. Always use `s1.equals(s2)` or `s1.equalsIgnoreCase(s2)` to compare string contents.",
    "hint": "Never use `==` for String comparison in ICSE Java.",
    "level": "basic",
    "codeExample": "if (s1.equals(s2)) { ... } // Correct\nif (s1 == s2) { ... }      // WRONG"
  },
  {
    "question": "What is the return data type of `Math.ceil(x)` and `Math.floor(x)`?",
    "shortAnswer": "Both `Math.ceil(x)` and `Math.floor(x)` return a primitive `double`, NOT an `int`.",
    "explanation": "Even though `Math.ceil(4.2)` mathematically represents 5, in Java it returns the double value `5.0`. Writing `int ans = Math.ceil(4.2);` causes a compilation error (possible loss of precision). In Section A, writing `5` instead of `5.0` loses 1 mark.",
    "hint": "Always include the decimal point: `5.0`, `-4.0`.",
    "level": "intermediate",
    "codeExample": "double r1 = Math.ceil(4.2);  // 5.0\ndouble r2 = Math.floor(4.8); // 4.0"
  },
  {
    "question": "What is the return data type of `Math.round(x)`?",
    "shortAnswer": "`Math.round(double a)` returns a `long`; `Math.round(float a)` returns an `int`.",
    "explanation": "Unlike ceil and floor, `Math.round()` returns an integral type: a 64-bit `long` when passed a `double`, or a 32-bit `int` when passed a `float`. For `Math.round(4.8)`, the result is `5` (an integer), not `5.0`.",
    "hint": "`round` returns integer; `ceil` & `floor` return double.",
    "level": "intermediate",
    "codeExample": "long ans = Math.round(4.8); // 5 (type: long)"
  },
  {
    "question": "What happens if you omit the `break` statement in a `switch-case` block?",
    "shortAnswer": "Execution falls through and continues executing subsequent case blocks until a `break` is encountered or the switch block ends.",
    "explanation": "This is called 'fall-through'. In ICSE Section A snippets, examiners frequently omit `break` on purpose to test if candidates notice that subsequent cases execute and overwrite output variables.",
    "hint": "Carefully trace every case when `break;` is absent.",
    "level": "intermediate",
    "codeExample": "switch(ch) {\n    case 1: x += 10; // no break!\n    case 2: x += 20; break;\n}"
  },
  {
    "question": "How do you distinguish `arr.length` from `str.length()`?",
    "shortAnswer": "`arr.length` is a public final instance variable (property) of an array (no parentheses), while `str.length()` is a member method of the String class (requires parentheses).",
    "explanation": "Writing `arr.length()` on an array or `str.length` on a String produces a compilation error. Examiners frequently ask this difference in Question 2 short answer questions.",
    "hint": "Arrays are built-in language structures (field); Strings are objects of a class (method).",
    "level": "basic",
    "codeExample": "int aLen = arr.length;   // No ()\nint sLen = str.length(); // Has ()"
  },
  {
    "question": "What is the consequence of modifying the original number during digit extraction loops?",
    "shortAnswer": "The original number variable becomes `0` at loop termination, making it impossible to check if the sum/property equals the original number.",
    "explanation": "In `while(num > 0) { sum += num % 10; num /= 10; }`, `num` becomes 0! If you later test `if (sum == num)`, it compares against 0. Always store a copy in a temporary variable: `int temp = num;`.",
    "hint": "Always write: `int temp = num;` before the while loop.",
    "level": "basic",
    "codeExample": "int temp = num;\nwhile(temp > 0) { ... temp /= 10; }\nif (sum == num) // Safe!"
  },
  {
    "question": "How should mistakes in code be corrected on the ICSE answer booklet?",
    "shortAnswer": "Draw a single, clean diagonal strike with a pencil or pen through the wrong line, and write the corrected code clearly next to or below it.",
    "explanation": "Never use correction fluid (whitener) - it is strictly banned in board examinations. Never create dense black scribbles. A single neat horizontal or diagonal line through erroneous code is the only accepted method.",
    "hint": "Neat strike-through preserves the tidy appearance of your script.",
    "level": "basic",
    "codeExample": "// Draw one single clean line through erroneous code."
  },
  {
    "question": "What is the difference between prefix and postfix increment in expression evaluation?",
    "shortAnswer": "Prefix (`++x`) increments the variable first, then evaluates to the new value. Postfix (`x++`) evaluates to the current value first, then increments the variable.",
    "explanation": "In `int p = 5; int q = p++ + ++p;`: `p++` uses 5 (then p becomes 6); `++p` increments p to 7 and uses 7. `q = 5 + 7 = 12`. Always write down step-by-step intermediate values in rough space.",
    "hint": "Pre = change BEFORE use; Post = change AFTER use.",
    "level": "intermediate",
    "codeExample": "int x = 5;\nint a = ++x; // x=6, a=6\nint b = x++; // b=6, x=7"
  },
  {
    "question": "Why should `Scanner` be imported and instantiated inside `main()` or member methods?",
    "shortAnswer": "Because `Scanner` is located in package `java.util`. Without `import java.util.Scanner;`, the compiler throws 'cannot find symbol class Scanner'.",
    "explanation": "Always write `import java.util.Scanner;` as the very first line above your class declaration in Section B programs. Inside the method, create `Scanner sc = new Scanner(System.in);`.",
    "hint": "First line of every ICSE Section B program: `import java.util.Scanner;`.",
    "level": "basic",
    "codeExample": "import java.util.Scanner;\npublic class MyClass { ... }"
  },
  {
    "question": "What is the difference between `print()` and `println()`?",
    "shortAnswer": "`print()` displays the output and keeps the cursor on the same line; `println()` displays the output and moves the cursor to the beginning of the next line.",
    "explanation": "Crucial for pattern printing (e.g. printing matrices or asterisk triangles): use `System.out.print()` inside the inner column loop, and `System.out.println()` after the inner loop to start a new row.",
    "hint": "Pattern programs require combining both `print` and `println`.",
    "level": "basic",
    "codeExample": "for(int i=0; i<3; i++) {\n    for(int j=0; j<3; j++) System.out.print(\"*\");\n    System.out.println();\n}"
  },
  {
    "question": "What is the difference between `compareTo()` and `compareToIgnoreCase()`?",
    "shortAnswer": "`compareTo()` is case-sensitive and compares characters based on their exact ASCII/Unicode values; `compareToIgnoreCase()` ignores uppercase/lowercase differences.",
    "explanation": "\"A\".compareTo(\"a\") returns `65 - 97 = -32`. \"A\".compareToIgnoreCase(\"a\") returns `0`. Examiners test this distinction in Section A MCQs and output snippets.",
    "hint": "'A' is 65; 'a' is 97. Difference is always 32.",
    "level": "intermediate",
    "codeExample": "\"CAT\".compareTo(\"cat\")           // -32\n\"CAT\".compareToIgnoreCase(\"cat\") // 0"
  },
  {
    "question": "How does `substring(beginIndex, endIndex)` work when `beginIndex == endIndex`?",
    "shortAnswer": "It returns an empty string `\"\"` with length 0.",
    "explanation": "The second parameter is exclusive. If both indices are identical (e.g. `\"JAVA\".substring(2, 2)`), zero characters are extracted and the result is `\"\"`. If `beginIndex > endIndex`, a `StringIndexOutOfBoundsException` is thrown.",
    "hint": "Length of result is always `endIndex - beginIndex`.",
    "level": "intermediate",
    "codeExample": "String empty = \"COMPUTER\".substring(3, 3); // \"\""
  },
  {
    "question": "What is an Escape Sequence and what are the most common ones in ICSE?",
    "shortAnswer": "An escape sequence is a character combination consisting of a backslash (`\\`) followed by a letter or symbol that represents non-printable or special characters.",
    "explanation": "Top ICSE escape sequences:\n- `\\n` : Newline\n- `\\t` : Horizontal Tab (moves cursor to next tab stop)\n- `\\\\` : Backslash character\n- `\\\"` : Double quote character\n- `\\'` : Single quote character",
    "hint": "Useful for output prediction questions containing escape characters.",
    "level": "basic",
    "codeExample": "System.out.println(\"Hello\\tWorld\\nDone\");"
  },
  {
    "question": "Can an abstract method have a body `{}` in Java?",
    "shortAnswer": "NO. An abstract method has only a declaration and signature ending with a semicolon, but NO body `{}`.",
    "explanation": "Syntax: `abstract void calculate();`. The implementation must be provided by the inheriting subclass. ICSE questions frequently ask students to identify invalid syntax like `abstract void show() {}`.",
    "hint": "Abstract methods end with semicolon `;`, never `{}`.",
    "level": "intermediate",
    "codeExample": "abstract void display(); // Correct\nabstract void show() {}  // Syntax Error!"
  },
  {
    "question": "What is the difference between a Class and an Object in ICSE theory?",
    "shortAnswer": "A class is a blueprint, template, or user-defined data type that defines attributes and behaviors; an object is an identifiable entity, an instance of a class with state and behavior.",
    "explanation": "Key contrasts:\n1. Class is an abstraction / logical entity; Object is a physical reality / memory allocated entity.\n2. Class definition does not allocate memory for instance variables; Object instantiation (`new`) allocates memory on the heap.\n3. One class can produce multiple distinct objects.",
    "hint": "Class = Blueprint of a building; Object = The actual constructed building.",
    "level": "basic",
    "codeExample": "Dog d1 = new Dog(); // Dog = Class; d1 = Object"
  },
  {
    "question": "What is the difference between static and non-static methods?",
    "shortAnswer": "Static methods belong to the class itself and can be invoked without creating an object; non-static methods belong to an object and require an instantiated object to be called.",
    "explanation": "Static methods (e.g. `Math.sqrt()`, `Character.isDigit()`) cannot access non-static instance variables directly. Non-static methods (e.g. `str.substring()`) operate on the specific object's instance fields.",
    "hint": "Static methods use ClassName.methodName().",
    "level": "intermediate",
    "codeExample": "Math.pow(2, 3); // Static\nstr.length();   // Non-static"
  },
  {
    "question": "Why should `sc.close()` be included at the end of `main()`?",
    "shortAnswer": "`sc.close()` closes the underlying input stream, freeing system resources and demonstrating professional coding standards.",
    "explanation": "While omitting `sc.close()` usually does not result in a mark deduction in ICSE, writing it signals complete mastery of Java resource management to the examiner.",
    "hint": "Place `sc.close();` as the very last statement inside `main()`.",
    "level": "basic",
    "codeExample": "sc.close(); // Clean resource release"
  },
  {
    "question": "What is the difference between an Exception and an Error in Java?",
    "shortAnswer": "An Exception represents conditions that a reasonable application might want to catch and recover from; an Error represents serious problems (like OutOfMemoryError) that should not be caught.",
    "explanation": "Exceptions include `ArrayIndexOutOfBoundsException`, `NullPointerException`, `NumberFormatException`. Both inherit from `Throwable`.",
    "hint": "Exceptions are recoverable; Errors are fatal system crashes.",
    "level": "advanced",
    "codeExample": "// Exception: User input error\n// Error: JVM memory depletion"
  },
  {
    "question": "How should you write answers to Question 1 MCQs in your answer script?",
    "shortAnswer": "Write the sub-part number, the correct option letter, and the option text clearly. Do NOT rewrite the question stem.",
    "explanation": "Format: `Question 1`, followed by `(i) (B) int x = (int) 78.65;`, `(ii) (C) Encapsulation`. Writing both the option letter and text eliminates any ambiguity if handwriting is smudged.",
    "hint": "Save precious time: do not copy the full question text.",
    "level": "basic",
    "codeExample": "(i) (B) int x = (int) 78.65;\n(ii) (C) Encapsulation"
  },
  {
    "question": "What should you do if an examination question appears ambiguous or contains a typo?",
    "shortAnswer": "Solve the question based on the most reasonable standard interpretation, and state your assumption politely in a brief one-line note.",
    "explanation": "CISCE evaluation committees review all ambiguous questions during marking key meetings and issue guidelines to award marks for multiple valid interpretations. Never leave it blank.",
    "hint": "Write: 'Note: Assuming ascending order input...' and proceed.",
    "level": "intermediate",
    "codeExample": "// Assumption: The input array contains only positive integers."
  },
  {
    "question": "What is the single most important habit that guarantees scoring 100/100 in ICSE Computer Applications?",
    "shortAnswer": "Disciplined handwriting and double-checking: neat margins, distinct indentation for loops/methods, bordered VDTs with pencil, and a 15-minute final review.",
    "explanation": "Nearly all students who know the syllabus score between 90 and 95. The leap to 100/100 happens through zero avoidable syntax mistakes, complete VDTs, and flawless presentation that leaves no opening for examiners to deduct a single mark.",
    "hint": "Make it effortlessly easy and pleasurable for the examiner to award full marks.",
    "level": "basic",
    "codeExample": "// 100/100 = Clear Logic + Clean Indentation + Complete VDT"
  },
  {
    "question": "What final routine should you follow the night before the examination?",
    "shortAnswer": "Revise the 10-year special number definitions, wrapper class methods, Math functions, review your VDT column format, and sleep at least 7 hours.",
    "explanation": "Do not attempt to write complex programs late into the night. Your brain needs rest to maintain peak concentration for loop dry runs and prefix/postfix traces under exam conditions.",
    "hint": "Rest well, stay hydrated, and enter the hall with full confidence in your preparation.",
    "level": "basic",
    "codeExample": "// Golden Rule: Rest well, think clearly, execute with precision!"
  }
];

export default questions;
