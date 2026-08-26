/**
 * Java Core Tutorial - Module 006_005: Type Erasure & Generics Limitations
 * Topic 12: Restriction 7: No Overloading Methods That Erase to Identical Signatures
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.List;

public class Restriction7NoOverloadClashDemo {

    // 1. VALID METHOD:
    public static void printStringList(List<String> list) {
        System.out.println("  String List: " + list);
    }

    // 2. ILLEGAL OVERLOAD (Will NOT compile):
    // public static void print(List<String> list) { }
    // public static void print(List<Integer> list) { }
    // COMPILE ERROR: 'name clash: print(List<Integer>) and print(List<String>) have the same erasure'!

    // 3. LEGAL WORKAROUND: Use distinct method names:
    public static void printIntegerList(List<Integer> list) {
        System.out.println("  Integer List: " + list);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: RESTRICTION 7 - NO OVERLOAD ERASURE CLASH - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> trainees = List.of("Swadeep", "Tuhina");
        List<Integer> rolls = List.of(101, 102);

        printStringList(trainees);
        printIntegerList(rolls);

        System.out.println("\n>>> WHY THIS OVERLOAD IS ILLEGAL:");
        System.out.println("  1. 'List<String>' erases to raw 'List'.");
        System.out.println("  2. 'List<Integer>' also erases to raw 'List'.");
        System.out.println("  3. Both methods would have the exact same bytecode signature: 'public static void print(java.util.List)'!");
        System.out.println("  4. A class cannot contain two methods with identical name and parameter types.");

        System.out.println("\n==========================================================================");
    }
}