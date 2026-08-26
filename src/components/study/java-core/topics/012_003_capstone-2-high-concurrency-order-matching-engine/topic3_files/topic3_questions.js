const topic3_questions = [
  {
    "question": "Why do low-latency trading engines store prices as long integers (micro-units) rather than BigDecimal objects?",
    "shortAnswer": "BigDecimal is an immutable heap object requiring memory allocation, pointer dereferencing, and GC overhead for every calculation; storing prices as scaled 64-bit primitive longs allows hardware registers and CPU ALU arithmetic with zero heap allocation.",
    "explanation": "Essential low-latency optimization technique.",
    "hint": "Eliminates heap allocation and allows CPU register-level integer math.",
    "level": "Advanced",
    "codeExample": "long priceMicros = 3500500000L; // ₹3,500.50 scaled by 10^6"
  },
  {
    "question": "What is the core design principle of the LMAX Disruptor Ring Buffer?",
    "shortAnswer": "Pre-allocating a fixed power-of-two array of mutable event objects at JVM startup and cycling through them using bitwise masking (seq & mask), ensuring zero runtime memory allocation and high CPU L1/L2 cache line hits.",
    "explanation": "The industry standard for sub-microsecond event messaging.",
    "hint": "Pre-allocated circular buffer accessed via bitwise sequence masking.",
    "level": "Advanced",
    "codeExample": "OrderEvent event = ringBuffer[sequence & mask];"
  }
];

export default topic3_questions;
