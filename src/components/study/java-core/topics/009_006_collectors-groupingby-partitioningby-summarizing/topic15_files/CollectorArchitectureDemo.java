/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 15: The Collector<T, A, R> Interface Architecture & Characteristics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;

public class CollectorArchitectureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: COLLECTOR<T, A, R> ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> rawData = List.of("Java", "Spring", "Docker", "Kubernetes");

        // Custom implementation of Collector<String, List<String>, List<String>>
        Collector<String, List<String>, List<String>> customListCollector = new Collector<>() {
            @Override
            public Supplier<List<String>> supplier() {
                return ArrayList::new; // 1. Factory for mutable accumulator
            }

            @Override
            public BiConsumer<List<String>, String> accumulator() {
                return List::add;      // 2. Incorporates an element into accumulator
            }

            @Override
            public BinaryOperator<List<String>> combiner() {
                return (list1, list2) -> { list1.addAll(list2); return list1; }; // 3. Merges parallel accumulators
            }

            @Override
            public Function<List<String>, List<String>> finisher() {
                return Function.identity(); // 4. Final transformation
            }

            @Override
            public Set<Characteristics> characteristics() {
                return EnumSet.of(Characteristics.IDENTITY_FINISH); // 5. Optimization hints
            }
        };

        List<String> result = rawData.stream().collect(customListCollector);
        System.out.println("Result Collected via explicit Collector interface: " + result);

        System.out.println("\n>>> THE 3 COLLECTOR CHARACTERISTICS:");
        System.out.println("  1. IDENTITY_FINISH : Indicates finisher() is Function.identity() (safe to cast A to R directly).");
        System.out.println("  2. CONCURRENT      : Safe for multiple threads to mutate accumulator concurrently.");
        System.out.println("  3. UNORDERED       : Collection operation is unaffected by encounter order.");
        System.out.println("==========================================================================");
    }
}
