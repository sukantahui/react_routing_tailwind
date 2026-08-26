/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 6: Managing Transactions in JDBC - The 4-Step Standard Pattern
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public class ManagingTransactionsJdbcOverviewDemo {

    public static void executeTransactionTemplate(Connection conn) throws SQLException {
        // STEP 1: Capture initial auto-commit and disable auto-commit
        boolean previousAutoCommit = conn.getAutoCommit();
        conn.setAutoCommit(false);

        try {
            // STEP 2: Execute multiple DML statements in single transaction
            System.out.println("   [TX]: Executing Step 1 (Debit)...");
            System.out.println("   [TX]: Executing Step 2 (Credit)...");

            // STEP 3: Commit all changes atomically
            conn.commit();
            System.out.println("   [TX SUCCESS]: Transaction committed permanently! ✅");

        } catch (SQLException | RuntimeException ex) {
            // STEP 4: Roll back uncommitted changes on error
            System.err.println("   [TX ERROR]: Rolling back transaction due to error: " + ex.getMessage());
            conn.rollback();
            throw ex;
        } finally {
            // Restore connection auto-commit state for pool reuse
            conn.setAutoCommit(previousAutoCommit);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: MANAGING TRANSACTIONS IN JDBC OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4-STEP TRANSACTION WORKFLOW:");
        System.out.println("  1. conn.setAutoCommit(false); // Begin boundary");
        System.out.println("  2. pstmt1.executeUpdate(); pstmt2.executeUpdate();");
        System.out.println("  3. conn.commit();             // Flush to disk");
        System.out.println("  4. catch: conn.rollback();    // Revert upon exception");

        System.out.println("\n==========================================================================");
    }
}
