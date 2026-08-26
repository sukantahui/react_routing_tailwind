/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 1: Introduction to the Wildcard Symbol (?): Representing an Unknown Type
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.List;

public class WildcardSymbolIntroductionDemo {

    // Method accepting a List of UNKNOWN TYPE (List<?>):
    public static void printAnyCollection(List<?> list) {
        System.out.print("  List size [" + list.size() + "]: ");
        for (Object element : list) { // Elements can always be safely read as Object!
            System.out.print(element + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE WILDCARD SYMBOL (?) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentNames = List.of("Swadeep", "Tuhina", "Abhronila");
        List<Integer> rollNumbers = List.of(101, 102, 103, 104);
        List<Double> examScores = List.of(98.5, 99.0, 94.75);

        System.out.println(">>> 1. Invoking printAnyCollection(List<?>) across Diverse Types:");
        printAnyCollection(studentNames);
        printAnyCollection(rollNumbers);
        printAnyCollection(examScores);

        System.out.println("\n>>> WHAT DOES THE WILDCARD '?' MEAN?");
        System.out.println("  1. The question mark '?' represents an 'Unknown Type'.");
        System.out.println("  2. 'List<?>' is the supertype of ALL parameterized lists ('List<String>', 'List<Integer>', etc.).");
        System.out.println("  3. Read-Safe: Any item read from 'List<?>' is guaranteed to be an instance of 'java.lang.Object'.");

        System.out.println("\n==========================================================================");
    }
}