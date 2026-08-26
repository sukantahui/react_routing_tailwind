const topic8_questions = [
  {
    "question": "How does combining 'HashMap' and 'PriorityQueue' solve the 'Top K Frequent Elements' problem in optimal O(N log K) time?",
    "shortAnswer": "1. A 'HashMap' counts the frequencies of all N elements in O(N) time. 2. A 'PriorityQueue' Min-Heap bounded to size K keeps the highest-frequency elements. When a new element is offered, if the heap size exceeds K, the minimum frequency element is evicted via 'poll()' in O(log K) time. Iterating through all distinct elements takes O(N log K) time and O(N) space, massively outperforming a full O(N log N) collection sort.",
    "explanation": "Premier FAANG algorithmic interview challenge using Java Collections.",
    "hint": "HashMap counts frequencies in O(N); Min-Heap bounded to K keeps top elements in O(N log K).",
    "level": "Advanced",
    "codeExample": "PriorityQueue<String> minHeap = new PriorityQueue<>(Comparator.comparingInt(freq::get));"
  }
];

export default topic8_questions;