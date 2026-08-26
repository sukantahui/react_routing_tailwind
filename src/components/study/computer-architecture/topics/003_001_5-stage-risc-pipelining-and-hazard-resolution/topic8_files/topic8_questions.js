// Question Bank for Topic 8: Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Load-Use Data Hazard: The Unavoidable 1-Cycle Stall and Software Instruction Rescheduling)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
