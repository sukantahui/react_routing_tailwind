/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 9: Lexicographical Comparison Using compareTo()
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringCompareToDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("     LEXICOGRAPHICAL COMPARISON: COMPARETO()      ");
        System.out.println("==================================================");

        // 1. First character difference rule
        String s1 = "Apple";
        String s2 = "Banana";
        // 'A' is 65, 'B' is 66 -> 65 - 66 = -1
        int diff1 = s1.compareTo(s2);
        System.out.println("[1] \"Apple\".compareTo(\"Banana\") : " + diff1); // -1 (s1 < s2)

        // 2. Identical strings yield 0
        String s3 = "Barrackpore";
        String s4 = "Barrackpore";
        System.out.println("\n[2] \"Barrackpore\".compareTo(\"Barrackpore\") : " + s3.compareTo(s4)); // 0

        // 3. Positive difference
        System.out.println("\n[3] \"Banana\".compareTo(\"Apple\") : " + s2.compareTo(s1)); // +1

        // 4. Prefix difference (Length rule when one string is prefix of another)
        String p1 = "Book";
        String p2 = "Booklet";
        // 'Book' matches first 4 chars of 'Booklet', so difference = p1.length() - p2.length()
        // 4 - 7 = -3
        System.out.println("\n[4] Prefix Length Rule:");
        System.out.println("    \"Book\".compareTo(\"Booklet\") : " + p1.compareTo(p2)); // -3

        // 5. Case-insensitive compareTo
        System.out.println("\n[5] compareToIgnoreCase():");
        System.out.println("    \"apple\".compareTo(\"Apple\")           : " + "apple".compareTo("Apple")); // 97 - 65 = 32
        System.out.println("    \"apple\".compareToIgnoreCase(\"Apple\") : " + "apple".compareToIgnoreCase("Apple")); // 0

        System.out.println("==================================================");
    }
}