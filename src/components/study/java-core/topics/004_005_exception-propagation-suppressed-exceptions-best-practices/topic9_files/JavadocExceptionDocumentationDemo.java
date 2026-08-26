/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 9: Documenting Exceptions in Javadoc: Effective Java Item 74 & @throws Tag
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.FileNotFoundException;

public class JavadocExceptionDocumentationDemo {

    /**
     * Enrolls a student in the Barrackpore Java Core professional track.
     *
     * @param studentName The full name of the student (must not be null or blank)
     * @param admissionFee The deposit amount (must be positive)
     * @return Confirmation receipt token string
     *
     * @throws IllegalArgumentException if {@code studentName} is empty or {@code admissionFee <= 0}
     * @throws NullPointerException if {@code studentName} is null
     * @throws FileNotFoundException if the syllabus prospectus file is missing on disk
     */
    public static String enrollTrainee(String studentName, double admissionFee) throws FileNotFoundException {
        if (studentName == null) {
            throw new NullPointerException("Student name cannot be null!");
        }
        if (studentName.trim().isEmpty() || admissionFee <= 0) {
            throw new IllegalArgumentException("Invalid admission parameters!");
        }

        System.out.println("  [ENROLLED] " + studentName + " in Barrackpore batch with fee: " + admissionFee + " INR");
        return "RCPT_BKP_" + System.currentTimeMillis();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: JAVADOC @throws DOCUMENTATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 RULES OF EFFECTIVE JAVA ITEM 74 (Document All Exceptions):");
        System.out.println("  1. Document EVERY Checked exception with an explicit '@throws' tag.");
        System.out.println("  2. Document EVERY Unchecked exception that callers must avoid (e.g. NPE, IllegalArgument).");
        System.out.println("  3. DO NOT include Unchecked exceptions in the method header 'throws' signature, ONLY in Javadoc!");

        System.out.println("\n>>> Executing Valid Enrollment:");
        try {
            String receipt = enrollTrainee("Abhronila Das", 7500.0);
            System.out.println("  Receipt Issued: " + receipt);
        } catch (FileNotFoundException e) {
            System.out.println("  [ERROR] " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}