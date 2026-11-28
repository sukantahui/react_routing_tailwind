// 25 Authentic CBSE Board Examination Questions for Topic 10
const questions = [
  {
    "id": 1,
    "question": "What is the output of: `for i in range(1, 4): print(i * 2, end='#')`?",
    "options": [
      "2#4#6#",
      "2#4#6",
      "1#2#3#",
      "2 4 6"
    ],
    "correctAnswer": 0,
    "explanation": "Loop iterates for i = 1, 2, 3. Each output is followed by '#', yielding '2#4#6#'.",
    "hint": "Trailing end separator."
  },
  {
    "id": 2,
    "question": "What is `ord('B') - ord('A')` in Python?",
    "options": [
      "1",
      "0",
      "65",
      "66"
    ],
    "correctAnswer": 0,
    "explanation": "`ord('B')` is 66, `ord('A')` is 65; 66 - 65 = 1.",
    "hint": "ASCII arithmetic."
  },
  {
    "id": 3,
    "question": "What is the output of: `s = 'Go'; print(s * 2 + '!')`?",
    "options": [
      "GoGo!",
      "Go!Go!",
      "Go2!",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Repetition `s * 2` yields 'GoGo', and concatenating '!' yields 'GoGo!'.",
    "hint": "Operator precedence: * before +."
  },
  {
    "id": 4,
    "question": "Given `L = [10, 20, 30]`, what is the output of `for i in range(len(L)): L[i] += i; print(L)`?",
    "options": [
      "[10, 21, 32]",
      "[10, 20, 30]",
      "[11, 22, 33]",
      "[0, 1, 2]"
    ],
    "correctAnswer": 0,
    "explanation": "L[0] += 0 -> 10; L[1] += 1 -> 21; L[2] += 2 -> 32. Output: `[10, 21, 32]`.",
    "hint": "Adding index to value."
  },
  {
    "id": 5,
    "question": "What is the output of: `s = 'A1'; print(s.isalnum())`?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "'A1' contains only letters and numbers; `isalnum()` returns True.",
    "hint": "Alphanumeric test."
  },
  {
    "id": 6,
    "question": "What is the output of: `x = 10; y = 20; x, y = y, x + y; print(x, y)`?",
    "options": [
      "20 30",
      "20 20",
      "10 30",
      "30 20"
    ],
    "correctAnswer": 0,
    "explanation": "RHS evaluates first: y is 20, x + y is 10 + 20 = 30. Then x = 20, y = 30.",
    "hint": "Simultaneous assignment trace."
  },
  {
    "id": 7,
    "question": "What will `print('PYTHON'[1:4])` output?",
    "options": [
      "YTH",
      "PYT",
      "YTHO",
      "THO"
    ],
    "correctAnswer": 0,
    "explanation": "Indices 1, 2, 3: 'Y', 'T', 'H' -> 'YTH'.",
    "hint": "Slice indices 1 to 3."
  },
  {
    "id": 8,
    "question": "What is the output of: `for x in range(3, 0, -1): print(x, end=' ')`?",
    "options": [
      "3 2 1 ",
      "3 2 1 0 ",
      "1 2 3 ",
      "3 2 "
    ],
    "correctAnswer": 0,
    "explanation": "Starts at 3, stops at 0 (exclusive), step -1: 3, 2, 1.",
    "hint": "Negative step."
  },
  {
    "id": 9,
    "question": "What is the output of: `d = {'a': 1}; d['b'] = d.get('b', 0) + 5; print(d['b'])`?",
    "options": [
      "5",
      "0",
      "KeyError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`d.get('b', 0)` returns 0; 0 + 5 = 5. Value 5 is stored at key 'b'.",
    "hint": "get with default addition."
  },
  {
    "id": 10,
    "question": "What is the output of: `print('AB'.join(['1', '2', '3']))`?",
    "options": [
      "1AB2AB3",
      "AB1AB2AB3",
      "123AB",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "'AB' is inserted between each list element: '1AB2AB3'.",
    "hint": "Join separator."
  },
  {
    "id": 11,
    "question": "What will `print([x for x in range(5) if x % 2 == 0])` output?",
    "options": [
      "[0, 2, 4]",
      "[2, 4]",
      "[0, 1, 2, 3, 4]",
      "[1, 3]"
    ],
    "correctAnswer": 0,
    "explanation": "Even integers in range(5) are 0, 2, 4.",
    "hint": "Even filter including 0."
  },
  {
    "id": 12,
    "question": "What is the output of: `s = 'Exam'; print(s[-2:])`?",
    "options": [
      "am",
      "xa",
      "Ex",
      "m"
    ],
    "correctAnswer": 0,
    "explanation": "`s[-2:]` extracts from index -2 ('a') to the end ('m'): 'am'.",
    "hint": "Negative slicing."
  },
  {
    "id": 13,
    "question": "What is the output of: `a = [1, 2]; b = a * 2; b[0] = 9; print(a)`?",
    "options": [
      "[1, 2]",
      "[9, 2]",
      "[9, 2, 1, 2]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`a * 2` creates a new list `b = [1, 2, 1, 2]`. Mutating `b` does not affect `a`.",
    "hint": "New list creation via repetition."
  },
  {
    "id": 14,
    "question": "What will `print(bool('False'))` output?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Any non-empty string in Python evaluates to True, even the string `'False'`!",
    "hint": "Non-empty string truthiness."
  },
  {
    "id": 15,
    "question": "What will `print(10 // 3, 10 % 3)` output?",
    "options": [
      "3 1",
      "3.33 1",
      "3 0",
      "3.0 1"
    ],
    "correctAnswer": 0,
    "explanation": "Floor division 10 // 3 is 3; modulo 10 % 3 is 1.",
    "hint": "Integer division and remainder."
  },
  {
    "id": 16,
    "question": "What is the output of: `t = (1, 2, 3); print(t[1:])`?",
    "options": [
      "(2, 3)",
      "[2, 3]",
      "(1, 2)",
      "2"
    ],
    "correctAnswer": 0,
    "explanation": "Slicing a tuple produces another tuple: `(2, 3)`.",
    "hint": "Tuple slice type."
  },
  {
    "id": 17,
    "question": "What will `print('Hello'.replace('l', 'w', 1))` output?",
    "options": [
      "Hewlo",
      "Hewwo",
      "Hello",
      "wello"
    ],
    "correctAnswer": 0,
    "explanation": "The max count argument is 1, so only the first occurrence of 'l' is replaced: 'Hewlo'.",
    "hint": "Replace with max count."
  },
  {
    "id": 18,
    "question": "What is the output of: `x = 5; print(x > 2 and x < 4 or x == 5)`?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`x > 2 and x < 4` is `True and False = False`. Then `False or (5 == 5)` is True.",
    "hint": "Precedence of and over or."
  },
  {
    "id": 19,
    "question": "What will `print(list('123'))` output?",
    "options": [
      "['1', '2', '3']",
      "[1, 2, 3]",
      "['123']",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`list()` decomposes a string into a list of its individual characters: `['1', '2', '3']`.",
    "hint": "Character list conversion."
  },
  {
    "id": 20,
    "question": "What is the output of: `s = 'Python'; print(s[::2])`?",
    "options": [
      "Pto",
      "yhn",
      "Py",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Characters at indices 0 ('P'), 2 ('t'), 4 ('o'): 'Pto'.",
    "hint": "Step 2 slicing."
  },
  {
    "id": 21,
    "question": "What will `a = [10]; a.extend('20'); print(a)` output?",
    "options": [
      "[10, '2', '0']",
      "[10, '20']",
      "[10, 20]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`extend()` treats the string `'20'` as an iterable and unpacks each character: `[10, '2', '0']`.",
    "hint": "Extend with string argument."
  },
  {
    "id": 22,
    "question": "What is the output of: `print(round(4.5), round(5.5))`?",
    "options": [
      "4 6",
      "5 6",
      "4 5",
      "5 5"
    ],
    "correctAnswer": 0,
    "explanation": "Banker's rounding rounds half to nearest even integer: 4.5 -> 4, 5.5 -> 6.",
    "hint": "Round half to even."
  },
  {
    "id": 23,
    "question": "What is the output of: `x = [1, 2, 3]; del x[:2]; print(x)`?",
    "options": [
      "[3]",
      "[1, 2]",
      "[]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`del x[:2]` deletes elements at indices 0 and 1, leaving `[3]`.",
    "hint": "Slice deletion."
  },
  {
    "id": 24,
    "question": "What will `print('a' in {'a': 1, 'b': 2})` output?",
    "options": [
      "True",
      "False",
      "1",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`in` checks dictionary keys by default; 'a' is a key, returning True.",
    "hint": "Key membership."
  },
  {
    "id": 25,
    "question": "Why do examiners deduct marks if you write `['a', 'b']` instead of `'a', 'b'` for a print output?",
    "options": [
      "Because print(*list) outputs space-separated elements without brackets; writing brackets indicates you confused string output with the internal object representation",
      "Because lists are prohibited",
      "Because Python ignores brackets",
      "No marks are deducted"
    ],
    "correctAnswer": 0,
    "explanation": "Examiners evaluate whether students can accurately distinguish between formatted string output and internal container representations.",
    "hint": "Exact string output representation."
  }
];

export default questions;
