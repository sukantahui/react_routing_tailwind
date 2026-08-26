/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 13: Transforming Results: thenApply (map), thenAccept (consume) & thenRun (action)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.CompletableFuture;

public class TransformingAsyncResultsPipelineDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: thenApply vs thenAccept vs thenRun - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 CALLBACK TRANSFORMERS OF CompletableFuture:");
        System.out.println("+----+-------------------------------+-------------------------------+-----------------------------------+");
        System.out.println("| #  | Method Signature              | Functional Parameter Type     | Returns (CompletableFuture Type)  |");
        System.out.println("+----+-------------------------------+-------------------------------+-----------------------------------+");
        System.out.println("| 1. | thenApply(Function<T, R>)     | T -> R (Transforms Value)     | CompletableFuture<R>              |");
        System.out.println("| 2. | thenAccept(Consumer<T>)       | T -> void (Consumes Value)    | CompletableFuture<Void>           |");
        System.out.println("| 3. | thenRun(Runnable)             | () -> void (Action only)      | CompletableFuture<Void>           |");
        System.out.println("+----+-------------------------------+-------------------------------+-----------------------------------+");
        System.out.println();

        // Reactive pipeline demonstration:
        CompletableFuture.supplyAsync(() -> 50000.0) // Step 1: Base Amount ₹50,000
                .thenApply(base -> base * 0.18)      // Step 2: thenApply -> Calculate 18% GST (Returns 9000.0)
                .thenApply(gst -> "Total Tax: ₹" + gst) // Step 3: thenApply -> Format String
                .thenAccept(System.out::println)     // Step 4: thenAccept -> Print to Console (Consumer)
                .thenRun(() -> System.out.println(">>> Pipeline finished successfully!")) // Step 5: thenRun -> Final action
                .join();

        System.out.println("\n==========================================================================");
    }
}