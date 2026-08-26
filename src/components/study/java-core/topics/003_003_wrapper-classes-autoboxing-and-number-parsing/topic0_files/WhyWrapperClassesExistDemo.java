/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 0: Why Wrapper Classes Exist: Collections Compatibility & Null Support
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

import java.util.ArrayList;
import java.util.List;

public class WhyWrapperClassesExistDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY WRAPPER CLASSES EXIST - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 3 Fundamental Reasons Java Has Wrapper Classes:");
        System.out.println();
        System.out.println("  1. COLLECTIONS FRAMEWORK COMPATIBILITY:");
        System.out.println("     Java Collections (List, Set, Map) can ONLY hold Objects, NOT primitives!");
        System.out.println("     - 'List<int> list'      -> ILLEGAL / COMPILE ERROR!");
        System.out.println("     - 'List<Integer> list'  -> VALID & STANDARD!");

        List<Integer> rollNumbers = new ArrayList<>();
        rollNumbers.add(101);
        rollNumbers.add(102);
        System.out.println("     Enrolled Roll Numbers in List<Integer>: " + rollNumbers);

        System.out.println();
        System.out.println("  2. NULL REPRESENTATION IN ENTERPRISE DATABASES:");
        System.out.println("     A primitive 'int' defaults to 0 (cannot be null).");
        System.out.println("     An 'Integer' can be NULL, representing an unassigned database column!");

        Integer unassignedExamScore = null; // Represents missing/unattempted test
        System.out.println("     Unassigned Exam Score: " + unassignedExamScore);

        System.out.println();
        System.out.println("  3. RICH UTILITY METHODS & PARSING:");
        System.out.println("     Integer.parseInt("42"), Double.MAX_VALUE, Integer.toBinaryString(255).");

        System.out.println("\n==========================================================================");
    }
}