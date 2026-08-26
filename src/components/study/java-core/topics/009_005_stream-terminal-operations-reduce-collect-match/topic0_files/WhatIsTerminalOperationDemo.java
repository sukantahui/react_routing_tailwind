/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 0: What is a Terminal Operation? Triggering Pipeline Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class WhatIsTerminalOperationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS A TERMINAL OPERATION? - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> studentList = List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee"
        );

        // 1. Defining intermediate operations without a terminal operation
        System.out.println(">>> STEP 1: Creating intermediate stream definition...");
        var inertStream = studentList.stream()
            .filter(name -> {
                System.out.println("   [FILTER LOG] Testing: " + name);
                return name.startsWith("S") || name.startsWith("T");
            })
            .map(name -> {
                System.out.println("   [MAP LOG] Transforming: " + name);
                return name.toUpperCase();
            });

        System.out.println(">>> STEP 2: Notice that NO logs appeared above! The pipeline is inert.");

        // 2. Calling terminal operation: triggers full execution and produces output
        System.out.println("\n>>> STEP 3: Calling Terminal Operation '.forEach()':");
        inertStream.forEach(name -> System.out.println("   --> [TERMINAL CONSUMED]: " + name));

        // 3. Demonstrating that the stream is now CLOSED
        System.out.println("\n>>> STEP 4: Attempting to call another terminal operation on the same stream:");
        try {
            inertStream.count();
        } catch (IllegalStateException ex) {
            System.err.println("   [CAUGHT EXPECTED EXCEPTION]: " + ex.getMessage());
            System.out.println("   --> Streams cannot be reused after a terminal operation has executed.");
        }

        System.out.println("\n==========================================================================");
    }
}
