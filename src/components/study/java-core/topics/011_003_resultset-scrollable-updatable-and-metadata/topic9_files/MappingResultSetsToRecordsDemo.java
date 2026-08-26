/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 9: Mapping ResultSets to Domain Objects - RowMapper & Records
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MappingResultSetsToRecordsDemo {

    // 1. Immutable Domain Record (Java 16+):
    public record StudentRecord(
        int studentId,
        String name,
        String course,
        double score,
        String center
    ) {}

    // 2. Functional Interface for Row Mapping (Spring RowMapper pattern):
    @FunctionalInterface
    public interface RowMapper<T> {
        T mapRow(ResultSet rs) throws SQLException;
    }

    // 3. Reusable Generic Query Runner:
    public static <T> List<T> executeQueryList(Connection conn, String sql, RowMapper<T> mapper, Object... params) throws SQLException {
        List<T> results = new ArrayList<>();
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            for (int i = 0; i < params.length; i++) {
                pstmt.setObject(i + 1, params[i]);
            }
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    results.add(mapper.mapRow(rs)); // Clean mapping!
                }
            }
        }
        return results;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: MAPPING RESULTSETS TO IMMUTABLE RECORDS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE CLEAN ROWMAPPER PATTERN (Spring / JDBI Style):");
        System.out.println("  RowMapper<StudentRecord> studentMapper = rs -> new StudentRecord(");
        System.out.println("      rs.getInt("student_id"),");
        System.out.println("      rs.getString("name"),");
        System.out.println("      rs.getString("course"),");
        System.out.println("      rs.getDouble("score"),");
        System.out.println("      rs.getString("center")");
        System.out.println("  );\n");

        System.out.println(">>> ARCHITECTURAL BENEFIT:");
        System.out.println("  - 100% Encapsulation: Database cursors are closed immediately.");
        System.out.println("  - Business logic receives pure, strongly typed, immutable Java collections!");

        System.out.println("\n==========================================================================");
    }
}
