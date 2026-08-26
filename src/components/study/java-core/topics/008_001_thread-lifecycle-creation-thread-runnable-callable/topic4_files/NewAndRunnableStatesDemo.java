/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 4: Thread Lifecycle States: NEW & RUNNABLE (Ready vs Running)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class NewAndRunnableStatesDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: NEW & RUNNABLE THREAD STATES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. STATE: NEW (Object allocated on heap, but start() has NOT been called):
        Thread workerThread = new Thread(() -> {
            // Inside run() method:
            System.out.println("  [Inside Worker Thread] Executing task on CPU core...");
            for (int i = 0; i < 1_000_000; i++) {
                // Busy computing
            }
        }, "Worker-Barrackpore");

        System.out.println(">>> 1. Thread Instantiated (Before start()):");
        System.out.println("  workerThread.getState() : " + workerThread.getState() + " (NEW)");

        // 2. STATE: RUNNABLE (start() invoked -> registered with OS thread scheduler):
        workerThread.start();

        System.out.println("\n>>> 2. Thread Started (After start()):");
        System.out.println("  workerThread.getState() : " + workerThread.getState() + " (RUNNABLE)");

        workerThread.join(); // Wait for completion

        System.out.println("\n>>> THE TWO SUB-STATES OF RUNNABLE IN THE OS:");
        System.out.println("  - READY   : The thread is waiting in the OS run-queue for its CPU time-slice.");
        System.out.println("  - RUNNING : The CPU core is currently executing instructions from the thread's PC register.");
        System.out.println("  - Note    : The JVM combines both Ready and Running into a single 'Thread.State.RUNNABLE' state.");

        System.out.println("\n==========================================================================");
    }
}