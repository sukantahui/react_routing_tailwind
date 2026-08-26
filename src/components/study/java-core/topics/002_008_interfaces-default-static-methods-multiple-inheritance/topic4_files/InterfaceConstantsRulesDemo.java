/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 4: Interface Fields: Implicitly 'public static final' Constants
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class InterfaceConstantsRulesDemo {

    public interface AcademyConstants {
        // All 3 declarations below are 100% IDENTICAL in bytecode!
        String HUB_NAME = "Coder & AccoTax Barrackpore";
        public static final int PASSING_PERCENTAGE = 75;
        public final double GST_RATE = 18.0; // Compiler silently adds 'static'
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: INTERFACE CONSTANTS (public static final) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Accessed directly via Interface Name (since they are static):
        System.out.println("  Academy Hub: " + AcademyConstants.HUB_NAME);
        System.out.println("  Passing Threshold: " + AcademyConstants.PASSING_PERCENTAGE + "%");
        System.out.println("  Standard GST Rate: " + AcademyConstants.GST_RATE + "%");

        // 2. Reassignment Attempt:
        // AcademyConstants.PASSING_PERCENTAGE = 80; // COMPILE ERROR: cannot assign a value to final variable!

        System.out.println("\n>>> Interface Field Invariants:");
        System.out.println("  - 'public': Accessible anywhere.");
        System.out.println("  - 'static': Belongs to Interface, loaded once.");
        System.out.println("  - 'final' : Immutable constant value.");

        System.out.println("\n==========================================================================");
    }
}