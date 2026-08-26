// Question Bank for Topic 1: Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Superscalar Multi-Issue Datapaths: Fetching, Decoding, and Dispatching N Instructions/Cycle)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
