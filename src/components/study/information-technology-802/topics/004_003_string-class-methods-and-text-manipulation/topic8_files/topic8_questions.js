export default [
  {
    question: "Given `String str = \"Information Technology\";`, write the exact Java statements to perform the following 4 operations:\n(i) Find the position of 's' in `str`\n(ii) Find the length of `str`\n(iii) Replace 'Technology' with 'Science' in `str`\n(iv) Concatenate ' for me' at the end of `str`",
    answer: "(i) `str.indexOf('s');`\n(ii) `str.length();`\n(iii) `str = str.replace(\"Technology\", \"Science\");`\n(iv) `str = str.concat(\" for me\");`",
    marks: 4,
    hint: "indexOf, length(), replace, and concat."
  },
  {
    question: "In the 4-part question above, what is the output of `str.indexOf('s')` on \"Information Technology\"?",
    options: ["-1", "0", "11", "22"],
    correctAnswer: 0,
    explanation: "Character 's' does not exist anywhere in \"Information Technology\". Therefore, `indexOf('s')` returns -1.",
    marks: 1
  }
];
