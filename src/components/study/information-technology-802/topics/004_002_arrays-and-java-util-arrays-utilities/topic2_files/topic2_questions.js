export default [
  {
    question: "Given the array: `int[] a = {12, 18, 25, 30, 42, 55};`, what is the output of `System.out.println(a[5] - a[0]);`?",
    options: ["43", "55", "12", "30"],
    correctAnswer: 0,
    explanation: "a[5] is 55, and a[0] is 12. 55 - 12 = 43.",
    marks: 2
  },
  {
    question: "Given `double[] Marks = {93.0, 87.5, 97.5, 65.0, 70.0};`, what is the result of `Marks[2] + Marks[3]`?",
    options: ["162.5", "180.5", "152.5", "167.5"],
    correctAnswer: 0,
    explanation: "Marks[2] is 97.5, Marks[3] is 65.0. 97.5 + 65.0 = 162.5.",
    marks: 2
  },
  {
    question: "What is the output of the following Java snippet?\nint[] x = {5, 10, 15, 20};\nint i = 1;\nSystem.out.println(x[++i] * x[0]);",
    options: ["75", "50", "100", "25"],
    correctAnswer: 0,
    explanation: "`++i` increments i from 1 to 2 before accessing array index. x[2] is 15. x[0] is 5. 15 * 5 = 75.",
    marks: 2
  }
];
