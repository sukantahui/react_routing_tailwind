/**
 * File: ArrayFundamentalsAndFixedSizeDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 0)
 * Description: Demonstrates fundamental array concepts in Java (JLS §10):
 *              homogeneous elements, fixed-size container allocation, reference type nature (inheriting java.lang.Object),
 *              O(1) constant-time indexing mechanics, and fixed semester lab seat registration in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

public class ArrayFundamentalsAndFixedSizeDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: MODULE 001_006 TOPIC 0 ARRAY FUNDAMENTALS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Array as a Fixed-Size Homogeneous Container (₹)
        System.out.println("--- 1. FIXED-SIZE HOMOGENEOUS ALLOCATION ---");
        int batchCapacity = 4;
        double[] studentTuitionFees = new double[batchCapacity]; // 4 slots created

        // Assigning homogeneous primitive double values:
        studentTuitionFees[0] = 12000.0; // Swadeep
        studentTuitionFees[1] = 15000.0; // Tuhina
        studentTuitionFees[2] = 18000.0; // Abhronila
        studentTuitionFees[3] = 14000.0; // Debangshu

        System.out.printf("  Allocated fixed batch array for %d students.%n", studentTuitionFees.length);
        for (int i = 0; i < studentTuitionFees.length; i++) {
            System.out.printf("  Slot [%d]: Tuition Fee = ₹%,.2f%n", i, studentTuitionFees[i]);
        }

        // 2. Proving Arrays are Objects in Java
        System.out.println("\n--- 2. PROVING ARRAYS ARE FIRST-CLASS OBJECTS (JLS §10) ---");
        System.out.println("  Array class name: " + studentTuitionFees.getClass().getName()); // [D (Array of double)
        System.out.println("  Superclass of array: " + studentTuitionFees.getClass().getSuperclass().getName()); // java.lang.Object
        System.out.println("  Is instanceof Object? " + (studentTuitionFees instanceof Object));

        // 3. Immutability of Array Length (Fixed-Size Rule)
        System.out.println("\n--- 3. IMMUTABILITY OF ARRAY SIZE ---");
        System.out.println("  Array size is fixed at creation time: 'length' is a 'public final int' field.");
        System.out.printf("  studentTuitionFees.length = %d (Cannot be expanded or shrunk).%n", studentTuitionFees.length);
        System.out.println("  To accommodate a 5th student (Pritam), a NEW larger array must be allocated!\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. An array is a container holding a FIXED number of values of a single homogeneous type.");
        System.out.println("2. In Java, arrays are true first-class OBJECTS inheriting from java.lang.Object.");
        System.out.println("3. Array length is established at creation time and cannot be resized dynamically.");
        System.out.println("4. Array elements allow O(1) instantaneous random access via contiguous memory math.");
        System.out.println("================================================================================");
    }
}
