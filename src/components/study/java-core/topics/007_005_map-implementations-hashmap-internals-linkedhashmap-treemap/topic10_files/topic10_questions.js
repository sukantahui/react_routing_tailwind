const topic10_questions = [
  {
    "question": "What are the TWO mandatory conditions required for a HashMap bucket to convert from a linked list into a Red-Black Tree in Java 8+?",
    "shortAnswer": "1. 'Bucket Chain Length': the number of colliding elements in that single bucket must reach or exceed 'TREEIFY_THRESHOLD' (8). 2. 'Total Table Capacity': the total capacity of the HashMap table must be at least 'MIN_TREEIFY_CAPACITY' (64). If the bucket reaches 8 nodes but total capacity is under 64, HashMap resizes (doubles) the table instead of treeifying.",
    "explanation": "Crucial Java 8 HashMap performance enhancement.",
    "hint": "1. Bucket nodes >= 8 (TREEIFY_THRESHOLD) AND 2. Table capacity >= 64 (MIN_TREEIFY_CAPACITY).",
    "level": "Advanced",
    "codeExample": "if (binCount >= TREEIFY_THRESHOLD - 1) { if (tab.length < MIN_TREEIFY_CAPACITY) resize(); else treeifyBin(tab, hash); }"
  }
];

export default topic10_questions;