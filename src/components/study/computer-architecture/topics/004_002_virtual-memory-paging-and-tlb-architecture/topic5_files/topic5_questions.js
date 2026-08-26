// Question Bank for Topic 5: Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Memory Management Unit (MMU) Hardware Architecture and Page Walk Mechanism)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
