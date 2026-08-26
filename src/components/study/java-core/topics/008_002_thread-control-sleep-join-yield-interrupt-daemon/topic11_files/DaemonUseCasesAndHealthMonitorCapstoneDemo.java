/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 11: Enterprise Use Cases for Daemon Threads: Health Monitors & GC (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class DaemonUseCasesAndHealthMonitorCapstoneDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: DAEMON THREAD USE CASES & HEALTH MONITOR (CAPSTONE)");
        System.out.println("==========================================================================\n");

        // 1. DAEMON USE CASE 1: Background JVM Memory & CPU Health Checker:
        Thread jvmHealthMonitor = new Thread(() -> {
            while (true) {
                long freeMemMb = Runtime.getRuntime().freeMemory() / (1024 * 1024);
                long totalMemMb = Runtime.getRuntime().totalMemory() / (1024 * 1024);
                System.out.printf("  [Health Daemon] Free Heap: %d MB / Total: %d MB%n", freeMemMb, totalMemMb);
                try {
                    Thread.sleep(300);
                } catch (InterruptedException ignored) {
                    break;
                }
            }
        }, "JVM-Health-Monitor-Daemon");

        jvmHealthMonitor.setDaemon(true); // Marks as background daemon!
        jvmHealthMonitor.start();

        // 2. USER THREAD: Core Business Transaction (Processing student certificates):
        System.out.println(">>> 2. Main User Thread performing business tasks for 1 second...");
        for (int i = 1; i <= 3; i++) {
            System.out.printf("  [Business Worker] Generating Barrackpore Certificate #%d...%n", i);
            Thread.sleep(350);
        }

        System.out.println("\n>>> 3. All User business tasks complete! Main thread terminates now.");
        System.out.println("  The JVM will automatically kill the Health Daemon and exit cleanly!");

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 008_002 THREAD CONTROL & DAEMON THREADS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}