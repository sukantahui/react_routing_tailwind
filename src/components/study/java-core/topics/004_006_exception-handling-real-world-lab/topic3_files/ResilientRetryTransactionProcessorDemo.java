/**
 * Java Core Tutorial - Module 004_006: Exception Handling Real-World Lab
 * Topic 3: Building a Resilient Transaction Processor with Automatic Retry on Transient Failures
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.IOException;

public class ResilientRetryTransactionProcessorDemo {

    // Transient failure exception (Eligible for retry):
    public static class TransientNetworkException extends IOException {
        public TransientNetworkException(String message) { super(message); }
    }

    // Permanent failure exception (NOT eligible for retry):
    public static class NonRecoverableValidationException extends RuntimeException {
        public NonRecoverableValidationException(String message) { super(message); }
    }

    // Enterprise Resilient Execution Engine with Exponential Backoff Retry:
    public static void executeWithAutomaticRetry(int maxAttempts, long initialBackoffMs, Runnable task) throws Exception {
        int attempt = 0;
        long currentBackoff = initialBackoffMs;

        while (true) {
            attempt++;
            try {
                System.out.printf("  [ATTEMPT %d/%d] Executing transaction...%n", attempt, maxAttempts);
                task.run();
                System.out.println("  [SUCCESS] Transaction committed on attempt #" + attempt);
                return;
            } catch (Exception ex) {
                // If it's a permanent error, fast-fail immediately without wasting retries!
                if (ex instanceof NonRecoverableValidationException) {
                    System.out.println("  [FATAL FAST-FAIL] Non-recoverable validation failure! Retries aborted.");
                    throw ex;
                }

                if (attempt >= maxAttempts) {
                    System.out.printf("  [RETRY EXHAUSTED] Failed after %d attempts! Escalating failure.%n", maxAttempts);
                    throw new IllegalStateException("Operation failed after " + maxAttempts + " attempts", ex);
                }

                System.out.printf("  [TRANSIENT FAILURE] %s. Retrying in %d ms...%n", ex.getMessage(), currentBackoff);
                Thread.sleep(currentBackoff);
                currentBackoff *= 2; // Exponential backoff
            }
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: RESILIENT AUTOMATIC RETRY ENGINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Simulating Transient Database Glitch (Recovers on Attempt 3):");
        int[] attemptsCounter = { 0 };

        executeWithAutomaticRetry(4, 50, () -> {
            attemptsCounter[0]++;
            if (attemptsCounter[0] < 3) {
                throw new RuntimeException("Transient lock timeout at Barrackpore data cluster!");
            }
            System.out.println("    -> Core billing calculation finished successfully.");
        });

        System.out.println("\n==========================================================================");
    }
}