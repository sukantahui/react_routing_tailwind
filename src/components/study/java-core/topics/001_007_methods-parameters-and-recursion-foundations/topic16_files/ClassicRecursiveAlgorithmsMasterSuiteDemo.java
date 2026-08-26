/**
 * File: ClassicRecursiveAlgorithmsMasterSuiteDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 16)
 * Description: Implements the 5 quintessential Classic Recursive Algorithms in Java:
 *              1. Factorial: n! = n * (n - 1)!
 *              2. Fibonacci (Memoized & Naive): fib(n) = fib(n - 1) + fib(n - 2)
 *              3. Sum of Digits: sum(n) = (n % 10) + sum(n / 10)
 *              4. Fast Exponentiation (Binary Power): O(log N) Divide-and-Conquer
 *              5. Tower of Hanoi: 3-Peg Classic Puzzle in 2^N - 1 moves
 *              for computational problem solving in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class ClassicRecursiveAlgorithmsMasterSuiteDemo {

    private static int hanoiMoveCount = 0;

    // =========================================================================
    // 1. FACTORIAL: n! = n * (n - 1)!
    // =========================================================================
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // =========================================================================
    // 2. FIBONACCI WITH MEMOIZATION: O(N) Linear Time
    // =========================================================================
    public static long fibonacciMemo(int n, long[] memo) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        if (memo[n] != 0) return memo[n]; // Cache hit

        memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
        return memo[n];
    }

    // =========================================================================
    // 3. SUM OF DIGITS: sum(n) = (n % 10) + sum(n / 10)
    // =========================================================================
    public static int sumOfDigits(int n) {
        n = Math.abs(n); // Defensive handling of negative numbers
        if (n == 0) return 0;
        return (n % 10) + sumOfDigits(n / 10);
    }

    // =========================================================================
    // 4. FAST EXPONENTIATION (BINARY POWER): O(log N) Time
    // =========================================================================
    public static double fastPower(double base, int exp) {
        if (exp == 0) return 1.0;
        if (exp < 0) return 1.0 / fastPower(base, -exp);

        double half = fastPower(base, exp / 2);
        if (exp % 2 == 0) {
            return half * half; // Even power: (base^(exp/2))^2
        } else {
            return base * half * half; // Odd power: base * (base^(exp/2))^2
        }
    }

    // =========================================================================
    // 5. TOWER OF HANOI: 3-Peg Puzzle (Source, Helper, Destination)
    // =========================================================================
    public static void solveTowerOfHanoi(int n, char source, char helper, char destination) {
        if (n == 1) {
            hanoiMoveCount++;
            System.out.printf("  Move %2d: Transfer Disk 1 from Peg %c -> Peg %c%n",
                    hanoiMoveCount, source, destination);
            return;
        }

        // Step 1: Move top (n - 1) disks from Source to Helper using Destination as auxiliary
        solveTowerOfHanoi(n - 1, source, destination, helper);

        // Step 2: Move the nth (largest) disk directly from Source to Destination
        hanoiMoveCount++;
        System.out.printf("  Move %2d: Transfer Disk %d from Peg %c -> Peg %c%n",
                hanoiMoveCount, n, source, destination);

        // Step 3: Move (n - 1) disks from Helper to Destination using Source as auxiliary
        solveTowerOfHanoi(n - 1, helper, source, destination);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 16 CLASSIC RECURSIVE ALGORITHMS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Factorial
        int factN = 6;
        System.out.printf("1. FACTORIAL: %d! = %d%n%n", factN, factorial(factN));

        // 2. Fibonacci with Memoization
        int fibN = 40;
        long[] memo = new long[fibN + 1];
        long fibVal = fibonacciMemo(fibN, memo);
        System.out.printf("2. FIBONACCI (Memoized): fib(%d) = %,d [Computed instantaneously!]%n%n", fibN, fibVal);

        // 3. Sum of Digits
        int rollNumber = 98452;
        System.out.printf("3. SUM OF DIGITS: sumOfDigits(%d) = %d%n%n", rollNumber, sumOfDigits(rollNumber));

        // 4. Fast Power Calculation
        double base = 2.0;
        int exp = 10;
        System.out.printf("4. FAST POWER: (%.1f)^%d = %.2f [Computed in O(log N) time]%n%n", base, exp, fastPower(base, exp));

        // 5. Tower of Hanoi (3 Disks)
        System.out.println("5. TOWER OF HANOI (3 Disks from Peg A -> Peg C using Peg B):");
        hanoiMoveCount = 0;
        solveTowerOfHanoi(3, 'A', 'B', 'C');
        System.out.printf("   Total Moves: %d (Formula: 2^3 - 1 = %d)%n%n", hanoiMoveCount, (int) Math.pow(2, 3) - 1);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Factorial (n!) provides the linear recursion prototype.");
        System.out.println("2. Memoization accelerates Fibonacci from O(2^N) down to O(N) linear time.");
        System.out.println("3. Sum of Digits decomposes numbers logarithmically using % 10 and / 10.");
        System.out.println("4. Fast Power squares half-results, achieving lightning-fast O(log N) time.");
        System.out.println("5. Tower of Hanoi elegantly solves a 3-peg puzzle in exactly 2^N - 1 moves.");
        System.out.println("================================================================================");
    }
}
