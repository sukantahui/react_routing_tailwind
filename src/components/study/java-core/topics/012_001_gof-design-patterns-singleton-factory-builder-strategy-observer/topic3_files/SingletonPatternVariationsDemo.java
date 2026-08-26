/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 3: The Singleton Pattern - Thread-Safe, Bill Pugh & Enum
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class SingletonPatternVariationsDemo {

    // 1. BILL PUGH SINGLETON (Lazy, Thread-Safe, Zero Synchronization Overhead!):
    public static class BillPughSingleton {
        private BillPughSingleton() {
            System.out.println("   [BILL PUGH]: Initialized single instance on demand!");
        }

        // Inner static class is NOT loaded until getInstance() is invoked:
        private static class InstanceHolder {
            private static final BillPughSingleton INSTANCE = new BillPughSingleton();
        }

        public static BillPughSingleton getInstance() {
            return InstanceHolder.INSTANCE;
        }
    }

    // 2. ENUM SINGLETON (Joshua Bloch - Effective Java Item 3: 100% Reflection & Serialization Safe!):
    public enum EnumSingleton {
        INSTANCE;

        public void performAcademyTask(String task) {
            System.out.println("   [ENUM SINGLETON]: Executing " + task + " across Barrackpore Hub.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: SINGLETON PATTERN VARIATIONS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. TESTING BILL PUGH SINGLETON:");
        BillPughSingleton s1 = BillPughSingleton.getInstance();
        BillPughSingleton s2 = BillPughSingleton.getInstance();
        System.out.println("  - Same instance? " + (s1 == s2)); // true!

        System.out.println("\n>>> 2. TESTING ENUM SINGLETON:");
        EnumSingleton.INSTANCE.performAcademyTask("Fee Audit");
        System.out.println("  - Enum singletons are immune to Reflection instantiation and Serialization duplicate bugs!");

        System.out.println("\n==========================================================================");
    }
}
