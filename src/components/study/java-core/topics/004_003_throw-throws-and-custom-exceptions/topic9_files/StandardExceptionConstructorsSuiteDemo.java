/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 9: Implementing the 4 Standard Custom Exception Constructors (Best Practice)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class StandardExceptionConstructorsSuiteDemo {

    // GOLD STANDARD: Providing all 4 canonical constructors:
    public static class CourseEnrollmentException extends Exception {

        // 1. Default no-arg constructor:
        public CourseEnrollmentException() {
            super();
        }

        // 2. Message-only constructor:
        public CourseEnrollmentException(String message) {
            super(message);
        }

        // 3. Cause-only constructor (Exception Chaining):
        public CourseEnrollmentException(Throwable cause) {
            super(cause);
        }

        // 4. Message + Cause constructor (Most powerful):
        public CourseEnrollmentException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: 4 CANONICAL EXCEPTION CONSTRUCTORS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating Exception with Message only:");
        CourseEnrollmentException ex1 = new CourseEnrollmentException("Barrackpore Batch full!");
        System.out.println("  ex1: " + ex1.getMessage());

        System.out.println("\n>>> 2. Creating Chained Exception with Message + Underlying Cause:");
        IllegalArgumentException underlyingRoot = new IllegalArgumentException("Invalid Student ID format");
        CourseEnrollmentException ex2 = new CourseEnrollmentException("Failed to register trainee", underlyingRoot);
        System.out.println("  ex2 Message: " + ex2.getMessage());
        System.out.println("  ex2 Cause  : " + ex2.getCause());

        System.out.println("\n==========================================================================");
    }
}