/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 1: forEach(Consumer) vs forEachOrdered(Consumer)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class ForEachVsForEachOrderedDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: FOREACH VS FOREACHORDERED - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> centerList = List.of(
            "1. Barrackpore", "2. Naihati", "3. Shyamnagar", 
            "4. Ichapur", "5. Titagarh", "6. Kankinara"
        );

        // 1. Sequential Stream: forEach preserves order naturally
        System.out.println("1. Sequential Stream with forEach():");
        centerList.stream()
            .forEach(c -> System.out.println("   - " + c));

        // 2. Parallel Stream with forEach(): OUT OF ORDER (Non-deterministic for speed)
        System.out.println("\n2. Parallel Stream with forEach() (May print in arbitrary order):");
        centerList.parallelStream()
            .forEach(c -> System.out.println("   [Thread " + Thread.currentThread().getName() + "] " + c));

        // 3. Parallel Stream with forEachOrdered(): ENFORCES ENCOUNTER ORDER
        System.out.println("\n3. Parallel Stream with forEachOrdered() (Guaranteed 1 -> 6 order):");
        centerList.parallelStream()
            .forEachOrdered(c -> System.out.println("   [Thread " + Thread.currentThread().getName() + "] " + c));

        System.out.println("\n>>> TAKEAWAY:");
        System.out.println("  - Use forEach() in parallel streams when order is irrelevant (maximum speed).");
        System.out.println("  - Use forEachOrdered() when encounter order must be strictly preserved.");
        System.out.println("==========================================================================");
    }
}
