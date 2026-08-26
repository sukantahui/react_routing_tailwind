/**
 * File: EnhancedForEachLoopDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 7)
 * Description: Demonstrates the Enhanced 'for-each' loop in Java (JLS §14.14.2, Java 5+),
 *              array traversal, Iterable collection iteration, compiler bytecode transformation (Iterator/index),
 *              the read-only limitation (why reassigning loop variable does not modify array),
 *              and student scholarship honors audit in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

import java.util.List;

public class EnhancedForEachLoopDemo {

    public record Student(String name, int score, double tuitionFee) {}

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 7 ENHANCED 'FOR-EACH' LOOP");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Array Traversal via Enhanced 'for-each'
        System.out.println("--- 1. ARRAY TRAVERSAL (PRIMITIVE & OBJECT ARRAYS) ---");
        double[] tuitionFees = {12000.0, 15000.0, 18000.0, 22000.0};
        double totalBatchFees = 0.0;

        for (double fee : tuitionFees) {
            totalBatchFees += fee;
            System.out.printf("  Enrolled Student Course Fee: ₹%,.2f%n", fee);
        }
        System.out.printf("-> Total Batch Fee Revenue: ₹%,.2f%n%n", totalBatchFees);

        // 2. Collection Traversal (Iterable Records)
        System.out.println("--- 2. COLLECTION TRAVERSAL (JAVA RECORDS) ---");
        List<Student> honorsCandidates = List.of(
                new Student("Swadeep", 95, 15000.0),
                new Student("Tuhina", 92, 15000.0),
                new Student("Abhronila", 89, 18000.0),
                new Student("Debangshu", 85, 12000.0)
        );

        for (Student s : honorsCandidates) {
            double scholarshipRebate = s.score() >= 90 ? (s.tuitionFee() * 0.50) : 0.0;
            System.out.printf("  Candidate: %-10s | Score: %d%% | Base: ₹%,.2f | Scholarship: ₹%,.2f%n",
                    s.name(), s.score(), s.tuitionFee(), scholarshipRebate);
        }

        // 3. Critical Gotcha: The Read-Only Nature of 'for-each'
        System.out.println("\n--- 3. GOTCHA: REASSIGNING LOOP VARIABLE DOES NOT MODIFY ARRAY ---");
        int[] scores = {50, 60, 70};
        System.out.print("  Original Array: ");
        for (int sc : scores) System.out.print(sc + " ");

        // Attempting to modify array via for-each loop variable:
        for (int sc : scores) {
            sc = sc + 10; // Only mutates local copy 'sc', NOT scores[i]!
        }

        System.out.print("\n  After for-each 'modification': ");
        for (int sc : scores) System.out.print(sc + " ");
        System.out.println("-> Notice: Array values are UNCHANGED! (Must use indexed loop to mutate array).\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'for-each' provides clean, index-free traversal over arrays and Iterable objects.");
        System.out.println("2. Completely eliminates off-by-one errors (ArrayIndexOutOfBoundsException).");
        System.out.println("3. Read-Only: Reassigning the loop variable does NOT change the underlying array.");
        System.out.println("4. To mutate array elements or traverse in reverse, use a standard indexed 'for' loop.");
        System.out.println("================================================================================");
    }
}
