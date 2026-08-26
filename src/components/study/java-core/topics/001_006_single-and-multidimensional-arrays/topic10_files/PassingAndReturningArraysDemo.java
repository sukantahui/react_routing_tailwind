/**
 * File: PassingAndReturningArraysDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 10)
 * Description: Demonstrates passing and returning arrays in Java methods (JLS §8.4):
 *              pass-by-value reference semantics (in-place element mutations vs reference reassignment),
 *              factory methods returning newly allocated arrays, returning empty arrays (new int[0]) vs null,
 *              and student discount processing in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class PassingAndReturningArraysDemo {

    /**
     * Mutates the caller's array elements in-place by applying a fee waiver discount.
     */
    public static void applyInstitutionalDiscount(double[] fees, double discountAmount) {
        for (int i = 0; i < fees.length; i++) {
            fees[i] = Math.max(0.0, fees[i] - discountAmount);
        }
    }

    /**
     * Demonstrates that parameter reference reassignment has NO effect on caller.
     */
    public static void attemptReferenceReassignment(double[] fees) {
        // Reassigns the local parameter variable to a new array object:
        fees = new double[]{99999.0, 99999.0};
    }

    /**
     * Factory method that creates, populates, and returns a newly allocated array.
     */
    public static double[] createBonusScholarshipArray(int count, double bonusPerStudent) {
        if (count <= 0) return new double[0]; // Return empty array instead of null!
        double[] bonuses = new double[count];
        Arrays.fill(bonuses, bonusPerStudent);
        return bonuses;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 10 PASSING & RETURNING ARRAYS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] batchFees = {12000.0, 15000.0, 18000.0, 14000.0};
        System.out.println("  Initial batch fees: " + Arrays.toString(batchFees));

        // 1. Passing Array to Method (In-Place Mutation)
        System.out.println("\n--- 1. IN-PLACE ELEMENT MUTATION VIA METHOD PASSING ---");
        applyInstitutionalDiscount(batchFees, 1500.0);
        System.out.println("  Fees after applying ₹1,500 waiver: " + Arrays.toString(batchFees));
        System.out.println("  ✓ Elements in caller's array were mutated in-place on the Heap!");

        // 2. Reference Reassignment Proof
        System.out.println("\n--- 2. PARAMETER REASSIGNMENT IMMUNITY ---");
        attemptReferenceReassignment(batchFees);
        System.out.println("  Fees after attemptReferenceReassignment(): " + Arrays.toString(batchFees));
        System.out.println("  ✓ Caller's reference variable was completely unaffected!");

        // 3. Returning Newly Allocated Arrays
        System.out.println("\n--- 3. RETURNING ARRAYS FROM METHODS ---");
        double[] festivalBonuses = createBonusScholarshipArray(4, 2500.0);
        System.out.println("  Returned bonus scholarships: " + Arrays.toString(festivalBonuses));

        double[] emptyBonuses = createBonusScholarshipArray(0, 2500.0);
        System.out.printf("  Empty call returned non-null array with length: %d%n%n", emptyBonuses.length);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Java passes array reference addresses by value (copied pointer).");
        System.out.println("2. Methods CAN modify the caller's array elements directly in Heap memory.");
        System.out.println("3. Reassigning the parameter 'arr = new int[5]' does NOT affect the caller.");
        System.out.println("4. Always return empty arrays (new int[0]) instead of null to prevent NPEs.");
        System.out.println("================================================================================");
    }
}
