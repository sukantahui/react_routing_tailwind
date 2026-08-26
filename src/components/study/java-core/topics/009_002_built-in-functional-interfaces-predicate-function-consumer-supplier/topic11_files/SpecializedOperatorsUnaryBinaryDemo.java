/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 11: Specialized Operators: UnaryOperator<T> & BinaryOperator<T>
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.BinaryOperator;
import java.util.function.UnaryOperator;

public class SpecializedOperatorsUnaryBinaryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: SPECIALIZED OPERATORS (Unary & Binary) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. UnaryOperator<T> extends Function<T, T> (Single input, SAME type output):
        UnaryOperator<String> sanitizePanCode = pan -> pan.trim().toUpperCase();

        List<String> rawPans = new ArrayList<>(List.of(" abcde1234f ", "wxyz9876k", " pqrs5555l "));
        // List.replaceAll() accepts UnaryOperator<E>!
        rawPans.replaceAll(sanitizePanCode);
        System.out.println(">>> 1. List.replaceAll(UnaryOperator): " + rawPans);

        // 2. BinaryOperator<T> extends BiFunction<T, T, T> (Two inputs of T, returns T):
        BinaryOperator<Double> calculateTotalCost = (base, gst) -> base + gst;
        System.out.printf(">>> 2. BinaryOperator (Base + GST)     : ₹%,.2f%n", calculateTotalCost.apply(50000.0, 9000.0));

        // 3. Static Helpers on BinaryOperator: minBy() & maxBy():
        BinaryOperator<Integer> highestScoreFinder = BinaryOperator.maxBy(Comparator.naturalOrder());
        System.out.println(">>> 3. BinaryOperator.maxBy(92, 85)   : " + highestScoreFinder.apply(92, 85));

        System.out.println("\n==========================================================================");
    }
}