const questions = [
  {
    question: "What does O(1) mean in time complexity?",
    shortAnswer: "Constant time — the algorithm takes the same time regardless of input size.",
    explanation: "The runtime is independent of n; it doesn't grow as n increases.",
    hint: "Think of operations that don't depend on input.",
    level: "basic",
    codeExample: "// arr[i] — O(1)"
  },
  {
    question: "What is an example of an O(1) operation?",
    shortAnswer: "Accessing an array element by index: arr[i].",
    explanation: "The time to access arr[i] does not depend on the array size.",
    hint: "Direct access.",
    level: "basic",
    codeExample: "int x = arr[5];"
  },
  {
    question: "Is arithmetic addition O(1)?",
    shortAnswer: "Yes, addition of two numbers is O(1).",
    explanation: "It takes constant time regardless of the values.",
    hint: "Basic operation.",
    level: "basic",
    codeExample: "int sum = a + b;"
  },
  {
    question: "Is HashMap.get() O(1)?",
    shortAnswer: "Yes, on average, but O(n) in the worst case (all collisions).",
    explanation: "With a good hash function, get() is O(1) on average.",
    hint: "Hash function.",
    level: "intermediate",
    codeExample: "map.get(key);"
  },
  {
    question: "Is variable assignment O(1)?",
    shortAnswer: "Yes, assigning a value to a variable is O(1).",
    explanation: "It's a single operation that doesn't depend on input size.",
    hint: "Simple assignment.",
    level: "basic",
    codeExample: "int x = 10;"
  },
  {
    question: "Is comparing two numbers O(1)?",
    shortAnswer: "Yes, comparisons like a < b are O(1).",
    explanation: "They take constant time regardless of the values.",
    hint: "Compare.",
    level: "basic",
    codeExample: "if (a < b) { ... }"
  },
  {
    question: "Is bitwise AND (a & b) O(1)?",
    shortAnswer: "Yes, bitwise operations are O(1).",
    explanation: "They operate on fixed-size integers.",
    hint: "Bitwise.",
    level: "basic",
    codeExample: "int result = a & b;"
  },
  {
    question: "Can an O(1) algorithm be slow in practice?",
    shortAnswer: "Yes, if the constant factor is very large.",
    explanation: "O(1) means constant time, but the constant could be 1 million.",
    hint: "Constants matter.",
    level: "intermediate",
    codeExample: "// O(1) but with 1,000,000 operations"
  },
  {
    question: "Is accessing a LinkedList element by index O(1)?",
    shortAnswer: "No, it's O(n) because you must traverse the list.",
    explanation: "LinkedList doesn't support random access.",
    hint: "Traversal required.",
    level: "intermediate",
    codeExample: "// linkedList.get(i) is O(n)"
  },
  {
    question: "What is the best possible time complexity?",
    shortAnswer: "O(1) — constant time.",
    explanation: "It's the fastest possible growth rate.",
    hint: "Independent of n.",
    level: "basic",
    codeExample: "// O(1) is the best"
  },
  {
    question: "Is array length calculation O(1)?",
    shortAnswer: "Yes, arr.length is O(1) in Java.",
    explanation: "Length is stored as a field, accessed directly.",
    hint: "Direct access.",
    level: "basic",
    codeExample: "int len = arr.length;"
  },
  {
    question: "Is String.length() O(1)?",
    shortAnswer: "Yes, in Java String.length() is O(1).",
    explanation: "The length is cached as a field.",
    hint: "Cached value.",
    level: "basic",
    codeExample: "int len = str.length();"
  },
  {
    question: "Is getting the size of an ArrayList O(1)?",
    shortAnswer: "Yes, ArrayList.size() is O(1).",
    explanation: "The size is maintained as a field.",
    hint: "Direct access.",
    level: "basic",
    codeExample: "int size = list.size();"
  },
  {
    question: "Is checking if a number is even O(1)?",
    shortAnswer: "Yes, using n % 2 == 0 is O(1).",
    explanation: "A single modulo operation.",
    hint: "Modulo.",
    level: "basic",
    codeExample: "if (n % 2 == 0) { ... }"
  },
  {
    question: "What is the time complexity of swapping two variables?",
    shortAnswer: "O(1) — constant time.",
    explanation: "A few assignment operations, independent of input size.",
    hint: "Swap.",
    level: "basic",
    codeExample: "int temp = a; a = b; b = temp;"
  },
  {
    question: "Is returning a value from a method O(1)?",
    shortAnswer: "Usually yes, if it's a simple return statement.",
    explanation: "Returning a value is a single operation.",
    hint: "Return.",
    level: "basic",
    codeExample: "return x;"
  },
  {
    question: "What is the time complexity of creating a new object?",
    shortAnswer: "O(1) — constant time (excluding constructor complexity).",
    explanation: "Object creation is a single operation.",
    hint: "New object.",
    level: "basic",
    codeExample: "MyObject obj = new MyObject();"
  },
  {
    question: "Is a simple for loop that runs a constant number of times O(1)?",
    shortAnswer: "Yes, if the number of iterations is fixed and independent of n.",
    explanation: "For example, for (int i = 0; i < 10; i++) is O(1).",
    hint: "Constant iterations.",
    level: "basic",
    codeExample: "for (int i=0; i<10; i++) { ... } // O(1)"
  },
  {
    question: "Is printing a single line of text O(1)?",
    shortAnswer: "Yes, System.out.println() is O(1) for a fixed string.",
    explanation: "Printing a constant string takes constant time.",
    hint: "Print.",
    level: "basic",
    codeExample: "System.out.println(\"Hello\");"
  },
  {
    question: "What is the time complexity of calling a function that is O(1)?",
    shortAnswer: "O(1) — the function call itself is constant time.",
    explanation: "The function call adds minimal overhead.",
    hint: "Function call.",
    level: "basic",
    codeExample: "myMethod(); // O(1) if method is O(1)"
  },
  {
    question: "Can O(1) be achieved with a loop?",
    shortAnswer: "Yes, if the loop runs a constant number of times, independent of n.",
    explanation: "A loop that always runs 100 times is O(1).",
    hint: "Constant iterations.",
    level: "intermediate",
    codeExample: "for (int i=0; i<100; i++) { ... } // O(1)"
  },
  {
    question: "Is accessing a static variable O(1)?",
    shortAnswer: "Yes, static variable access is O(1).",
    explanation: "It's a direct memory access.",
    hint: "Static.",
    level: "basic",
    codeExample: "MyClass.COUNT;"
  },
  {
    question: "Is calling Math.sqrt() O(1)?",
    shortAnswer: "Yes, Math.sqrt() is O(1) for double precision.",
    explanation: "It's a hardware-optimized operation.",
    hint: "Math function.",
    level: "intermediate",
    codeExample: "double root = Math.sqrt(x);"
  },
  {
    question: "What is the time complexity of assigning a value to an array element?",
    shortAnswer: "O(1) — arr[i] = value is constant time.",
    explanation: "It's a direct memory write.",
    hint: "Array assignment.",
    level: "basic",
    codeExample: "arr[5] = 10;"
  },
  {
    question: "Is finding the minimum of two numbers O(1)?",
    shortAnswer: "Yes, Math.min(a,b) is O(1).",
    explanation: "It's a single comparison.",
    hint: "Minimum.",
    level: "basic",
    codeExample: "int min = Math.min(a, b);"
  },
  {
    question: "What is the time complexity of a bit shift operation?",
    shortAnswer: "O(1) — it's a single CPU instruction.",
    explanation: "Bit shifts are very fast.",
    hint: "Bit shift.",
    level: "basic",
    codeExample: "int shifted = x << 2;"
  },
  {
    question: "Is checking for null O(1)?",
    shortAnswer: "Yes, obj == null is O(1).",
    explanation: "It's a direct reference comparison.",
    hint: "Null check.",
    level: "basic",
    codeExample: "if (obj == null) { ... }"
  },
  {
    question: "What is the space complexity of an O(1) algorithm?",
    shortAnswer: "It could be O(1) or O(n) — space complexity is independent of time complexity.",
    explanation: "An O(1) time algorithm can use O(n) space (e.g., a hash table for fast lookups).",
    hint: "Space and time are separate.",
    level: "intermediate",
    codeExample: "// O(1) time, O(n) space"
  },
  {
    question: "Can an algorithm be O(1) in the average case but O(n) in the worst case?",
    shortAnswer: "Yes, like hash table operations.",
    explanation: "Hash table get/put are O(1) average but O(n) worst-case due to collisions.",
    hint: "Worst-case differs.",
    level: "intermediate",
    codeExample: "// HashMap average O(1), worst O(n)"
  },
  {
    question: "Is the time complexity of a function that always returns a constant value O(1)?",
    shortAnswer: "Yes, regardless of input size, it's O(1).",
    explanation: "It doesn't depend on input.",
    hint: "Constant return.",
    level: "basic",
    codeExample: "return 42;"
  }
];

export default questions;