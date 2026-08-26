/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 7: Why Enum Constructors Are Strictly Private by Default (Singleton Integrity)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

public class EnumPrivateConstructorIntegrityDemo {

    public enum ServerEnvironment {
        LOCAL("http://localhost:8080"),
        STAGING("https://staging.coderaccotax.com"),
        PRODUCTION("https://api.coderaccotax.com");

        private final String baseUrl;

        // Enum constructors are ALWAYS implicitly private.
        // Explicit 'public' or 'protected' modifiers cause a COMPILE ERROR!
        private ServerEnvironment(String baseUrl) {
            this.baseUrl = baseUrl;
        }

        public String getBaseUrl() { return baseUrl; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: ENUM PRIVATE CONSTRUCTOR INTEGRITY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Why are Enum Constructors strictly PRIVATE?");
        System.out.println("  - To guarantee that NO new instances can ever be created outside the declared constants.");
        System.out.println("  - The JVM instantiates the constants exactly once during class loading.");
        System.out.println("  - Writing 'new ServerEnvironment("...")' is strictly forbidden by the compiler!");

        System.out.println("\n>>> 2. Active Environment Configurations:");
        for (ServerEnvironment env : ServerEnvironment.values()) {
            System.out.printf("  Environment: %-12s | Base URL: %s%n", env.name(), env.getBaseUrl());
        }

        System.out.println("\n==========================================================================");
    }
}