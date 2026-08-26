/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 0: The 4 Major Limitations of Intrinsic 'synchronized' Monitor Locks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class SynchronizedLimitationsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: LIMITATIONS OF INTRINSIC synchronized - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 CRITICAL LIMITATIONS OF JAVA'S BUILT-IN 'synchronized' KEYWORD:");
        System.out.println();
        System.out.println("  1. No Timed Lock Acquisition (Cannot Timeout):");
        System.out.println("     - If a lock is held by another thread, 'synchronized' blocks INDEFINITELY.");
        System.out.println("     - You cannot specify: 'Wait 500 ms for the lock, then abort'.");
        System.out.println();
        System.out.println("  2. Non-Interruptible Blocking (Cannot Cancel):");
        System.out.println("     - A thread blocked waiting to enter a 'synchronized' block CANNOT be cancelled or interrupted!");
        System.out.println("     - 'Thread.interrupt()' is completely ignored while waiting for monitor entry.");
        System.out.println();
        System.out.println("  3. No Non-Blocking Availability Test (tryLock):");
        System.out.println("     - You cannot check: 'Is this lock currently available? If yes grab it, if not do something else'.");
        System.out.println();
        System.out.println("  4. Single Monolithic Wait-Set Per Object:");
        System.out.println("     - An object has only ONE wait-set; 'notifyAll()' wakes up BOTH producers and consumers together!");
        System.out.println();
        System.out.println(">>> THE SOLUTION: java.util.concurrent.locks.Lock (ReentrantLock)!");

        System.out.println("\n==========================================================================");
    }
}