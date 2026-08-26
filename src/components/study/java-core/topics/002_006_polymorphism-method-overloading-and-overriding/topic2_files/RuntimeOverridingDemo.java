/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 2: Runtime Polymorphism (Dynamic Binding / Late Binding): Method Overriding
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class RuntimeOverridingDemo {

    // Superclass
    public static class AcademicExam {
        public void conductAssessment() {
            System.out.println("  [BASE EXAM] Conducting standard pen-and-paper assessment.");
        }
    }

    // Subclass 1: Online Exam
    public static class OnlineCodeLabExam extends AcademicExam {
        @Override
        public void conductAssessment() {
            System.out.println("  [CODE LAB EXAM] Launching browser sandbox with automated JUnit testing!");
        }
    }

    // Subclass 2: Viva Interview
    public static class VivaVoceExam extends AcademicExam {
        @Override
        public void conductAssessment() {
            System.out.println("  [VIVA VOCE] Conducting 1-on-1 architecture interview with Sukanta Hui!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: RUNTIME POLYMORPHISM (OVERRIDING) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Superclass reference holding Subclass 1:
        AcademicExam exam1 = new OnlineCodeLabExam();
        // Superclass reference holding Subclass 2:
        AcademicExam exam2 = new VivaVoceExam();

        System.out.println(">>> 1. Invoking conductAssessment() on exam1 (Resolved at Runtime):");
        exam1.conductAssessment(); // Dispatches to OnlineCodeLabExam!

        System.out.println("\n>>> 2. Invoking conductAssessment() on exam2 (Resolved at Runtime):");
        exam2.conductAssessment(); // Dispatches to VivaVoceExam!

        System.out.println("\n==========================================================================");
    }
}