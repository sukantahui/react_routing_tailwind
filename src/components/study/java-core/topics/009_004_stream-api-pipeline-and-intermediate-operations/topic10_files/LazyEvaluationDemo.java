/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 10: Lazy Evaluation Mechanics & Loop Fusion
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;
import java.util.Optional;

public class LazyEvaluationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: LAZY EVALUATION & SHORT-CIRCUITING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentNames = List.of(
            "Anish", "Swadeep Paul", "Tuhina Das", 
            "Abhronila Das", "Debangshu Mukherjee", "Priya"
        );

        System.out.println(">>> STEP 1: Building lazy stream (Filtering length > 6 and Mapping to Upper)...");
        // Intermediate operations only build the execution graph:
        var pipeline = studentNames.stream()
            .filter(name -> {
                System.out.println("   [FILTER EVALUATED] Testing: " + name);
                return name.length() > 6;
            })
            .map(name -> {
                System.out.println("   [MAP EVALUATED] Transforming: " + name);
                return name.toUpperCase();
            });

        System.out.println(">>> STEP 2: Notice NOTHING was printed above during declaration!");
        System.out.println(">>> STEP 3: Invoking short-circuiting terminal operation: findFirst()...\n");

        Optional<String> firstMatch = pipeline.findFirst();

        System.out.println("\n>>> RESULT: " + firstMatch.orElse("None"));
        System.out.println("\n>>> OBSERVATION:");
        System.out.println("  - Notice that 'Tuhina Das', 'Abhronila Das', and 'Debangshu Mukherjee' were NEVER TOUCHED!");
        System.out.println("  - Execution halted the moment findFirst() satisfied its condition with 'Swadeep Paul'.");
        System.out.println("==========================================================================");
    }
}
