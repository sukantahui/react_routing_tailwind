/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 20: 4. TRANSACTION_SERIALIZABLE - Total Strict Isolation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public class TransactionSerializableDemo {

    public static void configureSerializable(Connection conn) throws SQLException {
        conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);
        System.out.println("   [ISOLATION]: Configured to TRANSACTION_SERIALIZABLE (8).");
        System.out.println("   - 100% Protection against ALL concurrency anomalies.");
        System.out.println("   - Transactions execute with strict serial equivalence.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 20: TRANSACTION_SERIALIZABLE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE SERIALIZABLE CONTRACT:");
        System.out.println("  1. Strict Serial Equivalence : The execution schedule is mathematically proven identical to running transactions one-at-a-time.");
        System.out.println("  2. Serialization Failures   : In modern SSI (Serializable Snapshot Isolation in PostgreSQL):");
        System.out.println("     - If two concurrent transactions read overlapping data and write conflicting updates,");
        System.out.println("       the DB aborts one with 'SQLState: 40001 (serialization_failure)'.");
        System.out.println("  3. Application Retry Loop   : Client applications using SERIALIZABLE MUST implement automatic retry loops!\n");

        System.out.println("==========================================================================");
    }
}
