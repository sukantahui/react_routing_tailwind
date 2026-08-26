// Question Bank for Topic 1: Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Classical 5-Stage RISC Pipeline: IF, ID, EX, MEM, and WB)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
