/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 4: The 'Happens-Before' Relationship: Formal Memory Visibility Guarantees
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class HappensBeforeRelationshipRulesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: THE 'HAPPENS-BEFORE' RELATIONSHIP RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE CORE 'HAPPENS-BEFORE' RULES IN JAVA:");
        System.out.println("  - If Action A 'happens-before' Action B, then the memory writes by A are GUARANTEED to be visible to B, and A executes before B.");
        System.out.println();
        System.out.println("+----+-----------------------+---------------------------------------------------------------+");
        System.out.println("| #  | Rule Name             | Formal Memory Visibility Guarantee                            |");
        System.out.println("+----+-----------------------+---------------------------------------------------------------+");
        System.out.println("| 1. | Program Order Rule    | Within a single thread, each action happens-before any action |");
        System.out.println("|    |                       | that appears later in source program order.                   |");
        System.out.println("| 2. | Monitor Lock Rule     | An unlock on a monitor lock happens-before every subsequent   |");
        System.out.println("|    |                       | lock on the EXACT SAME monitor lock.                          |");
        System.out.println("| 3. | Volatile Variable Rule| A write to a volatile field happens-before every subsequent   |");
        System.out.println("|    |                       | read of that EXACT SAME volatile field.                       |");
        System.out.println("| 4. | Thread Start Rule     | A call to 'Thread.start()' happens-before any action in the   |");
        System.out.println("|    |                       | started thread's 'run()' method.                              |");
        System.out.println("| 5. | Thread Join Rule      | All actions in a thread happen-before any other thread        |");
        System.out.println("|    |                       | successfully returns from a 'join()' on that thread.          |");
        System.out.println("| 6. | Transitivity Rule     | If A happens-before B, and B happens-before C, then A         |");
        System.out.println("|    |                       | happens-before C (Transitive Guarantee!).                     |");
        System.out.println("+----+-----------------------+---------------------------------------------------------------+");

        System.out.println("\n==========================================================================");
    }
}