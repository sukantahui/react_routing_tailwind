/**
 * File: ClassicNumberLoopProblemsDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 17)
 * Description: Demonstrates algorithmic solutions to the classic suite of number theory loop problems:
 *              1. Optimized Prime Number Check (O(sqrt(N)))
 *              2. Armstrong (Narcissistic) Number Verification (sum(d^k) == N)
 *              3. Palindrome Number Reversal
 *              4. Factorial Accumulation (N!)
 *              5. Iterative Fibonacci Series (O(N) time, O(1) space)
 *              for student ID security tokens at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class ClassicNumberLoopProblemsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 17 NUMBER THEORY LOOP PROBLEMS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Optimized Prime Number Check (O(sqrt(N)))
        System.out.println("--- 1. OPTIMIZED PRIME NUMBER CHECK ---");
        int candidatePrime = 29;
        boolean isPrime = candidatePrime > 1;

        for (int i = 2; i * i <= candidatePrime; i++) {
            if (candidatePrime % i == 0) {
                isPrime = false;
                break; // Found a factor, exit early!
            }
        }
        System.out.printf("  Number %d -> %s (Checked up to sqrt(%d) = %d)%n%n",
                candidatePrime, (isPrime ? "✓ PRIME" : "❌ COMPOSITE"), candidatePrime, (int) Math.sqrt(candidatePrime));

        // 2. Armstrong Number Check (e.g. 153, 370, 371, 9474)
        System.out.println("--- 2. ARMSTRONG (NARCISSISTIC) NUMBER CHECK ---");
        int armstrongCandidate = 153;
        int originalNumber = armstrongCandidate;
        int numDigits = String.valueOf(armstrongCandidate).length();
        int sumOfPoweredDigits = 0;
        int temp = armstrongCandidate;

        while (temp > 0) {
            int digit = temp % 10;
            sumOfPoweredDigits += Math.pow(digit, numDigits);
            temp /= 10;
        }
        boolean isArmstrong = (sumOfPoweredDigits == originalNumber);
        System.out.printf("  Number %d -> Digit Power Sum = %d -> %s%n%n",
                originalNumber, sumOfPoweredDigits, (isArmstrong ? "✓ ARMSTRONG NUMBER" : "❌ NOT ARMSTRONG"));

        // 3. Palindrome Number Check
        System.out.println("--- 3. PALINDROME NUMBER CHECK ---");
        int palindromeCandidate = 12321;
        int tempPal = palindromeCandidate;
        int reversedNumber = 0;

        while (tempPal > 0) {
            int digit = tempPal % 10;
            reversedNumber = (reversedNumber * 10) + digit;
            tempPal /= 10;
        }
        boolean isPalindrome = (palindromeCandidate == reversedNumber);
        System.out.printf("  Original: %d | Reversed: %d -> %s%n%n",
                palindromeCandidate, reversedNumber, (isPalindrome ? "✓ PALINDROME" : "❌ NOT PALINDROME"));

        // 4. Factorial Accumulation (N!)
        System.out.println("--- 4. FACTORIAL ACCUMULATION (N!) ---");
        int factN = 6;
        long factorialResult = 1;
        for (int i = 1; i <= factN; i++) {
            factorialResult *= i;
        }
        System.out.printf("  %d! Factorial = %,d%n%n", factN, factorialResult);

        // 5. Iterative Fibonacci Series (First N terms)
        System.out.println("--- 5. ITERATIVE FIBONACCI SEQUENCE ---");
        int fibTerms = 8;
        long a = 0, b = 1;
        System.out.print("  First " + fibTerms + " Fibonacci numbers: ");

        for (int i = 1; i <= fibTerms; i++) {
            System.out.print(a + " ");
            long next = a + b;
            a = b;
            b = next;
        }
        System.out.println("\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Prime Check: Only test factors up to i * i <= N with early 'break'.");
        System.out.println("2. Armstrong Check: Count digits, extract each digit, compute sum(d^k).");
        System.out.println("3. Palindrome: Reverse mathematically via 'rev = rev*10 + n%10' and compare.");
        System.out.println("4. Fibonacci: Use 2-variable state shifting for O(N) time and O(1) space.");
        System.out.println("================================================================================");
    }
}
