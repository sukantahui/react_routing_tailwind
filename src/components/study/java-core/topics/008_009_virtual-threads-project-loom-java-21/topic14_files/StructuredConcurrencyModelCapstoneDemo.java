/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 14: Structured Concurrency (JEP 453): Eliminating Thread Leaks & Orphaned Tasks (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class StructuredConcurrencyModelCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: STRUCTURED CONCURRENCY (JEP 453) CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE PROBLEM OF UNSTRUCTURED CONCURRENCY IN LEGACY JAVA:");
        System.out.println("  - If Task A forks Thread 1 (fetchUser) and Thread 2 (fetchOrders):");
        System.out.println("    * If fetchUser throws an exception, Thread 2 KEEPS RUNNING IN THE BACKGROUND as an orphaned zombie thread, wasting CPU and database bandwidth!");
        System.out.println("    * Thread lifecycles are disconnected from the lexical block that spawned them.");
        System.out.println();
        System.out.println(">>> THE STRUCTURED CONCURRENCY REVOLUTION (StructuredTaskScope):");
        System.out.println("  - Treats concurrent subtasks as a SINGLE COHESIVE UNIT of work.");
        System.out.println("  - If one subtask fails, ALL SIBLING SUBTASKS ARE AUTOMATICALLY CANCELLED!");
        System.out.println("  - The parent block CANNOT exit until all child subtasks have finished or been cancelled.");
        System.out.println();
        System.out.println(">>> CANONICAL CODE PATTERN (Java 21+ Preview):");
        System.out.println("  try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {");
        System.out.println("      Subtask<User> userTask = scope.fork(() -> fetchUser());");
        System.out.println("      Subtask<Order> orderTask = scope.fork(() -> fetchOrder());");
        System.out.println("      scope.join();            // Join both subtasks");
        System.out.println("      scope.throwIfFailed();   // Propagate errors");
        System.out.println("      return new Dashboard(userTask.get(), orderTask.get());");
        System.out.println("  }");

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 SEGMENT 8: MULTITHREADING & CONCURRENCY 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}