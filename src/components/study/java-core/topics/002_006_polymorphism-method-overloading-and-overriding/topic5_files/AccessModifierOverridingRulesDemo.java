/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 5: Access Modifier Rules in Overriding: Cannot Assign Stricter Visibility
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class AccessModifierOverridingRulesDemo {

    public static class BaseReportingService {
        // Protected access in Superclass
        protected void generateAuditReport() {
            System.out.println("  [BASE REPORT] Protected audit report generated.");
        }
    }

    public static class ExtendedReportingService extends BaseReportingService {
        // VALID: Child can maintain SAME access (protected) or WIDEN access (public):
        @Override
        public void generateAuditReport() {
            System.out.println("  [CHILD REPORT] Public widened audit report generated for global export.");
        }

        // ILLEGAL: Attempting to NARROW access (e.g. private or package-private):
        // @Override
        // private void generateAuditReport() {} // COMPILE ERROR: "cannot assign weaker access privileges"
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: ACCESS MODIFIER OVERRIDING RULES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BaseReportingService service = new ExtendedReportingService();
        service.generateAuditReport();

        System.out.println("\n>>> Visibility Hierarchy Rule:");
        System.out.println("  private < default (package) < protected < public");
        System.out.println("  - Child method CAN stay same or become WIDER (e.g. protected -> public).");
        System.out.println("  - Child method CANNOT become STRICTER (e.g. protected -> private is FORBIDDEN).");

        System.out.println("\n==========================================================================");
    }
}