/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 6: Coffman Condition 3: No Preemption & Explicit Voluntary Release
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.locks.ReentrantLock;

public class Coffman3NoPreemptionDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: COFFMAN CONDITION 3: NO PREEMPTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHAT IS 'NO PREEMPTION'?");
        System.out.println("  - 'No Preemption' means a lock held by Thread A CANNOT be forcibly taken away or stolen by Thread B or the JVM runtime.");
        System.out.println("  - The lock can ONLY be released voluntarily by the thread that originally acquired it (when exiting 'synchronized' or calling 'unlock()').");
        System.out.println();
        System.out.println(">>> 2. WHY JAVA INTRINSIC 'synchronized' ENFORCES NO PREEMPTION:");
        System.out.println("  - Java prevents lock theft to protect data integrity (if a lock was stolen mid-mutation, memory would be corrupted!).");
        System.out.println("  - Downside: If a thread blocks indefinitely while holding a lock, no one can rescue the system!");
        System.out.println();
        System.out.println(">>> 3. HOW TO BREAK NO PREEMPTION SAFELY:");
        System.out.println("  - Use 'java.util.concurrent.locks.Lock.tryLock(timeout, unit)':");
        System.out.println("    * If a thread cannot acquire the second lock within 500 ms, it gives up, RELEASES its own first lock voluntarily, and backs off!");

        System.out.println("\n==========================================================================");
    }
}