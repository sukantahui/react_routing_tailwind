/**
 * File: ArrayStackHeapMemoryAllocationDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 1)
 * Description: Demonstrates Stack vs Heap memory allocation for Java arrays (JLS §10.2):
 *              local reference pointer on Stack, dynamic object payload on Heap,
 *              JVM automatic zeroing / default initialization of all primitive and reference types,
 *              and student workstation deposit ledger in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

public class ArrayStackHeapMemoryAllocationDemo {

    public record StudentRecord(String name, int rollNo) {}

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 1 ARRAY MEMORY ALLOCATION (STACK & HEAP)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Stack Reference vs Heap Allocation
        System.out.println("--- 1. STACK REFERENCE & HEAP PAYLOAD ALLOCATION ---");
        // 'labDeposits' reference sits on Stack; array object sits in Heap:
        double[] labDeposits = new double[3];

        System.out.println("  Stack variable 'labDeposits' successfully references Heap object.");
        System.out.printf("  Initial default value of labDeposits[0] (before assignment): ₹%,.2f%n", labDeposits[0]);

        // Assigning values:
        labDeposits[0] = 5000.0; // Swadeep
        labDeposits[1] = 5000.0; // Tuhina
        labDeposits[2] = 6000.0; // Abhronila

        for (int i = 0; i < labDeposits.length; i++) {
            System.out.printf("  Slot [%d]: Lab Security Deposit = ₹%,.2f%n", i, labDeposits[i]);
        }

        // 2. Default Zero Initialization Proof (JVM Guarantee)
        System.out.println("\n--- 2. JVM AUTOMATIC ZERO-INITIALIZATION GUARANTEE ---");
        int[] defaultInts = new int[2];
        boolean[] defaultBools = new boolean[2];
        char[] defaultChars = new char[2];
        StudentRecord[] defaultRecords = new StudentRecord[2];

        System.out.printf("  default int element     : %d%n", defaultInts[0]);
        System.out.printf("  default boolean element : %b%n", defaultBools[0]);
        System.out.printf("  default char element    : '\\u%04x' (NUL)%n", (int) defaultChars[0]);
        System.out.printf("  default Object reference: %s%n", defaultRecords[0]);

        // 3. Multiple References Pointing to the Same Heap Array
        System.out.println("\n--- 3. ALIASING: MULTIPLE STACK REFERENCES TO SAME HEAP OBJECT ---");
        double[] aliasRef = labDeposits; // Copies reference address, NOT the array!
        aliasRef[0] = 7500.0; // Mutating via alias

        System.out.printf("  labDeposits[0] after alias mutation: ₹%,.2f (Proves shared Heap object!)%n",
                labDeposits[0]);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Stack holds the reference variable; Heap holds the actual array object payload.");
        System.out.println("2. The JVM guarantees all array elements are zero-initialized to type defaults.");
        System.out.println("3. Assigning arr2 = arr1 copies the pointer reference (aliasing), not the heap data.");
        System.out.println("4. Array memory in Heap is reclaimed automatically by the GC when unreferenced.");
        System.out.println("================================================================================");
    }
}
