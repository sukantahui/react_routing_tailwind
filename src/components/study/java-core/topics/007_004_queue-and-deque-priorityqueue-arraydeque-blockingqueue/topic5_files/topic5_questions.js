const topic5_questions = [
  {
    "question": "What are the mathematical formulas used to locate the parent, left child, and right child of a node at index 'i' in PriorityQueue's backing array?",
    "shortAnswer": "In a zero-indexed binary heap array: 1. 'Parent Index' = '(i - 1) / 2' (integer division). 2. 'Left Child Index' = '(2 * i) + 1'. 3. 'Right Child Index' = '(2 * i) + 2'. This allows complete binary trees to be represented compactly in a flat array without allocating separate pointer node objects.",
    "explanation": "Classic binary heap array indexing mathematics.",
    "hint": "Parent: (i-1)/2, Left Child: 2i+1, Right Child: 2i+2.",
    "level": "Intermediate",
    "codeExample": "int parent = (i - 1) >>> 1; int left = (i << 1) + 1; int right = left + 1;"
  }
];

export default topic5_questions;