// Question Bank for Topic 3: Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors?",
    "shortAnswer": "Maximizing instruction execution throughput and minimizing latency while preserving programmatic correctness.",
    "explanation": "In computer systems architecture, Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors establishes the hardware structures, protocols, and timing contracts required to balance compute speed and memory bandwidth.",
    "hint": "Consider how hardware registers, datapath units, and memory hierarchy interact.",
    "level": "basic",
    "codeExample": "// Architectural Performance Invariant for Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors\n// CPU_Time = Instruction_Count * CPI * (1 / Clock_Frequency)"
  },
  {
    "question": "How does hardware micro-architecture ensure data consistency and hazard-free execution under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors?",
    "shortAnswer": "Through dedicated hardware interlocks, data forwarding buses, cache coherence protocols, and in-order retirement buffers.",
    "explanation": "Hardware units monitor operand availability and memory state to prevent read-after-write (RAW) data hazards and stale cache data access during concurrent execution.",
    "hint": "Think about Reorder Buffers (ROB), forwarding paths, and the MESI protocol.",
    "level": "moderate",
    "codeExample": "// Hardware hazard detection logic:\nwire hazard = (id_ex_memread == 1'b1) && ((id_ex_rt == if_id_rs) || (id_ex_rt == if_id_rt));"
  },
  {
    "question": "Advanced Computer Architecture Question 3 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q3 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 4 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q4 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 5 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q5 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 6 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q6 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 7 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q7 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 8 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q8 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 9 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q9 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 10 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q10 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 11 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q11 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 12 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q12 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 13 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q13 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 14 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q14 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 15 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q15 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 16 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q16 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 17 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q17 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 18 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q18 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 19 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q19 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 20 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q20 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 21 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q21 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 22 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q22 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 23 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q23 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 24 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q24 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 25 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q25 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 26 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q26 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 27 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q27 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 28 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "moderate",
    "codeExample": "// Linux perf profiler command trace for Q28 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 29 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "basic",
    "codeExample": "// Linux perf profiler command trace for Q29 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  },
  {
    "question": "Advanced Computer Architecture Question 30 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors): How is performance bottleneck profiling performed in production silicon?",
    "shortAnswer": "By sampling hardware Performance Monitoring Units (PMUs) for cache misses, branch mispredictions, and execution stalls.",
    "explanation": "Modern microprocessors provide integrated PMU counters to measure micro-architectural events (such as L1D miss rates, IPC, and branch prediction accuracy) under Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors.",
    "hint": "Consider Top-Down Micro-architecture Analysis (TMA), Linux perf, and hardware event counters.",
    "level": "expert",
    "codeExample": "// Linux perf profiler command trace for Q30 (Interrupt-Driven I/O: Interrupt Request Lines (INTR), Acknowledge (INTA), and Interrupt Vectors)\n// perf stat -e cycles,instructions,cache-misses,branch-misses ./benchmark_bin"
  }
];

export default questions;
