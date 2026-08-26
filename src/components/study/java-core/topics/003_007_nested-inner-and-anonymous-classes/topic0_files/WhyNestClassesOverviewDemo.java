/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 0: Why Nest Classes: Logical Grouping, Encapsulation & Cohesive Design
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class WhyNestClassesOverviewDemo {

    // Outer Class representing Barrackpore Training Center:
    private String centerName = "Barrackpore AccoTax Hub";
    private int totalStudents = 120;

    // Helper Inner Class logically grouped exclusively within its enclosing center:
    public class CenterStats {
        public void displayReport() {
            // Direct access to outer private fields:
            System.out.println("  Center Name   : " + centerName);
            System.out.println("  Enrolled Count: " + totalStudents + " trainees");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY NEST CLASSES IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 Architectural Reasons to Nest Classes:");
        System.out.println("  1. Logical Grouping: Classes used in only one place stay tightly coupled.");
        System.out.println("  2. Enhanced Encapsulation: Inner class can access private outer fields directly.");
        System.out.println("  3. Code Readability: Helper models reside right next to where they are consumed.");

        WhyNestClassesOverviewDemo hub = new WhyNestClassesOverviewDemo();
        WhyNestClassesOverviewDemo.CenterStats stats = hub.new CenterStats();

        System.out.println("\n>>> Executing Nested CenterStats Helper:");
        stats.displayReport();

        System.out.println("\n==========================================================================");
    }
}