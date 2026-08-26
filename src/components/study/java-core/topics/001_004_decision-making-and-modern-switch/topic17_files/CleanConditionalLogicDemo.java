/**
 * File: CleanConditionalLogicDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 17)
 * Description: Demonstrates architectural best practices for clean, maintainable conditional logic:
 *              eliminating the Pyramid of Doom (Arrow Anti-Pattern) via Guard Clauses and Early Returns,
 *              extracting explanatory boolean query methods, ternary operator discipline,
 *              and student enrollment verification in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class CleanConditionalLogicDemo {

    public record Student(String name, int academicScore, boolean hasValidId, double paymentDeposit) {}

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 17 CLEAN CONDITIONAL LOGIC BEST PRACTICES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        Student validStudent = new Student("Swadeep", 88, true, 15000.0);
        Student lowScoreStudent = new Student("Debangshu", 45, true, 12000.0);
        Student missingIdStudent = new Student("Tuhina", 92, false, 15000.0);

        // 1. Anti-Pattern: The Pyramid of Doom (Deeply Nested If-Else)
        System.out.println("--- 1. ANTI-PATTERN: THE PYRAMID OF DOOM (DEEP NESTING) ---");
        processAdmissionPyramidOfDoom(validStudent);

        // 2. Clean Architecture: Guard Clauses (Early Returns / Bouncer Pattern)
        System.out.println("\n--- 2. CLEAN ARCHITECTURE: GUARD CLAUSES & EARLY RETURNS ---");
        processAdmissionWithGuardClauses(validStudent);
        processAdmissionWithGuardClauses(lowScoreStudent);
        processAdmissionWithGuardClauses(missingIdStudent);

        // 3. Explanatory Helper Methods & Ternary Discipline
        System.out.println("\n--- 3. EXPLANATORY HELPER METHODS & TERNARY DISCIPLINE ---");
        auditScholarshipEligibility(validStudent);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Replace deeply nested 'Pyramid of Doom' logic with early-return Guard Clauses.");
        System.out.println("2. Keep the 'Happy Path' left-aligned and unnested for maximum readability.");
        System.out.println("3. Extract complex composite boolean conditions into descriptive helper methods.");
        System.out.println("4. Use ternary operators strictly for simple 2-way assignments; NEVER nest ternaries!");
        System.out.println("================================================================================");
    }

    /**
     * ANTI-PATTERN: Deeply nested "Pyramid of Doom" / Arrow Anti-Pattern.
     * High cognitive complexity, hard to read, prone to regression bugs.
     */
    private static void processAdmissionPyramidOfDoom(Student s) {
        System.out.print("[Pyramid Pattern]: ");
        if (s != null) {
            if (s.hasValidId()) {
                if (s.academicScore() >= 50) {
                    if (s.paymentDeposit() >= 10000.0) {
                        System.out.printf("Admission Approved for %s (Fee Paid: ₹%,.2f)%n",
                                s.name(), s.paymentDeposit());
                    } else {
                        System.out.println("Rejected: Insufficient deposit fee.");
                    }
                } else {
                    System.out.println("Rejected: Academic score below 50%.");
                }
            } else {
                System.out.println("Rejected: Missing government identity proof.");
            }
        } else {
            System.out.println("Rejected: Student record is null.");
        }
    }

    /**
     * CLEAN BEST PRACTICE: Guard Clauses (Bouncer Pattern).
     * Linear, flat, early-exit, zero cognitive debt.
     */
    private static void processAdmissionWithGuardClauses(Student s) {
        System.out.printf("[Guard Pattern] Evaluating %-10s -> ", (s != null ? s.name() : "null"));

        // Guard 1: Null check
        if (s == null) {
            System.out.println("REJECTED: Student record is null.");
            return;
        }

        // Guard 2: Identity proof check
        if (!s.hasValidId()) {
            System.out.println("REJECTED: Missing government identity proof.");
            return;
        }

        // Guard 3: Academic merit check
        if (s.academicScore() < 50) {
            System.out.println("REJECTED: Academic score below 50%.");
            return;
        }

        // Guard 4: Financial deposit check (₹10,000 minimum)
        if (s.paymentDeposit() < 10000.0) {
            System.out.println("REJECTED: Insufficient initial tuition deposit.");
            return;
        }

        // --- HAPPY PATH (Left-aligned, zero nesting!) ---
        System.out.printf("✓ ADMISSION APPROVED! (Tuition Deposit: ₹%,.2f)%n", s.paymentDeposit());
    }

    private static void auditScholarshipEligibility(Student s) {
        // Clean, self-documenting code via extracted boolean query:
        if (isEligibleForHonorsScholarship(s)) {
            System.out.printf("✓ %s qualifies for 50%% Honors Scholarship in Barrackpore!%n", s.name());
        } else {
            System.out.printf("• %s enrolled under standard tuition guidelines.%n", s.name());
        }
    }

    // Explanatory Boolean Query Method:
    private static boolean isEligibleForHonorsScholarship(Student s) {
        return s != null && s.hasValidId() && s.academicScore() >= 85 && s.paymentDeposit() >= 15000.0;
    }
}
