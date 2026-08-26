/**
 * File: ArrayLengthPropertyDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 6)
 * Description: Demonstrates the 'length' property of Java arrays (JLS §10.7):
 *              comparison of array.length (final field) vs String.length() (method) vs Collection.size() (method),
 *              multidimensional row/column length inspection, JVM object header representation,
 *              and campus examination hall capacity auditing in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.ArrayList;
import java.util.List;

public class ArrayLengthPropertyDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 6 ARRAY 'length' PROPERTY");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. The Three Length Conventions in Java
        System.out.println("--- 1. THE 3 LENGTH CONVENTIONS (FIELD vs METHODS) ---");
        int[] feeTokens = {12000, 15000, 18000, 14000};
        String campusName = "Barrackpore";
        List<Double> paymentList = new ArrayList<>(List.of(12000.0, 15000.0, 18000.0, 14000.0));

        // Array: 'length' is a public final int FIELD (no parentheses)
        int arrayLen = feeTokens.length;

        // String: 'length()' is a public METHOD (with parentheses)
        int stringLen = campusName.length();

        // Collection: 'size()' is a public METHOD (with parentheses)
        int listSize = paymentList.size();

        System.out.printf("  1. Array  'feeTokens.length'   (FIELD)  : %d%n", arrayLen);
        System.out.printf("  2. String 'campusName.length()' (METHOD) : %d characters (\"%s\")%n", stringLen, campusName);
        System.out.printf("  3. List   'paymentList.size()' (METHOD) : %d items%n%n", listSize);

        // 2. Multidimensional Matrix Length Inspection
        System.out.println("--- 2. MULTIDIMENSIONAL MATRIX LENGTH INSPECTION ---");
        double[][] labExamHalls = {
            {12000.0, 15000.0, 18000.0},        // Hall 1 (Barrackpore - 3 seats)
            {14000.0, 16000.0},                 // Hall 2 (Naihati - 2 seats)
            {10000.0, 12000.0, 15000.0, 20000.0} // Hall 3 (Shyamnagar - 4 seats)
        };

        // Outer array length represents number of rows (Halls):
        System.out.printf("  Total Examination Halls (Rows): labExamHalls.length = %d%n", labExamHalls.length);

        // Inner array lengths represent columns per row (Seats per Hall):
        for (int r = 0; r < labExamHalls.length; r++) {
            System.out.printf("    Hall %d Capacity: labExamHalls[%d].length = %d seats%n",
                    (r + 1), r, labExamHalls[r].length);
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Array length is a 'public final int' FIELD: arr.length (No parentheses!).");
        System.out.println("2. String length is a METHOD: str.length() (With parentheses!).");
        System.out.println("3. Collection size is a METHOD: list.size() (With parentheses!).");
        System.out.println("4. In 2D arrays, matrix.length is row count; matrix[r].length is column count for row r.");
        System.out.println("================================================================================");
    }
}
