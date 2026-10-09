export default [
  {
    question: "What does `str.indexOf(char ch)` return if the character is found in the string?",
    answer: "It returns the 0-based integer index of the FIRST occurrence of the specified character within the string.",
    marks: 1,
    hint: "0-based index of first occurrence."
  },
  {
    question: "What does `str.indexOf()` return if the character or substring is NOT found in the string?",
    options: ["-1", "0", "null", "StringIndexOutOfBoundsException"],
    correctAnswer: 0,
    explanation: "If the target character or substring does not exist within the string, `indexOf()` returns `-1`.",
    marks: 1
  },
  {
    question: "Given `String str = \"Information Technology\";`, what is the output of `System.out.println(str.indexOf('o'));`?",
    options: ["3", "4", "15", "0"],
    correctAnswer: 0,
    explanation: "In \"Information Technology\", character 'I'=0, 'n'=1, 'f'=2, 'o'=3. The first occurrence of 'o' is at index 3.",
    marks: 2
  }
];
