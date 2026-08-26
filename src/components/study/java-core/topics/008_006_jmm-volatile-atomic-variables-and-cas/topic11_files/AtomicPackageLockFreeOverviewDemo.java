/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 11: Lock-Free Concurrency: The java.util.concurrent.atomic Package Suite
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.atomic.AtomicInteger;

public class AtomicPackageLockFreeOverviewDemo {

    // 1. LOCK-FREE ATOMIC COUNTER (Thread-safe without synchronized keyword!):
    private static final AtomicInteger atomicCounter = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: java.util.concurrent.atomic OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runnable task = () -> {
            for (int i = 0; i < 50_000; i++) {
                // ATOMIC INCREMENT: Uses internal hardware CAS loop to increment safely:
                atomicCounter.incrementAndGet(); // 100% Thread-Safe & Lock-Free!
            }
        };

        Thread t1 = new Thread(task, "Worker-1");
        Thread t2 = new Thread(task, "Worker-2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(">>> EXPERIMENT RESULTS (50,000 + 50,000 Expected = 100,000):");
        System.out.printf("  Actual Final atomicCounter Value: %,d (100%% EXACT & THREAD-SAFE!)%n",
                atomicCounter.get());

        System.out.println("\n>>> WHY ATOMIC CLASSES OUTPERFORM SYNCHRONIZED:");
        System.out.println("  1. No Thread Sleeping  : Competing threads never enter BLOCKED state; they stay RUNNABLE.");
        System.out.println("  2. Zero OS Overheads   : Eliminates thousands of CPU cycles spent on OS context switching.");
        System.out.println("  3. Non-Blocking Design : If Thread 1 is preempted, Thread 2 continues running without deadlock!");

        System.out.println("\n==========================================================================");
    }
}