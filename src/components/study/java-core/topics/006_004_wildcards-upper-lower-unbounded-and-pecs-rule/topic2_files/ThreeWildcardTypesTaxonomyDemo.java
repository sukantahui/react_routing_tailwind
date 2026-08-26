/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 2: The 3 Types of Wildcards: Unbounded, Upper Bounded & Lower Bounded Taxonomy
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.List;

public class ThreeWildcardTypesTaxonomyDemo {

    // 1. UNBOUNDED WILDCARD: Accepts ANY list:
    public static void processUnbounded(List<?> list) {
        System.out.println("  1. Unbounded (List<?>): Size=" + list.size());
    }

    // 2. UPPER BOUNDED WILDCARD (Covariance): Accepts Number & all subtypes (Integer, Double, Long):
    public static void processUpperBounded(List<? extends Number> list) {
        double sum = 0;
        for (Number n : list) sum += n.doubleValue();
        System.out.printf("  2. Upper Bounded (List<? extends Number>): Sum=%.2f%n", sum);
    }

    // 3. LOWER BOUNDED WILDCARD (Contravariance): Accepts Integer & all supertypes (Number, Object):
    public static void processLowerBounded(List<? super Integer> list) {
        list.add(999); // WRITE-SAFE: Adding Integer is 100% legal!
        System.out.println("  3. Lower Bounded (List<? super Integer>): Injected 999 successfully.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE 3 TYPES OF WILDCARDS TAXONOMY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> names = List.of("Swadeep", "Tuhina");
        List<Double> doubles = List.of(10.5, 20.5, 30.0);

        System.out.println(">>> Executing the 3 Wildcard Types:");
        processUnbounded(names);
        processUpperBounded(doubles);

        System.out.println("\n>>> THE 3 WILDCARD FLAVORS AT A GLANCE:");
        System.out.println("+-------------------+-----------------------------+------------------------------------+");
        System.out.println("| Wildcard Type     | Syntax                      | Semantic Meaning                   |");
        System.out.println("+-------------------+-----------------------------+------------------------------------+");
        System.out.println("| Unbounded         | List<?>                     | Any unknown type                   |");
        System.out.println("| Upper Bounded     | List<? extends T>           | T or any subtype of T (Covariant)  |");
        System.out.println("| Lower Bounded     | List<? super T>             | T or any supertype of T (Contravariant)|");
        System.out.println("+-------------------+-----------------------------+------------------------------------+");

        System.out.println("\n==========================================================================");
    }
}