/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 11: Downcasting (Child c = (Child) p): Explicit Narrowing & ClassCastException
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class DowncastingClassCastRiskDemo {

    public static class StaffMember {
        public void checkIn() { System.out.println("  [CHECK-IN] Biometric attendance recorded."); }
    }

    public static class MentorInstructor extends StaffMember {
        public void conductCodeReview() {
            System.out.println("  [CODE REVIEW] Reviewing Swadeep's pull request on GitHub!");
        }
    }

    public static class OfficeAdmin extends StaffMember {
        public void processFeeReceipt() {
            System.out.println("  [ACCOUNTS] Printing GST fee receipt for Tuhina.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: DOWNCASTING & ClassCastException RISK - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StaffMember staff1 = new MentorInstructor(); // Upcast

        System.out.println(">>> 1. Valid Explicit Downcasting (staff1 IS-A MentorInstructor):");
        MentorInstructor mentor = (MentorInstructor) staff1; // Explicit narrowing cast
        mentor.conductCodeReview();

        System.out.println("\n>>> 2. Invalid Downcasting (Throws ClassCastException):");
        StaffMember staff2 = new OfficeAdmin(); // Actually an OfficeAdmin!
        try {
            // Attempting to cast an OfficeAdmin into a MentorInstructor!
            MentorInstructor badCast = (MentorInstructor) staff2;
            badCast.conductCodeReview();
        } catch (ClassCastException ex) {
            System.out.println("  [CAUGHT FATAL ERROR] ClassCastException: Cannot cast OfficeAdmin to MentorInstructor!");
        }

        System.out.println("\n==========================================================================");
    }
}