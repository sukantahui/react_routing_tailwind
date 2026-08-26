/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 3: Pseudo-Random Number Generation: Math.random() vs java.util.Random
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.util.Random;

public class PseudoRandomNumberGenerationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: PSEUDO-RANDOM NUMBER GENERATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Using Math.random() -> Returns double in [0.0, 1.0):
        double rawRandom = Math.random();
        System.out.println(">>> 1. Math.random() Raw Output: " + rawRandom);

        // Generating a random integer between min=1 and max=100 (inclusive):
        int min = 1, max = 100;
        int randomInRange = (int) (Math.random() * (max - min + 1)) + min;
        System.out.printf("  Random Number [%d - %d]: %d%n", min, max, randomInRange);

        // 2. Using java.util.Random (More flexible API):
        Random rng = new Random();
        int diceRoll = rng.nextInt(6) + 1; // [1 to 6]
        boolean coinFlip = rng.nextBoolean();
        double gaussianValue = rng.nextGaussian(); // Normal distribution (mean 0.0, std dev 1.0)

        System.out.println("\n>>> 2. java.util.Random Capabilities:");
        System.out.println("  Dice Roll (1-6)    : " + diceRoll);
        System.out.println("  Coin Flip (Boolean): " + coinFlip);
        System.out.printf("  Gaussian Value     : %.4f%n", gaussianValue);

        System.out.println("\n==========================================================================");
    }
}