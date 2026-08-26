/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 10: Setting Daemon Status: thread.setDaemon(true) & The Start-Order Rule
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class SetDaemonBeforeStartRuleDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: thread.setDaemon(true) BEFORE start() RULE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. CORRECT USAGE: Calling setDaemon(true) BEFORE start():
        Thread validDaemon = new Thread(() -> {
            System.out.println("  [Valid Daemon] Running background memory monitor...");
        }, "Valid-Daemon");

        validDaemon.setDaemon(true); // MUST be called before start()!
        validDaemon.start();

        System.out.println(">>> 1. Valid Daemon configured successfully! Is Daemon? " + validDaemon.isDaemon());

        // 2. INCORRECT USAGE: Attempting to call setDaemon(true) AFTER start():
        Thread invalidDaemon = new Thread(() -> {
            try { Thread.sleep(500); } catch (InterruptedException ignored) {}
        }, "Invalid-Daemon");

        invalidDaemon.start(); // Started as a User thread!

        System.out.println("\n>>> 2. Attempting to call setDaemon(true) AFTER start():");
        try {
            invalidDaemon.setDaemon(true); // THROWS IllegalThreadStateException!
        } catch (IllegalThreadStateException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION] " + e.getClass().getSimpleName() + "!");
            System.out.println("  Reason: A thread's daemon status CANNOT be altered once the thread is alive!");
        }

        System.out.println("\n==========================================================================");
    }
}