/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_002: Basic String Methods
 * Topic 1: charAt(int index) Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class CharAtMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          CHARAT() METHOD IN JAVA (ICSE)          ");
        System.out.println("==================================================");

        String school = "BARRACKPORE";
        int len = school.length();

        System.out.println("String: \"" + school + "\" (Length: " + len + ")");

        // 1. Accessing first, middle, and last characters
        char first = school.charAt(0);
        char middle = school.charAt(len / 2);
        char last = school.charAt(len - 1);

        System.out.println("\n[1] Key Character Positions:");
        System.out.println("    First character (index 0)        : '" + first + "'");
        System.out.println("    Middle character (index " + (len / 2) + ")       : '" + middle + "'");
        System.out.println("    Last character (index " + (len - 1) + ")      : '" + last + "'");

        // 2. Safe iteration using charAt
        System.out.println("\n[2] Character Index Map:");
        for (int i = 0; i < len; i++) {
            System.out.println("    Index [" + i + "] -> '" + school.charAt(i) + "'");
        }

        System.out.println("==================================================");
    }
}