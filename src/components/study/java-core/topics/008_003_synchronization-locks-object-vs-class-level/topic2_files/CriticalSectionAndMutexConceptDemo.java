/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 2: The Critical Section Concept & Mutual Exclusion (Mutex)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class CriticalSectionAndMutexConceptDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: CRITICAL SECTION & MUTUAL EXCLUSION (MUTEX) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT IS A 'CRITICAL SECTION'?");
        System.out.println("  - A Critical Section is a block of code that accesses shared mutable resources (e.g. balance, shared file, database connection).");
        System.out.println("  - Fundamental Law: Exactly ONE thread must execute inside the Critical Section at any given time!");
        System.out.println();
        System.out.println(">>> THE 3 GOLDEN REQUIREMENTS OF MUTUAL EXCLUSION (Dijkstra):");
        System.out.println("  1. Mutual Exclusion : If Thread A is executing in the critical section, no other threads can enter.");
        System.out.println("  2. Progress         : If no thread is in the critical section, any thread that requests entry must be allowed in without indefinite delay.");
        System.out.println("  3. Bounded Waiting  : A thread must not wait indefinitely to enter; there must be a limit on the number of times other threads can enter ahead of it.");
        System.out.println();
        System.out.println(">>> HOW JAVA ENFORCES MUTUAL EXCLUSION:");
        System.out.println("  - Java implements Mutual Exclusion using the 'synchronized' keyword, backed by JVM Intrinsic Object Monitors (Lock acquisition & release).");

        System.out.println("\n==========================================================================");
    }
}