/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 1: JDBC Architecture - From Application to Database Engine
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class JdbcArchitectureLayersDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: JDBC ARCHITECTURE LAYERS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4-LAYER JDBC ARCHITECTURAL STACK:");
        System.out.println("  ┌─────────────────────────────────────────────────────────────┐");
        System.out.println("  │ 1. APPLICATION LAYER (Your Business Code / Spring / DAO)    │");
        System.out.println("  │    - Calls: connection.prepareStatement("SELECT ...");       │");
        System.out.println("  ├─────────────────────────────────────────────────────────────┤");
        System.out.println("  │ 2. JDBC API LAYER (java.sql.* Standard Interfaces)          │");
        System.out.println("  │    - Defines: Connection, PreparedStatement, ResultSet.     │");
        System.out.println("  ├─────────────────────────────────────────────────────────────┤");
        System.out.println("  │ 3. JDBC DRIVER MANAGER / DATASOURCE LAYER                   │");
        System.out.println("  │    - Discovers drivers, establishes connections via URL.    │");
        System.out.println("  ├─────────────────────────────────────────────────────────────┤");
        System.out.println("  │ 4. VENDOR JDBC DRIVER LAYER (MySQL, PostgreSQL, Oracle JAR) │");
        System.out.println("  │    - Implements interfaces, encodes TCP wire protocol.      │");
        System.out.println("  ├─────────────────────────────────────────────────────────────┤");
        System.out.println("  │ 5. DATABASE SERVER ENGINE (RDBMS Engine)                    │");
        System.out.println("  │    - Executes SQL, manages B-Tree indexes, returns rows.    │");
        System.out.println("  └─────────────────────────────────────────────────────────────┘");

        System.out.println("\n==========================================================================");
    }
}
