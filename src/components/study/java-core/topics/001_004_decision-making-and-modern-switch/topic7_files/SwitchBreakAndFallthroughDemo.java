/**
 * File: SwitchBreakAndFallthroughDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 7)
 * Description: Demonstrates Java switch-case 'break' statement mechanics (JLS §14.15),
 *              the dangers of accidental fall-through bugs, legitimate intentional fall-through patterns
 *              (multi-case grouping and cumulative tier benefit cascading),
 *              and student laboratory access tiers in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class SwitchBreakAndFallthroughDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 7 SWITCH 'BREAK' & FALL-THROUGH MECHANICS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Accidental Fall-Through Bug Demonstration
        System.out.println("--- 1. THE ACCIDENTAL FALL-THROUGH BUG (MISSING BREAK) ---");
        int targetQuarter = 1;
        System.out.println("Executing switch on Quarter 1 without 'break;' statements:");
        switch (targetQuarter) {
            case 1:
                System.out.println("-> Q1: January - March (₹15,000 Tuition Batch)");
                // ⚠️ Missing 'break;' here!
            case 2:
                System.out.println("-> ⚠️ [BUG]: Q2 printed unintentionally due to fall-through!");
                // ⚠️ Missing 'break;' here!
            case 3:
                System.out.println("-> ⚠️ [BUG]: Q3 printed unintentionally due to fall-through!");
                break;
            default:
                System.out.println("-> Default Branch");
                break;
        }
        System.out.println();

        // 2. Intentional Fall-Through Pattern 1: Multi-Case Stacking (Grouping)
        System.out.println("--- 2. INTENTIONAL PATTERN 1: MULTI-CASE GROUPING ---");
        classifyDayType("MONDAY");
        classifyDayType("SATURDAY");
        classifyDayType("SUNDAY");

        // 3. Intentional Pattern 2: Cumulative Benefit Cascading (Barrackpore Center)
        System.out.println("\n--- 3. INTENTIONAL PATTERN 2: CUMULATIVE LAB PRIVILEGE CASCADE ---");
        displayCumulativePrivileges("Swadeep", 3); // Level 3 Platinum
        displayCumulativePrivileges("Tuhina", 1);  // Level 1 Bronze

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'break;' immediately halts switch execution and exits the block.");
        System.out.println("2. Omitting 'break;' causes execution to fall through into subsequent cases.");
        System.out.println("3. Intentional grouping (stacking cases) is clean: case 1: case 2: ... break;");
        System.out.println("4. In Java 14+, modern switch expressions eliminate accidental fall-through completely!");
        System.out.println("================================================================================");
    }

    private static void classifyDayType(String dayName) {
        System.out.printf("Day: %-10s -> ", dayName);
        switch (dayName.toUpperCase()) {
            // Stacked cases sharing one common block:
            case "MONDAY":
            case "TUESDAY":
            case "WEDNESDAY":
            case "THURSDAY":
            case "FRIDAY":
                System.out.println("Weekday (Regular Java Laboratory Sessions in Barrackpore)");
                break;
            case "SATURDAY":
            case "SUNDAY":
                System.out.println("Weekend (Advanced Projects & AccoTax Workshop)");
                break;
            default:
                System.out.println("Invalid Day Name!");
                break;
        }
    }

    private static void displayCumulativePrivileges(String studentName, int membershipTier) {
        System.out.printf("Student: %-10s | Tier Level: %d -> Granted Cumulative Perks:%n",
                studentName, membershipTier);

        // Cumulative cascade: A higher tier student inherits ALL lower tier benefits!
        switch (membershipTier) {
            case 3:
                System.out.println("  [+] Platinum: 24/7 Cloud Server Cluster Access (₹10,000 value)");
                // Fall-through intended!
            case 2:
                System.out.println("  [+] Gold: 1-on-1 Mentorship & Mock Interviews with Sukanta Hui");
                // Fall-through intended!
            case 1:
                System.out.println("  [+] Bronze: Standard Laboratory Workstation & Study Notes");
                break;
            default:
                System.out.println("  [!] Guest: Read-only portal preview.");
                break;
        }
        System.out.println();
    }
}
