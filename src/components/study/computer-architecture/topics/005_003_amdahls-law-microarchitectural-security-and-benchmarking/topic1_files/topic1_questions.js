// Question Bank for Topic 1: Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Gustafson’s Law (Scaled Speedup): Why Massive Parallelism Scales in Real Big-Data Workloads)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
