// Question Bank for Topic 1: Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN) establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Static Branch Prediction: Always Taken, Always Not-Taken, and Backward-Taken Forward-Not-Taken (BTFN))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
