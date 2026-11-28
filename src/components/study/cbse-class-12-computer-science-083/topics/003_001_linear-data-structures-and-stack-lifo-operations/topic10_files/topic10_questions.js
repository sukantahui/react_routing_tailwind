// 25 Authentic CBSE Board Examination Questions for Topic 10
const questions = [
  {
    "id": 1,
    "question": "In a CBSE question: 'Push all names of students scoring marks > 75 from dictionary d = {'A': 90, 'B': 60}', what is the correct code?",
    "options": [
      "for k, v in d.items(): if v > 75: stk.append(k)",
      "for k in d: stk.append(k)",
      "stk = list(d.keys())",
      "stk.push(d)"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating through d.items() and checking if v > 75 appends the matching keys to stk.",
    "hint": "for k, v in d.items(): if v > 75: stk.append(k)."
  },
  {
    "id": 2,
    "question": "How do you check if an integer 'n' is divisible by 5 in Python?",
    "options": [
      "n / 5 == 0",
      "n % 5 == 0",
      "n // 5 == 0",
      "divisible(n, 5)"
    ],
    "correctAnswer": 1,
    "explanation": "The modulo operator % returns remainder; n % 5 == 0 confirms divisibility.",
    "hint": "n % 5 == 0."
  },
  {
    "id": 3,
    "question": "Consider: words = ['Apple', 'Ball', 'Eagle', 'Cat', 'Owl']. How do you push words starting with a vowel?",
    "options": [
      "vowels = 'AEIOUaeiou'; for w in words: if w[0] in vowels: stk.append(w)",
      "for w in words: stk.append(w)",
      "stk = words",
      "stk.push(vowels)"
    ],
    "correctAnswer": 0,
    "explanation": "Checking whether w[0] is in 'AEIOUaeiou' correctly filters words starting with vowels.",
    "hint": "if w[0] in 'AEIOUaeiou': stk.append(w)."
  },
  {
    "id": 4,
    "question": "What is the standard CBSE pattern to empty a stack completely and display all elements in LIFO order?",
    "options": [
      "while len(stk) > 0: print(stk.pop())",
      "stk.clear()",
      "print(stk)",
      "for i in stk: print(i)"
    ],
    "correctAnswer": 0,
    "explanation": "while len(stk) > 0: print(stk.pop()) drains the stack, displaying items in reverse order.",
    "hint": "while len(stk) > 0: print(stk.pop())."
  },
  {
    "id": 5,
    "question": "Consider: def PushOdd(stk, nums): for n in nums: if n % 2 != 0: stk.append(n). For nums = [10, 21, 32, 43], what is in stk?",
    "options": [
      "[10, 32]",
      "[21, 43]",
      "[10, 21, 32, 43]",
      "[]"
    ],
    "correctAnswer": 1,
    "explanation": "21 and 43 are odd numbers, so [21, 43] are pushed.",
    "hint": "[21, 43]."
  },
  {
    "id": 6,
    "question": "In a CBSE question: 'Write Pop(stk) to delete and return the top element, or print 'Empty' if empty', what is the standard structure?",
    "options": [
      "if len(stk) == 0: print('Empty'); return None; else: return stk.pop()",
      "return stk.pop()",
      "del stk[-1]",
      "stk = []"
    ],
    "correctAnswer": 0,
    "explanation": "Checking len(stk) == 0, printing 'Empty', and returning stk.pop() in else fulfills the complete rubric.",
    "hint": "Check empty + else return stk.pop()."
  },
  {
    "id": 7,
    "question": "What does the expression 'w[-1].lower() in 'aeiou'' check for?",
    "options": [
      "Whether string w starts with a vowel",
      "Whether string w ends with a vowel",
      "Whether string w contains only vowels",
      "Word length"
    ],
    "correctAnswer": 1,
    "explanation": "w[-1] accesses the last character; checking membership in vowels verifies ending character.",
    "hint": "Whether string ends with a vowel."
  },
  {
    "id": 8,
    "question": "Consider: employees = [['E101', 'Amit', 45000], ['E102', 'Ria', 65000]]. To push names of employees earning > 50000, what should be written?",
    "options": [
      "for e in employees: if e[2] > 50000: stk.append(e[1])",
      "for e in employees: stk.append(e)",
      "stk.append(employees)",
      "stk.push(50000)"
    ],
    "correctAnswer": 0,
    "explanation": "e[2] is salary; e[1] is name. Checking e[2] > 50000 and appending e[1] pushes the matching names.",
    "hint": "for e in employees: if e[2] > 50000: stk.append(e[1])."
  },
  {
    "id": 9,
    "question": "What happens if no element in the source list matches the filter condition during a conditional Push?",
    "options": [
      "The stack remains empty (0 elements)",
      "Program crashes",
      "None is pushed",
      "An error is raised"
    ],
    "correctAnswer": 0,
    "explanation": "If no elements meet the condition, append() is never invoked, leaving the stack empty.",
    "hint": "Stack remains empty."
  },
  {
    "id": 10,
    "question": "If a board question asks to 'Display total elements pushed into the stack', what should be returned or printed?",
    "options": [
      "len(stk)",
      "stk.count()",
      "stk.size()",
      "max(stk)"
    ],
    "correctAnswer": 0,
    "explanation": "len(stk) gives the total element count.",
    "hint": "len(stk)."
  },
  {
    "id": 11,
    "question": "Consider: d = {'Delhi': 250, 'Mumbai': 180, 'Kolkata': 300}. If we push cities with pollution > 200, which city is at the TOP of the stack?",
    "options": [
      "Delhi",
      "Mumbai",
      "Kolkata",
      "None"
    ],
    "correctAnswer": 2,
    "explanation": "Delhi (250) is pushed first, Kolkata (300) is pushed second, placing Kolkata at the TOP.",
    "hint": "Kolkata (pushed last)."
  },
  {
    "id": 12,
    "question": "What does the method d.values() return?",
    "options": [
      "A view of dictionary keys",
      "A view of dictionary values",
      "A list of tuples",
      "Total count"
    ],
    "correctAnswer": 1,
    "explanation": "d.values() returns an iterable view of all values in the dictionary.",
    "hint": "View of dictionary values."
  },
  {
    "id": 13,
    "question": "What does the method d.keys() return?",
    "options": [
      "A view of all dictionary keys",
      "A view of values",
      "Sorted list",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "d.keys() returns an iterable view of all keys in the dictionary.",
    "hint": "View of all dictionary keys."
  },
  {
    "id": 14,
    "question": "What does the method d.items() return?",
    "options": [
      "A view of key-value pairs as (key, value) tuples",
      "Only keys",
      "Only values",
      "Total length"
    ],
    "correctAnswer": 0,
    "explanation": "d.items() yields (key, value) pairs, ideal for unpacking in for loops: 'for k, v in d.items():'.",
    "hint": "View of (key, value) tuples."
  },
  {
    "id": 15,
    "question": "Consider: def PushMultiples(stk, nums): for n in nums: if n % 3 == 0 and n % 5 == 0: stk.append(n). What numbers are pushed?",
    "options": [
      "Multiples of 3 only",
      "Multiples of 5 only",
      "Multiples of both 3 and 5 (i.e. multiples of 15)",
      "Odd numbers"
    ],
    "correctAnswer": 2,
    "explanation": "The 'and' operator requires both conditions to be True, selecting multiples of 15.",
    "hint": "Multiples of both 3 and 5 (multiples of 15)."
  },
  {
    "id": 16,
    "question": "How do you check if a string 's' has length between 4 and 8 inclusive?",
    "options": [
      "4 <= len(s) <= 8",
      "len(s) >= 4 and len(s) <= 8",
      "Both A and B are valid in Python",
      "Neither"
    ],
    "correctAnswer": 2,
    "explanation": "Python supports both chained comparisons and boolean 'and' expressions.",
    "hint": "Both A and B are valid."
  },
  {
    "id": 17,
    "question": "In CBSE board marking keys, what is the weightage of the 'if' condition check in a conditional push function?",
    "options": [
      "1 mark",
      "0 marks",
      "All 4 marks",
      "3 marks"
    ],
    "correctAnswer": 0,
    "explanation": "Formulating the correct filtering logic accounts for 1 mark in the rubric.",
    "hint": "1 mark."
  },
  {
    "id": 18,
    "question": "Consider: words = ['noon', 'radar', 'python', 'level']. To push palindromes, what condition is used?",
    "options": [
      "if w == w[::-1]:",
      "if w == reversed(w):",
      "if palindrome(w):",
      "if w[0] == w[1]:"
    ],
    "correctAnswer": 0,
    "explanation": "Slice w[::-1] reverses the string; if w == w[::-1], it is a palindrome.",
    "hint": "if w == w[::-1]:."
  },
  {
    "id": 19,
    "question": "What elements are pushed from ['noon', 'radar', 'python', 'level'] using 'if w == w[::-1]: stk.append(w)'?",
    "options": [
      "['noon', 'radar', 'level']",
      "['python']",
      "All words",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "'noon', 'radar', and 'level' read identically backwards and forwards.",
    "hint": "['noon', 'radar', 'level']."
  },
  {
    "id": 20,
    "question": "Consider: def PushNegatives(stk, nums): for x in nums: if x < 0: stk.append(x). For nums = [5, -2, 8, -9, 0], what is stk?",
    "options": [
      "[-2, -9]",
      "[5, 8, 0]",
      "[-2]",
      "[-9]"
    ],
    "correctAnswer": 0,
    "explanation": "Only negative numbers -2 and -9 are pushed.",
    "hint": "[-2, -9]."
  },
  {
    "id": 21,
    "question": "What is printed if PopAll(stk) is called on stk = [-2, -9]?",
    "options": [
      "-2 then -9",
      "-9 then -2 (LIFO order)",
      "None",
      "[-2, -9]"
    ],
    "correctAnswer": 1,
    "explanation": "-9 was pushed last (TOP) and is popped first, followed by -2.",
    "hint": "-9 then -2."
  },
  {
    "id": 22,
    "question": "Can a function both push elements and return the resulting stack in Python?",
    "options": [
      "Yes, though returning is optional since lists mutate by reference",
      "No, push cannot return anything",
      "Only in C",
      "Only with tuples"
    ],
    "correctAnswer": 0,
    "explanation": "Returning stk is valid and convenient, though caller already holds the mutated list reference.",
    "hint": "Yes, optional but valid."
  },
  {
    "id": 23,
    "question": "In a CBSE question: 'Write a function PushPhone(PhoneDict, Stk)', what are the two parameters?",
    "options": [
      "PhoneDict is the source dictionary, Stk is the target stack list",
      "Two numbers",
      "Two strings",
      "Operating system ports"
    ],
    "correctAnswer": 0,
    "explanation": "PhoneDict provides the input dataset; Stk is the list accumulating filtered items.",
    "hint": "Source dictionary and target stack list."
  },
  {
    "id": 24,
    "question": "What happens if a student writes 'stk.append(name, marks)' instead of 'stk.append([name, marks])'?",
    "options": [
      "Works fine",
      "Raises TypeError: append() takes exactly one argument (2 given)",
      "Creates a tuple",
      "Only pushes name"
    ],
    "correctAnswer": 1,
    "explanation": "append() accepts strictly one argument; multiple values must be grouped in a list or tuple.",
    "hint": "TypeError: append() takes exactly one argument."
  },
  {
    "id": 25,
    "question": "Which pattern guarantees 100% full marks in CBSE Class 12 CS Stack questions?",
    "options": [
      "Clear function names, correct conditional logic, stk.append(), underflow check in Pop(), and non-destructive Display()",
      "Writing everything in one massive line",
      "Importing external libraries",
      "Using while loops without condition"
    ],
    "correctAnswer": 0,
    "explanation": "Clean modular functions matching the question prompt with underflow protection guarantee full marks.",
    "hint": "Modular functions + accurate conditions + underflow checks."
  }
];

export default questions;
