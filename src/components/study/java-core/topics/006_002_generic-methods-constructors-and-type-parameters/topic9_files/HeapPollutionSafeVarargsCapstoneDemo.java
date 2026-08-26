/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 9: Heap Pollution Warnings & The @SafeVarargs Annotation Contract (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class HeapPollutionSafeVarargsCapstoneDemo {

    // SAFE VARARGS METHOD:
    // 1. It only reads from the varargs array (does NOT store anything into it).
    // 2. It does NOT let the varargs array reference escape to external code.
    // 3. Decorated with @SafeVarargs to suppress compiler warnings:
    @SafeVarargs
    public static <T> List<T> safeMerge(List<T>... lists) {
        List<T> result = new ArrayList<>();
        for (List<T> list : lists) {
            result.addAll(list);
        }
        return result;
    }

    // UNSAFE ANTI-PATTERN (Causes Heap Pollution & ClassCastException):
    public static void dangerousHeapPollution(List<String>... stringLists) {
        Object[] rawArray = stringLists; // Array covariance allows this!
        List<Integer> intList = List.of(101, 102);
        rawArray[0] = intList; // HEAP POLLUTION: Injected List<Integer> into List<String>[]!

        // When client tries to read a String from stringLists[0], JVM explodes!
        // String s = stringLists[0].get(0); -> ClassCastException: Integer cannot be cast to String!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: HEAP POLLUTION & @SafeVarargs CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> bkpBranch = List.of("Swadeep Paul", "Tuhina Das");
        List<String> naihatiBranch = List.of("Abhronila Das", "Debangshu Mukherjee");

        // Invoking Safe Varargs Generic Method:
        List<String> unifiedStudents = safeMerge(bkpBranch, naihatiBranch);
        System.out.println(">>> 1. Unified Students (Safe Varargs Ingestion):");
        System.out.println("  " + unifiedStudents);

        System.out.println("\n>>> 3 MANDATORY RULES FOR @SafeVarargs (Effective Java Item 32):");
        System.out.println("  1. Only apply to 'static', 'final', or 'private' (Java 9+) methods.");
        System.out.println("  2. The method must NEVER write/store anything into the varargs array parameter.");
        System.out.println("  3. The method must NEVER allow the varargs array reference to escape to outside code.");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 006_002 GENERIC METHODS, CONSTRUCTORS & TYPE INFERENCE COMPLETE!");
        System.out.println("==========================================================================");
    }
}