const topic16_questions = [
  {
    "question": "What does it mean if Object X dominates Object Y in the Eclipse MAT Dominator Tree?",
    "shortAnswer": "It means that every reference path from the GC Roots to Object Y passes through Object X. If Object X is dereferenced and garbage collected, Object Y is guaranteed to be collected as well.",
    "explanation": "Object X is the exclusive gateway keeping Object Y alive.",
    "hint": "Every path from GC Roots to Y goes through X.",
    "level": "Advanced",
    "codeExample": "GC Root -> X -> Y (X dominates Y; removing X frees Y)"
  },
  {
    "question": "How do you use the Dominator Tree in MAT to find the root cause of a memory leak?",
    "shortAnswer": "Sort the Dominator Tree descending by 'Retained Heap'. The topmost root node in the tree is the primary accumulator object retaining the vast majority of leaked memory.",
    "explanation": "Drilling down into the top dominator exposes the leaking collection.",
    "hint": "Sort descending by Retained Heap to find the top hoarding object.",
    "level": "Intermediate",
    "codeExample": "Sort Dominator Tree by Retained Heap -> Expand top row."
  }
];

export default topic16_questions;
