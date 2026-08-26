const topic0_questions = [
  {
    "question": "Why do modern multi-core CPU architectures require L1/L2/L3 hardware caches, and how does this create concurrency bugs?",
    "shortAnswer": "Modern CPU registers execute instructions in ~0.5 nanoseconds, whereas reading from main system RAM takes ~60–100 nanoseconds (~200x slower, the 'Memory Wall'). To prevent CPU starvation, CPU cores maintain ultra-fast private L1 and L2 hardware caches. When multiple threads execute on different cores, each core caches local copies of shared variables in its private L1 cache. Writes made by Core 1 remain buffered in Core 1's local cache and are not immediately propagated to RAM, causing Core 2 to read stale, un-updated values.",
    "explanation": "Fundamental computer architecture and hardware memory wall analysis.",
    "hint": "RAM is ~200x slower than CPU; private L1/L2 caches store local copies that become stale across cores.",
    "level": "Intermediate",
    "codeExample": "// Core 1 cache: x = 42; | Core 2 cache: x = 0 (stale value!)"
  }
];

export default topic0_questions;