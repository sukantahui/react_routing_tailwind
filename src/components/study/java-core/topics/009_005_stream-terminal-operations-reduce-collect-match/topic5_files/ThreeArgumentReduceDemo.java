/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 5: 3-Argument reduce(U identity, BiFunction accumulator, BinaryOperator combiner)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;

public class ThreeArgumentReduceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: 3-ARGUMENT REDUCE (PARALLEL COMBINER) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentScore> scoreRecords = List.of(
            new StudentScore("Swadeep Paul", 88),
            new StudentScore("Tuhina Das", 94),
            new StudentScore("Abhronila Das", 76),
            new StudentScore("Debangshu Mukherjee", 92)
        );

        // 3-Argument reduce:
        // Type T: StudentScore (Input element)
        // Type U: Integer (Accumulator result)
        // 1. Identity: 0 (Integer)
        // 2. Accumulator (BiFunction<Integer, StudentScore, Integer>): (total, s) -> total + s.score()
        // 3. Combiner (BinaryOperator<Integer>): (total1, total2) -> total1 + total2 (Used in parallel mode)
        
        System.out.println(">>> 1. Sequential 3-Arg Reduce (Sum of scores):");
        int sequentialSum = scoreRecords.stream()
            .reduce(
                0,                                                  // Identity U
                (total, student) -> total + student.score(),       // Accumulator: (U, T) -> U
                Integer::sum                                        // Combiner: (U, U) -> U
            );
        System.out.println("   Sequential Total Score: " + sequentialSum);

        System.out.println("\n>>> 2. Parallel 3-Arg Reduce (Combiner merges thread results):");
        int parallelSum = scoreRecords.parallelStream()
            .reduce(
                0,
                (total, student) -> {
                    System.out.println("   [Thread " + Thread.currentThread().getName() + "] Accumulating: " + student.name());
                    return total + student.score();
                },
                (subtotal1, subtotal2) -> {
                    System.out.println("   [COMBINER MERGE] " + subtotal1 + " + " + subtotal2);
                    return subtotal1 + subtotal2;
                }
            );
        System.out.println("   Parallel Total Score: " + parallelSum);

        System.out.println("\n==========================================================================");
    }

    record StudentScore(String name, int score) {}
}
