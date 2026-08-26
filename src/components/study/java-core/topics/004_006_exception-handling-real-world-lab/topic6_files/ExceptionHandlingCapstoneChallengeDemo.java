/**
 * Java Core Tutorial - Module 004_006: Exception Handling Real-World Lab
 * Topic 6: Timed Exception Framework Coding Challenge (Segment 4 Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.StringReader;
import java.util.Objects;

public class ExceptionHandlingCapstoneChallengeDemo {

    // Custom Domain Exception:
    public static class StudentAccountLockedException extends RuntimeException {
        private final String studentId;
        public StudentAccountLockedException(String id, String msg) {
            super(msg);
            this.studentId = id;
        }
        public String getStudentId() { return studentId; }
    }

    // CAPSTONE CHALLENGE METHOD: Integrates validation, ARM, chaining, and custom exceptions:
    public static void executeStudentCredentialVerification(String studentId, String rawSecret) {
        // Step 1: Defensive fast-fail
        Objects.requireNonNull(studentId, "Student ID cannot be null!");

        if (studentId.startsWith("LOCKED_")) {
            throw new StudentAccountLockedException(studentId, "Account is locked due to security policy!");
        }

        // Step 2: Try-with-Resources automatic cleanup
        try (StringReader secretReader = new StringReader(rawSecret)) {
            int firstChar = secretReader.read();
            if (firstChar == 'X') {
                throw new IllegalArgumentException("Suspicious secret signature detected!");
            }
            System.out.println("  [VERIFIED] Credentials authenticated for: " + studentId);
        } catch (Exception e) {
            // Step 3: Exception chaining and translation
            throw new IllegalStateException("Security verification gateway failed for " + studentId, e);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: TIMED EXCEPTION CODING CHALLENGE CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Scenario 1: Valid Verification:");
        executeStudentCredentialVerification("STU_BKP_101", "VALID_PASSWORD_2026");

        System.out.println("\n>>> 2. Scenario 2: Handling Custom Account Locked Exception:");
        try {
            executeStudentCredentialVerification("LOCKED_STU_99", "SECRET");
        } catch (StudentAccountLockedException e) {
            System.out.println("  [CAUGHT CUSTOM EXCEPTION] " + e.getMessage() + " (ID: " + e.getStudentId() + ")");
        }

        System.out.println("\n>>> 3. Scenario 3: Handling Chained Gateway Failure:");
        try {
            executeStudentCredentialVerification("STU_BKP_102", "X_INVALID_KEY");
        } catch (IllegalStateException e) {
            System.out.println("  [CAUGHT CHAINED EXCEPTION] " + e.getMessage());
            System.out.println("  [UNDERLYING ROOT CAUSE] " + e.getCause());
        }

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 004_006 EXCEPTION HANDLING REAL-WORLD LAB 100% COMPLETE!");
        System.out.println(" SEGMENT 4: EXCEPTION HANDLING & ROBUST APPLICATION DESIGN 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}