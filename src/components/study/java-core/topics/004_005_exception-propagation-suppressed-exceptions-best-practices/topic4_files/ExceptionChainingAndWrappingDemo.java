/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 4: Exception Chaining / Wrapping: Translating Technical Failures into Domain Semantics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.sql.SQLException;

public class ExceptionChainingAndWrappingDemo {

    // Domain exception:
    public static class StudentEnrollmentPersistenceException extends RuntimeException {
        public StudentEnrollmentPersistenceException(String message, Throwable cause) {
            super(message, cause); // Forwarding cause establishes the chain!
        }
    }

    public static void persistStudentRecordToDatabase(String studentName) {
        try {
            // Simulating low-level database failure:
            throw new SQLException("Deadlock detected on Barrackpore student table!");
        } catch (SQLException rawSqlEx) {
            // EXCEPTION CHAINING: Wrap low-level SQL error into high-level business domain exception:
            throw new StudentEnrollmentPersistenceException(
                    "Failed to enroll student '" + studentName + "' due to database failure",
                    rawSqlEx
            );
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: EXCEPTION CHAINING & WRAPPING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        try {
            persistStudentRecordToDatabase("Tuhina Das");
        } catch (StudentEnrollmentPersistenceException domainEx) {
            System.out.println(">>> 1. Intercepted High-Level Domain Exception:");
            System.out.println("  Domain Message : " + domainEx.getMessage());

            System.out.println("\n>>> 2. Inspecting Underlying Root Cause (domainEx.getCause()):");
            Throwable rootCause = domainEx.getCause();
            System.out.println("  Root Cause Class   : " + rootCause.getClass().getName());
            System.out.println("  Root Cause Message : " + rootCause.getMessage());

            System.out.println("\n>>> 3. Chained Stack Trace (Includes 'Caused by:' section):");
            domainEx.printStackTrace(System.out);
        }

        System.out.println("\n==========================================================================");
    }
}