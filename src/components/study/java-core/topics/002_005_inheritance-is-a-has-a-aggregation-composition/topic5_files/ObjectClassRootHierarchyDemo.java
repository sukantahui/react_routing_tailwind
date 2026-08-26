/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 5: The Ultimate Root of Java Class Hierarchy: java.lang.Object
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class ObjectClassRootHierarchyDemo {

    // Implicitly extends java.lang.Object
    public static class TraineeRecord {
        private String name;
        private int roll;

        public TraineeRecord(String name, int roll) {
            this.name = name;
            this.roll = roll;
        }

        @Override
        public String toString() {
            return String.format("TraineeRecord[Name='%s', Roll=%d]", name, roll);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: java.lang.Object AS ULTIMATE ROOT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeRecord swadeep = new TraineeRecord("Swadeep Paul", 101);

        System.out.println(">>> 1. Verifying that TraineeRecord is an instance of Object:");
        System.out.println("  swadeep instanceof Object? " + (swadeep instanceof Object));

        System.out.println("\n>>> 2. Calling inherited Object methods:");
        System.out.println("  Class: " + swadeep.getClass().getName());
        System.out.println("  HashCode: " + Integer.toHexString(swadeep.hashCode()));
        System.out.println("  Custom toString(): " + swadeep.toString());

        System.out.println("\n==========================================================================");
    }
}