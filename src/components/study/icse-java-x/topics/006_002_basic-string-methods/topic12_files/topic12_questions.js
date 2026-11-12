const questions = [
  {
    "id": 1,
    "question": "What is the primary function of replace(char oldChar, char newChar) Method in the ICSE syllabus?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #1 - All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string. Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string."
  },
  {
    "id": 2,
    "question": "What is the exact return type and signature of replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #2 - Immutability: Returns a newly constructed String object; original string is never mutated.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Immutability: Returns a newly constructed String object; original string is never mutated. Always avoid common pitfall: Case mismatch: expecting replace('a', 'x') to replace uppercase 'A'.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Immutability: Returns a newly constructed String object; original string is never mutated.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Immutability: Returns a newly constructed String object; original string is never mutated."
  },
  {
    "id": 3,
    "question": "How does replace(char oldChar, char newChar) Method handle null arguments or null references?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #3 - No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string. Always avoid common pitfall: Using double quotes for characters: replace('a', 'b') takes char literals, not strings.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination error occurs with replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #4 - CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good'). Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good')."
  },
  {
    "id": 5,
    "question": "How does replace(char oldChar, char newChar) Method interact with Java's String immutability rule?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #5 - Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'. Always avoid common pitfall: Case mismatch: expecting replace('a', 'x') to replace uppercase 'A'.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'."
  },
  {
    "id": 6,
    "question": "Is replace(char oldChar, char newChar) Method case-sensitive or case-insensitive?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #1 - All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string. Always avoid common pitfall: Using double quotes for characters: replace('a', 'b') takes char literals, not strings.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string."
  },
  {
    "id": 7,
    "question": "What happens if index or boundary conditions are violated in replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #2 - Immutability: Returns a newly constructed String object; original string is never mutated.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Immutability: Returns a newly constructed String object; original string is never mutated. Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Immutability: Returns a newly constructed String object; original string is never mutated.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Immutability: Returns a newly constructed String object; original string is never mutated."
  },
  {
    "id": 8,
    "question": "How does replace(char oldChar, char newChar) Method differ from its counterpart or alternative operators?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #3 - No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string. Always avoid common pitfall: Case mismatch: expecting replace('a', 'x') to replace uppercase 'A'.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string."
  },
  {
    "id": 9,
    "question": "What runtime exception can be thrown by replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #4 - CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good'). Always avoid common pitfall: Using double quotes for characters: replace('a', 'b') takes char literals, not strings.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good')."
  },
  {
    "id": 10,
    "question": "Can replace(char oldChar, char newChar) Method be called repeatedly in method chaining?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #5 - Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'. Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'."
  },
  {
    "id": 11,
    "question": "How does BlueJ visualize the return value of replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #1 - All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string. Always avoid common pitfall: Case mismatch: expecting replace('a', 'x') to replace uppercase 'A'.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string."
  },
  {
    "id": 12,
    "question": "What is the time complexity of executing replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #2 - Immutability: Returns a newly constructed String object; original string is never mutated.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Immutability: Returns a newly constructed String object; original string is never mutated. Always avoid common pitfall: Using double quotes for characters: replace('a', 'b') takes char literals, not strings.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Immutability: Returns a newly constructed String object; original string is never mutated.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Immutability: Returns a newly constructed String object; original string is never mutated."
  },
  {
    "id": 13,
    "question": "How does replace(char oldChar, char newChar) Method behave when passed an empty string?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #3 - No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string. Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string."
  },
  {
    "id": 14,
    "question": "How is replace(char oldChar, char newChar) Method used in classic ICSE Section B programs (Pig Latin, Palindrome, Search)?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #4 - CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good'). Always avoid common pitfall: Case mismatch: expecting replace('a', 'x') to replace uppercase 'A'.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good')."
  },
  {
    "id": 15,
    "question": "Does replace(char oldChar, char newChar) Method create a new String in Heap memory or String Constant Pool?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #5 - Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'. Always avoid common pitfall: Using double quotes for characters: replace('a', 'b') takes char literals, not strings.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'."
  },
  {
    "id": 16,
    "question": "How does replace(char oldChar, char newChar) Method treat whitespace, digits, and special symbols?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #1 - All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string. Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string."
  },
  {
    "id": 17,
    "question": "What is the difference between static and instance invocation regarding replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #2 - Immutability: Returns a newly constructed String object; original string is never mutated.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Immutability: Returns a newly constructed String object; original string is never mutated. Always avoid common pitfall: Case mismatch: expecting replace('a', 'x') to replace uppercase 'A'.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Immutability: Returns a newly constructed String object; original string is never mutated.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Immutability: Returns a newly constructed String object; original string is never mutated."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #3 - No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string. Always avoid common pitfall: Using double quotes for characters: replace('a', 'b') takes char literals, not strings.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string."
  },
  {
    "id": 19,
    "question": "How is replace(char oldChar, char newChar) Method tested in Section A output prediction questions?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #4 - CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good'). Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good')."
  },
  {
    "id": 20,
    "question": "Can replace(char oldChar, char newChar) Method be executed on a StringBuffer or StringBuilder?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #5 - Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'. Always avoid common pitfall: Case mismatch: expecting replace('a', 'x') to replace uppercase 'A'.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'."
  },
  {
    "id": 21,
    "question": "What happens if replace(char oldChar, char newChar) Method is called on a string of length 1?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #1 - All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string. Always avoid common pitfall: Using double quotes for characters: replace('a', 'b') takes char literals, not strings.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// All Occurrences: Replaces EVERY occurrence of oldChar with newChar throughout the string."
  },
  {
    "id": 22,
    "question": "Why does replace(char oldChar, char newChar) Method return primitive values versus object references?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #2 - Immutability: Returns a newly constructed String object; original string is never mutated.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Immutability: Returns a newly constructed String object; original string is never mutated. Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Immutability: Returns a newly constructed String object; original string is never mutated.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Immutability: Returns a newly constructed String object; original string is never mutated."
  },
  {
    "id": 23,
    "question": "How do you combine replace(char oldChar, char newChar) Method with a for loop for string traversal?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #3 - No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string. Always avoid common pitfall: Case mismatch: expecting replace('a', 'x') to replace uppercase 'A'.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// No Match Behavior: If oldChar does not occur in the string, returns a reference to the original string."
  },
  {
    "id": 24,
    "question": "What happens if you ignore the return value of replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #4 - CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good'). Always avoid common pitfall: Using double quotes for characters: replace('a', 'b') takes char literals, not strings.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good').",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// CharSequence Overload: Also supports replacing substring sequences: str.replace('bad', 'good')."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full marks on replace(char oldChar, char newChar) Method?",
    "shortAnswer": "replace(char oldChar, char newChar) Method: Fundamental ICSE rule #5 - Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
    "explanation": "In the ICSE Class X Computer Applications board exam, replace(char oldChar, char newChar) Method is an essential method. The replace(char oldChar, char newChar) method returns a new string resulting from replacing all occurrences of oldChar in the string with newChar. Because strings are immutable, the original string remains untouched. Key syllabus specification: Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'. Always avoid common pitfall: Believing replace() mutates the original string in place without reassigning.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// ReplaceMethodDemo.java\n// Case Sensitive: 'Java'.replace('j', 'k') leaves 'Java' unchanged because 'j' != 'J'."
  }
];

export default questions;
