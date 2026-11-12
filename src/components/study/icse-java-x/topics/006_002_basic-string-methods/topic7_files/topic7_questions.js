const questions = [
  {
    "id": 1,
    "question": "What is the primary function of concat(String str) Method in the ICSE syllabus?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #1 - Immutability: Does not alter invoking string; always returns a new String instance.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Immutability: Does not alter invoking string; always returns a new String instance. Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Immutability: Does not alter invoking string; always returns a new String instance.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Immutability: Does not alter invoking string; always returns a new String instance."
  },
  {
    "id": 2,
    "question": "What is the exact return type and signature of concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #2 - Syntax: String s3 = s1.concat(s2);",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Syntax: String s3 = s1.concat(s2); Always avoid common pitfall: Passing null to concat() causing runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Syntax: String s3 = s1.concat(s2);",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Syntax: String s3 = s1.concat(s2);"
  },
  {
    "id": 3,
    "question": "How does concat(String str) Method handle null arguments or null references?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #3 - Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException. Always avoid common pitfall: Using concat() in tight loops instead of StringBuilder, creating unnecessary heap garbage.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination error occurs with concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #4 - Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation. Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation."
  },
  {
    "id": 5,
    "question": "How does concat(String str) Method interact with Java's String immutability rule?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #5 - Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Chaining: Can be chained consecutively: s1.concat(s2).concat(s3). Always avoid common pitfall: Passing null to concat() causing runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Chaining: Can be chained consecutively: s1.concat(s2).concat(s3)."
  },
  {
    "id": 6,
    "question": "Is concat(String str) Method case-sensitive or case-insensitive?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #1 - Immutability: Does not alter invoking string; always returns a new String instance.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Immutability: Does not alter invoking string; always returns a new String instance. Always avoid common pitfall: Using concat() in tight loops instead of StringBuilder, creating unnecessary heap garbage.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Immutability: Does not alter invoking string; always returns a new String instance.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Immutability: Does not alter invoking string; always returns a new String instance."
  },
  {
    "id": 7,
    "question": "What happens if index or boundary conditions are violated in concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #2 - Syntax: String s3 = s1.concat(s2);",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Syntax: String s3 = s1.concat(s2); Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Syntax: String s3 = s1.concat(s2);",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Syntax: String s3 = s1.concat(s2);"
  },
  {
    "id": 8,
    "question": "How does concat(String str) Method differ from its counterpart or alternative operators?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #3 - Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException. Always avoid common pitfall: Passing null to concat() causing runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException."
  },
  {
    "id": 9,
    "question": "What runtime exception can be thrown by concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #4 - Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation. Always avoid common pitfall: Using concat() in tight loops instead of StringBuilder, creating unnecessary heap garbage.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation."
  },
  {
    "id": 10,
    "question": "Can concat(String str) Method be called repeatedly in method chaining?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #5 - Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Chaining: Can be chained consecutively: s1.concat(s2).concat(s3). Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Chaining: Can be chained consecutively: s1.concat(s2).concat(s3)."
  },
  {
    "id": 11,
    "question": "How does BlueJ visualize the return value of concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #1 - Immutability: Does not alter invoking string; always returns a new String instance.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Immutability: Does not alter invoking string; always returns a new String instance. Always avoid common pitfall: Passing null to concat() causing runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Immutability: Does not alter invoking string; always returns a new String instance.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Immutability: Does not alter invoking string; always returns a new String instance."
  },
  {
    "id": 12,
    "question": "What is the time complexity of executing concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #2 - Syntax: String s3 = s1.concat(s2);",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Syntax: String s3 = s1.concat(s2); Always avoid common pitfall: Using concat() in tight loops instead of StringBuilder, creating unnecessary heap garbage.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Syntax: String s3 = s1.concat(s2);",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Syntax: String s3 = s1.concat(s2);"
  },
  {
    "id": 13,
    "question": "How does concat(String str) Method behave when passed an empty string?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #3 - Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException. Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException."
  },
  {
    "id": 14,
    "question": "How is concat(String str) Method used in classic ICSE Section B programs (Pig Latin, Palindrome, Search)?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #4 - Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation. Always avoid common pitfall: Passing null to concat() causing runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation."
  },
  {
    "id": 15,
    "question": "Does concat(String str) Method create a new String in Heap memory or String Constant Pool?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #5 - Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Chaining: Can be chained consecutively: s1.concat(s2).concat(s3). Always avoid common pitfall: Using concat() in tight loops instead of StringBuilder, creating unnecessary heap garbage.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Chaining: Can be chained consecutively: s1.concat(s2).concat(s3)."
  },
  {
    "id": 16,
    "question": "How does concat(String str) Method treat whitespace, digits, and special symbols?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #1 - Immutability: Does not alter invoking string; always returns a new String instance.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Immutability: Does not alter invoking string; always returns a new String instance. Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Immutability: Does not alter invoking string; always returns a new String instance.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Immutability: Does not alter invoking string; always returns a new String instance."
  },
  {
    "id": 17,
    "question": "What is the difference between static and instance invocation regarding concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #2 - Syntax: String s3 = s1.concat(s2);",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Syntax: String s3 = s1.concat(s2); Always avoid common pitfall: Passing null to concat() causing runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Syntax: String s3 = s1.concat(s2);",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Syntax: String s3 = s1.concat(s2);"
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #3 - Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException. Always avoid common pitfall: Using concat() in tight loops instead of StringBuilder, creating unnecessary heap garbage.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException."
  },
  {
    "id": 19,
    "question": "How is concat(String str) Method tested in Section A output prediction questions?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #4 - Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation. Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation."
  },
  {
    "id": 20,
    "question": "Can concat(String str) Method be executed on a StringBuffer or StringBuilder?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #5 - Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Chaining: Can be chained consecutively: s1.concat(s2).concat(s3). Always avoid common pitfall: Passing null to concat() causing runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Chaining: Can be chained consecutively: s1.concat(s2).concat(s3)."
  },
  {
    "id": 21,
    "question": "What happens if concat(String str) Method is called on a string of length 1?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #1 - Immutability: Does not alter invoking string; always returns a new String instance.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Immutability: Does not alter invoking string; always returns a new String instance. Always avoid common pitfall: Using concat() in tight loops instead of StringBuilder, creating unnecessary heap garbage.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Immutability: Does not alter invoking string; always returns a new String instance.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Immutability: Does not alter invoking string; always returns a new String instance."
  },
  {
    "id": 22,
    "question": "Why does concat(String str) Method return primitive values versus object references?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #2 - Syntax: String s3 = s1.concat(s2);",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Syntax: String s3 = s1.concat(s2); Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Syntax: String s3 = s1.concat(s2);",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Syntax: String s3 = s1.concat(s2);"
  },
  {
    "id": 23,
    "question": "How do you combine concat(String str) Method with a for loop for string traversal?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #3 - Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException. Always avoid common pitfall: Passing null to concat() causing runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Null Handling: Unlike the '+' operator (which turns null into 'null'), calling s1.concat(null) throws a NullPointerException."
  },
  {
    "id": 24,
    "question": "What happens if you ignore the return value of concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #4 - Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation. Always avoid common pitfall: Using concat() in tight loops instead of StringBuilder, creating unnecessary heap garbage.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Zero-Length Optimization: If the argument string length is 0, concat() returns the original invoking string reference without new allocation."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full marks on concat(String str) Method?",
    "shortAnswer": "concat(String str) Method: Fundamental ICSE rule #5 - Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
    "explanation": "In the ICSE Class X Computer Applications board exam, concat(String str) Method is an essential method. The concat(String str) method appends the specified string to the end of the invoking string. Because String objects are immutable in Java, concat() never modifies the original string; instead, it returns a reference to a newly created String object in heap memory. Key syllabus specification: Chaining: Can be chained consecutively: s1.concat(s2).concat(s3). Always avoid common pitfall: Assuming str.concat('!') modifies str in-place without re-assigning: str = str.concat('!').",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Chaining: Can be chained consecutively: s1.concat(s2).concat(s3).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 7:\n// ConcatMethodDemo.java\n// Chaining: Can be chained consecutively: s1.concat(s2).concat(s3)."
  }
];

export default questions;
