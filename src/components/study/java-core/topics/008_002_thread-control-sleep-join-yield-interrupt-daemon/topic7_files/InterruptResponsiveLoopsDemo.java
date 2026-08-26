/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 7: Writing Interrupt-Responsive Loops: while (!Thread.currentThread().isInterrupted())
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class InterruptResponsiveLoopsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: WRITING INTERRUPT-RESPONSIVE LOOPS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread taxEngine = new Thread(() -> {
            long invoiceCount = 0;
            System.out.println(">>> 1. Tax Engine loop started (Processing infinite invoices)...");

            // CANONICAL INTERRUPT-RESPONSIVE LOOP PATTERN:
            while (!Thread.currentThread().isInterrupted()) {
                invoiceCount++;
                // Simulating CPU work
                if (invoiceCount % 100_000_000 == 0) {
                    System.out.printf("  [Tax Engine] Processed %,d invoices...%n", invoiceCount);
                }

                // Handling potential blocking operations cleanly inside the loop:
                try {
                    if (invoiceCount % 200_000_000 == 0) {
                        Thread.sleep(10); // Small pause
                    }
                } catch (InterruptedException e) {
                    System.out.println("  [Tax Engine] Caught InterruptedException during pause! Cleaning up buffer...");
                    Thread.currentThread().interrupt(); // Restore flag so while-condition exits immediately!
                }
            }

            // CLEANUP PHASE AFTER LOOP EXITS:
            System.out.printf("\n>>> 2. [Tax Engine] Gracefully shut down after %,d invoices! Closed DB sockets.%n", invoiceCount);
        }, "Tax-Engine-Worker");

        taxEngine.start();
        Thread.sleep(200); // Let taxEngine process invoices

        System.out.println("\n>>> Main Thread issuing polite shutdown request via taxEngine.interrupt()...");
        taxEngine.interrupt();

        taxEngine.join();

        System.out.println("\n==========================================================================");
    }
}