export default [
  {
    "setId": 1,
    "title": "Set 1: Python Tokens, Data Types & Expression Evaluation",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following is an invalid identifier in Python and why?\\n(a) _eval\\n(b) 2nd_name\\n(c) my_var\\n(d) Total_100",
            "solution": "(b) 2nd_name is invalid because Python identifier rules strictly state that variable names cannot begin with a digit (0-9).",
            "markingScheme": "1 Mark for identifying (b) with the correct reason (cannot start with a digit)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Evaluate the following Python expression following operator precedence rules:\\nprint(16 // 3 * 2 ** 3 - 5 + 4 % 3)",
            "solution": "Step 1: Exponentiation: 2 ** 3 = 8.\\nStep 2: Floor division: 16 // 3 = 5.\\nStep 3: Multiplication: 5 * 8 = 40.\\nStep 4: Modulus: 4 % 3 = 1.\\nStep 5: Left-to-right addition/subtraction: 40 - 5 + 1 = 36.\\nOutput: 36",
            "markingScheme": "1 Mark for correct step-by-step evaluation resulting in 36."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Identify the mutable data type among the following:\\n(a) tuple\\n(b) str\\n(c) list\\n(d) int",
            "solution": "(c) list. Lists can be modified in-place (elements can be added, updated, or deleted) without changing their memory address (id). Tuples, strings, and integers are immutable.",
            "markingScheme": "1 Mark for identifying (c) list."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the data type of the variable 'result' after executing:\\nresult = 15 > 10 and 'apple' < 'banana'",
            "solution": "Data type: bool (Boolean). Both conditions evaluate to True, so True and True yields boolean True.",
            "markingScheme": "1 Mark for stating 'bool' or 'Boolean'."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output of the following Python code snippet:\\ns = 'CBSE-Exam-2026'\\nprint(s[1:8:2] + ' ' + s[::-3])",
            "solution": "Part 1: s[1:8:2]\\nIndices 1, 3, 5, 7: s[1]='B', s[3]='E', s[5]='E', s[7]='a' -> 'BEEa'\\nPart 2: s[::-3]\\nStep -3 from end (length 14, last index 13):\\ns[13]='6', s[10]='0', s[7]='a', s[4]='-', s[1]='B' -> '60a-B'\\nCombined output: BEEa 60a-B",
            "markingScheme": "1 Mark for s[1:8:2] ('BEEa'), 1 Mark for s[::-3] ('60a-B'). Total: 2 Marks."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Identify and correct the syntax errors in the following code. Underline each correction:\\nval = input('Enter a number: ')\\nif val % 2 = 0:\\n    print 'Even number'\\nelse\\n    print('Odd number')",
            "solution": "Corrected Code:\\nval = int(input('Enter a number: '))     # Error 1: Must convert string to int\\nif val % 2 == 0:                         # Error 2: == for equality, not assignment =\\n    print('Even number')                 # Error 3: print() requires parentheses\\nelse:                                    # Error 4: Missing colon : after else\\n    print('Odd number')",
            "markingScheme": "0.5 Marks for each corrected and underlined error (4 errors * 0.5 = 2 Marks)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Trace the execution of the following nested loop and write its exact output along with a dry-run table:\\ntotal = 0\\nfor i in range(1, 4):\\n    for j in range(i, 0, -1):\\n        total += i * j\\nprint('Total:', total)",
            "solution": "Dry-Run Table:\\n* i=1: j=1 -> total += 1*1 = 1\\n* i=2: j=2 -> total += 2*2 = 5; j=1 -> total += 2*1 = 7\\n* i=3: j=3 -> total += 3*3 = 16; j=2 -> total += 3*2 = 22; j=1 -> total += 3*1 = 25\\nFinal Output:\\nTotal: 25",
            "markingScheme": "1.5 Marks for step-by-step dry-run iterations, 1.5 Marks for final output Total: 25."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Differentiate between 'break' and 'continue' statements in Python. Provide a clear code example showing the distinct behavior of each.",
            "solution": "1. 'break': Terminates the loop immediately and transfers control to the statement following the loop.\\n2. 'continue': Skips the rest of the current iteration and jumps directly to the next iteration of the loop.\\nExample:\\nfor i in range(1, 6):\\n    if i == 3: break      # Output: 1, 2\\nfor i in range(1, 6):\\n    if i == 3: continue   # Output: 1, 2, 4, 5",
            "markingScheme": "1 Mark for definition of break, 1 Mark for definition of continue, 1 Mark for illustrative code snippet."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python program to do the following:\\n(a) Input a string containing mixed uppercase, lowercase, digits, and special symbols from the user.\\n(b) Count and display the total number of vowels, consonants, digits, and whitespace characters.\\n(c) Construct and print a new string where all vowels are replaced with '*', and lowercase consonants are converted to uppercase.",
            "solution": "def process_text():\\n    s = input('Enter a string: ')\\n    vowels = 'aeiouAEIOU'\\n    v_cnt = c_cnt = d_cnt = w_cnt = 0\\n    new_s = ''\\n    for ch in s:\\n        if ch.isalpha():\\n            if ch in vowels:\\n                v_cnt += 1\\n                new_s += '*'\\n            else:\\n                c_cnt += 1\\n                new_s += ch.upper()\\n        elif ch.isdigit():\\n            d_cnt += 1\\n            new_s += ch\\n        elif ch.isspace():\\n            w_cnt += 1\\n            new_s += ch\\n        else:\\n            new_s += ch\\n    print(f'Vowels: {v_cnt}, Consonants: {c_cnt}, Digits: {d_cnt}, Spaces: {w_cnt}')\\n    print('Modified String:', new_s)\\n\\nprocess_text()",
            "markingScheme": "1 Mark for input and counter initialization, 2 Marks for correct counting logic, 2 Marks for modified string construction, 1 Mark for clean display of results. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Strings, Slicing & Sequence Algorithms",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the output of: print('Cyber'[1:-1])?",
            "solution": "Index 1 is 'y'. Index -1 is the last character 'r' (exclusive). Output: 'ybe'",
            "markingScheme": "1 Mark for 'ybe'."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which string method checks whether all characters in a string are digits?\\n(a) isalpha()\\n(b) isdigit()\\n(c) isalnum()\\n(d) isspace()",
            "solution": "(b) isdigit(). Returns True if all characters in the string are digits.",
            "markingScheme": "1 Mark for (b) isdigit()."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "State whether True or False: Strings in Python are mutable and support item assignment like s[0] = 'X'.",
            "solution": "False. Strings in Python are immutable; attempting item assignment raises a TypeError.",
            "markingScheme": "1 Mark for False with reason (strings are immutable)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What does the expression 'India' * 2 + '!' evaluate to?",
            "solution": "'IndiaIndia!'. String repetition (*) precedes concatenation (+).",
            "markingScheme": "1 Mark for 'IndiaIndia!'."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output of the following code:\\ntxt = 'Pre-Board-Exam'\\nlst = txt.split('-')\\nprint('#'.join(lst[::-1]))",
            "solution": "lst is ['Pre', 'Board', 'Exam'].\\nlst[::-1] is ['Exam', 'Board', 'Pre'].\\n'#'.join(...) produces 'Exam#Board#Pre'.",
            "markingScheme": "1 Mark for split and reverse list, 1 Mark for join result 'Exam#Board#Pre'."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output of the following code snippet:\\ndef check(w):\\n    return w == w[::-1]\\nprint(check('Madam'.lower()), check('Python'))",
            "solution": "'Madam'.lower() is 'madam'. Reverse is 'madam', so True.\\n'Python'[::-1] is 'nohtyP', so False.\\nOutput: True False",
            "markingScheme": "1 Mark for True, 1 Mark for False."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the difference between find() and index() methods in Python strings with suitable code examples.",
            "solution": "1. s.find(sub): Returns the lowest index where sub is found. If sub is NOT found, it returns -1.\\n2. s.index(sub): Similar to find(), but raises a ValueError exception if sub is NOT found.\\nExample:\\n'hello'.find('z')  # Returns -1\\n'hello'.index('z') # Raises ValueError: substring not found",
            "markingScheme": "1.5 Marks for explanation, 1.5 Marks for examples highlighting -1 vs ValueError."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output of the following program:\\nmsg = 'Computer'\\nres = ''\\nfor i in range(len(msg)):\\n    if i % 2 == 0:\\n        res += msg[i].upper()\\n    else:\\n        res += str(i)\\nprint(res)",
            "solution": "Dry-run:\\n* i=0: 'C' (msg[0].upper())\\n* i=1: '1'\\n* i=2: 'M'\\n* i=3: '3'\\n* i=4: 'U'\\n* i=5: '5'\\n* i=6: 'E'\\n* i=7: '7'\\nOutput: C1M3U5E7",
            "markingScheme": "1.5 Marks for dry-run step analysis, 1.5 Marks for final output C1M3U5E7."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program to accept a line of text and do the following:\\n(a) Find and display the longest word in the sentence.\\n(b) Count the frequency of each unique word in the sentence and display it in dictionary format.",
            "solution": "sentence = input('Enter sentence: ')\\nwords = sentence.split()\\nlongest = max(words, key=len) if words else ''\\nprint('Longest Word:', longest)\\nfreq = {}\\nfor w in words:\\n    w_clean = w.lower()\\n    freq[w_clean] = freq.get(w_clean, 0) + 1\\nprint('Word Frequencies:', freq)",
            "markingScheme": "1 Mark for input and word tokenization, 2 Marks for longest word logic, 2 Marks for dictionary frequency counting, 1 Mark for formatted output. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Lists, Nested Lists & Manipulation Algorithms",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the result of [1, 2] * 3?",
            "solution": "[1, 2, 1, 2, 1, 2]. List replication repeats elements in order.",
            "markingScheme": "1 Mark for [1, 2, 1, 2, 1, 2]."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the difference between list.append(x) and list.extend(x) when x = [3, 4]?",
            "solution": "append adds [3, 4] as a single nested element: [..., [3, 4]]; extend adds elements individually: [..., 3, 4].",
            "markingScheme": "1 Mark for explaining nested list vs individual element appending."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which method removes and returns the last element of a list?",
            "solution": "pop(). list.pop() removes and returns the last item.",
            "markingScheme": "1 Mark for pop()."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What does len([[1, 2], [3, 4], [5]]) return?",
            "solution": "3. The outer list contains 3 sub-lists.",
            "markingScheme": "1 Mark for 3."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\\nnums = [10, 20, 30, 40, 50]\\nnums[1:4] = [25, 35]\\nprint(nums)",
            "solution": "Slice [1:4] (elements 20, 30, 40) is replaced by [25, 35].\\nOutput: [10, 25, 35, 50]",
            "markingScheme": "2 Marks for correct list slice replacement [10, 25, 35, 50]."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output of:\\na = [1, 2, 3]\\nb = a\\nb.append(4)\\nprint(a, b)",
            "solution": "Both 'a' and 'b' refer to the same mutable list in memory. Modifying 'b' also updates 'a'.\\nOutput: [1, 2, 3, 4] [1, 2, 3, 4]",
            "markingScheme": "2 Marks for identifying aliasing/reference behavior."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a Python function to swap adjacent elements of a list of even length. Example: [1, 2, 3, 4] -> [2, 1, 4, 3].",
            "solution": "def swap_adjacent(lst):\\n    for i in range(0, len(lst) - 1, 2):\\n        lst[i], lst[i+1] = lst[i+1], lst[i]\\n    return lst\\n# Test: print(swap_adjacent([1, 2, 3, 4, 5, 6]))",
            "markingScheme": "1 Mark for loop range(0, len, 2), 1.5 Marks for simultaneous swap, 0.5 Marks for return."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\\ndiag_sum = sum(matrix[i][i] for i in range(3))\\nanti_diag = sum(matrix[i][2-i] for i in range(3))\\nprint(diag_sum, anti_diag)",
            "solution": "Main diagonal: matrix[0][0] + matrix[1][1] + matrix[2][2] = 1 + 5 + 9 = 15.\\nAnti-diagonal: matrix[0][2] + matrix[1][1] + matrix[2][0] = 3 + 5 + 7 = 15.\\nOutput: 15 15",
            "markingScheme": "1.5 Marks for main diagonal calculation, 1.5 Marks for anti-diagonal calculation."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a program to input a list of integers from the user and:\\n(a) Shift all negative numbers to the left and positive numbers to the right without changing their relative order.\\n(b) Find and display the second highest number in the list without using the sort() function.",
            "solution": "def rearrange_and_second_max():\\n    nums = list(map(int, input('Enter numbers separated by space: ').split()))\\n    negs = [x for x in nums if x < 0]\\n    pos = [x for x in nums if x >= 0]\\n    rearranged = negs + pos\\n    print('Rearranged:', rearranged)\\n    unique_nums = list(set(nums))\\n    if len(unique_nums) >= 2:\\n        highest = max(unique_nums)\\n        unique_nums.remove(highest)\\n        second_highest = max(unique_nums)\\n        print('Second Highest:', second_highest)\\n    else:\\n        print('Insufficient unique numbers.')\\nrearrange_and_second_max()",
            "markingScheme": "3 Marks for correct negative/positive partition preserving order, 3 Marks for second largest determination without sort(). Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Tuples, Immutability & Packing/Unpacking",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following creates a single-element tuple in Python?\\n(a) t = (5)\\n(b) t = (5,)\\n(c) t = tuple(5)\\n(d) t = [5]",
            "solution": "(b) t = (5,). The trailing comma distinguishes a tuple from a parenthesized integer expression.",
            "markingScheme": "1 Mark for (b) t = (5,)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What error occurs when executing: t = (10, 20); t[0] = 99?",
            "solution": "TypeError: 'tuple' object does not support item assignment.",
            "markingScheme": "1 Mark for TypeError (immutability violation)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is tuple unpacking? Give a 1-line example.",
            "solution": "Extracting tuple values into multiple variables: a, b = (10, 20).",
            "markingScheme": "1 Mark for definition and 1-line example."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Can a tuple contain a mutable list as an element?",
            "solution": "Yes, e.g. t = (1, [2, 3]). The tuple reference is immutable, but the nested list can be modified.",
            "markingScheme": "1 Mark for Yes with valid explanation."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output of:\\nt = (1, [2, 3], 4)\\nt[1].append(99)\\nprint(t)",
            "solution": "Output: (1, [2, 3, 99], 4). The list inside the tuple is mutated in place.",
            "markingScheme": "2 Marks for correct output showing modified list inside tuple."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is the output of:\\nt = (10, 20, 30, 20, 40, 20)\\nprint(t.count(20), t.index(20))",
            "solution": "t.count(20) is 3.\\nt.index(20) is 1 (the first occurrence index).\\nOutput: 3 1",
            "markingScheme": "1 Mark for count 3, 1 Mark for index 1."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain why tuples can be used as dictionary keys while lists cannot. Give an example.",
            "solution": "Dictionary keys must be 'hashable' and immutable. Tuples are immutable and therefore hashable, whereas lists are mutable and unhashable (raises TypeError: unhashable type: 'list').\\nExample:\\nvalid_dict = {(1, 2): 'Point A'} # Valid\\ninvalid_dict = {[1, 2]: 'Point A'} # Raises TypeError",
            "markingScheme": "1.5 Marks for immutability & hashability explanation, 1.5 Marks for code examples."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function that takes a tuple of numbers and returns a new tuple containing only the prime numbers.",
            "solution": "def filter_primes(t):\\n    def is_prime(n):\\n        if n < 2: return False\\n        for i in range(2, int(n**0.5) + 1):\\n            if n % i == 0: return False\\n        return True\\n    return tuple(x for x in t if is_prime(x))",
            "markingScheme": "1.5 Marks for is_prime logic, 1.5 Marks for tuple comprehension construction."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a program that takes a list of student records where each record is a tuple: (RollNo, Name, Marks).\\n(a) Find and print the topper's name and marks.\\n(b) Calculate and display the class average marks.\\n(c) Separate and display students who scored above average in a new tuple.",
            "solution": "students = [\\n    (101, 'Aman', 92),\\n    (102, 'Pooja', 78),\\n    (103, 'Rohan', 88),\\n    (104, 'Sneha', 95)\\n]\\ntopper = max(students, key=lambda s: s[2])\\nprint(f'Topper: {topper[1]} with {topper[2]} marks')\\navg = sum(s[2] for s in students) / len(students)\\nprint(f'Average Marks: {avg:.2f}')\\nabove_avg = tuple(s[1] for s in students if s[2] > avg)\\nprint('Above Average Students:', above_avg)",
            "markingScheme": "2 Marks for topper finding, 2 Marks for average calculation, 2 Marks for above-average tuple creation. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Dictionaries, Key-Value Pairs & Hashing",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which dictionary method returns the value for a key if present, or a default value without raising KeyError?",
            "solution": "get(). d.get(key, default) avoids KeyError.",
            "markingScheme": "1 Mark for get()."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Can two different keys in a dictionary hold the same value?",
            "solution": "Yes, keys must be unique, but multiple keys can map to the same value.",
            "markingScheme": "1 Mark for Yes."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does list(d.keys()) return for d = {'a': 1, 'b': 2}?",
            "solution": "['a', 'b'].",
            "markingScheme": "1 Mark for ['a', 'b']."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the output of len({'x': 1, 'x': 2, 'x': 3})?",
            "solution": "1. Duplicate keys overwrite previous entries, leaving only {'x': 3}.",
            "markingScheme": "1 Mark for 1."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\\nd = {'Math': 90, 'Science': 85}\\nfor k, v in d.items():\\n    print(k[:3], v + 5)",
            "solution": "Output:\\nMat 95\\nSci 90",
            "markingScheme": "1 Mark for 'Mat 95', 1 Mark for 'Sci 90'."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output:\\nd = {1: 'A', 2: 'B', 3: 'C'}\\nprint(d.pop(2), d)",
            "solution": "pop(2) returns 'B' and removes key 2.\\nOutput: B {1: 'A', 3: 'C'}",
            "markingScheme": "1 Mark for returned value 'B', 1 Mark for remaining dictionary {1: 'A', 3: 'C'}."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function invert_dict(d) that swaps keys and values of a dictionary. Assume all values are unique and hashable.",
            "solution": "def invert_dict(d):\\n    return {v: k for k, v in d.items()}\\n# Example:\\nprint(invert_dict({'a': 1, 'b': 2})) # {1: 'a', 2: 'b'}",
            "markingScheme": "1.5 Marks for dictionary comprehension or loop logic, 1.5 Marks for correct key-value inversion."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\nd = {}\\nfor c in 'mississippi':\\n    d[c] = d.get(c, 0) + 1\\nprint(sorted(d.items()))",
            "solution": "Frequencies:\\n'm': 1, 'i': 4, 's': 4, 'p': 2.\\nSorted by key alphabetically:\\n[('i', 4), ('m', 1), ('p', 2), ('s', 4)]",
            "markingScheme": "1.5 Marks for frequency counts, 1.5 Marks for sorted items output."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a program to manage an employee database using a nested dictionary where EmpId is the key and details are a dictionary {'Name': str, 'Dept': str, 'Salary': float}.\\n(a) Add 3 employee records.\\n(b) Display all employees belonging to the 'IT' department.\\n(c) Increase the salary of all employees by 10% and display updated records.",
            "solution": "employees = {\\n    101: {'Name': 'Amit', 'Dept': 'IT', 'Salary': 50000},\\n    102: {'Name': 'Priya', 'Dept': 'HR', 'Salary': 45000},\\n    103: {'Name': 'Rohan', 'Dept': 'IT', 'Salary': 60000}\\n}\\nprint('IT Employees:')\\nfor emp_id, info in employees.items():\\n    if info['Dept'] == 'IT':\\n        print(f'{emp_id}: {info[\"Name\"]}')\\nprint('\\nUpdating Salaries by 10%:')\\nfor info in employees.values():\\n    info['Salary'] *= 1.10\\nprint(employees)",
            "markingScheme": "2 Marks for nested dictionary structure, 2 Marks for department filtering, 2 Marks for in-place salary increment. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Conditionals, Loops & Output Tracing Drills",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the output of print(bool(0), bool('False'), bool([]))?",
            "solution": "False True False. 0 and [] are falsy; non-empty string 'False' is truthy.",
            "markingScheme": "1 Mark for False True False."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "How many times will this loop execute: for i in range(10, 2, -3)?",
            "solution": "3 times (values: 10, 7, 4).",
            "markingScheme": "1 Mark for 3 times."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does the 'pass' statement do in a Python loop or conditional block?",
            "solution": "It acts as a null operation/placeholder; nothing happens when it executes.",
            "markingScheme": "1 Mark for null operation/placeholder."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the output of 5 < 10 < 15 > 8?",
            "solution": "True. Python supports chained comparisons: (5 < 10) and (10 < 15) and (15 > 8) = True.",
            "markingScheme": "1 Mark for True with chained comparison explanation."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output:\\nx = 1\\nwhile x < 20:\\n    x = x * 2 + 1\\n    if x == 7: continue\\n    print(x, end=' ')",
            "solution": "x=1 -> x=1*2+1=3 -> print 3\\nx=3 -> x=3*2+1=7 -> continue (skipped)\\nx=7 -> x=7*2+1=15 -> print 15\\nx=15 -> x=15*2+1=31 -> print 31 -> loop ends.\\nOutput: 3 15 31 ",
            "markingScheme": "2 Marks for exact output 3 15 31."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Predict the output:\\nfor i in range(1, 4):\\n    for j in range(1, i + 1):\\n        print(j, end='')\\n    print()",
            "solution": "Output:\\n1\\n12\\n123",
            "markingScheme": "2 Marks for correct triangular pattern."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Rewrite the following nested if-else code into a single, clean if statement using logical operators:\\nif a > 0:\\n    if b > 0:\\n        if c > 0:\\n            print('All positive')",
            "solution": "if a > 0 and b > 0 and c > 0:\\n    print('All positive')",
            "markingScheme": "3 Marks for correct compound boolean expression with 'and'."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\ns = 0\\nfor i in range(1, 10):\\n    if i % 3 == 0:\\n        s += i\\n    elif i % 2 == 0:\\n        continue\\n    else:\\n        s -= 1\\nprint('s =', s)",
            "solution": "Dry-run:\\n* i=1: s = -1\\n* i=2: even -> continue\\n* i=3: s += 3 -> s = 2\\n* i=4: even -> continue\\n* i=5: s -= 1 -> s = 1\\n* i=6: s += 6 -> s = 7\\n* i=7: s -= 1 -> s = 6\\n* i=8: even -> continue\\n* i=9: s += 9 -> s = 15\\nOutput: s = 15",
            "markingScheme": "1.5 Marks for dry-run trace, 1.5 Marks for s = 15."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a program to input an integer N and:\\n(a) Check and display whether N is an Armstrong number (sum of cubes of its digits equals the number, for 3-digit numbers).\\n(b) Display all Armstrong numbers between 100 and 999.",
            "solution": "def is_armstrong(n):\\n    digits = [int(d) for d in str(n)]\\n    return sum(d**3 for d in digits) == n\\nnum = int(input('Enter number: '))\\nif is_armstrong(num):\\n    print(f'{num} is an Armstrong number.')\\nelse:\\n    print(f'{num} is NOT an Armstrong number.')\\nprint('All 3-digit Armstrong numbers:')\\narmstrongs = [x for x in range(100, 1000) if is_armstrong(x)]\\nprint(armstrongs)",
            "markingScheme": "2 Marks for single number check logic, 3 Marks for finding range 100-999 (153, 370, 371, 407), 1 Mark for clean display. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Error Types, Exception Handling & Debugging",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which type of error occurs when you write 'prnit('Hello')'?",
            "solution": "NameError (Runtime error, as 'prnit' is not defined).",
            "markingScheme": "1 Mark for NameError."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What exception is raised when executing int('hello')?",
            "solution": "ValueError (invalid literal for int() with base 10).",
            "markingScheme": "1 Mark for ValueError."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What exception is raised when trying to access index 5 in a 3-element list?",
            "solution": "IndexError: list index out of range.",
            "markingScheme": "1 Mark for IndexError."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the difference between a Syntax Error and a Logical Error?",
            "solution": "Syntax errors violate language grammar and prevent execution; logical errors produce wrong results while code runs cleanly.",
            "markingScheme": "1 Mark for grammar violation vs wrong program result."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output:\\ntry:\\n    a = 10 / 0\\nexcept ZeroDivisionError:\\n    print('Cannot divide by zero!')\\nfinally:\\n    print('Cleanup complete.')",
            "solution": "Output:\\nCannot divide by zero!\\nCleanup complete.",
            "markingScheme": "1 Mark for except block message, 1 Mark for finally block message."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Underline and correct the errors in the following code:\\nnum = int(input(Enter value: ))\\nfor i in range(1; num):\\n    if i % 2 = 0\\n        print(i)",
            "solution": "Corrected Code:\\nnum = int(input('Enter value: ')) # 1. Quotes inside input()\\nfor i in range(1, num):           # 2. Comma instead of semicolon in range()\\n    if i % 2 == 0:                # 3. Equality == and trailing colon :\\n        print(i)",
            "markingScheme": "0.5 Marks for each corrected and underlined error."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the purpose of 'try-except-else-finally' blocks in Python with a structured code example.",
            "solution": "1. try: Code that may raise an exception.\\n2. except: Code that handles the exception.\\n3. else: Runs ONLY if no exception occurred in the try block.\\n4. finally: Runs ALWAYS regardless of whether an exception occurred or not.\\nExample:\\ntry:\\n    x = int(input())\\nexcept ValueError:\\n    print('Invalid input')\\nelse:\\n    print('Valid number entered:', x)\\nfinally:\\n    print('Execution done')",
            "markingScheme": "1.5 Marks for block explanations, 1.5 Marks for structured code example."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Identify the type of error (Syntax, Logical, or Runtime) in each of the following:\\n(a) 10 * (2 + 3\\n(b) avg = sum / 0\\n(c) Calculating area of rectangle as area = 2 * (length + breadth)",
            "solution": "(a) Syntax Error (unmatched closing parenthesis).\\n(b) Runtime Error (ZeroDivisionError).\\n(c) Logical Error (calculating perimeter instead of length * breadth).",
            "markingScheme": "1 Mark each for (a) Syntax, (b) Runtime, (c) Logical. Total: 3 Marks."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a robust Python program that takes two inputs from the user and performs division (a / b):\\n(a) Handle ValueError if non-numeric values are entered.\\n(b) Handle ZeroDivisionError if b is zero.\\n(c) Ensure the program prompts repeatedly until valid inputs are provided, and displays the result with 2 decimal places.",
            "solution": "def safe_division():\\n    while True:\\n        try:\\n            a = float(input('Enter numerator: '))\\n            b = float(input('Enter denominator: '))\\n            result = a / b\\n            print(f'Result: {result:.2f}')\\n            break\\n        except ValueError:\\n            print('Error: Please enter valid numeric values!')\\n        except ZeroDivisionError:\\n            print('Error: Denominator cannot be zero!')\\nsafe_division()",
            "markingScheme": "2 Marks for while loop and input handling, 2 Marks for ValueError handling, 2 Marks for ZeroDivisionError handling. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Operators, Precedence & Type Conversions",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the difference between '/' and '//' operators in Python?",
            "solution": "'/' performs floating-point division (returns float); '//' performs floor division (truncates towards negative infinity).",
            "markingScheme": "1 Mark for float division vs floor integer division."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the output of print(not 0 and 1)?",
            "solution": "1. 'not 0' is True; True and 1 returns 1.",
            "markingScheme": "1 Mark for 1."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the associativity of the exponentiation operator (**)?\\n(a) Left to right\\n(b) Right to left",
            "solution": "(b) Right to left. 2 ** 3 ** 2 evaluates as 2 ** (3 ** 2) = 2 ** 9 = 512.",
            "markingScheme": "1 Mark for (b) Right to left."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Evaluate: print(bool(''), bool('0'), bool(None))",
            "solution": "False True False.",
            "markingScheme": "1 Mark for False True False."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Evaluate step-by-step: x = 2 ** 3 ** 2 // 4 + 7 % 3",
            "solution": "1. 3 ** 2 = 9\\n2. 2 ** 9 = 512\\n3. 512 // 4 = 128\\n4. 7 % 3 = 1\\n5. 128 + 1 = 129\\nOutput: 129",
            "markingScheme": "2 Marks for step-by-step evaluation yielding 129."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is the difference between '==' and 'is' operators? Give a code example.",
            "solution": "'==' checks value equality; 'is' checks identity (same memory address).\\nExample:\\na = [1, 2]\\nb = [1, 2]\\nprint(a == b) # True (same values)\\nprint(a is b) # False (different objects in memory)",
            "markingScheme": "1 Mark for explanation, 1 Mark for code example."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain Implicit Type Conversion vs Explicit Type Conversion with suitable code snippets.",
            "solution": "1. Implicit: Python automatically promotes smaller types to larger types without data loss (e.g. int + float -> float: 5 + 2.0 -> 7.0).\\n2. Explicit (Type Casting): The programmer manually converts types using constructor functions like int(), float(), str() (e.g. int('123') -> 123).",
            "markingScheme": "1.5 Marks for implicit conversion explanation & example, 1.5 Marks for explicit conversion explanation & example."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\na, b, c = 10, 20, 30\\nres = (a < b and b < c) or (a + b == c and c - b != a)\\nprint('Result:', res)",
            "solution": "1. (10 < 20 and 20 < 30) -> True and True -> True\\n2. Since left side of 'or' is True, short-circuit evaluation yields True immediately.\\nOutput: Result: True",
            "markingScheme": "1.5 Marks for short-circuit boolean evaluation, 1.5 Marks for output Result: True."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a menu-driven Python program to implement a temperature conversion utility:\\n1. Celsius to Fahrenheit: F = (C * 9/5) + 32\\n2. Fahrenheit to Celsius: C = (F - 32) * 5/9\\n3. Exit\\nEnsure proper input validation and clean formatted display.",
            "solution": "def temp_converter():\\n    while True:\\n        print('\\n--- TEMPERATURE CONVERTER ---')\\n        print('1. Celsius to Fahrenheit')\\n        print('2. Fahrenheit to Celsius')\\n        print('3. Exit')\\n        choice = input('Enter choice (1-3): ')\\n        if choice == '1':\\n            c = float(input('Enter temp in Celsius: '))\\n            f = (c * 9/5) + 32\\n            print(f'{c}°C = {f:.2f}°F')\\n        elif choice == '2':\\n            f = float(input('Enter temp in Fahrenheit: '))\\n            c = (f - 32) * 5/9\\n            print(f'{f}°F = {c:.2f}°C')\\n        elif choice == '3':\\n            print('Exiting utility. Goodbye!')\\n            break\\n        else:\\n            print('Invalid choice! Please select 1, 2, or 3.')\\ntemp_converter()",
            "markingScheme": "2 Marks for menu loop and input validation, 2 Marks for Celsius conversion, 2 Marks for Fahrenheit conversion. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Nested Loops, Patterns & Algorithmic Tracing",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the output of: print(*range(1, 5), sep='-')?",
            "solution": "1-2-3-4. Unpacking with sep='-' separates elements with hyphens.",
            "markingScheme": "1 Mark for 1-2-3-4."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is an infinite loop? Give an example.",
            "solution": "A loop that never terminates because its condition is always True: while True: pass.",
            "markingScheme": "1 Mark for definition and example."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the output of print(list(range(5, 0, -1)))?",
            "solution": "[5, 4, 3, 2, 1].",
            "markingScheme": "1 Mark for [5, 4, 3, 2, 1]."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "How many asterisks are printed by:\\nfor i in range(3):\\n    for j in range(2):\\n        print('*', end='')",
            "solution": "6 asterisks (3 * 2 = 6).",
            "markingScheme": "1 Mark for 6."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\\nfor i in range(1, 5):\\n    print(' ' * (4 - i) + '*' * (2 * i - 1))",
            "solution": "Output (Pyramid pattern):\\n   *\\n  ***\\n *****\\n*******",
            "markingScheme": "2 Marks for correct 4-line centered pyramid pattern."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output:\\nk = 1\\nfor i in range(1, 4):\\n    for j in range(i):\\n        print(k, end=' ')\\n        k += 1\\n    print()",
            "solution": "Output (Floyd's triangle):\\n1 \\n2 3 \\n4 5 6 ",
            "markingScheme": "2 Marks for correct Floyd's triangle output."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Trace the output with a dry-run table:\\ncnt = 0\\nfor a in range(1, 4):\\n    for b in range(1, 4):\\n        if a == b:\\n            continue\\n        cnt += 1\\nprint('Total non-diagonal pairs:', cnt)",
            "solution": "Dry-run:\\nTotal pairs = 3 * 3 = 9.\\nDiagonal pairs where a == b are (1,1), (2,2), (3,3) = 3 pairs (skipped by continue).\\nRemaining pairs = 9 - 3 = 6.\\nOutput: Total non-diagonal pairs: 6",
            "markingScheme": "1.5 Marks for dry-run analysis, 1.5 Marks for output 6."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a program snippet to print the following alphabet triangle:\\nA\\nA B\\nA B C\\nA B C D",
            "solution": "for i in range(1, 5):\\n    for j in range(i):\\n        print(chr(65 + j), end=' ')\\n    print()",
            "markingScheme": "1.5 Marks for nested loop structure, 1.5 Marks for chr(65 + j) logic."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program to:\\n(a) Input N rows for Pascal's Triangle.\\n(b) Generate and display Pascal's triangle up to N rows using nested lists or iterative binomial expansion.",
            "solution": "def print_pascals_triangle(n):\\n    triangle = []\\n    for i in range(n):\\n        row = [1] * (i + 1)\\n        for j in range(1, i):\\n            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]\\n        triangle.append(row)\\n    for row in triangle:\\n        print(' '.join(map(str, row)).center(n * 4))\\nn = int(input('Enter number of rows: '))\\nprint_pascals_triangle(n)",
            "markingScheme": "2 Marks for row structure generation, 3 Marks for Pascal recurrence addition logic, 1 Mark for centered printing. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Comprehensive Diagnostic & Integrated Revision Test",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the output of print(3 in [1, 2, [3, 4]])?",
            "solution": "False. 3 is inside a nested list [3, 4], not a direct element of the outer list.",
            "markingScheme": "1 Mark for False."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which of the following creates a shallow copy of list L?\\n(a) L[:]\\n(b) list(L)\\n(c) L.copy()\\n(d) All of the above",
            "solution": "(d) All of the above.",
            "markingScheme": "1 Mark for (d) All of the above."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What data type is returned by dict.items()?",
            "solution": "dict_items (a view object displaying list of (key, value) tuple pairs).",
            "markingScheme": "1 Mark for dict_items."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the output of print('Python'[-1:-4:-1])?",
            "solution": "'noh'. Slices from index -1 ('n'), -2 ('o'), -3 ('h') backwards.",
            "markingScheme": "1 Mark for 'noh'."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\\ndef modify(d, key, val):\\n    d[key] = val\\nmy_dict = {'a': 10}\\nmodify(my_dict, 'b', 20)\\nprint(my_dict)",
            "solution": "Dictionaries are mutable and passed by object reference. Output: {'a': 10, 'b': 20}",
            "markingScheme": "2 Marks for {'a': 10, 'b': 20}."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output:\\ns = 'A1B2C3'\\nres = [ch for ch in s if ch.isdigit()]\\nprint(''.join(res))",
            "solution": "List comprehension filters digits: ['1', '2', '3']. Output: '123'",
            "markingScheme": "2 Marks for '123'."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function remove_duplicates(lst) that removes all duplicate elements from a list while PRESERVING the original element order.",
            "solution": "def remove_duplicates(lst):\\n    seen = set()\\n    result = []\\n    for item in lst:\\n        if item not in seen:\\n            seen.add(item)\\n            result.append(item)\\n    return result\\n# Test: print(remove_duplicates([1, 2, 3, 2, 1, 4])) # [1, 2, 3, 4]",
            "markingScheme": "1.5 Marks for using set for O(1) lookup, 1.5 Marks for order preservation in result list."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\ndata = [10, 20, 30, 40]\\nfor i in range(len(data)):\\n    data[i] = data[i] // 10 + i\\nprint(data)",
            "solution": "Dry-run:\\n* i=0: 10 // 10 + 0 = 1\\n* i=1: 20 // 10 + 1 = 3\\n* i=2: 30 // 10 + 2 = 5\\n* i=3: 40 // 10 + 3 = 7\\nOutput: [1, 3, 5, 7]",
            "markingScheme": "1.5 Marks for dry-run step calculations, 1.5 Marks for output [1, 3, 5, 7]."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python program to implement a banking ledger simulator:\\n(a) Store 3 accounts in a dictionary: {AccNo: {'Name': str, 'Balance': float}}.\\n(b) Implement a deposit(acc_no, amount) function that credits balance.\\n(c) Implement a withdraw(acc_no, amount) function that checks for minimum balance (Rs. 1000) before debiting.\\n(d) Display formatted account summary after transactions.",
            "solution": "accounts = {\\n    1001: {'Name': 'Mamata', 'Balance': 5000.0},\\n    1002: {'Name': 'Debangshu', 'Balance': 3200.0},\\n    1003: {'Name': 'Abhronila', 'Balance': 1500.0}\\n}\\ndef deposit(acc, amt):\\n    if acc in accounts and amt > 0:\\n        accounts[acc]['Balance'] += amt\\n        print(f'Deposited Rs.{amt} to {acc}. New Bal: {accounts[acc][\"Balance\"]}')\\n\\ndef withdraw(acc, amt):\\n    if acc in accounts:\\n        if accounts[acc]['Balance'] - amt >= 1000:\\n            accounts[acc]['Balance'] -= amt\\n            print(f'Withdrew Rs.{amt} from {acc}. Remaining: {accounts[acc][\"Balance\"]}')\\n        else:\\n            print(f'Insufficient funds in {acc}! Min balance Rs.1000 required.')\\n\\ndeposit(1001, 1500)\\nwithdraw(1003, 800) # Should fail minimum balance check\\nprint('\\nFinal Accounts Summary:')\\nfor acc, d in accounts.items():\\n    print(f'Acc {acc}: {d[\"Name\"]} | Rs.{d[\"Balance\"]:.2f}')",
            "markingScheme": "2 Marks for dictionary setup, 2 Marks for deposit logic, 2 Marks for withdraw with minimum balance check. Total: 6 Marks."
          }
        ]
      }
    ]
  }
];
