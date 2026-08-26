/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 10: Executors.newVirtualThreadPerTaskExecutor(): The Production Gold Standard
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class VirtualThreadPerTaskExecutorDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: newVirtualThreadPerTaskExecutor() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // PRODUCTION GOLD STANDARD: Automatic Virtual Thread per Task with try-with-resources auto-close!
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {

            Future<String> task1 = executor.submit(() -> {
                Thread.sleep(100);
                return "GST Filing #901 Completed";
            });

            Future<String> task2 = executor.submit(() -> {
                Thread.sleep(150);
                return "Income Tax Return #402 Processed";
            });

            System.out.println(">>> 1. Submitted 2 tasks to newVirtualThreadPerTaskExecutor.");
            System.out.println(">>> 2. Result 1: " + task1.get());
            System.out.println(">>> 3. Result 2: " + task2.get());

            // When exiting the try block, ExecutorService.close() AUTOMATICALLY waits for all tasks to finish!
        }

        System.out.println("\n>>> Auto-closed executor cleanly after all tasks finished!");

        System.out.println("\n==========================================================================");
    }
}