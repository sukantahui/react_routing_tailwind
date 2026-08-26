/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 10: ResultSetMetaData - Inspecting Query Structure
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class ResultSetMetaDataInspectionDemo {

    public static void inspectQuerySchema(Connection conn, String sql) throws SQLException {
        try (PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            // Obtaining Metadata from the active ResultSet:
            ResultSetMetaData meta = rs.getMetaData();
            int columnCount = meta.getColumnCount();

            System.out.println("   [SCHEMA INSPECTION]: Query produced " + columnCount + " columns:\n");
            System.out.println("   COL#  LABEL NAME            SQL TYPE NAME         PRECISION  NULLABLE?");
            System.out.println("   -----------------------------------------------------------------------");

            for (int i = 1; i <= columnCount; i++) {
                String labelName = meta.getColumnLabel(i);
                String typeName  = meta.getColumnTypeName(i);
                int precision    = meta.getPrecision(i);
                int nullableCode = meta.isNullable(i);
                String nullable  = (nullableCode == ResultSetMetaData.columnNullable) ? "YES" : "NO";

                System.out.printf("   %-5d %-20s %-20s %-10d %s%n", i, labelName, typeName, precision, nullable);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: RESULTSETMETADATA INSPECTION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY METHODS OF java.sql.ResultSetMetaData:");
        System.out.println("  1. meta.getColumnCount()          : Total number of columns in the result set.");
        System.out.println("  2. meta.getColumnLabel(int i)     : Alias or display title of column I.");
        System.out.println("  3. meta.getColumnName(int i)      : True physical database column name.");
        System.out.println("  4. meta.getColumnType(int i)      : Integer SQL type code from java.sql.Types.");
        System.out.println("  5. meta.getColumnTypeName(int i)  : Database-specific type name (e.g. 'VARCHAR', 'BIGINT').");
        System.out.println("  6. meta.isNullable(int i)         : Nullability constraint (columnNoNulls / columnNullable).");

        System.out.println("\n==========================================================================");
    }
}
