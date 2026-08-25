// Question Bank for Topic 10: System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (System-on-Chip (SoC) On-Chip Interconnects: ARM AMBA (AXI, AHB, APB) Bus Standards)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
