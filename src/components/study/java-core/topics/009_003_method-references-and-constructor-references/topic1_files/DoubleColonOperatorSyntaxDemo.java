/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 1: The Double Colon (::) Operator Syntax & Token Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.function.Function;

public class DoubleColonOperatorSyntaxDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE DOUBLE COLON (::) OPERATOR - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE DOUBLE COLON (::) OPERATOR GRAMMAR:");
        System.out.println("    TargetReference :: MethodNameOrKeyword");
        System.out.println("    [Class / Object]  [Separator]  [Method Name / 'new']");
        System.out.println();

        // 1. Notice: NO PARENTHESES '()' AFTER THE METHOD NAME!
        // Incorrect: Integer::parseInt() -> COMPILE ERROR!
        // Correct  : Integer::parseInt
        Function<String, Integer> parser = Integer::parseInt;

        int parsedGstRate = parser.apply("18");
        System.out.println(">>> 1. Parsed Integer value via Integer::parseInt: " + parsedGstRate + "%");

        System.out.println("\n>>> 3 KEY SYNTAX RULES OF THE :: OPERATOR:");
        System.out.println("  1. No Parentheses '()' : You are passing the METHOD AS BEHAVIOR, not invoking it immediately!");
        System.out.println("  2. No Arguments Passed : Arguments are inferred automatically by the target Functional Interface SAM.");
        System.out.println("  3. Special Keyword 'new': Used for constructor instantiation (e.g. 'ArrayList::new').");

        System.out.println("\n==========================================================================");
    }
}