const topic3_questions = [
  {
    "question": "What are the core tuning constants defined in 'java.util.HashMap' (Initial Capacity, Load Factor, Treeify Threshold)?",
    "shortAnswer": "1. 'DEFAULT_INITIAL_CAPACITY = 16' (1 << 4, must be a power of 2). 2. 'DEFAULT_LOAD_FACTOR = 0.75f' (balances time vs space cost). 3. 'TREEIFY_THRESHOLD = 8' (converts bucket list to Red-Black tree). 4. 'UNTREEIFY_THRESHOLD = 6' (converts tree back to list upon shrinkage). 5. 'MIN_TREEIFY_CAPACITY = 64' (minimum table capacity required for treeification).",
    "explanation": "Fundamental constants defined in the JDK HashMap source code.",
    "hint": "Initial Capacity: 16, Load Factor: 0.75, Treeify Threshold: 8, Untreeify Threshold: 6, Min Treeify Capacity: 64.",
    "level": "Intermediate",
    "codeExample": "static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; static final float DEFAULT_LOAD_FACTOR = 0.75f;"
  }
];

export default topic3_questions;