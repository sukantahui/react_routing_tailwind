/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 8: Comprehensive Flow of Control in try-catch-finally Under All Execution Scenarios
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class TryCatchFinallyAllBranchesDemo {

    public static void testBranch(int scenario) {
        System.out.println("  [BRANCH START] Testing Scenario #" + scenario);

        try {
            System.out.println("    1. Inside TRY");
            if (scenario == 2) throw new NumberFormatException("Format Error");
            if (scenario == 3) throw new NullPointerException("Unhandled NPE Error");
            System.out.println("    2. End of TRY (No Exception)");
        } catch (NumberFormatException e) {
            System.out.println("    3. Inside CATCH (Handled NumberFormatException)");
        } finally {
            System.out.println("    4. Inside FINALLY (Always Runs)");
        }

        System.out.println("    5. After try-catch-finally (Normal Code)\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: try-catch-finally EXECUTION BRANCHES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Scenario 1: NO Exception Thrown:");
        System.out.println("  Expected: 1 -> 2 -> 4 -> 5");
        testBranch(1);

        System.out.println(">>> 2. Scenario 2: HANDLED Exception Thrown:");
        System.out.println("  Expected: 1 -> (Aborts 2) -> 3 -> 4 -> 5");
        testBranch(2);

        System.out.println(">>> 3. Scenario 3: UNHANDLED Exception Thrown (NPE):");
        System.out.println("  Expected: 1 -> (Aborts 2) -> (Catch skipped) -> 4 -> (Abrupt termination, 5 never runs)");
        try {
            testBranch(3);
        } catch (NullPointerException e) {
            System.out.println("  [OUTER RECOVERY] Caught unhandled NPE in caller.");
        }

        System.out.println("\n==========================================================================");
    }
}