const topic4_questions = [
  {
    "question": "Why is 'get(index)' an O(1) constant time operation in ArrayList, while 'add(0, element)' is O(n)?",
    "shortAnswer": "'get(index)' is O(1) because ArrayList is backed by a contiguous memory array; the JVM computes the memory address instantly via formula 'baseAddress + (index * referenceSize)'. In contrast, 'add(0, element)' is O(n) because inserting at index 0 requires shifting all existing 'n' elements one slot to the right via 'System.arraycopy()'.",
    "explanation": "Fundamental trade-off of contiguous memory array data structures.",
    "hint": "Contiguous array memory enables direct index calculation; head insertion requires shifting all n elements.",
    "level": "Intermediate",
    "codeExample": "list.get(500); // O(1) address lookup | list.add(0, \"First\"); // O(n) memory shift"
  }
];

export default topic4_questions;