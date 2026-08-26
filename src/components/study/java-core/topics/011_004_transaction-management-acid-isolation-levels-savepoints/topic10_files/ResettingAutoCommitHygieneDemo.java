/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 10: Resetting Auto-Commit - Connection Pool Hygiene
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public class ResettingAutoCommitHygieneDemo {

    public static void executeWithPoolHygiene(Connection conn) throws SQLException {
        boolean originalAutoCommit = conn.getAutoCommit();
        try {
            conn.setAutoCommit(false); // Set manual transaction

            // Perform transaction work...
            System.out.println("   [TX]: Transaction work completed.");

            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
            throw ex;
        } finally {
            // CRUCIAL: Always restore original auto-commit state before closing/returning to pool!
            try {
                conn.setAutoCommit(originalAutoCommit);
                System.out.println("   [HYGIENE]: Restored auto-commit to: " + originalAutoCommit);
            } catch (SQLException ex) {
                System.err.println("   [HYGIENE WARNING]: Failed to restore autoCommit: " + ex.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: RESETTING AUTO-COMMIT & POOL HYGIENE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY POOL HYGIENE IS CRITICAL:");
        System.out.println("  1. Leaked Transaction State: If thread A returns a connection with autoCommit=false,");
        System.out.println("     thread B borrowing that connection will run queries thinking they auto-commit, but they won't!");
        System.out.println("  2. Leaked Row Locks: Active transaction state locks database rows indefinitely!\n");

        System.out.println(">>> HIKARICP DEFENSE-IN-DEPTH:");
        System.out.println("  - HikariCP automatically resets auto-commit and executes rollback() on dirty connections upon close(),");
        System.out.println("    logging a warning: 'Resetting autocommit to true on connection...'");

        System.out.println("\n==========================================================================");
    }
}
