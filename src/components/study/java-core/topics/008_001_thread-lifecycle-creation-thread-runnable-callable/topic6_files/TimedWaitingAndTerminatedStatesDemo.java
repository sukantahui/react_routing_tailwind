/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 6: Thread Lifecycle States: TIMED_WAITING (Timeout) vs TERMINATED (Dead)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class TimedWaitingAndTerminatedStatesDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: TIMED_WAITING & TERMINATED STATES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. DEMONSTRATING TIMED_WAITING STATE (Waiting with a maximum duration):
        Thread sleeperThread = new Thread(() -> {
            try {
                // Thread.sleep() transitions thread to TIMED_WAITING:
                Thread.sleep(2000); // Sleeps for 2 seconds
            } catch (InterruptedException e) {
                System.out.println("  [Sleeper Thread] Woken up prematurely via interrupt!");
            }
        }, "Sleeper-Thread");

        sleeperThread.start();
        Thread.sleep(100); // Give sleeperThread time to enter sleep()

        System.out.println(">>> 1. TIMED_WAITING State Inspection:");
        System.out.println("  sleeperThread.getState() : " + sleeperThread.getState() + " (TIMED_WAITING due to Thread.sleep(2000))");

        // Wait for sleeperThread to finish its 2-second sleep and exit run():
        sleeperThread.join();

        // 2. DEMONSTRATING TERMINATED STATE (run() method completed or exception thrown):
        System.out.println("\n>>> 2. TERMINATED State Inspection:");
        System.out.println("  sleeperThread.getState() : " + sleeperThread.getState() + " (TERMINATED / DEAD)");

        // 3. ATTEMPTING TO RESTART A TERMINATED THREAD:
        System.out.println("\n>>> 3. Attempting to restart a TERMINATED thread:");
        try {
            sleeperThread.start(); // A dead thread CANNOT be restarted!
        } catch (IllegalThreadStateException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] " + e.getClass().getSimpleName() + "!");
            System.out.println("  Rule: A terminated thread's call stack is destroyed; it CANNOT be restarted!");
        }

        System.out.println("\n==========================================================================");
    }
}