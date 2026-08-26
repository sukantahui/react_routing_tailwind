/**
 * File: PassByValueMemoryMechanicsDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 5)
 * Description: Demonstrates why Java is strictly 100% Pass-by-Value for both primitives & references:
 *              1. Passing primitive values (copied on Stack; caller unaffected)
 *              2. Passing object reference addresses (copied reference address on Stack pointing to same Heap object)
 *              3. Mutating heap object fields vs reassigning parameter pointers
 *              for student fee ledger processing in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class PassByValueMemoryMechanicsDemo {

    public static class StudentRecord {
        private String name;
        private double feeBalance;

        public StudentRecord(String name, double feeBalance) {
            this.name = name;
            this.feeBalance = feeBalance;
        }

        public void setFeeBalance(double feeBalance) {
            this.feeBalance = feeBalance;
        }

        public double getFeeBalance() {
            return feeBalance;
        }

        @Override
        public String toString() {
            return String.format("%s (Balance: ₹%,.2f)", name, feeBalance);
        }
    }

    // =========================================================================
    // 1. PRIMITIVE PASS-BY-VALUE (Value copied on Stack)
    // =========================================================================
    public static void attemptPrimitiveModification(double fee) {
        System.out.printf("  [Inside Method] Received fee: ₹%,.2f%n", fee);
        fee = fee + 5000.0; // Modifies ONLY local stack frame slot!
        System.out.printf("  [Inside Method] Modified fee: ₹%,.2f%n", fee);
    }

    // =========================================================================
    // 2. REFERENCE PASS-BY-VALUE: Mutating Shared Heap Object
    // =========================================================================
    public static void modifyObjectInternalState(StudentRecord student, double discount) {
        System.out.printf("  [Inside Method] Received student: %s%n", student);
        // Mutates the shared object on the Heap:
        student.setFeeBalance(student.getFeeBalance() - discount);
        System.out.printf("  [Inside Method] After discount:   %s%n", student);
    }

    // =========================================================================
    // 3. REFERENCE PASS-BY-VALUE: Parameter Reassignment Fails on Caller
    // =========================================================================
    public static void attemptReferenceReassignment(StudentRecord student) {
        System.out.printf("  [Inside Method] Received pointer: %s%n", student);
        // Reassigning local parameter to point to a brand-new object on Heap:
        student = new StudentRecord("Replaced Student", 99999.0);
        System.out.printf("  [Inside Method] Reassigned local: %s%n", student);
        // Exiting method destroys this local stack pointer!
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 5 STRICT PASS-BY-VALUE PROOF");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // --- 1. PRIMITIVE PROOF ---
        System.out.println("--- 1. PRIMITIVE PASS-BY-VALUE PROOF ---");
        double originalFee = 12000.0;
        System.out.printf("  Before method call: originalFee = ₹%,.2f%n", originalFee);
        attemptPrimitiveModification(originalFee);
        System.out.printf("  After method call : originalFee = ₹%,.2f (100%% INTACT!)%n%n", originalFee);

        // --- 2. OBJECT MUTATION PROOF ---
        System.out.println("--- 2. OBJECT REFERENCE MUTATION PROOF ---");
        StudentRecord swadeep = new StudentRecord("Swadeep", 18000.0);
        System.out.printf("  Before discount: %s%n", swadeep);
        modifyObjectInternalState(swadeep, 3000.0);
        System.out.printf("  After discount : %s (MUTATED ON HEAP!)%n%n", swadeep);

        // --- 3. PARAMETER REASSIGNMENT PROOF ---
        System.out.println("--- 3. REFERENCE PARAMETER REASSIGNMENT PROOF ---");
        StudentRecord tuhina = new StudentRecord("Tuhina", 15000.0);
        System.out.printf("  Before reassignment call: %s%n", tuhina);
        attemptReferenceReassignment(tuhina);
        System.out.printf("  After reassignment call : %s (CALLER POINTER UNCHANGED!)%n%n", tuhina);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Java is ALWAYS 100% Pass-by-Value. There is NO Pass-by-Reference in Java.");
        System.out.println("2. For primitives, the raw binary value is copied into the stack frame.");
        System.out.println("3. For objects, the memory address pointer is copied into the stack frame.");
        System.out.println("4. Reassigning a parameter variable never alters the caller's reference pointer.");
        System.out.println("================================================================================");
    }
}
