/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 4: Setting Parameters Safely - Type-Safe Binding & setNull()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.time.Instant;

public class SettingParametersSafelyDemo {

    public static void insertStudentRecord(Connection conn, int id, String name, Double scholarship, String email) throws SQLException {
        String sql = "INSERT INTO students (student_id, name, scholarship, email, enrolled_at) VALUES (?, ?, ?, ?, ?)";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            // 1. Primitive Int binding:
            pstmt.setInt(1, id);

            // 2. String binding:
            pstmt.setString(2, name);

            // 3. Nullable Double binding:
            if (scholarship != null) {
                pstmt.setDouble(3, scholarship);
            } else {
                pstmt.setNull(3, Types.DOUBLE); // Explicit SQL NULL typing!
            }

            // 4. Nullable String binding:
            if (email != null) {
                pstmt.setString(4, email);
            } else {
                pstmt.setNull(4, Types.VARCHAR);
            }

            // 5. Java Timestamp / Instant binding:
            pstmt.setTimestamp(5, Timestamp.from(Instant.now()));

            System.out.println("   [PREPARED]: All 5 parameters bound type-safely!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: SETTING PARAMETERS SAFELY & setNull() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY PARAMETER BINDING METHODS:");
        System.out.println("  - pstmt.setInt(1, 101);");
        System.out.println("  - pstmt.setString(2, "Swadeep Paul");");
        System.out.println("  - pstmt.setDouble(3, 4500.50);");
        System.out.println("  - pstmt.setBoolean(4, true);");
        System.out.println("  - pstmt.setTimestamp(5, Timestamp.from(Instant.now()));");
        System.out.println("  - pstmt.setNull(6, java.sql.Types.VARCHAR); // For SQL NULLs!\n");

        System.out.println("==========================================================================");
    }
}
