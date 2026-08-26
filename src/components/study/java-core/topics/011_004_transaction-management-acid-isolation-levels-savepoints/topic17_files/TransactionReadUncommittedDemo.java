/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 17: 1. TRANSACTION_READ_UNCOMMITTED - Maximum Speed & Zero Locks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public class TransactionReadUncommittedDemo {

    public static void configureTelemetryQuery(Connection conn) throws SQLException {
        // Configuring lowest isolation for high-speed metric polling:
        conn.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);
        System.out.println("   [ISOLATION]: Set to TRANSACTION_READ_UNCOMMITTED (1).");
        System.out.println("   - Readers will not block writers; writers will not block readers.");
        System.out.println("   - Allows dirty reads for approximate analytics (e.g. active student count).");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: TRANSACTION_READ_UNCOMMITTED - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHEN TO USE READ_UNCOMMITTED:");
        System.out.println("  1. High-frequency telemetry dashboards (Approximate live active user count).");
        System.out.println("  2. Logging and metrics counters where absolute 100% precision is not required.");
        System.out.println("  3. Avoiding lock contention when reporting queries run on write-heavy OLTP databases.\n");

        System.out.println(">>> WHEN NEVER TO USE:");
        System.out.println("  - Financial transactions, banking, e-commerce checkout, inventory counts!");

        System.out.println("\n==========================================================================");
    }
}
