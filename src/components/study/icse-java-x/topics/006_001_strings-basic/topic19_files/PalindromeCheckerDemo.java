/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 19: Palindrome Checking Program
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class PalindromeCheckerDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          PALINDROME CHECKING ALGORITHMS          ");
        System.out.println("==================================================");

        String[] testWords = {"MADAM", "ROTATOR", "RACECAR", "BARACKPORE", "Malayalam"};

        for (String word : testWords) {
            boolean isPalin = checkPalindrome(word);
            System.out.println("Word: " + String.format("%-14s", "\"" + word + "\"") + 
                               " -> Is Palindrome? " + (isPalin ? "YES [✓]" : "NO [X]"));
        }

        // Two-pointer in-place check (Memory efficient: O(1) space)
        System.out.println("\n[Two-Pointer In-Place Check for 'ROTATOR']:");
        boolean fastCheck = isPalindromeTwoPointer("ROTATOR");
        System.out.println("Result: " + fastCheck);

        System.out.println("==================================================");
    }

    // Standard ICSE Section B Reversal Technique
    public static boolean checkPalindrome(String str) {
        String clean = str.toUpperCase();
        String rev = "";
        for (int i = clean.length() - 1; i >= 0; i--) {
            rev = rev + clean.charAt(i);
        }
        return clean.equals(rev);
    }

    // Advanced Two-Pointer Convergence Technique (Zero allocation)
    public static boolean isPalindromeTwoPointer(String str) {
        String s = str.toUpperCase();
        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}