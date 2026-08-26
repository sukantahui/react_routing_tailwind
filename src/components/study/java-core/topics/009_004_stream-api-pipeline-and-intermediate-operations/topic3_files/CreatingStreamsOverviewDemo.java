/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 3: Creating Streams Overview - Core Factories & Sources
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class CreatingStreamsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: CREATING STREAMS OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. From Collection: list.stream()
        List<String> branchList = List.of("Barrackpore", "Naihati", "Shyamnagar");
        Stream<String> s1 = branchList.stream();
        System.out.println("1. From List: " + s1.toList());

        // 2. From Array: Arrays.stream(array)
        String[] branchArray = {"Ichapur", "Titagarh", "Kankinara"};
        Stream<String> s2 = Arrays.stream(branchArray);
        System.out.println("2. From Array: " + s2.toList());

        // 3. From Direct Values: Stream.of(...)
        Stream<String> s3 = Stream.of("Java", "Spring Boot", "Docker");
        System.out.println("3. From Stream.of(): " + s3.toList());

        // 4. Stream.builder()
        Stream<String> s4 = Stream.<String>builder()
            .add("AccoTax GST")
            .add("Coder IT Services")
            .build();
        System.out.println("4. From Stream.builder(): " + s4.toList());

        // 5. Primitive Numeric Stream: IntStream.rangeClosed(1, 5)
        System.out.print("5. Primitive IntStream.rangeClosed(1, 5): ");
        IntStream.rangeClosed(1, 5).forEach(n -> System.out.print(n + " "));
        System.out.println();

        System.out.println("\n==========================================================================");
    }
}
