/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 0: java.lang.Object as the Cosmic Root Superclass
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class ObjectCosmicRootDemo {

    // Implicitly extends java.lang.Object:
    public static class TraineeProfile {
        private String name;
        public TraineeProfile(String name) { this.name = name; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: java.lang.Object AS THE COSMIC ROOT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeProfile swadeep = new TraineeProfile("Swadeep Paul");

        // 1. Any object reference can be assigned to an 'Object' type:
        Object cosmicRef = swadeep;

        System.out.println(">>> 1. Object Type Polymorphism:");
        System.out.println("  cosmicRef instanceof Object        : " + (cosmicRef instanceof Object));
        System.out.println("  cosmicRef instanceof TraineeProfile: " + (cosmicRef instanceof TraineeProfile));

        System.out.println("\n>>> 2. Calling universal Object methods:");
        System.out.println("  Runtime Class: " + cosmicRef.getClass().getName());
        System.out.println("  Hash Code    : " + Integer.toHexString(cosmicRef.hashCode()));
        System.out.println("  toString()   : " + cosmicRef.toString());

        System.out.println("\n==========================================================================");
    }
}