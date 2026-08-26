/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 17: peek(Consumer) - Debugging & Inspecting Elements in Flight
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;

public class PeekConsumerDebuggingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: PEEK(CONSUMER) DEBUGGING - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> rawNames = List.of("Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu");

        System.out.println(">>> TRACING PIPELINE EXECUTION WITH PEEK:");
        List<String> processedList = rawNames.stream()
            .peek(name -> System.out.println(" [1. RAW INGESTION] : " + name))
            .filter(name -> name.startsWith("S") || name.startsWith("T"))
            .peek(filtered -> System.out.println("   [2. POST FILTER]  : " + filtered))
            .map(String::toUpperCase)
            .peek(mapped -> System.out.println("     [3. POST MAP]   : " + mapped))
            .toList();

        System.out.println("\n>>> FINAL COLLECTED RESULT: " + processedList);

        System.out.println("\n>>> PEEK BEST PRACTICE RULES:");
        System.out.println("  1. Use peek() ONLY for debugging, tracing, and logging.");
        System.out.println("  2. Do NOT perform stateful mutations inside peek().");
        System.out.println("  3. Note: JDK optimizations may completely skip peek() if downstream does not require element values (e.g. stream.peek(...).count() in modern JDKs)!");
        System.out.println("==========================================================================");
    }
}
