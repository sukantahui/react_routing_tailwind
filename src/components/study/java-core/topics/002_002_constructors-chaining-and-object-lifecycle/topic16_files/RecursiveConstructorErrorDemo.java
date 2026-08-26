/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 16: Recursive Constructor Invocation Compilation Error
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class RecursiveConstructorErrorDemo {

    // Valid Non-Circular Chaining Example
    public static class CleanChainingModel {
        private int id;
        private String name;

        public CleanChainingModel() {
            this(101); // 0-arg calls 1-arg
        }

        public CleanChainingModel(int id) {
            this(id, "Standard Trainee"); // 1-arg calls 2-arg
        }

        public CleanChainingModel(int id, String name) {
            // Master constructor: TERMINATES CHAIN! (No this() call)
            this.id = id;
            this.name = name;
            System.out.printf("  [CLEAN CHAIN TERMINATED] ID: %d, Name: %s\n", this.id, this.name);
        }
    }

    // ========================================================================
    // THE RECURSIVE CONSTRUCTOR ERROR TRAP:
    // ========================================================================
    // If you write circular this() calls:
    // class CircularModel {
    //     CircularModel() { this(10); } // Constructor A calls B
    //     CircularModel(int x) { this(); } // Constructor B calls A!
    // }
    //
    // The Java compiler detects the cycle and refuses to compile:
    // "ERROR: recursive constructor invocation"
    // ========================================================================

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: RECURSIVE CONSTRUCTOR INVOCATION ANALYSIS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating Clean Terminating Constructor Chain:");
        CleanChainingModel model = new CleanChainingModel();

        System.out.println("\n>>> 2. Architectural Analysis of Recursive Constructor Error:");
        System.out.println("  - Why does javac check for cycles? Because unlike methods with base cases,");
        System.out.println("    constructor chaining via this() on line 1 is UNCONDITIONALLY recursive.");
        System.out.println("  - Allowing circular this() would freeze the JVM or trigger StackOverflowError.");
        System.out.println("  - Therefore, Java catches and rejects circular this() at COMPILE TIME!");

        System.out.println("\n==========================================================================");
    }
}