/**
 * File: SwitchYieldKeywordDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 15)
 * Description: Demonstrates the Java 'yield' keyword (JLS §14.21, JEP 361, Java 14+),
 *              yielding values from multi-statement block bodies in switch expressions,
 *              contextual keyword mechanics, comparison between yield vs return vs break,
 *              and multi-factor tuition discount auditing in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class SwitchYieldKeywordDemo {

    public enum PlanTier {
        BASIC, PROFESSIONAL, ENTERPRISE_VIP
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 15 THE 'YIELD' KEYWORD IN SWITCH EXPRESSIONS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Using 'yield' in Multi-Statement Arrow Blocks { ... }
        System.out.println("--- 1. 'YIELD' IN MULTI-STATEMENT ARROW BLOCKS ---");
        PlanTier selectedTier = PlanTier.PROFESSIONAL;
        int studentScore = 85;

        // Complex calculation requiring multiple statements before producing the fee:
        int calculatedTuition = switch (selectedTier) {
            case BASIC -> {
                System.out.println("  [Basic Plan]: Standard 3-month courseware selected.");
                yield 12000;
            }
            case PROFESSIONAL -> {
                System.out.println("  [Pro Plan]: 4-month Java Core + DSA + Mock Interviews.");
                int base = 18000;
                int meritDiscount = (studentScore >= 80) ? 3000 : 0;
                System.out.printf("  [Pro Plan]: Base: ₹%,d | Merit Discount: ₹%,d%n", base, meritDiscount);
                yield base - meritDiscount; // Yielding computed result!
            }
            case ENTERPRISE_VIP -> {
                System.out.println("  [VIP Plan]: 6-month Full Stack + Cloud Deployment + Placement.");
                int vipBase = 28000;
                int scholarship = 5000;
                yield vipBase - scholarship;
            }
        };

        System.out.printf("-> Final Payable Tuition: ₹%,d%n%n", calculatedTuition);

        // 2. Using 'yield' in Colon-Syntax Switch Expressions
        System.out.println("--- 2. 'YIELD' IN TRADITIONAL COLON-SYNTAX SWITCH EXPRESSIONS ---");
        String courseCode = "SPRING";
        int feeViaColonSwitch = switch (courseCode) {
            case "JAVA":
                System.out.println("  Routing Java Core Track...");
                yield 15000;
            case "SPRING":
                System.out.println("  Routing Enterprise Spring Boot Track...");
                yield 22000;
            default:
                System.out.println("  Routing Consultation Track...");
                yield 10000;
        };
        System.out.printf("-> Track: %s | Computed Fee: ₹%,d%n%n", courseCode, feeViaColonSwitch);

        // 3. 'yield' vs 'return' Distinction
        System.out.println("--- 3. 'YIELD' VS 'RETURN' DISTINCTION ---");
        demonstrateYieldVsReturn(PlanTier.ENTERPRISE_VIP);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'yield value;' produces a result from a multi-statement switch block.");
        System.out.println("2. 'yield' is a contextual keyword (does not break variables named 'yield').");
        System.out.println("3. 'yield' exits only the switch block; 'return' exits the entire enclosing method.");
        System.out.println("4. Single-line arrow expressions (case X -> Y;) do NOT need 'yield'.");
        System.out.println("================================================================================");
    }

    private static void demonstrateYieldVsReturn(PlanTier tier) {
        // 'yield' produces a value from the switch without exiting this method:
        String planDescription = switch (tier) {
            case BASIC -> {
                System.out.println("  Executing Basic preparation...");
                yield "Standard Course Access";
            }
            case PROFESSIONAL -> {
                System.out.println("  Executing Pro preparation...");
                yield "Career Advancement Track";
            }
            case ENTERPRISE_VIP -> {
                System.out.println("  Executing VIP Enterprise preparation...");
                yield "Guaranteed Placement & Mentorship";
            }
        };

        // Execution continues inside the method!
        System.out.printf("  Method Continued! Resolved Plan Description: \"%s\"%n", planDescription);
    }
}
