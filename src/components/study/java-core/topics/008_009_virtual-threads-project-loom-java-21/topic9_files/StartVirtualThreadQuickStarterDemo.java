/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 9: Thread.startVirtualThread(Runnable): The Instant One-Line Launcher
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class StartVirtualThreadQuickStarterDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: Thread.startVirtualThread() QUICK LAUNCHER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Instant one-line Virtual Thread launch:
        Thread worker = Thread.startVirtualThread(() -> {
            System.out.println(">>> [Quick Worker] Executing asynchronous task on Virtual Thread!");
            System.out.println("  Thread Name : " + Thread.currentThread().getName()); // Anonymous (empty name)
            System.out.println("  Is Virtual? : " + Thread.currentThread().isVirtual());
        });

        worker.join();

        System.out.println("\n>>> CHARACTERISTICS OF Thread.startVirtualThread():");
        System.out.println("  - Starts immediately (no unstarted state).");
        System.out.println("  - Anonymous by default (no name assigned).");
        System.out.println("  - Ideal for quick scripts, fire-and-forget background operations, and educational demos.");

        System.out.println("\n==========================================================================");
    }
}