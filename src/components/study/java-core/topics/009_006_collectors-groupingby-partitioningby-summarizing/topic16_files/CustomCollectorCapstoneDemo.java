/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 16: Custom Collector from Scratch using Collector.of() - Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;

public class CustomCollectorCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: CUSTOM COLLECTOR CAPSTONE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<AcademyCandidate> candidates = List.of(
            new AcademyCandidate("Swadeep Paul", "Barrackpore", 94.0),
            new AcademyCandidate("Tuhina Das", "Naihati", 96.5),
            new AcademyCandidate("Abhronila Das", "Shyamnagar", 88.0),
            new AcademyCandidate("Debangshu Mukherjee", "Ichapur", 91.5)
        );

        // 1. Building a Custom Collector via Collector.of() factory:
        // Creates an Unmodifiable List after sorting elements by score descending!
        Collector<AcademyCandidate, List<AcademyCandidate>, List<AcademyCandidate>> topPerformersCollector =
            Collector.of(
                ArrayList::new,                                                         // 1. Supplier
                List::add,                                                              // 2. Accumulator
                (list1, list2) -> { list1.addAll(list2); return list1; },              // 3. Combiner
                list -> {                                                               // 4. Finisher
                    list.sort((c1, c2) -> Double.compare(c2.score(), c1.score()));     // Sort descending
                    return Collections.unmodifiableList(list);                          // Wrap immutable
                }
            );

        List<AcademyCandidate> rankedToppers = candidates.stream()
            .collect(topPerformersCollector);

        System.out.println(">>> 1. Custom Collected & Ranked Candidates:");
        rankedToppers.forEach(c -> System.out.println("   🏆 " + c.name() + " (" + c.center() + ") -> " + c.score() + "%"));

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 009_006 COMPLETE: THE COLLECTORS FRAMEWORK FULLY MASTERED!");
        System.out.println("==========================================================================");
    }

    record AcademyCandidate(String name, String center, double score) {}
}
