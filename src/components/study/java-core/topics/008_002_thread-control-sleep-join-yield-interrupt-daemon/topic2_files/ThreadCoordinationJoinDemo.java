/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 2: Thread Coordination: Synchronizing Parallel Tasks via thread.join()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadCoordinationJoinDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THREAD COORDINATION WITH thread.join() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Simulating 3 asynchronous branch loading tasks:
        Thread taskBarrackpore = new Thread(() -> {
            System.out.println("  [Task-1] Loading Barrackpore student records...");
            try { Thread.sleep(400); } catch (InterruptedException ignored) {}
            System.out.println("  [Task-1] Barrackpore records loaded successfully!");
        }, "Task-Barrackpore");

        Thread taskNaihati = new Thread(() -> {
            System.out.println("  [Task-2] Loading Naihati student records...");
            try { Thread.sleep(600); } catch (InterruptedException ignored) {}
            System.out.println("  [Task-2] Naihati records loaded successfully!");
        }, "Task-Naihati");

        System.out.println(">>> 1. Launching parallel branch loader threads in background...");
        taskBarrackpore.start();
        taskNaihati.start();

        System.out.println(">>> 2. Main thread waiting for both background tasks to finish via join()...");

        // Calling join() blocks the CALLING thread (main) until target threads terminate:
        taskBarrackpore.join(); // Blocks until taskBarrackpore enters TERMINATED state
        taskNaihati.join();     // Blocks until taskNaihati enters TERMINATED state

        System.out.println("\n>>> 3. BOTH BRANCHES FULLY LOADED! Generating combined master report...");
        System.out.println("  [Master Report] All regional accounting databases verified!");

        System.out.println("\n==========================================================================");
    }
}