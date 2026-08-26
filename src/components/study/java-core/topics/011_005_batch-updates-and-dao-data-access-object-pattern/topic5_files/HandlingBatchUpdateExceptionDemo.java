/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 5: BatchUpdateException - Handling Partial Failures
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.BatchUpdateException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class HandlingBatchUpdateExceptionDemo {

    public static void executeBatchWithExceptionInspection(Connection conn) throws SQLException {
        conn.setAutoCommit(false);
        String sql = "INSERT INTO accounts (account_id, balance) VALUES (?, ?)";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            // Adding batch items (item 2 contains deliberate duplicate key error)
            pstmt.setInt(1, 101); pstmt.setDouble(2, 5000.0); pstmt.addBatch();
            pstmt.setInt(1, 101); pstmt.setDouble(2, 2000.0); pstmt.addBatch(); // Duplicate!
            pstmt.setInt(1, 103); pstmt.setDouble(2, 8000.0); pstmt.addBatch();

            pstmt.executeBatch();
            conn.commit();

        } catch (BatchUpdateException bue) {
            System.err.println("   [BATCH EXCEPTION]: " + bue.getMessage());
            int[] updateCounts = bue.getUpdateCounts();

            System.out.println("   [INSPECTION OF UPDATE COUNTS]:");
            for (int i = 0; i < updateCounts.length; i++) {
                if (updateCounts[i] >= 0) {
                    System.out.println("     Item #" + (i + 1) + ": Succeeded (" + updateCounts[i] + " rows)");
                } else if (updateCounts[i] == Statement.SUCCESS_NO_INFO) {
                    System.out.println("     Item #" + (i + 1) + ": Succeeded (No info)");
                } else if (updateCounts[i] == Statement.EXECUTE_FAILED) {
                    System.err.println("     Item #" + (i + 1) + ": FAILED! ❌");
                }
            }

            conn.rollback(); // Rollback everything cleanly
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: BATCHUPDATEEXCEPTION HANDLING - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY METHODS OF java.sql.BatchUpdateException:");
        System.out.println("  1. bue.getUpdateCounts() : Returns int[] array showing the outcome of statements in the batch up to failure.");
        System.out.println("  2. bue.getNextException(): Chained SQLExceptions providing detailed error codes.");

        System.out.println("\n==========================================================================");
    }
}
