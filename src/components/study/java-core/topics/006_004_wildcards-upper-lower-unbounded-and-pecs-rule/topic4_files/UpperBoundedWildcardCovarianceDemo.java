/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 4: Upper Bounded Wildcard (List<? extends Number>): Covariance & Read Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.List;

public class UpperBoundedWildcardCovarianceDemo {

    // Upper Bounded Wildcard Method (Covariance):
    // Accepts List<Number>, List<Integer>, List<Double>, List<Long>, etc.
    public static double sumOfList(List<? extends Number> numbers) {
        double sum = 0.0;
        for (Number num : numbers) { // READ-SAFE: Elements are guaranteed to be at least a Number!
            sum += num.doubleValue();
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: UPPER BOUNDED WILDCARD (List<? extends Number>) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> studentRolls = List.of(101, 102, 103, 104);
        List<Double> tuitionFees = List.of(8500.50, 9200.75, 9800.00);
        List<Long> accessTimestamps = List.of(100000L, 200000L, 300000L);

        System.out.println(">>> 1. Executing sumOfList across Covariant Collections:");
        System.out.printf("  Sum of Integer Rolls      : %.1f%n", sumOfList(studentRolls));
        System.out.printf("  Sum of Tuition Fees       : ₹%.2f%n", sumOfList(tuitionFees));
        System.out.printf("  Sum of Access Timestamps  : %.1f%n", sumOfList(accessTimestamps));

        System.out.println("\n>>> WHAT IS COVARIANCE IN GENERICS?");
        System.out.println("  1. 'List<? extends Number>' creates a COVARIANT subtyping relationship.");
        System.out.println("  2. 'List<Integer>' IS considered a subtype of 'List<? extends Number>'!");
        System.out.println("  3. Read-Safe as Number, but WRITE-RESTRICTED (you cannot add numbers into it).");

        System.out.println("\n==========================================================================");
    }
}