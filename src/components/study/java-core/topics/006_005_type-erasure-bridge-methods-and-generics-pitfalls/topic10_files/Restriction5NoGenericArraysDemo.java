/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 10: Restriction 5: Cannot Create Arrays of Parameterized Types (Why new List<String>[10] Fails)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class Restriction5NoGenericArraysDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: RESTRICTION 5 - NO GENERIC ARRAYS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // ILLEGAL SYNTAX (Will NOT compile):
        // List<String>[] genericArray = new List<String>[10]; // COMPILE ERROR: Cannot create a generic array of List<String>!

        // LEGAL WORKAROUND 1: Use a List of Lists (Prefer Lists to Arrays - Effective Java Item 28):
        List<List<String>> listOfLists = new ArrayList<>();
        listOfLists.add(List.of("Swadeep", "Tuhina"));
        listOfLists.add(List.of("Abhronila", "Debangshu"));

        System.out.println(">>> 1. Legal Alternative: List of Lists (List<List<String>>):");
        System.out.println("  " + listOfLists);

        System.out.println("\n>>> WHY GENERIC ARRAYS ARE PROHIBITED (ARRAY COVARIANCE VS GENERICS):");
        System.out.println("  1. Arrays are REIFIED (enforce types at runtime) and COVARIANT (Object[] can point to String[]).");
        System.out.println("  2. Generics are NON-REIFIED (erased at compile-time) and INVARIANT.");
        System.out.println("  3. If 'new List<String>[10]' was allowed, you could assign it to 'Object[]', inject a 'List<Integer>', and cause runtime corruption with no ArrayStoreException!");

        System.out.println("\n==========================================================================");
    }
}