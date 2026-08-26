/**
 * File: PalindromeVerificationAlgorithmsDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 2)
 * Description: Implements comprehensive Palindromic Number & String Verification Algorithms in Java:
 *              1. Mathematical Integer Palindrome (Full digit reversal vs Half-reversal optimization)
 *              2. Two-Pointer String Palindrome with Alphanumeric filtering (O(N) Time, O(1) Space)
 *              3. Recursive Palindrome Verification (Base Case + Inductive Step)
 *              4. Benchmarking and Edge Case Handling (Negative numbers, single chars, case-insensitivity)
 *              for student verification codes at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

public class PalindromeVerificationAlgorithmsDemo {

    // =========================================================================
    // 1. MATHEMATICAL INTEGER PALINDROME (Half-Reversal: Prevents Overflow)
    // =========================================================================
    public static boolean isIntegerPalindrome(int x) {
        // Special Cases:
        // - Negative numbers are not palindrome (-121 != 121-)
        // - Numbers ending with 0 (except 0 itself) are not palindrome (10 != 01)
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }

        int reversedHalf = 0;
        // Reverses only half of the integer:
        while (x > reversedHalf) {
            reversedHalf = (reversedHalf * 10) + (x % 10);
            x /= 10;
        }

        // For even length: x == reversedHalf (e.g. 1221 -> x=12, rev=12)
        // For odd length : x == reversedHalf / 10 (e.g. 12321 -> x=12, rev=123)
        return (x == reversedHalf) || (x == reversedHalf / 10);
    }

    // =========================================================================
    // 2. TWO-POINTER STRING PALINDROME (O(N) Time, O(1) Auxiliary Space)
    // =========================================================================
    public static boolean isStringPalindromeTwoPointer(String s) {
        if (s == null) return false;

        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            // Skip non-alphanumeric characters on the left:
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            // Skip non-alphanumeric characters on the right:
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }

            // Compare case-insensitively:
            char charLeft = Character.toLowerCase(s.charAt(left));
            char charRight = Character.toLowerCase(s.charAt(right));

            if (charLeft != charRight) {
                return false; // Mismatch found
            }

            left++;
            right--;
        }
        return true;
    }

    // =========================================================================
    // 3. RECURSIVE STRING PALINDROME
    // =========================================================================
    public static boolean isStringPalindromeRecursive(String s, int left, int right) {
        // Base Case 1: Pointers meet or cross -> valid palindrome
        if (left >= right) {
            return true;
        }
        // Base Case 2: Character mismatch -> not a palindrome
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        // Recursive Step: Check inner substring
        return isStringPalindromeRecursive(s, left + 1, right - 1);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 2 PALINDROMIC VERIFICATION ALGORITHMS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. INTEGER PALINDROME TEST SUITE ---\n");

        int[] testNumbers = {12321, 1221, -121, 10, 0, 7, 1000021, 123454321};
        for (int num : testNumbers) {
            boolean isPal = isIntegerPalindrome(num);
            System.out.printf("  Number: %-12d | Is Palindrome? %s%n", num, isPal ? "✓ TRUE" : "❌ FALSE");
        }

        System.out.println("\n--- 2. TWO-POINTER STRING PALINDROME TEST SUITE ---\n");

        String[] testStrings = {
            "radar",
            "A man, a plan, a canal: Panama",
            "Barrackpore",
            "Was it a car or a cat I saw?",
            "No 'x' in Nixon",
            "Hello, World!"
        };

        for (String str : testStrings) {
            boolean isPal = isStringPalindromeTwoPointer(str);
            System.out.printf("  Phrase: \"%-32s\" | Palindrome: %s%n", str, isPal ? "✓ TRUE" : "❌ FALSE");
        }

        System.out.println("\n--- 3. RECURSIVE PALINDROME TEST ---\n");

        String word = "Malayalam";
        boolean recResult = isStringPalindromeRecursive(word, 0, word.length() - 1);
        System.out.printf("  Recursive verification of \"%s\": %s%n%n", word, recResult ? "✓ TRUE" : "❌ FALSE");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Half-number reversal avoids 32-bit integer overflow completely.");
        System.out.println("2. Two-pointer in-place string comparison achieves O(1) auxiliary memory.");
        System.out.println("3. Always filter out non-alphanumeric characters with Character.isLetterOrDigit().");
        System.out.println("4. Negative numbers can never be palindromes due to the leading minus sign.");
        System.out.println("================================================================================");
    }
}
