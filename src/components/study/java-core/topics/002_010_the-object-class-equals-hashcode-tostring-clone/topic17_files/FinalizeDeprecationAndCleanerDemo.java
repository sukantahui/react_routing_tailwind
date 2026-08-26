/**
 * Java Core Tutorial - Module 002_010: The Object Class: equals(), hashCode(), toString() & clone()
 * Topic 17: The Deprecated 'finalize()' Method & Modern Java Cleaner / AutoCloseable
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.objectclass;

import java.lang.ref.Cleaner;

public class FinalizeDeprecationAndCleanerDemo {

    // MODERN SOLUTION (Java 9+): java.lang.ref.Cleaner / AutoCloseable
    public static class DatabaseResourceHandler implements AutoCloseable {
        private static final Cleaner cleaner = Cleaner.create();

        // Separate static state that does NOT hold a reference to outer object!
        private static class State implements Runnable {
            private String dbHandle;
            State(String handle) { this.dbHandle = handle; }

            @Override
            public void run() {
                System.out.println("  [CLEANER ACTION] Safely closed underlying socket for: " + dbHandle);
            }
        }

        private final State state;
        private final Cleaner.Cleanable cleanable;

        public DatabaseResourceHandler(String handle) {
            this.state = new State(handle);
            this.cleanable = cleaner.register(this, state);
        }

        @Override
        public void close() {
            cleanable.clean(); // Clean immediately when try-with-resources exits!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: finalize() DEPRECATION & MODERN Cleaner - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Why 'finalize()' was DEPRECATED in Java 9 and marked for removal in Java 18:");
        System.out.println("  - Unpredictable Timing: Garbage collector may delay finalization indefinitely.");
        System.out.println("  - Zombie Resurrection: An object could assign 'this' to a static field and revive itself!");
        System.out.println("  - Performance Degradation: Drastically slows down GC throughput.");
        System.out.println();
        System.out.println(">>> 2. Modern Resource Management using AutoCloseable & Cleaner:");
        try (DatabaseResourceHandler handler = new DatabaseResourceHandler("BKP-DB-POOL-01")) {
            System.out.println("  [OPERATING] Performing database queries inside try-with-resources block...");
        } // Automatically calls close() & clean()!

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 002_010 THE OBJECT CLASS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}