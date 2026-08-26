/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 13: Shallow Copy vs Deep Copy Mechanics in Memory
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class ShallowVsDeepCopyMemoryDemo {

    // Nested Mutable Reference
    public static class LabLocation {
        public String city;
        public LabLocation(String city) { this.city = city; }
    }

    // 1. SHALLOW COPY: Default super.clone() copies primitive values and REFERENCE addresses only!
    public static class ShallowTrainee implements Cloneable {
        public String name;
        public LabLocation location; // Shared reference address!

        public ShallowTrainee(String name, LabLocation loc) {
            this.name = name;
            this.location = loc;
        }

        @Override
        public ShallowTrainee clone() {
            try {
                return (ShallowTrainee) super.clone(); // Shallow bitwise copy
            } catch (CloneNotSupportedException e) {
                throw new AssertionError();
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: SHALLOW COPY VS DEEP COPY IN MEMORY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LabLocation sharedLoc = new LabLocation("Barrackpore Hub");
        ShallowTrainee original = new ShallowTrainee("Swadeep Paul", sharedLoc);
        ShallowTrainee cloned = original.clone();

        System.out.println(">>> Initial State:");
        System.out.println("  Original City: " + original.location.city);
        System.out.println("  Cloned City  : " + cloned.location.city);

        // Mutating nested location via the CLONED instance:
        System.out.println("\n>>> Mutating cloned.location.city = 'Naihati Hub'...");
        cloned.location.city = "Naihati Hub";

        System.out.println("\n>>> Observe the Shallow Copy Side-Effect:");
        System.out.println("  Original City: " + original.location.city + " (ACCIDENTALLY MUTATED!)");
        System.out.println("  Cloned City  : " + cloned.location.city);
        System.out.println("  original.location == cloned.location: " + (original.location == cloned.location) + " (Same Heap Address!)");

        System.out.println("\n==========================================================================");
    }
}