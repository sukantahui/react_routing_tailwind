const questions = [
  {
    id: 1,
    question: "Why should you assign the return value of realloc() to a temporary pointer instead of the original pointer directly?",
    options: [
      "If realloc fails (returns NULL), the original pointer memory will leak if directly overwritten with NULL",
      "Because realloc doubles the heap size",
      "Because C requires temporary variables",
      "To prevent stack overflow"
    ],
    answer: "If realloc fails (returns NULL), the original pointer memory will leak if directly overwritten with NULL",
    explanation: "If `ptr = realloc(ptr, new_size)` fails, `ptr` becomes `NULL`, losing the memory address of the original block, causing a memory leak!"
  }
];

export default questions;
