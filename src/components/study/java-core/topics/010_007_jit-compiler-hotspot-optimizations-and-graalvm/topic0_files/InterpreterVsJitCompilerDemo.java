/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 0: How Java Executes Code - Interpreter vs JIT Compiler
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class InterpreterVsJitCompilerDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: INTERPRETER VS JIT COMPILER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. BENCHMARKING WARMUP & JIT COMPILATION IN REAL TIME:");

        // Iteration 1: Interpreted execution (Warmup phase)
        long start1 = System.nanoTime();
        long sum1 = computeSum(10_000);
        long time1 = System.nanoTime() - start1;
        System.out.println("  - Run 1 (Interpreted / Warmup) : " + time1 + " ns (Sum: " + sum1 + ")");

        // Warming up the method so JIT compiles it to native machine code:
        for (int i = 0; i < 50_000; i++) {
            computeSum(1_000);
        }

        // Iteration 2: JIT-compiled native execution
        long start2 = System.nanoTime();
        long sum2 = computeSum(10_000);
        long time2 = System.nanoTime() - start2;
        System.out.println("  - Run 2 (JIT Compiled Native) : " + time2 + " ns (Sum: " + sum2 + ")");
        System.out.println("  - Speedup Factor              : " + ((double) time1 / time2) + "x faster! 🚀\n");

        System.out.println(">>> THE HYBRID ARCHITECTURE:");
        System.out.println("  - Interpreter : Zero compilation delay -> Instant application startup.");
        System.out.println("  - JIT Compiler: Detects 'hot spots' -> Compiles to native CPU instructions.");
        System.out.println("==========================================================================");
    }

    static long computeSum(int limit) {
        long total = 0;
        for (int i = 0; i < limit; i++) {
            total += i;
        }
        return total;
    }
}
