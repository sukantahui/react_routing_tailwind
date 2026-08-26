/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 4: 2-Argument reduce(T identity, BinaryOperator<T> accumulator)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class TwoArgumentReduceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: 2-ARGUMENT REDUCE(IDENTITY, ACCUMULATOR) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> feePayments = List.of(1500, 2200, 1800, 3500);

        // 1. Sum of fees with Identity = 0 (Neutral for addition)
        int totalFees = feePayments.stream()
            .reduce(0, Integer::sum);
        System.out.println("1. Total Course Fees Collected (Identity 0): ₹" + totalFees);

        // 2. Product of multipliers with Identity = 1 (Neutral for multiplication)
        List<Integer> factors = List.of(2, 3, 4, 5);
        int product = factors.stream()
            .reduce(1, (a, b) -> a * b);
        System.out.println("2. Product of Factors (Identity 1): " + product);

        // 3. String CSV formatting with Identity = ""
        List<String> studentList = List.of("Swadeep", "Tuhina", "Abhronila");
        String csv = studentList.stream()
            .reduce("", (res, name) -> res.isEmpty() ? name : res + ", " + name);
        System.out.println("3. CSV Generated (Identity ''): " + csv);

        // 4. Safe fallback on EMPTY stream (returns identity without Optional wrapping)
        List<Integer> emptyFees = List.of();
        int emptyResult = emptyFees.stream().reduce(0, Integer::sum);
        System.out.println("4. Empty Stream Result (Guaranteed default): ₹" + emptyResult);

        System.out.println("\n==========================================================================");
    }
}
