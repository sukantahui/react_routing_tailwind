/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 10: Handling NullPointerException Gracefully: Defensive Checks & Java 14+ Helpful NPEs (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.util.Objects;
import java.util.Optional;

public class HelpfulNpeAndDefensiveHandlingCapstoneDemo {

    public static class StudentRecord {
        private String studentName;
        private String enrolledCenter;

        public StudentRecord(String name, String center) {
            // Defensive validation using Objects.requireNonNull():
            this.studentName = Objects.requireNonNull(name, "Student name cannot be null!");
            this.enrolledCenter = Objects.requireNonNull(center, "Enrolled center cannot be null!");
        }

        public String getStudentName() { return studentName; }
        public String getEnrolledCenter() { return enrolledCenter; }
    }

    public static String getSafeCenterName(StudentRecord record) {
        // Safe handling using Optional:
        return Optional.ofNullable(record)
                .map(StudentRecord::getEnrolledCenter)
                .orElse("Default Center: Barrackpore Main");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: DEFENSIVE NPE HANDLING CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating Valid Student Record with Objects.requireNonNull():");
        StudentRecord validStudent = new StudentRecord("Swadeep Paul", "Barrackpore");
        System.out.println("  Student: " + validStudent.getStudentName() + " (" + validStudent.getEnrolledCenter() + ")");

        System.out.println("\n>>> 2. Catching Defensive Fast-Fail Exception:");
        try {
            new StudentRecord(null, "Barrackpore");
        } catch (NullPointerException e) {
            System.out.println("  [DEFENSIVE SHIELD] Fast-Failed: " + e.getMessage());
        }

        System.out.println("\n>>> 3. Safe Null-Handling via Optional.ofNullable():");
        System.out.println("  Safe Center (Null Record): " + getSafeCenterName(null));
        System.out.println("  Safe Center (Valid Record): " + getSafeCenterName(validStudent));

        System.out.println("\n>>> 4. Helpful NPEs in Modern Java (Java 14+):");
        System.out.println("  In Java 14+, the JVM specifies the EXACT variable that was null (e.g. 'Cannot invoke length() because record.name is null')!");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 004_001 EXCEPTION ARCHITECTURE 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}