/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 13: Eager Initialization Singleton Implementation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class EagerSingletonImplementationDemo {

    public static class EagerGlobalConfig {
        // EAGER INITIALIZATION: Instance created immediately when class is loaded into memory
        private static final EagerGlobalConfig INSTANCE = new EagerGlobalConfig();

        private String academyVersion = "v2026.1";

        // Private constructor
        private EagerGlobalConfig() {
            System.out.println("  [EAGER SINGLETON] Instance created immediately at Class Loading time!");
        }

        // Global access point
        public static EagerGlobalConfig getInstance() {
            return INSTANCE;
        }

        public void printConfig() {
            System.out.println("  -> Config Version: " + academyVersion + " (Hash: " + System.identityHashCode(this) + ")");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: EAGER INITIALIZATION SINGLETON - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Accessing Eager Singleton for the first time:");
        EagerGlobalConfig c1 = EagerGlobalConfig.getInstance();
        c1.printConfig();

        System.out.println("\n>>> 2. Accessing Eager Singleton again:");
        EagerGlobalConfig c2 = EagerGlobalConfig.getInstance();
        c2.printConfig();

        System.out.println("\n>>> Is c1 == c2? " + (c1 == c2));

        System.out.println("\n==========================================================================");
    }
}