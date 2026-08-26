/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 8: Primitive Streams (IntStream, LongStream, DoubleStream) & Performance
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class PrimitiveStreamsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: PRIMITIVE STREAMS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. IntStream.range(1, 5) [Exclusive] vs IntStream.rangeClosed(1, 5) [Inclusive]
        System.out.print("1. IntStream.range(1, 5) [1..4]: ");
        IntStream.range(1, 5).forEach(n -> System.out.print(n + " "));
        System.out.println();

        System.out.print("2. IntStream.rangeClosed(1, 5) [1..5]: ");
        IntStream.rangeClosed(1, 5).forEach(n -> System.out.print(n + " "));
        System.out.println();

        // 3. Built-in Numeric Terminal Reductions: sum(), average(), min(), max()
        int sum = IntStream.rangeClosed(1, 100).sum();
        System.out.println("\n3. Sum of 1 to 100 via IntStream: " + sum);

        // 4. IntSummaryStatistics: All summary stats in a single pass
        IntSummaryStatistics stats = IntStream.of(88, 94, 76, 91, 65).summaryStatistics();
        System.out.println("4. Student Score Statistics:");
        System.out.println("   - Count   : " + stats.getCount());
        System.out.println("   - Min     : " + stats.getMin());
        System.out.println("   - Max     : " + stats.getMax());
        System.out.println("   - Average : " + stats.getAverage());
        System.out.println("   - Sum     : " + stats.getSum());

        // 5. Converting between Object Stream and Primitive Stream (mapToInt vs boxed)
        List<String> names = List.of("Swadeep", "Tuhina", "Abhronila");
        IntStream lengthStream = names.stream().mapToInt(String::length); // Object -> Primitive
        Stream<Integer> boxedStream = lengthStream.boxed();               // Primitive -> Object
        System.out.println("\n5. Boxed lengths list: " + boxedStream.toList());

        System.out.println("==========================================================================");
    }
}
