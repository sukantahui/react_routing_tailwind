/**
 * File: MethodModularizationDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 0)
 * Description: Demonstrates what a Java method is and why modularization is critical:
 *              1. Monolithic spaghetti code vs. Clean modular methods (Single Responsibility Principle)
 *              2. Code reusability, maintainability, unit testability, and abstraction
 *              for student invoice calculation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class MethodModularizationDemo {

    // =========================================================================
    // MODULAR METHOD 1: Calculate Gross Fee based on course units
    // =========================================================================
    public static double calculateGrossFee(double baseFeePerUnit, int units) {
        if (units <= 0 || baseFeePerUnit <= 0) {
            return 0.0;
        }
        return baseFeePerUnit * units;
    }

    // =========================================================================
    // MODULAR METHOD 2: Calculate Early-Bird or Merit Scholarship Discount
    // =========================================================================
    public static double calculateDiscount(double grossFee, double discountRate) {
        if (discountRate < 0.0 || discountRate > 1.0) {
            return 0.0;
        }
        return grossFee * discountRate;
    }

    // =========================================================================
    // MODULAR METHOD 3: Apply Goods and Services Tax (GST 18%)
    // =========================================================================
    public static double calculateGst(double taxableAmount, double gstRate) {
        return taxableAmount * gstRate;
    }

    // =========================================================================
    // MODULAR METHOD 4: Format and Print Clean Student Fee Invoice
    // =========================================================================
    public static void printStudentInvoice(String studentName, String campus, double gross, double discount, double gst, double netPayable) {
        System.out.println("  --------------------------------------------------");
        System.out.printf("  STUDENT INVOICE: %-15s | CAMPUS: %s%n", studentName, campus);
        System.out.println("  --------------------------------------------------");
        System.out.printf("  Gross Tuition Fee   : ₹%,10.2f%n", gross);
        System.out.printf("  Scholarship Discount: -₹%,9.2f%n", discount);
        System.out.printf("  GST (18%%)           : +₹%,9.2f%n", gst);
        System.out.println("  --------------------------------------------------");
        System.out.printf("  NET TOTAL PAYABLE   : ₹%,10.2f%n", netPayable);
        System.out.println("  --------------------------------------------------\n");
    }

    // =========================================================================
    // HIGH-LEVEL COORDINATOR METHOD: Process Single Student Enrollment
    // =========================================================================
    public static void processEnrollment(String studentName, String campus, double baseFee, int units, double discountRate) {
        // Step 1: Calculate Gross Fee
        double gross = calculateGrossFee(baseFee, units);

        // Step 2: Calculate Discount
        double discount = calculateDiscount(gross, discountRate);
        double taxableAmount = gross - discount;

        // Step 3: Calculate GST (18%)
        double gst = calculateGst(taxableAmount, 0.18);

        // Step 4: Compute Net Payable
        double netPayable = taxableAmount + gst;

        // Step 5: Delegate formatting to presentation method
        printStudentInvoice(studentName, campus, gross, discount, gst, netPayable);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 0 METHOD MODULARIZATION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- PROCESSING BATCH ENROLLMENTS VIA MODULAR ARCHITECTURE ---\n");

        // Processing batch enrollments across Barrackpore, Naihati, Shyamnagar, and Ichapur:
        processEnrollment("Swadeep", "Barrackpore", 4000.0, 4, 0.10); // 10% discount
        processEnrollment("Tuhina", "Naihati", 5000.0, 3, 0.15);      // 15% discount
        processEnrollment("Abhronila", "Shyamnagar", 4500.0, 4, 0.05); // 5% discount
        processEnrollment("Debangshu", "Ichapur", 6000.0, 2, 0.00);    // No discount

        System.out.println("================================================================================");
        System.out.println("WHY MODULARIZATION WINS IN ENTERPRISE SOFTWARE:");
        System.out.println("1. DRY (Don't Repeat Yourself): Tax/discount logic is written once and reused.");
        System.out.println("2. Single Responsibility: Each method does exactly ONE well-defined task.");
        System.out.println("3. Testability: Individual calculation methods can be isolated in JUnit tests.");
        System.out.println("4. Maintainability: Changing GST from 18% to 12% requires editing only one line.");
        System.out.println("================================================================================");
    }
}
