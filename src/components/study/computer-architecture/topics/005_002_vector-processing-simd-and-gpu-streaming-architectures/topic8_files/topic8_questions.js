// Question Bank for Topic 8: GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (GPU Memory Hierarchy: Global Memory, Shared (Scratchpad) Memory, Constant Memory, and Registers)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
