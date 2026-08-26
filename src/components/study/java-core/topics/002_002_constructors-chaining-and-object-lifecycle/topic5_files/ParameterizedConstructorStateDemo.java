/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 5: Parameterized Constructors: Passing Initial Values During Object Creation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

import java.util.Objects;

public class ParameterizedConstructorStateDemo {

    public static class TraineeRecord {
        private final int traineeId;
        private final String traineeName;
        private final String branchHub;
        private final double scholarshipPercentage;

        // Parameterized Constructor enforcing domain invariants at birth
        public TraineeRecord(int traineeId, String traineeName, String branchHub, double scholarshipPercentage) {
            if (traineeId <= 0) {
                throw new IllegalArgumentException("Trainee ID must be positive: " + traineeId);
            }
            if (scholarshipPercentage < 0.0 || scholarshipPercentage > 100.0) {
                throw new IllegalArgumentException("Invalid scholarship percentage: " + scholarshipPercentage);
            }

            this.traineeId = traineeId;
            this.traineeName = Objects.requireNonNull(traineeName, "Trainee name cannot be null").trim();
            this.branchHub = Objects.requireNonNull(branchHub, "Branch hub cannot be null").trim();
            this.scholarshipPercentage = scholarshipPercentage;

            System.out.printf("  [CONSTRUCTOR] Initialized TraineeRecord for %s (ID: %d) at %s.\n",
                    this.traineeName, this.traineeId, this.branchHub);
        }

        public void printSummary() {
            System.out.printf("  -> [%d] %s | Hub: %s | Scholarship: %.1f%%\n",
                    traineeId, traineeName, branchHub, scholarshipPercentage);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: PARAMETERIZED CONSTRUCTORS & INVARIANT SAFETY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating Trainee for Swadeep Paul (Barrackpore Hub):");
        TraineeRecord t1 = new TraineeRecord(101, "Swadeep Paul", "Barrackpore", 95.0);
        t1.printSummary();

        System.out.println("\n>>> 2. Creating Trainee for Abhronila Das (Shyamnagar Hub):");
        TraineeRecord t2 = new TraineeRecord(102, "Abhronila Das", "Shyamnagar", 88.5);
        t2.printSummary();

        System.out.println("\n>>> 3. Testing Invariant Protection with Invalid Data:");
        try {
            new TraineeRecord(-5, "Invalid Student", "Naihati", 50.0);
        } catch (IllegalArgumentException ex) {
            System.out.println("  [PROTECTED] Constructor threw exception: " + ex.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}