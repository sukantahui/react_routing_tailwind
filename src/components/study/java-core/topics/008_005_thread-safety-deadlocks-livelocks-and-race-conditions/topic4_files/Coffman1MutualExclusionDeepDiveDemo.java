/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 4: Coffman Condition 1: Mutual Exclusion (Non-Shareable Locks vs Read-Locks)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.locks.ReentrantReadWriteLock;

public class Coffman1MutualExclusionDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: COFFMAN CONDITION 1: MUTUAL EXCLUSION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHAT IS MUTUAL EXCLUSION IN DEADLOCK FORMATION?");
        System.out.println("  - Mutual Exclusion means a resource can only be held by ONE thread at a time.");
        System.out.println("  - In Java, 'synchronized' blocks and 'ReentrantLock' enforce strict exclusive ownership.");
        System.out.println("  - If Thread A holds the lock, Thread B CANNOT share it and is forced to wait.");
        System.out.println();
        System.out.println(">>> 2. CAN WE BREAK MUTUAL EXCLUSION TO PREVENT DEADLOCKS?");
        System.out.println("  - For pure READ operations, YES! (Using 'ReentrantReadWriteLock.readLock()').");
        System.out.println("  - Multiple reader threads can share the read-lock SIMULTANEOUSLY without blocking each other (Zero Mutual Exclusion for readers!).");
        System.out.println("  - However, for WRITE operations (mutating state), Mutual Exclusion is mathematically MANDATORY to prevent data corruption!");

        System.out.println("\n==========================================================================");
    }
}