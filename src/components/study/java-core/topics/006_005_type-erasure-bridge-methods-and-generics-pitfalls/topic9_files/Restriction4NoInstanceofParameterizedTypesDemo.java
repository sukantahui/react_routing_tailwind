/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 9: Restriction 4: Cannot Use 'instanceof' or Casts with Parameterized Types
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class Restriction4NoInstanceofParameterizedTypesDemo {

    public static void inspectUnknownObject(Object obj) {
        // ILLEGAL SYNTAX (Will NOT compile):
        // if (obj instanceof List<String>) { } // COMPILE ERROR: Cannot perform instanceof check against parameterized type List<String>!

        // LEGAL SYNTAX 1: Check against unbounded wildcard List<?> (Reifiable):
        if (obj instanceof List<?> list) {
            System.out.println("  [VALIDATED] Object is an instance of List (checked via List<?>): Size=" + list.size());
        }

        // LEGAL SYNTAX 2: Raw type check:
        if (obj instanceof List) {
            System.out.println("  [VALIDATED] Object is an instance of raw List.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: RESTRICTION 4 - NO instanceof List<String> - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentList = new ArrayList<>(List.of("Swadeep", "Tuhina"));
        inspectUnknownObject(studentList);

        System.out.println("\n>>> WHY 'instanceof List<String>' IS IMPOSSIBLE:");
        System.out.println("  1. Non-Reifiable Types: Types with erased parameters are 'non-reifiable' (not completely available at runtime).");
        System.out.println("  2. Erasure: At runtime, both 'List<String>' and 'List<Integer>' are just 'ArrayList'.");
        System.out.println("  3. The JVM bytecode instruction 'instanceof' has no way to check if the elements inside are Strings!");

        System.out.println("\n==========================================================================");
    }
}