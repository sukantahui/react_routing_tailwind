/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 11: Comparing Arrays.asList(), List.of(), and Collections.unmodifiableList()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ListCreationComparisonMatrixDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: Arrays.asList() vs List.of() vs unmodifiableList() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Arrays.asList(): Fixed-size array wrapper (MUTABLE IN-PLACE via set(), backed by original array):
        String[] originalArray = new String[]{"Swadeep", "Tuhina"};
        List<String> asList = Arrays.asList(originalArray);
        asList.set(0, "Swadeep Paul"); // LEGAL: Modifies backing array!
        System.out.println(">>> 1. Arrays.asList():");
        System.out.println("  List Content        : " + asList);
        System.out.println("  Backing Array Index 0: " + originalArray[0] + " (Backing array MUTATED!)");
        // asList.add("Abhronila"); // Fails with UnsupportedOperationException (fixed size!)

        // 2. Collections.unmodifiableList(): Unmodifiable VIEW over an underlying mutable list:
        List<String> mutableBackingList = new ArrayList<>(List.of("Naihati", "Barrackpore"));
        List<String> unmodifiableView = Collections.unmodifiableList(mutableBackingList);
        mutableBackingList.add("Shyamnagar"); // LEGAL: Modifying original list reflects in the view!
        System.out.println("\n>>> 2. Collections.unmodifiableList() (View Wrapper):");
        System.out.println("  View Content after modifying backing list: " + unmodifiableView);

        // 3. List.of() (Java 9+): TRULY IMMUTABLE (No backing array/list leaks):
        List<String> trulyImmutable = List.of("Ichapur", "Kankinara");
        System.out.println("\n>>> 3. List.of() (Truly Immutable): " + trulyImmutable);

        System.out.println("\n>>> COMPARISON MATRIX:");
        System.out.println("+-----------------------------+-------------+------------+-------------+-------------------------+");
        System.out.println("| Feature                     | Arrays.asList| List.of()  | unmodList() | Description             |");
        System.out.println("+-----------------------------+-------------+------------+-------------+-------------------------+");
        System.out.println("| Allows add() / remove()     | No (Fixed)  | No         | No          | Resizing disallowed     |");
        System.out.println("| Allows set(index, val)      | YES         | No         | No          | In-place element write  |");
        System.out.println("| Allows null elements        | YES         | No (NPE)   | Depends on backing list|");
        System.out.println("| Backing mutations visible?  | YES (Array) | N/A (Copy) | YES (View)  | Leak potential          |");
        System.out.println("+-----------------------------+-------------+------------+-------------+-------------------------+");

        System.out.println("\n==========================================================================");
    }
}