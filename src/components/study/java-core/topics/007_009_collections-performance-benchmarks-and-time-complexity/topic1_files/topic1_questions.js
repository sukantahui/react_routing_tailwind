const topic1_questions = [
  {
    "question": "Compare the Big-O time complexity of 'ArrayList.get(index)' vs 'LinkedList.get(index)' and explain the reason.",
    "shortAnswer": "'ArrayList.get(index)' is 'O(1) Constant Time' because an array occupies contiguous memory, allowing the JVM to compute the exact physical RAM address using simple offset arithmetic: 'address = base + (index * 4 bytes)'. In contrast, 'LinkedList.get(index)' is 'O(n) Linear Time' because linked nodes are scattered in heap memory without index math, requiring the JVM to sequentially traverse node pointers from the head or tail until reaching the target position.",
    "explanation": "Core algorithm complexity difference in Java Collections.",
    "hint": "ArrayList is O(1) via direct memory pointer arithmetic; LinkedList is O(n) via pointer traversal.",
    "level": "Intermediate",
    "codeExample": "list.get(5000); // ArrayList: 1 CPU cycle | LinkedList: 5000 pointer hops"
  }
];

export default topic1_questions;