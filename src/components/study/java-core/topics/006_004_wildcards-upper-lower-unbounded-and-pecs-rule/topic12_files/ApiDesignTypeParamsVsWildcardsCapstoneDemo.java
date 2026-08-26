/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 12: API Design Guidelines: Type Parameters (<T>) vs Wildcards (?) (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class ApiDesignTypeParamsVsWildcardsCapstoneDemo {

    // SCENARIO 1: USE TYPE PARAMETERS (<T>) when return type depends on input, or multiple params share the same type:
    public static <T> T getFirstElement(List<T> list) {
        return list.isEmpty() ? null : list.get(0);
    }

    // SCENARIO 2: USE WILDCARDS (?) when the method only accesses collection services without returning T:
    public static void printSummary(List<?> list) {
        System.out.println("  Collection Summary: Size=" + list.size());
    }

    // SCENARIO 3: USE PECS WILDCARDS for input parameters representing Producers or Consumers:
    public static <T> void appendAll(List<? super T> destination, List<? extends T> source) {
        destination.addAll(source);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: API DESIGN GUIDELINES (CAPSTONE) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentBatch = List.of("Swadeep Paul", "Tuhina Das", "Abhronila Das");
        List<Object> masterRegistry = new ArrayList<>();

        System.out.println(">>> 1. Invoking Type Parameter Method (Preserves exact String return type):");
        String first = getFirstElement(studentBatch);
        System.out.println("  First Student: " + first);

        System.out.println("\n>>> 2. Invoking Wildcard Summary (Clean universal signature):");
        printSummary(studentBatch);

        System.out.println("\n>>> 3. Invoking PECS appendAll (Flexible cross-type collection append):");
        appendAll(masterRegistry, studentBatch);
        System.out.println("  Master Registry Content: " + masterRegistry);

        System.out.println("\n>>> 3 GOLDEN RULES FOR API DESIGNERS (Effective Java):");
        System.out.println("  1. Return Types: NEVER use wildcard types in method return values (e.g. avoid 'List<? extends Number> get()').");
        System.out.println("  2. Input Parameters: USE wildcards on input parameters to maximize flexibility (PECS).");
        System.out.println("  3. Single-Use Types: If a type parameter appears only once in the method signature, replace it with a wildcard '?'.");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 006_004 WILDCARDS & THE PECS PRINCIPLE 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}