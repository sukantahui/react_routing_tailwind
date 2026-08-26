/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 2: The Executor Interface Hierarchy: Executor, ExecutorService & ScheduledExecutorService
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ExecutorInterfaceHierarchyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: EXECUTOR INTERFACE HIERARCHY - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 CORE INTERFACES OF THE CONCURRENCY EXECUTOR HIERARCHY:");
        System.out.println();
        System.out.println("  1. java.util.concurrent.Executor (Base Interface):");
        System.out.println("     - Single method: 'void execute(Runnable command)'");
        System.out.println("     - Bare-minimum contract: accept a task and run it.");
        System.out.println();
        System.out.println("  2. java.util.concurrent.ExecutorService (Enterprise Engine):");
        System.out.println("     - Extends 'Executor'.");
        System.out.println("     - Adds task submission with return values: '<T> Future<T> submit(Callable<T> task)'");
        System.out.println("     - Adds bulk task execution: 'invokeAll()', 'invokeAny()'");
        System.out.println("     - Adds lifecycle management: 'shutdown()', 'shutdownNow()', 'awaitTermination()'");
        System.out.println();
        System.out.println("  3. java.util.concurrent.ScheduledExecutorService (Timer & Cron Engine):");
        System.out.println("     - Extends 'ExecutorService'.");
        System.out.println("     - Adds delayed execution: 'schedule(task, delay, unit)'");
        System.out.println("     - Adds periodic execution: 'scheduleAtFixedRate()', 'scheduleWithFixedDelay()'");

        System.out.println("\n==========================================================================");
    }
}