const topic9_questions = [
  {
    "question": "Why must you use 'putIfAbsent()', 'replace(key, oldVal, newVal)', and 'computeIfAbsent()' instead of separate 'if (!map.containsKey(key)) map.put(key, val)' blocks in concurrent code?",
    "shortAnswer": "Because separate 'if (!containsKey) { put(); }' checks are NOT atomic (Check-Then-Act race condition). Between the 'containsKey()' check and the subsequent 'put()' call, another thread can interleave and insert an entry, leading to race conditions and overwritten state. The atomic methods on 'ConcurrentMap' execute the entire verification and mutation as an indivisible atomic operation.",
    "explanation": "Fundamental concurrency pattern: avoiding Check-Then-Act race conditions.",
    "hint": "Atomic methods prevent Check-Then-Act race conditions where other threads interleave between check and mutation.",
    "level": "Intermediate",
    "codeExample": "map.putIfAbsent(k, v); // Atomic Check-Then-Act | map.replace(k, oldVal, newVal); // Atomic CAS"
  }
];

export default topic9_questions;