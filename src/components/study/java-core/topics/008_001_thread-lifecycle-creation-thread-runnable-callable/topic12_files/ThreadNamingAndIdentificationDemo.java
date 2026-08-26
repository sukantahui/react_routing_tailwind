/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 12: Thread Identification: Thread.currentThread(), getName(), setName(), and getId()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadNamingAndIdentificationDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: THREAD NAMING & IDENTIFICATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Inspecting the Main Application Thread:
        Thread mainThread = Thread.currentThread();
        System.out.println(">>> 1. Main Thread Metadata:");
        System.out.println("  Name       : " + mainThread.getName());
        System.out.println("  ID         : " + mainThread.getId() + " (Deprecated in Java 19+ in favor of threadId())");
        System.out.println("  Priority   : " + mainThread.getPriority());
        System.out.println("  Thread Group: " + mainThread.getThreadGroup().getName());

        // 2. Creating Threads with Meaningful Names for Production Diagnostics:
        Thread auditThread = new Thread(() -> {
            // Self-identifying inside thread execution:
            Thread current = Thread.currentThread();
            System.out.printf("  [Audit Worker] Hello! I am running on Thread '%s' (ID: %d)%n",
                    current.getName(), current.getId());
        });

        // Setting a descriptive name BEFORE starting:
        auditThread.setName("Invoice-Audit-Worker-Barrackpore");

        System.out.println("\n>>> 2. Worker Thread Details Before Start:");
        System.out.println("  Assigned Name: " + auditThread.getName());

        auditThread.start();
        auditThread.join();

        System.out.println("\n>>> WHY DESCRIPTIVE THREAD NAMES ARE CRITICAL IN PRODUCTION:");
        System.out.println("  - When taking a production Thread Dump (via 'jstack' or VisualVM) during a CPU spike or deadlock, threads named 'Thread-0' or 'Thread-1' give ZERO clue about which subsystem is failing.");
        System.out.println("  - Threads named 'Order-Payment-Processor-1' or 'GST-Invoice-Batch-2' allow instant troubleshooting!");

        System.out.println("\n==========================================================================");
    }
}