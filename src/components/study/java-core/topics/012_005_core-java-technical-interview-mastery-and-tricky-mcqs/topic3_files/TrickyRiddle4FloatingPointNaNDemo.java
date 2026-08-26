/**
 * Java Core Tutorial - Module 012_005: Interview Mastery & Tricky MCQs
 * Topic 3: Tricky Riddle 4 - Floating Point NaN & Signed Zeros
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interview;

public class TrickyRiddle4FloatingPointNaNDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TRICKY RIDDLE 4: IEEE 754 NAN & SIGNED ZEROS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        double nan = Double.NaN;
        System.out.println("1. Double.NaN == Double.NaN               -> " + (nan == nan)); // FALSE!
        System.out.println("   Double.isNaN(Double.NaN)               -> " + Double.isNaN(nan)); // TRUE

        double posZero = +0.0;
        double negZero = -0.0;
        System.out.println("
2. Primitive -0.0 == +0.0                  -> " + (negZero == posZero)); // TRUE
        System.out.println("   Double.valueOf(-0.0).equals(0.0)       -> " + Double.valueOf(negZero).equals(Double.valueOf(posZero))); // FALSE!

        System.out.println("
3. Division by Zero with Floating Point:");
        System.out.println("   1.0 / 0.0                              -> " + (1.0 / 0.0)); // Infinity (No Exception!)
        System.out.println("   -1.0 / 0.0                             -> " + (-1.0 / 0.0)); // -Infinity
        System.out.println("   0.0 / 0.0                              -> " + (0.0 / 0.0)); // NaN

        System.out.println("\n==========================================================================");
    }
}
