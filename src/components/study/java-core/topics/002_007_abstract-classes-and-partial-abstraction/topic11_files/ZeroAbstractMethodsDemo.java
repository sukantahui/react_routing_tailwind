/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 11: Can an Abstract Class Have 0 Abstract Methods? (Preventing Direct Instantiation)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class ZeroAbstractMethodsDemo {

    // VALID: Abstract class with ZERO abstract methods!
    // Why do this? To PREVENT direct instantiation while providing 100% concrete shared code!
    public abstract static class BaseSecurityContext {
        private String sessionId = "SEC-SESSION-7788";

        public void printSession() {
            System.out.println("  [SECURITY CONTEXT] Session Active: " + sessionId);
        }

        public boolean isAuthorized() {
            return true;
        }
    }

    public static class AdminSecurityContext extends BaseSecurityContext {
        public void launchAdminConsole() {
            System.out.println("  [ADMIN] Accessing Barrackpore server root terminal...");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: ABSTRACT CLASS WITH 0 ABSTRACT METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // BaseSecurityContext base = new BaseSecurityContext(); // COMPILE ERROR!
        // Prevents direct instantiation of generic context!

        AdminSecurityContext admin = new AdminSecurityContext();
        admin.printSession();
        admin.launchAdminConsole();

        System.out.println("\n==========================================================================");
    }
}