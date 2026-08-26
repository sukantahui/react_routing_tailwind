/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 17: Asynchronous Exception Resilience: exceptionally(), handle() & whenComplete() (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.CompletableFuture;

public class AsyncExceptionResiliencePipelineCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: ASYNC EXCEPTION HANDLING & RESILIENCE (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. ASYNC STAGE WITH AN INTENTIONAL NETWORK ERROR:
        CompletableFuture<String> failingApiFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("  [Step 1] Contacting Primary Gateway...");
            if (true) throw new RuntimeException("503 Gateway Unavailable: Barrackpore Central Server");
            return "Primary Payload";
        });

        // 2. exceptionally(fn): Catches exceptions and returns a safe fallback default:
        CompletableFuture<String> resilientFallback = failingApiFuture.exceptionally(ex -> {
            System.err.println("  [exceptionally Handler] Caught error: " + ex.getMessage());
            return "FALLBACK-BACKUP-PAYLOAD-₹0.00"; // Safe graceful fallback!
        });

        System.out.println(">>> 1. Result after exceptionally() fallback: " + resilientFallback.join());

        // 3. handle(BiFunction<Result, Throwable, R>): Inspects BOTH success and error in ONE step:
        CompletableFuture<String> universalHandler = CompletableFuture.supplyAsync(() -> 100 / 2)
                .handle((result, error) -> {
                    if (error != null) {
                        return "Calculation Failed: " + error.getMessage();
                    } else {
                        return "Calculation Succeeded: Result = ₹" + result;
                    }
                });

        System.out.println(">>> 2. Result from universal handle(): " + universalHandler.join());

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 008_007 EXECUTORS & COMPLETABLEFUTURE 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}