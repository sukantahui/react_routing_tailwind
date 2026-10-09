export default [
  {
    question: "What is the difference between `==` and `.equals()` when comparing two String variables in Java?",
    answer: "The `==` relational operator compares object memory references (whether both variables point to the exact same heap memory location). The `.equals()` method compares the actual content / character sequence inside the String objects.",
    marks: 2,
    hint: "Memory address comparison vs character content comparison."
  },
  {
    question: "Given `String s1 = new String(\"IT\"); String s2 = new String(\"IT\");`, what is the result of `s1 == s2` and `s1.equals(s2)`?",
    options: [
      "`s1 == s2` is false; `s1.equals(s2)` is true",
      "`s1 == s2` is true; `s1.equals(s2)` is true",
      "`s1 == s2` is false; `s1.equals(s2)` is false",
      "`s1 == s2` is true; `s1.equals(s2)` is false"
    ],
    correctAnswer: 0,
    explanation: "Because `new` creates two distinct heap objects, their memory references differ (`s1 == s2` is false). However, their character sequences are both \"IT\", so `equals()` returns true.",
    marks: 2
  },
  {
    question: "What method performs a case-insensitive string comparison in Java?",
    options: ["str1.equalsIgnoreCase(str2)", "str1.equals(str2)", "str1.compare(str2)", "str1.caseEquals(str2)"],
    correctAnswer: 0,
    explanation: "`equalsIgnoreCase()` compares two strings ignoring differences between uppercase and lowercase letters.",
    marks: 1
  }
];
