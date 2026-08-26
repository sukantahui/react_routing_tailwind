/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 1: JDBC Batch Processing - Consolidating Network Payloads
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class JdbcBatchProcessingOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: JDBC BATCH PROCESSING OVERVIEW - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 2 FLAVORS OF JDBC BATCHING:");
        System.out.println("  1. Statement.addBatch(String sql):");
        System.out.println("     - Groups multiple arbitrary static SQL statements (INSERT, UPDATE, DELETE).");
        System.out.println("     - Example: stmt.addBatch("INSERT INTO a VALUES (1)"); stmt.addBatch("UPDATE b SET x=2");\n");

        System.out.println("  2. PreparedStatement.addBatch():");
        System.out.println("     - Reuses ONE compiled SQL statement and passes multiple sets of parameter arguments.");
        System.out.println("     - 10x to 50x faster than Statement batching due to pre-compilation and wire compression!");

        System.out.println("\n==========================================================================");
    }
}
