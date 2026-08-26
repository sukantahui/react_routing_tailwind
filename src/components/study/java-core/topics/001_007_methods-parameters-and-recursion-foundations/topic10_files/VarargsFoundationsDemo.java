/**
 * File: VarargsFoundationsDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 10)
 * Description: Demonstrates Variable Arguments (Varargs - Type... varName) in Java (JLS §8.4.1):
 *              1. Varargs syntax and internal array translation: Type... -> Type[]
 *              2. The Single-Last-Parameter rule (at most one varargs, must be last parameter)
 *              3. Passing 0 arguments, discrete arguments, and explicit arrays
 *              4. Heap pollution awareness & @SafeVarargs annotation
 *              for batch tuition fee summation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

import java.util.Arrays;

public class VarargsFoundationsDemo {

    /**
     * Standard Varargs Method:
     * - 'campusName' -> Fixed initial parameter
     * - 'fees'       -> Varargs parameter (must be LAST)
     */
    public static double calculateBatchTotal(String campusName, double... fees) {
        // Under the hood, 'fees' is treated as a double[] array:
        double total = 0.0;
        for (double fee : fees) {
            total += fee;
        }

        System.out.printf("  [CAMPUS: %-12s] Count: %2d fees | Array: %-25s | Total: ₹%,.2f%n",
                campusName, fees.length, Arrays.toString(fees), total);
        return total;
    }

    /**
     * Overloaded Fixed-Arity vs Varargs:
     * Fixed-arity method is prioritized when exact number of arguments match!
     */
    public static void displayFeeRecord(String student, double fee) {
        System.out.printf("  [FIXED 1-PARAM] %s single fee: ₹%,.2f%n", student, fee);
    }

    public static void displayFeeRecord(String student, double... fees) {
        System.out.printf("  [VARARGS N-PARAM] %s multiple fees (%d items)%n", student, fees.length);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 10 VARIABLE ARGUMENTS (VARARGS)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. CALLING VARARGS WITH DIVERSE ARGUMENT COUNTS ---\n");

        // Call 1: Passing ZERO varargs arguments (creates empty array double[0])
        calculateBatchTotal("Barrackpore");

        // Call 2: Passing 2 discrete arguments for Swadeep & Tuhina
        calculateBatchTotal("Barrackpore", 12000.0, 15000.0);

        // Call 3: Passing 4 discrete arguments across Shyamnagar & Ichapur
        calculateBatchTotal("Naihati", 10000.0, 14000.0, 18000.0, 22000.0);

        // Call 4: Passing an explicit double[] array directly
        double[] preAllocatedFees = {16000.0, 19000.0, 21000.0};
        calculateBatchTotal("Shyamnagar", preAllocatedFees);

        System.out.println("\n--- 2. FIXED-ARITY VS VARARGS RESOLUTION PRECEDENCE ---\n");

        // Passing 1 fee matches the fixed-arity method first:
        displayFeeRecord("Abhronila", 15000.0);

        // Passing 3 fees matches the varargs method:
        displayFeeRecord("Debangshu", 5000.0, 8000.0, 12000.0);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Varargs (Type... name) allows 0 to N arguments without manual array creation.");
        System.out.println("2. The varargs parameter MUST be the last parameter in the method signature.");
        System.out.println("3. A method can declare at most ONE varargs parameter.");
        System.out.println("4. Calling varargs with zero arguments creates a non-null empty array (length 0).");
        System.out.println("================================================================================");
    }
}
