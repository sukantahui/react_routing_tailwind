/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 8: The 'final' Keyword: Preventing Inheritance and Method Overriding
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class FinalInheritanceRulesDemo {

    // 1. FINAL CLASS: Cannot be extended by ANY subclass!
    public static final class SecurityTokenVault {
        private String token = "SEC-998877";

        public void validate() {
            System.out.println("  [VAULT] Token validated: " + token);
        }
    }

    // Attempting: 'class SubVault extends SecurityTokenVault {}' -> COMPILE ERROR:
    // "cannot inherit from final com.coderaccotax.javatutorial.inheritance.FinalInheritanceRulesDemo.SecurityTokenVault"

    // 2. CLASS WITH FINAL METHOD:
    public static class AcademicCertificate {
        // FINAL METHOD: Subclasses CANNOT override this critical method!
        public final void printDigitalSignature() {
            System.out.println("  [LEGAL SIGNATURE] Cryptographically signed by Sukanta Hui @ Barrackpore Hub");
        }

        public void printCourseDetails() {
            System.out.println("  [COURSE] General Course Outline");
        }
    }

    public static class JavaSpecialistCertificate extends AcademicCertificate {
        @Override
        public void printCourseDetails() {
            System.out.println("  [COURSE] Java Core & Full Stack Architecture Pro");
        }

        // Attempting to override printDigitalSignature() -> COMPILE ERROR:
        // "printDigitalSignature() in JavaSpecialistCertificate cannot override printDigitalSignature() in AcademicCertificate; overridden method is final"
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: THE 'final' KEYWORD IN INHERITANCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        JavaSpecialistCertificate cert = new JavaSpecialistCertificate();
        cert.printCourseDetails();
        cert.printDigitalSignature();

        System.out.println("\n>>> Key 'final' Takeaways:");
        System.out.println("  1. 'final class' -> Closes inheritance tree (e.g. String, Integer).");
        System.out.println("  2. 'final method' -> Prevents overriding / behavior tampering.");

        System.out.println("\n==========================================================================");
    }
}