// Question Bank for Topic 0: Concept of Pipelining: Overlapped Execution and Assembly Line Analogy
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Concept of Pipelining: Overlapped Execution and Assembly Line Analogy?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Concept of Pipelining: Overlapped Execution and Assembly Line Analogy establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Concept of Pipelining: Overlapped Execution and Assembly Line Analogy\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Concept of Pipelining: Overlapped Execution and Assembly Line Analogy.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Concept of Pipelining: Overlapped Execution and Assembly Line Analogy)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
