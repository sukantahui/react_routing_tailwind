/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 8: How the Compiler Resolves Parameters in Unbound Instance Method References
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.function.BiFunction;
import java.util.function.BiPredicate;

public class UnboundParameterResolutionMechanicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: UNBOUND METHOD PARAMETER ROUTING MECHANICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Example 1: String.startsWith(prefix)
        // Method signature: boolean startsWith(String prefix) [Instance method on String]
        // Functional SAM: boolean test(String s1, String s2) [BiPredicate<String, String>]
        //
        // Compiler Resolution:
        // Parameter 1 ('s1') -> TARGET OBJECT (s1.)
        // Parameter 2 ('s2') -> METHOD ARGUMENT (.startsWith(s2))
        // Equivalent Lambda : (s1, s2) -> s1.startsWith(s2)
        BiPredicate<String, String> startsWithChecker = String::startsWith;

        System.out.println(">>> 1. String::startsWith resolved as (s1, s2) -> s1.startsWith(s2):");
        System.out.println("  'Barrackpore'.startsWith('Bar')? " + startsWithChecker.test("Barrackpore", "Bar"));

        // Example 2: String.indexOf(subString)
        // Method signature: int indexOf(String str)
        // Functional SAM: Integer apply(String str, String subStr) [BiFunction<String, String, Integer>]
        // Equivalent Lambda: (str, subStr) -> str.indexOf(subStr)
        BiFunction<String, String, Integer> indexFinder = String::indexOf;

        System.out.println("\n>>> 2. String::indexOf resolved as (s1, s2) -> s1.indexOf(s2):");
        System.out.println("  'AccoTax'.indexOf('Tax') = " + indexFinder.apply("AccoTax", "Tax"));

        System.out.println("\n==========================================================================");
    }
}