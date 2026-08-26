/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 11: Wildcard Capture & Private Generic Helper Methods (Fixing CAP#1 Errors)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class WildcardCaptureHelperMethodDemo {

    // PUBLIC API: Uses clean Wildcard 'List<?>' for client simplicity:
    public static void reverseList(List<?> list) {
        // Direct mutation: list.set(0, list.get(0)) -> FAILS with 'capture#1-of ? cannot be applied to ?'!
        // Fix: Delegate to a private generic HELPER METHOD to CAPTURE the wildcard type!
        reverseHelper(list);
    }

    // PRIVATE HELPER METHOD: Captures the wildcard type as concrete type parameter '<T>':
    private static <T> void reverseHelper(List<T> list) {
        int left = 0;
        int right = list.size() - 1;
        while (left < right) {
            T temp = list.get(left);
            list.set(left, list.get(right));
            list.set(right, temp);
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: WILDCARD CAPTURE & HELPER METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> trainees = new ArrayList<>(List.of("Swadeep", "Tuhina", "Abhronila", "Debangshu"));
        System.out.println(">>> 1. Original Trainee List : " + trainees);

        reverseList(trainees);
        System.out.println(">>> 2. Reversed Trainee List : " + trainees);

        System.out.println("\n>>> WHAT IS WILDCARD CAPTURE?");
        System.out.println("  1. The compiler infers a specific, anonymous type for the wildcard (denoted as 'capture#1-of ?').");
        System.out.println("  2. When modifying the collection in-place, the compiler cannot ensure 'get()' matches 'set()'.");
        System.out.println("  3. A private generic helper method captures the wildcard into a named parameter '<T>', allowing safe mutation!");

        System.out.println("\n==========================================================================");
    }
}