/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 7: Disabling Auto-Commit - conn.setAutoCommit(false)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public class DisablingAutoCommitDemo {

    public static void demonstrateAutoCommitBehavior(Connection conn) throws SQLException {
        // Checking current mode:
        System.out.println("   [DEFAULT]: conn.getAutoCommit() = " + conn.getAutoCommit());

        // Disabling auto-commit:
        conn.setAutoCommit(false);
        System.out.println("   [MANUAL TX]: conn.getAutoCommit() is now FALSE!");
        System.out.println("   - The database server has now implicitly started a transaction.");
        System.out.println("   - All subsequent INSERT, UPDATE, DELETE queries will be held uncommitted until conn.commit() is called.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: DISABLING AUTO-COMMIT - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> AUTO-COMMIT MODES:");
        System.out.println("  1. autoCommit = true  (Default): Every statement commits on execution. Zero rollback capability!");
        System.out.println("  2. autoCommit = false (Manual): Statements accumulate into a transaction until commit() or rollback().");

        System.out.println("\n==========================================================================");
    }
}
