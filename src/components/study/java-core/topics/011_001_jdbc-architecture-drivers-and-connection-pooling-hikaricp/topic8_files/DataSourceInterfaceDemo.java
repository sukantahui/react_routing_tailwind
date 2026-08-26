/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 8: The DataSource Interface - javax.sql.DataSource
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class DataSourceInterfaceDemo {

    // Service class depends strictly on the DataSource interface abstraction:
    public static class StudentDataService {
        private final DataSource dataSource;

        public StudentDataService(DataSource dataSource) {
            this.dataSource = dataSource;
        }

        public void printActiveStudentCount() {
            try (Connection conn = dataSource.getConnection()) {
                System.out.println("   [SERVICE]: Borrowed connection from DataSource successfully: " + conn.getClass().getSimpleName());
            } catch (SQLException ex) {
                System.err.println("   [SERVICE ERROR]: " + ex.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: THE javax.sql.DataSource INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> DRIVERMANAGER VS DATASOURCE:");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  FEATURE               DriverManager                 javax.sql.DataSource");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  Connection Strategy   Creates new physical socket   Borrows from pre-warmed pool");
        System.out.println("  Design Pattern        Static utility methods        Factory Interface (Polymorphic)");
        System.out.println("  Dependency Injection  Hard to mock / inject         Easily injected via Spring / Guice");
        System.out.println("  JNDI Lookup           Not supported                 Native JNDI resource support");
        System.out.println("  Enterprise Standard   Legacy / CLI only             Modern Production Standard (100%)");
        System.out.println("  -----------------------------------------------------------------------------------------");

        System.out.println("\n==========================================================================");
    }
}
