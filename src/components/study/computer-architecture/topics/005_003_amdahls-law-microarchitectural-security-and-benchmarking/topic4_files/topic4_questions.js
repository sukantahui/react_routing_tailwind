// Question Bank for Topic 4: Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Hardware Performance Monitoring Units (PMUs): Counting Cycles, Instructions, Cache Misses, and Stalls)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
