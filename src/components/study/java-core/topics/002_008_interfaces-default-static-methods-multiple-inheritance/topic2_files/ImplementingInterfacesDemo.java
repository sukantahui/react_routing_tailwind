/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 2: Implementing Interfaces Using the 'implements' Keyword
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class ImplementingInterfacesDemo {

    public interface SecurityAuthenticator {
        boolean authenticate(String user, String password);
        void logAccess(String user, boolean status);
    }

    // Implementing class using 'implements'
    public static class AcademyPortalAuth implements SecurityAuthenticator {

        // CRITICAL RULE: Overriding method MUST be declared 'public' because
        // interface methods are implicitly public and Java forbids narrowing access!
        @Override
        public boolean authenticate(String user, String password) {
            return "swadeep".equalsIgnoreCase(user) && "java2026".equals(password);
        }

        @Override
        public void logAccess(String user, boolean status) {
            System.out.printf("  [SECURITY AUDIT] User '%s' login attempt: %s @ Barrackpore Hub\n",
                    user, (status ? "SUCCESS (Access Granted)" : "FAILED (Access Denied)"));
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: IMPLEMENTING INTERFACES IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SecurityAuthenticator auth = new AcademyPortalAuth();
        boolean ok = auth.authenticate("swadeep", "java2026");
        auth.logAccess("swadeep", ok);

        System.out.println("\n==========================================================================");
    }
}