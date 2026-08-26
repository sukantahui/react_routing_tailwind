/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 0: The Limitation of Invariant Generics: Why List<Object> Cannot Accept List<String>
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class GenericsInvarianceLimitationDemo {

    // Method accepting List<Object>:
    public static void printObjectList(List<Object> list) {
        for (Object obj : list) {
            System.out.println("  Item: " + obj);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: GENERICS INVARIANCE LIMITATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentNames = new ArrayList<>();
        studentNames.add("Swadeep Paul");
        studentNames.add("Tuhina Das");

        // printObjectList(studentNames); // COMPILATION ERROR: List<String> is NOT a subtype of List<Object>!

        System.out.println(">>> 1. WHY List<String> IS NOT A SUBTYPE OF List<Object> (INVARIANCE):");
        System.out.println("  - Even though 'String extends Object', 'List<String>' DOES NOT extend 'List<Object>'.");
        System.out.println("  - If Java allowed this, you could write: 'list.add(100);' into what is actually a List<String>!");
        System.out.println("  - That would cause a catastrophic ClassCastException when reading from studentNames!");

        System.out.println("\n>>> 2. HOW JAVA GUARANTEES TYPE SAFETY VIA INVARIANCE:");
        System.out.println("  - Generics are INVARIANT by default to prevent heap corruption.");
        System.out.println("  - To allow polymorphic collections safely, Java introduced WILDCARDS (List<?>)!");

        System.out.println("\n==========================================================================");
    }
}