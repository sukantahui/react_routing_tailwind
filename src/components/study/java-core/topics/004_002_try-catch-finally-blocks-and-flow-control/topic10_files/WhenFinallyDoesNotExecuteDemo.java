/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 10: When Does 'finally' NOT Execute? System.exit(), Fatal VM Crashes & Power Loss
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class WhenFinallyDoesNotExecuteDemo {

    public static void demonstrateSystemExit(boolean terminateVm) {
        System.out.println("  1. Entering TRY block...");

        try {
            if (terminateVm) {
                System.out.println("  2. Invoking 'System.exit(0)' (Instructing OS to kill JVM process)...");
                // System.exit(0); // If uncommented, JVM halts immediately and FINALLY NEVER RUNS!
            } else {
                System.out.println("  2. Standard execution without JVM termination.");
            }
        } finally {
            System.out.println("  3. [FINALLY] Cleanup routine executed.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: WHEN 'finally' DOES NOT EXECUTE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 RARE SCENARIOS WHERE 'finally' WILL NEVER RUN:");
        System.out.println("  1. System.exit(status) or Runtime.getRuntime().halt() is called.");
        System.out.println("  2. Fatal JVM native crash (e.g. fatal segmentation fault in JNI C++ code).");
        System.out.println("  3. Physical server hardware power loss or SIGKILL (kill -9) from OS.");
        System.out.println("  4. An infinite loop / deadlock inside the try/catch block itself.");

        System.out.println("\n>>> Standard Execution Simulation:");
        demonstrateSystemExit(false);

        System.out.println("==========================================================================");
    }
}