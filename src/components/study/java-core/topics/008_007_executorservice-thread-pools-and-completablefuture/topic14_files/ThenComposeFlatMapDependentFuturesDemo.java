/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 14: Composing Dependent Futures: thenCompose() (The Async flatMap Operator)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.CompletableFuture;

public class ThenComposeFlatMapDependentFuturesDemo {

    // Async Step 1: Fetch student ID by name:
    public static CompletableFuture<Integer> fetchStudentId(String studentName) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.printf("  [Step 1] Looked up studentId for '%s' -> 101%n", studentName);
            return 101;
        });
    }

    // Async Step 2: Fetch account balance by student ID (Depends on Step 1 output!):
    public static CompletableFuture<Double> fetchStudentBalance(int studentId) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.printf("  [Step 2] Looked up tuition balance for Acct #%d -> ₹45,000%n", studentId);
            return 45000.0;
        });
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: thenCompose() (ASYNC FLATMAP) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY thenCompose() IS ESSENTIAL FOR DEPENDENT ASYNC CALLS:");
        System.out.println("  - If you use 'thenApply(id -> fetchStudentBalance(id))', it returns a NESTED FUTURE:");
        System.out.println("    'CompletableFuture<CompletableFuture<Double>>' (Ugly double future nesting!)");
        System.out.println("  - 'thenCompose()' FLATTENS the nested future into a clean 'CompletableFuture<Double>' (flatMap)!");

        // Dependent Composition via thenCompose:
        CompletableFuture<Double> resultFuture = fetchStudentId("Swadeep Paul")
                .thenCompose(id -> fetchStudentBalance(id)); // FLATTENED!

        Double balance = resultFuture.join();
        System.out.printf("\n>>> Final Retrieved Account Balance: ₹%,.2f%n", balance);

        System.out.println("\n==========================================================================");
    }
}