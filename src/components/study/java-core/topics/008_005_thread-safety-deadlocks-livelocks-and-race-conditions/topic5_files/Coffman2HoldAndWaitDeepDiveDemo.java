/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 5: Coffman Condition 2: Hold & Wait (Holding Resources while Requesting More)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class Coffman2HoldAndWaitDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: COFFMAN CONDITION 2: HOLD AND WAIT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHAT IS 'HOLD AND WAIT'?");
        System.out.println("  - A thread is currently HOLDING at least one lock (e.g. Lock A), and WHILE HOLDING IT,");
        System.out.println("    it blocks and WAITS to acquire another lock (e.g. Lock B).");
        System.out.println();
        System.out.println(">>> 2. CODE PATTERN THAT MANIFESTS 'HOLD AND WAIT':");
        System.out.println("    synchronized (lockA) { // Holding Lock A");
        System.out.println("        // Critical: Thread refuses to give up Lock A while trying to get Lock B!");
        System.out.println("        synchronized (lockB) { // Waiting for Lock B");
        System.out.println("            performTransfer();");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println();
        System.out.println(">>> 3. HOW TO BREAK THE 'HOLD AND WAIT' CONDITION:");
        System.out.println("  - Strategy A: All-or-Nothing Acquisition (Acquire all needed locks at once before beginning).");
        System.out.println("  - Strategy B: Release Before Requesting (Release Lock A before attempting to acquire Lock B).");

        System.out.println("\n==========================================================================");
    }
}