/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 16: Multithreading Fundamentals & Lifecycle Capstone Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

public class MultithreadingFundamentalsCapstoneDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: MULTITHREADING FUNDAMENTALS CAPSTONE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        String[] branchOffices = {"Barrackpore", "Naihati", "Shyamnagar", "Ichapur"};
        List<FutureTask<String>> taskList = new ArrayList<>();

        System.out.println(">>> 1. Spawning Concurrent Audit Workers across Hubs:");
        for (String branch : branchOffices) {
            Callable<String> auditWork = () -> {
                String threadName = Thread.currentThread().getName();
                Thread.sleep(300); // Simulate audit task
                return String.format("[Branch: %-12s | Thread: %-25s | Status: 100%% VERIFIED]", branch, threadName);
            };

            FutureTask<String> futureTask = new FutureTask<>(auditWork);
            taskList.add(futureTask);

            // Starting thread with descriptive name:
            Thread worker = new Thread(futureTask, "Auditor-" + branch + "-Worker");
            worker.start();
        }

        System.out.println("\n>>> 2. Aggregating Parallel Results via FutureTask.get():");
        for (FutureTask<String> task : taskList) {
            System.out.println("  " + task.get());
        }

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 008_001 THREAD FUNDAMENTALS & LIFECYCLE 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}