const topic6_questions = [
  {
    "question": "How is the resizing 'threshold' calculated in a HashMap, and why is '0.75f' the default load factor?",
    "shortAnswer": "The resize threshold is calculated as: 'threshold = capacity * loadFactor'. For a default capacity of 16 and load factor of 0.75, threshold is 12 (16 * 0.75). When the 13th element is inserted, HashMap automatically resizes (doubles capacity to 32). '0.75f' provides the optimal statistical balance between time cost (collision search latency) and space cost (unused empty buckets) according to Poisson distribution modeling.",
    "explanation": "Core engineering decision behind Java's hash table architecture.",
    "hint": "threshold = capacity * loadFactor (16 * 0.75 = 12). Resizes upon reaching 13 items.",
    "level": "Intermediate",
    "codeExample": "threshold = (int)(capacity * loadFactor); // 16 * 0.75 = 12"
  }
];

export default topic6_questions;