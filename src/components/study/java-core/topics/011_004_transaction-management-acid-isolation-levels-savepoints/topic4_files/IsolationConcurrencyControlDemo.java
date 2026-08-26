/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 4: Isolation - Concurrent Transaction Independence
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class IsolationConcurrencyControlDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: ISOLATION & CONCURRENCY CONTROL - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. WHAT IS ISOLATION:");
        System.out.println("  - Ensures that concurrent transactions execute independently without observing");
        System.out.println("    intermediate uncommitted state changes of other transactions.\n");

        System.out.println(">>> 2. HOW MODERN DATABASES IMPLEMENT ISOLATION:");
        System.out.println("  A. TWO-PHASE LOCKING (2PL):");
        System.out.println("     - Shared Locks (S-Locks) for reading; Exclusive Locks (X-Locks) for writing.");
        System.out.println("     - Readers block writers; writers block readers.\n");

        System.out.println("  B. MULTI-VERSION CONCURRENCY CONTROL (MVCC - PostgreSQL / MySQL InnoDB / Oracle):");
        System.out.println("     - Every row has creation and deletion transaction IDs (xmin / xmax).");
        System.out.println("     - READERS NEVER BLOCK WRITERS, AND WRITERS NEVER BLOCK READERS!");
        System.out.println("     - Readers see a consistent snapshot of the data at the time the query began!");

        System.out.println("\n==========================================================================");
    }
}
