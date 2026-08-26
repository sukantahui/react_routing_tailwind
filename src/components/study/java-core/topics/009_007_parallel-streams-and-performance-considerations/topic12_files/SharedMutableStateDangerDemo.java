/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 12: The Danger of Shared Mutable State in Parallel Streams (Race Conditions)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

public class SharedMutableStateDangerDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: SHARED MUTABLE STATE DANGER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        int expectedCount = 10_000;

        // 1. THE DISASTROUS ANTI-PATTERN: Mutating a non-thread-safe ArrayList in parallel!
        List<Integer> unsafeList = new ArrayList<>();
        try {
            IntStream.rangeClosed(1, expectedCount).parallel().forEach(unsafeList::add);
            System.out.println("1. [UNSAFE LIST] Expected: " + expectedCount + " | Actual Size: " + unsafeList.size());
            System.out.println("   --> SILENT DATA LOSS! " + (expectedCount - unsafeList.size()) + " elements were lost to race conditions!");
        } catch (Exception ex) {
            System.err.println("   [EXCEPTION CAUGHT]: Concurrent modification or ArrayIndexOutOfBounds: " + ex.getMessage());
        }

        // 2. THE THREAD-SAFE SYNCHRONIZED WRAPPER (Slow due to lock contention)
        List<Integer> syncList = Collections.synchronizedList(new ArrayList<>());
        IntStream.rangeClosed(1, expectedCount).parallel().forEach(syncList::add);
        System.out.println("\n2. [SYNCHRONIZED LIST] Size: " + syncList.size() + " (Thread-safe but destroys parallel speed via locks!)");

        // 3. THE IDIOMATIC FUNCTIONAL SOLUTION: collect(Collectors.toList())
        List<Integer> functionalList = IntStream.rangeClosed(1, expectedCount)
            .parallel()
            .boxed()
            .toList(); // Zero shared state, perfectly safe and parallelized!

        System.out.println("\n3. [FUNCTIONAL TO-LIST] Size: " + functionalList.size() + " (100% Thread-safe & Lock-Free!)");

        System.out.println("\n==========================================================================");
    }
}
