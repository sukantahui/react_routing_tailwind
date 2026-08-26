/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 6: volatile Guarantee 1: Immediate Memory Visibility Across CPU Caches
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class VolatileMemoryVisibilityDeepDiveDemo {

    // volatile field ensuring cross-thread cache coherence:
    private static volatile String serverStatus = "INITIALIZING";

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: volatile GUARANTEE 1: MEMORY VISIBILITY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread listener = new Thread(() -> {
            System.out.println("  [Listener Thread] Waiting for server status to change from INITIALIZING...");

            // volatile read ensures listener reads directly from main RAM:
            while ("INITIALIZING".equals(serverStatus)) {
                // Spinning without blocking
            }

            System.out.println(">>> [Listener Thread] Detected status update: " + serverStatus + "!");
        }, "Listener-Worker");

        listener.start();
        Thread.sleep(200);

        // State update on main thread:
        System.out.println(">>> [Main Thread] Transitioning serverStatus to 'READY_FOR_STUDENTS'...");
        serverStatus = "READY_FOR_STUDENTS"; // volatile write flushes immediately to main RAM!

        listener.join();

        System.out.println("\n>>> WHAT HAPPENS AT THE HARDWARE LEVEL ON VOLATILE WRITES:");
        System.out.println("  1. Cache Line Invalidation : On x86/ARM, a volatile write triggers the MESI cache coherence protocol.");
        System.out.println("  2. Invalidate Broadcast    : The CPU core broadcasts an 'Invalidate' signal on the system bus.");
        System.out.println("  3. Cache Miss Forced       : All other CPU cores mark their local cache line as 'Invalid', forcing their next read to fetch fresh bytes from L3/RAM!");

        System.out.println("\n==========================================================================");
    }
}