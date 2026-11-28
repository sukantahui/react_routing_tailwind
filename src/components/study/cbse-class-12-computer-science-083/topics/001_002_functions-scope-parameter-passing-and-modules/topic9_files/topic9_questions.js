// 25 Authentic CBSE Board Examination Questions for Topic 9
const questions = [
  {
    "id": 1,
    "question": "What is the official parameter passing mechanism in Python?",
    "options": [
      "Pass-by-Object-Reference (Call-by-Sharing)",
      "Pass-by-Value strictly",
      "Pass-by-Reference strictly",
      "Pass-by-Name"
    ],
    "correctAnswer": 0,
    "explanation": "Python passes object references. Formal parameters receive a reference to the actual argument object.",
    "hint": "Pass-by-Object-Reference."
  },
  {
    "id": 2,
    "question": "What happens when an immutable object (like an integer or string) is modified inside a function?",
    "options": [
      "A new object is created locally; the caller's original object remains completely unchanged",
      "The caller's variable changes",
      "Raises TypeError",
      "Memory is corrupted"
    ],
    "correctAnswer": 0,
    "explanation": "Because immutable types cannot be mutated in-place, reassigning them binds the local parameter to a new object.",
    "hint": "Immutable rebinding leaves caller intact."
  },
  {
    "id": 3,
    "question": "What will `def f(L): L.append(10); a = [1, 2]; f(a); print(a)` output?",
    "options": [
      "[1, 2, 10]",
      "[1, 2]",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Lists are mutable. `L.append(10)` modifies the shared list object in-place, which is reflected in `a`.",
    "hint": "In-place mutation affects caller."
  },
  {
    "id": 4,
    "question": "What will `def f(L): L = [10, 20]; a = [1, 2]; f(a); print(a)` output?",
    "options": [
      "[1, 2]",
      "[10, 20]",
      "[1, 2, 10, 20]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Rebinding `L = [10, 20]` points local `L` to a new list, breaking the link to `a`. `a` remains `[1, 2]`.",
    "hint": "Rebinding parameter does not affect caller."
  },
  {
    "id": 5,
    "question": "What will `def f(x): x += 5; n = 10; f(n); print(n)` output?",
    "options": [
      "10",
      "15",
      "5",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Integers are immutable. Reassigning `x += 5` creates a new integer 15 locally; `n` remains 10.",
    "hint": "Integer parameter immutability."
  },
  {
    "id": 6,
    "question": "What will `def f(s): s = s.upper(); text = 'abc'; f(text); print(text)` output?",
    "options": [
      "abc",
      "ABC",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Strings are immutable. `text` remains `'abc'` in the caller.",
    "hint": "String parameter immutability."
  },
  {
    "id": 7,
    "question": "What will `def f(d): d['status'] = 'OK'; rec = {'id': 1}; f(rec); print(rec)` output?",
    "options": [
      "{'id': 1, 'status': 'OK'}",
      "{'id': 1}",
      "{}",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Dictionaries are mutable. Mutating `d` modifies `rec` in-place.",
    "hint": "Dictionary parameter mutation."
  },
  {
    "id": 8,
    "question": "If a function modifies a mutable argument in-place, does it need to return that argument for changes to be visible in the caller?",
    "options": [
      "No, in-place modifications directly alter the object in memory and are visible immediately",
      "Yes, return is mandatory",
      "Only if it is a dictionary",
      "Only if declared global"
    ],
    "correctAnswer": 0,
    "explanation": "Because both names share the same object in memory, in-place changes are immediately visible without returning.",
    "hint": "In-place visibility."
  },
  {
    "id": 9,
    "question": "What is the output of: `def f(t): t = t + (4,); tup = (1, 2, 3); f(tup); print(tup)`?",
    "options": [
      "(1, 2, 3)",
      "(1, 2, 3, 4)",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Tuples are immutable; concatenation creates a new tuple bound locally to `t`. `tup` remains `(1, 2, 3)`.",
    "hint": "Tuple parameter immutability."
  },
  {
    "id": 10,
    "question": "What is the output of: `def f(t): t[2].append(99); tup = (1, 2, [3, 4]); f(tup); print(tup)`?",
    "options": [
      "(1, 2, [3, 4, 99])",
      "TypeError",
      "(1, 2, [3, 4])",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "The nested list at `t[2]` is mutable and modified in-place, affecting the caller's tuple.",
    "hint": "Mutable item inside passed tuple."
  },
  {
    "id": 11,
    "question": "What will `def f(a): a[0] = 'Z'; s = ['A', 'B']; f(s); print(s)` output?",
    "options": [
      "['Z', 'B']",
      "['A', 'B']",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "List subscript assignment `a[0] = 'Z'` mutates the caller's list.",
    "hint": "Subscript assignment on mutable argument."
  },
  {
    "id": 12,
    "question": "How can a caller protect a mutable list from being modified by a function?",
    "options": [
      "Pass a copy of the list using `f(my_list[:])` or `f(my_list.copy())`",
      "Pass it as a string",
      "Set list to read-only",
      "Use const keyword"
    ],
    "correctAnswer": 0,
    "explanation": "Passing a shallow or deep copy ensures any in-place mutations affect only the copy.",
    "hint": "Passing a copy."
  },
  {
    "id": 13,
    "question": "What will `def f(L): L.pop(0); data = [10, 20, 30]; f(data); print(data)` output?",
    "options": [
      "[20, 30]",
      "[10, 20, 30]",
      "[10, 20]",
      "10"
    ],
    "correctAnswer": 0,
    "explanation": "`L.pop(0)` removes the first element from `data` in-place, leaving `[20, 30]`.",
    "hint": "Pop mutates list in-place."
  },
  {
    "id": 14,
    "question": "What will `def f(x): x = x * 2; v = 5; f(v); print(v)` output?",
    "options": [
      "5",
      "10",
      "25",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Integer `v` is immutable; `v` remains 5.",
    "hint": "Immutable integer."
  },
  {
    "id": 15,
    "question": "What is printed by: `def f(a, b): a, b = b, a; x, y = 1, 2; f(x, y); print(x, y)`?",
    "options": [
      "1 2",
      "2 1",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "The swap rebinds local parameters `a` and `b`. The caller variables `x` and `y` are untouched: `1 2`.",
    "hint": "Swapping local parameters."
  },
  {
    "id": 16,
    "question": "What will `def f(L): L += [4]; a = [1, 2, 3]; f(a); print(a)` output?",
    "options": [
      "[1, 2, 3, 4]",
      "[1, 2, 3]",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "On lists, `+=` calls `extend()` in-place, mutating the caller's list to `[1, 2, 3, 4]`.",
    "hint": "Augmented assignment on list mutates in-place."
  },
  {
    "id": 17,
    "question": "What will `def f(t): t += (4,); a = (1, 2, 3); f(a); print(a)` output?",
    "options": [
      "(1, 2, 3)",
      "(1, 2, 3, 4)",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "On tuples, `+=` creates a new tuple and rebinds local `t`. The caller's tuple `a` remains `(1, 2, 3)`.",
    "hint": "Augmented assignment on immutable type."
  },
  {
    "id": 18,
    "question": "Why is Python's model called Call-by-Sharing?",
    "options": [
      "Because function arguments are shared between caller and callee as references to the same objects",
      "Because memory is shared on the network",
      "Because code is open-source",
      "Because CPU cores share tasks"
    ],
    "correctAnswer": 0,
    "explanation": "The caller and callee share identical objects in memory via their references.",
    "hint": "Shared object references."
  },
  {
    "id": 19,
    "question": "What will `def f(s): s.clear(); items = {1, 2, 3}; f(items); print(items)` output?",
    "options": [
      "set()",
      "{1, 2, 3}",
      "{}",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Sets are mutable. `s.clear()` empties the set in-place, leaving `set()`.",
    "hint": "Set in-place clear."
  },
  {
    "id": 20,
    "question": "What is the output of: `def f(L): L.reverse(); a = [1, 2, 3]; f(a); print(a)`?",
    "options": [
      "[3, 2, 1]",
      "[1, 2, 3]",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`L.reverse()` reverses `a` in-place, producing `[3, 2, 1]`.",
    "hint": "In-place reverse mutation."
  },
  {
    "id": 21,
    "question": "What is the output of: `def f(L): return sorted(L); a = [3, 1, 2]; f(a); print(a)`?",
    "options": [
      "[3, 1, 2]",
      "[1, 2, 3]",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`sorted()` creates a new list without mutating the original list `a`. `a` remains `[3, 1, 2]`.",
    "hint": "sorted does not mutate."
  },
  {
    "id": 22,
    "question": "What will `def f(d): d.clear(); student = {'name': 'Roy'}; f(student); print(student)` output?",
    "options": [
      "{}",
      "{'name': 'Roy'}",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`d.clear()` mutates the dictionary in-place to `{}`.",
    "hint": "Dictionary clear mutation."
  },
  {
    "id": 23,
    "question": "What is the output of: `def f(x): x = None; a = 100; f(a); print(a)`?",
    "options": [
      "100",
      "None",
      "Error",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Rebinding `x = None` changes local `x` only; `a` remains 100.",
    "hint": "Rebinding parameter to None."
  },
  {
    "id": 24,
    "question": "What happens if a function modifies an element of a nested list inside an immutable tuple?",
    "options": [
      "The nested list is mutated and the change is reflected in the caller",
      "TypeError",
      "The tuple is deleted",
      "Raises ScopeError"
    ],
    "correctAnswer": 0,
    "explanation": "The nested list is mutable and modified in-place through its reference.",
    "hint": "Nested mutable modification."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, what is the key distinction to state regarding parameter passing?",
    "options": [
      "Mutable arguments can be altered in-place by functions, whereas immutable arguments cannot be altered in-place",
      "Python uses C pointers",
      "All arguments change",
      "No arguments change"
    ],
    "correctAnswer": 0,
    "explanation": "The board mark scheme explicitly expects students to differentiate mutable vs immutable parameter behavior.",
    "hint": "Core CBSE board distinction."
  }
];

export default questions;
