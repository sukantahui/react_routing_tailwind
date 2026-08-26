/**
 * File: MethodDeclarationAnatomyDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 1)
 * Description: Dissects the complete anatomy of Java method declarations (JLS §8.4):
 *              1. Access Modifiers (public, protected, private, package-private)
 *              2. Non-Access Modifiers (static, final, synchronized)
 *              3. Return Types (primitives, objects, void)
 *              4. Method Name & Signature definition
 *              5. Formal Parameter List
 *              6. Throws Clause / Exception List
 *              7. Method Body and return statement semantics
 *              for student fee processing in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class MethodDeclarationAnatomyDemo {

    /**
     * Complete Method Declaration Anatomy:
     * [Access Modifier] [Non-Access Modifier] [Return Type] [Method Name]([Parameter List]) [Throws Clause] { [Method Body] }
     *
     * Method Signature: processFeeDeduction(String, double, double)
     */
    public static final double processFeeDeduction(String studentName, double currentBalance, double deductionAmount)
            throws IllegalArgumentException {

        // --- METHOD BODY BEGINS ---

        // 1. Guard Clause & Defensive Argument Validation
        if (deductionAmount <= 0.0) {
            throw new IllegalArgumentException("Deduction amount must be positive! Provided: ₹" + deductionAmount);
        }

        if (currentBalance < deductionAmount) {
            throw new IllegalArgumentException("Insufficient funds for " + studentName + "! Balance: ₹" + currentBalance + ", Required: ₹" + deductionAmount);
        }

        // 2. Business Computation
        double newBalance = currentBalance - deductionAmount;

        // 3. Output Presentation
        System.out.printf("  [SUCCESS] Processed fee deduction of ₹%,.2f for %s. New Balance: ₹%,.2f%n",
                deductionAmount, studentName, newBalance);

        // 4. Return Statement
        return newBalance;

        // --- METHOD BODY ENDS ---
    }

    /**
     * Void Method (No return value, performs an action)
     */
    public static void displayCampusHeader(String campusName, String educator) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 1 METHOD DECLARATION ANATOMY");
        System.out.printf("Campus: %s | Educator: %s%n", campusName, educator);
        System.out.println("================================================================================\n");
    }

    public static void main(String[] args) {
        // Invoking void method:
        displayCampusHeader("Barrackpore, West Bengal", "Sukanta Hui");

        System.out.println("--- TESTING METHOD EXECUTION & EXCEPTION HANDLING ---\n");

        double swadeepBalance = 25000.0;
        double tuhinaBalance = 15000.0;

        try {
            // Valid Deduction:
            swadeepBalance = processFeeDeduction("Swadeep", swadeepBalance, 12000.0);
            tuhinaBalance = processFeeDeduction("Tuhina", tuhinaBalance, 5000.0);

            // Attempting Invalid Negative Deduction (Triggers Exception):
            processFeeDeduction("Abhronila", 18000.0, -2000.0);

        } catch (IllegalArgumentException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION]: " + e.getMessage() + "\n");
        }

        try {
            // Attempting Insufficient Balance Deduction:
            processFeeDeduction("Debangshu", 3000.0, 10000.0);

        } catch (IllegalArgumentException e) {
            System.out.println("  [CAUGHT EXPECTED EXCEPTION]: " + e.getMessage() + "\n");
        }

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Method Signature = Method Name + Parameter Types (Return type is NOT in signature).");
        System.out.println("2. Return type 'void' means the method produces no value to the caller.");
        System.out.println("3. 'throws' clause documents potential exceptions thrown by the method body.");
        System.out.println("4. 'final' keyword prevents subclasses from overriding the method implementation.");
        System.out.println("================================================================================");
    }
}
