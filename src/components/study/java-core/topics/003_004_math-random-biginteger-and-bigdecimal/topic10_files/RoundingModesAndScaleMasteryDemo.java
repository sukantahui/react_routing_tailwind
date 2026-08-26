/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 10: Non-Terminating Decimals: RoundingMode (HALF_UP vs HALF_EVEN Banker's Rounding)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class RoundingModesAndScaleMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: RoundingMode (HALF_UP vs HALF_EVEN) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BigDecimal val1 = new BigDecimal("2.5");
        BigDecimal val2 = new BigDecimal("3.5");

        System.out.println(">>> 1. RoundingMode.HALF_UP (Standard School Math - 0.5 always rounds UP):");
        System.out.println("  2.5 -> " + val1.setScale(0, RoundingMode.HALF_UP) + " (Rounds UP to 3)");
        System.out.println("  3.5 -> " + val2.setScale(0, RoundingMode.HALF_UP) + " (Rounds UP to 4)");

        System.out.println("\n>>> 2. RoundingMode.HALF_EVEN (Banker's Rounding - IEEE 754 Standard):");
        System.out.println("  2.5 -> " + val1.setScale(0, RoundingMode.HALF_EVEN) + " (Rounds to nearest EVEN integer: 2!)");
        System.out.println("  3.5 -> " + val2.setScale(0, RoundingMode.HALF_EVEN) + " (Rounds to nearest EVEN integer: 4!)");

        System.out.println("\n>>> WHY BANKERS PREFER HALF_EVEN:");
        System.out.println("  - In standard HALF_UP, 0.5 ALWAYS rounds up, introducing a systematic upward bias.");
        System.out.println("  - HALF_EVEN rounds half of the numbers up and half down, balancing out statistical errors across millions of transactions!");

        System.out.println("\n==========================================================================");
    }
}