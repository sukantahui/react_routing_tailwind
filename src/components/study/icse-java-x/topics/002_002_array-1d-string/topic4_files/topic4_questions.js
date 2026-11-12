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
    "question": "Question 6 on Board Type String Array Programs: What rule or execution behavior applies in scenario 6?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 6 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Board Type String Array Programs"
  },
  {
    "id": 7,
    "question": "Question 7 on Board Type String Array Programs: What rule or execution behavior applies in scenario 7?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 7 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Board Type String Array Programs"
  },
  {
    "id": 8,
    "question": "Question 8 on Board Type String Array Programs: What rule or execution behavior applies in scenario 8?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 8 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Board Type String Array Programs"
  },
  {
    "id": 9,
    "question": "Question 9 on Board Type String Array Programs: What rule or execution behavior applies in scenario 9?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 9 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Board Type String Array Programs"
  },
  {
    "id": 10,
    "question": "Question 10 on Board Type String Array Programs: What rule or execution behavior applies in scenario 10?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 10 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "basic",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Board Type String Array Programs"
  },
  {
    "id": 11,
    "question": "Question 11 on Board Type String Array Programs: What rule or execution behavior applies in scenario 11?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 11 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Board Type String Array Programs"
  },
  {
    "id": 12,
    "question": "Question 12 on Board Type String Array Programs: What rule or execution behavior applies in scenario 12?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 12 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Board Type String Array Programs"
  },
  {
    "id": 13,
    "question": "Question 13 on Board Type String Array Programs: What rule or execution behavior applies in scenario 13?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 13 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Board Type String Array Programs"
  },
  {
    "id": 14,
    "question": "Question 14 on Board Type String Array Programs: What rule or execution behavior applies in scenario 14?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 14 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Board Type String Array Programs"
  },
  {
    "id": 15,
    "question": "Question 15 on Board Type String Array Programs: What rule or execution behavior applies in scenario 15?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 15 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Board Type String Array Programs"
  },
  {
    "id": 16,
    "question": "Question 16 on Board Type String Array Programs: What rule or execution behavior applies in scenario 16?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 16 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Board Type String Array Programs"
  },
  {
    "id": 17,
    "question": "Question 17 on Board Type String Array Programs: What rule or execution behavior applies in scenario 17?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 17 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Board Type String Array Programs"
  },
  {
    "id": 18,
    "question": "Question 18 on Board Type String Array Programs: What rule or execution behavior applies in scenario 18?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 18 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "intermediate",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Board Type String Array Programs"
  },
  {
    "id": 19,
    "question": "Question 19 on Board Type String Array Programs: What rule or execution behavior applies in scenario 19?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 19 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Board Type String Array Programs"
  },
  {
    "id": 20,
    "question": "Question 20 on Board Type String Array Programs: What rule or execution behavior applies in scenario 20?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 20 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Board Type String Array Programs"
  },
  {
    "id": 21,
    "question": "Question 21 on Board Type String Array Programs: What rule or execution behavior applies in scenario 21?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 21 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Board Type String Array Programs"
  },
  {
    "id": 22,
    "question": "Question 22 on Board Type String Array Programs: What rule or execution behavior applies in scenario 22?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 22 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Board Type String Array Programs"
  },
  {
    "id": 23,
    "question": "Question 23 on Board Type String Array Programs: What rule or execution behavior applies in scenario 23?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 23 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Board Type String Array Programs"
  },
  {
    "id": 24,
    "question": "Question 24 on Board Type String Array Programs: What rule or execution behavior applies in scenario 24?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 24 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Board Type String Array Programs"
  },
  {
    "id": 25,
    "question": "Question 25 on Board Type String Array Programs: What rule or execution behavior applies in scenario 25?",
    "shortAnswer": "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
    "explanation": "String arrays store object references pointing to String instances on the Heap. Question 25 reviews searching, sorting, and boundary validation.",
    "hint": "Testing Board Type String Array Programs.",
    "level": "advanced",
    "options": [
      "Causes memory leak",
      "Implements 15-mark Section B programs with parallel arrays, Scanner input, search/sort, and VDT.",
      "Requires C++ pointers",
      "Throws compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Board Type String Array Programs"
  }
];

export default questions;
