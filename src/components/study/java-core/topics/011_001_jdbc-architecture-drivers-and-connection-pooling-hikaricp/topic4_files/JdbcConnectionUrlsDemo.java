/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 4: Understanding JDBC Connection URLs - Syntax & Parameters
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class JdbcConnectionUrlsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: UNDERSTANDING JDBC CONNECTION URLS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. ANATOMY OF A JDBC URL:");
        System.out.println("  Pattern: jdbc:<subprotocol>:<subname/connection-details>");
        System.out.println("  Example: jdbc:mysql://localhost:3306/barrackpore_db?useSSL=true&serverTimezone=UTC\n");

        System.out.println(">>> 2. PRODUCTION JDBC URL EXAMPLES BY DATABASE ENGINE:");
        System.out.println("  --------------------------------------------------------------------------------------------------");
        System.out.println("  DATABASE     DEFAULT PORT   JDBC CONNECTION URL PATTERN");
        System.out.println("  --------------------------------------------------------------------------------------------------");
        System.out.println("  MySQL        3306           jdbc:mysql://localhost:3306/academy_db?serverTimezone=UTC");
        System.out.println("  PostgreSQL   5432           jdbc:postgresql://localhost:5432/academy_db?sslmode=verify-full");
        System.out.println("  Oracle       1521           jdbc:oracle:thin:@localhost:1521:xe (or @//localhost:1521/ORCL)");
        System.out.println("  SQL Server   1433           jdbc:sqlserver://localhost:1433;databaseName=academy_db");
        System.out.println("  SQLite       N/A (File)     jdbc:sqlite:/var/data/academy.db");
        System.out.println("  H2 In-Memory N/A (RAM)      jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1");
        System.out.println("  --------------------------------------------------------------------------------------------------");

        System.out.println("\n==========================================================================");
    }
}
