/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 12: Implicit super() Insertion by Compiler When No super() Is Written
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class ImplicitSuperInsertionDemo {

    // Parent Class with No-Arg Constructor
    public static class BaseAcademyMember {
        public BaseAcademyMember() {
            System.out.println("  [PARENT] BaseAcademyMember() no-arg constructor executed automatically!");
        }
    }

    // Child Class with No Explicit super() written
    public static class Trainee extends BaseAcademyMember {
        private String traineeName;

        public Trainee(String traineeName) {
            // COMPILER INJECTS 'super();' HERE AUTOMATICALLY ON LINE 1!
            this.traineeName = traineeName;
            System.out.println("  [CHILD] Trainee constructor completed for: " + this.traineeName);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: IMPLICIT super() INSERTION BY COMPILER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Creating Trainee (Observe Parent constructor running automatically):");
        Trainee t = new Trainee("Swadeep Paul");

        System.out.println("\n==========================================================================");
    }
}