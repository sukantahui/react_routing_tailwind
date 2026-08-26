/**
 * File: MethodOverloadingFoundationsDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 7)
 * Description: Demonstrates Method Overloading (Compile-Time Polymorphism) in Java (JLS §8.4.9):
 *              1. Overloading by parameter count (default argument emulation)
 *              2. Overloading by parameter data types (int vs double vs String)
 *              3. Overloading by parameter order (type sequence distinction)
 *              4. Method chaining / delegation between overloaded methods
 *              for student course fee calculation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class MethodOverloadingFoundationsDemo {

    // =========================================================================
    // 1. OVERLOADING BY PARAMETER COUNT (Base Tuition Calculation)
    // =========================================================================

    /**
     * Overload 1: Base fee calculation for 1 standard month
     */
    public static double calculateFee(double monthlyRate) {
        // Delegates to Overload 2 with default duration of 1 month:
        return calculateFee(monthlyRate, 1);
    }

    /**
     * Overload 2: Fee calculation for specified duration (in months)
     */
    public static double calculateFee(double monthlyRate, int months) {
        // Delegates to Overload 3 with default discount of 0%:
        return calculateFee(monthlyRate, months, 0.0);
    }

    /**
     * Overload 3: Full fee calculation with duration and scholarship discount rate
     */
    public static double calculateFee(double monthlyRate, int months, double discountRate) {
        double gross = monthlyRate * months;
        double discount = gross * discountRate;
        return gross - discount;
    }

    // =========================================================================
    // 2. OVERLOADING BY PARAMETER DATA TYPES
    // =========================================================================

    /**
     * Overload 4: Calculate fee by course units (integer count)
     */
    public static double calculateFee(int courseUnits) {
        double feePerUnit = 3500.0; // ₹3,500 per unit
        return courseUnits * feePerUnit;
    }

    /**
     * Overload 5: Calculate fee by predefined course code (String)
     */
    public static double calculateFee(String courseCode) {
        return switch (courseCode.toUpperCase()) {
            case "JAVA-CORE" -> 15000.0;
            case "FULLSTACK"  -> 25000.0;
            case "ACCOTAX"    -> 12000.0;
            default          -> 8000.0;
        };
    }

    // =========================================================================
    // 3. OVERLOADING BY PARAMETER ORDER
    // =========================================================================

    /**
     * Overload 6: Order = (String studentName, int studentId)
     */
    public static void displayStudentBadge(String studentName, int studentId) {
        System.out.printf("  [BADGE TYPE A] Name: %-12s | ID: CoderAccoTax-%04d%n", studentName, studentId);
    }

    /**
     * Overload 7: Order = (int studentId, String studentName)
     */
    public static void displayStudentBadge(int studentId, String studentName) {
        System.out.printf("  [BADGE TYPE B] ID: CoderAccoTax-%04d | Name: %-12s%n", studentId, studentName);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 7 METHOD OVERLOADING");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. OVERLOADING BY PARAMETER COUNT (CHAINED DELEGATION) ---\n");

        // Calling Overload 1 (1 parameter: rate only)
        double fee1 = calculateFee(4000.0);
        System.out.printf("  calculateFee(4000.0)             [1 Month]          : ₹%,.2f%n", fee1);

        // Calling Overload 2 (2 parameters: rate + months)
        double fee2 = calculateFee(4000.0, 6);
        System.out.printf("  calculateFee(4000.0, 6)          [6 Months]         : ₹%,.2f%n", fee2);

        // Calling Overload 3 (3 parameters: rate + months + discount)
        double fee3 = calculateFee(4000.0, 6, 0.15); // 15% discount for Swadeep
        System.out.printf("  calculateFee(4000.0, 6, 0.15)    [6 Mos + 15%% Disc]: ₹%,.2f%n%n", fee3);

        System.out.println("--- 2. OVERLOADING BY PARAMETER DATA TYPES ---\n");

        // Calling Overload 4 (int parameter: course units)
        double feeUnits = calculateFee(4); // 4 units
        System.out.printf("  calculateFee(4)                  [4 Units @ ₹3,500] : ₹%,.2f%n", feeUnits);

        // Calling Overload 5 (String parameter: course code)
        double feeCode = calculateFee("JAVA-CORE");
        System.out.printf("  calculateFee(\"JAVA-CORE\")        [Course Code]      : ₹%,.2f%n%n", feeCode);

        System.out.println("--- 3. OVERLOADING BY PARAMETER ORDER ---\n");

        // Calling Overload 6: (String, int)
        displayStudentBadge("Swadeep", 101);

        // Calling Overload 7: (int, String)
        displayStudentBadge(102, "Tuhina");

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Method Overloading = Same method name with different parameter signatures.");
        System.out.println("2. Signatures can differ by parameter count, parameter types, or parameter order.");
        System.out.println("3. Compile-time polymorphism: The compiler chooses the exact overload at build time.");
        System.out.println("4. Method chaining delegates smaller overloads to the most detailed master overload.");
        System.out.println("================================================================================");
    }
}
