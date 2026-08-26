/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 14: Lazy Initialization Singleton Implementation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class LazySingletonImplementationDemo {

    public static class LazyAuditLogger {
        // Variable initialized to null initially (Zero memory allocated)
        private static LazyAuditLogger instance;

        private LazyAuditLogger() {
            System.out.println("  [LAZY SINGLETON] Instance born on demand (first call to getInstance())!");
        }

        // LAZY INITIALIZATION: Allocated ONLY when requested
        public static LazyAuditLogger getInstance() {
            if (instance == null) {
                instance = new LazyAuditLogger(); // Born on demand!
            }
            return instance;
        }

        public void log(String message) {
            System.out.println("  [AUDIT LOG] " + message + " (Instance Hash: " + System.identityHashCode(this) + ")");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: LAZY INITIALIZATION SINGLETON - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. First call to getInstance() creates the instance:");
        LazyAuditLogger logger1 = LazyAuditLogger.getInstance();
        logger1.log("Swadeep enrolled in Java Pro");

        System.out.println("\n>>> 2. Second call reuses existing instance:");
        LazyAuditLogger logger2 = LazyAuditLogger.getInstance();
        logger2.log("Tuhina enrolled in Spring Boot");

        System.out.println("\n>>> Is logger1 == logger2? " + (logger1 == logger2));

        System.out.println("\n==========================================================================");
    }
}