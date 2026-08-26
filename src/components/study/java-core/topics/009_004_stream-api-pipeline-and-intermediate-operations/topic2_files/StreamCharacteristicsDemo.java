/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 2: The Three Core Stream Characteristics: Non-Mutating, Lazy, Single-Pass
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.ArrayList;
import java.util.List;

public class StreamCharacteristicsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: CORE STREAM CHARACTERISTICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> originalStudents = new ArrayList<>(List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das"
        ));

        // --- CHARACTERISTIC 1: NON-MUTATING (Source Immutability) ---
        System.out.println("1. [NON-MUTATING] Original list before stream: " + originalStudents);
        List<String> uppercaseList = originalStudents.stream()
            .map(String::toUpperCase)
            .toList();
        System.out.println("   Transformed Stream Result: " + uppercaseList);
        System.out.println("   Original list after stream (UNTOUCHED): " + originalStudents);

        // --- CHARACTERISTIC 2: LAZY EVALUATION ---
        System.out.println("\n2. [LAZY EVALUATION] Setting up pipeline with logging peek:");
        var lazyStream = originalStudents.stream()
            .filter(name -> {
                System.out.println("   [DEBUG EVALUATED] Filtering: " + name);
                return name.startsWith("T");
            });

        System.out.println("   --> Pipeline assembled! Notice NO logs printed above yet.");
        System.out.println("   --> Invoking terminal operation now...");
        long count = lazyStream.count(); // Terminal operation triggers execution
        System.out.println("   --> Terminal result count: " + count);

        // --- CHARACTERISTIC 3: CONSUMABLE ONLY ONCE ---
        System.out.println("\n3. [CONSUMABLE ONCE] Pipeline cannot be restarted once consumed.");
        System.out.println("==========================================================================");
    }
}
