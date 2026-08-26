/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 5: Writing a Bulletproof equals() Method Step-by-Step
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

import java.util.Objects;

public class BulletproofEqualsStepByStepDemo {

    public static class TraineeRecord {
        private final int rollNumber;
        private final String fullName;
        private final double gpaScore;

        public TraineeRecord(int roll, String name, double gpa) {
            this.rollNumber = roll;
            this.fullName = name;
            this.gpaScore = gpa;
        }

        // ====================================================================
        // THE 4-STEP BULLETPROOF equals() TEMPLATE:
        // ====================================================================
        @Override
        public boolean equals(Object obj) {
            // STEP 1: Fast identity check (Are they the exact same reference in RAM?)
            if (this == obj) return true;

            // STEP 2: Null check & exact Class type check (Guarantees Symmetry!)
            if (obj == null || getClass() != obj.getClass()) return false;

            // STEP 3: Safe Downcast to current class type
            TraineeRecord other = (TraineeRecord) obj;

            // STEP 4: Compare all significant fields using Double.compare and Objects.equals
            return this.rollNumber == other.rollNumber &&
                   Double.compare(this.gpaScore, other.gpaScore) == 0 &&
                   Objects.equals(this.fullName, other.fullName);
        }

        @Override
        public int hashCode() {
            return Objects.hash(rollNumber, fullName, gpaScore);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: 4-STEP BULLETPROOF equals() TEMPLATE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeRecord t1 = new TraineeRecord(101, "Swadeep Paul", 9.4);
        TraineeRecord t2 = new TraineeRecord(101, "Swadeep Paul", 9.4);
        TraineeRecord t3 = null;

        System.out.println(">>> 1. Comparing two identical instances:");
        System.out.println("  t1.equals(t2) -> " + t1.equals(t2));

        System.out.println("\n>>> 2. Comparing with null (Null-safe check):");
        System.out.println("  t1.equals(t3) -> " + t1.equals(t3));

        System.out.println("\n==========================================================================");
    }
}