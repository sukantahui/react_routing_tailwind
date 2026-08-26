/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 3: Bounded Thread Waiting: Overloaded thread.join(millis) to Prevent Hanging
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class BoundedJoinTimeoutDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: BOUNDED thread.join(millis) TIMEOUTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Simulating a slow network database query (takes 5 seconds):
        Thread slowDatabaseQuery = new Thread(() -> {
            try {
                System.out.println("  [DB Query Thread] Querying remote server (takes 5000 ms)...");
                Thread.sleep(5000);
                System.out.println("  [DB Query Thread] Finished remote query!");
            } catch (InterruptedException e) {
                System.out.println("  [DB Query Thread] Interrupted!");
            }
        }, "Slow-DB-Worker");

        slowDatabaseQuery.start();

        System.out.println(">>> 1. Main thread waiting with a MAXIMUM SLA TIMEOUT OF 1000 ms:");
        // Calling join(1000) transitions main thread to TIMED_WAITING for at most 1 second:
        slowDatabaseQuery.join(1000); // Waits up to 1000 ms!

        if (slowDatabaseQuery.isAlive()) {
            System.out.println("\n>>> 2. SLA TIMEOUT EXCEEDED! DB Query took > 1000 ms!");
            System.out.println("  Main thread resumes immediately and cancels the slow query via interrupt()...");
            slowDatabaseQuery.interrupt(); // Cancel slow worker
        } else {
            System.out.println("\n>>> 2. DB Query completed within 1000 ms SLA!");
        }

        slowDatabaseQuery.join(); // Clean join

        System.out.println("\n>>> WHY UNBOUNDED join() IS DANGEROUS IN ENTERPRISE PRODUCTION:");
        System.out.println("  - If an external microservice or database hangs indefinitely, an unbounded 'thread.join()' will block the calling thread forever!");
        System.out.println("  - Always use bounded 'thread.join(millis)' to enforce Service Level Agreements (SLAs) and fail fast.");

        System.out.println("\n==========================================================================");
    }
}