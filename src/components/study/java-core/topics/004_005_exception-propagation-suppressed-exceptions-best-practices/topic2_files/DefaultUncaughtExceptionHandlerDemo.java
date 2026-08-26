/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 2: The JVM Default Exception Handler & Thread.UncaughtExceptionHandler
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class DefaultUncaughtExceptionHandlerDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: JVM DEFAULT EXCEPTION HANDLER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Setting a Custom Global UncaughtExceptionHandler for the current thread:
        Thread.currentThread().setUncaughtExceptionHandler((thread, throwable) -> {
            System.out.println(">>> [GLOBAL UNCAUGHT HANDLER HOOK ACTIVATED]");
            System.out.println("  Terminating Thread : " + thread.getName() + " (ID: " + thread.getId() + ")");
            System.out.println("  Exception Class    : " + throwable.getClass().getName());
            System.out.println("  Exception Message  : " + throwable.getMessage());
            System.out.println("  [ALERT] Dispatched critical telemetry alert to Barrackpore DevOps dashboard!");
        });

        System.out.println(">>> 1. Thread UncaughtExceptionHandler is configured.");
        System.out.println(">>> 2. What happens when an exception reaches the bottom of main() unhandled?");
        System.out.println("  - The JVM invokes the thread's UncaughtExceptionHandler.");
        System.out.println("  - By default, it prints the stack trace to System.err and kills the thread.");
        System.out.println("  - If all non-daemon user threads die, the entire JVM process exits!");

        System.out.println("\n>>> 3. Triggering simulated unhandled crash:");
        throw new IllegalStateException("Simulated fatal uncaught crash in Barrackpore main thread!");
    }
}