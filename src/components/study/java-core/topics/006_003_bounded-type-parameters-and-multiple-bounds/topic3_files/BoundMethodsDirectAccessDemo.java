/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 3: Accessing Bound Methods Inside Generic Method/Class Bodies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.List;

public class BoundMethodsDirectAccessDemo {

    // Generic Method computing arithmetic average across ANY numeric collection:
    // '<T extends Number>' guarantees that every element has '.doubleValue()' method!
    public static <T extends Number> double calculateAverage(List<T> numbers) {
        if (numbers == null || numbers.isEmpty()) return 0.0;
        double sum = 0.0;
        for (T num : numbers) {
            sum += num.doubleValue(); // DIRECT ACCESS TO NUMBER METHOD WITHOUT CASTING!
        }
        return sum / numbers.size();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: DIRECT ACCESS TO BOUND METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> integerScores = List.of(90, 85, 95, 100);
        List<Double> doubleBalances = List.of(12500.50, 8400.25, 9900.00);
        List<Long> longTimestamps = List.of(1000L, 2000L, 3000L, 4000L);

        System.out.println(">>> 1. Computing Averages Across Diverse Numeric Types:");
        System.out.printf("  Integer Scores Average : %.2f%n", calculateAverage(integerScores));
        System.out.printf("  Double Balances Average: ₹%.2f%n", calculateAverage(doubleBalances));
        System.out.printf("  Long Timestamps Average: %.2f%n", calculateAverage(longTimestamps));

        System.out.println("\n>>> HOW TYPE ERASURE ENABLES DIRECT BOUND METHOD ACCESS:");
        System.out.println("  1. During compilation, the compiler replaces '<T extends Number>' with the bounding type 'Number'.");
        System.out.println("  2. Bytecode generated directly calls 'invokevirtual Number.doubleValue()'.");
        System.out.println("  3. No reflection or runtime overhead involved!");

        System.out.println("\n==========================================================================");
    }
}