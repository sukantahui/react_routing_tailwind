/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 6: The DAO (Data Access Object) Pattern - Architecture & Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class DaoPatternOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THE DAO DESIGN PATTERN OVERVIEW - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 PILLARS OF DAO ARCHITECTURE:");
        System.out.println("  1. ENTITY / MODEL  : Plain Java class/record representing domain data (e.g. Student).");
        System.out.println("  2. DAO INTERFACE   : Pure Java interface declaring CRUD operations (e.g. StudentDao).");
        System.out.println("  3. DAO IMPL        : Concrete class containing JDBC queries and connection logic (e.g. StudentDaoJdbcImpl).");
        System.out.println("  4. SERVICE LAYER   : Business workflows that invoke DAO methods without knowing about SQL!\n");

        System.out.println(">>> CORE ADVANTAGES:");
        System.out.println("  - Separation of Concerns: SQL changes do not affect business logic.");
        System.out.println("  - Swappable Persistence : Can switch from MySQL to PostgreSQL or SQLite by writing a new DAO implementation!");
        System.out.println("  - 100% Unit Testable    : Services can be tested using Mock DAOs without needing a live database.");

        System.out.println("\n==========================================================================");
    }
}
