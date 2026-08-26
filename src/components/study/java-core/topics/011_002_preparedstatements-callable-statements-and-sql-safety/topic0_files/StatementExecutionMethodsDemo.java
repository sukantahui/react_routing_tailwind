/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 0: Executing Queries with Statement - executeQuery vs executeUpdate vs execute
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class StatementExecutionMethodsDemo {

    public static void demonstrateExecutionMethods(Connection conn) throws SQLException {
        try (Statement stmt = conn.createStatement()) {

            // 1. executeQuery(sql): Used strictly for SELECT statements -> Returns ResultSet
            String selectSql = "SELECT student_id, name FROM students WHERE center = 'Barrackpore'";
            try (ResultSet rs = stmt.executeQuery(selectSql)) {
                while (rs.next()) {
                    System.out.println("   [SELECT]: ID: " + rs.getInt("student_id") + " | Name: " + rs.getString("name"));
                }
            }

            // 2. executeUpdate(sql): Used for INSERT, UPDATE, DELETE, or DDL -> Returns int (affected rows count)
            String updateSql = "UPDATE students SET status = 'ACTIVE' WHERE center = 'Barrackpore'";
            int affectedRows = stmt.executeUpdate(updateSql);
            System.out.println("   [UPDATE]: Rows affected = " + affectedRows);

            // 3. execute(sql): Generic execution -> Returns boolean (true if ResultSet, false if update count)
            boolean isResultSet = stmt.execute("SELECT COUNT(*) FROM students");
            if (isResultSet) {
                try (ResultSet rsCount = stmt.getResultSet()) {
                    if (rsCount.next()) System.out.println("   [COUNT]: Total students = " + rsCount.getInt(1));
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: STATEMENT EXECUTION METHODS (QUERY vs UPDATE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 STATEMENT METHODS COMPARISON:");
        System.out.println("  1. stmt.executeQuery(sql)  -> Returns ResultSet (SELECT only).");
        System.out.println("  2. stmt.executeUpdate(sql) -> Returns int (INSERT, UPDATE, DELETE row count).");
        System.out.println("  3. stmt.execute(sql)       -> Returns boolean (Generic execution).\n");

        System.out.println("==========================================================================");
    }
}
