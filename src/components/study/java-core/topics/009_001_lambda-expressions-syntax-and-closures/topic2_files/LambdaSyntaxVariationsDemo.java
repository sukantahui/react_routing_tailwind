/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 2: Lambda Syntax Variations: Type Inference, Single-Param & Single-Expression Shortcuts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;

public class LambdaSyntaxVariationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: LAMBDA SYNTAX VARIATIONS & COMPACT FORMS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Full Explicit Form (Parameter types + Curly Braces + Return keyword):
        BinaryOperator<Integer> addFull = (Integer a, Integer b) -> {
            return a + b;
        };

        // 2. Type Inference Form (Compiler infers Integer types from BinaryOperator):
        BinaryOperator<Integer> addInferred = (a, b) -> a + b; // Omits types, braces & return!

        // 3. Single Parameter Form (Parentheses around single parameter CAN BE OMITTED!):
        Function<String, Integer> stringLength = str -> str.length(); // 'str' instead of '(str)'

        // 4. Zero Parameter Form (Empty parentheses '()' ARE MANDATORY!):
        Supplier<String> instituteGreeting = () -> "Welcome to Coder & AccoTax Barrackpore!";

        System.out.println(">>> 1. Two-parameter inferred lambda  : " + addInferred.apply(15, 25));
        System.out.println(">>> 2. Single-parameter no-parentheses: " + stringLength.apply("Barrackpore"));
        System.out.println(">>> 3. Zero-parameter empty-brackets  : " + instituteGreeting.get());

        System.out.println("\n>>> THE 3 GOLDEN RULES OF LAMBDA SYNTAX SHORTCUTS:");
        System.out.println("  - Rule 1 (Types)       : If compiler can infer types, omit types for ALL parameters (cannot mix '(int a, b)').");
        System.out.println("  - Rule 2 (Parentheses) : Parentheses can be omitted ONLY if there is EXACTLY ONE parameter without explicit type.");
        System.out.println("  - Rule 3 (Return/Braces): If body is a SINGLE expression, curly braces AND 'return' keyword MUST be omitted together!");

        System.out.println("\n==========================================================================");
    }
}