// Question Bank for Topic 6: Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload) establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Micro-Architectural Side-Channel Attacks: Cache Timing Attacks (Prime+Probe, Flush+Reload))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
