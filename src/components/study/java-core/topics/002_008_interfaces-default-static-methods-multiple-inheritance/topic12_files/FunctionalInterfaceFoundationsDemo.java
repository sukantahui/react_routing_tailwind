/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 12: Functional Interfaces (SAM) & the @FunctionalInterface Annotation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class FunctionalInterfaceFoundationsDemo {

    // FUNCTIONAL INTERFACE: Contains EXACTLY ONE abstract method (Single Abstract Method - SAM)
    // @FunctionalInterface annotation enforces SAM rule at compile-time!
    @FunctionalInterface
    public interface PerformanceEvaluator {
        // The SINGLE Abstract Method:
        int evaluateCandidate(int problemSolved, int speedBonus);

        // Can have any number of default or static methods:
        default void logEvaluation(int score) {
            System.out.println("  [EVALUATION RECORDED] Score: " + score + "/100");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: FUNCTIONAL INTERFACES (SAM) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Implementation via Modern Lambda Expression:
        PerformanceEvaluator fullStackEvaluator = (solved, bonus) -> (solved * 10) + bonus;

        int swadeepScore = fullStackEvaluator.evaluateCandidate(8, 15);
        System.out.println(">>> Swadeep Paul Evaluation:");
        fullStackEvaluator.logEvaluation(swadeepScore);

        System.out.println("\n>>> Core Functional Interface Requirements:");
        System.out.println("  1. Exactly ONE abstract method.");
        System.out.println("  2. Can have multiple default and static methods.");
        System.out.println("  3. Serves as target type for Lambda Expressions & Method References.");

        System.out.println("\n==========================================================================");
    }
}