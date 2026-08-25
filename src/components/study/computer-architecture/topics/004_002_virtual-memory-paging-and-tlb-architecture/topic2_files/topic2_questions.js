// Question Bank for Topic 2: Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Single-Level Page Tables: Page Table Entries (PTE), Valid/Invalid, Dirty, and Protection Bits)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
