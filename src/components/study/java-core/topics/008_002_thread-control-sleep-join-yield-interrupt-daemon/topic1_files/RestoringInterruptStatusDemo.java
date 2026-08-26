/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 1: Handling InterruptedException: Restoring Status via Thread.currentThread().interrupt()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class RestoringInterruptStatusDemo {

    // Helper method that catches InterruptedException:
    public static void performBackgroundAudit() {
        try {
            System.out.println("  [Audit Worker] Performing long file I/O audit (sleeping)...");
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            System.out.println("  [Audit Worker] Caught InterruptedException! (JVM cleared the interrupt flag to false!)");

            // CRITICAL BEST PRACTICE: RESTORE INTERRUPT STATUS!
            // When InterruptedException is thrown, the JVM automatically CLEARS the interrupt flag.
            // If you swallow the exception without re-interrupting, callers higher up the stack will never know an interrupt occurred!
            Thread.currentThread().interrupt(); // Restores interrupted status to true!
            System.out.println("  [Audit Worker] Restored interrupt status: " + Thread.currentThread().isInterrupted());
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: RESTORING INTERRUPT STATUS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Thread worker = new Thread(() -> {
            performBackgroundAudit();

            // Checking interrupt status higher up the stack:
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("\n>>> Upper Layer Handler: Detected thread is interrupted! Initiating clean shutdown...");
            }
        }, "Audit-Worker");

        worker.start();
        Thread.sleep(500); // Let worker start sleeping

        // Interrupt worker thread while sleeping:
        System.out.println(">>> Main Thread sending interrupt signal to worker...");
        worker.interrupt();

        worker.join();

        System.out.println("\n==========================================================================");
    }
}