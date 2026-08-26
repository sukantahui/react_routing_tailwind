/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 2: PreparedStatement Batching - ps.addBatch() & executeBatch()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;

public class PreparedStatementBatchOperationsDemo {

    public record StudentRecord(int id, String name, String center) {}

    public static void insertBatchStudents(Connection conn, StudentRecord[] students) throws SQLException {
        String sql = "INSERT INTO students (student_id, name, center) VALUES (?, ?, ?)";

        boolean prevAutoCommit = conn.getAutoCommit();
        conn.setAutoCommit(false); // Combine batching with manual transaction!

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            for (StudentRecord s : students) {
                pstmt.setInt(1, s.id());
                pstmt.setString(2, s.name());
                pstmt.setString(3, s.center());

                // Buffer parameter set in memory:
                pstmt.addBatch();
            }

            // Flush and execute all buffered statements in one network trip:
            int[] updateCounts = pstmt.executeBatch();
            conn.commit(); // Commit transaction

            System.out.println("   [BATCH RESULT]: Executed " + updateCounts.length + " statements successfully.");
            System.out.println("   [UPDATE COUNTS]: " + Arrays.toString(updateCounts));

        } catch (SQLException ex) {
            conn.rollback();
            throw ex;
        } finally {
            conn.setAutoCommit(prevAutoCommit);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: PREPAREDSTATEMENT BATCH OPERATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentRecord[] students = {
            new StudentRecord(101, "Swadeep Paul", "Barrackpore"),
            new StudentRecord(102, "Tuhina Das", "Naihati"),
            new StudentRecord(103, "Abhronila Das", "Shyamnagar"),
            new StudentRecord(104, "Debangshu Mukherjee", "Ichapur")
        };

        System.out.println("Ready to batch insert " + students.length + " students in a single network transmission.");
    }
}
