export const topic5Questions = [
  {
    id: "t5_q1",
    question: "How are variables fundamentally implemented in Python's memory model?",
    options: [
      "As named object references (labels/pointers) bound to heap memory objects",
      "As fixed hardware memory storage boxes of predefined byte sizes",
      "As static register memory cells",
      "As hard drive sectors"
    ],
    correct: 0,
    explanationEn: "In Python, variables are not fixed memory containers; they are name tags (references) pointing to objects allocated in heap memory.",
    explanationBn: "পাইথনে ভেরিয়েবলগুলো মেমরির স্থির পাত্র নয়, বরং মেমরি হিপে তৈরি অবজেক্টের দিকে নির্দেশকারী নেম ট্যাগ বা রেফারেন্স।"
  },
  {
    id: "t5_q2",
    question: "What does the built-in `id()` function return in Python?",
    options: [
      "The unique integer identity (physical memory address) of the object",
      "The student ID card number",
      "The data type of the variable",
      "The variable name as a string"
    ],
    correct: 0,
    explanationEn: "`id(x)` returns an integer representing the unique memory address of object `x` during its lifecycle.",
    explanationBn: "`id()` ফাংশন কোনো অবজেক্টের মেমরির ঠিকানা বা অনন্য পরিচিতি সংখ্যা প্রদান করে।"
  },
  {
    id: "t5_q3",
    question: "What is the difference between `==` and `is` in Python?",
    options: [
      "`==` tests value/content equality, while `is` tests memory address identity (`id()` equality)",
      "`==` is for numbers only, `is` is for strings only",
      "There is no difference",
      "`is` is an assignment operator"
    ],
    correct: 0,
    explanationEn: "`==` checks if two objects hold identical contents; `is` checks whether two variables point to the exact same object in memory.",
    explanationBn: "`==` ডেটার মান সমান কিনা তা যাচাই করে, আর `is` দুটি ভেরিয়েবল মেমরির একই অবজেক্ট নির্দেশ করছে কিনা (`id()` সমান কিনা) তা পরীক্ষা করে।"
  },
  {
    id: "t5_q4",
    question: "Consider the code:\na = [1, 2, 3]\nb = [1, 2, 3]\nWhat will `a == b` and `a is b` evaluate to?",
    options: [
      "`a == b` is `True`, `a is b` is `False`",
      "Both are `True`",
      "Both are `False`",
      "`a == b` is `False`, `a is b` is `True`"
    ],
    correct: 0,
    explanationEn: "Two separate list literals create two distinct objects in memory (different `id()`), so `==` is True (same elements) and `is` is False.",
    explanationBn: "দুটি পৃথক লিস্ট অবজেক্ট তৈরি হওয়ায় মান একই (`==` True) কিন্তু মেমরি ঠিকানা ভিন্ন (`is` False)।"
  },
  {
    id: "t5_q5",
    question: "Consider the code:\nx = [10, 20]\ny = x\ny.append(30)\nWhat is the value of `x`?",
    options: [
      "`[10, 20, 30]` (since y and x reference the exact same list object)",
      "`[10, 20]`",
      "`[30]`",
      "`Error`"
    ],
    correct: 0,
    explanationEn: "`y = x` aliases `y` to the same list object as `x`. Mutating `y` modifies the shared object, so `x` becomes `[10, 20, 30]`.",
    explanationBn: "`y = x` এর মাধ্যমে `y` এবং `x` একই মেমরি অবজেক্ট শেয়ার করে। তাই `y`-তে পরিবর্তন করলে `x`-ও পরিবর্তিত হয়ে `[10, 20, 30]` হয়।"
  },
  {
    id: "t5_q6",
    question: "What is 'Small Integer Caching' (Interning) in CPython?",
    options: [
      "CPython pre-allocates and caches integer objects in the range -5 to 256 for rapid reuse",
      "Integers smaller than 10 are deleted automatically",
      "A technique to store integers on USB drives",
      "An encryption algorithm"
    ],
    correct: 0,
    explanationEn: "CPython caches integers from -5 to 256 at interpreter startup so any variable assigned a number in this range shares the same cached object.",
    explanationBn: "সিপাইথন -৫ থেকে ২৫৬ পর্যন্ত পূর্ণসংখ্যাগুলোকে পূর্বেই মেমরিতে ক্যাশ করে রাখে যাতে দ্রুত পুনরায় ব্যবহার করা যায়।"
  },
  {
    id: "t5_q7",
    question: "What is 'Reference Counting' in Python's memory management?",
    options: [
      "Tracking the number of references/pointers currently pointing to a heap object",
      "Counting the lines of code in a file",
      "Counting CPU cycles",
      "Counting the number of variables in Python"
    ],
    correct: 0,
    explanationEn: "Reference counting maintains an internal tally of how many active variable names or structures reference an object in memory.",
    explanationBn: "রেফারেন্স কাউন্টিং মেমরির কোনো অবজেক্টের দিকে কতগুলো ভেরিয়েবল নির্দেশ করছে তার হিসাব রাখে।"
  },
  {
    id: "t5_q8",
    question: "When does Python's automatic Garbage Collector reclaim the memory occupied by an object?",
    options: [
      "When the object's reference count drops to 0 (no variable references it anymore)",
      "When the computer is shut down",
      "Every 5 minutes",
      "When the RAM is 100% full"
    ],
    correct: 0,
    explanationEn: "When an object becomes unreachable (reference count reaches 0), the garbage collector automatically deallocates its memory.",
    explanationBn: "যখন কোনো অবজেক্টের রেফারেন্স কাউন্ট শূন্য হয়ে যায় (কোনো ভেরিয়েবল আর তার সাথে যুক্ত থাকে না), তখন গার্বেজ কালেক্টর মেমরি খালি করে দেয়।"
  },
  {
    id: "t5_q9",
    question: "Consider:\np = 50\nq = p\np = 100\nWhat is the value of `q`?",
    options: [
      "50",
      "100",
      "150",
      "None"
    ],
    correct: 0,
    explanationEn: "`p = 100` rebinds name `p` to a new integer object `100`. Name `q` still points to the original integer object `50`.",
    explanationBn: "`p = 100` এর ফলে `p` নতুন অবজেক্ট ১০০-তে রিবাইন্ড হয়, কিন্তু `q` আগের অবজেক্ট ৫০-এর দিকেই নির্দেশ করে।"
  },
  {
    id: "t5_q10",
    question: "Which module in Python allows programmatic inspection and manual triggering of the garbage collector?",
    options: [
      "`gc`",
      "`sys`",
      "`os`",
      "`memory`"
    ],
    correct: 0,
    explanationEn: "The standard library module `gc` provides functions like `gc.collect()` and `gc.get_count()`.",
    explanationBn: "পাইথনের `gc` মডিউল ব্যবহার করে গার্বেজ কালেকশন প্রক্রিয়া নিয়ন্ত্রণ ও পর্যবেক্ষণ করা যায়।"
  },
  {
    id: "t5_q11",
    question: "What will `id(10) == id(10)` return in Python?",
    options: [
      "`True`",
      "`False`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "Because 10 is an interned small integer, both instances reference the identical pre-allocated integer object in memory.",
    explanationBn: "১০ একটি ক্যাশড ইন্টিজার হওয়ায় উভয় ক্ষেত্রে মেমরির ঠিকানা একই থাকে এবং `True` আউটপুট দেয়।"
  },
  {
    id: "t5_q12",
    question: "What happens in Python memory when you execute: `x = 25` followed by `x = 35`?",
    options: [
      "A new integer object 35 is created, and name tag `x` is rebound to 35. Object 25's reference count decreases by 1",
      "The value 25 inside memory box x is overwritten with 35",
      "Python raises a VariableOverwriteError",
      "Memory box x expands by 10 bytes"
    ],
    correct: 0,
    explanationEn: "Python integers are immutable. Assigning a new number creates/references a new object and rebinds the identifier `x`.",
    explanationBn: "পাইথনে ইন্টিজার অপরিবর্তনীয়। নতুন মান দিলে `x` নতুন অবজেক্ট ৩৫-এর সাথে যুক্ত হয় এবং ২৫-এর রেফারেন্স কাউন্ট কমে যায়।"
  },
  {
    id: "t5_q13",
    question: "Which function in the `sys` module returns the reference count of an object?",
    options: [
      "`sys.getrefcount(obj)`",
      "`sys.ref(obj)`",
      "`sys.count(obj)`",
      "`sys.id(obj)`"
    ],
    correct: 0,
    explanationEn: "`sys.getrefcount(obj)` returns the number of references pointing to `obj` (always +1 higher due to the temporary argument reference).",
    explanationBn: "`sys.getrefcount()` ফাংশন কোনো অবজেক্টের মোট সক্রিয় রেফারেন্স সংখ্যা প্রদান করে।"
  },
  {
    id: "t5_q14",
    question: "What is an 'Orphan Object' or 'Garbage' in Python?",
    options: [
      "An allocated heap object that no variable or data structure references anymore",
      "A corrupted Python script",
      "A virus in RAM",
      "A file in Recycle Bin"
    ],
    correct: 0,
    explanationEn: "An orphan object is unreachable memory data with reference count 0, eligible for garbage collection cleanup.",
    explanationBn: "অরফ্যান অবজেক্ট হলো মেমরিতে পড়ে থাকা অপ্রয়োজনীয় ডেটা যার সাথে কোনো ভেরিয়েবলের সংযোগ নেই।"
  },
  {
    id: "t5_q15",
    question: "What is the output of `a = None; b = None; print(a is b)`?",
    options: [
      "`True`",
      "`False`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "`None` is a singleton in Python; every variable assigned `None` points to the exact same unique `None` object.",
    explanationBn: "`None` পাইথনে একটি একক সিঙ্গেলটন অবজেক্ট, তাই সব `None` রেফারেন্সের মেমরি ঠিকানা একই (`is` True)।"
  },
  {
    id: "t5_q16",
    question: "Why should you use `x is None` instead of `x == None` according to PEP 8?",
    options: [
      "Because `None` is a singleton, `is` performs a fast direct pointer address comparison that cannot be overridden by class `__eq__` methods",
      "Because `==` throws a syntax error on None",
      "Because `is` uses less memory",
      "Because Python 3 removed `== None`"
    ],
    correct: 0,
    explanationEn: "PEP 8 mandates `is None` because it directly checks singleton object identity safely and efficiently.",
    explanationBn: "`None` একটি সিঙ্গেলটন হওয়ায় `is None` সরাসরি মেমরি পয়েন্টার যাচাই করে যা দ্রুত ও নিরাপদ।"
  },
  {
    id: "t5_q17",
    question: "Consider:\nstr1 = 'hello'\nstr2 = 'hello'\nWhy does `str1 is str2` evaluate to `True`?",
    options: [
      "Due to String Interning optimization, short immutable string literals without spaces share the same memory object",
      "Because strings are mutable",
      "Because Python has only one string in RAM",
      "It is an error"
    ],
    correct: 0,
    explanationEn: "Python automatically interns short alphanumeric string literals, reusing the same string object in memory.",
    explanationBn: "স্ট্রিং ইন্টার্নিং অপটিমাইজেশনের কারণে ছোট অপরিবর্তনীয় স্ট্রিংগুলো মেমরির একই অবজেক্ট শেয়ার করে।"
  },
  {
    id: "t5_q18",
    question: "What statement explicitly deletes a variable reference name in Python?",
    options: [
      "`del x`",
      "`remove x`",
      "`erase x`",
      "`free(x)`"
    ],
    correct: 0,
    explanationEn: "The `del` keyword unbinds and removes the variable name `x` from the active namespace, decrementing the object's reference count.",
    explanationBn: "`del x` স্টেটমেন্টটি ভেরিয়েবল `x`-কে নেমস্পেস থেকে মুছে দেয় এবং রেফারেন্স কাউন্ট ১ কমিয়ে দেয়।"
  },
  {
    id: "t5_q19",
    question: "What happens if you execute `print(x)` after running `del x`?",
    options: [
      "`NameError: name 'x' is not defined`",
      "Prints `None`",
      "Prints `0`",
      "No output"
    ],
    correct: 0,
    explanationEn: "Deleting `x` unbinds the name, so accessing `x` immediately raises `NameError: name 'x' is not defined`.",
    explanationBn: "`x` মুছে ফেলার পর তাকে অ্যাক্সেস করার চেষ্টা করলে `NameError` দেখা দেয়।"
  },
  {
    id: "t5_q20",
    question: "What is a 'Circular Reference' in Python memory management?",
    options: [
      "Two or more objects referencing each other (e.g. A references B and B references A), preventing reference count from reaching zero",
      "A while loop running in a circle",
      "A circular flowchart",
      "A rounded rectangle token"
    ],
    correct: 0,
    explanationEn: "Circular references occur when objects reference each other in a cycle, handled by Python's cyclic garbage collector.",
    explanationBn: "সার্কুলার রেফারেন্স হলো দুটি অবজেক্ট পরস্পরকে নির্দেশ করার ফলে তৈরি হওয়া চক্র, যা দূর করতে পাইথনের সাইক্লিক GC কাজ করে।"
  },
  {
    id: "t5_q21",
    question: "What is an 'Immutable Object' in Python memory terms?",
    options: [
      "An object whose internal data content cannot be modified in-place after creation (e.g., int, float, str, tuple)",
      "An object that cannot be printed",
      "An object with no id()",
      "A variable that cannot be deleted"
    ],
    correct: 0,
    explanationEn: "Immutable objects (integers, floats, strings, tuples) cannot be mutated in place; modifying them generates a new object.",
    explanationBn: "ইমিউটেবল অবজেক্ট হলো এমন ডেটা যার অভ্যন্তরীণ মান একবার তৈরির পর আর পরিবর্তন করা যায় না (যেমন: int, float, str, tuple)।"
  },
  {
    id: "t5_q22",
    question: "Which of the following data types in Python is MUTABLE (can be modified in-place without changing its `id()`)?",
    options: [
      "`list`",
      "`tuple`",
      "`int`",
      "`str`"
    ],
    correct: 0,
    explanationEn: "Lists (`list`), dictionaries (`dict`), and sets (`set`) are mutable; their elements can change without changing the object's `id()`.",
    explanationBn: "লিস্ট (`list`) একটি পরিবর্তনযোগ্য (Mutable) অবজেক্ট যার উপাদান পরিবর্তন করলেও মেমরির ঠিকানা অপরিবর্তিত থাকে।"
  },
  {
    id: "t5_q23",
    question: "Consider:\nlst = [1, 2]\ninitial_id = id(lst)\nlst.append(3)\nfinal_id = id(lst)\nWhat is the relationship between `initial_id` and `final_id`?",
    options: [
      "`initial_id == final_id` (identical memory address)",
      "`initial_id != final_id`",
      "`final_id` is None",
      "Throws an Exception"
    ],
    correct: 0,
    explanationEn: "Because `list` is mutable, `append()` modifies the list in-place at the exact same memory address (`id()`).",
    explanationBn: "লিস্ট মিউটেবল হওয়ায় `append()` একই মেমরি ঠিকানায় ডেটা যোগ করে, ফলে `id()` অপরিবর্তিত থাকে।"
  },
  {
    id: "t5_q24",
    question: "Consider:\ns = 'cat'\ninitial_id = id(s)\ns = s + 's'\nfinal_id = id(s)\nWhat is the relationship between `initial_id` and `final_id`?",
    options: [
      "`initial_id != final_id` (a new string object 'cats' is created at a new address)",
      "`initial_id == final_id`",
      "`final_id` is 0",
      "Raises TypeError"
    ],
    correct: 0,
    explanationEn: "Strings are immutable. Concatenating creates a completely new string object `'cats'` with a new `id()`, and rebinds `s`.",
    explanationBn: "স্ট্রিং ইমিউটেবল হওয়ায় জোড়া লাগানোর পর নতুন স্ট্রিং অবজেক্ট তৈরি হয় এবং নতুন মেমরি ঠিকানা বরাদ্দ হয়।"
  },
  {
    id: "t5_q25",
    question: "Why is understanding Python's object reference model crucial for CBSE Class 11 students?",
    options: [
      "To prevent unexpected side-effects when aliasing mutable objects (like lists/dicts) and predicting program output accurately",
      "To pass hardware exams",
      "To assemble PC power supplies",
      "Because Python requires manual memory deallocation with free()"
    ],
    correct: 0,
    explanationEn: "Object aliasing with mutable types can cause unintended side effects where modifying one variable inadvertently alters another.",
    explanationBn: "অবজেক্ট রেফারেন্সিং ও অ্যালিয়াসিং বোঝার মাধ্যমে লিস্ট বা ডিকশনারির অনাকাঙ্ক্ষিত পরিবর্তন ও বাগ এড়ানো সম্ভব হয়।"
  }
];
