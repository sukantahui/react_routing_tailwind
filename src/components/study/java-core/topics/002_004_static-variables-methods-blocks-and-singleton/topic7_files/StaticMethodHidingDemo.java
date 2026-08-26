/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 7: Can Static Methods Be Overridden? (No, Method Hiding Concept)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class StaticMethodHidingDemo {

    // Parent Class
    public static class SuperPortal {
        public static void printAnnouncement() {
            System.out.println("  [SUPER PORTAL static] Standard Academy Announcement");
        }

        public void printInstanceGreeting() {
            System.out.println("  [SUPER PORTAL instance] Welcome to SuperPortal!");
        }
    }

    // Child Class
    public static class SpecialBranchPortal extends SuperPortal {
        // METHOD HIDING: Re-declaring a static method with same signature HIDES the parent method!
        // It is NOT overridden polymorphically!
        public static void printAnnouncement() {
            System.out.println("  [SPECIAL BRANCH static] Special Barrackpore Cloud Track Announcement");
        }

        @Override
        public void printInstanceGreeting() {
            System.out.println("  [SPECIAL BRANCH instance] Welcome to Barrackpore Special Branch!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: METHOD HIDING VS METHOD OVERRIDING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Reference of SuperClass pointing to Child Instance:
        SuperPortal ref = new SpecialBranchPortal();

        System.out.println(">>> 1. Calling static method on Parent Reference (Triggers METHOD HIDING):");
        // Static dispatch uses the COMPILE-TIME REFERENCE TYPE (SuperPortal):
        ref.printAnnouncement(); // Prints SuperPortal announcement!

        System.out.println("\n>>> 2. Calling instance method on Parent Reference (Triggers OVERRIDING):");
        // Dynamic dispatch uses RUNTIME OBJECT TYPE (SpecialBranchPortal):
        ref.printInstanceGreeting(); // Prints SpecialBranchPortal greeting!

        System.out.println("\n==========================================================================");
    }
}