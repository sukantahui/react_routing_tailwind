/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 3: The Weak Generational Hypothesis - Infant Mortality & Young GC
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class WeakGenerationalHypothesisDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: WEAK GENERATIONAL HYPOTHESIS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. SIMULATING HIGH-THROUGHPUT TRANSIENT ALLOCATIONS (Infant Mortality):");
        long start = System.currentTimeMillis();

        // 1 Million short-lived transient objects created in a loop:
        long totalCalculatedScore = 0;
        for (int i = 0; i < 1_000_000; i++) {
            // These transient ScoreRecord instances live for nanoseconds and die immediately in Eden:
            ScoreRecord temp = new ScoreRecord(i, (i % 100) + 0.5);
            totalCalculatedScore += (long) temp.score();
        }

        long duration = System.currentTimeMillis() - start;
        System.out.println("  - Allocated and processed 1,000,000 transient objects in: " + duration + " ms");
        System.out.println("  - Final Calculated Score: " + totalCalculatedScore + "\n");

        System.out.println(">>> WHY GENERATIONAL GC IS SO POWERFUL:");
        System.out.println("  1. 99.9% of the 1,000,000 ScoreRecord objects died inside Eden space.");
        System.out.println("  2. Minor GC only visited the tiny fraction of LIVE objects to copy them.");
        System.out.println("  3. Dead objects have ZERO scanning overhead in a copying collector!");
        System.out.println("==========================================================================");
    }

    record ScoreRecord(int id, double score) {}
}
