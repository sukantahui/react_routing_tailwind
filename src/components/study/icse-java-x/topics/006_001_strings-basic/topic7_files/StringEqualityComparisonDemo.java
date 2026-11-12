/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 7: String Comparison Using == and equals()
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringEqualityComparisonDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("     STRING COMPARISON: == VS EQUALS()            ");
        System.out.println("==================================================");

        // Case 1: Identical literals (String Constant Pool)
        String s1 = "Barrackpore";
        String s2 = "Barrackpore";
        System.out.println("[Case 1: Literals in SCP]");
        System.out.println("s1 == s2       : " + (s1 == s2));       // true (same address)
        System.out.println("s1.equals(s2)  : " + s1.equals(s2));    // true (same characters)

        // Case 2: Heap Object vs Literal
        String s3 = new String("Barrackpore");
        System.out.println("\n[Case 2: Literal vs 'new' Heap Object]");
        System.out.println("s1 == s3       : " + (s1 == s3));       // false (different addresses!)
        System.out.println("s1.equals(s3)  : " + s1.equals(s3));    // true (same characters)

        // Case 3: Two separate Heap Objects
        String s4 = new String("Barrackpore");
        System.out.println("\n[Case 3: Two separate 'new' Heap Objects]");
        System.out.println("s3 == s4       : " + (s3 == s4));       // false (distinct addresses!)
        System.out.println("s3.equals(s4)  : " + s3.equals(s4));    // true (same characters)

        // Case 4: Null safety demonstration
        String input = null;
        System.out.println("\n[Case 4: Null Safety]");
        // Bad: input.equals("Barrackpore") -> Throws NullPointerException!
        // Good practice:
        System.out.println(""Barrackpore".equals(input) : " + "Barrackpore".equals(input)); // false (Safe!)

        System.out.println("==================================================");
    }
}