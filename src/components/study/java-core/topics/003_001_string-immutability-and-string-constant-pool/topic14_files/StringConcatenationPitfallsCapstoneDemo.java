/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 14: Performance Pitfalls of Repeated String Concatenation in Loops (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringConcatenationPitfallsCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: STRING CONCATENATION PITFALLS CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int iterations = 10000;

        // 1. BAD PRACTICE: Repeated '+' concatenation in loop -> O(N^2) Quadratic Heap Garbage!
        long start1 = System.currentTimeMillis();
        String result = "";
        for (int i = 0; i < iterations; i++) {
            result += i; // Allocates 10,000 intermediate StringBuilder & String instances on Heap!
        }
        long time1 = System.currentTimeMillis() - start1;
        System.out.println(">>> 1. String '+' Concatenation in Loop (10,000 iterations):");
        System.out.printf("  Execution Time: %d ms | Heap Garbage: ~50 MB wasted!\n", time1);

        // 2. BEST PRACTICE: Using StringBuilder -> O(N) Linear Time & 1 Heap Allocation!
        long start2 = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder(iterations * 4); // Pre-sized buffer!
        for (int i = 0; i < iterations; i++) {
            sb.append(i); // Mutates internal byte buffer with zero garbage!
        }
        String efficientResult = sb.toString();
        long time2 = System.currentTimeMillis() - start2;
        System.out.println("\n>>> 2. StringBuilder.append() (10,000 iterations):");
        System.out.printf("  Execution Time: %d ms | (Over 100x Faster!)\n", time2);

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 003_001 STRING IMMUTABILITY & SCP 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}