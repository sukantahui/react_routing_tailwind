/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 7: Short-Circuiting Terminal Operations - Early Exit Mechanics
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class ShortCircuitingTerminalDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: SHORT-CIRCUITING TERMINAL OPERATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentRoster = List.of(
            "Anish Dey", "Swadeep Paul", "Tuhina Das", 
            "Abhronila Das", "Debangshu Mukherjee", "Priya Sharma"
        );

        System.out.println(">>> TESTING ANYMATCH SHORT-CIRCUITING:");
        System.out.println(">>> Searching for student with name starting with 'S'...");

        boolean found = studentRoster.stream()
            .peek(name -> System.out.println("   [INSPECTING] " + name))
            .anyMatch(name -> name.startsWith("S"));

        System.out.println("\n>>> RESULT: " + found);
        System.out.println(">>> OBSERVATION:");
        System.out.println("  - Inspected 'Anish Dey' (false -> continue).");
        System.out.println("  - Inspected 'Swadeep Paul' (true -> MATCH FOUND!).");
        System.out.println("  - Traversal TERMINATED IMMEDIATELY! 'Tuhina', 'Abhronila', etc. were NEVER evaluated!");

        System.out.println("\n==========================================================================");
    }
}
