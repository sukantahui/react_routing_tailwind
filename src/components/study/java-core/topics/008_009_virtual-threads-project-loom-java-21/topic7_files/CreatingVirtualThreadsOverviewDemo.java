/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 7: Creating Virtual Threads: The 3 Primary Creation APIs Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CreatingVirtualThreadsOverviewDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CREATING VIRTUAL THREADS (THE 3 APIS) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 CANONICAL APIS TO CREATE VIRTUAL THREADS IN JAVA 21:");
        System.out.println();
        System.out.println("  API 1. Fluent Builder: 'Thread.ofVirtual().name("prefix-", 1).start(runnable)'");
        System.out.println("         - Custom naming, sequence numbers, and unstarted factory creation.");
        System.out.println();
        System.out.println("  API 2. Static Shorthand: 'Thread.startVirtualThread(runnable)'");
        System.out.println("         - Quick one-line anonymous virtual thread launch.");
        System.out.println();
        System.out.println("  API 3. Executor Service: 'Executors.newVirtualThreadPerTaskExecutor()'");
        System.out.println("         - Production gold standard: creates a brand-new virtual thread for EVERY submitted task!");

        System.out.println("\n==========================================================================");
    }
}