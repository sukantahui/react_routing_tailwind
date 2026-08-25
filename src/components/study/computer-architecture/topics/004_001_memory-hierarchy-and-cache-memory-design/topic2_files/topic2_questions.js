// Question Bank for Topic 2: Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Multi-Level Memory Hierarchy: Registers, L1/L2/L3 SRAM Caches, Main DRAM, and NVMe SSDs)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
