/**
 * File: ControlFlowConceptDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 0)
 * Description: Demonstrates fundamental control flow concepts in Java:
 *              Sequential execution vs Conditional Branching vs Iteration (Böhm-Jacopini Theorem),
 *              CPU instruction pointer branching, ATM machine transaction routing,
 *              and student fee validation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class ControlFlowConceptDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: MODULE 001_004 TOPIC 0 CONTROL FLOW CONCEPTS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Sequential Execution Flow (Default Top-to-Bottom)
        System.out.println("--- 1. SEQUENTIAL CONTROL FLOW (LINEAR EXECUTION) ---");
        System.out.println("Step 1: Initializing Student Enrollment System in Barrackpore...");
        System.out.println("Step 2: Loading Course Catalog (Java Core, Spring Boot, Tax)...");
        System.out.println("Step 3: Connecting to Accounting Database...\n");

        // 2. Conditional Selection Flow (Branching based on Truth Predicate)
        System.out.println("--- 2. CONDITIONAL SELECTION FLOW (BRANCHING) ---");
        double studentAccountBalance = 25000.0;
        double courseAdmissionFee = 15000.0;

        System.out.printf("Current Account Balance: ₹%,.2f | Course Fee: ₹%,.2f%n",
                studentAccountBalance, courseAdmissionFee);

        if (studentAccountBalance >= courseAdmissionFee) {
            // True Branch:
            System.out.println("-> Branch A (TRUE): Balance sufficient! Enrollment Confirmed.");
            studentAccountBalance -= courseAdmissionFee;
            System.out.printf("-> Remaining Balance: ₹%,.2f%n", studentAccountBalance);
        } else {
            // False Branch:
            System.out.println("-> Branch B (FALSE): Insufficient balance! Prompt for online payment.");
        }
        System.out.println();

        // 3. Multi-Way Routing Control Flow (ATM Transaction Simulator)
        System.out.println("--- 3. MULTI-WAY ROUTING (ATM TRANSACTION ENGINE) ---");
        processAtmTransaction("WITHDRAW", 5000.0, 20000.0);
        processAtmTransaction("DEPOSIT", 10000.0, 15000.0);
        processAtmTransaction("CHECK_BALANCE", 0.0, 25000.0);
        processAtmTransaction("INVALID_ACTION", 0.0, 25000.0);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Control flow governs the execution order of statements at runtime.");
        System.out.println("2. The Böhm-Jacopini theorem proves all algorithms require: Sequence, Selection, and Iteration.");
        System.out.println("3. Conditional branching diverts the CPU instruction pointer based on boolean predicates.");
        System.out.println("4. Module 001_004 explores if-else, else-if ladders, switch-case, and Java 14+ switch expressions!");
        System.out.println("================================================================================");
    }

    private static void processAtmTransaction(String actionType, double amount, double currentBalance) {
        System.out.printf("Action: %-15s | ", actionType);
        switch (actionType) {
            case "WITHDRAW" -> {
                if (currentBalance >= amount) {
                    double remaining = currentBalance - amount;
                    System.out.printf("Withdrawn: ₹%,.2f | New Balance: ₹%,.2f%n", amount, remaining);
                } else {
                    System.out.println("Withdrawal Declined: Insufficient Funds!");
                }
            }
            case "DEPOSIT" -> {
                double newBal = currentBalance + amount;
                System.out.printf("Deposited: ₹%,.2f | New Balance: ₹%,.2f%n", amount, newBal);
            }
            case "CHECK_BALANCE" -> System.out.printf("Current Balance Inquire: ₹%,.2f%n", currentBalance);
            default -> System.out.println("Error: Unknown Transaction Code!");
        }
    }
}
