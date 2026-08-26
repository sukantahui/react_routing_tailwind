/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 9: IS-A Relationship (Inheritance) vs HAS-A Relationship (Association)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class IsAvsHasARelationshipDemo {

    // Component Component (For HAS-A)
    public static class AcademicBadge {
        private String badgeId = "BADGE-BKP-2026";
        public void printBadge() { System.out.println("  [BADGE] ID: " + badgeId); }
    }

    // Base Entity (For IS-A)
    public static class AcademyPerson {
        protected String name;
        public AcademyPerson(String name) { this.name = name; }
    }

    // Trainee IS-A AcademyPerson (Inheritance)
    // Trainee HAS-A AcademicBadge (Association)
    public static class Trainee extends AcademyPerson {
        // HAS-A Relationship: Trainee contains an AcademicBadge reference
        private AcademicBadge badge;

        public Trainee(String name) {
            super(name); // IS-A relationship
            this.badge = new AcademicBadge(); // HAS-A relationship
        }

        public void printIdentity() {
            System.out.println("  [IS-A] Trainee IS-A AcademyPerson named: " + this.name);
            System.out.print("  [HAS-A] Trainee HAS-A AcademicBadge: ");
            this.badge.printBadge();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: IS-A VS HAS-A RELATIONSHIP - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Trainee swadeep = new Trainee("Swadeep Paul");
        swadeep.printIdentity();

        System.out.println("\n==========================================================================");
    }
}