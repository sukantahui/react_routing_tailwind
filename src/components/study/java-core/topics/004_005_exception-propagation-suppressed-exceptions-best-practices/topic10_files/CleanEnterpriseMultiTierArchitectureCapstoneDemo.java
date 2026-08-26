/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 10: Clean Enterprise Multi-Tier Error Handling Architecture (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.sql.SQLException;

public class CleanEnterpriseMultiTierArchitectureCapstoneDemo {

    // 1. DATA ACCESS LAYER (Repository): Interacts with raw JDBC / storage
    public static class StudentRepository {
        public String findStudentInDatabase(String roll) throws SQLException {
            if ("ROLL_ERR".equals(roll)) {
                throw new SQLException("Connection to Barrackpore PostgreSQL cluster timed out!");
            }
            return "Debangshu Mukherjee (Barrackpore Hub)";
        }
    }

    // 2. SERVICE LAYER: Encapsulates business logic & translates technical errors
    public static class StudentService {
        private final StudentRepository repository = new StudentRepository();

        public String getStudentProfile(String roll) {
            try {
                return repository.findStudentInDatabase(roll);
            } catch (SQLException rawSqlEx) {
                // TRANSLATION: Wrap technical SQL error into clean unchecked domain exception:
                throw new IllegalStateException("Unable to retrieve student profile at this time", rawSqlEx);
            }
        }
    }

    // 3. CONTROLLER LAYER: Top-level API boundary (Centralized error response)
    public static class StudentController {
        private final StudentService service = new StudentService();

        public void handleGetStudentRequest(String roll) {
            System.out.println("  [HTTP GET /students/" + roll + "] Processing request...");
            try {
                String profile = service.getStudentProfile(roll);
                System.out.println("  [HTTP 200 OK] Response Payload: " + profile);
            } catch (IllegalStateException e) {
                // CENTRALIZED ERROR BOUNDARY: Log once with root cause, return HTTP 500 JSON
                System.out.println("  [HTTP 500 INTERNAL ERROR] Response: { "error": "" + e.getMessage() + "" }");
                System.out.println("  [INTERNAL LOGGING] Root Cause: " + e.getCause());
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: ENTERPRISE MULTI-TIER ERROR ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentController controller = new StudentController();

        System.out.println(">>> 1. Successful Multi-Tier Request:");
        controller.handleGetStudentRequest("ROLL_101");

        System.out.println("\n>>> 2. Failed Multi-Tier Request (Clean Propagation & Translation):");
        controller.handleGetStudentRequest("ROLL_ERR");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 004_005 PROPAGATION, CHAINING & BEST PRACTICES 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}