/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 12: The Thread Pinning Pitfall: synchronized Blocks vs ReentrantLock
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ThreadPinningPitfallDemo {

    private static final Object MONITOR_LOCK = new Object();
    private static final Lock EXPLICIT_LOCK = new ReentrantLock();

    // 1. THE PINNING PITFALL (BAD PRACTICE IN VIRTUAL THREADS):
    public static void pinnedMethod() {
        synchronized (MONITOR_LOCK) {
            // If a blocking I/O operation occurs inside a 'synchronized' block,
            // the Virtual Thread is PINNED to its OS Carrier Thread and CANNOT unmount!
            // Result: The underlying OS Carrier Thread is FROZEN!
            try { Thread.sleep(100); } catch (InterruptedException ignored) {}
        }
    }

    // 2. THE PINNING-SAFE SOLUTION (BEST PRACTICE IN JAVA 21):
    public static void pinningSafeMethod() {
        EXPLICIT_LOCK.lock();
        try {
            // ReentrantLock is fully Loom-aware!
            // The Virtual Thread unmounts cleanly even when holding a ReentrantLock!
            try { Thread.sleep(100); } catch (InterruptedException ignored) {}
        } finally {
            EXPLICIT_LOCK.unlock();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: THREAD PINNING & ReentrantLock REMEDY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS THREAD PINNING?");
        System.out.println("  - Pinning occurs when a Virtual Thread executes blocking I/O while:");
        System.out.println("    1. Inside a 'synchronized' block / method, OR");
        System.out.println("    2. Inside a native method / foreign function call (JNI / C-library).");
        System.out.println();
        System.out.println(">>> THE CONSEQUENCE OF PINNING:");
        System.out.println("  - The JVM cannot unmount the virtual thread; the OS Carrier Thread is blocked!");
        System.out.println("  - If 16 virtual threads are pinned, all 16 OS carrier threads freeze, stalling the JVM!");
        System.out.println();
        System.out.println(">>> THE INDUSTRY SOLUTION: REPLACE 'synchronized' WITH 'ReentrantLock'!");

        System.out.println("\n==========================================================================");
    }
}