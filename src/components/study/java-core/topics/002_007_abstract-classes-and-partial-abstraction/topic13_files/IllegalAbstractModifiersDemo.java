/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 13: Can Abstract Methods Be Private or Static? (Illegal Modifier Combinations)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class IllegalAbstractModifiersDemo {

    public abstract static class BaseSecurityService {

        // 1. WHY 'private abstract' IS ILLEGAL:
        // 'private' means invisible to child classes.
        // 'abstract' demands child classes override it.
        // Invisible + Must Override = IMPOSSIBLE!
        // private abstract void secret(); // COMPILE ERROR: "illegal combination of modifiers: abstract and private"

        // 2. WHY 'static abstract' IS ILLEGAL:
        // 'static' methods belong to the class and are resolved at compile-time (no dynamic dispatch).
        // 'abstract' requires runtime dynamic dispatch (vtable) to find the child's implementation.
        // static abstract void log(); // COMPILE ERROR: "illegal combination of modifiers: abstract and static"

        // 3. VALID ABSTRACT METHODS (public or protected):
        public abstract void authenticateUser(String username);
        protected abstract void logAuditTrail(String action);
    }

    public static class CloudSecurityService extends BaseSecurityService {
        @Override
        public void authenticateUser(String username) {
            System.out.println("  [CLOUD AUTH] Authenticated user: " + username);
        }

        @Override
        protected void logAuditTrail(String action) {
            System.out.println("  [AUDIT] Action logged: " + action);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: ILLEGAL ABSTRACT METHOD MODIFIERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BaseSecurityService sec = new CloudSecurityService();
        sec.authenticateUser("Swadeep Paul");
        sec.logAuditTrail("LOGIN_SUCCESS_BARRACKPORE_HUB");

        System.out.println("\n>>> Summary of Forbidden Abstract Modifiers:");
        System.out.println("  X private abstract  (invisible to child)");
        System.out.println("  X static abstract   (no dynamic dispatch)");
        System.out.println("  X final abstract    (cannot be overridden)");

        System.out.println("\n==========================================================================");
    }
}