/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 12: Primitive Specializations: Eliminating Boxing Overhead (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.function.DoubleFunction;
import java.util.function.IntPredicate;
import java.util.function.IntUnaryOperator;
import java.util.function.LongConsumer;
import java.util.function.ToIntFunction;

public class PrimitiveSpecializationsEliminatingBoxingCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: PRIMITIVE FUNCTIONAL SPECIALIZATIONS (CAPSTONE)");
        System.out.println("==========================================================================\n");

        // 1. IntPredicate (boolean test(int value) -> ZERO BOXING TO java.lang.Integer!):
        IntPredicate isEvenScore = score -> score % 2 == 0;
        System.out.println(">>> 1. IntPredicate (score 84 is even?): " + isEvenScore.test(84));

        // 2. DoubleFunction<R> (R apply(double value) -> Unboxed primitive input double):
        DoubleFunction<String> inrFormatter = amount -> String.format("₹%,.2f", amount);
        System.out.println(">>> 2. DoubleFunction (amount 75000.50): " + inrFormatter.apply(75000.50));

        // 3. LongConsumer (void accept(long value) -> Unboxed primitive long side-effect):
        LongConsumer timestampAuditor = epoch -> System.out.println("  [Audit Epoch Log] " + epoch);
        System.out.print(">>> 3. LongConsumer in action: ");
        timestampAuditor.accept(System.currentTimeMillis());

        // 4. ToIntFunction<T> (int applyAsInt(T value) -> Object to primitive int output):
        ToIntFunction<String> panLengthExtractor = pan -> pan.length();
        System.out.println(">>> 4. ToIntFunction (PAN length): " + panLengthExtractor.applyAsInt("ABCDE1234F"));

        // 5. IntUnaryOperator (int applyAsInt(int operand) -> Pure primitive int transformation):
        IntUnaryOperator squareOperator = n -> n * n;
        System.out.println(">>> 5. IntUnaryOperator (12 squared): " + squareOperator.applyAsInt(12));

        System.out.println("\n==========================================================================");
        System.out.println(" 🎉 MODULE 009_002 BUILT-IN FUNCTIONAL INTERFACES 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}