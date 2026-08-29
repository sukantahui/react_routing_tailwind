const questions = [
  {
    id: 1,
    question: "What is the key memory rule when unlinking a node from a Doubly Linked List?",
    options: [
      "Update del->prev->next and del->next->prev pointers before freeing del",
      "Free del first then update pointers",
      "Assign head to NULL",
      "Copy array contents"
    ],
    answer: "Update del->prev->next and del->next->prev pointers before freeing del",
    explanation: "You must reconnect the previous node's next pointer and the next node's prev pointer before invoking free(del) to avoid dangling pointer dereferences."
  }
];

export default questions;
