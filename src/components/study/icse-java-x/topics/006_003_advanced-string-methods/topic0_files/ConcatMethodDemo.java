/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_003: Advanced String Methods
 * Topic 0: concat(String str) Method Deep Dive
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class ConcatMethodDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("          CONCAT() METHOD IN JAVA (ICSE)          ");
        System.out.println("==================================================");

        // 1. Basic concatenation
        String s1 = "Coder & ";
        String s2 = "AccoTax";
        String s3 = s1.concat(s2);

        System.out.println("s1: \"" + s1 + "\"");
        System.out.println("s2: \"" + s2 + "\"");
        System.out.println("s3 = s1.concat(s2): \"" + s3 + "\"");

        // 2. Immutability verification
        System.out.println("\nNotice s1 is unchanged: \"" + s1 + "\""); // Still "Coder & "

        // 3. Chaining concat()
        String city = "Barrackpore".concat(", ").concat("West Bengal").concat(", India");
        System.out.println("Chained concat: " + city);

        // 4. Concat with empty string optimization
        String original = "Naihati";
        String same = original.concat("");
        System.out.println("\noriginal.concat(\"\") == original: " + (same == original)); // true in standard JVM!

        // 5. Difference: '+' operator vs concat()
        // '+' converts non-strings to String; concat() requires String parameter
        String withPlus = "Roll: " + 10; // Valid
        // String withConcat = "Roll: ".concat(10); // COMPILE ERROR! Requires String
        System.out.println("'+' can concatenate primitives: " + withPlus);
        System.out.println("concat() requires String type: " + "Roll: ".concat(String.valueOf(10)));
    }
}
