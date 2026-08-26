/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 3: Direct Mutation Hazard: Why Modifying Collections During Iteration Throws CME
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.List;

public class ConcurrentModificationExceptionCrashDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: ConcurrentModificationException CRASH ANALYSIS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentList = new ArrayList<>(List.of("Swadeep", "Tuhina", "Abhronila", "Debangshu"));

        System.out.println(">>> 1. Attempting Direct Mutation Inside Enhanced For-Each Loop:");
        try {
            for (String student : studentList) {
                System.out.println("  Inspecting: " + student);
                if (student.equals("Tuhina")) {
                    // DIRECT COLLECTION MUTATION DURING ITERATION:
                    studentList.remove("Tuhina"); // Modifies list directly instead of using iterator!
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("\n  [CRITICAL RUNTIME EXCEPTION CAUGHT]");
            System.out.println("  Caught: " + e.getClass().getName());
            System.out.println("  Reason: Direct modification corrupted iterator cursor invariants!");
        }

        System.out.println("\n>>> WHY DOES DIRECT MODIFICATION CRASH?");
        System.out.println("  1. The enhanced for-each loop compiles down to: 'Iterator it = studentList.iterator()'.");
        System.out.println("  2. When 'studentList.remove()' runs, it increments the internal 'modCount' counter.");
        System.out.println("  3. On the next loop step, 'it.next()' checks: 'if (modCount != expectedModCount) throw new CME()'.");
        System.out.println("  4. Because 'expectedModCount' is stale, Java immediately aborts with CME to prevent silent corruption!");

        System.out.println("\n==========================================================================");
    }
}