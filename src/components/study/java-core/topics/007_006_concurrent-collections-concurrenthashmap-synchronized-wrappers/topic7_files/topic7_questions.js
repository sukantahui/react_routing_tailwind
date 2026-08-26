const topic7_questions = [
  {
    "question": "How does 'ConcurrentHashMap' compute its size without creating a global CAS bottleneck across multiple threads?",
    "shortAnswer": "ConcurrentHashMap uses the 'LongAdder / Striped Counter' pattern. It maintains a 'volatile long baseCount' field and a striped 'CounterCell[] counterCells' array. When thread contention on 'baseCount' is low, threads update 'baseCount' via CAS. When contention is high, threads hash to independent 'CounterCell' slots. When 'size()' or 'mappingCount()' is called, it sums 'baseCount' and all active 'CounterCell' values, eliminating global lock or CAS bottlenecks.",
    "explanation": "Core high-throughput concurrency design in java.util.concurrent.",
    "hint": "Striped counters (baseCount + sum of CounterCell array) eliminate CAS storm contention.",
    "level": "Advanced",
    "codeExample": "long sum = baseCount; if (counterCells != null) { for (CounterCell c : counterCells) sum += c.value; }"
  }
];

export default topic7_questions;