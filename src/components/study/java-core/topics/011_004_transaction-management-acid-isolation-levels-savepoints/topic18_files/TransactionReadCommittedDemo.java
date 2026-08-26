/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 18: 2. TRANSACTION_READ_COMMITTED - The Industry Standard
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public class TransactionReadCommittedDemo {

    public static void configureReadCommitted(Connection conn) throws SQLException {
        conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
        System.out.println("   [ISOLATION]: Configured to TRANSACTION_READ_COMMITTED (2).");
        System.out.println("   - 100% Protected against Dirty Reads.");
        System.out.println("   - Each SQL statement sees a fresh snapshot of committed data.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 18: TRANSACTION_READ_COMMITTED - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW READ COMMITTED OPERATES UNDER MVCC (PostgreSQL / Oracle):");
        System.out.println("  1. STATEMENT SNAPSHOTS:");
        System.out.println("     - Every single SELECT query creates a NEW snapshot of all data committed up to that instant.");
        System.out.println("  2. DIRTY READ IMMUNITY:");
        System.out.println("     - If Tx 1 modifies a row without committing, Tx 2 sees the PREVIOUS committed version.");
        System.out.println("  3. NON-REPEATABLE READS POSSIBLE:");
        System.out.println("     - If Tx 1 commits an update between Tx 2's first and second SELECT, Tx 2 will see the new value.");

        System.out.println("\n==========================================================================");
    }
}
