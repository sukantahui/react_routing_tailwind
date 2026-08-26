/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 7: The 'finally' Block: Guaranteed Resource Cleanup & Teardown Invariant
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class FinallyBlockGuaranteedCleanupDemo {

    public static void executeDatabaseTransaction(boolean triggerError) {
        System.out.println("  [STEP 1] Acquiring Barrackpore database connection lock...");

        try {
            System.out.println("  [STEP 2] Executing student fee transaction...");
            if (triggerError) {
                throw new RuntimeException("Network link to Naihati bank server dropped!");
            }
            System.out.println("  [STEP 3] Transaction committed successfully.");
        } catch (RuntimeException e) {
            System.out.println("  [STEP 4] Catch block: Logged failure (" + e.getMessage() + ")");
        } finally {
            // THE GUARANTEED INVARIANT: Always executes regardless of success or failure!
            System.out.println("  [FINALLY CLEANUP] Connection lock released. File handles flushed.");
        }

        System.out.println("  [STEP 5] Transaction method finished.\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: THE 'finally' BLOCK GUARANTEE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> RUN 1: SUCCESSFUL EXECUTION (Finally executes after try):");
        executeDatabaseTransaction(false);

        System.out.println(">>> RUN 2: FAILED EXECUTION (Finally executes after catch):");
        executeDatabaseTransaction(true);

        System.out.println("==========================================================================");
    }
}