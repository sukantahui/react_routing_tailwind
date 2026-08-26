/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 17: Enum Singleton: The Most Robust Singleton Implementation in Java
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class EnumSingletonRobustnessDemo {

    // JOSHUA BLOCH'S GOLD STANDARD: Enum Singleton
    // 1. Thread-safe by JVM definition.
    // 2. Immune to Java Reflection attacks!
    // 3. Immune to Serialization / Deserialization duplicate creation!
    public enum CentralAcademicAuthority {
        INSTANCE; // Exactly one instance created by JVM

        private String authorityLead = "Sukanta Hui";
        private String headquarters = "Barrackpore Central Hub";

        public void issueCertificate(String traineeName, String course) {
            System.out.printf("  [AUTHORITY CERTIFICATE] %s certified in %s by %s @ %s\n",
                    traineeName, course, authorityLead, headquarters);
        }

        public void printStatus() {
            System.out.println("  -> Authority Singleton Active: " + name() + " (Hash: " + System.identityHashCode(this) + ")");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: ENUM SINGLETON ROBUSTNESS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Using Enum Singleton to issue certificates:");
        CentralAcademicAuthority auth1 = CentralAcademicAuthority.INSTANCE;
        auth1.issueCertificate("Swadeep Paul", "Java Core & Spring Boot Pro");
        auth1.printStatus();

        System.out.println("\n>>> 2. Verifying identity across references:");
        CentralAcademicAuthority auth2 = CentralAcademicAuthority.INSTANCE;
        System.out.println("  Is auth1 == auth2? " + (auth1 == auth2));

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 002_004 STATIC & SINGLETON PATTERNS 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}