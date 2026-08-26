/**
 * File: ComplexBooleanConditionsDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 5)
 * Description: Demonstrates combining complex boolean conditions in Java decision statements:
 *              Logical AND (&&), Logical OR (||), Logical NOT (!),
 *              precedence rules (! > && > ||), De Morgan's Laws in conditional refactoring,
 *              defensive short-circuit null guards, and student loan approval eligibility in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class ComplexBooleanConditionsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 5 COMBINING COMPLEX BOOLEAN CONDITIONS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Boundary Interval Range Checking (&&)
        System.out.println("--- 1. BOUNDARY INTERVAL RANGE CHECKING (&&) ---");
        int testScore = 85;
        // In Java, we cannot write '0 <= score <= 100'; we MUST combine with '&&':
        if (testScore >= 0 && testScore <= 100) {
            System.out.printf("Score %d is valid (within legal [0, 100] interval).%n", testScore);
        } else {
            System.out.printf("Score %d is INVALID!%n", testScore);
        }
        System.out.println();

        // 2. Precedence Hierarchy: ! (High) > && (Medium) > || (Low)
        System.out.println("--- 2. OPERATOR PRECEDENCE IN COMPLEX CONDITIONS (! > && > ||) ---");
        boolean isStudent = true;
        boolean hasGovtCard = false;
        boolean isSeniorCitizen = false;

        // Without parentheses: '!isStudent && hasGovtCard || isSeniorCitizen'
        // Evaluates as: '((!isStudent) && hasGovtCard) || isSeniorCitizen'
        boolean unparenthesized = !isStudent && hasGovtCard || isSeniorCitizen;

        // Explicit Parentheses (Crystal Clear Developer Intent):
        boolean explicit = (!isStudent && hasGovtCard) || isSeniorCitizen;

        System.out.printf("Unparenthesized Result: %b | Explicit Grouping: %b%n%n",
                unparenthesized, explicit);

        // 3. De Morgan's Laws Applied to Guard Refactoring
        System.out.println("--- 3. DE MORGAN'S LAWS IN CONDITIONAL REFACTORING ---");
        boolean hasValidAadhaar = true;
        boolean hasPanCard = false;

        // Rule 1: !(A && B) is equivalent to (!A || !B)
        boolean rejectionA = !(hasValidAadhaar && hasPanCard);
        boolean rejectionB = !hasValidAadhaar || !hasPanCard;
        System.out.printf("!(A && B) [%b] == (!A || !B) [%b] (De Morgan Law 1)%n", rejectionA, rejectionB);

        // Rule 2: !(A || B) is equivalent to (!A && !B)
        boolean hasPassport = false;
        boolean hasVoterId = false;
        boolean noGovIdA = !(hasPassport || hasVoterId);
        boolean noGovIdB = !hasPassport && !hasVoterId;
        System.out.printf("!(A || B) [%b] == (!A && !B) [%b] (De Morgan Law 2)%n%n", noGovIdA, noGovIdB);

        // 4. Defensive Short-Circuit Null Guard
        System.out.println("--- 4. DEFENSIVE SHORT-CIRCUIT NULL GUARD ---");
        String studentName = "Swadeep";
        if (studentName != null && studentName.length() >= 3 && studentName.startsWith("S")) {
            System.out.printf("✓ Valid student name confirmed: %s%n%n", studentName);
        }

        // 5. Multi-Factor Student Education Loan Auditor (Barrackpore Center)
        System.out.println("--- 5. BARRACKPORE STUDENT EDUCATION LOAN AUDIT ---");
        auditEducationLoan("Swadeep", 88, 250000.0, 750, true);
        auditEducationLoan("Tuhina", 92, 450000.0, 620, false);
        auditEducationLoan("Debangshu", 55, 180000.0, 710, true);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Logical AND (&&) requires ALL conditions to be true (short-circuits on false).");
        System.out.println("2. Logical OR (||) requires AT LEAST ONE condition to be true (short-circuits on true).");
        System.out.println("3. Precedence: '!' binds highest, followed by '&&', and lastly '||'.");
        System.out.println("4. Apply De Morgan's laws: !(A && B) = !A || !B and !(A || B) = !A && !B.");
        System.out.println("================================================================================");
    }

    private static void auditEducationLoan(String name, int academicScore, double loanAmount, int creditScore, boolean hasCoSigner) {
        System.out.printf("Student: %-10s | Score: %2d%% | Loan: ₹%,.2f | Credit: %d | CoSigner: %b%n",
                name, academicScore, loanAmount, creditScore, hasCoSigner);

        // Composite eligibility predicate:
        // (Score >= 80 OR Credit >= 720) AND (Loan <= ₹3,00,000 OR hasCoSigner)
        boolean isEligible = (academicScore >= 80 || creditScore >= 720) && (loanAmount <= 300000.0 || hasCoSigner);

        if (isEligible) {
            System.out.println("-> [LOAN APPROVED]: Education loan sanction letter dispatched!");
        } else {
            System.out.println("-> [LOAN REJECTED]: Does not meet credit/co-signer criteria.");
        }
        System.out.println();
    }
}
