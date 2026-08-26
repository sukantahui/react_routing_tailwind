/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 2: Architectural Design: Why wait() & notify() Belong to java.lang.Object
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class WhyWaitNotifyInObjectNotThreadDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: WHY wait() / notify() ARE IN Object, NOT Thread - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE #1 ARCHITECTURAL REASON:");
        System.out.println("  1. Locks Belong to Objects, NOT to Threads!");
        System.out.println("     - In Java, every Object has a Monitor Lock.");
        System.out.println("     - 'wait()' means: 'Release the lock on THIS object and wait on THIS object's wait-set'.");
        System.out.println("     - If wait() were on Thread (e.g. 'Thread.wait()'), which object's lock would it release?");
        System.out.println("     - A thread can hold locks on MULTIPLE objects simultaneously (e.g. holding Lock A and Lock B).");
        System.out.println("     - Calling 'lockA.wait()' explicitly specifies that ONLY Lock A should be released, while Lock B remains held!");
        System.out.println();
        System.out.println(">>> THE #2 REASON: OBJECT WAIT SETS:");
        System.out.println("  - Each Java object manages its own private 'Wait Set' (queue of threads waiting on that resource).");
        System.out.println("  - Calling 'lockA.notify()' wakes up threads waiting specifically on Lock A without disturbing threads waiting on Lock B.");

        System.out.println("\n==========================================================================");
    }
}