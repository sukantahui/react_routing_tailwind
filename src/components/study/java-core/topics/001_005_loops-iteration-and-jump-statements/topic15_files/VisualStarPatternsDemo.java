/**
 * File: VisualStarPatternsDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 15)
 * Description: Demonstrates algorithmic generation of 2D visual star patterns in Java:
 *              Right-Angled Triangle, Inverted Triangle, Centered Full Pyramid,
 *              Symmetrical Full Diamond, and Hollow Diamond structures
 *              for stage lighting grids at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class VisualStarPatternsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 15 2D VISUAL STAR PATTERNS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        int n = 4; // Height dimension

        // 1. Right-Angled Star Triangle
        System.out.println("--- 1. RIGHT-ANGLED TRIANGLE ---");
        for (int r = 1; r <= n; r++) {
            for (int c = 1; c <= r; c++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // 2. Inverted Right-Angled Triangle
        System.out.println("\n--- 2. INVERTED RIGHT-ANGLED TRIANGLE ---");
        for (int r = n; r >= 1; r--) {
            for (int c = 1; c <= r; c++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // 3. Centered Full Pyramid (Spaces = n - r, Stars = 2*r - 1)
        System.out.println("\n--- 3. CENTERED FULL PYRAMID ---");
        for (int r = 1; r <= n; r++) {
            // Leading Spaces:
            for (int s = 1; s <= (n - r); s++) {
                System.out.print("  ");
            }
            // Odd Stars:
            for (int st = 1; st <= (2 * r - 1); st++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // 4. Symmetrical Full Diamond (Top Pyramid + Inverted Lower Pyramid)
        System.out.println("\n--- 4. SYMMETRICAL FULL DIAMOND ---");
        // Upper Half:
        for (int r = 1; r <= n; r++) {
            for (int s = 1; s <= (n - r); s++) System.out.print("  ");
            for (int st = 1; st <= (2 * r - 1); st++) System.out.print("* ");
            System.out.println();
        }
        // Lower Inverted Half:
        for (int r = n - 1; r >= 1; r--) {
            for (int s = 1; s <= (n - r); s++) System.out.print("  ");
            for (int st = 1; st <= (2 * r - 1); st++) System.out.print("* ");
            System.out.println();
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Outer loop controls ROWS (r = 1 to N).");
        System.out.println("2. First inner loop controls LEADING SPACES (N - r for centered pyramids).");
        System.out.println("3. Second inner loop controls STARS (2*r - 1 for centered pyramid odd sequences).");
        System.out.println("4. Always break the line with System.out.println() after inner loops complete.");
        System.out.println("================================================================================");
    }
}
