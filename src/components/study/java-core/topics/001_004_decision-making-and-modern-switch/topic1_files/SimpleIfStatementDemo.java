/**
 * File: SimpleIfStatementDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 1)
 * Description: Demonstrates Java Simple 'if' statements (JLS §14.9.1),
 *              boolean condition evaluation, block vs single-statement execution,
 *              the empty semicolon bug `if (cond);`, clean boolean idiomatic checks,
 *              and student early-bird tuition discount validations in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class SimpleIfStatementDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 1 SIMPLE 'IF' STATEMENT");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Fundamental Simple 'if' Execution Flow
        System.out.println("--- 1. BASIC SIMPLE 'IF' STATEMENT ---");
        int studentScore = 85;
        int passingScore = 40;

        if (studentScore >= passingScore) {
            System.out.printf("Score %d >= %d: Student passed the examination!%n", studentScore, passingScore);
        }
        System.out.println("Execution continues sequentially...\n");

        // 2. Early-Bird Discount Surcharge (Indian Rupees ₹)
        System.out.println("--- 2. EARLY-BIRD ADMISSION DISCOUNT APPLICATION ---");
        auditStudentAdmission("Swadeep", 15000.0, true, 88);
        auditStudentAdmission("Tuhina", 15000.0, false, 72);

        // 3. The Dangerous Semicolon Trap `if (condition);`
        System.out.println("\n--- 3. THE INFAMOUS SEMICOLON TRAP (BUG DEMONSTRATION) ---");
        int balance = 500;
        int requiredFee = 5000;

        // NOTE: The semicolon ';' immediately terminates the if statement as an empty statement!
        // The block below executes UNCONDITIONALLY regardless of the condition!
        if (balance >= requiredFee); // ⚠️ EMPTY STATEMENT BUG!
        {
            System.out.println("⚠️ [BUG]: This line executed even though balance (₹500) < required (₹5000)!");
        }

        // 4. Idiomatic Boolean Expressions vs Redundant Comparisons
        System.out.println("\n--- 4. IDIOMATIC BOOLEAN EXPRESSIONS ---");
        boolean isBarrackporeResident = true;

        // Non-Idiomatic (Smell):
        if (isBarrackporeResident == true) {
            System.out.println("Non-idiomatic: 'if (isResident == true)' is redundant.");
        }

        // Clean Idiomatic Java:
        if (isBarrackporeResident) {
            System.out.println("✓ Clean Idiomatic: 'if (isResident)' is concise, readable, and professional.");
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Simple 'if' executes its body only when the boolean condition evaluates to 'true'.");
        System.out.println("2. Always use curly braces '{}' to enclose statements; prevent single-statement omissions.");
        System.out.println("3. NEVER place a semicolon ';' right after the 'if (condition)' header.");
        System.out.println("4. Avoid redundant '== true' comparisons; test boolean variables directly.");
        System.out.println("================================================================================");
    }

    private static void auditStudentAdmission(String name, double baseFee, boolean isEarlyBird, int meritScore) {
        double finalFee = baseFee;

        // Check 1: Early-Bird discount (10% off):
        if (isEarlyBird) {
            double discount = baseFee * 0.10;
            finalFee -= discount;
            System.out.printf("Student: %-10s | Early-Bird applied (-₹%,.2f)%n", name, discount);
        }

        // Check 2: High Merit waiver (additional ₹1,000 off):
        if (meritScore >= 85) {
            finalFee -= 1000.0;
            System.out.printf("Student: %-10s | Merit Score %d >= 85: Merit Waiver (-₹1,000.00)%n", name, meritScore);
        }

        System.out.printf("Student: %-10s | Base: ₹%,.2f -> Final Payable Fee: ₹%,.2f%n%n",
                name, baseFee, finalFee);
    }
}
