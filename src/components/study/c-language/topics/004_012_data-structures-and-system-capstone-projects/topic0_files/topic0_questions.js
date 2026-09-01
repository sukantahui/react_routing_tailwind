const questions = [
  {
    question: "Why is a double pointer (Node **headRef) required when inserting nodes at the head of a linked list?",
    shortAnswer: "To mutate caller's head pointer variable directly within the function.",
    explanation: "Since C passes arguments by value, passing Node *head passes a copy of the pointer. Passing Node **headRef allows modifying caller's head address.",
    hint: "Use double pointer to modify head pointer variable.",
    level: "advanced"
  }
];

export default questions;
