/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 10: Spliterator Methods: tryAdvance(), trySplit(), and Characteristics Flags
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.List;
import java.util.Spliterator;

public class SpliteratorMethodsAndCharacteristicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: Spliterator METHODS & CHARACTERISTICS FLAGS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentList = new ArrayList<>(List.of(
                "Swadeep", "Tuhina", "Abhronila", "Debangshu", "Sourav", "Ananya", "Priyanka", "Rahul"
        ));

        Spliterator<String> spliterator1 = studentList.spliterator();

        // 1. RECURSIVE SPLITTING (trySplit):
        // Splits the first half (0 to 3) into a new Spliterator; spliterator1 retains the second half (4 to 7):
        Spliterator<String> spliterator2 = spliterator1.trySplit();

        System.out.println(">>> 1. After trySplit() Execution:");
        System.out.println("  Spliterator 2 (Partition 1) Size : " + spliterator2.estimateSize());
        System.out.println("  Spliterator 1 (Partition 2) Size : " + spliterator1.estimateSize());

        System.out.println("\n>>> 2. Consuming Partition 1:");
        spliterator2.forEachRemaining(name -> System.out.println("  [Thread-A / Part 1] -> " + name));

        System.out.println("\n>>> 3. Consuming Partition 2:");
        spliterator1.forEachRemaining(name -> System.out.println("  [Thread-B / Part 2] -> " + name));

        // 4. CHARACTERISTICS FLAGS:
        System.out.println("\n>>> 4. Inspecting Spliterator Characteristics Flags:");
        int chars = spliterator1.characteristics();
        System.out.println("  ORDERED    : " + ((chars & Spliterator.ORDERED) != 0));
        System.out.println("  SIZED      : " + ((chars & Spliterator.SIZED) != 0));
        System.out.println("  SUBSIZED   : " + ((chars & Spliterator.SUBSIZED) != 0));
        System.out.println("  DISTINCT   : " + ((chars & Spliterator.DISTINCT) != 0));
        System.out.println("  SORTED     : " + ((chars & Spliterator.SORTED) != 0));
        System.out.println("  CONCURRENT : " + ((chars & Spliterator.CONCURRENT) != 0));

        System.out.println("\n==========================================================================");
    }
}