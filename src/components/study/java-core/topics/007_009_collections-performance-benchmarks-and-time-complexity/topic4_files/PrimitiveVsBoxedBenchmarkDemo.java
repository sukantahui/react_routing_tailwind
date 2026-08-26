/**
 * Java Core Tutorial - Module 007_009: Collections Performance & Big-O Complexities
 * Topic 4: Primitive Arrays vs Boxed Collections: int[] vs ArrayList<Integer> Benchmark
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.List;

public class PrimitiveVsBoxedBenchmarkDemo {

    private static final int ELEMENT_COUNT = 5_000_000;

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: PRIMITIVE ARRAYS vs BOXED COLLECTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> BENCHMARKING " + ELEMENT_COUNT + " INTEGERS ITERATION & SUMMATION:");

        // 1. Primitive int[] Array (Hardware contiguous RAM):
        int[] rawArray = new int[ELEMENT_COUNT];
        for (int i = 0; i < ELEMENT_COUNT; i++) rawArray[i] = i;

        long start1 = System.nanoTime();
        long sum1 = 0;
        for (int i = 0; i < ELEMENT_COUNT; i++) {
            sum1 += rawArray[i]; // Raw L1 CPU cache fetch
        }
        long dur1 = System.nanoTime() - start1;

        // 2. Boxed ArrayList<Integer> (Pointer indirection & auto-unboxing):
        List<Integer> boxedList = new ArrayList<>(ELEMENT_COUNT);
        for (int i = 0; i < ELEMENT_COUNT; i++) boxedList.add(i);

        long start2 = System.nanoTime();
        long sum2 = 0;
        for (int i = 0; i < ELEMENT_COUNT; i++) {
            sum2 += boxedList.get(i); // Auto-unboxing Integer.intValue()
        }
        long dur2 = System.nanoTime() - start2;

        System.out.printf("  1. Primitive int[] Time         : %,12d ns (Sum: %d)%n", dur1, sum1);
        System.out.printf("  2. Boxed ArrayList<Integer> Time: %,12d ns (Sum: %d)%n", dur2, sum2);
        System.out.printf("  ⚡ SPEED DIFFERENCE             : Primitive array is %.2fx FASTER!%n", (double) dur2 / dur1);

        System.out.println("\n>>> WHY PRIMITIVE ARRAYS DESTROY BOXED COLLECTIONS IN RAW SPEED:");
        System.out.println("  1. CPU L1/L2 Cache Locality : 'int[]' loads 16 consecutive integers in a single 64-byte CPU cache line.");
        System.out.println("  2. Zero Pointer Indirection : Direct value access without pointer dereferencing.");
        System.out.println("  3. Zero Auto-Unboxing       : No 'Integer.intValue()' method invocation overhead.");

        System.out.println("\n==========================================================================");
    }
}