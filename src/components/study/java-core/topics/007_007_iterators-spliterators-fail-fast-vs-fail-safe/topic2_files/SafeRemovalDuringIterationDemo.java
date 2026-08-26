/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 2: Removing Elements Safely During Iteration via iterator.remove()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SafeRemovalDuringIterationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: SAFE REMOVAL VIA iterator.remove() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> studentMarks = new ArrayList<>(List.of(45, 82, 35, 91, 28, 77));
        System.out.println(">>> 1. Initial Marks List: " + studentMarks);

        // Filter out all failing marks (< 40) safely:
        Iterator<Integer> it = studentMarks.iterator();
        while (it.hasNext()) {
            int mark = it.next(); // MUST call next() before remove()!
            if (mark < 40) {
                System.out.println("  [REMOVING FAILING MARK] -> " + mark);
                it.remove(); // Safely removes current element from backing collection!
            }
        }

        System.out.println("\n>>> 2. Filtered Marks List (Only Passing Marks Remain):");
        System.out.println("  " + studentMarks);

        // Modern Java 8 Alternative (removeIf):
        studentMarks.removeIf(m -> m > 90); // Uses iterator.remove() internally!
        System.out.println("\n>>> 3. After removeIf(m > 90): " + studentMarks);

        System.out.println("\n>>> THE 2 RULES OF iterator.remove():");
        System.out.println("  1. 'next()' Precondition : You MUST call 'it.next()' before calling 'it.remove()'. Calling remove() twice without next() throws 'IllegalStateException'.");
        System.out.println("  2. Synchronizes modCount : 'it.remove()' updates internal cursor state AND adjusts 'expectedModCount = modCount', preventing exceptions!");

        System.out.println("\n==========================================================================");
    }
}