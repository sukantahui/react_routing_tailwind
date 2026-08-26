/**
 * File: ShortCircuitEvaluationDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 10)
 * Description: Demonstrates short-circuit evaluation in Java (&& vs &, || vs |),
 *              defensive null-guard patterns (preventing NullPointerException),
 *              state mutation traps with skipped side-effects (++counter, payment processing),
 *              and student enrollment validation in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class ShortCircuitEvaluationDemo {

    private static int sideEffectCounter = 0;

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 10 SHORT-CIRCUIT EVALUATION (&& VS &, || VS |)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Defensive Null-Guard Pattern (Short-Circuit && Prevents NullPointerException)
        System.out.println("--- 1. DEFENSIVE NULL-GUARD PATTERN (&&) ---");
        StudentAccount nullStudent = null;

        // SAFE: Short-circuit && skips the right operand when left is false:
        if (nullStudent != null && nullStudent.isFeeCleared()) {
            System.out.println("Student has access.");
        } else {
            System.out.println("✓ Safe Null-Guard: nullStudent is null, right operand was NEVER evaluated (No NullPointerException)!");
        }

        // DANGEROUS: Eager '&' operator evaluates BOTH operands regardless of left result:
        try {
            boolean dangerousCheck = (nullStudent != null) & nullStudent.isFeeCleared();
        } catch (NullPointerException e) {
            System.out.println("✓ Caught NPE with Eager '&': Non-short-circuit '&' evaluated nullStudent.isFeeCleared()!");
        }
        System.out.println();

        // 2. Short-Circuit Division-by-Zero Guard
        System.out.println("--- 2. SHORT-CIRCUIT DIVISION-BY-ZERO GUARD ---");
        int count = 0;
        int totalMarks = 500;

        // SAFE: (count != 0) is false, so (totalMarks / count > 50) is SKIPPED!
        if (count != 0 && (totalMarks / count > 50)) {
            System.out.println("Average passed threshold.");
        } else {
            System.out.println("✓ Zero-divisor protected: Division by zero was short-circuited safely without ArithmeticException!\n");
        }

        // 3. Side-Effect Traps: Skipped Variable Increments
        System.out.println("--- 3. SIDE-EFFECT TRAPS WITH SHORT-CIRCUITING ---");
        int testX = 10;
        sideEffectCounter = 0;

        // Short-circuit AND (false && ...):
        boolean resAnd = (testX > 20) && (++sideEffectCounter > 0);
        System.out.printf("After 'false && (++counter > 0)' -> resAnd = %b | counter = %d (SKIPPED!)%n",
                resAnd, sideEffectCounter);

        // Eager AND (false & ...):
        boolean resEagerAnd = (testX > 20) & (++sideEffectCounter > 0);
        System.out.printf("After 'false &  (++counter > 0)' -> resEager = %b | counter = %d (EXECUTED!)%n%n",
                resEagerAnd, sideEffectCounter);

        // Short-circuit OR (true || ...):
        sideEffectCounter = 0;
        boolean resOr = (testX == 10) || (++sideEffectCounter > 0);
        System.out.printf("After 'true  || (++counter > 0)' -> resOr = %b | counter = %d (SKIPPED!)%n",
                resOr, sideEffectCounter);

        // Eager OR (true | ...):
        boolean resEagerOr = (testX == 10) | (++sideEffectCounter > 0);
        System.out.printf("After 'true  |  (++counter > 0)' -> resEager = %b | counter = %d (EXECUTED!)%n%n",
                resEagerOr, sideEffectCounter);

        // 4. Critical Business Logic Trap: Method Calls with Side Effects in Conditions
        System.out.println("--- 4. CRITICAL BUSINESS HAZARD: SKIPPED TRANSACTION METHODS ---");
        StudentAccount swadeepAcc = new StudentAccount("Swadeep", 15000.0, true);

        // HAZARD: Because swadeepAcc.isScholarshipEligible() is TRUE, processFeePayment() is NEVER called!
        if (swadeepAcc.isScholarshipEligible() || swadeepAcc.processFeePayment(15000.0)) {
            System.out.println("✓ Condition evaluated to true, BUT did payment process?");
        }
        System.out.printf("Swadeep Account Paid Status: %b (Payment was SKIPPED due to '||' short-circuit!)%n%n",
                swadeepAcc.isPaid());

        // 5. Correct Enterprise Pattern: Separate Execution from Condition Checking
        System.out.println("--- 5. ENTERPRISE BEST PRACTICE: SEPARATE ACTION FROM CONDITION ---");
        StudentAccount tuhinaAcc = new StudentAccount("Tuhina", 22000.0, false);
        boolean paymentSuccess = tuhinaAcc.processFeePayment(22000.0);

        if (paymentSuccess && tuhinaAcc.isFeeCleared()) {
            System.out.printf("Tuhina enrolled successfully in Barrackpore. Paid: ₹%,.2f%n", 22000.0);
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. '&&' stops immediately on FIRST false; '||' stops on FIRST true.");
        System.out.println("2. Use '&&' for defensive null guards (obj != null && obj.isValid()).");
        System.out.println("3. Non-short-circuit '&' and '|' always evaluate both sides (dangerous with null).");
        System.out.println("4. Never place state-mutating methods or ++/-- inside short-circuit conditions.");
        System.out.println("================================================================================");
    }

    private static class StudentAccount {
        private final String name;
        private final double courseFee;
        private final boolean isScholarship;
        private boolean isPaid;

        public StudentAccount(String name, double courseFee, boolean isScholarship) {
            this.name = name;
            this.courseFee = courseFee;
            this.isScholarship = isScholarship;
            this.isPaid = false;
        }

        public boolean isFeeCleared() {
            return isPaid || isScholarship;
        }

        public boolean isScholarshipEligible() {
            return isScholarship;
        }

        public boolean processFeePayment(double amount) {
            System.out.printf(" -> Executing payment transaction of ₹%,.2f for %s...%n", amount, name);
            this.isPaid = true;
            return true;
        }

        public boolean isPaid() {
            return isPaid;
        }
    }
}
