/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 6: StampedLock: Stamp-Based Optimistic Reading & Write Locking in Java 8+
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.locks.StampedLock;

class OptimisticPoint2D {
    private double x, y;
    private final StampedLock sl = new StampedLock();

    // 1. Exclusive Write Lock:
    public void move(double deltaX, double deltaY) {
        long stamp = sl.writeLock(); // Acquires exclusive write lock
        try {
            x += deltaX;
            y += deltaY;
        } finally {
            sl.unlockWrite(stamp);
        }
    }

    // 2. OPTIMISTIC READ (Zero locking overhead!):
    public double distanceFromOrigin() {
        // Step A: Attempt non-blocking optimistic read with a stamp token:
        long stamp = sl.tryOptimisticRead();
        double curX = x, curY = y;

        // Step B: Validate if a writer intervened during our read:
        if (!sl.validate(stamp)) {
            // Step C: Writer intervened! Fallback to a real pessimistic read lock:
            stamp = sl.readLock();
            try {
                curX = x;
                curY = y;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return Math.sqrt(curX * curX + curY * curY);
    }
}

public class StampedLockOptimisticReadingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: StampedLock & OPTIMISTIC READING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        OptimisticPoint2D point = new OptimisticPoint2D();
        point.move(30, 40);

        System.out.printf(">>> Distance calculated via StampedLock: %.2f%n", point.distanceFromOrigin());

        System.out.println("\n>>> WHY StampedLock OUTPERFORMS ReentrantReadWriteLock:");
        System.out.println("  1. Stamp-based Token        : Validates state changes without modifying shared CPU memory headers.");
        System.out.println("  2. Writers Never Starved    : Optimistic reads do NOT block writers!");
        System.out.println("  3. Non-Reentrant by Design  : Extreme raw performance (Warning: self-deadlock if re-entered!).");

        System.out.println("\n==========================================================================");
    }
}