/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 0: The ResultSet Interface - java.sql.ResultSet Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultSetInterfaceOverviewDemo {

    public static void readStudentsTabularData(Connection conn) throws SQLException {
        String sql = "SELECT student_id, name, course, score FROM students WHERE center = 'Barrackpore'";

        try (PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            System.out.println("   ------------------------------------------------------------------");
            System.out.println("   ID    NAME                  COURSE          SCORE");
            System.out.println("   ------------------------------------------------------------------");

            // The cursor starts BEFORE the first row; rs.next() advances one row at a time:
            while (rs.next()) {
                int id        = rs.getInt("student_id");
                String name   = rs.getString("name");
                String course = rs.getString("course");
                double score  = rs.getDouble("score");

                System.out.printf("   %-5d %-20s %-15s %6.2f%n", id, name, course, score);
            }
            System.out.println("   ------------------------------------------------------------------");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: THE RESULTSET INTERFACE OVERVIEW - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY CHARACTERISTICS OF java.sql.ResultSet:");
        System.out.println("  1. Extends AutoCloseable: Always close via try-with-resources.");
        System.out.println("  2. Maintained Cursor: Points to current row in memory buffer.");
        System.out.println("  3. Streamable Fetching: Configurable fetchSize (e.g. 50 rows per network round-trip).");
        System.out.println("  4. Strongly Typed Getters: getInt(), getString(), getDouble(), getTimestamp().");

        System.out.println("\n==========================================================================");
    }
}
