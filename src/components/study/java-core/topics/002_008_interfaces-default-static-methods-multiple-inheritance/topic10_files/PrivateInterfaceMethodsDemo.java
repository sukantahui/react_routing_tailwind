/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 10: Java 9 Evolution: 'private' & 'private static' Methods in Interfaces
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class PrivateInterfaceMethodsDemo {

    public interface DatabaseAuditor {

        default void auditInsert(String table) {
            logInternal("INSERT", table); // Reusing private helper
        }

        default void auditUpdate(String table) {
            logInternal("UPDATE", table); // Reusing private helper
        }

        // JAVA 9 PRIVATE METHOD: Encapsulates shared helper logic for default methods!
        private void logInternal(String action, String table) {
            System.out.printf("  [INTERNAL PRIVATE AUDIT] Executed %s on table '%s' @ Barrackpore DB Node\n",
                    action, table);
        }

        // JAVA 9 PRIVATE STATIC METHOD: Helper for static interface methods
        static void printSecurityNotice() {
            formatNoticeHeader("GDPR & DPDP ACT COMPLIANT");
        }

        private static void formatNoticeHeader(String title) {
            System.out.println("  *** [SECURITY NOTICE] " + title + " ***");
        }
    }

    public static class ProductionDbAuditor implements DatabaseAuditor {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: JAVA 9 PRIVATE INTERFACE METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        DatabaseAuditor auditor = new ProductionDbAuditor();
        auditor.auditInsert("student_records");
        auditor.auditUpdate("fee_receipts");

        System.out.println();
        DatabaseAuditor.printSecurityNotice();

        System.out.println("\n==========================================================================");
    }
}