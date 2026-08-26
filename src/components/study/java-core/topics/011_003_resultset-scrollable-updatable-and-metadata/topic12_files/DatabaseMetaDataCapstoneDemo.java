/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 12: DatabaseMetaData - Inspecting Server Schema & Capabilities (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseMetaDataCapstoneDemo {

    public static void inspectFullDatabaseSchema(Connection conn) throws SQLException {
        DatabaseMetaData dbMeta = conn.getMetaData();

        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: DATABASEMETADATA INSPECTION CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. DATABASE ENGINE & DRIVER INFORMATION:");
        System.out.println("  - Database Product Name    : " + dbMeta.getDatabaseProductName());
        System.out.println("  - Database Product Version : " + dbMeta.getDatabaseProductVersion());
        System.out.println("  - JDBC Driver Name         : " + dbMeta.getDriverName());
        System.out.println("  - JDBC Driver Version      : " + dbMeta.getDriverVersion());
        System.out.println("  - Supports Transactions    : " + dbMeta.supportsTransactions());
        System.out.println("  - Supports Batch Updates   : " + dbMeta.supportsBatchUpdates() + "\n");

        System.out.println(">>> 2. DISCOVERING USER TABLES IN CURRENT SCHEMA:");
        try (ResultSet tablesRs = dbMeta.getTables(null, null, "%", new String[]{"TABLE"})) {
            while (tablesRs.next()) {
                String tableName = tablesRs.getString("TABLE_NAME");
                String tableType = tablesRs.getString("TABLE_TYPE");
                System.out.println("   [TABLE FOUND]: " + tableName + " (" + tableType + ")");

                // Discover columns for each table:
                try (ResultSet colsRs = dbMeta.getColumns(null, null, tableName, "%")) {
                    while (colsRs.next()) {
                        String colName = colsRs.getString("COLUMN_NAME");
                        String colType = colsRs.getString("TYPE_NAME");
                        int colSize    = colsRs.getInt("COLUMN_SIZE");
                        System.out.println("      - Column: " + colName + " (" + colType + ", size=" + colSize + ")");
                    }
                }
            }
        }

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 011_003 COMPLETE: RESULTSET & METADATA MASTERED!");
        System.out.println("==========================================================================");
    }

    public static void main(String[] args) {
        // Main driver demonstration
        System.out.println("DatabaseMetaData Capstone ready for production schema discovery.");
    }
}
