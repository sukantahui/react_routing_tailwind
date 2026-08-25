// Question Bank for Topic 10: Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty) establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Average Memory Access Time (AMAT) Formula: Hit_Time + (Miss_Rate * Miss_Penalty))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
