/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 3: Kind 1: Reference to a Static Method (ClassName::staticMethodName)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.function.BinaryOperator;
import java.util.function.Function;

class TaxMathEngine {
    public static double computeCess(double taxAmount) {
        return taxAmount * 0.04; // 4% Health & Education Cess
    }
}

public class StaticMethodReferenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: STATIC METHOD REFERENCE (ClassName::staticMethod) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Standard JDK Static Method Reference (Math::max):
        // Lambda: (a, b) -> Math.max(a, b)
        BinaryOperator<Integer> maxFinder = Math::max;
        System.out.println(">>> 1. Math::max(85, 92)             : " + maxFinder.apply(85, 92));

        // 2. Standard JDK Static Method Reference (Integer::parseInt):
        // Lambda: s -> Integer.parseInt(s)
        Function<String, Integer> stringParser = Integer::parseInt;
        List<String> rawScores = List.of("95", "88", "76");
        List<Integer> parsedScores = rawScores.stream().map(Integer::parseInt).toList();
        System.out.println(">>> 2. Stream.map(Integer::parseInt) : " + parsedScores);

        // 3. Custom Class Static Method Reference (TaxMathEngine::computeCess):
        // Lambda: amt -> TaxMathEngine.computeCess(amt)
        Function<Double, Double> cessCalculator = TaxMathEngine::computeCess;
        System.out.printf(">>> 3. Custom TaxMathEngine::computeCess: ₹%,.2f on ₹10,000%n", cessCalculator.apply(10000.0));

        System.out.println("\n==========================================================================");
    }
}