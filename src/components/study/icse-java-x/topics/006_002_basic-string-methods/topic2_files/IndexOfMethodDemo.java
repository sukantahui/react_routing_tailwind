/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_002: Basic String Methods
 * Topic 2: indexOf() Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class IndexOfMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          INDEXOF() METHOD IN JAVA (ICSE)         ");
        System.out.println("==================================================");

        String str = "KOLKATA - CITY OF JOY";
        System.out.println("String: \"" + str + "\"");

        // 1. indexOf(char ch)
        System.out.println("\n[1] First occurrence of character:");
        System.out.println("    str.indexOf('O')    : " + str.indexOf('O')); // 1
        System.out.println("    str.indexOf('Z')    : " + str.indexOf('Z')); // -1 (Not found)

        // 2. indexOf(char ch, int fromIndex)
        System.out.println("\n[2] Search starting from index 2:");
        System.out.println("    str.indexOf('O', 2) : " + str.indexOf('O', 2)); // 15 (in 'OF')

        // 3. indexOf(String substring)
        System.out.println("\n[3] Substring search:");
        System.out.println("    str.indexOf(\"CITY\") : " + str.indexOf("CITY")); // 10

        // 4. Locating first space (ICSE Word Splitting Trick)
        int spacePos = str.indexOf(' ');
        System.out.println("\n[4] First space position: " + spacePos);
        System.out.println("    First word: \"" + str.substring(0, spacePos) + "\"");

        System.out.println("==================================================");
    }
}