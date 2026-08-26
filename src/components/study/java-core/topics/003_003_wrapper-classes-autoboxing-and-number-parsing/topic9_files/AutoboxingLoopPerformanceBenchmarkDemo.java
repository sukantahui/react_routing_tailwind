/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 9: Performance Costs of Autoboxing in Tight Loops (Memory Churn Benchmark)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class AutoboxingLoopPerformanceBenchmarkDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: AUTOBOXING LOOP PERFORMANCE BENCHMARK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int iterations = 10_000_000;

        // 1. BAD PRACTICE: Using 'Long' wrapper in loop summation (Triggers 10M Object Allocations!):
        long start1 = System.currentTimeMillis();
        Long boxedSum = 0L; // Wrapper object on Heap!
        for (long i = 0; i < iterations; i++) {
            boxedSum += i; // Unboxes -> Adds -> Allocates BRAND NEW Long(sum) on Heap!
        }
        long time1 = System.currentTimeMillis() - start1;

        System.out.println(">>> 1. Summation with Autoboxed 'Long' Wrapper:");
        System.out.printf("  Sum: %d | Time: %d ms (Created 10 Million temporary Heap objects!)\n", boxedSum, time1);

        // 2. BEST PRACTICE: Using primitive 'long' on CPU Stack:
        long start2 = System.currentTimeMillis();
        long primitiveSum = 0L; // Primitive in CPU register / Stack!
        for (long i = 0; i < iterations; i++) {
            primitiveSum += i; // Pure 64-bit ALU CPU addition with ZERO garbage!
        }
        long time2 = System.currentTimeMillis() - start2;

        System.out.println("\n>>> 2. Summation with Primitive 'long':");
        System.out.printf("  Sum: %d | Time: %d ms (Over 10x Faster! Zero GC Churn!)\n", primitiveSum, time2);

        System.out.println("\n==========================================================================");
    }
}