// 25 Authentic CBSE Board Examination Questions for Topic 7
const questions = [
  {
    "id": 1,
    "question": "What is the return value of `L.append(10)` in Python?",
    "options": [
      "The updated list L",
      "None",
      "The appended item 10",
      "True"
    ],
    "correctAnswer": 1,
    "explanation": "In-place list methods (append, extend, sort, reverse) mutate the list in-place and return `None`.",
    "hint": "In-place method return value."
  },
  {
    "id": 2,
    "question": "What will `L = [1, 2]; L.extend([3, 4]); print(L)` output?",
    "options": [
      "[1, 2, 3, 4]",
      "[1, 2, [3, 4]]",
      "[3, 4, 1, 2]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`extend()` unpacks each item from the argument and appends them individually: `[1, 2, 3, 4]`.",
    "hint": "Extend vs append."
  },
  {
    "id": 3,
    "question": "What will `L = [1, 2]; L.append([3, 4]); print(L)` output?",
    "options": [
      "[1, 2, 3, 4]",
      "[1, 2, [3, 4]]",
      "[1, 2]",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "`append()` appends the entire list object as a single nested element: `[1, 2, [3, 4]]`.",
    "hint": "Append adds object as single item."
  },
  {
    "id": 4,
    "question": "What happens if you execute `L = [10, 20]; L = L.sort()`?",
    "options": [
      "L is sorted in ascending order",
      "L becomes None",
      "Raises TypeError",
      "L remains unchanged"
    ],
    "correctAnswer": 1,
    "explanation": "`L.sort()` returns `None`. Reassigning `L = L.sort()` overwrites `L` with `None`.",
    "hint": "Classic in-place sorting trap."
  },
  {
    "id": 5,
    "question": "What is the output of `[x ** 2 for x in range(4)]`?",
    "options": [
      "[0, 1, 4, 9]",
      "[1, 4, 9, 16]",
      "[0, 1, 2, 3]",
      "[0, 2, 4, 6]"
    ],
    "correctAnswer": 0,
    "explanation": "Squares of 0, 1, 2, 3: `[0, 1, 4, 9]`.",
    "hint": "Basic list comprehension."
  },
  {
    "id": 6,
    "question": "What does `L.pop()` without arguments do?",
    "options": [
      "Removes and returns the first element",
      "Removes and returns the last element",
      "Clears the entire list",
      "Raises TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "`pop()` with default index -1 removes and returns the last element of the list.",
    "hint": "LIFO removal."
  },
  {
    "id": 7,
    "question": "What error is raised if `L = [1, 2]; L.remove(5)` is executed?",
    "options": [
      "IndexError",
      "ValueError: list.remove(x): x not in list",
      "KeyError",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "`remove()` raises `ValueError` if the specified target value is not found in the list.",
    "hint": "Missing item removal error."
  },
  {
    "id": 8,
    "question": "What is the output of: `matrix = [[1, 2], [3, 4]]; print(matrix[1][0])`?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 2,
    "explanation": "`matrix[1]` is `[3, 4]`. The element at index 0 of this inner list is 3.",
    "hint": "Row 1, column 0 indexing."
  },
  {
    "id": 9,
    "question": "What will `print([1, 2] * 3)` output?",
    "options": [
      "[3, 6]",
      "[1, 2, 1, 2, 1, 2]",
      "[[1, 2], [1, 2], [1, 2]]",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Multiplying a list by an integer repeats its elements: `[1, 2, 1, 2, 1, 2]`.",
    "hint": "List repetition operator."
  },
  {
    "id": 10,
    "question": "Which method inserts an element at a specific index in a list?",
    "options": [
      "L.add(idx, val)",
      "L.insert(idx, val)",
      "L.push(idx, val)",
      "L.put(idx, val)"
    ],
    "correctAnswer": 1,
    "explanation": "`insert(index, element)` places the new item at the specified position.",
    "hint": "Insert method name."
  },
  {
    "id": 11,
    "question": "What will `L = [10, 20, 30]; del L[1]; print(L)` output?",
    "options": [
      "[10, 30]",
      "[20, 30]",
      "[10, 20]",
      "[]"
    ],
    "correctAnswer": 0,
    "explanation": "`del L[1]` deletes the item at index 1 (20), leaving `[10, 30]`.",
    "hint": "del statement on index."
  },
  {
    "id": 12,
    "question": "What is the output of: `L = [1, 2, 3, 2, 1]; print(L.count(2))`?",
    "options": [
      "1",
      "2",
      "3",
      "0"
    ],
    "correctAnswer": 1,
    "explanation": "The integer 2 appears twice in the list.",
    "hint": "Counting occurrences."
  },
  {
    "id": 13,
    "question": "What does `sorted(L)` return vs `L.sort()`?",
    "options": [
      "`sorted(L)` returns a new sorted list; `L.sort()` sorts in-place and returns None",
      "Both return None",
      "Both return a new list",
      "They are identical in every way"
    ],
    "correctAnswer": 0,
    "explanation": "`sorted()` is a built-in function returning a new sorted list; `list.sort()` is an in-place mutating method returning None.",
    "hint": "Built-in function vs list method."
  },
  {
    "id": 14,
    "question": "What will `min(['apple', 'Banana', 'cherry'])` return?",
    "options": [
      "'apple'",
      "'Banana'",
      "'cherry'",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Strings are compared lexicographically by ASCII values. Uppercase 'B' (66) is less than lowercase 'a' (97), so 'Banana' is minimum.",
    "hint": "ASCII code point of uppercase vs lowercase."
  },
  {
    "id": 15,
    "question": "What is the output of `[x for x in [1, 2, 3, 4] if x % 2 != 0]`?",
    "options": [
      "[1, 3]",
      "[2, 4]",
      "[1, 2, 3, 4]",
      "[]"
    ],
    "correctAnswer": 0,
    "explanation": "Filters for odd integers: `[1, 3]`.",
    "hint": "Odd number filter."
  },
  {
    "id": 16,
    "question": "What is the output of `L = [1, 2, 3]; L.reverse(); print(L)`?",
    "options": [
      "[3, 2, 1]",
      "[1, 2, 3]",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`reverse()` inverts the order of elements in-place: `[3, 2, 1]`.",
    "hint": "In-place reversal."
  },
  {
    "id": 17,
    "question": "What does `sum([10, 20, 30], 5)` evaluate to?",
    "options": [
      "60",
      "65",
      "TypeError",
      "55"
    ],
    "correctAnswer": 1,
    "explanation": "`sum(iterable, start)` adds the start value (5) to the total sum (60) = 65.",
    "hint": "Sum with start parameter."
  },
  {
    "id": 18,
    "question": "What is the output of `L = [1, 2, 3]; L[1:2] = [20, 30]; print(L)`?",
    "options": [
      "[1, 20, 30, 3]",
      "[1, [20, 30], 3]",
      "[1, 2, 3]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Slice assignment replaces the slice `[2]` with the sequence `[20, 30]`, giving `[1, 20, 30, 3]`.",
    "hint": "Slice assignment expansion."
  },
  {
    "id": 19,
    "question": "Can a list contain another list as an element?",
    "options": [
      "Yes, creating a nested or multi-dimensional list",
      "No, lists only hold primitives",
      "Only if both lists have identical types",
      "Only up to 2 levels"
    ],
    "correctAnswer": 0,
    "explanation": "Python lists can contain elements of any data type, including other lists.",
    "hint": "Heterogenous and nested lists."
  },
  {
    "id": 20,
    "question": "What is the output of `print([] in [[]])`?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "The outer list `[[]]` contains one element, which is the empty list `[]`. Hence `[] in [[]]` is True.",
    "hint": "Nested membership."
  },
  {
    "id": 21,
    "question": "What does `L.clear()` do?",
    "options": [
      "Removes all items from the list in-place",
      "Deletes the variable name L",
      "Replaces items with None",
      "Creates an empty tuple"
    ],
    "correctAnswer": 0,
    "explanation": "`clear()` mutates the list to have 0 items (`[]`).",
    "hint": "Emptying the list."
  },
  {
    "id": 22,
    "question": "What is the output of `L = [10, 20, 30]; print(L[-1])`?",
    "options": [
      "30",
      "10",
      "20",
      "IndexError"
    ],
    "correctAnswer": 0,
    "explanation": "Negative index -1 references the last element of the list, which is 30.",
    "hint": "Last element index."
  },
  {
    "id": 23,
    "question": "What will `L = [1, 2]; L2 = L; L2.append(3); print(len(L))` output?",
    "options": [
      "2",
      "3",
      "Error",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "`L2 = L` aliases the list; both reference the same object. Mutating `L2` alters `L`, giving length 3.",
    "hint": "Reference aliasing."
  },
  {
    "id": 24,
    "question": "What is the time complexity of looking up an item by index in a Python list (`L[i]`)?",
    "options": [
      "O(1) Constant Time",
      "O(N) Linear Time",
      "O(log N)",
      "O(N^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Python lists are implemented as dynamic contiguous arrays of pointers; indexing is O(1).",
    "hint": "Contiguous array index access."
  },
  {
    "id": 25,
    "question": "Which statement will safely create a shallow copy of a list `A`?",
    "options": [
      "B = A[:]",
      "B = list(A)",
      "B = A.copy()",
      "All of the above"
    ],
    "correctAnswer": 3,
    "explanation": "All three techniques create a new independent list containing the references of the original list.",
    "hint": "Shallow copying mechanisms."
  }
];

export default questions;
