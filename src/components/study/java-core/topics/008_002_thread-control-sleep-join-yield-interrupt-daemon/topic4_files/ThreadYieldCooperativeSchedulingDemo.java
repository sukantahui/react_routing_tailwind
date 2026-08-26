/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 4: Cooperative Scheduling: Thread.yield() Mechanics & Scheduling Hints
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadYieldCooperativeSchedulingDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: Thread.yield() COOPERATIVE SCHEDULING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runnable yieldingTask = () -> {
            for (int i = 1; i <= 3; i++) {
                System.out.printf("  [%s] Executed step #%d - Giving other threads a chance via Thread.yield()...%n",
                        Thread.currentThread().getName(), i);

                // Voluntarily relinquish remaining CPU time-slice to OS scheduler:
                Thread.yield(); // Hint to OS that current thread is willing to yield its core!
            }
        };

        Thread t1 = new Thread(yieldingTask, "Barrackpore-Worker-1");
        Thread t2 = new Thread(yieldingTask, "Naihati-Worker-2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("\n>>> HOW Thread.yield() WORKS INTERNALLY:");
        System.out.println("  1. State Transition : Does NOT move the thread to WAITING or BLOCKED; the thread remains in the 'RUNNABLE' state!");
        System.out.println("  2. OS Re-queuing    : Moves the thread to the back of the OS ready run-queue for threads of EQUAL priority.");
        System.out.println("  3. Non-Binding Hint : The OS kernel scheduler is free to ignore 'yield()' completely.");
        System.out.println("  4. Lock Retention   : Like sleep(), 'yield()' does NOT release any locks held by the thread!");

        System.out.println("\n==========================================================================");
    }
}