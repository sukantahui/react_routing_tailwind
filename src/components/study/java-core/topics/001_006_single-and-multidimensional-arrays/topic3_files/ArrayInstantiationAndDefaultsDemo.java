/**
 * File: ArrayInstantiationAndDefaultsDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 3)
 * Description: Demonstrates dynamic array instantiation using the 'new' keyword in Java (JLS §10.3):
 *              dynamic runtime sizing, automatic type-safe default value zeroing across all primitives and reference types,
 *              zero-length array allocations (new int[0]), NegativeArraySizeException safety,
 *              and student daily attendance and scholarship ledgers in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Scanner;

public class ArrayInstantiationAndDefaultsDemo {

    public record ScholarshipRecipient(String studentName, double amount) {}

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 3 ARRAY INSTANTIATION & DEFAULTS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Dynamic Runtime Sizing via 'new' Keyword
        System.out.println("--- 1. DYNAMIC RUNTIME SIZING VIA 'new' ---");
        int studentCount = 4; // Can be determined at runtime from user input or database
        double[] scholarshipLedger = new double[studentCount];

        System.out.printf("  Dynamically instantiated array of %d elements on Heap.%n", scholarshipLedger.length);
        System.out.printf("  Default zero balance at slot [0]: ₹%,.2f%n%n", scholarshipLedger[0]);

        // 2. Comprehensive Default Value Verification Matrix
        System.out.println("--- 2. JVM TYPE-SAFE DEFAULT VALUE VERIFICATION ---");
        byte[] bytes = new byte[1];
        short[] shorts = new short[1];
        int[] ints = new int[1];
        long[] longs = new long[1];
        float[] floats = new float[1];
        double[] doubles = new double[1];
        boolean[] booleans = new boolean[1];
        char[] chars = new char[1];
        ScholarshipRecipient[] recipients = new ScholarshipRecipient[1];

        System.out.printf("  byte default    : %d%n", bytes[0]);
        System.out.printf("  short default   : %d%n", shorts[0]);
        System.out.printf("  int default     : %d%n", ints[0]);
        System.out.printf("  long default    : %dL%n", longs[0]);
        System.out.printf("  float default   : %f%n", floats[0]);
        System.out.printf("  double default  : %f%n", doubles[0]);
        System.out.printf("  boolean default : %b%n", booleans[0]);
        System.out.printf("  char default    : '\\u%04x' (NUL character)%n", (int) chars[0]);
        System.out.printf("  Object default  : %s%n%n", recipients[0]);

        // 3. Zero-Length Array Allocation (new int[0])
        System.out.println("--- 3. ZERO-LENGTH ARRAY ALLOCATION ---");
        int[] zeroLengthArr = new int[0];
        System.out.printf("  zeroLengthArr is null? %b%n", (zeroLengthArr == null));
        System.out.printf("  zeroLengthArr.length  : %d%n", zeroLengthArr.length);
        System.out.println("  ✓ Perfect for returning empty results without NullPointerExceptions!\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'new Type[size]' evaluates the size expression dynamically at runtime.");
        System.out.println("2. The JVM zeroes all memory upon allocation (primitives to 0/false, Objects to null).");
        System.out.println("3. Zero-length arrays (new int[0]) are valid non-null objects with length == 0.");
        System.out.println("4. Negative size expressions throw runtime NegativeArraySizeException.");
        System.out.println("================================================================================");
    }
}
