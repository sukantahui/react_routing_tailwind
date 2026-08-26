/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 5: Carrier Threads: How the JVM Mounts and Dispatches Virtual Threads
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class CarrierThreadsMountingMechanicsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: CARRIER THREADS & MOUNTING MECHANICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Inspect carrier thread naming format in Java 21:
        Thread vThread = Thread.ofVirtual().name("Audit-VThread").start(() -> {
            // Thread.currentThread().toString() prints both the Virtual Thread name AND its Carrier Thread:
            System.out.println("  [Execution Trace] " + Thread.currentThread());
        });

        vThread.join();

        System.out.println("\n>>> WHAT IS A CARRIER THREAD?");
        System.out.println("  - A 'Carrier Thread' is a standard OS Platform Thread managed by an internal ForkJoinPool.");
        System.out.println("  - Pool size = 'Runtime.getRuntime().availableProcessors()' (e.g. 8 or 16 carrier threads).");
        System.out.println();
        System.out.println(">>> THE MOUNT & UNMOUNT DANCE:");
        System.out.println("  1. Mount   : To execute CPU bytecode, the JVM scheduler 'mounts' a Virtual Thread onto an available Carrier Thread.");
        System.out.println("  2. Execute : The Carrier Thread runs the virtual thread's bytecode instructions.");
        System.out.println("  3. Unmount : When the virtual thread performs a blocking I/O call (DB/Socket/Sleep), the JVM UNMOUNTS it from the carrier thread!");
        System.out.println("  4. Freeing : The Carrier Thread is instantly freed to pick up and run ANOTHER virtual thread!");

        System.out.println("\n==========================================================================");
    }
}