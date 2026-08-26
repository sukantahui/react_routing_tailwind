/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 7: Generic Algorithms: Swapping Elements, Finding Extremes & Merging Lists
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class GenericAlgorithmsToolkitDemo {

    // 1. Generic Swap Algorithm:
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    // 2. Generic Maximum Finder (Bounded to Comparable):
    public static <T extends Comparable<T>> T findMax(T[] array) {
        if (array == null || array.length == 0) return null;
        T max = array[0];
        for (int i = 1; i < array.length; i++) {
            if (array[i].compareTo(max) > 0) {
                max = array[i];
            }
        }
        return max;
    }

    // 3. Generic List Merger:
    public static <T> List<T> mergeLists(List<T> list1, List<T> list2) {
        List<T> merged = new ArrayList<>(list1.size() + list2.size());
        merged.addAll(list1);
        merged.addAll(list2);
        return merged;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: GENERIC ALGORITHMS TOOLKIT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Testing Swap:
        String[] branches = {"Naihati", "Barrackpore", "Shyamnagar"};
        System.out.println(">>> 1. Array Before Swap: " + Arrays.toString(branches));
        swap(branches, 0, 1);
        System.out.println("  Array After Swap  : " + Arrays.toString(branches));

        // 2. Testing Find Max:
        Integer[] scores = {88, 99, 74, 100, 92};
        Integer topScore = findMax(scores);
        String topBranch = findMax(branches);
        System.out.println("\n>>> 2. Generic Find Max:");
        System.out.println("  Top Score : " + topScore);
        System.out.println("  Top Lexicographical Branch : " + topBranch);

        // 3. Testing Merge Lists:
        List<String> batchA = List.of("Swadeep Paul", "Tuhina Das");
        List<String> batchB = List.of("Abhronila Das", "Debangshu Mukherjee");
        List<String> allStudents = mergeLists(batchA, batchB);
        System.out.println("\n>>> 3. Generic List Merger:");
        System.out.println("  Combined Batch: " + allStudents);

        System.out.println("\n==========================================================================");
    }
}