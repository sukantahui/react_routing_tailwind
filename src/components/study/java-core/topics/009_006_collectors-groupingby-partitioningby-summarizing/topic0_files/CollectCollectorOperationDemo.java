/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 0: The collect(Collector) Operation - Mutable Reductions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CollectCollectorOperationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: COLLECT(COLLECTOR) MUTABLE REDUCTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentRoster = List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee"
        );

        // 1. Mutable Reduction using collect(Collectors.toList())
        System.out.println(">>> 1. Standard collect(Collectors.toList()):");
        List<String> upperNames = studentRoster.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("   Collected List: " + upperNames);

        // 2. Under the Hood: 3-Argument collect(Supplier, BiConsumer, BiConsumer)
        System.out.println("\n>>> 2. Deconstructing collect() Mechanics (Supplier + Accumulator + Combiner):");
        List<String> customCollected = studentRoster.stream()
            .collect(
                ArrayList::new,                  // 1. Supplier: creates mutable container
                (list, item) -> list.add(item), // 2. Accumulator: mutates container
                (list1, list2) -> list1.addAll(list2) // 3. Combiner: merges parallel containers
            );
        System.out.println("   Custom Collected Result: " + customCollected);

        System.out.println("\n>>> REDUCE VS COLLECT:");
        System.out.println("  - reduce(): Immutable reduction (O(N^2) for collections due to copying).");
        System.out.println("  - collect(): Mutable reduction (O(N) in-place container mutation).");
        System.out.println("==========================================================================");
    }
}
