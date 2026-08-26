const topic6_questions = [
  {
    "question": "How does the 'MESI' cache coherence protocol enforce the memory visibility guarantee of a 'volatile' write at the hardware level?",
    "shortAnswer": "When a CPU core executes a write to a 'volatile' variable, the hardware memory controller triggers a cache coherence protocol (such as MESI: Modified, Exclusive, Shared, Invalid). The core flushes its local Store Buffer directly to the shared L3 cache/RAM and broadcasts an 'Invalidate' message across the CPU interconnect bus. All other CPU cores holding a copy of that cache line transition its state to 'Invalid'. When another thread reads the volatile variable, its core encounters a forced cache-miss and fetches the freshly updated value directly from main memory.",
    "explanation": "Low-level hardware CPU cache coherence and volatile write mechanics.",
    "hint": "MESI protocol invalidates other CPU cores' local cache lines, forcing them to re-read from RAM on the next access.",
    "level": "Advanced",
    "codeExample": "volatile int state; // Writes broadcast MESI invalidate signals to other cores"
  }
];

export default topic6_questions;