// Question Bank for Topic 9: Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Inter-Chip Interconnects: Intel Ultra Path Interconnect (UPI) and AMD Infinity Fabric)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
