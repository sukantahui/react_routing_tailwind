/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_003: Advanced String Methods
 * Topic 2: compareTo() vs compareToIgnoreCase()
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class CompareToMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    COMPARETO() LEXICOGRAPHICAL ORDER IN JAVA     ");
        System.out.println("==================================================");

        String s1 = "Apple";
        String s2 = "Banana";
        String s3 = "Apple";
        String s4 = "apple";

        // 1. Lexicographical comparisons (s1 vs s2)
        // 'A' is 65, 'B' is 66 -> 65 - 66 = -1
        System.out.println("\"Apple\".compareTo(\"Banana\") : " + s1.compareTo(s2)); // -1

        // 2. Exact match returns 0
        System.out.println("\"Apple\".compareTo(\"Apple\")  : " + s1.compareTo(s3)); // 0

        // 3. Case difference ('A' = 65, 'a' = 97 -> 65 - 97 = -32)
        System.out.println("\"Apple\".compareTo(\"apple\")  : " + s1.compareTo(s4)); // -32

        // 4. Case-insensitive compareToIgnoreCase()
        System.out.println("\"Apple\".compareToIgnoreCase(\"apple\") : " + s1.compareToIgnoreCase(s4)); // 0

        // 5. Prefix strings of different lengths
        String p1 = "Book";
        String p2 = "Booklet";
        // When one is prefix of another, result is length difference: 4 - 7 = -3
        System.out.println("\nPrefix length comparison: \"Book\".compareTo(\"Booklet\") : " + p1.compareTo(p2)); // -3

        // 6. Alphabetical sort simulation for two names
        String name1 = "Tuhina";
        String name2 = "Debangshu";
        if (name1.compareTo(name2) > 0) {
            System.out.println("\nIn dictionary order: " + name2 + ", then " + name1);
        } else {
            System.out.println("\nIn dictionary order: " + name1 + ", then " + name2);
        }
    }
}
