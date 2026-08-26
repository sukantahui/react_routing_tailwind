const topic12_questions = [
  {
    "question": "How do the stack methods 'push(e)', 'pop()', and 'peek()' map to double-ended queue operations in 'ArrayDeque'?",
    "shortAnswer": "In 'ArrayDeque': 1. 'push(e)' maps directly to 'addFirst(e)' (inserting at the head/top). 2. 'pop()' maps directly to 'removeFirst()' (removing and returning from the head/top). 3. 'peek()' maps directly to 'peekFirst()' (inspecting the head/top without removal).",
    "explanation": "Standard mapping defined in the Deque interface.",
    "hint": "push = addFirst, pop = removeFirst, peek = peekFirst.",
    "level": "Beginner",
    "codeExample": "Deque<String> stack = new ArrayDeque<>(); stack.push(\"A\"); String top = stack.pop();"
  }
];

export default topic12_questions;