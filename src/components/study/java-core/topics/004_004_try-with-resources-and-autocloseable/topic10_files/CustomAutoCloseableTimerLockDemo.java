/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 10: Implementing Custom AutoCloseable Resources (TimerLock, DatabaseConnectionPool)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

// 1. Custom High-Precision Benchmark Timer using AutoCloseable:
class BenchmarkScopeTimer implements AutoCloseable {
    private final String taskName;
    private final long startNanos;

    public BenchmarkScopeTimer(String task) {
        this.taskName = task;
        this.startNanos = System.nanoTime();
        System.out.printf("  [TIMER STARTED] '%s'...%n", taskName);
    }

    @Override
    public void close() {
        long elapsedNanos = System.nanoTime() - startNanos;
        double elapsedMillis = elapsedNanos / 1_000_000.0;
        System.out.printf("  [TIMER FINISHED] '%s' completed in: %.3f ms%n", taskName, elapsedMillis);
    }
}

public class CustomAutoCloseableTimerLockDemo {

    public static void performHeavyArrayComputation() {
        // Scoped Benchmark Timer using Try-with-Resources:
        try (BenchmarkScopeTimer timer = new BenchmarkScopeTimer("Barrackpore Trainee Payroll Calculation")) {
            double sum = 0;
            for (int i = 0; i < 500_000; i++) {
                sum += Math.sqrt(i);
            }
            System.out.println("    Computation Result: " + (long) sum);
            // 'timer.close()' is automatically invoked here, printing elapsed execution duration!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: CUSTOM AutoCloseable SCOPE PATTERNS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Executing Benchmark Scope Timer via Try-with-Resources:");
        performHeavyArrayComputation();

        System.out.println("\n>>> ELEGANT PATTERN USE CASES FOR AutoCloseable:");
        System.out.println("  1. Scoped Benchmark Timers (automatic execution duration logging).");
        System.out.println("  2. Distributed Lock Releasers (automatic lock unlock upon exit).");
        System.out.println("  3. Security Context Switches (reverting to system user after admin task).");

        System.out.println("\n==========================================================================");
    }
}