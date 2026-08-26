/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 8: What Cannot Be Overridden: private, static (Method Hiding), and final methods
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class NonOverridableMembersDemo {

    public static class SuperService {
        // 1. PRIVATE METHOD: Bound strictly to this class, invisible to subclasses
        private void internalSecurityCheck() {
            System.out.println("  [PRIVATE] Internal parent security check.");
        }

        // 2. STATIC METHOD: Bound at compile-time to Class, hidden not overridden
        public static void printAcademyNotice() {
            System.out.println("  [STATIC] Base Academy General Notice");
        }

        // 3. FINAL METHOD: Prohibits overriding completely
        public final void lockAuditId() {
            System.out.println("  [FINAL] Audit ID locked: AUDIT-BKP-2026");
        }
    }

    public static class SubService extends SuperService {
        // Re-declaring static method -> METHOD HIDING (Not overriding!)
        public static void printAcademyNotice() {
            System.out.println("  [STATIC HIDDEN] SubService Regional Notice");
        }

        // Writing 'private void internalSecurityCheck()' creates a completely NEW unrelated method.
        // Attempting '@Override public final void lockAuditId()' -> COMPILE ERROR!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: WHAT CANNOT BE OVERRIDDEN IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SuperService ref = new SubService();

        System.out.println(">>> 1. Calling static method on Parent reference (Invokes Parent static):");
        ref.printAcademyNotice();

        System.out.println("\n>>> 2. Calling final method:");
        ref.lockAuditId();

        System.out.println("\n>>> Summary of 3 Non-Overridable Elements:");
        System.out.println("  1. private methods (invisible to child)");
        System.out.println("  2. static methods (static binding / Method Hiding)");
        System.out.println("  3. final methods (compiler forbids override)");

        System.out.println("\n==========================================================================");
    }
}