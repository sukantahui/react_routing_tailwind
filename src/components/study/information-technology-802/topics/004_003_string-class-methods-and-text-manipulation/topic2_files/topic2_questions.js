export default [
  {
    question: "What is the purpose of the `replace(CharSequence target, CharSequence replacement)` method in Java String?",
    answer: "The `replace()` method searches the calling string and replaces ALL occurrences of the target character sequence with the specified replacement string, returning a new String object.",
    marks: 2,
    hint: "Replaces all occurrences of target substring with replacement."
  },
  {
    question: "Given `String str = \"Information Technology\";`, write a single Java statement to replace \"Technology\" with \"Management\".",
    answer: "str = str.replace(\"Technology\", \"Management\");",
    marks: 2,
    hint: "str.replace(\"Technology\", \"Management\")"
  },
  {
    question: "What is the output of `System.out.println(\"banana\".replace('a', 'o'));`?",
    options: ["bonono", "bonana", "banana", "bononoa"],
    correctAnswer: 0,
    explanation: "The replace method replaces every 'a' with 'o', resulting in 'bonono'.",
    marks: 1
  }
];
