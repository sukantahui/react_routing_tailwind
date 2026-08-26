/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 8: Modern Architectural Shift: Why Spring, Hibernate & Stream API Prefer Unchecked Exceptions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class ModernUncheckedFrameworkTrendDemo {

    // Spring Framework pattern: Wrapping checked SQLException into unchecked DataAccessException:
    public static class DataAccessException extends RuntimeException {
        public DataAccessException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public static void executeSpringStyleRepositoryQuery() {
        try {
            // Simulating a low-level checked SQL failure:
            throw new java.sql.SQLException("Connection to Barrackpore DB timed out!");
        } catch (java.sql.SQLException checkedSqlEx) {
            // Translate checked exception into clean unchecked domain exception:
            throw new DataAccessException("Failed to query student records", checkedSqlEx);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: MODERN UNCHECKED FRAMEWORK TREND - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 Reasons Modern Java (Spring Boot, Hibernate, Quarkus) Prefers Unchecked Exceptions:");
        System.out.println("  1. Boilerplate Elimination: Avoids polluting intermediate method signatures with 'throws'.");
        System.out.println("  2. Stream API & Lambda Compatibility: Lambdas cannot throw checked exceptions without ugly wrappers.");
        System.out.println("  3. Centralized Exception Handlers (@ControllerAdvice): Unchecked exceptions bubble up to global HTTP handlers.");

        System.out.println("\n>>> Executing Spring-Style Repository Call:");
        try {
            executeSpringStyleRepositoryQuery();
        } catch (DataAccessException e) {
            System.out.println("  [CENTRAL HANDLER] Caught Unchecked Exception: " + e.getMessage());
            System.out.println("  [ROOT CAUSE] " + e.getCause());
        }

        System.out.println("\n==========================================================================");
    }
}