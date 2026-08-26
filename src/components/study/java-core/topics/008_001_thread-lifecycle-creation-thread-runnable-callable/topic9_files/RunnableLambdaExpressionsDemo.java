/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 9: Thread Creation Method 3: Concise Java 8 Lambda Expressions with Runnable
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class RunnableLambdaExpressionsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: CREATION METHOD 3: LAMBDA EXPRESSIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. INLINE LAMBDA EXPRESSION WITH java.lang.Runnable:
        Thread printThread = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.printf("[%s] Printing Barrackpore Certificate #%d...%n",
                        Thread.currentThread().getName(), i);
            }
        }, "Cert-Printer");

        // 2. CONCISE SINGLE-LINE LAMBDA:
        Thread alertThread = new Thread(
                () -> System.out.println("[" + Thread.currentThread().getName() + "] 🔔 SMS Alert Dispatched to Swadeep!"),
                "SMS-Dispatcher"
        );

        printThread.start();
        alertThread.start();

        printThread.join();
        alertThread.join();

        System.out.println("\n>>> WHY Runnable IS A FUNCTIONAL INTERFACE (@FunctionalInterface):");
        System.out.println("  - Package : 'java.lang.Runnable'.");
        System.out.println("  - Method  : Defines exactly ONE abstract method: 'public abstract void run()'.");
        System.out.println("  - Benefit : Enables zero-boilerplate inline lambda syntax '() -> { ... }' or method references!");

        System.out.println("\n==========================================================================");
    }
}