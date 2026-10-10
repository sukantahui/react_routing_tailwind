export const topic8Questions = [
  {
    id: "t8_q1",
    question: "What does 'Dynamic Typing' mean in Python?",
    options: [
      "A variable can be rebound to point to objects of different data types during program execution without prior type declaration",
      "Variables type themselves automatically on the keyboard",
      "The program types fast",
      "Variables must be declared with `var`"
    ],
    correct: 0,
    explanationEn: "Dynamic typing means variables are not statically bound to a single type; their type is determined at runtime by the object they reference.",
    explanationBn: "ডায়নামিক টাইপিং মানে হলো ভেরিয়েবলের কোনো পূর্বনির্ধারিত নির্দিষ্ট টাইপ থাকে না; প্রোগ্রাম চলাকালীন এটি যেকোনো ডেটা টাইপের অবজেক্টের সাথে যুক্ত হতে পারে।"
  },
  {
    id: "t8_q2",
    question: "In Python's memory model, what does the data type actually belong to?",
    options: [
      "The data OBJECT in heap memory, NOT the variable identifier name",
      "The variable identifier name",
      "The hard drive sector",
      "The compiler text editor"
    ],
    correct: 0,
    explanationEn: "In Python, types belong to values/objects in heap memory. Variables are merely untyped name labels that point to those objects.",
    explanationBn: "পাইথনে ডেটা টাইপ কোনো ভেরিয়েবলের নামের সাথে নয়, বরং মেমরি হিপে তৈরি হওয়া ডেটা অবজেক্টের সাথে যুক্ত থাকে।"
  },
  {
    id: "t8_q3",
    question: "Consider the code snippet:\nx = 100\nx = 'Hello Python'\nWhat will happen when this code runs in Python 3?",
    options: [
      "It executes without error; `x` is rebound from an integer to a string object",
      "It raises a `TypeError: incompatible types`",
      "It raises a `SyntaxError`",
      "It prints `100Hello Python`"
    ],
    correct: 0,
    explanationEn: "Because Python is dynamically typed, reassigning `x` to a string cleanly unbinds `x` from the integer and points it to the string object.",
    explanationBn: "পাইথন ডায়নামিকালি টাইপড হওয়ায় `x`-এ ইন্টিজারের পর স্ট্রিং রাখলে কোনো এরর হয় না; `x` নতুন স্ট্রিং অবজেক্টের দিকে নির্দেশ করে।"
  },
  {
    id: "t8_q4",
    question: "Which built-in function returns the class type of the object currently referenced by a variable?",
    options: [
      "`type(obj)`",
      "`typeof(obj)`",
      "`datatype(obj)`",
      "`class(obj)`"
    ],
    correct: 0,
    explanationEn: "The built-in function `type(obj)` returns the runtime type object of the target.",
    explanationBn: "`type()` ফাংশন কোনো অবজেক্টের বর্তমান ডেটা টাইপ বা ক্লাস প্রদর্শন করে।"
  },
  {
    id: "t8_q5",
    question: "What is the difference between Python's Dynamic Typing and Static Typing in languages like C++ or Java?",
    options: [
      "In static typing, variable types are fixed at compile-time (`int x;`), whereas in dynamic typing, types are resolved at runtime",
      "Static typing runs in the cloud",
      "Dynamic typing is only for web browsers",
      "There is no difference"
    ],
    correct: 0,
    explanationEn: "Static typing enforces compile-time variable type constraints, whereas dynamic typing evaluates types on the fly during execution.",
    explanationBn: "স্ট্যাটিক টাইপিংয়ে কোড কম্পাইল করার আগেই টাইপ নির্দিষ্ট করতে হয়, আর ডায়নামিক টাইপিংয়ে রানটাইমে টাইপ নির্ধারিত হয়।"
  },
  {
    id: "t8_q6",
    question: "What will `isinstance(True, int)` return in Python?",
    options: [
      "`True` (since `bool` is a subclass of `int`)",
      "`False`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "In Python, the `bool` class inherits directly from `int`, so `isinstance(True, int)` returns `True`.",
    explanationBn: "পাইথনে `bool` ক্লাসটি `int` ক্লাসের সাবক্লাস হওয়ায় `isinstance(True, int)` ফলাফল `True` দেয়।"
  },
  {
    id: "t8_q7",
    question: "What error occurs if you execute: `result = 'Score: ' + 95` in Python?",
    options: [
      "`TypeError: can only concatenate str (not 'int') to str`",
      "`SyntaxError`",
      "`ValueError`",
      "No error (evaluates to 'Score: 95')"
    ],
    correct: 0,
    explanationEn: "Python is STRONGLY typed: it does not perform implicit type coercion between strings and integers during concatenation.",
    explanationBn: "পাইথন স্ট্রংলি টাইপড হওয়ায় স্ট্রিং ও সংখ্যার মধ্যে নিজে থেকে টাইপ কনভার্ট করে না এবং `TypeError` দেয়।"
  },
  {
    id: "t8_q8",
    question: "How should you correctly concatenate string `'Score: '` with integer `95`?",
    options: [
      "`'Score: ' + str(95)` (or `f'Score: {95}'`)",
      "`'Score: ' . 95`",
      "`'Score: ' & 95`",
      "`'Score: ' + (int)95`"
    ],
    correct: 0,
    explanationEn: "Explicit typecasting using `str(95)` or f-string formatting safely converts the integer to string before concatenation.",
    explanationBn: "`str(95)` ফাংশন বা f-স্ট্রিং ব্যবহারের মাধ্যমে সংখ্যাটিকে স্পষ্টভাবে স্ট্রিংয়ে রূপান্তর করে জোড়া লাগানো যায়।"
  },
  {
    id: "t8_q9",
    question: "Consider:\nx = 50\nprint(type(x))\nx = [1, 2, 3]\nprint(type(x))\nWhat will be the printed outputs?",
    options: [
      "`<class 'int'>` followed by `<class 'list'>`",
      "`<class 'int'>` followed by `<class 'int'>`",
      "`<class 'number'>` followed by `<class 'array'>`",
      "`TypeError`"
    ],
    correct: 0,
    explanationEn: "`type(x)` dynamically reflects the type of the object currently bound to `x`: first `<class 'int'>`, then `<class 'list'>`.",
    explanationBn: "`type(x)` এর আউটপুট প্রথমে `<class 'int'>` এবং পরবর্তীতে `<class 'list'>` হবে।"
  },
  {
    id: "t8_q10",
    question: "What does 'Duck Typing' refer to in dynamic Python programming?",
    options: [
      "'If it walks like a duck and quacks like a duck, it's a duck' - focusing on what an object can do (its methods) rather than its explicit class type",
      "A game with ducks",
      "A syntax error in audio processing",
      "Drawing animals in terminal"
    ],
    correct: 0,
    explanationEn: "Duck typing checks for the presence of specific methods/attributes at runtime rather than strictly enforcing explicit type inheritance.",
    explanationBn: "ডাক টাইপিং হলো অবজেক্টের নির্দিষ্ট ক্লাস দেখার চেয়ে সে কী মেথড বা কাজ করতে পারে তার উপর ভিত্তি করে কোড চালানোর নীতি।"
  },
  {
    id: "t8_q11",
    question: "What does `isinstance(3.14, (int, float))` return?",
    options: [
      "`True` (since 3.14 is an instance of float, which is in the tuple of accepted types)",
      "`False`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "`isinstance()` accepts a tuple of types and returns True if the object matches ANY of the listed types.",
    explanationBn: "`isinstance()` একাধিক টাইপের টিউপল গ্রহণ করতে পারে এবং যেকোনো একটির সাথে মিললে `True` ফেরত দেয়।"
  },
  {
    id: "t8_q12",
    question: "What is the primary benefit of Dynamic Typing in Python?",
    options: [
      "Rapid prototyping, concise expressive syntax, and freedom from redundant boilerplate type declarations",
      "Guaranteed zero runtime errors",
      "Code runs at assembly speed",
      "Programs never need testing"
    ],
    correct: 0,
    explanationEn: "Dynamic typing eliminates verbose type declarations, enabling fast iterative development and elegant polymorphic code.",
    explanationBn: "ডায়নামিক টাইপিংয়ের মূল সুবিধা হলো দ্রুত প্রোগ্রাম তৈরি, সংক্ষিপ্ত কোড এবং জটিল টাইপ ঘোষণার ঝামেলা থেকে মুক্তি।"
  },
  {
    id: "t8_q13",
    question: "What is a potential risk or disadvantage of Dynamic Typing if code is not properly tested?",
    options: [
      "Type mismatch errors (like `TypeError`) may only surface at runtime rather than being caught early at compile time",
      "Python files cannot be saved to SSD",
      "Variables lose their values every 10 seconds",
      "Computer fans spin faster"
    ],
    correct: 0,
    explanationEn: "Because types are resolved at runtime, type mismatch bugs can slip through to production if thorough unit testing is omitted.",
    explanationBn: "টাইপ মিসম্যাচজনিত ত্রুটিগুলো কোড রান করার আগে ধরা পড়ে না, ফলে যথাযথ টেস্ট না করলে রানটাইমে এরর দেখা দিতে পারে।"
  },
  {
    id: "t8_q14",
    question: "What does Python 3.5+ Type Hinting (PEP 484, e.g. `def add(a: int, b: int) -> int:`) do at runtime?",
    options: [
      "Type hints serve as documentation and static analysis aids (like mypy); Python runtime does NOT enforce them strictly",
      "Python raises a TypeError if a float is passed",
      "It converts Python into C++",
      "It disables dynamic typing completely"
    ],
    correct: 0,
    explanationEn: "Type hints in Python are annotations for linters and IDEs; the standard Python interpreter does NOT enforce them at runtime.",
    explanationBn: "পাইথনের টাইপ হিন্ট মূলত ডকুমেন্টেশন ও IDE-র সাহায্যের জন্য; পাইথন ইন্টারপ্রেটার রানটাইমে এগুলো বাধ্যতামূলক করে না।"
  },
  {
    id: "t8_q15",
    question: "What will `type(lambda x: x)` return in Python?",
    options: [
      "`<class 'function'>`",
      "`<class 'lambda'>`",
      "`<class 'code'>`",
      "`<class 'object'>`"
    ],
    correct: 0,
    explanationEn: "Lambda functions are first-class callable function objects of `<class 'function'>`.",
    explanationBn: "ল্যাম্বডা ফাংশন হলো `<class 'function'>` টাইপের অবজেক্ট।"
  },
  {
    id: "t8_q16",
    question: "What is the output of `type(type(5))` in Python?",
    options: [
      "`<class 'type'>`",
      "`<class 'int'>`",
      "`<class 'class'>`",
      "`<class 'object'>`"
    ],
    correct: 0,
    explanationEn: "`type(5)` is `<class 'int'>`, and the type of the class `int` is `<class 'type'>` (metaclass in Python).",
    explanationBn: "`type(5)` হলো int ক্লাস, আর যেকোনো ক্লাসের টাইপ হলো `<class 'type'>`।"
  },
  {
    id: "t8_q17",
    question: "Consider:\nx = 10\ny = '20'\nprint(x * y)\nWhat will be the output in Python?",
    options: [
      "`'20202020202020202020'` (the string '20' repeated 10 times)",
      "`200`",
      "`TypeError: cannot multiply int and str`",
      "`'200'`"
    ],
    correct: 0,
    explanationEn: "In Python, multiplying an integer with a string performs String Replication (repeating the string N times).",
    explanationBn: "পাইথনে পূর্ণসংখ্যার সাথে স্ট্রিং গুণ করলে স্ট্রিং রিপ্লিকেশন ঘটে (স্ট্রিংটি ১০ বার পুনরাবৃত্তি হয়)।"
  },
  {
    id: "t8_q18",
    question: "What happens when you execute `x = [1, 2]; x = (1, 2)`?",
    options: [
      "`x` is rebound from a mutable list to an immutable tuple",
      "Raises TypeError",
      "Combines them into a dictionary",
      "Deletes the numbers"
    ],
    correct: 0,
    explanationEn: "`x` is seamlessly rebound from the list object to the newly created tuple object in memory.",
    explanationBn: "`x` প্রথমে লিস্টের দিকে নির্দেশ করছিল, পরে টিউপল অবজেক্টের দিকে রিবাইন্ড হয়।"
  },
  {
    id: "t8_q19",
    question: "Which of the following is true regarding Python's typing system?",
    options: [
      "Python is Dynamically Typed and Strongly Typed",
      "Python is Statically Typed and Weakly Typed",
      "Python is Dynamically Typed and Weakly Typed",
      "Python has no typing system"
    ],
    correct: 0,
    explanationEn: "Python is Dynamically Typed (types determined at runtime) AND Strongly Typed (types strictly enforced without implicit corrupting coercions).",
    explanationBn: "পাইথন একই সাথে ডায়নামিকালি টাইপড (রানটাইমে টাইপ নির্ধারণ) এবং স্ট্রংলি টাইপড (টাইপের বিশুদ্ধতা কঠোরভাবে বজায় রাখে)।"
  },
  {
    id: "t8_q20",
    question: "What will `type(3 + 4j)` evaluate to?",
    options: [
      "`<class 'complex'>`",
      "`<class 'imaginary'>`",
      "`<class 'float'>`",
      "`<class 'tuple'>`"
    ],
    correct: 0,
    explanationEn: "Numbers with imaginary unit `j` are instantiated as `<class 'complex'>`.",
    explanationBn: "`3 + 4j` হলো `<class 'complex'>` (জটিল সংখ্যা) টাইপের লিটারেল।"
  },
  {
    id: "t8_q21",
    question: "What is the output of `isinstance(3.0, int)`?",
    options: [
      "`False` (3.0 is a float, not an int)",
      "`True`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "`3.0` is an instance of `<class 'float'>`, which is distinct from `<class 'int'>`, returning `False`.",
    explanationBn: "`3.0` একটি ফ্লোট অবজেক্ট, তাই এটি `int` না হওয়ায় `False` দেয়।"
  },
  {
    id: "t8_q22",
    question: "Consider:\ndef process(data):\n    return data * 2\nWhat will `process(10)` and `process('A')` return?",
    options: [
      "`20` and `'AA'` (demonstrating polymorphic dynamic typing)",
      "`20` and `TypeError`",
      "`'1010'` and `'AA'`",
      "`20` and `20`"
    ],
    correct: 0,
    explanationEn: "Due to dynamic typing, the `*` operator works polymorphically: arithmetic multiplication for integers (`20`), and replication for strings (`'AA'`).",
    explanationBn: "ডায়নামিক পলিমরফিজমের কারণে `*` অপারেটর পূর্ণসংখ্যার ক্ষেত্রে দ্বিগুণ (২০) এবং স্ট্রিংয়ের ক্ষেত্রে পুনরাবৃত্তি ('AA') ঘটায়।"
  },
  {
    id: "t8_q23",
    question: "What will `type([])` and `type({})` evaluate to?",
    options: [
      "`<class 'list'>` and `<class 'dict'>`",
      "`<class 'array'>` and `<class 'set'>`",
      "`<class 'list'>` and `<class 'set'>`",
      "`<class 'tuple'>` and `<class 'dict'>`"
    ],
    correct: 0,
    explanationEn: "`[]` creates a list (`<class 'list'>`) and `{}` creates a dictionary (`<class 'dict'>`).",
    explanationBn: "`[]` হলো লিস্ট এবং `{}` হলো ডিকশনারি টাইপ।"
  },
  {
    id: "t8_q24",
    question: "What is the return value of `isinstance(False, bool)`?",
    options: [
      "`True`",
      "`False`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "`False` is an instance of `<class 'bool'>`, evaluating to `True`.",
    explanationBn: "`False` হলো `bool` ক্লাসের উপাদান, তাই ফলাফল `True`।"
  },
  {
    id: "t8_q25",
    question: "Why should CBSE Class 11 students be mindful of variable rebinding in dynamic typing?",
    options: [
      "To avoid accidentally overwriting a variable holding a list/function with an integer or string later in the code",
      "Because Python deletes files on rebinding",
      "Because variable names can only be 3 letters long",
      "Because rebinding is illegal in CBSE exams"
    ],
    correct: 0,
    explanationEn: "Accidental variable name collisions (e.g. naming a variable `list = [1, 2]` which shadows the built-in `list` constructor) can lead to subtle runtime bugs.",
    explanationBn: "অসাবধানতাবশত একই নামের ভেরিয়েবলে অন্য টাইপের ডেটা রাখলে পূর্বের প্রয়োজনীয় ডেটা হারিয়ে যাওয়ার ঝুঁকি থাকে।"
  }
];
