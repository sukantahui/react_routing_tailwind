/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 11: Starting a Thread: Why Calling start() is Mandatory (start() vs run())
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class StartVsRunDirectInvocationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: thread.start() vs calling thread.run() DIRECTLY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runnable demoTask = () -> {
            System.out.printf("  [Task Executing] Running on Thread: '%s' (ID: %d)%n",
                    Thread.currentThread().getName(), Thread.currentThread().getId());
        };

        Thread customThread = new Thread(demoTask, "Worker-Async-1");

        // 1. MISTAKE: Calling run() directly (Synchronous execution on MAIN thread!):
        System.out.println(">>> 1. INCORRECT: Calling customThread.run() directly:");
        customThread.run(); // No new thread is spawned! Runs synchronously on main!

        // 2. CORRECT: Calling start() (Spawns a new OS Thread & Stack!):
        System.out.println("\n>>> 2. CORRECT: Calling customThread.start():");
        customThread.start(); // JVM calls native method to allocate OS thread & calls run() on new stack!

        System.out.println("\n>>> WHAT HAPPENS UNDER THE HOOD WHEN YOU CALL start():");
        System.out.println("  1. 'start()' calls JVM private native method: 'private native void start0()'.");
        System.out.println("  2. The JVM interacts with the OS kernel to allocate a new native thread and private 1 MB Call Stack.");
        System.out.println("  3. The OS thread scheduler registers the thread (RUNNABLE) and executes 'run()' ON THE NEW STACK.");
        System.out.println("  4. If you call 'run()' directly, it is just a normal Java method call executing on the CURRENT CALLING STACK with ZERO concurrency!");

        System.out.println("\n==========================================================================");
    }
}