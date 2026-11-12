const questions = [
  {
    "id": 1,
    "question": "What is the primary function and signature of isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #1 - Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly. Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly."
  },
  {
    "id": 2,
    "question": "What is the exact return type of isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #2 - Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r'). Always avoid common pitfall: Assuming isWhitespace() only checks for the standard space (' ') character; it checks all Unicode whitespace characters.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r')."
  },
  {
    "id": 3,
    "question": "Which package does isWhitespace(char ch) Method belong to, and does it require an explicit import?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #3 - Return Type: boolean (true if ch is whitespace, false otherwise).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Return Type: boolean (true if ch is whitespace, false otherwise). Always avoid common pitfall: Multiple consecutive spaces causing multiple word counts if not skipping redundant whitespace.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Return Type: boolean (true if ch is whitespace, false otherwise).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Return Type: boolean (true if ch is whitespace, false otherwise)."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination trap exists in isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #4 - ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true. Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true."
  },
  {
    "id": 5,
    "question": "How does isWhitespace(char ch) Method handle negative numerical arguments?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #5 - ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters. Always avoid common pitfall: Assuming isWhitespace() only checks for the standard space (' ') character; it checks all Unicode whitespace characters.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters."
  },
  {
    "id": 6,
    "question": "What happens if you pass an integer argument to isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #1 - Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly. Always avoid common pitfall: Multiple consecutive spaces causing multiple word counts if not skipping redundant whitespace.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly."
  },
  {
    "id": 7,
    "question": "Can isWhitespace(char ch) Method be called without an object instance (static method)?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #2 - Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r'). Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r')."
  },
  {
    "id": 8,
    "question": "How do you write a Java expression for a mathematical formula using isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #3 - Return Type: boolean (true if ch is whitespace, false otherwise).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Return Type: boolean (true if ch is whitespace, false otherwise). Always avoid common pitfall: Assuming isWhitespace() only checks for the standard space (' ') character; it checks all Unicode whitespace characters.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "basic",
    "options": [
      "Return Type: boolean (true if ch is whitespace, false otherwise).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Return Type: boolean (true if ch is whitespace, false otherwise)."
  },
  {
    "id": 9,
    "question": "What runtime value or exception is produced if invalid input is given to isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #4 - ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true. Always avoid common pitfall: Multiple consecutive spaces causing multiple word counts if not skipping redundant whitespace.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true."
  },
  {
    "id": 10,
    "question": "How does isWhitespace(char ch) Method differ from its counterpart method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #5 - ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters. Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters."
  },
  {
    "id": 11,
    "question": "How does BlueJ display the output of isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #1 - Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly. Always avoid common pitfall: Assuming isWhitespace() only checks for the standard space (' ') character; it checks all Unicode whitespace characters.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly."
  },
  {
    "id": 12,
    "question": "How do parentheses affect operator precedence when combined with isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #2 - Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r'). Always avoid common pitfall: Multiple consecutive spaces causing multiple word counts if not skipping redundant whitespace.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r')."
  },
  {
    "id": 13,
    "question": "What is the difference between float and double overloads in isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #3 - Return Type: boolean (true if ch is whitespace, false otherwise).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Return Type: boolean (true if ch is whitespace, false otherwise). Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Return Type: boolean (true if ch is whitespace, false otherwise).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Return Type: boolean (true if ch is whitespace, false otherwise)."
  },
  {
    "id": 14,
    "question": "How is isWhitespace(char ch) Method used in Section B class design programs?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #4 - ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true. Always avoid common pitfall: Assuming isWhitespace() only checks for the standard space (' ') character; it checks all Unicode whitespace characters.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true."
  },
  {
    "id": 15,
    "question": "Why is explicit casting required when assigning the result of isWhitespace(char ch) Method to an integer?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #5 - ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters. Always avoid common pitfall: Multiple consecutive spaces causing multiple word counts if not skipping redundant whitespace.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters."
  },
  {
    "id": 16,
    "question": "How does isWhitespace(char ch) Method evaluate floating-point boundary values (0.0, -0.0, NaN)?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #1 - Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly. Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly."
  },
  {
    "id": 17,
    "question": "What is the significance of Math.PI and Math.E in calculations involving isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #2 - Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r'). Always avoid common pitfall: Assuming isWhitespace() only checks for the standard space (' ') character; it checks all Unicode whitespace characters.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r')."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #3 - Return Type: boolean (true if ch is whitespace, false otherwise).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Return Type: boolean (true if ch is whitespace, false otherwise). Always avoid common pitfall: Multiple consecutive spaces causing multiple word counts if not skipping redundant whitespace.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "intermediate",
    "options": [
      "Return Type: boolean (true if ch is whitespace, false otherwise).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Return Type: boolean (true if ch is whitespace, false otherwise)."
  },
  {
    "id": 19,
    "question": "How is isWhitespace(char ch) Method tested in Section A 2-mark output prediction questions?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #4 - ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true. Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true."
  },
  {
    "id": 20,
    "question": "How does integer division (e.g. 1/2) affect formulas using isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #5 - ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters. Always avoid common pitfall: Assuming isWhitespace() only checks for the standard space (' ') character; it checks all Unicode whitespace characters.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters."
  },
  {
    "id": 21,
    "question": "What happens if you use the '^' operator instead of isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #1 - Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly. Always avoid common pitfall: Multiple consecutive spaces causing multiple word counts if not skipping redundant whitespace.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Static Invocation: Called as Character.isWhitespace(ch); cannot be called on primitive char directly."
  },
  {
    "id": 22,
    "question": "How does Banker's rounding apply when evaluating isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #2 - Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r'). Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r').",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Recognized Whitespace: Returns true for space (' '), horizontal tab ('\\t'), line feed ('\\n'), form feed ('\\f'), and carriage return ('\\r')."
  },
  {
    "id": 23,
    "question": "Can isWhitespace(char ch) Method be used in conditional if-else statements?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #3 - Return Type: boolean (true if ch is whitespace, false otherwise).",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: Return Type: boolean (true if ch is whitespace, false otherwise). Always avoid common pitfall: Assuming isWhitespace() only checks for the standard space (' ') character; it checks all Unicode whitespace characters.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "Return Type: boolean (true if ch is whitespace, false otherwise).",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// Return Type: boolean (true if ch is whitespace, false otherwise)."
  },
  {
    "id": 24,
    "question": "How do you generate an arbitrary range using isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #4 - ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true. Always avoid common pitfall: Multiple consecutive spaces causing multiple word counts if not skipping redundant whitespace.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ASCII Space vs Whitespace: Space has ASCII code 32, tab is 9, newline is 10, carriage return is 13; all evaluate to true."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full 100/100 on isWhitespace(char ch) Method?",
    "shortAnswer": "isWhitespace(char ch) Method: Fundamental ICSE rule #5 - ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
    "explanation": "In the ICSE Class 10 Computer Applications examination, isWhitespace(char ch) Method is a core mathematical library topic. Character.isWhitespace(char ch) is a static method of the java.lang.Character class that determines if the specified character is white space according to Java. It identifies standard spaces (' '), tab characters ('\\t'), newline ('\\n'), carriage return ('\\r'), and form feed ('\\f'). Key syllabus rule: ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters. Always avoid common pitfall: Invoking as ch.isWhitespace() which is illegal on primitive char variables.",
    "hint": "Recall return types, static method syntax, operator precedence, and negative number rules.",
    "level": "advanced",
    "options": [
      "ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters.",
      "The method requires an explicit import of java.math.* to execute",
      "The method automatically mutates primitive values passed as arguments",
      "The method returns void and outputs directly to the console"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// IsWhitespaceMethodDemo.java\n// ICSE Word Counting: The standard robust approach to count words in a sentence by detecting transitions between whitespace and non-whitespace characters."
  }
];

export default questions;
