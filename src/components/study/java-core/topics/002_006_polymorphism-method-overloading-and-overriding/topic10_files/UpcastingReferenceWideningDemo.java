/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 10: Upcasting (Parent p = new Child()): Implicit & Always Safe
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class UpcastingReferenceWideningDemo {

    public static class Staff {
        public void work() { System.out.println("  [STAFF] General staff duties."); }
    }

    public static class Instructor extends Staff {
        @Override
        public void work() { System.out.println("  [INSTRUCTOR] Teaching Java Full Stack in Barrackpore lab!"); }

        public void gradeAssignments() {
            System.out.println("  [GRADING] Grading Swadeep's and Tuhina's projects.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: UPCASTING (WIDENING REFERENCE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // UPCASTING: Assigning a subclass instance to a superclass reference variable
        // Implicit, 100% type-safe, no cast operator '(Staff)' required!
        Staff member = new Instructor();

        System.out.println(">>> 1. Calling overridden method via Upcasted reference (Dynamic Dispatch):");
        member.work(); // Dispatches to Instructor.work()!

        System.out.println("\n>>> 2. Scope Restriction of Upcasted reference:");
        // member.gradeAssignments(); // COMPILE ERROR: Reference type 'Staff' doesn't declare gradeAssignments()!
        System.out.println("  - Upcasted reference can ONLY see methods declared in the Parent 'Staff' class.");

        System.out.println("\n==========================================================================");
    }
}