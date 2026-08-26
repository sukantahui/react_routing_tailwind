/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 1: Creating Parallel Streams & Dynamic Switching (.parallel vs .sequential)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.List;
import java.util.stream.IntStream;

public class CreatingParallelStreamsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: CREATING PARALLEL STREAMS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> branches = List.of("Barrackpore", "Naihati", "Shyamnagar", "Ichapur");

        // 1. Direct from Collection: collection.parallelStream()
        System.out.println("1. From collection.parallelStream():");
        branches.parallelStream().forEach(b -> System.out.println("   - " + b + " [" + Thread.currentThread().getName() + "]"));

        // 2. Converting existing stream: stream.parallel()
        System.out.println("\n2. From IntStream.range().parallel():");
        int sum = IntStream.rangeClosed(1, 1000)
            .parallel() // Converts to parallel mode
            .sum();
        System.out.println("   Sum of 1..1000: " + sum);

        // 3. Checking Stream Mode via isParallel()
        var stream = branches.stream().parallel();
        System.out.println("\n3. Is stream parallel? " + stream.isParallel());

        // 4. THE LAST CALL WINS RULE:
        // You CANNOT run half a pipeline in parallel and the other half sequentially!
        System.out.println("\n4. Testing 'Last Call Wins':");
        branches.stream()
            .parallel()
            .filter(s -> true)
            .sequential() // Overrides previous parallel() call!
            .forEach(b -> System.out.println("   - " + b + " [" + Thread.currentThread().getName() + "]"));

        System.out.println("==========================================================================");
    }
}
