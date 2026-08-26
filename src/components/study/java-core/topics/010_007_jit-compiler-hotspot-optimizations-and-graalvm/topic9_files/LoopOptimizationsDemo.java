/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 9: Loop Optimizations - Unrolling, Peeling & Bounds-Check Elimination (BCE)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class LoopOptimizationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: LOOP OPTIMIZATIONS IN HOTSPOT JIT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 MAJOR JIT LOOP OPTIMIZATIONS:");
        System.out.println("  1. LOOP UNROLLING:");
        System.out.println("     - Replicates the loop body 4x, 8x, or 16x.");
        System.out.println("     - Reduces loop counter increments and branch jumps by 75-90%!");
        System.out.println("     - Fills modern CPU superscalar instruction pipelines.\n");

        System.out.println("  2. BOUNDS-CHECK ELIMINATION (BCE):");
        System.out.println("     - In bytecode, 'arr[i]' performs a range check (i >= 0 && i < arr.length).");
        System.out.println("     - If loop condition is 'i < arr.length', JIT proves bounds are mathematically safe.");
        System.out.println("     - JIT eliminates the bounds check assembly instruction inside the loop body!\n");

        System.out.println("  3. LOOP PEELING & INVARIANT CODE MOTION:");
        System.out.println("     - Peels first/last iterations to simplify loop invariants.");
        System.out.println("     - Hoists constant calculations OUTSIDE the loop body so they execute only once!");

        System.out.println("\n==========================================================================");
    }
}
