export default [
  {
    question: "Given `int[] arr = {15, 30, 45, 60, 75};`, what is the output of `System.out.println(arr[arr.length - 1] - arr[1]);`?",
    options: ["45", "60", "30", "75"],
    correctAnswer: 0,
    explanation: "arr[arr.length - 1] is arr[4] = 75. arr[1] is 30. 75 - 30 = 45.",
    marks: 2
  },
  {
    question: "What is the return value of `Arrays.binarySearch(new int[]{5, 15, 25, 35}, 20);`?",
    options: ["-3", "-2", "2", "-1"],
    correctAnswer: 0,
    explanation: "20 would be inserted at index 2 (between 15 and 25). Formula: -insertion_point - 1 = -2 - 1 = -3.",
    marks: 2
  }
];
