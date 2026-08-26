/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 15: Combining Independent Futures: thenCombine() Parallel Fan-In Aggregation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.CompletableFuture;

public class ThenCombineIndependentFuturesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: thenCombine() PARALLEL FAN-IN AGGREGATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. INITIATING 2 INDEPENDENT ASYNC SERVICES IN PARALLEL:");

        // Independent Service A: Fetches GST Ledger Balance (Takes 300 ms)
        CompletableFuture<Double> gstBalanceFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("  [Service A] Fetching GST Balance from Central Portal...");
            try { Thread.sleep(300); } catch (InterruptedException ignored) {}
            return 25000.0;
        });

        // Independent Service B: Fetches Income Tax TDS Balance (Takes 250 ms)
        CompletableFuture<Double> tdsBalanceFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("  [Service B] Fetching TDS Ledger from Income Tax Portal...");
            try { Thread.sleep(250); } catch (InterruptedException ignored) {}
            return 12500.0;
        });

        // 2. thenCombine(future2, BiFunction): Executes both in parallel and combines results when BOTH finish!
        CompletableFuture<String> consolidatedAuditFuture = gstBalanceFuture.thenCombine(
                tdsBalanceFuture,
                (gstVal, tdsVal) -> {
                    double totalPayable = gstVal + tdsVal;
                    return String.format("Audit Summary: GST (₹%,.2f) + TDS (₹%,.2f) = Total Tax Due: ₹%,.2f",
                            gstVal, tdsVal, totalPayable);
                }
        );

        String finalAuditReport = consolidatedAuditFuture.join();
        System.out.println("\n>>> 2. COMBINED PARALLEL RESULT:");
        System.out.println("  " + finalAuditReport);

        System.out.println("\n==========================================================================");
    }
}