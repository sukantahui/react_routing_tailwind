// Question Bank for Topic 2: Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Pipeline Register Latches: IF/ID, ID/EX, EX/MEM, and MEM/WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
