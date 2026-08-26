/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 0: The 'throw' Keyword: Explicitly Raising Exception Instances at Runtime
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class ThrowKeywordExplicitDemo {

    public static void validateAdmissionAge(int age, String studentName) {
        System.out.printf("  Validating applicant: %s (Age: %d)%n", studentName, age);

        // Explicitly instantiate and throw an exception object:
        if (age < 15) {
            throw new IllegalArgumentException("Student " + studentName + " must be at least 15 years old for professional Java training!");
        }

        System.out.println("  [APPROVED] Admission eligibility verified for: " + studentName);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: THE 'throw' KEYWORD - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Successful Validation (Swadeep Paul, Age 20):");
        validateAdmissionAge(20, "Swadeep Paul");

        System.out.println("\n>>> 2. Triggering Explicit 'throw' (Junior Applicant, Age 12):");
        try {
            validateAdmissionAge(12, "Junior Trainee");
        } catch (IllegalArgumentException e) {
            System.out.println("  [CAUGHT THROWN EXCEPTION] " + e.getMessage());
        }

        System.out.println("\n>>> SYNTAX RULES FOR 'throw':");
        System.out.println("  1. 'throw' is followed by an INSTANCE of Throwable (e.g. 'throw new MyException();').");
        System.out.println("  2. 'throw' immediately terminates the current execution flow.");

        System.out.println("\n==========================================================================");
    }
}