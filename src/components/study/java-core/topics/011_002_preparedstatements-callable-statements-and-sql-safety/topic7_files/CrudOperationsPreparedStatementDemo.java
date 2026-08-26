/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 7: Executing CRUD Operations with PreparedStatement
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CrudOperationsPreparedStatementDemo {

    // 1. CREATE (INSERT):
    public static int createStudent(Connection conn, int id, String name, String course) throws SQLException {
        String sql = "INSERT INTO students (student_id, name, course) VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.setString(2, name);
            pstmt.setString(3, course);
            return pstmt.executeUpdate();
        }
    }

    // 2. READ (SELECT):
    public static void readStudent(Connection conn, int id) throws SQLException {
        String sql = "SELECT student_id, name, course FROM students WHERE student_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    System.out.println("   [FOUND]: " + rs.getInt("student_id") + " - " + rs.getString("name"));
                }
            }
        }
    }

    // 3. UPDATE:
    public static int updateStudentCourse(Connection conn, int id, String newCourse) throws SQLException {
        String sql = "UPDATE students SET course = ? WHERE student_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, newCourse);
            pstmt.setInt(2, id);
            return pstmt.executeUpdate();
        }
    }

    // 4. DELETE:
    public static int deleteStudent(Connection conn, int id) throws SQLException {
        String sql = "DELETE FROM students WHERE student_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CRUD OPERATIONS WITH PREPAREDSTATEMENT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> CRUD TEMPLATES ESTABLISHED:");
        System.out.println("  - CREATE : INSERT INTO students (...) VALUES (?, ?, ?)");
        System.out.println("  - READ   : SELECT ... FROM students WHERE student_id = ?");
        System.out.println("  - UPDATE : UPDATE students SET course = ? WHERE student_id = ?");
        System.out.println("  - DELETE : DELETE FROM students WHERE student_id = ?");

        System.out.println("\n==========================================================================");
    }
}
