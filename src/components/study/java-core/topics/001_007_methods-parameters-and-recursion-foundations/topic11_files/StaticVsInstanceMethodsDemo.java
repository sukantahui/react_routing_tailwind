/**
 * File: StaticVsInstanceMethodsDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 11)
 * Description: Side-by-side introductory comparison of Static Methods vs Instance Methods (JLS §8.4.3.2):
 *              1. Static methods as class-level utilities (no 'this', called via ClassName.method)
 *              2. Instance methods as object-level behavior (implicit 'this', called on heap instances)
 *              3. Shared class constants/counters vs individual object instance states
 *              for student fee accounts in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class StaticVsInstanceMethodsDemo {

    // =========================================================================
    // STUDENT ADMISSION ACCOUNT CLASS
    // =========================================================================
    public static class StudentAccount {
        // --- Static (Class-Level) Fields ---
        public static final String INSTITUTE_NAME = "Coder & AccoTax";
        public static final String MAIN_CAMPUS = "Barrackpore, West Bengal";
        private static int totalEnrolledStudents = 0; // Shared across all instances

        // --- Instance (Object-Level) Fields ---
        private String studentName;
        private String enrolledCourse;
        private double feeBalance;

        // Constructor
        public StudentAccount(String studentName, String enrolledCourse, double feeBalance) {
            this.studentName = studentName;
            this.enrolledCourse = enrolledCourse;
            this.feeBalance = feeBalance;
            totalEnrolledStudents++; // Increments shared static counter
        }

        // =====================================================================
        // 1. INSTANCE METHODS (Operate on specific object instance via 'this')
        // =====================================================================
        public void makePayment(double amount) {
            if (amount <= 0) {
                System.out.println("  [ERROR] Payment amount must be positive.");
                return;
            }
            this.feeBalance -= amount; // Accesses this instance's field
            System.out.printf("  [INSTANCE METHOD: makePayment] %s paid ₹%,.2f. Remaining Balance: ₹%,.2f%n",
                    this.studentName, amount, this.feeBalance);
        }

        public void printAccountSummary() {
            System.out.printf("  [STUDENT SUMMARY] %-12s | Course: %-10s | Balance: ₹%,.2f%n",
                    this.studentName, this.enrolledCourse, this.feeBalance);
        }

        // =====================================================================
        // 2. STATIC METHODS (Class-level utilities, NO 'this' pointer)
        // =====================================================================
        public static double calculateStandardGst(double taxableAmount) {
            // Cannot use 'this.studentName' here! Belongs to the class globally.
            return taxableAmount * 0.18; // 18% GST
        }

        public static int getTotalEnrolledStudents() {
            return totalEnrolledStudents;
        }

        public static void printInstituteHeader() {
            System.out.println("================================================================================");
            System.out.printf("%s - Academic Ledger%n", INSTITUTE_NAME);
            System.out.printf("Main Campus: %s | Total Enrolled: %d%n", MAIN_CAMPUS, totalEnrolledStudents);
            System.out.println("================================================================================\n");
        }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 11 STATIC VS INSTANCE METHODS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Calling Static Utility Method BEFORE any object is instantiated:
        double rawFee = 20000.0;
        double gst = StudentAccount.calculateStandardGst(rawFee);
        System.out.printf("1. Calling Static Utility Method without 'new':%n");
        System.out.printf("   StudentAccount.calculateStandardGst(₹%,.2f) = ₹%,.2f (18%% GST)%n%n", rawFee, gst);

        // 2. Creating Individual Object Instances on Heap:
        System.out.println("2. Instantiating Student Accounts on Heap:\n");
        StudentAccount swadeep = new StudentAccount("Swadeep", "Java Core", 18000.0);
        StudentAccount tuhina = new StudentAccount("Tuhina", "FullStack", 25000.0);
        StudentAccount abhronila = new StudentAccount("Abhronila", "AccoTax", 12000.0);

        // 3. Invoking Instance Methods on specific object instances:
        System.out.println("3. Invoking Instance Methods (Targeting individual object states):\n");
        swadeep.makePayment(6000.0);
        tuhina.makePayment(10000.0);
        abhronila.makePayment(4000.0);

        System.out.println();
        swadeep.printAccountSummary();
        tuhina.printAccountSummary();
        abhronila.printAccountSummary();

        // 4. Calling Static Method to display shared class state:
        System.out.println("\n4. Calling Static Method to inspect shared class state:\n");
        StudentAccount.printInstituteHeader();

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Static methods belong to the Class and are invoked via ClassName.method().");
        System.out.println("2. Static methods have NO 'this' reference and cannot directly access instance fields.");
        System.out.println("3. Instance methods belong to specific objects on the Heap and mutate 'this' state.");
        System.out.println("4. Use static methods for pure calculations/utilities; instance methods for object logic.");
        System.out.println("================================================================================");
    }
}
