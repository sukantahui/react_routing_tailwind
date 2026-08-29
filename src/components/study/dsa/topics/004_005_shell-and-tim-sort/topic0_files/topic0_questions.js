const questions = [
  {
    id: 1,
    question: "What is the key idea behind Shell Sort?",
    options: [
      "It generalizes Insertion Sort by allowing exchanges of far-apart elements using a diminishing gap sequence",
      "It uses binary heaps",
      "It uses hash maps",
      "It sorts in reverse order"
    ],
    answer: "It generalizes Insertion Sort by allowing exchanges of far-apart elements using a diminishing gap sequence",
    explanation: "By sorting sub-elements separated by gap `h`, elements move quickly toward their final target position, making final gap=1 insertion sort extremely fast."
  }
];

export default questions;
