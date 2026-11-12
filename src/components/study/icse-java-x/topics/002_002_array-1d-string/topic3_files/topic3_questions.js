const questions = [
  {
    "id": 1,
    "question": "How is a 1D String array declared and instantiated in Java?",
    "shortAnswer": "String[] names = new String[10];",
    "explanation": "Allocates an array of 10 String reference variables initialized to null.",
    "hint": "String array declaration",
    "level": "basic",
    "options": [
      "String names[10];",
      "String[] names = new String[10];",
      "Array<String> names = new Array();",
      "string[] names = 10;"
    ],
    "correctAnswer": 1,
    "codeExample": "String[] cities = new String[5];"
  },
  {
    "id": 2,
    "question": "What is the default value of elements in an instantiated String array: new String[5]?",
    "shortAnswer": "null",
    "explanation": "String is an object reference type; reference array elements default to null.",
    "hint": "Defaults to null",
    "level": "basic",
    "options": [
      "\"\"",
      "null",
      "0",
      "undefined"
    ],
    "correctAnswer": 1,
    "codeExample": "names[0] == null // true"
  },
  {
    "id": 3,
    "question": "How do you compare two String array elements alphabetically in Bubble Sort?",
    "shortAnswer": "if (names[j].compareTo(names[j + 1]) > 0)",
    "explanation": "compareTo() returning > 0 indicates names[j] comes after names[j+1] alphabetically.",
    "hint": "compareTo for sorting",
    "level": "basic",
    "options": [
      "if (names[j] > names[j+1])",
      "if (names[j].compareTo(names[j+1]) > 0)",
      "if (names[j].equals(names[j+1]))",
      "if (names[j].length() > names[j+1].length())"
    ],
    "correctAnswer": 1,
    "codeExample": "if (arr[j].compareTo(arr[j+1]) > 0) swap();"
  },
  {
    "id": 4,
    "question": "How do you search for a city name ignoring case in a String array?",
    "shortAnswer": "if (cities[i].equalsIgnoreCase(targetCity))",
    "explanation": "equalsIgnoreCase ignores upper/lower case differences.",
    "hint": "Case insensitive search",
    "level": "basic",
    "options": [
      "if (cities[i] == targetCity)",
      "if (cities[i].equalsIgnoreCase(targetCity))",
      "if (cities[i].contains(targetCity))",
      "if (cities[i].indexOf(targetCity))"
    ],
    "correctAnswer": 1,
    "codeExample": "if (cities[i].equalsIgnoreCase(search)) found = true;"
  },
  {
    "id": 5,
    "question": "What error occurs if you call compareTo() on an uninitialized element: names[i].compareTo(str) when names[i] is null?",
    "shortAnswer": "java.lang.NullPointerException",
    "explanation": "Calling an instance method on null throws NullPointerException.",
    "hint": "Null dereference in array",
    "level": "basic",
    "options": [
      "Returns -1",
      "NullPointerException",
      "Returns 0",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "names[0].compareTo(\"A\"); // NullPointerException if names[0] is null"
  },
  {
    "id": 6,
    "question": "Question 6 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 6?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 6 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Case Insensitive Comparison"
  },
  {
    "id": 7,
    "question": "Question 7 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 7?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 7 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Case Insensitive Comparison"
  },
  {
    "id": 8,
    "question": "Question 8 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 8?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 8 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Case Insensitive Comparison"
  },
  {
    "id": 9,
    "question": "Question 9 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 9?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 9 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Case Insensitive Comparison"
  },
  {
    "id": 10,
    "question": "Question 10 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 10?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 10 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Case Insensitive Comparison"
  },
  {
    "id": 11,
    "question": "Question 11 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 11?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 11 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Case Insensitive Comparison"
  },
  {
    "id": 12,
    "question": "Question 12 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 12?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 12 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Case Insensitive Comparison"
  },
  {
    "id": 13,
    "question": "Question 13 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 13?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 13 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Case Insensitive Comparison"
  },
  {
    "id": 14,
    "question": "Question 14 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 14?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 14 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Case Insensitive Comparison"
  },
  {
    "id": 15,
    "question": "Question 15 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 15?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 15 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Case Insensitive Comparison"
  },
  {
    "id": 16,
    "question": "Question 16 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 16?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 16 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Case Insensitive Comparison"
  },
  {
    "id": 17,
    "question": "Question 17 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 17?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 17 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Case Insensitive Comparison"
  },
  {
    "id": 18,
    "question": "Question 18 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 18?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 18 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Case Insensitive Comparison"
  },
  {
    "id": 19,
    "question": "Question 19 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 19?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 19 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Case Insensitive Comparison"
  },
  {
    "id": 20,
    "question": "Question 20 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 20?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 20 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Case Insensitive Comparison"
  },
  {
    "id": 21,
    "question": "Question 21 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 21?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 21 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Case Insensitive Comparison"
  },
  {
    "id": 22,
    "question": "Question 22 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 22?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 22 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Case Insensitive Comparison"
  },
  {
    "id": 23,
    "question": "Question 23 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 23?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 23 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Case Insensitive Comparison"
  },
  {
    "id": 24,
    "question": "Question 24 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 24?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 24 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Case Insensitive Comparison"
  },
  {
    "id": 25,
    "question": "Question 25 on Case Insensitive Comparison: What rule or execution behavior applies in scenario 25?",
    "shortAnswer": "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 25 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Case Insensitive Comparison.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "compareToIgnoreCase ignores letter casing, ensuring natural dictionary ordering.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Case Insensitive Comparison"
  }
];

export default questions;
