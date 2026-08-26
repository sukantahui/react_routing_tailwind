/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 13: Thread Priorities (1 to 10) & OS Kernel Scheduling Realities
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadPrioritiesAndOsSchedulingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: THREAD PRIORITIES & OS SCHEDULER REALITIES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 STANDARD THREAD PRIORITY CONSTANTS:");
        System.out.println("  Thread.MIN_PRIORITY  : " + Thread.MIN_PRIORITY + " (Lowest priority)");
        System.out.println("  Thread.NORM_PRIORITY : " + Thread.NORM_PRIORITY + " (Default priority)");
        System.out.println("  Thread.MAX_PRIORITY  : " + Thread.MAX_PRIORITY + " (Highest priority)");

        Thread lowPriorityThread = new Thread(() -> {
            System.out.println("  [Low-Priority Worker] Executing background cleanup...");
        }, "Low-Priority-Worker");

        Thread highPriorityThread = new Thread(() -> {
            System.out.println("  [High-Priority Worker] Executing real-time audit...");
        }, "High-Priority-Worker");

        // Setting priorities:
        lowPriorityThread.setPriority(Thread.MIN_PRIORITY);   // Priority = 1
        highPriorityThread.setPriority(Thread.MAX_PRIORITY);  // Priority = 10

        System.out.println("\n>>> CONFIGURED THREAD PRIORITIES:");
        System.out.println("  Low Worker Priority  : " + lowPriorityThread.getPriority());
        System.out.println("  High Worker Priority : " + highPriorityThread.getPriority());

        System.out.println("\n>>> THE HARD TRUTH ABOUT THREAD PRIORITIES IN MODERN OS KERNELS:");
        System.out.println("  1. Platform Dependency  : Thread priorities are merely HINTS to the OS kernel scheduler. Windows, Linux, and macOS map Java's 1-10 scale differently (e.g. Linux CFS completely ignores Java priorities for non-root users!).");
        System.out.println("  2. Starvation Risk      : Relying on priorities for program correctness is a severe bug. Low-priority threads may starve indefinitely if high-priority threads keep running.");
        System.out.println("  3. Best Practice        : NEVER rely on thread priorities for business logic synchronization!");

        System.out.println("\n==========================================================================");
    }
}