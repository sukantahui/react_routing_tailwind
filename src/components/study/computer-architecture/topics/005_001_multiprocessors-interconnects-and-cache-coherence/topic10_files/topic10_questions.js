// Question Bank for Topic 10: Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC) establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Hardware Synchronization Primitives: Atomic Test-and-Set, Compare-and-Swap (CAS), and Load-Linked / Store-Conditional (LL/SC))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
