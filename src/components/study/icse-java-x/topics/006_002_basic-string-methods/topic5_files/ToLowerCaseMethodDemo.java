/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_002: Basic String Methods
 * Topic 5: toLowerCase() Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class ToLowerCaseMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("       TOLOWERCASE() METHOD IN JAVA (ICSE)        ");
        System.out.println("==================================================");

        String title = "ICSE Computer Applications 2026!";
        System.out.println("Original: \"" + title + "\"");

        // 1. Converting to lowercase
        String lower = title.toLowerCase();
        System.out.println("\nAfter toLowerCase(): \"" + lower + "\"");

        // 2. Checking characters: Digits and symbols remain untouched
        System.out.println("\nNotice: '2026' and '!' remain unchanged!");

        // 3. Immutability verification
        System.out.println("Original variable 'title' is still: \"" + title + "\"");

        System.out.println("==================================================");
    }
}