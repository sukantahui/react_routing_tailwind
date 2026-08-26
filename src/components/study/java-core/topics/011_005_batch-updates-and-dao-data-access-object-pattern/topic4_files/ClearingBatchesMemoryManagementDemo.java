/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 4: Clearing Batches - ps.clearBatch() & Memory Management
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ClearingBatchesMemoryManagementDemo {

    public static void executeSafeBatchWithCleanup(Connection conn) throws SQLException {
        String sql = "INSERT INTO audit_archive (msg) VALUES (?)";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, "Log Entry 1");
            pstmt.addBatch();

            pstmt.setString(1, "Log Entry 2");
            pstmt.addBatch();

            // Explicitly discarding buffered statements before execution if needed:
            boolean shouldDiscard = false;
            if (shouldDiscard) {
                pstmt.clearBatch();
                System.out.println("   [CLEAR]: Batch buffer emptied successfully.");
            } else {
                pstmt.executeBatch();
                System.out.println("   [EXEC]: Batch submitted to server.");
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: CLEARING BATCHES & MEMORY MANAGEMENT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHEN TO CALL ps.clearBatch():");
        System.out.println("  1. In Catch Blocks  : If executeBatch() throws an exception, call clearBatch() to purge buffered statements.");
        System.out.println("  2. Driver Recycling : Some JDBC drivers do not automatically empty the internal parameter list after executeBatch();");
        System.out.println("                        clearBatch() explicitly frees memory for GC.");

        System.out.println("\n==========================================================================");
    }
}
