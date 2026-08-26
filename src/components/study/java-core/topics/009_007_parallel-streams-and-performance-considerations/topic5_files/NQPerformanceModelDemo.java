/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 5: The NQ Model for Parallel Stream Viability (N * Q > 10,000)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.stream.IntStream;

public class NQPerformanceModelDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: THE NQ PERFORMANCE MODEL - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE NQ FORMULA EXPLAINED:");
        System.out.println("  - N = Number of elements in the stream.");
        System.out.println("  - Q = Computational cost (CPU cycles) per element.");
        System.out.println("  - Threshold: N * Q > 10,000 &rarr; Parallel stream is likely faster.");
        System.out.println("  - Threshold: N * Q < 10,000 &rarr; Sequential stream is faster (Thread overhead dominates!)\n");

        // Scenario 1: High N (N = 1,000,000), Low Q (Simple addition) -> N * Q ~ 1,000,000 (BENEFITS FROM PARALLEL)
        int N1 = 1_000_000;
        long start = System.currentTimeMillis();
        long sumSeq = IntStream.rangeClosed(1, N1).sum();
        long seqTime = System.currentTimeMillis() - start;

        start = System.currentTimeMillis();
        long sumPar = IntStream.rangeClosed(1, N1).parallel().sum();
        long parTime = System.currentTimeMillis() - start;

        System.out.println(">>> SCENARIO 1 (N = 1,000,000, Low Q):");
        System.out.println("  - Sequential Time : " + seqTime + " ms");
        System.out.println("  - Parallel Time   : " + parTime + " ms");

        // Scenario 2: Low N (N = 10), High Q (Cryptographic/Mathematical hashing)
        System.out.println("\n>>> SCENARIO 2 (Low N, High Q per element):");
        System.out.println("  - Heavy matrix operations or bcrypt hashing on 20 items yields massive parallel speedups!");
        System.out.println("==========================================================================");
    }
}
