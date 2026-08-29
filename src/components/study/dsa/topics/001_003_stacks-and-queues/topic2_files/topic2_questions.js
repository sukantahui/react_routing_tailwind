const questions = [
  {
    id: 1,
    question: "What is the primary limitation of a fixed 1D array-based Linear Queue?",
    options: [
      "Once rear reaches index MAX-1, no new elements can be enqueued even if front elements have been dequeued",
      "Linear queues require O(n^2) space",
      "Pointers crash on dequeue",
      "Linear queues cannot store numbers"
    ],
    answer: "Once rear reaches index MAX-1, no new elements can be enqueued even if front elements have been dequeued",
    explanation: "As elements are dequeued, `front` advances rightward, leaving unused empty slots on the left that a linear queue cannot re-use."
  }
];

export default questions;
