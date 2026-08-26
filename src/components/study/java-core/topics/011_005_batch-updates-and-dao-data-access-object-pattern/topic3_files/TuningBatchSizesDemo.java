/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 3: Tuning Batch Sizes - Finding the Golden Chunk Size
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class TuningBatchSizesDemo {

    public static final int BATCH_CHUNK_SIZE = 1000; // Industry Golden Batch Size

    public static void insertLargeStudentRoster(Connection conn, List<String> studentNames) throws SQLException {
        String sql = "INSERT INTO student_roster (name) VALUES (?)";
        conn.setAutoCommit(false);

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            int count = 0;
            for (String name : studentNames) {
                pstmt.setString(1, name);
                pstmt.addBatch();
                count++;

                // Execute and flush when chunk threshold is reached:
                if (count % BATCH_CHUNK_SIZE == 0) {
                    pstmt.executeBatch();
                    conn.commit(); // Intermediate transaction commit
                    System.out.println("   [CHUNK FLUSH]: Processed " + count + " records...");
                }
            }

            // Flush any remaining records that did not fill a full batch chunk:
            if (count % BATCH_CHUNK_SIZE != 0) {
                pstmt.executeBatch();
                conn.commit();
                System.out.println("   [FINAL FLUSH]: Completed remaining records. Total: " + count);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: TUNING BATCH SIZES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY BATCH CHUNK TUNING MATTERS:");
        System.out.println("  1. Too Small (e.g. 5 rows)     : Still too many network roundtrips.");
        System.out.println("  2. Too Large (e.g. 500,000 rows): Driver memory consumption causes Java OutOfMemoryError;");
        System.out.println("                                   Database server buffer locks increase dramatically.");
        System.out.println("  3. The Golden Sweet Spot       : 500 to 2,000 rows per batch chunk balances RAM and TCP payload sizes!");

        System.out.println("\n==========================================================================");
    }
}
