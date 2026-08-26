const topic1_questions = [
  {
    "question": "Why is ArrayDeque preferred over LinkedList for holding orders at each price level?",
    "shortAnswer": "ArrayDeque provides contiguous memory locality, lower memory overhead (no node pointers), and zero GC node allocation churn, leading to significantly better cache performance and lower latency.",
    "explanation": "High-performance memory layout optimization.",
    "hint": "Contiguous array memory locality and zero node allocation overhead.",
    "level": "Intermediate",
    "codeExample": "NavigableMap<BigDecimal, ArrayDeque<Order>>"
  },
  {
    "question": "What is the time complexity of retrieving the top best bid or best ask in a TreeMap-based order book?",
    "shortAnswer": "O(1) amortized when cached, or O(log P) where P is the number of distinct price levels in the Red-Black tree.",
    "explanation": "Efficient lookups for top of book.",
    "hint": "O(log P) navigation in Red-Black tree.",
    "level": "Intermediate",
    "codeExample": "map.firstKey(); // Best price level"
  }
];

export default topic1_questions;
