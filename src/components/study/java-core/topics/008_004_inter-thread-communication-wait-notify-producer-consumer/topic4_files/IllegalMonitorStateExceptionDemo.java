/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 4: IllegalMonitorStateException: Unowned Lock Enforcement by the JVM
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class IllegalMonitorStateExceptionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: IllegalMonitorStateException ENFORCEMENT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Object lockA = new Object();
        Object lockB = new Object();

        // 1. MISTAKE 1: Calling wait() on an object WITHOUT ANY synchronized block:
        System.out.println(">>> 1. Attempting lockA.wait() without synchronized block:");
        try {
            lockA.wait(); // Not holding lockA monitor!
        } catch (IllegalMonitorStateException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] " + e.getClass().getName());
            System.out.println("  Reason: Current thread does NOT own the monitor lock of lockA!");
        } catch (InterruptedException ignored) {}

        // 2. MISTAKE 2: Synchronizing on Lock A, but calling wait() on Lock B:
        System.out.println("\n>>> 2. Synchronized on lockA, but mistakenly invoking lockB.wait():");
        try {
            synchronized (lockA) {
                System.out.println("  Holding lockA monitor, now calling lockB.wait()...");
                lockB.wait(); // Throws IllegalMonitorStateException because thread owns lockA, NOT lockB!
            }
        } catch (IllegalMonitorStateException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] " + e.getClass().getName());
            System.out.println("  Reason: Thread holds lockA, but tried to manipulate lockB's monitor!");
        } catch (InterruptedException ignored) {}

        System.out.println("\n>>> GOLDEN RULE FOR AVOIDING IllegalMonitorStateException:");
        System.out.println("  - Always ensure the target object passed to 'synchronized(TARGET)' is the EXACT SAME object reference on which '.wait()' or '.notify()' is invoked!");

        System.out.println("\n==========================================================================");
    }
}