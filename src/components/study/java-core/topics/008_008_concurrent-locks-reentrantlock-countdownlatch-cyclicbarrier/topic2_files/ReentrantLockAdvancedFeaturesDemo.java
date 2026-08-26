/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 2: ReentrantLock Advanced Features: tryLock(timeout), lockInterruptibly & Fairness
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockAdvancedFeaturesDemo {

    // 1. Fair Lock (true = FIFO Queue; false = Non-fair barging throughput):
    private static final Lock FAIR_LOCK = new ReentrantLock(true);

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: ReentrantLock ADVANCED METHODS & FAIRNESS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 ADVANCED CAPABILITIES OF ReentrantLock:");
        System.out.println();
        System.out.println("  1. Non-Blocking tryLock():");
        System.out.println("     - 'if (lock.tryLock()) { ... } else { doAlternateWork(); }'");
        System.out.println("     - Immediately acquires lock if free; returns false instantly if held by another thread.");
        System.out.println();
        System.out.println("  2. Timed tryLock(timeout, unit):");
        System.out.println("     - 'if (lock.tryLock(500, TimeUnit.MILLISECONDS))'");
        System.out.println("     - Bounded waiting: aborts and backs off if lock cannot be acquired within 500 ms.");
        System.out.println();
        System.out.println("  3. Interruptible Lock Acquisition (lockInterruptibly):");
        System.out.println("     - 'lock.lockInterruptibly()'");
        System.out.println("     - If thread is interrupted while waiting in queue, it immediately aborts and throws InterruptedException!");
        System.out.println();
        System.out.println("  4. Fair vs Non-Fair Construction:");
        System.out.println("     - 'new ReentrantLock(true)'  -> Fair FIFO queue (prevents starvation).");
        System.out.println("     - 'new ReentrantLock(false)' -> Default Non-Fair (allows barging for maximum multi-core throughput).");

        System.out.println("\n==========================================================================");
    }
}