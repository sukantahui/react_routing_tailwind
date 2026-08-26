/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 8: The Thread.ofVirtual() Fluent Builder: Naming & ThreadFactory Generation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

import java.util.concurrent.ThreadFactory;

public class ThreadOfVirtualFluentBuilderDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: Thread.ofVirtual() FLUENT BUILDER API - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Fluent Builder starting immediately:
        Thread v1 = Thread.ofVirtual()
                .name("GstAuditWorker-", 1) // Auto-increments: GstAuditWorker-1, GstAuditWorker-2...
                .start(() -> {
                    System.out.println(">>> 1. Running named virtual thread: " + Thread.currentThread().getName());
                });

        v1.join();

        // 2. Creating a reusable ThreadFactory of Virtual Threads:
        ThreadFactory vFactory = Thread.ofVirtual()
                .name("StudentInvoiceWorker-", 100)
                .factory();

        Thread t100 = vFactory.newThread(() -> {
            System.out.println(">>> 2. Spawned from Virtual ThreadFactory: " + Thread.currentThread().getName());
        });
        t100.start();
        t100.join();

        System.out.println("\n==========================================================================");
    }
}