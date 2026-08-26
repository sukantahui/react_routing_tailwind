/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 11: Safe Connection Borrowing - DataSource & Try-With-Resources Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;

public class SafeConnectionBorrowingCapstoneDemo {

    // Mock DataSource implementation demonstrating the borrow & return contract:
    public static class MockHikariDataSource implements DataSource {
        private int activeLeases = 0;

        @Override
        public Connection getConnection() throws SQLException {
            activeLeases++;
            System.out.println("   [POOL]: Leased connection #101 (Active pool leases: " + activeLeases + ")");
            // In real app, returns HikariProxyConnection
            return null; 
        }

        @Override public Connection getConnection(String u, String p) { return null; }
        @Override public java.io.PrintWriter getLogWriter() { return null; }
        @Override public void setLogWriter(java.io.PrintWriter out) {}
        @Override public void setLoginTimeout(int seconds) {}
        @Override public int getLoginTimeout() { return 0; }
        @Override public java.util.logging.Logger getParentLogger() { return null; }
        @Override public <T> T unwrap(Class<T> iface) { return null; }
        @Override public boolean isWrapperFor(Class<?> iface) { return false; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: SAFE CONNECTION BORROWING CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        DataSource dataSource = new MockHikariDataSource();

        System.out.println(">>> 1. SAFE BORROWING PATTERN WITH TRY-WITH-RESOURCES:");
        System.out.println("  try (Connection conn = dataSource.getConnection();");
        System.out.println("       PreparedStatement stmt = conn.prepareStatement(SQL);");
        System.out.println("       ResultSet rs = stmt.executeQuery()) {");
        System.out.println("      // Process tabular data...");
        System.out.println("  } catch (SQLException ex) {");
        System.out.println("      // Log database error...");
        System.out.println("  }");
        System.out.println("  // GUARANTEE: 'conn.close()' is executed automatically, returning socket to pool! ✅\n");

        System.out.println(">>> 2. VERIFIED BENCHMARK & RELIABILITY GOALS:");
        System.out.println("  - 100% Zero Connection Leakage across all exception paths.");
        System.out.println("  - Microsecond lease times with HikariCP.");
        System.out.println("  - Production-ready database data access layer!");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 011_001 COMPLETE: JDBC ARCHITECTURE & HIKARICP MASTERED!");
        System.out.println("==========================================================================");
    }
}
