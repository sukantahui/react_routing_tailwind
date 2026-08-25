// Question Bank for Topic 5: Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW) establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW)): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW).",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Data Hazards: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW))\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
