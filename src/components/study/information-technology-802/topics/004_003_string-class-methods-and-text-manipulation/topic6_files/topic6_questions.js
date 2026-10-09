export default [
  {
    question: "Explain the behavior of `str.substring(int startIndex)` versus `str.substring(int startIndex, int endIndex)` in Java.",
    answer: "`str.substring(startIndex)` extracts all characters starting from `startIndex` (inclusive) up to the very end of the string. `str.substring(startIndex, endIndex)` extracts characters starting from `startIndex` (inclusive) up to `endIndex - 1` (exclusive), meaning the character at `endIndex` is NOT included.",
    marks: 2,
    hint: "Start is inclusive, end is exclusive."
  },
  {
    question: "Given `String s = \"Information\";`, what is the output of `System.out.println(s.substring(3, 7));`?",
    options: ["orma", "format", "ormat", "form"],
    correctAnswer: 0,
    explanation: "s[3]='o', s[4]='r', s[5]='m', s[6]='a'. Index 7 ('t') is excluded. Output is \"orma\".",
    marks: 2
  },
  {
    question: "Given `String str = \"Technology\";`, what is the output of `System.out.println(str.substring(4));`?",
    options: ["nology", "hnology", "ology", "logy"],
    correctAnswer: 0,
    explanation: "Index 4 is 'n'. `substring(4)` extracts from index 4 to end: \"nology\".",
    marks: 1
  }
];
