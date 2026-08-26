/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 9: Rolling Back Transactions - connection.rollback()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public class RollingBackTransactionsDemo {

    public static void demonstrateRollbackPattern(Connection conn) throws SQLException {
        conn.setAutoCommit(false);

        try {
            // Simulated business failure:
            System.out.println("   [TX]: Executing database update...");
            boolean validationFailed = true;

            if (validationFailed) {
                throw new IllegalStateException("Insufficient funds in treasury account!");
            }

            conn.commit();

        } catch (Exception ex) {
            System.err.println("   [ROLLBACK]: Transaction failed (" + ex.getMessage() + ") -> Rolling back changes...");
            // Discard all changes made in this transaction:
            conn.rollback();
            System.out.println("   [ROLLBACK COMPLETE]: Database restored to initial state! 🛡️");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: ROLLING BACK TRANSACTIONS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE ANATOMY OF A ROLLBACK:");
        System.out.println("  1. Database engine uses Undo Logs / Rollback Segments to reverse all row modifications.");
        System.out.println("  2. Newly inserted rows are removed.");
        System.out.println("  3. Updated columns are restored to original snapshot values.");
        System.out.println("  4. All exclusive locks are released.");

        System.out.println("\n==========================================================================");
    }
}
