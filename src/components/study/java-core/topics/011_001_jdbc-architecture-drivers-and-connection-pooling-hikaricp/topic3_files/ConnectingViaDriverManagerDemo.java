/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 3: Connecting via DriverManager - DriverManager.getConnection()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectingViaDriverManagerDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: CONNECTING VIA DRIVERMANAGER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. JDBC 4.0+ AUTOMATIC DRIVER DISCOVERY (ServiceLoader):");
        System.out.println("  - Old Java (JDBC 3.0): Required 'Class.forName("com.mysql.cj.jdbc.Driver");'");
        System.out.println("  - Modern Java (JDBC 4.0+): Driver JAR contains 'META-INF/services/java.sql.Driver'");
        System.out.println("  - DriverManager automatically discovers and registers all drivers on classpath!\n");

        System.out.println(">>> 2. ESTABLISHING A CONNECTION SYNTAX:");
        System.out.println("  String url  = "jdbc:mysql://localhost:3306/barrackpore_academy";");
        System.out.println("  String user = "admin";");
        System.out.println("  String pass = "secure_pass_123";\n");
        System.out.println("  try (Connection conn = DriverManager.getConnection(url, user, pass)) {");
        System.out.println("      System.out.println("Connected successfully: " + conn.isValid(2));");
        System.out.println("  } catch (SQLException ex) {");
        System.out.println("      System.err.println("Connection failed: " + ex.getMessage());");
        System.out.println("  }");

        System.out.println("\n==========================================================================");
    }
}
