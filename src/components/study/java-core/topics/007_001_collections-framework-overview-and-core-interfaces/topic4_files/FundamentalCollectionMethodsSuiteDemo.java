/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 4: Fundamental Collection Methods: Comprehensive API Suite & removeIf()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class FundamentalCollectionMethodsSuiteDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: FUNDAMENTAL Collection<E> METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Collection<String> trainees = new ArrayList<>();

        // 1. add() and addAll():
        trainees.add("Swadeep Paul (Barrackpore)");
        trainees.add("Tuhina Das (Naihati)");
        trainees.addAll(List.of("Abhronila Das (Shyamnagar)", "Debangshu Mukherjee (Ichapur)", "Dummy Tester"));

        System.out.println(">>> 1. After add() and addAll():");
        System.out.println("  Size     : " + trainees.size());
        System.out.println("  Elements : " + trainees);

        // 2. contains() and containsAll():
        System.out.println("\n>>> 2. Querying Elements (contains / containsAll):");
        System.out.println("  Contains 'Tuhina Das (Naihati)'? : " + trainees.contains("Tuhina Das (Naihati)"));
        System.out.println("  Contains All Sub-List?           : " + trainees.containsAll(List.of("Swadeep Paul (Barrackpore)", "Dummy Tester")));

        // 3. removeIf() (Java 8 Predicate In-Place Filter):
        System.out.println("\n>>> 3. Predicate In-Place Removal (removeIf):");
        boolean removedAny = trainees.removeIf(name -> name.contains("Dummy"));
        System.out.println("  Removed Dummy entries? : " + removedAny);
        System.out.println("  Trainees Remaining     : " + trainees);

        // 4. toArray(T[] a) Conversion:
        System.out.println("\n>>> 4. Converting to Typed Array (toArray(T[] a)):");
        String[] traineeArray = trainees.toArray(new String[0]); // Recommended zero-length array pattern
        System.out.println("  Array Length : " + traineeArray.length);
        System.out.println("  First Array Element : " + traineeArray[0]);

        // 5. clear() and isEmpty():
        trainees.clear();
        System.out.println("\n>>> 5. After clear():");
        System.out.println("  Is Empty? : " + trainees.isEmpty() + " (Size=" + trainees.size() + ")");

        System.out.println("\n==========================================================================");
    }
}