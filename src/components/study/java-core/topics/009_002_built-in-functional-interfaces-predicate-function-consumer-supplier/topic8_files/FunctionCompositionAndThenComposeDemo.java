/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 8: Function Chaining: andThen(), compose(), and Function.identity()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.function.Function;

public class FunctionCompositionAndThenComposeDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: Function COMPOSITION (andThen vs compose) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Function<Integer, Integer> multiplyByTwo = x -> {
            System.out.print(" [x * 2] -> ");
            return x * 2;
        };

        Function<Integer, Integer> addTen = x -> {
            System.out.print(" [x + 10] -> ");
            return x + 10;
        };

        int input = 5;

        // 1. andThen(): FORWARD PIPELINE (Left to Right -> multiplyByTwo FIRST, THEN addTen):
        // Formula: addTen(multiplyByTwo(5)) -> (5 * 2) + 10 = 10 + 10 = 20
        System.out.println(">>> 1. Executing f1.andThen(f2) on input 5 (Forward):");
        Function<Integer, Integer> forwardPipe = multiplyByTwo.andThen(addTen);
        int forwardResult = forwardPipe.apply(input);
        System.out.println("RESULT = " + forwardResult);

        // 2. compose(): REVERSE PIPELINE (Right to Left -> addTen FIRST, THEN multiplyByTwo):
        // Formula: multiplyByTwo(addTen(5)) -> (5 + 10) * 2 = 15 * 2 = 30
        System.out.println("\n>>> 2. Executing f1.compose(f2) on input 5 (Reverse):");
        Function<Integer, Integer> reversePipe = multiplyByTwo.compose(addTen);
        int reverseResult = reversePipe.apply(input);
        System.out.println("RESULT = " + reverseResult);

        // 3. Function.identity(): Identity function that returns its input unchanged (t -> t):
        Function<String, String> identityFunc = Function.identity();
        System.out.println("\n>>> 3. Function.identity("Barrackpore") = " + identityFunc.apply("Barrackpore"));

        System.out.println("\n==========================================================================");
    }
}