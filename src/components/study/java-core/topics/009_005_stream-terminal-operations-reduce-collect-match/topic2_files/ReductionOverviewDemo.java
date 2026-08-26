/**
 * Java Core Tutorial - Module 009_005: Stream Terminal Operations, Reductions & Short-Circuiting
 * Topic 2: Reduction with reduce() - Overview of Fold Aggregations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.terminal;

import java.util.List;
import java.util.Optional;

public class ReductionOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: REDUCTION WITH REDUCE() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<Integer> testScores = List.of(88, 92, 75, 94, 85);

        // 1. Conceptual Breakdown of Reduction:
        // Step 1: (88 + 92) = 180
        // Step 2: (180 + 75) = 255
        // Step 3: (255 + 94) = 349
        // Step 4: (349 + 85) = 434 -> Final Reduced Value!
        System.out.println(">>> 1. REDUCTION PROCESS (Sum of " + testScores + "):");
        Optional<Integer> totalSum = testScores.stream()
            .reduce((accum, val) -> {
                int result = accum + val;
                System.out.println("   [ACCUMULATING] " + accum + " + " + val + " = " + result);
                return result;
            });

        System.out.println("   --> Total Sum: " + totalSum.orElse(0));

        // 2. Finding Max using reduce(BinaryOperator)
        Optional<Integer> maxScore = testScores.stream()
            .reduce(Integer::max);
        System.out.println("\n2. Maximum Score via reduce(Integer::max): " + maxScore.orElse(0));

        // 3. Joining Strings with reduce
        List<String> branches = List.of("Barrackpore", "Naihati", "Shyamnagar", "Ichapur");
        String joinedBranches = branches.stream()
            .reduce("", (accum, branch) -> accum.isEmpty() ? branch : accum + " -> " + branch);
        System.out.println("3. Joined Branch Flow: " + joinedBranches);

        System.out.println("\n==========================================================================");
    }
}
