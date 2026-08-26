// Question Bank for Topic 5: Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Top-Down Micro-architecture Analysis (TMA): Retiring, Bad Speculation, Frontend Bound, and Backend Bound)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
