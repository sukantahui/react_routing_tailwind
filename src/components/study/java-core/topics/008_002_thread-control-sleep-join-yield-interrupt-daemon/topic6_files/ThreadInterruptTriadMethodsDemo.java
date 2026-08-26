/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 6: Thread Interrupt API: interrupt(), isInterrupted() vs static Thread.interrupted()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadInterruptTriadMethodsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE 3 INTERRUPT METHODS SUITE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Thread worker = new Thread(() -> {
            System.out.println(">>> 1. Worker thread started running...");

            // Method 1: Check interrupt status using STATIC Thread.interrupted():
            // NOTE: Thread.interrupted() checks status AND CLEARS the flag to false!
            while (true) {
                if (Thread.interrupted()) { // Checks AND CLEARS interrupt flag!
                    System.out.println("  [Worker] Thread.interrupted() detected TRUE and CLEARED the flag!");
                    System.out.println("  [Worker] Subsequent isInterrupted() call returns: " +
                            Thread.currentThread().isInterrupted() + " (Reset to false!)");
                    break;
                }
            }
        }, "Worker-Interrupt-Test");

        worker.start();
        Thread.sleep(100);

        // Method 2: Set the interrupt flag on target thread via instance method:
        System.out.println(">>> 2. Main thread invoking worker.interrupt()...");
        worker.interrupt(); // Sets worker thread's internal interrupt flag = true

        // Method 3: Query interrupt status without clearing via instance method:
        System.out.println(">>> 3. Checking worker.isInterrupted() from main:");
        System.out.println("  worker.isInterrupted() before worker clears it: " + worker.isInterrupted());

        worker.join();

        System.out.println("\n>>> THE 3 INTERRUPT METHODS SUMMARY TABLE:");
        System.out.println("+-------------------------------+---------------+-------------------+---------------------------+");
        System.out.println("| Method                        | Static/Inst   | Action Performed  | Clears Interrupt Flag?    |");
        System.out.println("+-------------------------------+---------------+-------------------+---------------------------+");
        System.out.println("| t.interrupt()                 | Instance      | Sets flag to true | No (Sets to true)         |");
        System.out.println("| t.isInterrupted()             | Instance      | Reads status flag | NO (Preserves flag)       |");
        System.out.println("| Thread.interrupted()          | Static        | Reads status flag | YES (Resets flag to false)|");
        System.out.println("+-------------------------------+---------------+-------------------+---------------------------+");

        System.out.println("\n==========================================================================");
    }
}