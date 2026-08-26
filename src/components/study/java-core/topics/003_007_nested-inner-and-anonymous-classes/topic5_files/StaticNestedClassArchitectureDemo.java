/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 5: Static Nested Class: Architecture, Independence & Instantiation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class StaticNestedClassArchitectureDemo {

    private static String institutionType = "Higher Technical Education";
    private String campusName = "Naihati Center";

    // Static Nested Class:
    public static class CourseCatalog {
        private String courseTitle = "Java Core Fullstack Pro";

        public void printDetails() {
            // Can access outer STATIC fields:
            System.out.println("  Institution Type : " + institutionType);
            System.out.println("  Course Title     : " + courseTitle);

            // COMPILE ERROR if we try to access non-static 'campusName' directly:
            // System.out.println(campusName); // Cannot make a static reference!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: STATIC NESTED CLASS ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Instantiating Static Nested class WITHOUT an Outer class instance:
        StaticNestedClassArchitectureDemo.CourseCatalog catalog =
                new StaticNestedClassArchitectureDemo.CourseCatalog();

        System.out.println(">>> Executing Static Nested CourseCatalog Method:");
        catalog.printDetails();

        System.out.println("\n>>> ARCHITECTURAL TRAIT:");
        System.out.println("  Static nested classes do NOT hold a hidden reference to an outer object,");
        System.out.println("  making them lightweight, memory-efficient, and immune to memory leaks!");

        System.out.println("\n==========================================================================");
    }
}