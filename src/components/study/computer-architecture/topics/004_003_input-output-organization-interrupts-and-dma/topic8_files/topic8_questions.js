// Question Bank for Topic 8: DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (DMA Transfer Modes: Burst Mode, Cycle-Stealing Mode, and Transparent (Hidden) DMA)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
