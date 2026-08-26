/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 3: What are Virtual Threads? JVM-Managed M:N User-Mode Fibers & Tiny Dynamic Stacks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class WhatAreVirtualThreadsDeepDiveDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: WHAT ARE VIRTUAL THREADS (JAVA 21+ LTS) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Spawning a lightweight Virtual Thread (Java 21+ syntax):
        Thread vThread = Thread.ofVirtual().name("Barrackpore-Virtual-Worker").start(() -> {
            System.out.printf("  [Virtual Thread] Running on thread: %s | Is Virtual? %b%n",
                    Thread.currentThread().getName(), Thread.currentThread().isVirtual());
        });

        vThread.join();

        System.out.println("\n>>> THE 4 PILLARS OF VIRTUAL THREADS IN JAVA 21:");
        System.out.println("  1. Managed by the JVM (User-Mode) : NOT 1:1 bound to OS kernel threads; scheduled entirely by the JVM in user space.");
        System.out.println("  2. M:N Scheduling Architecture    : Millions of Virtual Threads (M) are multiplexed onto a few OS Carrier Threads (N = CPU cores).");
        System.out.println("  3. Tiny Dynamic Heap Stacks       : Stacks start at just a few hundred bytes on the Java Heap and grow/shrink dynamically (vs static 1 MB).");
        System.out.println("  4. Near-Zero Creation Cost        : Creating a Virtual Thread is as cheap as allocating a plain Java object (new Object())!");

        System.out.println("\n==========================================================================");
    }
}