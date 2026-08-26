/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 3: Phase 2 - Linking: Verification, Preparation, Resolution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class Phase2LinkingOverviewDemo {

    // Demonstrating Preparation vs Initialization:
    public static class LinkingDemoTarget {
        // In PREPARATION: 'studentCount' is allocated in memory and set to 0.
        // In INITIALIZATION: 'studentCount' is set to 42.
        public static int studentCount = 42;

        // In PREPARATION: 'DEFAULT_ACADEMY' is set to null.
        // In INITIALIZATION: 'DEFAULT_ACADEMY' is set to 'Barrackpore'.
        public static String DEFAULT_ACADEMY = "Barrackpore";

        // Compile-time constant (static final primitive/String):
        // Stored directly in constant pool and initialized immediately!
        public static final String ACADEMY_CODE = "BKP-2026";
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: PHASE 2 - LINKING OVERVIEW - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. ACCESSING COMPILE-TIME CONSTANT (No Linking/Init of class needed!):");
        System.out.println("   - Academy Code: " + LinkingDemoTarget.ACADEMY_CODE);

        System.out.println("\n>>> THE 3 LINKING SUB-PHASES:");
        System.out.println("  1. VERIFICATION: Bytecode Verifier guarantees no stack overflow/underflow, valid branch targets.");
        System.out.println("  2. PREPARATION : Allocates memory for static variables and assigns DEFAULT values (0, false, null).");
        System.out.println("  3. RESOLUTION  : Replaces symbolic names (e.g. #12 -> 'java/lang/String') with direct memory pointers.");

        System.out.println("\n==========================================================================");
    }
}
