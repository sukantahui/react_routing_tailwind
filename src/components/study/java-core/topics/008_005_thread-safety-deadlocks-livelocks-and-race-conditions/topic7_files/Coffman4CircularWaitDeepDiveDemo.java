/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 7: Coffman Condition 4: Circular Wait (The Closed Dependency Chain)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class Coffman4CircularWaitDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: COFFMAN CONDITION 4: CIRCULAR WAIT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHAT IS 'CIRCULAR WAIT'?");
        System.out.println("  - A closed cycle of dependencies where:");
        System.out.println("    * Thread 1 is waiting for a lock held by Thread 2.");
        System.out.println("    * Thread 2 is waiting for a lock held by Thread 3.");
        System.out.println("    * ... and Thread N is waiting for a lock held by Thread 1!");
        System.out.println();
        System.out.println(">>> 2. THE RESOURCE ALLOCATION GRAPH (RAG) CYCLE:");
        System.out.println("  [Thread 1] ===(holds)===> [Lock A] <---(waits)--- [Thread 2]");
        System.out.println("      |                                                 ^");
        System.out.println("      +---(waits)---> [Lock B] <====(holds)=============+");
        System.out.println();
        System.out.println(">>> 3. WHY CIRCULAR WAIT IS THE #1 TARGET FOR DEADLOCK PREVENTION:");
        System.out.println("  - While breaking conditions 1, 2, or 3 can be complex or hurt performance,");
        System.out.println("    BREAKING CIRCULAR WAIT IS EASY, ELEGANT, AND 100% EFFECTIVE via GLOBAL LOCK ORDERING!");

        System.out.println("\n==========================================================================");
    }
}