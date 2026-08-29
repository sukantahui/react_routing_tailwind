const questions = [
  {
    id: 1,
    question: "What is Primary Clustering in Open Addressing Linear Probing?",
    options: [
      "Long contiguous blocks of occupied slots build up, increasing probe sequence length for future keys",
      "Memory leak on the stack",
      "Pointers wrapping around circular lists",
      "Array reallocation failure"
    ],
    answer: "Long contiguous blocks of occupied slots build up, increasing probe sequence length for future keys",
    explanation: "Linear Probing checks consecutive slots `(hash + i) % size`, causing adjacent filled slots to form long clusters that slow down search and insertion times."
  }
];

export default questions;
