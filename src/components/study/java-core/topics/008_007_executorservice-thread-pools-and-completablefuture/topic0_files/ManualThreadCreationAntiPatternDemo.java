/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 0: Why Manual 'new Thread()' is an Anti-Pattern: Allocation Overhead & OOM Crashes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ManualThreadCreationAntiPatternDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY 'new Thread()' IS AN ANTI-PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 FATAL FLAWS OF MANUAL THREAD CREATION ('new Thread().start()'):");
        System.out.println("  1. Heavyweight Thread Lifecycle Costs:");
        System.out.println("     - Spawning a native OS thread requires allocating ~1 MB of private Call Stack memory.");
        System.out.println("     - Interacting with the OS kernel to create, schedule, and destroy a thread takes significant CPU cycles!");
        System.out.println();
        System.out.println("  2. OutOfMemoryError (OOM) Thread Exhaustion:");
        System.out.println("     - If a web server receives 10,000 requests and spawns 'new Thread()' for each,");
        System.out.println("       10,000 x 1 MB = 10 GB of native stack memory requested!");
        System.out.println("     - The JVM crashes catastrophically with: 'java.lang.OutOfMemoryError: unable to create native thread'!");
        System.out.println();
        System.out.println("  3. Zero Worker Reuse:");
        System.out.println("     - Once a thread completes its task, it dies (TERMINATED) and its stack is discarded.");
        System.out.println();
        System.out.println(">>> THE MODERN SOLUTION: THREAD POOLS & THE EXECUTOR FRAMEWORK:");
        System.out.println("  - Maintain a bounded pool of reusable worker threads that process tasks from an in-memory queue!");

        System.out.println("\n==========================================================================");
    }
}