/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 3: Consistency - Preserving Invariants & Constraints
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ConsistencyPreservingInvariantsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: CONSISTENCY IN DATABASE SYSTEMS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 LEVELS OF CONSISTENCY ENFORCEMENT:");
        System.out.println("  1. SCHEMA-LEVEL CONSTRAINTS (RDBMS Engine):");
        System.out.println("     - PRIMARY KEY uniqueness (No duplicate student_id).");
        System.out.println("     - FOREIGN KEY referential integrity (Course ID must exist in courses table).");
        System.out.println("     - CHECK constraints (e.g. 'CHECK (fees_paid >= 0.0)').");
        System.out.println("     - NOT NULL column validation.\n");

        System.out.println("  2. BUSINESS LOGIC INVARIANTS (Application Layer):");
        System.out.println("     - Sum of all account balances in bank before transfer == Sum after transfer!");
        System.out.println("     - Total enrolled seats <= Maximum classroom capacity (40 seats at Barrackpore).\n");

        System.out.println("  3. DATABASE ENGINE REJECTION:");
        System.out.println("     - If any constraint is violated during transaction execution, the engine throws SQLException;");
        System.out.println("     - The transaction rolls back, preserving 100% database consistency!");

        System.out.println("\n==========================================================================");
    }
}
