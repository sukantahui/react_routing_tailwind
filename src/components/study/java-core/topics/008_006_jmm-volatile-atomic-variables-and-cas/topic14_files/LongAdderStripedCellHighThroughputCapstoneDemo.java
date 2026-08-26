/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 14: High-Throughput Concurrency: LongAdder, DoubleAdder & Striped Cells (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.LongAdder;

public class LongAdderStripedCellHighThroughputCapstoneDemo {

    private static final int THREAD_COUNT = 16;
    private static final int ITERATIONS_PER_THREAD = 1_000_000;

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: LongAdder STRIPED CELLS vs AtomicLong (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. BENCHMARK A: AtomicLong (High CAS Contention on a SINGLE memory cell):
        AtomicLong atomicLong = new AtomicLong(0);
        Thread[] atomicThreads = new Thread[THREAD_COUNT];

        long startA = System.currentTimeMillis();
        for (int i = 0; i < THREAD_COUNT; i++) {
            atomicThreads[i] = new Thread(() -> {
                for (int j = 0; j < ITERATIONS_PER_THREAD; j++) {
                    atomicLong.incrementAndGet(); // 16 threads hammering 1 single memory cell!
                }
            });
            atomicThreads[i].start();
        }
        for (Thread t : atomicThreads) t.join();
        long durA = System.currentTimeMillis() - startA;

        // 2. BENCHMARK B: LongAdder (Striped internal Cell[] array minimizing CAS contention):
        LongAdder longAdder = new LongAdder();
        Thread[] adderThreads = new Thread[THREAD_COUNT];

        long startB = System.currentTimeMillis();
        for (int i = 0; i < THREAD_COUNT; i++) {
            adderThreads[i] = new Thread(() -> {
                for (int j = 0; j < ITERATIONS_PER_THREAD; j++) {
                    longAdder.increment(); // Threads update separate internal Cells in parallel!
                }
            });
            adderThreads[i].start();
        }
        for (Thread t : adderThreads) t.join();
        long durB = System.currentTimeMillis() - startB;

        System.out.printf(">>> 16 THREADS x 1,000,000 ITERATIONS BENCHMARK RESULTS:%n");
        System.out.printf("  1. AtomicLong Total Time : %,5d ms (High CAS contention on single cell)%n", durA);
        System.out.printf("  2. LongAdder Total Time  : %,5d ms (Striped Cell[] array optimization)%n", durB);
        System.out.printf("  ⚡ SPEEDUP FACTOR        : LongAdder is %.1fx FASTER!%n", (double) durA / Math.max(durB, 1));
        System.out.printf("  Final Calculated Sum     : %,d%n", longAdder.sum());

        System.out.println("\n>>> ARCHITECTURAL RECOMMENDATION (Doug Lea):");
        System.out.println("  - When many threads frequently update a counter (e.g. web server request metrics, analytics): USE LongAdder!");
        System.out.println("  - When you need exact sequential compareAndSet() logic or identity references: USE AtomicLong!");

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 008_006 JMM, VOLATILE & ATOMICS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}