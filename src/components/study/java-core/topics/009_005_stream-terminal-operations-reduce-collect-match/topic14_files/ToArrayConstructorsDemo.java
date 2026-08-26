/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 14: toArray() and toArray(IntFunction<A[]> generator)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.Arrays;
import java.util.List;

public class ToArrayConstructorsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: TOARRAY() & ARRAY CONSTRUCTORS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentList = List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee"
        );

        // 1. Untyped toArray(): Returns Object[] (Needs manual casting or Object iteration)
        Object[] rawObjects = studentList.stream()
            .filter(name -> name.contains("Das"))
            .toArray();
        System.out.println("1. Untyped Object[] array: " + Arrays.toString(rawObjects));
        System.out.println("   - Array class type: " + rawObjects.getClass().getName());

        // 2. Type-Safe toArray(String[]::new): Array Constructor Reference
        String[] dasFamily = studentList.stream()
            .filter(name -> name.contains("Das"))
            .toArray(String[]::new); // IntFunction<String[]> generator

        System.out.println("\n2. Type-Safe String[] array via String[]::new:");
        System.out.println("   - Contents: " + Arrays.toString(dasFamily));
        System.out.println("   - Array class type: " + dasFamily.getClass().getName());
        System.out.println("   - Accessing index 0 safely: " + dasFamily[0]);

        // 3. Primitive IntStream to int[] array via toArray()
        int[] scoreArray = studentList.stream()
            .mapToInt(String::length)
            .toArray(); // Returns primitive int[] directly!
        System.out.println("\n3. Primitive int[] lengths array: " + Arrays.toString(scoreArray));

        System.out.println("\n==========================================================================");
    }
}
