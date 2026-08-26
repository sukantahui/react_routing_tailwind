/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 11: Generic Table Printer & CSV Exporter - ResultSetMetaData in Action
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class GenericTablePrinterCsvExportDemo {

    // Generic function that exports ANY SQL query to standard CSV format:
    public static void exportQueryToCsv(Connection conn, String sql, PrintWriter writer) throws SQLException {
        try (PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            ResultSetMetaData meta = rs.getMetaData();
            int columnCount = meta.getColumnCount();

            // 1. Write CSV Header row:
            for (int i = 1; i <= columnCount; i++) {
                writer.print(escapeCsv(meta.getColumnLabel(i)));
                if (i < columnCount) writer.print(",");
            }
            writer.println();

            // 2. Write CSV Data rows:
            while (rs.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    Object val = rs.getObject(i);
                    writer.print(val == null ? "" : escapeCsv(val.toString()));
                    if (i < columnCount) writer.print(",");
                }
                writer.println();
            }
            writer.flush();
        }
    }

    private static String escapeCsv(String input) {
        if (input.contains(",") || input.contains(""") || input.contains("\n")) {
            return """ + input.replace(""", """") + """;
        }
        return input;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: GENERIC TABLE PRINTER & CSV EXPORTER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE POWER OF RESULTSETMETADATA FOR DYNAMIC UTILITIES:");
        System.out.println("  1. Schema Agnostic   : Operates on any table, join, view, or aggregated report.");
        System.out.println("  2. Zero Hardcoding   : No hardcoded column names or field indices.");
        System.out.println("  3. Enterprise Utility: Foundation for CLI tools, ETL data exporters, and GUI grids.");

        System.out.println("\n==========================================================================");
    }
}
