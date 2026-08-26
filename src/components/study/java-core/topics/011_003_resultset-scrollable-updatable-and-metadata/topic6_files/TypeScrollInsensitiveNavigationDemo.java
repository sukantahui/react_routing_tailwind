/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 6: TYPE_SCROLL_INSENSITIVE - Bidirectional Cursor Navigation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TypeScrollInsensitiveNavigationDemo {

    public static void demonstrateScrollableNavigation(Connection conn) throws SQLException {
        String sql = "SELECT student_id, name, score FROM students ORDER BY score DESC";

        try (PreparedStatement pstmt = conn.prepareStatement(
                sql,
                ResultSet.TYPE_SCROLL_INSENSITIVE,
                ResultSet.CONCUR_READ_ONLY);
             ResultSet rs = pstmt.executeQuery()) {

            // 1. Move to last row to find total count:
            if (rs.last()) {
                int totalRows = rs.getRow();
                System.out.println("   [SCROLL]: Total matching students = " + totalRows);
                System.out.println("   [LAST ROW]: Lowest ranked: " + rs.getString("name"));
            }

            // 2. Jump to the first row (Top Rank):
            if (rs.first()) {
                System.out.println("   [FIRST ROW]: Top ranked student: " + rs.getString("name") + " (" + rs.getDouble("score") + ")");
            }

            // 3. Jump directly to absolute row index 5:
            if (rs.absolute(5)) {
                System.out.println("   [ABSOLUTE 5]: Rank #5 student: " + rs.getString("name"));
            }

            // 4. Move relative offset (+2 rows forward):
            if (rs.relative(2)) {
                System.out.println("   [RELATIVE +2]: Rank #7 student: " + rs.getString("name"));
            }

            // 5. Navigate backwards:
            while (rs.previous()) {
                System.out.println("   [BACKWARD]: Step back to Row #" + rs.getRow() + ": " + rs.getString("name"));
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: TYPE_SCROLL_INSENSITIVE NAVIGATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY SCROLLABLE CURSOR METHODS:");
        System.out.println("  - rs.first()        : Moves cursor to row 1.");
        System.out.println("  - rs.last()         : Moves cursor to the final row.");
        System.out.println("  - rs.previous()     : Moves cursor backward by 1 row.");
        System.out.println("  - rs.absolute(int n): Jumps directly to row N (negative N counts from end!).");
        System.out.println("  - rs.relative(int n): Jumps forward (+n) or backward (-n) from current row.");
        System.out.println("  - rs.beforeFirst()  : Resets cursor before row 1.");
        System.out.println("  - rs.afterLast()    : Resets cursor after last row.");

        System.out.println("\n==========================================================================");
    }
}
