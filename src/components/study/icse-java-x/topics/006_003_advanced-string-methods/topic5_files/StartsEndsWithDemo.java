/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_003: Advanced String Methods
 * Topic 5: startsWith() and endsWith()
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StartsEndsWithDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    STARTSWITH() & ENDSWITH() IN JAVA (ICSE)      ");
        System.out.println("==================================================");

        String filename = "OutputPrediction.java";
        String mobile = "+91-7003756860";

        // 1. startsWith() prefix validation
        System.out.println("mobile: " + mobile);
        System.out.println("Starts with \"+91\": " + mobile.startsWith("+91")); // true
        System.out.println("Starts with \"033\": " + mobile.startsWith("033")); // false

        // 2. endsWith() suffix validation
        System.out.println("\nfilename: " + filename);
        System.out.println("Ends with \".java\": " + filename.endsWith(".java")); // true
        System.out.println("Ends with \".class\": " + filename.endsWith(".class")); // false

        // 3. Case sensitivity check
        System.out.println("Ends with \".JAVA\": " + filename.endsWith(".JAVA")); // false (case sensitive!)

        // 4. Overloaded startsWith(prefix, offset)
        String address = "West Bengal, Barrackpore";
        // Does "Bengal" start at index 5?
        System.out.println("\nAddress: " + address);
        System.out.println("address.startsWith(\"Bengal\", 5): " + address.startsWith("Bengal", 5)); // true

        // 5. Empty string edge cases
        // Every string starts and ends with empty string ""
        System.out.println("\nfilename.startsWith(\"\"): " + filename.startsWith("")); // true
        System.out.println("filename.endsWith(\"\")  : " + filename.endsWith("")); // true
    }
}
