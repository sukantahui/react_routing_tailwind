/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 3: 1. Unbounded Wildcard (List<?>): Universal Subtyping & Read-Only Semantics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class UnboundedWildcardReadOnlyDemo {

    public static void inspectElements(List<?> list) {
        System.out.println("  >>> Inspecting List<?> of size: " + list.size());
        for (Object item : list) {
            System.out.println("    Element: " + item + " (Type: " + item.getClass().getSimpleName() + ")");
        }

        // WRITE RESTRICTION WITH UNBOUNDED WILDCARDS:
        // list.add("Hello"); // COMPILE ERROR: Cannot add String to List<?>!
        // list.add(100);     // COMPILE ERROR: Cannot add Integer to List<?>!
        list.add(null);       // LEGAL: 'null' is the ONLY value allowed to be added to List<?>, because null belongs to all types!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: UNBOUNDED WILDCARD (List<?>) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> branches = new ArrayList<>(List.of("Barrackpore", "Naihati"));
        inspectElements(branches);

        System.out.println("\n>>> CRITICAL WRITE RESTRICTION ON List<?>:");
        System.out.println("  - You CANNOT add any object into a 'List<?>' because the compiler does not know what type the list actually holds!");
        System.out.println("  - If it let you add a String to a List<?> that was actually instantiated as List<Integer>, type safety would shatter.");
        System.out.println("  - The only literal you can ever add to List<?> is 'null'.");

        System.out.println("\n==========================================================================");
    }
}