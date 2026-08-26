/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 3: The 4 Coffman Conditions: Mathematical Blueprint for Deadlock Formation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class FourCoffmanConditionsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: THE 4 COFFMAN CONDITIONS FOR DEADLOCK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 COFFMAN CONDITIONS (Edward G. Coffman Jr., 1971):");
        System.out.println("  - A deadlock CANNOT occur unless ALL FOUR of the following conditions hold simultaneously!");
        System.out.println("  - If you break even ONE of these four conditions, deadlocks become mathematically IMPOSSIBLE!");
        System.out.println();
        System.out.println("+----+-----------------------+---------------------------------------------------------------+");
        System.out.println("| #  | Condition Name        | Description in Java Concurrency                               |");
        System.out.println("+----+-----------------------+---------------------------------------------------------------+");
        System.out.println("| 1. | Mutual Exclusion      | At least one resource (lock) is held in a non-shareable mode. |");
        System.out.println("| 2. | Hold and Wait         | A thread holds >= 1 lock while waiting to acquire another lock.|");
        System.out.println("| 3. | No Preemption         | Locks cannot be stolen or forcibly taken away from a thread.  |");
        System.out.println("| 4. | Circular Wait         | A closed cycle exists: Thread 1 &rarr; Lock B &rarr; Thread 2 &rarr; Lock A.|");
        System.out.println("+----+-----------------------+---------------------------------------------------------------+");

        System.out.println("\n==========================================================================");
    }
}