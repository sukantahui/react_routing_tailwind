/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 1: Using 'this' to Resolve Variable Shadowing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class VariableShadowingResolutionDemo {

    public static class TraineeRecord {
        // Instance Variables (State residing on Heap)
        private String studentName;
        private int rollNumber;
        private double feeDue;

        // Parameter names are IDENTICAL to instance variables (Shadowing occurs)
        public TraineeRecord(String studentName, int rollNumber, double feeDue) {
            // Without 'this', 'studentName = studentName' assigns parameter to itself (no effect on Heap)!
            // With 'this', we explicitly target the Heap instance variable:
            this.studentName = studentName;
            this.rollNumber = rollNumber;
            this.feeDue = feeDue;

            System.out.printf("  [SHADOWING RESOLVED] Initialized %s (Roll: %d) with Fee: ₹%.2f\n",
                    this.studentName, this.rollNumber, this.feeDue);
        }

        // Setter method with shadowing
        public void setFeeDue(double feeDue) {
            this.feeDue = feeDue; // Resolves shadowing
        }

        public void printState() {
            System.out.printf("  -> Student: %s | Roll: %d | Fee Due: ₹%.2f\n", studentName, rollNumber, feeDue);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: VARIABLE SHADOWING RESOLUTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating Trainee with identical parameter & field names:");
        TraineeRecord swadeep = new TraineeRecord("Swadeep Paul", 101, 2500.0);
        swadeep.printState();

        System.out.println("\n>>> 2. Updating fee via setter using 'this.feeDue = feeDue':");
        swadeep.setFeeDue(1000.0);
        swadeep.printState();

        System.out.println("\n==========================================================================");
    }
}