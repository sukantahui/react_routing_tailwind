/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 1: Creating Packages Using the 'package' Statement
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

// RULE 1: The 'package' statement MUST be the FIRST non-comment line in the source file!
package com.coderaccotax.academy.admissions;

public class PackageDeclarationRulesDemo {

    public static class EnrollmentApplicant {
        private String applicantName;
        private int applicationNumber;

        public EnrollmentApplicant(String name, int number) {
            this.applicantName = name;
            this.applicationNumber = number;
        }

        public void printBadge() {
            System.out.printf("  [ENROLLED] #%d: %s | Package: com.coderaccotax.academy.admissions\n",
                    applicationNumber, applicantName);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE 'package' STATEMENT RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        EnrollmentApplicant applicant = new EnrollmentApplicant("Swadeep Paul", 202601);
        applicant.printBadge();

        System.out.println("\n>>> Rules of 'package' statement:");
        System.out.println("  1. Must appear before any 'import' or 'class' declaration.");
        System.out.println("  2. Only ONE 'package' statement is permitted per file.");
        System.out.println("  3. Directory structure on disk MUST match: com/coderaccotax/academy/admissions/");

        System.out.println("\n==========================================================================");
    }
}