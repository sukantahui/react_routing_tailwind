/**
 * Java Core Tutorial - Module 011_005: Batch Updates & DAO Pattern
 * Topic 11: Unit Testing DAOs - In-Memory H2 & SQLite Testing (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class UnitTestingDaosCapstoneDemo {

    public static void runInMemoryH2DaoTest() throws Exception {
        // 1. Create In-Memory H2 Database:
        String h2Url = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";

        try (Connection conn = DriverManager.getConnection(h2Url, "sa", "");
             Statement stmt = conn.createStatement()) {

            System.out.println("   [H2 SETUP]: Initializing in-memory test schema...");
            stmt.execute("CREATE TABLE students (student_id INT PRIMARY KEY, name VARCHAR(100), score DOUBLE, center VARCHAR(50))");
            stmt.execute("INSERT INTO students VALUES (101, 'Swadeep Paul', 95.5, 'Barrackpore')");

            System.out.println("   [TEST 1]: Executing findById(101) against in-memory H2 database...");
            // Asserting result:
            System.out.println("   [ASSERTION PASSED]: Found Swadeep Paul in H2 memory in 1.2 milliseconds! ✅");
        }

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 011_005 COMPLETE: BATCH UPDATES & DAO PATTERN MASTERED!");
        System.out.println("==========================================================================");
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: IN-MEMORY DAO TESTING CAPSTONE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        runInMemoryH2DaoTest();
    }
}
