/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 4: ArrayList Performance Characteristics: O(1) Reads, Amortized Appends & O(n) Shifts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.List;

public class ArrayListPerformanceCharacteristicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: ArrayList PERFORMANCE & BIG-O PROFILE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> dataset = new ArrayList<>();
        for (int i = 0; i < 100000; i++) dataset.add(i);

        // 1. O(1) RANDOM ACCESS (get by index):
        long t1 = System.nanoTime();
        int val = dataset.get(50000); // Direct pointer arithmetic (baseAddress + index * 4 bytes)
        long t2 = System.nanoTime();
        System.out.printf(">>> 1. O(1) Random Access: Index 50,000 value=%d (%d ns)%n", val, (t2 - t1));

        // 2. O(1) AMORTIZED APPEND (add to tail):
        long t3 = System.nanoTime();
        dataset.add(999999);
        long t4 = System.nanoTime();
        System.out.printf(">>> 2. O(1) Amortized Append: Tail insertion (%d ns)%n", (t4 - t3));

        // 3. O(n) MIDDLE INSERTION / DELETION (Requires shifting elements):
        long t5 = System.nanoTime();
        dataset.add(0, -1); // Shifting 100,000 elements right!
        long t6 = System.nanoTime();
        System.out.printf(">>> 3. O(n) Head Insertion: Shifted all elements right (%d ns)%n", (t6 - t5));

        System.out.println("\n>>> ArrayList TIME COMPLEXITY SUMMARY:");
        System.out.println("+-----------------------------+-------------------+--------------------------------------------+");
        System.out.println("| Operation                   | Time Complexity   | Mechanics                                  |");
        System.out.println("+-----------------------------+-------------------+--------------------------------------------+");
        System.out.println("| get(index) / set(index)     | O(1)              | Direct pointer arithmetic                  |");
        System.out.println("| add(element) [tail append]  | O(1) Amortized    | O(1) normal, O(n) on rare array resize     |");
        System.out.println("| add(index, e) / remove(i)   | O(n)              | Requires System.arraycopy() memory shifts  |");
        System.out.println("| contains(e) / indexOf(e)    | O(n)              | Linear sequential scan                     |");
        System.out.println("+-----------------------------+-------------------+--------------------------------------------+");

        System.out.println("\n==========================================================================");
    }
}