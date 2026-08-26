/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 0: What is Inheritance: Code Reusability, Extensibility & Domain Taxonomies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class InheritanceFoundationsDemo {

    // Base Class: Common Academy Member
    public static class AcademyMember {
        protected int id;
        protected String name;
        protected String hubLocation;

        public AcademyMember(int id, String name, String hubLocation) {
            this.id = id;
            this.name = name;
            this.hubLocation = hubLocation;
        }

        public void printBadge() {
            System.out.printf("  [MEMBER BADGE] ID: %d | Name: %s | Hub: %s\n", id, name, hubLocation);
        }
    }

    // Subclass: Reuses and extends AcademyMember
    public static class TraineeDeveloper extends AcademyMember {
        private String trackSpecialization;

        public TraineeDeveloper(int id, String name, String hubLocation, String trackSpecialization) {
            super(id, name, hubLocation); // Reusing parent state
            this.trackSpecialization = trackSpecialization;
        }

        public void printTraineeDetails() {
            super.printBadge(); // Reusing parent functionality
            System.out.printf("  -> Specialization Track: %s\n", trackSpecialization);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS INHERITANCE IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeDeveloper swadeep = new TraineeDeveloper(101, "Swadeep Paul", "Barrackpore Hub", "Java Full Stack");
        swadeep.printTraineeDetails();

        System.out.println("\n==========================================================================");
    }
}