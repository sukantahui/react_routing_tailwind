/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_003: Advanced String Methods
 * Topic 4: substring() Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class SubstringMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          SUBSTRING() METHOD IN JAVA (ICSE)       ");
        System.out.println("==================================================");

        // Index: 01234567890
        String str = "BARRACKPORE";
        System.out.println("String: \"" + str + "\" (Length: " + str.length() + ")");

        // 1. Single-argument substring(beginIndex)
        // Extracts from beginIndex all the way to the end of the string
        String sub1 = str.substring(7); // from index 7 to end
        System.out.println("\nstr.substring(7)       : \"" + sub1 + "\""); // "PORE"

        // 2. Dual-argument substring(beginIndex, endIndex)
        // CRITICAL RULE: beginIndex is INCLUSIVE, endIndex is EXCLUSIVE!
        // Length of extracted string = endIndex - beginIndex (7 - 0 = 7)
        String sub2 = str.substring(0, 7);
        System.out.println("str.substring(0, 7)    : \"" + sub2 + "\""); // "BARRACK"

        // 3. Extracting middle parts
        String sub3 = str.substring(3, 7); // 7 - 3 = 4 characters
        System.out.println("str.substring(3, 7)    : \"" + sub3 + "\""); // "RACK"

        // 4. Pig Latin logic demonstration: "LONDON" -> "ONDONLY"
        String word = "LONDON";
        // First letter: substring(0, 1) -> "L"
        // Remaining : substring(1)    -> "ONDON"
        String pigLatin = word.substring(1) + word.substring(0, 1) + "AY";
        System.out.println("\nPig Latin of \"" + word + "\" : " + pigLatin); // ONDONLAY

        // 5. Common ICSE edge cases
        System.out.println("\nstr.substring(0, str.length()) equals str: " + str.substring(0, str.length()).equals(str)); // true
        System.out.println("str.substring(4, 4) produces empty string : \"" + str.substring(4, 4) + "\""); // ""
    }
}
