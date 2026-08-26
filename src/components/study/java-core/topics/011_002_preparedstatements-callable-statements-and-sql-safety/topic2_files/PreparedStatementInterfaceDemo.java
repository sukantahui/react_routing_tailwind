/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 2: The PreparedStatement Interface - Parameterized SQL
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PreparedStatementInterfaceDemo {

    public static void executeSecureQuery(Connection conn, String inputName) throws SQLException {
        // Parameterized SQL query with '?' placeholder:
        String sql = "SELECT student_id, name, course, fees_paid FROM students WHERE name = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            // Binding parameter safely (1-based index):
            pstmt.setString(1, inputName);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    System.out.println("   [STUDENT FOUND]: ID=" + rs.getInt("student_id") + 
                                       ", Name=" + rs.getString("name") + 
                                       ", Course=" + rs.getString("course"));
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE PREPAREDSTATEMENT INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY ADVANTAGES OF PREPAREDSTATEMENT OVER STATEMENT:");
        System.out.println("  1. 100% IMMUNE TO SQL INJECTION : Data values are transported via binary protocol; never parsed as SQL!");
        System.out.println("  2. PRE-COMPILED QUERY PLANS     : Database parses and optimizes execution plan ONCE; reuses for 10,000 queries!");
        System.out.println("  3. STRICT TYPE SAFETY           : setInt(), setString(), setTimestamp() enforce explicit data typing!");
        System.out.println("  4. STREAMLINED BINARY TRANSFER  : Efficient transmission of BLOBs, CLOBs, and byte arrays.");

        System.out.println("\n==========================================================================");
    }
}
