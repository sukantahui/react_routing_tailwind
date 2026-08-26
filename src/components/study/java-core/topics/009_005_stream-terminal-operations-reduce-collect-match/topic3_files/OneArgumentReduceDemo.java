/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 3: 1-Argument reduce(BinaryOperator<T>) - Optional Accumulations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;
import java.util.Optional;

public class OneArgumentReduceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: 1-ARGUMENT REDUCE(BINARYOPERATOR) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentNames = List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee"
        );

        // 1. Finding Longest Student Name via 1-Arg reduce
        Optional<String> longestName = studentNames.stream()
            .reduce((name1, name2) -> name1.length() >= name2.length() ? name1 : name2);

        System.out.println("1. Longest Name: " + longestName.orElse("No students found"));

        // 2. Finding Minimum Score via 1-Arg reduce
        List<Double> scores = List.of(88.5, 94.0, 76.5, 91.0);
        Optional<Double> minScore = scores.stream()
            .reduce(Double::min);

        System.out.println("2. Minimum Score: " + minScore.orElse(0.0));

        // 3. Behavior on an EMPTY stream: returns Optional.empty()
        List<Double> emptyList = List.of();
        Optional<Double> emptyResult = emptyList.stream()
            .reduce(Double::min);

        System.out.println("3. Empty Stream Reduce Result: " + emptyResult);
        System.out.println("   - Is present: " + emptyResult.isPresent());
        System.out.println("   - orElse value: " + emptyResult.orElse(-1.0));

        System.out.println("\n==========================================================================");
    }
}
