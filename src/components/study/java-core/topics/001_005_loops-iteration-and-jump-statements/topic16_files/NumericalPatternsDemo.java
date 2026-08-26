/**
 * File: NumericalPatternsDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 16)
 * Description: Demonstrates algorithmic numerical patterns in Java:
 *              Floyd's Triangle (continuous running counter), Binary Alternating Patterns ((r+c)%2 parity),
 *              Palindromic Number Pyramids, and Pascal's Triangle Binomial Foundations
 *              for exam token allocation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class NumericalPatternsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 16 NUMERICAL PATTERNS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        int n = 4;

        // 1. Floyd's Triangle (Sequential Natural Numbers)
        System.out.println("--- 1. FLOYD'S TRIANGLE ---");
        int floydCounter = 1;
        for (int r = 1; r <= n; r++) {
            for (int c = 1; c <= r; c++) {
                System.out.printf("%-3d", floydCounter++);
            }
            System.out.println();
        }

        // 2. Binary Alternating Triangle (0 / 1 Parity Check)
        System.out.println("\n--- 2. BINARY ALTERNATING PATTERN ((r + c) % 2) ---");
        for (int r = 1; r <= n; r++) {
            for (int c = 1; c <= r; c++) {
                // If sum of row and col is even -> 1, else -> 0:
                System.out.print(((r + c) % 2 == 0 ? 1 : 0) + " ");
            }
            System.out.println();
        }

        // 3. Palindromic Number Pyramid (1 -> 1 2 1 -> 1 2 3 2 1)
        System.out.println("\n--- 3. PALINDROMIC NUMBER PYRAMID ---");
        for (int r = 1; r <= n; r++) {
            // Spaces:
            for (int s = 1; s <= (n - r); s++) System.out.print("  ");
            // Ascending (1 to r):
            for (int a = 1; a <= r; a++) System.out.print(a + " ");
            // Descending (r - 1 down to 1):
            for (int d = r - 1; d >= 1; d--) System.out.print(d + " ");
            System.out.println();
        }

        // 4. Pascal's Triangle Foundations (Binomial Recurrence)
        System.out.println("\n--- 4. PASCAL'S TRIANGLE (BINOMIAL COMBINATIONS) ---");
        for (int r = 0; r < n; r++) {
            for (int s = 1; s <= (n - r); s++) System.out.print("  ");
            int val = 1;
            for (int c = 0; c <= r; c++) {
                System.out.printf("%4d", val);
                val = val * (r - c) / (c + 1); // Recurrence: C(n, k+1) = C(n,k) * (n-k)/(k+1)
            }
            System.out.println();
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Floyd's triangle maintains a single running counter outside the loop (count++).");
        System.out.println("2. Binary alternating patterns rely on coordinate parity: (r + c) % 2 == 0.");
        System.out.println("3. Palindromic pyramids combine ascending (1..r) and descending (r-1..1) loops.");
        System.out.println("4. Pascal's triangle uses the $O(1)$ binomial recurrence: val = val * (r - c) / (c + 1).");
        System.out.println("================================================================================");
    }
}
