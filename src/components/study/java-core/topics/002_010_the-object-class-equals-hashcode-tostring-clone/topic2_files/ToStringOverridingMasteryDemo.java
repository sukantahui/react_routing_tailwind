/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 2: The 'toString()' Method: Default Memory Address vs Custom Formatted Representation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class ToStringOverridingMasteryDemo {

    // 1. Without overriding toString() (Uses Object default)
    public static class RawTrainee {
        private String name = "Swadeep Paul";
        private int roll = 101;
    }

    // 2. With clean @Override toString()
    public static class FormattedTrainee {
        private String name;
        private int roll;
        private String hubLocation;

        public FormattedTrainee(String name, int roll, String hub) {
            this.name = name;
            this.roll = roll;
            this.hubLocation = hub;
        }

        @Override
        public String toString() {
            return String.format("Trainee[Roll=%d, Name='%s', Hub='%s']", roll, name, hubLocation);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE toString() METHOD MASTERY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        RawTrainee raw = new RawTrainee();
        FormattedTrainee formatted = new FormattedTrainee("Swadeep Paul", 101, "Barrackpore Central Hub");

        System.out.println(">>> 1. Default Object.toString() output (ClassName@HexHashCode):");
        System.out.println("  " + raw); // Automatically invokes raw.toString()!

        System.out.println("\n>>> 2. Overridden Formatted toString() output:");
        System.out.println("  " + formatted); // Automatically invokes formatted.toString()!

        System.out.println("\n==========================================================================");
    }
}