export default [
  {
    "setId": 1,
    "title": "Set 1: Function Definitions, Parameters & Default Arguments",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which keyword is used to define a user-defined function in Python?\\n(a) function\\n(b) def\\n(c) define\\n(d) func",
            "solution": "(b) def. Python uses the 'def' keyword followed by the function name and parameter list.",
            "markingScheme": "1 Mark for (b) def."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Why must non-default parameters precede default parameters in a function header? Give an example of an invalid header.",
            "solution": "Python matches arguments positionally from left to right. If a default parameter precedes a non-default parameter, Python cannot unambiguously assign values.\\nInvalid: def calc(a=10, b): pass -> SyntaxError: non-default argument follows default argument.",
            "markingScheme": "1 Mark for explanation of left-to-right positional matching and SyntaxError."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is returned by a Python function that does not contain an explicit 'return' statement?\\n(a) 0\\n(b) False\\n(c) None\\n(d) An empty string",
            "solution": "(c) None. Functions without an explicit return statement implicitly return None (void functions).",
            "markingScheme": "1 Mark for (c) None."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether positional arguments and keyword arguments can be mixed during a function call, and what rule applies.",
            "solution": "Yes, they can be mixed, but positional arguments must strictly appear BEFORE any keyword arguments in the function call.",
            "markingScheme": "1 Mark for Yes with the rule: positional arguments must precede keyword arguments."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output of the following Python code snippet:\\ndef compute(x, y=5, z=10):\\n    return x + y * z\\nprint(compute(2), compute(3, 4), compute(1, z=2, y=3))",
            "solution": "1. compute(2) -> x=2, y=5, z=10 -> 2 + 5 * 10 = 52\\n2. compute(3, 4) -> x=3, y=4, z=10 -> 3 + 4 * 10 = 43\\n3. compute(1, z=2, y=3) -> x=1, y=3, z=2 -> 1 + 3 * 2 = 7\\nOutput: 52 43 7",
            "markingScheme": "0.5 Marks for 52, 0.5 Marks for 43, 1 Mark for 7. Total: 2 Marks."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output of the following code:\\ndef modify(val, lst=[]):\\n    lst.append(val)\\n    return lst\\nprint(modify(1))\\nprint(modify(2))",
            "solution": "Default argument 'lst' is evaluated once when the function is defined. It retains its mutated state across calls.\\nOutput:\\n[1]\\n[1, 2]",
            "markingScheme": "1 Mark for [1], 1 Mark for [1, 2] (identifying mutable default argument behavior)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the LEGB rule of variable scope resolution in Python with a clear diagram or code example.",
            "solution": "LEGB defines the search hierarchy for identifiers:\\n1. L (Local): Inside the current function.\\n2. E (Enclosing): Inside any enclosing outer functions.\\n3. G (Global): At the top module level.\\n4. B (Built-in): In Python's built-in namespace (e.g. print, len, range).\\nExample:\\nx = 'global'\\ndef outer():\\n    x = 'enclosing'\\n    def inner():\\n        x = 'local'\\n        print(x) # prints 'local'",
            "markingScheme": "1.5 Marks for listing LEGB in order, 1.5 Marks for code example or clear scope explanation."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output of the following code:\\na = 50\\ndef test():\\n    global a\\n    a = a + 25\\n    b = 100\\n    print('Inside:', a, b)\\ntest()\\nprint('Outside:', a)",
            "solution": "Execution:\\n1. Global 'a' is modified inside test(): a = 50 + 25 = 75.\\n2. 'b' is local to test().\\n3. print('Inside:', 75, 100)\\n4. print('Outside:', 75)\\nOutput:\\nInside: 75 100\\nOutside: 75",
            "markingScheme": "1.5 Marks for inside output, 1.5 Marks for modified global output."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a modular Python program with user-defined functions:\\n(a) is_prime(n): Returns True if n is a prime number, else False.\\n(b) sum_primes(lst): Takes a list of numbers and returns the sum of all prime numbers in the list.\\n(c) In main, input a list of integers from the user, call sum_primes(), and display the result with an appropriate message.",
            "solution": "def is_prime(n):\\n    if n < 2:\\n        return False\\n    for i in range(2, int(n**0.5) + 1):\\n        if n % i == 0:\\n            return False\\n    return True\\n\\ndef sum_primes(lst):\\n    total = 0\\n    for num in lst:\\n        if is_prime(num):\\n            total += num\\n    return total\\n\\ndef main():\\n    user_input = input('Enter space-separated integers: ')\\n    numbers = [int(x) for x in user_input.split()]\\n    ans = sum_primes(numbers)\\n    print(f'Sum of all prime numbers in the list: {ans}')\\n\\nmain()",
            "markingScheme": "2 Marks for is_prime() logic, 2 Marks for sum_primes() filtering, 2 Marks for main driver and input handling. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Scope Rules, Global Keyword & Mutability in Functions",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What keyword is required inside a function to rebind or modify a global variable?",
            "solution": "The 'global' keyword (e.g. global count).",
            "markingScheme": "1 Mark for 'global'."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What happens when you pass an immutable integer to a function and increment it inside the function?",
            "solution": "A new local integer object is created in the function's local scope; the caller's integer remains completely unchanged (pass by object reference for immutables).",
            "markingScheme": "1 Mark for caller variable remains unchanged / local rebinding."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What error occurs if you read a global variable and then assign to it in the same function without using 'global'?",
            "solution": "UnboundLocalError: local variable referenced before assignment.",
            "markingScheme": "1 Mark for UnboundLocalError."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether True or False: Passing a mutable list to a function and using .append() modifies the caller's original list in-place.",
            "solution": "True. Because lists are mutable, in-place mutations affect the caller's object directly.",
            "markingScheme": "1 Mark for True with mutability justification."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\\ndef alter(l, n):\\n    for i in range(len(l)):\\n        l[i] *= n\\nnums = [1, 2, 3]\\nalter(nums, 3)\\nprint(nums)",
            "solution": "nums is mutated in-place: [1*3, 2*3, 3*3]. Output: [3, 6, 9]",
            "markingScheme": "2 Marks for [3, 6, 9]."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output:\\nx = 10\\ndef show():\\n    x = 20\\n    print('Local:', x)\\nshow()\\nprint('Global:', x)",
            "solution": "Output:\\nLocal: 20\\nGlobal: 10",
            "markingScheme": "1 Mark for Local: 20, 1 Mark for Global: 10."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Differentiate between 'Pass by Value' vs 'Pass by Reference' and explain how Python implements 'Pass by Object Reference'.",
            "solution": "1. Pass by Value copies the value (caller is immune to changes).\\n2. Pass by Reference passes the pointer/alias (caller is affected).\\n3. Python passes object references: If the object is mutable (list/dict), in-place operations mutate the caller's object. If immutable (int/str/tuple), rebinding creates a local object leaving caller unchanged.",
            "markingScheme": "1 Mark for value vs reference, 2 Marks for Python's pass-by-object-reference mechanism."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\ndef calc(a, b=2):\\n    return a ** b\\nprint(calc(3), calc(3, 3), calc(b=3, a=2))",
            "solution": "1. calc(3) -> 3 ** 2 = 9\\n2. calc(3, 3) -> 3 ** 3 = 27\\n3. calc(b=3, a=2) -> 2 ** 3 = 8\\nOutput: 9 27 8",
            "markingScheme": "1 Mark each for 9, 27, 8. Total: 3 Marks."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a program containing:\\n(a) A global list 'inventory' storing tuples: (ItemCode, ItemName, Price, Quantity).\\n(b) A function add_item(code, name, price, qty) that appends an item to the global list.\\n(c) A function calculate_total_value() that computes and returns the sum of (Price * Quantity) of all items.\\n(d) A function display_low_stock(threshold=5) that prints all items with quantity < threshold.",
            "solution": "inventory = []\\n\\ndef add_item(code, name, price, qty):\\n    inventory.append((code, name, price, qty))\\n\\ndef calculate_total_value():\\n    return sum(price * qty for _, _, price, qty in inventory)\\n\\ndef display_low_stock(threshold=5):\\n    print(f'Items below stock threshold {threshold}:')\\n    for code, name, price, qty in inventory:\\n        if qty < threshold:\\n            print(f'  [{code}] {name}: Qty {qty}')\\n\\nadd_item(101, 'Notebook', 45.0, 12)\\nadd_item(102, 'Pen', 15.0, 3)\\nadd_item(103, 'Eraser', 5.0, 2)\\nprint('Total Inventory Value: Rs.', calculate_total_value())\\ndisplay_low_stock()",
            "markingScheme": "1 Mark for global list, 1.5 Marks for add_item(), 1.5 Marks for calculate_total_value(), 2 Marks for display_low_stock() with default parameter. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Standard Library Modules (math, random, statistics)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which function in the math module returns the smallest integer greater than or equal to x?\\n(a) math.floor(x)\\n(b) math.ceil(x)\\n(c) math.trunc(x)\\n(d) math.round(x)",
            "solution": "(b) math.ceil(x). math.ceil(3.2) returns 4.",
            "markingScheme": "1 Mark for (b) math.ceil(x)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What are the possible return values of random.random()?",
            "solution": "A floating-point number in the semi-open range [0.0, 1.0) (0.0 inclusive, 1.0 exclusive).",
            "markingScheme": "1 Mark for float in range [0.0, 1.0)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which statistics module function computes the most frequently occurring value in a dataset?",
            "solution": "statistics.mode(data).",
            "markingScheme": "1 Mark for statistics.mode()."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the difference between 'import math' and 'from math import sqrt'?",
            "solution": "'import math' imports the entire module namespace, requiring 'math.sqrt()'; 'from math import sqrt' imports 'sqrt' directly into the current namespace.",
            "markingScheme": "1 Mark for namespace qualification explanation."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "What are the minimum and maximum possible outputs of the following code?\\nimport random\\nval = random.randint(10, 25)\\nprint(val)",
            "solution": "Minimum possible output: 10\\nMaximum possible output: 25\\n(Both endpoints are inclusive in randint).",
            "markingScheme": "1 Mark for Min: 10, 1 Mark for Max: 25."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output of:\\nimport math\\nprint(math.gcd(24, 36), math.pow(2, 3))",
            "solution": "math.gcd(24, 36) is 12.\\nmath.pow(2, 3) returns a float 8.0.\\nOutput: 12 8.0",
            "markingScheme": "1 Mark for 12, 1 Mark for 8.0 (must be float)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "In a CBSE question: 'Given the list colors = ['Red', 'Green', 'Blue', 'Yellow']. Suggest the random module function to pick 2 unique random colors, and write the code.'",
            "solution": "Use random.sample() to select unique elements without replacement.\\nCode:\\nimport random\\ncolors = ['Red', 'Green', 'Blue', 'Yellow']\\npicked = random.sample(colors, 2)\\nprint(picked)",
            "markingScheme": "1.5 Marks for naming random.sample(), 1.5 Marks for correct code snippet."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the possible outputs for the following random generation question:\\nimport random\\nPICK = random.randint(0, 3)\\nCITY = ['DELHI', 'MUMBAI', 'KOLKATA', 'CHENNAI']\\nfor i in range(PICK, 4):\\n    print(CITY[i], end=':')\\n(i) DELHI:MUMBAI:KOLKATA:CHENNAI:\\n(ii) KOLKATA:CHENNAI:\\n(iii) CHENNAI:KOLKATA:\\n(iv) MUMBAI:KOLKATA:CHENNAI:",
            "solution": "PICK can be 0, 1, 2, or 3.\\nIf PICK=0 -> (i) DELHI:MUMBAI:KOLKATA:CHENNAI:\\nIf PICK=1 -> (iv) MUMBAI:KOLKATA:CHENNAI:\\nIf PICK=2 -> (ii) KOLKATA:CHENNAI:\\nOption (iii) is impossible because the loop prints in forward order.\\nPossible outputs: (i), (ii), and (iv).",
            "markingScheme": "1 Mark each for identifying (i), (ii), and (iv). Total: 3 Marks."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python program to simulate rolling two 6-sided dice 1000 times:\\n(a) Store the sum of the two dice in a list.\\n(b) Using the statistics module, calculate and display the mean, median, and mode of the sums.\\n(c) Display how many times a 'lucky sum' of 7 was rolled.",
            "solution": "import random\\nimport statistics\\n\\ndef dice_simulation():\\n    rolls = [random.randint(1, 6) + random.randint(1, 6) for _ in range(1000)]\\n    print('--- DICE SIMULATION (1000 ROLLS) ---')\\n    print('Mean Sum  :', round(statistics.mean(rolls), 2))\\n    print('Median Sum:', statistics.median(rolls))\\n    print('Mode Sum  :', statistics.mode(rolls))\\n    sevens = rolls.count(7)\\n    print(f'Sum of 7 occurred {sevens} times ({(sevens/10):.1f}%).')\\n\\ndice_simulation()",
            "markingScheme": "2 Marks for dice simulation list comprehension, 3 Marks for statistics calculations (mean, median, mode), 1 Mark for count of 7. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Custom Modules & Import Mechanics",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is a module in Python?",
            "solution": "A file containing Python definitions, functions, and statements ending with the .py extension, designed for code reusability.",
            "markingScheme": "1 Mark for definition (.py file containing reusable functions/statements)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the special built-in variable that holds the name of the module currently being executed?",
            "solution": "__name__. When a file is executed directly, __name__ is '__main__'.",
            "markingScheme": "1 Mark for __name__."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does 'import geometry as geo' do?",
            "solution": "Imports the geometry module and binds it to the alias name 'geo' for convenient shorthand referencing.",
            "markingScheme": "1 Mark for module aliasing explanation."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Where does Python search for modules when an 'import' statement is executed?",
            "solution": "In sys.path (1. Current script directory, 2. PYTHONPATH directories, 3. Standard library directories).",
            "markingScheme": "1 Mark for current dir, PYTHONPATH, and standard library."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the purpose of the conditional statement: if __name__ == '__main__':",
            "solution": "It checks whether the script is being run directly as the main program versus being imported into another module. It allows a module to contain standalone test code that doesn't execute upon import.",
            "markingScheme": "2 Marks for direct execution vs imported module guard."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What error occurs if you execute: from math import cube?",
            "solution": "ImportError: cannot import name 'cube' from 'math' (because 'cube' does not exist in the math module).",
            "markingScheme": "2 Marks for ImportError with explanation."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Create a custom Python module named 'series.py' containing two functions:\\n(a) fibonacci(n): Returns a list of first n Fibonacci numbers.\\n(b) factorial(n): Returns the factorial of n using iteration.",
            "solution": "# series.py\\ndef fibonacci(n):\\n    seq = [0, 1]\\n    for _ in range(n - 2):\\n        seq.append(seq[-1] + seq[-2])\\n    return seq[:n]\\n\\ndef factorial(n):\\n    fact = 1\\n    for i in range(1, n + 1):\\n        fact *= i\\n    return fact",
            "markingScheme": "1.5 Marks for fibonacci() logic, 1.5 Marks for factorial() logic."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a separate Python script 'main.py' that imports the above 'series' module and displays:\\n(a) The first 8 Fibonacci numbers.\\n(b) The factorial of 6.",
            "solution": "# main.py\\nimport series\\n\\nprint('First 8 Fibonacci numbers:', series.fibonacci(8))\\nprint('Factorial of 6:', series.factorial(6))",
            "markingScheme": "1.5 Marks for correct import syntax, 1.5 Marks for invoking functions via module namespace."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Create a complete utility module 'string_ops.py' with functions:\\n(a) count_words(s): Returns the word count of a sentence.\\n(b) is_palindrome(s): Returns True if s is a palindrome, ignoring case and spaces.\\n(c) reverse_words(s): Returns a string with words in reversed order.\\nInclude a test suite block under 'if __name__ == '__main__':'.",
            "solution": "# string_ops.py\\ndef count_words(s):\\n    return len(s.split())\\n\\ndef is_palindrome(s):\\n    cleaned = ''.join(ch.lower() for ch in s if ch.isalnum())\\n    return cleaned == cleaned[::-1]\\n\\ndef reverse_words(s):\\n    return ' '.join(s.split()[::-1])\\n\\nif __name__ == '__main__':\\n    print('Testing string_ops module:')\\n    sample = 'A man a plan a canal Panama'\\n    print('Words:', count_words(sample))\\n    print('Is Palindrome:', is_palindrome(sample))\\n    print('Reversed Words:', reverse_words('Hello World from Barrackpore'))",
            "markingScheme": "1.5 Marks for count_words, 2 Marks for is_palindrome, 1.5 Marks for reverse_words, 1 Mark for if __name__ == '__main__' test block. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Return Values, Fruitful Functions & Multiple Returns",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is a 'Fruitful Function' in Python?",
            "solution": "A function that computes and returns a meaningful value to the caller using the 'return' statement.",
            "markingScheme": "1 Mark for function that returns a value."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What data type is returned when a function writes: return 10, 20, 30?",
            "solution": "tuple. Multiple comma-separated return values are packed into a tuple (10, 20, 30).",
            "markingScheme": "1 Mark for tuple."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What happens to statements written immediately after a 'return' statement inside the same function block?",
            "solution": "They are unreachable (dead code) and never execute because 'return' terminates function execution.",
            "markingScheme": "1 Mark for unreachable / dead code."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Can a function have multiple 'return' statements?",
            "solution": "Yes, in conditional branches (if-elif-else); the first return encountered terminates the call.",
            "markingScheme": "1 Mark for Yes with conditional branch explanation."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output of:\\ndef stats(lst):\\n    return min(lst), max(lst), sum(lst)\\nmn, mx, sm = stats([10, 20, 30, 40])\\nprint(mn, mx, sm)",
            "solution": "min=10, max=40, sum=100.\\nOutput: 10 40 100",
            "markingScheme": "2 Marks for 10 40 100."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Predict the output:\\ndef check(n):\\n    if n > 0:\\n        return 'Positive'\\n    elif n < 0:\\n        return 'Negative'\\n    return 'Zero'\\nprint(check(-5), check(0))",
            "solution": "Output: Negative Zero",
            "markingScheme": "1 Mark for Negative, 1 Mark for Zero."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function solve_quadratic(a, b, c) that calculates the real roots of ax^2 + bx + c = 0 and returns both roots, or returns None if roots are complex.",
            "solution": "import math\\ndef solve_quadratic(a, b, c):\\n    disc = b**2 - 4*a*c\\n    if disc < 0:\\n        return None\\n    r1 = (-b + math.sqrt(disc)) / (2*a)\\n    r2 = (-b - math.sqrt(disc)) / (2*a)\\n    return r1, r2",
            "markingScheme": "1 Mark for discriminant check, 1.5 Marks for quadratic formula, 0.5 Marks for returning tuple/None."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\ndef f(x):\\n    if x == 1: return 1\\n    return x * f(x - 1)\\nprint(f(4))",
            "solution": "Recursive call stack:\\n* f(4) = 4 * f(3)\\n* f(3) = 3 * f(2)\\n* f(2) = 2 * f(1)\\n* f(1) = 1\\nEvaluation: 4 * 3 * 2 * 1 = 24.\\nOutput: 24",
            "markingScheme": "1.5 Marks for recursion stack trace, 1.5 Marks for 24."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a function analyze_text(text) that returns a dictionary containing:\\n- 'word_count': Total words\\n- 'char_count': Total characters (excluding spaces)\\n- 'vowel_count': Total vowels\\n- 'is_palindrome': Boolean indicating if the first word equals the last word (case-insensitive).\\nInclude a sample call and print the returned dictionary.",
            "solution": "def analyze_text(text):\\n    words = text.split()\\n    chars_no_space = len(text.replace(' ', ''))\\n    vowels = sum(1 for ch in text if ch.lower() in 'aeiou')\\n    first_eq_last = (words[0].lower() == words[-1].lower()) if words else False\\n    return {\\n        'word_count': len(words),\\n        'char_count': chars_no_space,\\n        'vowel_count': vowels,\\n        'is_palindrome': first_eq_last\\n    }\\n\\nresult = analyze_text('Madam went to see madam')\\nfor k, v in result.items():\\n    print(f'{k}: {v}')",
            "markingScheme": "1.5 Marks for word & char count, 1.5 Marks for vowel counting, 1.5 Marks for first_eq_last logic, 1.5 Marks for dictionary return & display. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Recursion vs Iteration in Functions",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the 'Base Case' in a recursive function?",
            "solution": "The terminating condition that stops further recursive calls and returns a direct result, preventing infinite recursion.",
            "markingScheme": "1 Mark for terminating condition preventing infinite recursion."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What error occurs if a recursive function lacks a base case?",
            "solution": "RecursionError: maximum recursion depth exceeded.",
            "markingScheme": "1 Mark for RecursionError."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What data structure is used internally by the Python interpreter to manage recursive function calls?",
            "solution": "The Call Stack (Call Stack / Activation Record Stack).",
            "markingScheme": "1 Mark for Call Stack."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether True or False: Every recursive function can also be implemented iteratively using loops.",
            "solution": "True. Recursion and iteration are computationally equivalent.",
            "markingScheme": "1 Mark for True with equivalence reason."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\\ndef countdown(n):\\n    if n == 0:\\n        print('Go!')\\n    else:\\n        print(n, end=' ')\\n        countdown(n - 1)\\ncountdown(3)",
            "solution": "Output: 3 2 1 Go!",
            "markingScheme": "2 Marks for 3 2 1 Go!"
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output:\\ndef fun(n):\\n    if n <= 1: return 1\\n    return n + fun(n - 2)\\nprint(fun(5))",
            "solution": "fun(5) = 5 + fun(3) = 5 + 3 + fun(1) = 5 + 3 + 1 = 9.\\nOutput: 9",
            "markingScheme": "2 Marks for 9."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write both an iterative function and a recursive function to compute the sum of digits of a positive integer N. Example: sum_digits(1234) -> 10.",
            "solution": "# Iterative:\\ndef sum_digits_iter(n):\\n    return sum(int(d) for d in str(n))\\n\\n# Recursive:\\ndef sum_digits_rec(n):\\n    if n == 0: return 0\\n    return (n % 10) + sum_digits_rec(n // 10)",
            "markingScheme": "1.5 Marks for iterative version, 1.5 Marks for recursive version."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the execution of binary search function logic and state its best and worst case time complexity.",
            "solution": "Binary search repeatedly divides the sorted search space in half by comparing the target with the middle element.\\n- Best Case: Target found at the middle index on first attempt -> O(1).\\n- Worst Case: Target at end or absent -> O(log N).",
            "markingScheme": "1.5 Marks for logic trace, 1.5 Marks for O(1) and O(log N) complexities."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write recursive functions for the following:\\n(a) power(base, exp): Computes base raised to exp (exp >= 0).\\n(b) gcd(a, b): Computes the greatest common divisor using Euclid's recursive algorithm.\\nInclude a main block demonstrating both functions.",
            "solution": "def power(base, exp):\\n    if exp == 0: return 1\\n    return base * power(base, exp - 1)\\n\\ndef gcd(a, b):\\n    if b == 0: return a\\n    return gcd(b, a % b)\\n\\nprint('2^5 =', power(2, 5))\\nprint('GCD(48, 18) =', gcd(48, 18))",
            "markingScheme": "3 Marks for recursive power() logic with base case, 3 Marks for recursive gcd() Euclid algorithm. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Advanced Parameter Passing & Keyword Arguments",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is a 'Keyword Argument' in a Python function call?",
            "solution": "An argument passed by explicitly naming the parameter (e.g. func(name='Aman', age=18)), allowing arguments to be passed in any order.",
            "markingScheme": "1 Mark for named parameter passing."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What error is raised by the following call: def greet(name, msg): pass; greet(msg='Hi', 'Aman')?",
            "solution": "SyntaxError: positional argument follows keyword argument.",
            "markingScheme": "1 Mark for SyntaxError (positional after keyword)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Can a default argument value be an expression (e.g. def func(a, b=2*3):)?",
            "solution": "Yes, default expressions are evaluated once when the function definition is executed.",
            "markingScheme": "1 Mark for Yes."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What does *args signify in a function parameter list?",
            "solution": "It collects variable-length positional arguments into a tuple.",
            "markingScheme": "1 Mark for variable-length positional tuple."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output of:\\ndef show(*args):\\n    print(type(args), len(args), sum(args))\\nshow(10, 20, 30)",
            "solution": "Output: <class 'tuple'> 3 60",
            "markingScheme": "2 Marks for exact output."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Predict the output:\\ndef display(p=1, q=2, r=3):\\n    print(p, q, r)\\ndisplay(r=10, p=20)",
            "solution": "p is 20, q is default 2, r is 10.\\nOutput: 20 2 10",
            "markingScheme": "2 Marks for 20 2 10."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the four types of formal arguments supported in Python functions with code examples for each:\\n1. Positional arguments\\n2. Default arguments\\n3. Keyword arguments\\n4. Variable-length arguments (*args)",
            "solution": "1. Positional: def f(a, b): matched by order.\\n2. Default: def f(a, b=5): uses 5 if b is omitted.\\n3. Keyword: f(b=2, a=1): matched by name.\\n4. Variable length: def f(*args): receives arbitrary tuple.",
            "markingScheme": "0.75 Marks for each argument type with code example (0.75 * 4 = 3 Marks)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\ndef bill(qty, rate=50, discount=5):\\n    amount = qty * rate\\n    return amount - (amount * discount / 100)\\nprint(bill(2), bill(4, 100), bill(10, discount=10))",
            "solution": "1. bill(2) -> 2*50=100 - 5 = 95.0\\n2. bill(4, 100) -> 4*100=400 - 20 = 380.0\\n3. bill(10, discount=10) -> 10*50=500 - 50 = 450.0\\nOutput: 95.0 380.0 450.0",
            "markingScheme": "1 Mark each for 95.0, 380.0, 450.0. Total: 3 Marks."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a versatile function format_report(*scores, student_name='Anonymous', grade_scale='Standard') that:\\n(a) Calculates total score and percentage (assuming each subject is out of 100).\\n(b) Determines grade: >=90: 'A', >=75: 'B', >=60: 'C', else: 'D'.\\n(c) Prints a formatted report card banner.",
            "solution": "def format_report(*scores, student_name='Anonymous', grade_scale='Standard'):\\n    total = sum(scores)\\n    num_sub = len(scores)\\n    pct = (total / (num_sub * 100)) * 100 if num_sub else 0\\n    if pct >= 90: grade = 'A'\\n    elif pct >= 75: grade = 'B'\\n    elif pct >= 60: grade = 'C'\\n    else: grade = 'D'\\n    print('=' * 40)\\n    print(f'REPORT CARD: {student_name.upper()}')\\n    print(f'Scale: {grade_scale} | Subjects: {num_sub}')\\n    print(f'Total: {total}/{num_sub*100} | Percentage: {pct:.2f}%')\\n    print(f'Final Grade: {grade}')\\n    print('=' * 40)\\n\\nformat_report(92, 88, 95, 89, student_name='Mamata')\\nformat_report(65, 72, 60, student_name='Swadeep')",
            "markingScheme": "2 Marks for *scores handling, 2 Marks for percentage and grading logic, 2 Marks for formatted output. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Function Debugging, Tracing & Error Finding",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What error occurs if you call a function with fewer positional arguments than required?",
            "solution": "TypeError: function missing required positional argument(s).",
            "markingScheme": "1 Mark for TypeError."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What happens when you define two functions with the exact same name in the same script?",
            "solution": "The second function definition overwrites the first one in the namespace; the first function becomes inaccessible.",
            "markingScheme": "1 Mark for second definition overwrites the first."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does the 'docstring' of a function provide, and how is it accessed?",
            "solution": "A documentation string placed as the first statement in a function body; accessed via func.__doc__.",
            "markingScheme": "1 Mark for documentation string and __doc__."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether True or False: A function can call another function in Python.",
            "solution": "True (Nested function calls / modular programming).",
            "markingScheme": "1 Mark for True."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Identify and correct errors in the following code:\\ndef check_num(n)\\n    if n % 2 = 0\\n        return 'Even'\\n    else:\\n        return 'Odd'",
            "solution": "Corrected Code:\\ndef check_num(n):      # Error 1: Missing colon : after header\\n    if n % 2 == 0:     # Error 2: Equality == and missing colon :\\n        return 'Even'\\n    else:\\n        return 'Odd'",
            "markingScheme": "0.5 Marks for each error corrected and underlined."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output:\\ndef fun(x):\\n    x[0] = 'Z'\\ns = ['A', 'B']\\nfun(s)\\nprint(s)",
            "solution": "Output: ['Z', 'B']. The list element is modified in-place.",
            "markingScheme": "2 Marks for ['Z', 'B']."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Find and underline the 6 errors in this function definition and call:\\nDef calculate(x, y=5):\\n    sum = x + y\\n    Diff = x - y\\n    Return sum, Diff\\n\\nA, B = calculate[10, 20]\\nprint A, B",
            "solution": "Errors:\\n1. 'Def' -> def (lowercase)\\n2. 'Return' -> return (lowercase)\\n3. calculate[10, 20] -> calculate(10, 20) (parentheses for call)\\n4. print A, B -> print(A, B) (print requires parentheses)\\n5. Return sum, Diff (variable name case consistency)\\n6. Parameter consistency.",
            "markingScheme": "0.5 Marks for each corrected and underlined error (6 * 0.5 = 3 Marks)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\ndef update(x, y):\\n    x += y\\n    y = x - y\\n    x -= y\\n    return x, y\\np, q = 10, 20\\np, q = update(p, q)\\nprint('p =', p, 'q =', q)",
            "solution": "The update() function swaps x and y values mathematically:\\n1. x = 10 + 20 = 30\\n2. y = 30 - 20 = 10\\n3. x = 30 - 10 = 20\\nReturns (20, 10).\\nOutput: p = 20 q = 10",
            "markingScheme": "1.5 Marks for tracing mathematical swap, 1.5 Marks for output p = 20 q = 10."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program with a function sanitize_email(email_list) that:\\n(a) Validates each email: must contain exactly one '@' symbol and end with '.com' or '.edu'.\\n(b) Returns two lists: valid_emails and invalid_emails.\\n(c) Demonstrate calling the function with a test list of 5 emails and print both categorized lists.",
            "solution": "def sanitize_email(email_list):\\n    valid = []\\n    invalid = []\\n    for email in email_list:\\n        email = email.strip()\\n        if email.count('@') == 1 and (email.endswith('.com') or email.endswith('.edu')):\\n            parts = email.split('@')\\n            if parts[0] and '.' in parts[1]:\\n                valid.append(email)\\n                continue\\n        invalid.append(email)\\n    return valid, invalid\\n\\ntest_emails = ['user@gmail.com', 'invalid-email', 'student@school.edu', 'bad@site@org.com', 'admin@web']\\nv, inv = sanitize_email(test_emails)\\nprint('Valid Emails  :', v)\\nprint('Invalid Emails:', inv)",
            "markingScheme": "2 Marks for '@' and domain ending check, 2 Marks for non-empty local-part and domain validation, 2 Marks for partition into two lists and display. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Lambda Functions, Higher-Order Functions & Comprehensions",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is an anonymous (lambda) function in Python?",
            "solution": "A small, unnamed single-expression function defined with the 'lambda' keyword: lambda args: expression.",
            "markingScheme": "1 Mark for unnamed single-expression function."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does the following return: (lambda x, y: x * y)(4, 5)?",
            "solution": "20.",
            "markingScheme": "1 Mark for 20."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Can a lambda function contain multiple statements or assignments?",
            "solution": "No, a lambda function can contain only a single expression whose evaluated result is returned.",
            "markingScheme": "1 Mark for No (strictly single expression)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What function applies a given function to all items in an iterable?\\n(a) map()\\n(b) filter()\\n(c) reduce()\\n(d) zip()",
            "solution": "(a) map().",
            "markingScheme": "1 Mark for (a) map()."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output of:\\nnums = [1, 2, 3, 4, 5]\\nevens = list(filter(lambda x: x % 2 == 0, nums))\\nprint(evens)",
            "solution": "Output: [2, 4]",
            "markingScheme": "2 Marks for [2, 4]."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Predict the output:\\nwords = ['apple', 'pie', 'banana', 'fig']\\nprint(sorted(words, key=lambda w: len(w)))",
            "solution": "Sorted by length: 'pie' (3), 'fig' (3), 'apple' (5), 'banana' (6).\\nOutput: ['pie', 'fig', 'apple', 'banana']",
            "markingScheme": "2 Marks for ['pie', 'fig', 'apple', 'banana']."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Rewrite the following function as an equivalent 1-line lambda function:\\ndef grade(m):\\n    return 'Pass' if m >= 33 else 'Fail'",
            "solution": "grade = lambda m: 'Pass' if m >= 33 else 'Fail'\\n# Test: print(grade(40), grade(25)) # Pass Fail",
            "markingScheme": "3 Marks for correct conditional lambda expression."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\nsq = list(map(lambda x: x**2, range(1, 6)))\\nprint('Squares:', sq)",
            "solution": "range(1, 6) is 1, 2, 3, 4, 5.\\nEach squared: 1, 4, 9, 16, 25.\\nOutput: Squares: [1, 4, 9, 16, 25]",
            "markingScheme": "1.5 Marks for mapping trace, 1.5 Marks for output [1, 4, 9, 16, 25]."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a program that takes a list of employee tuples (EmpId, Name, Salary, Dept):\\n(a) Use a lambda function with sorted() to sort employees in descending order of salary.\\n(b) Use filter() with a lambda function to extract all employees earning > 60000.\\n(c) Display the results cleanly.",
            "solution": "employees = [\\n    (101, 'Mamata', 75000, 'IT'),\\n    (102, 'Susmita', 52000, 'HR'),\\n    (103, 'Debangshu', 82000, 'Finance'),\\n    (104, 'Sachin', 61000, 'IT')\\n]\\n# (a) Sort descending by salary\\nby_salary = sorted(employees, key=lambda e: e[2], reverse=True)\\nprint('Employees Sorted by Salary (High to Low):')\\nfor e in by_salary:\\n    print(f'  {e[1]}: Rs.{e[2]}')\\n\\n# (b) Filter salary > 60000\\nhigh_earners = list(filter(lambda e: e[2] > 60000, employees))\\nprint('\\nEmployees earning > 60000:')\\nfor e in high_earners:\\n    print(f'  {e[1]} ({e[3]}): Rs.{e[2]}')",
            "markingScheme": "3 Marks for sorted() with lambda key and reverse=True, 3 Marks for filter() with lambda salary condition. Total: 6 Marks."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Comprehensive Functions Mastery & Module Review",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is an 'Actual Parameter' vs a 'Formal Parameter'?",
            "solution": "Formal parameters are variables defined in the function header; actual parameters are the values or expressions passed during the function call.",
            "markingScheme": "1 Mark for header definition vs caller argument."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the scope of a variable defined inside a function without the 'global' keyword?",
            "solution": "Local scope (accessible only within that function).",
            "markingScheme": "1 Mark for local scope."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does math.isclose(a, b) do?",
            "solution": "Returns True if values a and b are close to each other within tolerance, avoiding floating-point precision issues.",
            "markingScheme": "1 Mark for float proximity comparison."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Can a function return another function in Python?",
            "solution": "Yes, functions are first-class objects in Python and can be returned from other functions.",
            "markingScheme": "1 Mark for Yes (first-class citizens)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\\ndef f(p, q):\\n    p += [40]\\n    q = q + (40,)\\nlist1 = [10, 20, 30]\\ntup1 = (10, 20, 30)\\nf(list1, tup1)\\nprint(list1)\\nprint(tup1)",
            "solution": "list1 is mutated in-place by +=: [10, 20, 30, 40].\\ntup1 is immutable; q is locally rebound, leaving tup1 unchanged: (10, 20, 30).\\nOutput:\\n[10, 20, 30, 40]\\n(10, 20, 30)",
            "markingScheme": "1 Mark for list mutation, 1 Mark for tuple immutability."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the output:\\nx = 5\\ndef outer():\\n    x = 10\\n    def inner():\\n        nonlocal x\\n        x += 5\\n        print('Inner:', x)\\n    inner()\\n    print('Outer:', x)\\nouter()\\nprint('Global:', x)",
            "solution": "Output:\\nInner: 15\\nOuter: 15\\nGlobal: 5",
            "markingScheme": "2 Marks for Inner: 15, Outer: 15, Global: 5."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the difference between shallow copy (copy.copy) and deep copy (copy.deepcopy) when passing nested lists to functions.",
            "solution": "1. Shallow Copy (copy.copy): Constructs a new compound object and inserts references to the original nested objects. Modifying nested sub-lists affects the original!\\n2. Deep Copy (copy.deepcopy): Recursively duplicates all nested objects, creating completely independent copies that can be modified without affecting the original.",
            "markingScheme": "1.5 Marks for shallow copy explanation, 1.5 Marks for deep copy explanation."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Trace the output:\\ndef mystery(lst):\\n    if not lst: return []\\n    return mystery(lst[1:]) + [lst[0]]\\nprint(mystery([10, 20, 30, 40]))",
            "solution": "Recursive reversal of the list:\\n* mystery([10, 20, 30, 40]) = mystery([20, 30, 40]) + [10]\\n* ...\\nResult: [40, 30, 20, 10]",
            "markingScheme": "1.5 Marks for recursion trace, 1.5 Marks for reversed list [40, 30, 20, 10]."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete modular banking transaction manager with functions:\\n(a) create_account(name, initial_deposit=1000)\\n(b) deposit(acc_id, amount)\\n(c) withdraw(acc_id, amount)\\n(d) get_statement(acc_id)\\nStore accounts in a module-level dictionary and enforce minimum balance rules.",
            "solution": "accounts = {}\\nnext_acc_id = 1001\\n\\ndef create_account(name, initial_deposit=1000):\\n    global next_acc_id\\n    if initial_deposit < 1000:\\n        print('Error: Minimum initial deposit is Rs.1000')\\n        return None\\n    acc_id = next_acc_id\\n    accounts[acc_id] = {'name': name, 'balance': initial_deposit, 'history': [f'Created with Rs.{initial_deposit}']}\\n    next_acc_id += 1\\n    return acc_id\\n\\ndef deposit(acc_id, amount):\\n    if acc_id in accounts and amount > 0:\\n        accounts[acc_id]['balance'] += amount\\n        accounts[acc_id]['history'].append(f'Deposited Rs.{amount}')\\n\\ndef withdraw(acc_id, amount):\\n    if acc_id in accounts and amount > 0:\\n        if accounts[acc_id]['balance'] - amount >= 1000:\\n            accounts[acc_id]['balance'] -= amount\\n            accounts[acc_id]['history'].append(f'Withdrew Rs.{amount}')\\n        else:\\n            print(f'Withdrawal of Rs.{amount} denied: Minimum balance Rs.1000 required.')\\n\\ndef get_statement(acc_id):\\n    if acc_id in accounts:\\n        print(f'Account {acc_id} ({accounts[acc_id][\"name\"]}) Balance: Rs.{accounts[acc_id][\"balance\"]}')\\n        for t in accounts[acc_id]['history']:\\n            print('  *', t)\\n\\nacc = create_account('Mamata', 5000)\\ndeposit(acc, 2000)\\nwithdraw(acc, 5500) # Should fail min balance\\nget_statement(acc)",
            "markingScheme": "1.5 Marks for account creation, 1.5 Marks for deposit, 1.5 Marks for withdraw with min balance check, 1.5 Marks for statement. Total: 6 Marks."
          }
        ]
      }
    ]
  }
];
