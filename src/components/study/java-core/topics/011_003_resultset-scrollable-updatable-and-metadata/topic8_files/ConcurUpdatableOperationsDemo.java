/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 8: CONCUR_UPDATABLE - Mutating Database Rows via ResultSet
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ConcurUpdatableOperationsDemo {

    public static void applyScholarshipBonusViaResultSet(Connection conn) throws SQLException {
        // Query MUST include Primary Key column for updatable result sets:
        String sql = "SELECT student_id, name, score FROM students WHERE score >= 90.0";

        try (PreparedStatement pstmt = conn.prepareStatement(
                sql,
                ResultSet.TYPE_SCROLL_INSENSITIVE,
                ResultSet.CONCUR_UPDATABLE);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                double currentScore = rs.getDouble("score");
                if (currentScore < 100.0) {
                    // Mutating the column on the current row buffer:
                    rs.updateDouble("score", currentScore + 2.0);

                    // Persisting the update directly back to the database engine:
                    rs.updateRow();
                    System.out.println("   [UPDATED]: Student " + rs.getString("name") + " score boosted to " + (currentScore + 2.0));
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CONCUR_UPDATABLE MUTATIONS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY METHODS OF CONCUR_UPDATABLE RESULTSETS:");
        System.out.println("  1. rs.updateString(col, val)  : Modifies string value in current row buffer.");
        System.out.println("  2. rs.updateDouble(col, val)  : Modifies numeric value in current row buffer.");
        System.out.println("  3. rs.updateRow()             : Flushes modified values to database table (Executes SQL UPDATE).");
        System.out.println("  4. rs.deleteRow()             : Deletes current row from database table (Executes SQL DELETE).");
        System.out.println("  5. rs.moveToInsertRow()       : Switches cursor to special buffer for inserting new row.");
        System.out.println("  6. rs.insertRow()             : Persists newly constructed insert row into table.");

        System.out.println("\n==========================================================================");
    }
}
