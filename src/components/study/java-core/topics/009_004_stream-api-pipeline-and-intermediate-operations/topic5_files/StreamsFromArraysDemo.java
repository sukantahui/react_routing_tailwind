/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 5: Creating Streams from Arrays & Sub-Array Range Slicing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.Arrays;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamsFromArraysDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: STREAMS FROM ARRAYS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Streaming an Object Array (String[])
        String[] branchNames = {"Barrackpore", "Naihati", "Shyamnagar", "Ichapur", "Titagarh"};
        Stream<String> branchStream = Arrays.stream(branchNames);
        System.out.print("1. Full Object Array Stream: ");
        branchStream.forEach(b -> System.out.print("[" + b + "] "));
        System.out.println();

        // 2. Sub-Array Slicing with Range: Arrays.stream(arr, startInclusive, endExclusive)
        System.out.print("2. Sub-Array Slice [1..4) (Naihati to Ichapur): ");
        Arrays.stream(branchNames, 1, 4)
            .map(String::toUpperCase)
            .forEach(b -> System.out.print(b + " "));
        System.out.println();

        // 3. Streaming Primitive Arrays (int[], long[], double[])
        int[] scores = {88, 92, 75, 94, 85, 90};
        IntStream scoreStream = Arrays.stream(scores);
        double averageScore = scoreStream.average().orElse(0.0);
        System.out.println("\n3. Primitive int[] Stream Average Score: " + averageScore);

        // 4. Primitive Sub-Array Slicing
        int sumOfMiddleThree = Arrays.stream(scores, 1, 4).sum();
        System.out.println("4. Sum of slice indices 1 to 3: " + sumOfMiddleThree);

        System.out.println("\n==========================================================================");
    }
}
