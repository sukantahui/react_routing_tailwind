/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 12: findAny() vs findFirst() - Parallel Performance Optimization
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;
import java.util.Optional;

public class FindAnyOptimizationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: FINDANY() VS FINDFIRST() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> largeStudentList = List.of(
            "Anish Dey", "Bikram Ghosh", "Debangshu Mukherjee", 
            "Priya Sharma", "Rahul Roy", "Sneha Sen", 
            "Swadeep Paul", "Tuhina Das", "Abhronila Das"
        );

        // 1. Sequential findAny (Behaves identically to findFirst in sequential mode)
        Optional<String> seqMatch = largeStudentList.stream()
            .filter(name -> name.startsWith("S"))
            .findAny();
        System.out.println("1. Sequential findAny (starts with 'S'): " + seqMatch.orElse("None"));

        // 2. Parallel findAny: Returns WHICHEVER thread finishes first!
        System.out.println("\n2. Running Parallel findAny (multi-core race):");
        Optional<String> parallelMatch = largeStudentList.parallelStream()
            .filter(name -> {
                System.out.println("   [Thread " + Thread.currentThread().getName() + "] Checking: " + name);
                return name.startsWith("S") || name.startsWith("D") || name.startsWith("T");
            })
            .findAny();

        System.out.println("   --> Parallel Winner Match: " + parallelMatch.orElse("None"));

        System.out.println("\n>>> PERFORMANCE SUMMARY:");
        System.out.println("  - findFirst(): Enforces strict encounter order (costly synchronization in parallel).");
        System.out.println("  - findAny(): Zero synchronization barrier; returns first available match across any core.");
        System.out.println("==========================================================================");
    }
}
