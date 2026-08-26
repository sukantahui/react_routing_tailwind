/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 12: The 'clone()' Method and the java.lang.Cloneable Marker Interface
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

public class CloneableFoundationsDemo {

    // MUST implement Cloneable marker interface, or super.clone() throws CloneNotSupportedException!
    public static class LabTerminal implements Cloneable {
        private String terminalId;
        private int ramGb;

        public LabTerminal(String id, int ram) {
            this.terminalId = id;
            this.ramGb = ram;
        }

        // Overriding clone() and widening access to 'public':
        @Override
        public LabTerminal clone() {
            try {
                // Invokes native bytecode field-by-field memory copier:
                return (LabTerminal) super.clone();
            } catch (CloneNotSupportedException e) {
                throw new AssertionError("Cloneable contract broken!"); // Unreachable if implements Cloneable
            }
        }

        public void printInfo() {
            System.out.printf("  [TERMINAL] ID: %s | RAM: %d GB\n", terminalId, ramGb);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: THE clone() METHOD & Cloneable INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        LabTerminal original = new LabTerminal("BKP-NODE-01", 32);
        LabTerminal cloned = original.clone();

        System.out.println(">>> 1. Original Instance:");
        original.printInfo();

        System.out.println("\n>>> 2. Cloned Instance (Separate object in Heap with identical fields):");
        cloned.printInfo();

        System.out.println("\n>>> Verifying separate Heap identity:");
        System.out.println("  original == cloned: " + (original == cloned) + " (Distinct Heap memory objects!)");

        System.out.println("\n==========================================================================");
    }
}