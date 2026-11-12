/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 18: Reverse String Program
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class ReverseStringDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("         REVERSE STRING ALGORITHMS (ICSE)         ");
        System.out.println("==================================================");

        String original = "BARRACKPORE";
        System.out.println("Original String: " + original);

        // Algorithm 1: Backward Loop (Most common in ICSE Section B)
        // Iterate from index (length - 1) down to 0
        String rev1 = "";
        for (int i = original.length() - 1; i >= 0; i--) {
            rev1 = rev1 + original.charAt(i);
        }
        System.out.println("\n[Algorithm 1: Backward Loop] : " + rev1);

        // Algorithm 2: Forward Loop with Prepending (ch + rev)
        String rev2 = "";
        for (int i = 0; i < original.length(); i++) {
            char ch = original.charAt(i);
            rev2 = ch + rev2; // Prepends character to front!
        }
        System.out.println("[Algorithm 2: Prepending Loop] : " + rev2);

        // Algorithm 3: In-place Char Array Two-Pointer Swap
        char[] chars = original.toCharArray();
        int left = 0;
        int right = chars.length - 1;
        while (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        String rev3 = new String(chars);
        System.out.println("[Algorithm 3: Two-Pointer Swap]: " + rev3);

        System.out.println("==================================================");
    }
}