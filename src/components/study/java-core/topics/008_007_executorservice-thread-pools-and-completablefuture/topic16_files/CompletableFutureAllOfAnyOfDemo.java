/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 16: Multi-Future Coordination: CompletableFuture.allOf() vs anyOf() (Scatter-Gather)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class CompletableFutureAllOfAnyOfDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: CompletableFuture.allOf() & anyOf() SCATTER-GATHER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. SCATTER: Launching 3 parallel audit verification workers:
        CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(150); } catch (InterruptedException ignored) {}
            return "Barrackpore Hub: OK";
        });

        CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(250); } catch (InterruptedException ignored) {}
            return "Naihati Branch: OK";
        });

        CompletableFuture<String> f3 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(100); } catch (InterruptedException ignored) {}
            return "Shyamnagar Center: OK";
        });

        // 2. allOf(): Returns a CompletableFuture<Void> that completes when ALL futures complete:
        System.out.println(">>> 1. Executing allOf() Scatter-Gather barrier...");
        CompletableFuture<Void> allBarrier = CompletableFuture.allOf(f1, f2, f3);

        // Extract results cleanly after allOf completes:
        List<String> results = allBarrier.thenApply(v ->
                Arrays.asList(f1.join(), f2.join(), f3.join())
        ).join();

        System.out.println("  All Branches Verified: " + results);

        // 3. anyOf(): Completes as soon as the FIRST (fastest) future completes:
        System.out.println("\n>>> 2. Executing anyOf() (Fastest responder wins)...");
        CompletableFuture<Object> fastestBranch = CompletableFuture.anyOf(f1, f2, f3);
        System.out.println("  Fastest Responder Result: " + fastestBranch.join());

        System.out.println("\n==========================================================================");
    }
}