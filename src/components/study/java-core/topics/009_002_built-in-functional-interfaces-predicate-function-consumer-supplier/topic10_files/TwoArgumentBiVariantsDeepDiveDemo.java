/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 10: Two-Argument (Bi) Variants: BiPredicate, BiFunction & BiConsumer
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;
import java.util.function.BiPredicate;

public class TwoArgumentBiVariantsDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: TWO-ARGUMENT (BI) VARIANTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. BiPredicate<T, U>: boolean test(T t, U u) -> Tests TWO inputs
        BiPredicate<String, Integer> isEligibleStudent = (course, age) -> course.startsWith("Adv") && age >= 18;
        System.out.println(">>> 1. BiPredicate (AdvJava, 21): " + isEligibleStudent.test("AdvJava", 21));

        // 2. BiFunction<T, U, R>: R apply(T t, U u) -> Maps TWO inputs to ONE output
        BiFunction<Double, Double, Double> calculateTotalWithGst = (basePrice, gstRate) -> basePrice + (basePrice * gstRate / 100.0);
        System.out.printf(">>> 2. BiFunction (₹10,000 + 18%% GST) : ₹%,.2f%n", calculateTotalWithGst.apply(10000.0, 18.0));

        // 3. BiConsumer<T, U>: void accept(T t, U u) -> Consumes TWO inputs (Powers Map.forEach!)
        BiConsumer<String, Integer> mapEntryPrinter = (student, score) -> {
            System.out.printf("  [Result Ledger] Student: %-15s | Score: %d/100%n", student, score);
        };

        Map<String, Integer> scoreMap = new HashMap<>();
        scoreMap.put("Swadeep Paul", 95);
        scoreMap.put("Tuhina Das", 98);
        scoreMap.put("Abhronila Das", 91);

        System.out.println("\n>>> 3. BiConsumer in action with Map.forEach(BiConsumer):");
        scoreMap.forEach(mapEntryPrinter); // Map.forEach takes BiConsumer<K, V>!

        System.out.println("\n==========================================================================");
    }
}