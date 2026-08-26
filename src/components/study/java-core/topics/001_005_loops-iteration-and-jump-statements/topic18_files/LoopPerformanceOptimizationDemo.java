/**
 * File: LoopPerformanceOptimizationDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 18)
 * Description: Demonstrates enterprise loop performance optimizations in Java:
 *              Loop Invariant Code Motion (Hoisting), avoiding expensive method calls in termination headers,
 *              HotSpot JIT Loop Unrolling, Bounds Check Elimination (BCE),
 *              and large-scale batch student fee reconciliation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

import java.util.ArrayList;
import java.util.List;

public class LoopPerformanceOptimizationDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 18 LOOP PERFORMANCE BEST PRACTICES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        int batchSize = 100_000;
        List<Double> transactionBatch = new ArrayList<>(batchSize);
        for (int i = 0; i < batchSize; i++) {
            transactionBatch.add(500.0); // ₹500 fee token
        }

        // 1. Unoptimized: Repeated Method Invocation in Condition
        System.out.println("--- 1. UNOPTIMIZED PATTERN: REPEATED METHOD CALLS IN HEADER ---");
        long startUnoptimized = System.nanoTime();
        double unoptimizedTotal = 0.0;

        // Condition 'i < transactionBatch.size()' evaluates method on EVERY iteration:
        for (int i = 0; i < transactionBatch.size(); i++) {
            unoptimizedTotal += transactionBatch.get(i);
        }
        long durationUnoptimized = System.nanoTime() - startUnoptimized;
        System.out.printf("  Unoptimized Duration : %,d ns | Total Processed: ₹%,.2f%n",
                durationUnoptimized, unoptimizedTotal);

        // 2. Optimized: Loop Invariant Hoisting (Cached in Header)
        System.out.println("\n--- 2. OPTIMIZED PATTERN: HOISTED SIZE VARIABLE ---");
        long startOptimized = System.nanoTime();
        double optimizedTotal = 0.0;

        // Size is evaluated ONCE in the initialization clause and cached in 'len':
        for (int i = 0, len = transactionBatch.size(); i < len; i++) {
            optimizedTotal += transactionBatch.get(i);
        }
        long durationOptimized = System.nanoTime() - startOptimized;
        System.out.printf("  Optimized Duration   : %,d ns | Total Processed: ₹%,.2f%n",
                durationOptimized, optimizedTotal);

        // 3. Array Traversal & Bounds Check Elimination (BCE)
        System.out.println("\n--- 3. PRIMITIVE ARRAY & BOUNDS CHECK ELIMINATION (BCE) ---");
        double[] primitiveFees = new double[batchSize];
        for (int i = 0; i < batchSize; i++) primitiveFees[i] = 500.0;

        long startArray = System.nanoTime();
        double arrayTotal = 0.0;

        // HotSpot JIT eliminates range boundary checks when iterating 0 to arr.length:
        for (int i = 0, len = primitiveFees.length; i < len; i++) {
            arrayTotal += primitiveFees[i];
        }
        long durationArray = System.nanoTime() - startArray;
        System.out.printf("  Primitive Array Time : %,d ns | Total Processed: ₹%,.2f%n",
                durationArray, arrayTotal);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Hoist invariant calculations: for (int i = 0, len = list.size(); i < len; i++).");
        System.out.println("2. Never call database, network, or complex math methods in loop termination conditions!");
        System.out.println("3. HotSpot C2 JIT automatically unrolls tight loops and performs Bounds Check Elimination.");
        System.out.println("4. For peak throughput in critical financial systems, primitive arrays beat wrapper objects.");
        System.out.println("================================================================================");
    }
}
