/**
 * File: SwitchDefaultPlacementDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 8)
 * Description: Demonstrates Java switch 'default' case mechanics (JLS §14.11),
 *              placement flexibility (top, middle, bottom), the non-bottom fall-through trap,
 *              defensive exception throwing for unrecognized inputs,
 *              and course fee fallback audits in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class SwitchDefaultPlacementDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 8 SWITCH 'DEFAULT' PLACEMENT BEST PRACTICES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Standard Best Practice: Default at the Bottom
        System.out.println("--- 1. STANDARD PLACEMENT: DEFAULT AT THE BOTTOM ---");
        auditCourseTrack("JAVA");
        auditCourseTrack("PYTHON");
        auditCourseTrack("UNKNOWN_CODE");

        // 2. The Non-Bottom Default Placement Fall-Through Trap
        System.out.println("\n--- 2. THE NON-BOTTOM DEFAULT PLACEMENT TRAP ---");
        int unlistedCode = 99;
        System.out.println("Executing switch with 'default' at the TOP without break:");
        switch (unlistedCode) {
            default:
                System.out.println("-> Default Branch: Unlisted code detected!");
                // ⚠️ Missing break in non-bottom default!
            case 1:
                System.out.println("-> ⚠️ [FALL-THROUGH BUG]: Case 1 executed unintentionally!");
                break;
            case 2:
                System.out.println("-> Case 2: Standard Plan");
                break;
        }

        // 3. Defensive Programming: Throwing Exceptions in Default
        System.out.println("\n--- 3. DEFENSIVE EXCEPTION THROWING IN DEFAULT ---");
        processBankingAction("TRANSFER", 5000.0);
        try {
            processBankingAction("CORRUPTED_COMMAND", 1000.0);
        } catch (IllegalArgumentException e) {
            System.out.printf("✓ Defensive Catch: %s%n", e.getMessage());
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'default' executes when no explicit 'case' constant matches the selector.");
        System.out.println("2. While Java allows 'default' anywhere, ALWAYS place it at the bottom.");
        System.out.println("3. A non-bottom 'default' without 'break' falls through into subsequent cases.");
        System.out.println("4. In domain-driven design, use 'default' to throw IllegalArgumentException on unknown inputs.");
        System.out.println("================================================================================");
    }

    private static void auditCourseTrack(String trackCode) {
        System.out.printf("Track Code: %-12s -> ", trackCode);
        switch (trackCode) {
            case "JAVA":
                System.out.println("Java Core & Spring Boot (Fee: ₹15,000)");
                break;
            case "PYTHON":
                System.out.println("Python & Django Full Stack (Fee: ₹14,000)");
                break;
            case "TAX":
                System.out.println("AccoTax GST & Tally Prime (Fee: ₹12,000)");
                break;
            default:
                System.out.println("Default: General Computer Literacy & Enrollment Consultation");
                break;
        }
    }

    private static void processBankingAction(String action, double amount) {
        System.out.printf("Processing Action: %-18s | ", action);
        switch (action) {
            case "TRANSFER":
                System.out.printf("Fund Transfer Authorized: ₹%,.2f%n", amount);
                break;
            case "WITHDRAW":
                System.out.printf("Cash Dispensed: ₹%,.2f%n", amount);
                break;
            default:
                throw new IllegalArgumentException("Unsupported banking transaction command: " + action);
        }
    }
}
