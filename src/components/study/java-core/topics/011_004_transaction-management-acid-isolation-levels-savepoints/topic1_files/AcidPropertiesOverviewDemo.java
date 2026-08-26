/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 1: The ACID Properties - Overview & Principles
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class AcidPropertiesOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE ACID PROPERTIES OVERVIEW - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 PILLARS OF ACID:");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  PROPERTY       NAME            CORE PRINCIPLE");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  A              ATOMICITY       All-or-nothing execution (indivisible work unit).");
        System.out.println("  C              CONSISTENCY     Preserves schema invariants, foreign keys & check constraints.");
        System.out.println("  I              ISOLATION       Concurrent transactions execute as if strictly serial.");
        System.out.println("  D              DURABILITY      Committed data survives power loss and system crashes.");
        System.out.println("  -----------------------------------------------------------------------------------------\n");

        System.out.println(">>> HOW JDBC IMPLEMENTS ACID:");
        System.out.println("  - Atomicity   : connection.setAutoCommit(false), conn.commit(), conn.rollback()");
        System.out.println("  - Consistency : Enforced by database schema engine (triggers, FK constraints, checks)");
        System.out.println("  - Isolation   : connection.setTransactionIsolation(level)");
        System.out.println("  - Durability  : Handled by database Write-Ahead Logging (WAL) and disk fsync()");

        System.out.println("\n==========================================================================");
    }
}
