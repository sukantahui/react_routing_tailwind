/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 8: Case-Sensitive and Case-Insensitive Comparison
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringCaseSensitivityDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   CASE-SENSITIVE VS CASE-INSENSITIVE COMPARISON  ");
        System.out.println("==================================================");

        String city1 = "Barrackpore";
        String city2 = "barrackpore";
        String city3 = "BARRACKPORE";

        System.out.println("city1: \"" + city1 + "\"");
        System.out.println("city2: \"" + city2 + "\"");
        System.out.println("city3: \"" + city3 + "\"");

        // 1. Case-sensitive comparison: equals()
        System.out.println("\n[1] Case-Sensitive Comparison (.equals()):");
        System.out.println("city1.equals(city2) : " + city1.equals(city2)); // false ('B' != 'b')
        System.out.println("city1.equals(city3) : " + city1.equals(city3)); // false

        // 2. Case-insensitive comparison: equalsIgnoreCase()
        System.out.println("\n[2] Case-Insensitive Comparison (.equalsIgnoreCase()):");
        System.out.println("city1.equalsIgnoreCase(city2) : " + city1.equalsIgnoreCase(city2)); // true!
        System.out.println("city1.equalsIgnoreCase(city3) : " + city1.equalsIgnoreCase(city3)); // true!

        // 3. ICSE Board Practical: Menu Choice validation
        String userChoice = "YES";
        if (userChoice.equalsIgnoreCase("yes")) {
            System.out.println("\n[3] Menu choice accepted: Processing admission at Ichapur!");
        }

        System.out.println("==================================================");
    }
}