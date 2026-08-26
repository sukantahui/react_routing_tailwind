/**
 * File: ParameterReassignmentVsMutationDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 6)
 * Description: In-depth side-by-side comparison of Parameter Re-assignment vs Object Internal State Mutation:
 *              1. Mutating object fields via setter methods (alters shared Heap instance)
 *              2. Mutating array elements in-place (alters shared Heap array)
 *              3. Reassigning parameter references (only changes local stack frame pointer)
 *              4. Applying 'final' parameter modifiers to prevent accidental reassignment
 *              for student fee ledgers in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

import java.util.Arrays;

public class ParameterReassignmentVsMutationDemo {

    public static class StudentAccount {
        private String studentName;
        private double feeBalance;

        public StudentAccount(String studentName, double feeBalance) {
            this.studentName = studentName;
            this.feeBalance = feeBalance;
        }

        public void deductScholarship(double amount) {
            this.feeBalance -= amount;
        }

        public double getFeeBalance() {
            return feeBalance;
        }

        public String getStudentName() {
            return studentName;
        }

        @Override
        public String toString() {
            return String.format("%s (Balance: ₹%,.2f)", studentName, feeBalance);
        }
    }

    // =========================================================================
    // 1. IN-PLACE MUTATION (Affects Caller's Shared Heap Object)
    // =========================================================================
    public static void applyScholarshipMutation(StudentAccount account, double scholarshipAmount) {
        System.out.printf("  [MUTATION METHOD] Applying scholarship of ₹%,.2f to %s%n", scholarshipAmount, account.getStudentName());
        // Dereferences the stack pointer and modifies the Heap instance fields:
        account.deductScholarship(scholarshipAmount);
    }

    // =========================================================================
    // 2. PARAMETER RE-ASSIGNMENT (Fails to Affect Caller)
    // =========================================================================
    public static void resetAccountReassignment(StudentAccount account) {
        System.out.println("  [REASSIGN METHOD] Attempting to reassign parameter to a new account...");
        // Overwrites ONLY the local stack frame pointer slot:
        account = new StudentAccount("Ghost Account", 0.0);
        System.out.printf("  [REASSIGN METHOD] Local parameter now points to: %s%n", account);
        // Exiting method discards this local pointer; caller's reference remains untouched!
    }

    // =========================================================================
    // 3. ARRAY MUTATION VS ARRAY REASSIGNMENT
    // =========================================================================
    public static void mutateArrayElements(double[] fees, double bonus) {
        for (int i = 0; i < fees.length; i++) {
            fees[i] += bonus; // Mutates elements in shared Heap array!
        }
    }

    public static void reassignArrayParameter(double[] fees) {
        fees = new double[]{9999.0, 9999.0, 9999.0}; // Reassigns local stack pointer only!
    }

    // =========================================================================
    // 4. DEFENSIVE CODING WITH 'final' PARAMETERS
    // =========================================================================
    public static void secureMethodWithFinalParam(final StudentAccount account, double deduction) {
        // account = new StudentAccount("Hacked", 0); // COMPILE ERROR! Cannot assign to final parameter
        account.deductScholarship(deduction); // Legal: 'final' protects pointer, not internal state!
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 6 REASSIGNMENT VS MUTATION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // --- TEST 1: OBJECT MUTATION ---
        System.out.println("--- 1. TESTING OBJECT INTERNAL MUTATION ---");
        StudentAccount swadeep = new StudentAccount("Swadeep", 20000.0);
        System.out.printf("  Initial State  : %s%n", swadeep);
        applyScholarshipMutation(swadeep, 5000.0);
        System.out.printf("  After Mutation : %s (MUTATED ON HEAP!)%n%n", swadeep);

        // --- TEST 2: PARAMETER REASSIGNMENT ---
        System.out.println("--- 2. TESTING PARAMETER REASSIGNMENT ---");
        StudentAccount tuhina = new StudentAccount("Tuhina", 15000.0);
        System.out.printf("  Initial State      : %s%n", tuhina);
        resetAccountReassignment(tuhina);
        System.out.printf("  After Reassignment : %s (CALLER UNCHANGED!)%n%n", tuhina);

        // --- TEST 3: ARRAY MUTATION VS REASSIGNMENT ---
        System.out.println("--- 3. TESTING ARRAY MUTATION VS REASSIGNMENT ---");
        double[] batchFees = {12000.0, 15000.0, 18000.0};
        System.out.printf("  Original Array : %s%n", Arrays.toString(batchFees));

        mutateArrayElements(batchFees, 1000.0);
        System.out.printf("  After Mutation : %s (ELEMENTS MODIFIED!)%n", Arrays.toString(batchFees));

        reassignArrayParameter(batchFees);
        System.out.printf("  After Reassign : %s (ARRAY REMAINS UNCHANGED!)%n%n", Arrays.toString(batchFees));

        // --- TEST 4: SECURE FINAL PARAMETER ---
        System.out.println("--- 4. TESTING 'final' PARAMETER PROTECTION ---");
        StudentAccount abhronila = new StudentAccount("Abhronila", 16000.0);
        secureMethodWithFinalParam(abhronila, 2000.0);
        System.out.printf("  Abhronila Record: %s%n", abhronila);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. In-place mutation dereferences the pointer to change Heap state.");
        System.out.println("2. Parameter reassignment modifies only the local stack frame pointer variable.");
        System.out.println("3. 'final' keyword prevents accidental reassignment inside method bodies.");
        System.out.println("4. To make an object truly immutable, make its fields private and final.");
        System.out.println("================================================================================");
    }
}
