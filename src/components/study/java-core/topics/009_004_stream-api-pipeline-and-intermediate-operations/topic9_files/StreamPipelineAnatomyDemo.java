/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 9: Anatomy of a Stream Pipeline: Source -> Intermediate Operations -> Terminal Operation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;

public class StreamPipelineAnatomyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: ANATOMY OF A STREAM PIPELINE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> studentRoster = List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das", 
            "Debangshu Mukherjee", "Priya Sharma", "Anish Dey"
        );

        System.out.println(">>> 3-STAGE PIPELINE BREAKDOWN:");
        System.out.println("  1. SOURCE       : studentRoster.stream()");
        System.out.println("  2. INTERMEDIATE : .filter(name -> name.contains('Das'))");
        System.out.println("  3. INTERMEDIATE : .map(String::toUpperCase)");
        System.out.println("  4. TERMINAL     : .toList() (Materializes output & triggers computation)\n");

        // Executing the complete pipeline
        List<String> dasFamily = studentRoster.stream()                 // 1. SOURCE
            .filter(name -> name.contains("Das"))                      // 2. INTERMEDIATE (Stateless)
            .map(String::toUpperCase)                                 // 3. INTERMEDIATE (Stateless)
            .toList();                                                // 4. TERMINAL

        System.out.println("Pipeline Execution Result: " + dasFamily);

        System.out.println("\n>>> PIPELINE RULES:");
        System.out.println("  - Must have EXACTLY 1 Source.");
        System.out.println("  - Can have 0, 1, or MULTIPLE Intermediate operations.");
        System.out.println("  - Must have EXACTLY 1 Terminal operation to trigger execution.");
        System.out.println("==========================================================================");
    }
}
