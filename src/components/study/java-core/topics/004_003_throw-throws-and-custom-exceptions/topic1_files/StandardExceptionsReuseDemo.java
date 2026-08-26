/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 1: Throwing Built-in Standard Exceptions (Effective Java Item 72)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.util.NoSuchElementException;

public class StandardExceptionsReuseDemo {

    // 1. Reusing IllegalArgumentException for bad parameters:
    public static void setMonthlyInstallmentTenure(int months) {
        if (months <= 0 || months > 36) {
            throw new IllegalArgumentException("Installment tenure must be between 1 and 36 months! Received: " + months);
        }
        System.out.println("  [CONFIGURED] Installment tenure set to " + months + " months.");
    }

    // 2. Reusing IllegalStateException for invalid object lifecycle:
    public static class CourseBatch {
        private boolean isClosed = false;

        public void closeBatch() { this.isClosed = true; }

        public void enrollStudent(String studentName) {
            if (isClosed) {
                throw new IllegalStateException("Cannot enroll " + studentName + "! Batch has already concluded.");
            }
            System.out.println("  [ENROLLED] " + studentName + " added to active batch.");
        }
    }

    // 3. Reusing NoSuchElementException when searching:
    public static String findStudentByRoll(String rollNumber) {
        if (!"ROLL_101".equals(rollNumber)) {
            throw new NoSuchElementException("No student record found with roll number: " + rollNumber);
        }
        return "Abhronila Das (Barrackpore Hub)";
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: REUSING STANDARD EXCEPTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. IllegalArgumentException Demo:");
        try {
            setMonthlyInstallmentTenure(48);
        } catch (IllegalArgumentException e) {
            System.out.println("  [CAUGHT] " + e.getMessage());
        }

        System.out.println("\n>>> 2. IllegalStateException Demo:");
        try {
            CourseBatch batch = new CourseBatch();
            batch.closeBatch();
            batch.enrollStudent("Debangshu Mukherjee");
        } catch (IllegalStateException e) {
            System.out.println("  [CAUGHT] " + e.getMessage());
        }

        System.out.println("\n>>> 3. NoSuchElementException Demo:");
        try {
            findStudentByRoll("ROLL_999");
        } catch (NoSuchElementException e) {
            System.out.println("  [CAUGHT] " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}