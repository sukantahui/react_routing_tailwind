/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 19: 3. TRANSACTION_REPEATABLE_READ - Consistent Transaction Snapshots
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public class TransactionRepeatableReadDemo {

    public static void configureRepeatableRead(Connection conn) throws SQLException {
        conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
        System.out.println("   [ISOLATION]: Set to TRANSACTION_REPEATABLE_READ (4).");
        System.out.println("   - 100% Protected against Dirty Reads and Non-Repeatable Reads.");
        System.out.println("   - Snapshot is created on FIRST read and remains constant for the entire transaction lifetime!");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 19: TRANSACTION_REPEATABLE_READ - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> READ COMMITTED VS REPEATABLE READ UNDER MVCC:");
        System.out.println("  - READ COMMITTED   : Creates a new snapshot for EVERY INDIVIDUAL SQL STATEMENT.");
        System.out.println("  - REPEATABLE READ  : Creates a single snapshot at the START of the transaction;");
        System.out.println("                       re-uses that exact same snapshot for ALL statements in the transaction!\n");

        System.out.println(">>> MYSQL INNODB NEXT-KEY LOCKING:");
        System.out.println("  - In MySQL InnoDB, REPEATABLE_READ also locks index gaps (Next-Key Locks),");
        System.out.println("    preventing Phantom Reads as well!");

        System.out.println("\n==========================================================================");
    }
}
