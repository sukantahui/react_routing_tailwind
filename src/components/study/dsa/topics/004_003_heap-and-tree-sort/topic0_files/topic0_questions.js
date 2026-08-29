const questions = [
  {
    id: 1,
    question: "What is the primary memory advantage of Heap Sort over Tree Sort?",
    options: [
      "Heap Sort operates strictly in-place with O(1) auxiliary space, whereas Tree Sort requires O(n) heap memory for BST nodes",
      "Heap Sort requires O(n^2) space",
      "Tree Sort has no heap memory allocation",
      "Heap Sort cannot sort descending data"
    ],
    answer: "Heap Sort operates strictly in-place with O(1) auxiliary space, whereas Tree Sort requires O(n) heap memory for BST nodes",
    explanation: "Heap Sort uses array indexing parent/child math to sort in-place within the array. Tree Sort allocates struct nodes for each item on the heap."
  }
];

export default questions;
