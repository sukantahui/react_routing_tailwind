/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 10: Configuring HikariCP - HikariConfig & Production Sizing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ConfiguringHikariCpPureJavaDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: CONFIGURING HIKARICP IN PURE JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> PURE JAVA HIKARICP CONFIGURATION CHEATSHEET:");
        System.out.println("  HikariConfig config = new HikariConfig();");
        System.out.println("  config.setJdbcUrl("jdbc:postgresql://localhost:5432/barrackpore_db");");
        System.out.println("  config.setUsername("postgres");");
        System.out.println("  config.setPassword("admin_secret_2026");\n");

        System.out.println(">>> THE 5 CRITICAL PRODUCTION POOL PARAMETERS:");
        System.out.println("  1. config.setMaximumPoolSize(10);          // Max active physical connections in pool.");
        System.out.println("  2. config.setMinimumIdle(10);              // Recommend: same as maxPoolSize (fixed pool).");
        System.out.println("  3. config.setConnectionTimeout(30000);     // Max wait time to borrow (30 seconds).");
        System.out.println("  4. config.setIdleTimeout(600000);          // Max time idle connection sits (10 mins).");
        System.out.println("  5. config.setMaxLifetime(1800000);         // Max total lifespan of connection (30 mins).\n");

        System.out.println(">>> POOL SIZING FORMULA (PostgreSQL / MySQL Official Formula):");
        System.out.println("  - pool_size = (core_count * 2) + effective_spindle_count");
        System.out.println("  - Example for 4 CPU Cores with NVMe SSD: (4 * 2) + 2 = 10 connections!");

        System.out.println("\n==========================================================================");
    }
}
