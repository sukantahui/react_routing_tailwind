/**
 * File: ArrayIndexOutOfBoundsPreventionDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 7)
 * Description: Demonstrates root causes and defensive prevention strategies for ArrayIndexOutOfBoundsException (JLS §10.4):
 *              reproducing off-by-one loop bugs (<= vs <), negative index traps, empty array indexing,
 *              defensive boundary guards, and secure student roll lookup in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

public class ArrayIndexOutOfBoundsPreventionDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 7 ARRAY INDEX OUT OF BOUNDS PREVENTION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] studentFees = {12000.0, 15000.0, 18000.0, 14000.0}; // Length = 4 (Indices 0, 1, 2, 3)

        // 1. Root Cause 1: Off-by-One in Loop Condition (<= instead of <)
        System.out.println("--- 1. ROOT CAUSE 1: OFF-BY-ONE LOOP TRAP ---");
        try {
            System.out.println("  Attempting loop with: 'i <= studentFees.length'...");
            for (int i = 0; i <= studentFees.length; i++) {
                System.out.printf("    Slot [%d]: ₹%,.2f%n", i, studentFees[i]);
            }
        } catch (ArrayIndexOutOfBoundsException ex) {
            System.out.printf("  ❌ CAUGHT EXCEPTION: %s%n", ex.getMessage());
            System.out.println("  Fix: Always use strict '<' inequality in loop headers: 'i < studentFees.length'.\n");
        }

        // 2. Root Cause 2: Negative Index Access
        System.out.println("--- 2. ROOT CAUSE 2: NEGATIVE INDEX ATTEMPT ---");
        try {
            int negativeIdx = -1;
            System.out.printf("  Attempting access at: studentFees[%d]...%n", negativeIdx);
            double val = studentFees[negativeIdx];
        } catch (ArrayIndexOutOfBoundsException ex) {
            System.out.printf("  ❌ CAUGHT EXCEPTION: %s%n", ex.getMessage());
            System.out.println("  Fix: Java does NOT support negative indices; valid range is [0 to length-1].\n");
        }

        // 3. Defensive Prevention Strategies (Safe Lookups)
        System.out.println("--- 3. DEFENSIVE BOUNDARY GUARD STRATEGY ---");
        int requestedSlot = 5; // Out-of-bounds query

        if (requestedSlot >= 0 && requestedSlot < studentFees.length) {
            System.out.printf("  Slot [%d]: Tuition = ₹%,.2f%n", requestedSlot, studentFees[requestedSlot]);
        } else {
            System.out.printf("  ✓ SAFELY REJECTED: Slot [%d] is outside valid bounds [0 .. %d].%n%n",
                    requestedSlot, studentFees.length - 1);
        }

        // 4. Enhanced For-Each Loop (Immune to Index Exceptions)
        System.out.println("--- 4. ENHANCED FOR-EACH (IMMUNE TO BOUNDARY BUGS) ---");
        System.out.print("  Iterating safely: ");
        for (double fee : studentFees) {
            System.out.printf("₹%,.2f ", fee);
        }
        System.out.println("\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Valid index bounds are strictly 0 <= index < arr.length.");
        System.out.println("2. Never use '<=' with arr.length in loop conditions.");
        System.out.println("3. Always guard dynamic user-supplied indices: if (idx >= 0 && idx < arr.length).");
        System.out.println("4. Prefer enhanced for-each loops when numeric index counters are not required.");
        System.out.println("================================================================================");
    }
}
