/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 7: Concurrency Synchronizer 1: CountDownLatch (One-Time Gatekeeper)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.CountDownLatch;

public class CountDownLatchGatekeeperDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CountDownLatch SYNCHRONIZER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        int workerCount = 3;
        // CountDownLatch initialized with N=3 events:
        CountDownLatch latch = new CountDownLatch(workerCount);

        for (int i = 1; i <= workerCount; i++) {
            final int workerId = i;
            new Thread(() -> {
                try {
                    System.out.printf("  [Audit Worker #%d] Verifying branch accounts...%n", workerId);
                    Thread.sleep(workerId * 150);
                    System.out.printf("  [Audit Worker #%d] VERIFIED! Counting down latch.%n", workerId);
                } catch (InterruptedException ignored) {
                } finally {
                    // Decrement latch count atomically:
                    latch.countDown();
                }
            }, "Worker-" + i).start();
        }

        System.out.println(">>> Main Thread waiting at latch.await() for all 3 workers to finish...");
        // BLOCKS until count reaches ZERO:
        latch.await();

        System.out.println("\n>>> LATCH OPENED (Count reached 0)! Main thread generates final Tax Return!");

        System.out.println("\n==========================================================================");
    }
}