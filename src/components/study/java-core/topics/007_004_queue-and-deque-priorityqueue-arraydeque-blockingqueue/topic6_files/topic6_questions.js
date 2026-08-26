const topic6_questions = [
  {
    "question": "Explain the mechanics of 'sift-up' during 'offer()' and 'sift-down' during 'poll()' in a PriorityQueue.",
    "shortAnswer": "1. 'Sift-Up (offer)': The new element is appended to the end of the array. It compares itself with its parent at '(k-1)/2'; if smaller, it swaps with the parent, repeating upward until the heap invariant is restored (O(log n)). 2. 'Sift-Down (poll)': The root at index 0 is returned. The last array element is moved to index 0, then compared with its smallest child; if larger, it swaps downward, repeating until the heap invariant is restored (O(log n)).",
    "explanation": "Core heap algorithms in the Java runtime library.",
    "hint": "offer() uses sift-up from tail to root; poll() replaces root with last item and uses sift-down.",
    "level": "Intermediate",
    "codeExample": "private void siftUp(int k, E x) { ... } private void siftDown(int k, E x) { ... }"
  }
];

export default topic6_questions;