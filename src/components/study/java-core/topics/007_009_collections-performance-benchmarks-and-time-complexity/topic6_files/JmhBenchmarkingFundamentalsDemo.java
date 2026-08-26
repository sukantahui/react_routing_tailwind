/**
 * Java Core Tutorial - Module 007_009: Collections Performance & Big-O Complexities
 * Topic 6: Microbenchmarking with JMH: JIT Warmup, Dead-Code Elimination & Blackhole
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

public class JmhBenchmarkingFundamentalsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: JMH MICROBENCHMARKING PRINCIPLES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY System.currentTimeMillis() IS FLAWED FOR BENCHMARKS:");
        System.out.println("  1. JIT Compilation Warmup : The HotSpot JVM interprets bytecode first and optimizes it into native assembly (C2 Compiler) ONLY after 10,000+ invocations.");
        System.out.println("  2. Dead-Code Elimination  : If benchmark output is not used, the JIT compiler deletes the entire loop at runtime (yielding 0 ms false results!).");
        System.out.println("  3. On-Stack Replacement   : JIT switches execution modes mid-loop, distorting microsecond timings.");
        System.out.println();
        System.out.println(">>> THE JMH (JAVA MICROBENCHMARK HARNESS) SOLUTION (OpenJDK):");
        System.out.println("  - '@Warmup(iterations = 5)'  : Runs warmup rounds to let JIT C2 compiler fully optimize bytecode before measuring.");
        System.out.println("  - '@Measurement(iterations = 5)': Measures steady-state throughput or latency.");
        System.out.println("  - 'Blackhole.consume(result)': Prevents JIT from eliminating dead code without adding measurement overhead.");
        System.out.println("  - '@BenchmarkMode(Mode.Throughput / Mode.AverageTime)': Selects ops/sec or time/op metrics.");

        System.out.println("\n==========================================================================");
    }
}