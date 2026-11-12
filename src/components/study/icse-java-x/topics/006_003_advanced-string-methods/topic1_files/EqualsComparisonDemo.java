/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_003: Advanced String Methods
 * Topic 1: equals() vs equalsIgnoreCase()
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class EqualsComparisonDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   EQUALS() VS EQUALSIGNORECASE() IN JAVA (ICSE)  ");
        System.out.println("==================================================");

        String c1 = "Barrackpore";
        String c2 = "barrackpore";
        String c3 = "BARRACKPORE";
        String c4 = new String("Barrackpore");

        // 1. Case-sensitive equals()
        System.out.println("c1.equals(c2): " + c1.equals(c2)); // false (different case)
        System.out.println("c1.equals(c4): " + c1.equals(c4)); // true (exact character match)

        // 2. Case-insensitive equalsIgnoreCase()
        System.out.println("\nc1.equalsIgnoreCase(c2): " + c1.equalsIgnoreCase(c2)); // true
        System.out.println("c1.equalsIgnoreCase(c3): " + c1.equalsIgnoreCase(c3)); // true

        // 3. Null safety check
        String input = null;
        // input.equals("Exit"); // Throws NullPointerException!
        System.out.println("\nNull safe pattern \"Exit\".equals(input): " + "Exit".equals(input)); // false (safe!)

        // 4. Comparison with '==' operator
        System.out.println("\nc1 == c4 (Reference check): " + (c1 == c4)); // false
        System.out.println("c1.equals(c4) (Content check): " + c1.equals(c4)); // true
    }
}
