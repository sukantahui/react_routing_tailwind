/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 7: Infinite Streams via Stream.iterate() & Stream.generate()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.Random;
import java.util.stream.Stream;

public class InfiniteStreamsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: INFINITE STREAMS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Infinite Stream via Stream.iterate(seed, UnaryOperator) + limit(n)
        System.out.print("1. Even numbers via Stream.iterate(0, n -> n + 2).limit(6): ");
        Stream.iterate(0, n -> n + 2)
            .limit(6)
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // 2. Stream.iterate with Predicate termination (Java 9 3-argument version)
        // Similar to a traditional for-loop: for (int i = 1; i <= 16; i *= 2)
        System.out.print("2. Powers of 2 via Java 9 Stream.iterate(1, n -> n <= 16, n -> n * 2): ");
        Stream.iterate(1, n -> n <= 16, n -> n * 2)
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // 3. Infinite Stream via Stream.generate(Supplier) + limit(n)
        System.out.println("\n3. Random OTP Generators via Stream.generate() + limit(3):");
        Random random = new Random();
        Stream.generate(() -> 100000 + random.nextInt(900000))
            .limit(3)
            .forEach(otp -> System.out.println("   - Generated OTP: " + otp));

        // 4. Fibonacci Sequence Generator using Stream.iterate with arrays
        System.out.print("\n4. First 8 Fibonacci numbers via Stream.iterate: ");
        Stream.iterate(new int[]{0, 1}, f -> new int[]{f[1], f[0] + f[1]})
            .limit(8)
            .map(f -> f[0])
            .forEach(n -> System.out.print(n + " "));
        System.out.println();

        System.out.println("\n==========================================================================");
    }
}
