/**
 * File: NestedIfElseDanglingElseDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 3)
 * Description: Demonstrates Java Nested 'if-else' statements,
 *              the famous Dangling Else ambiguity and grammar resolution rule (JLS §14.9.2),
 *              misleading indentation defects, curly brace disambiguation,
 *              guard clause flattening, and student multi-tier scholarship auditing in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class NestedIfElseDanglingElseDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 3 NESTED IF-ELSE & DANGLING ELSE AMBIGUITY");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. The Famous Dangling Else Ambiguity (Misleading Indentation)
        System.out.println("--- 1. THE DANGLING ELSE AMBIGUITY (PARSING TRAP) ---");
        int score = 85;
        boolean hasAttendance = false;

        System.out.println("Testing with: score = 85, hasAttendance = false");
        
        // Misleading indentation (Human expects else to belong to 'score >= 80'):
        if (score >= 80)
            if (hasAttendance)
                System.out.println("Result: Honors Degree Granted!");
        else
            System.out.println("⚠️ [MISLEADING INDENTATION BUG]: Else belonged to 'hasAttendance', NOT 'score'!");

        // 2. Disambiguating with Explicit Curly Braces '{}'
        System.out.println("\n--- 2. DISAMBIGUATING WITH EXPLICIT CURLY BRACES ---");
        // Desired Logic: If score >= 80, check attendance; otherwise say 'Score below 80':
        if (score >= 80) {
            if (hasAttendance) {
                System.out.println("✓ Honors Degree Granted!");
            } else {
                System.out.println("✓ Score is high, but attendance requirement missed.");
            }
        } else {
            System.out.println("✓ Score below honors threshold (80).");
        }

        // 3. Multi-Tier Scholarship Qualification Ledger (Barrackpore Center)
        System.out.println("\n--- 3. BARRACKPORE MULTI-TIER SCHOLARSHIP AUDITING ---");
        auditScholarshipTier("Swadeep", 92, 120000.0, true);
        auditScholarshipTier("Tuhina", 88, 350000.0, true);
        auditScholarshipTier("Debangshu", 65, 80000.0, false);

        // 4. Refactoring Nested Pyramids into Clean Guard Clauses
        System.out.println("\n--- 4. REFACTORING NESTED IF-ELSE TO FLAT GUARD CLAUSES ---");
        auditAccessWithGuardClauses("Abhronila", true, true, 95);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. In unbraced code, 'else' ALWAYS attaches to the closest preceding unclosed 'if'.");
        System.out.println("2. Indentation is ignored by the Java compiler; braces '{}' dictate true structure.");
        System.out.println("3. Always use curly braces to eliminate the Dangling Else trap entirely.");
        System.out.println("4. Flatten deeply nested if-else structures using guard clauses and '&&' operators.");
        System.out.println("================================================================================");
    }

    private static void auditScholarshipTier(String name, int academicScore, double familyIncome, boolean isBarrackporeResident) {
        System.out.printf("Auditing Student: %-10s | Score: %2d%% | Income: ₹%,.2f | Resident: %b%n",
                name, academicScore, familyIncome, isBarrackporeResident);

        if (academicScore >= 85) {
            if (familyIncome <= 200000.0) {
                System.out.println("-> [TIER 1 SCHOLARSHIP]: 100% Full Tuition Waiver (₹15,000 value)");
            } else {
                if (isBarrackporeResident) {
                    System.out.println("-> [TIER 2 SCHOLARSHIP]: 50% Merit-Cum-Means Waiver (₹7,500 value)");
                } else {
                    System.out.println("-> [TIER 3 SCHOLARSHIP]: 25% High-Merit Waiver (₹3,750 value)");
                }
            }
        } else {
            System.out.println("-> [INELIGIBLE]: Academic score below scholarship threshold (85%)");
        }
        System.out.println();
    }

    private static void auditAccessWithGuardClauses(String name, boolean hasPaidFee, boolean hasIdCard, int examScore) {
        System.out.printf("Guard Clause Audit for %s:%n", name);

        // Guard 1: Fee validation
        if (!hasPaidFee) {
            System.out.println("-> Access Denied: Unpaid tuition fees.");
            return;
        }

        // Guard 2: ID validation
        if (!hasIdCard) {
            System.out.println("-> Access Denied: Missing student ID card.");
            return;
        }

        // Guard 3: Exam score validation
        if (examScore < 80) {
            System.out.println("-> Access Denied: Exam score below lab threshold.");
            return;
        }

        // Happy path (Clean and Flat!):
        System.out.println("-> ✓ Access Granted to Advanced Java Laboratory!");
    }
}
