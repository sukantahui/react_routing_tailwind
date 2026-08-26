/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 10: Managing Future<T>: Blocking get(), get(timeout), isDone() & cancel()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ManagingFutureLifecycleDemo {

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: MANAGING Future<T> ASYNCHRONOUS HANDLES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ExecutorService executor = Executors.newFixedThreadPool(2);

        Callable<Double> taxCalculator = () -> {
            Thread.sleep(400); // Simulate calculation
            return 45000.0 * 0.18; // 18% GST
        };

        System.out.println(">>> 1. Submitting Callable task to get a Future<Double> handle:");
        Future<Double> futureResult = executor.submit(taxCalculator);

        System.out.println("  Initial check: futureResult.isDone()? " + futureResult.isDone());

        // 2. Bounded get(timeout) to prevent indefinite hanging:
        try {
            Double gstAmount = futureResult.get(1, TimeUnit.SECONDS); // Waits up to 1 second
            System.out.printf("\n>>> 2. Future get(timeout) SUCCESS: ₹%,.2f%n", gstAmount);
        } catch (TimeoutException te) {
            System.err.println("  SLA Timed out! Cancelling task...");
            futureResult.cancel(true); // Cancels task with interrupt
        }

        System.out.println("  After completion check: futureResult.isDone()? " + futureResult.isDone());

        executor.shutdown();

        System.out.println("\n>>> THE 5 CORE METHODS OF java.util.concurrent.Future<V>:");
        System.out.println("  - V get()                    : Blocks indefinitely until task completes (returns result or throws ExecutionException).");
        System.out.println("  - V get(timeout, unit)       : Blocks up to timeout; throws TimeoutException if SLA exceeded.");
        System.out.println("  - boolean isDone()           : Returns true if task finished normally, threw exception, or was cancelled.");
        System.out.println("  - boolean cancel(mayInterrupt): Attempts cancellation; sends interrupt if mayInterrupt=true.");
        System.out.println("  - boolean isCancelled()      : Returns true if task was cancelled before normal completion.");

        System.out.println("\n==========================================================================");
    }
}