// Question Bank for Topic 9: Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Hardware and Microcode Mitigations: Kernel Page Table Isolation (KPTI), Retpolines, and IBRS)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
