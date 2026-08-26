/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 2: What is a Deadlock: Two Threads Permanently Blocked Waiting for Each Other
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class DeadlockDefinitionConceptDemo {

    private static final Object LOCK_BARRACKPORE = new Object();
    private static final Object LOCK_NAIHATI = new Object();

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: WHAT IS A DEADLOCK (CONCEPT & ANATOMY) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE CLASSICAL DEFINITION OF DEADLOCK:");
        System.out.println("  'A Deadlock is a situation where two or more threads are blocked forever,");
        System.out.println("   each waiting for a resource/lock that is held by another thread in the group.'");
        System.out.println();
        System.out.println(">>> THE DEADLOCK SCENARIO (SWADEEP vs TUHINA):");
        System.out.println("  1. Swadeep's Thread acquires LOCK_BARRACKPORE, then attempts to acquire LOCK_NAIHATI.");
        System.out.println("  2. Tuhina's Thread acquires LOCK_NAIHATI, then attempts to acquire LOCK_BARRACKPORE.");
        System.out.println("  3. Swadeep is holding Barrackpore waiting for Naihati.");
        System.out.println("  4. Tuhina is holding Naihati waiting for Barrackpore.");
        System.out.println("  5. Result: NEITHER THREAD CAN PROCEED! The JVM process freezes permanently in a mutual embrace!");

        System.out.println("\n==========================================================================");
    }
}