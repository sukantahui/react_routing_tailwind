/**
 * File: TraditionalSwitchCaseDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 6)
 * Description: Demonstrates Java Traditional 'switch-case' statements (JLS §14.11),
 *              valid selector data types (byte, short, int, char, String, enum),
 *              illegal types (long, float, double, boolean), compile-time constant case labels,
 *              banking transaction routing, and course enrollment dispatches in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class TraditionalSwitchCaseDemo {

    public enum StudentBranch {
        BARRACKPORE, SHYAMNAGAR, NAIHATI, ICHAPUR
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 6 TRADITIONAL 'SWITCH-CASE' STATEMENT");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Primitive Int Selector with Compile-Time Constant Case Labels
        System.out.println("--- 1. PRIMITIVE INT SELECTOR WITH CONSTANT LABELS ---");
        final int OPTION_JAVA = 1;
        final int OPTION_SPRING = 2;
        final int OPTION_TAX = 3;

        int selectedOption = 2;
        switch (selectedOption) {
            case OPTION_JAVA:
                System.out.println("Track: Java Core & Algorithms (Fee: ₹15,000)");
                break;
            case OPTION_SPRING:
                System.out.println("Track: Enterprise Spring Boot & Microservices (Fee: ₹22,000)");
                break;
            case OPTION_TAX:
                System.out.println("Track: AccoTax & GST Taxation Mastery (Fee: ₹12,000)");
                break;
            default:
                System.out.println("Error: Unrecognized Course Track Code!");
                break;
        }
        System.out.println();

        // 2. Character Selector (char)
        System.out.println("--- 2. CHARACTER SELECTOR ('A', 'B', 'C') ---");
        char gradeLevel = 'A';
        switch (gradeLevel) {
            case 'A':
                System.out.println("Rank: First Class with Distinction");
                break;
            case 'B':
                System.out.println("Rank: Second Class Division");
                break;
            case 'C':
                System.out.println("Rank: Pass Division");
                break;
            default:
                System.out.println("Rank: Unclassified / Remedial");
                break;
        }
        System.out.println();

        // 3. String Selector (Introduced in Java 7)
        System.out.println("--- 3. STRING SELECTOR ---");
        dispatchAtmAction("WITHDRAW", 5000.0);
        dispatchAtmAction("DEPOSIT", 10000.0);

        // 4. Enum Selector (Introduced in Java 5)
        System.out.println("\n--- 4. ENUM SELECTOR ---");
        routeCampusBranch(StudentBranch.BARRACKPORE);
        routeCampusBranch(StudentBranch.NAIHATI);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Valid switch selector types: byte, short, int, char, String, and enum (and wrappers).");
        System.out.println("2. ILLEGAL selector types in Java: long, float, double, and boolean!");
        System.out.println("3. Case labels MUST be compile-time constants (literals or 'final' constant variables).");
        System.out.println("4. Duplicate case labels cause a compile error; 'null' selectors throw NullPointerException.");
        System.out.println("================================================================================");
    }

    private static void dispatchAtmAction(String action, double amount) {
        System.out.printf("Dispatching Action: %-10s | ", action);
        switch (action) {
            case "WITHDRAW":
                System.out.printf("ATM Dispensing Cash: ₹%,.2f%n", amount);
                break;
            case "DEPOSIT":
                System.out.printf("ATM Accepting Cash Deposit: ₹%,.2f%n", amount);
                break;
            case "BALANCE":
                System.out.println("ATM Generating Balance Receipt...");
                break;
            default:
                System.out.println("ATM Error: Invalid Transaction Command!");
                break;
        }
    }

    private static void routeCampusBranch(StudentBranch branch) {
        System.out.printf("Routing Campus: %-14s -> ", branch);
        switch (branch) {
            case BARRACKPORE:
                System.out.println("Headquarters & Main Laboratory (Palta / Station Road)");
                break;
            case SHYAMNAGAR:
                System.out.println("Regional Tech Hub (Sub-Center)");
                break;
            case NAIHATI:
                System.out.println("Advanced Placement & Training Cell");
                break;
            case ICHAPUR:
                System.out.println("Taxation & Corporate Accounting Wing");
                break;
        }
    }
}
