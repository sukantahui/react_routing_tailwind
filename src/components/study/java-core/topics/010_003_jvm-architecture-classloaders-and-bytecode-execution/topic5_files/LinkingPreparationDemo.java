/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 5: Linking Step 2 - Preparation & Memory Allocations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class LinkingPreparationDemo {

    // Demonstrating the difference between Preparation and Initialization:
    public static class PreparationInspector {
        // Step 2 (Preparation)   : enrolledCount = 0 (Default primitive value)
        // Step 3 (Initialization): enrolledCount = 250 (Explicit code assignment)
        public static int enrolledCount = 250;

        // Step 2 (Preparation)   : isOnlineActive = false
        // Step 3 (Initialization): isOnlineActive = true
        public static boolean isOnlineActive = true;

        // Step 2 (Preparation)   : centerName = null
        // Step 3 (Initialization): centerName = "Barrackpore Campus"
        public static String centerName = "Barrackpore Campus";

        // EXCEPTION: ConstantValue attribute in Constant Pool:
        // 'static final' compile-time constants are initialized in Preparation directly!
        public static final int MAX_STUDENTS_PER_BATCH = 30;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: LINKING STEP 2 - PREPARATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> DEFAULT VALUES ASSIGNED DURING PREPARATION:");
        System.out.println("  - byte / short / int / long : 0 / 0L");
        System.out.println("  - float / double            : 0.0f / 0.0d");
        System.out.println("  - char                      : '\u0000'");
        System.out.println("  - boolean                   : false");
        System.out.println("  - Any Object Reference      : null\n");

        System.out.println(">>> COMPILE-TIME CONSTANTS (static final primitives/strings):");
        System.out.println("  - Constant: " + PreparationInspector.MAX_STUDENTS_PER_BATCH + " (Assigned in Preparation via ConstantValue!)");

        System.out.println("\n==========================================================================");
    }
}
