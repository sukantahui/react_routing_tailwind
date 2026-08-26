// Question Bank for Topic 9: Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Page Replacement Algorithms: Optimal (OPT), Least Recently Used (LRU), Clock (Second-Chance), and FIFO)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
