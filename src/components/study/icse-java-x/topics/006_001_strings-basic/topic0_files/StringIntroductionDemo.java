/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 0: Introduction to Strings in Java and Real-Life Applications
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 * Students: Swadeep, Tuhina, Abhronila, Debangshu
 * Locations: Barrackpore, Shyamnagar, Ichapur, Naihati
 */

public class StringIntroductionDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   CODER & ACCOTAX - JAVA STRINGS INTRODUCTION    ");
        System.out.println("==================================================");

        // 1. Strings in Java are Objects of the java.lang.String class
        // Not a primitive data type like int, double, or char!
        String student1 = "Swadeep Mukherjee";
        String student2 = "Tuhina Roy";
        String centerCity = "Barrackpore";

        System.out.println("\n[1] Student Records from Barrackpore Lab:");
        System.out.println("Student 1 Name: " + student1);
        System.out.println("Student 2 Name: " + student2);
        System.out.println("Training Center: " + centerCity);

        // 2. Character sequence internally stored in memory
        // A String represents an indexed sequence of Unicode 16-bit characters (0 to length - 1)
        System.out.println("\n[2] Character Index Inspection for '" + centerCity + "':");
        System.out.println("Total Length of '" + centerCity + "': " + centerCity.length());
        for (int i = 0; i < centerCity.length(); i++) {
            System.out.println("  Index [" + i + "] -> Character '" + centerCity.charAt(i) + 
                               "' (ASCII/Unicode: " + (int)centerCity.charAt(i) + ")");
        }

        // 3. Real-life Application 1: Student Roll Identification & Card Generation
        // Constructing formatted student identity at Shyamnagar Center
        String branchCode = "SHYAM";
        int rollNumber = 104;
        String studentCardId = branchCode + "-" + student2.substring(0, 3).toUpperCase() + "-" + rollNumber;
        System.out.println("\n[3] Automated ID Card Code Generator:");
        System.out.println("Generated ID for " + student2 + ": " + studentCardId);

        // 4. Real-life Application 2: Input Sanitization & Validation (Naihati Exam Hall)
        String rawInput = "   Abhronila Das   ";
        System.out.println("\n[4] Input Sanitization (Cleaning User Input):");
        System.out.println("Raw Input String: '" + rawInput + "' (Length: " + rawInput.length() + ")");
        String cleanedInput = rawInput.trim();
        System.out.println("Cleaned String  : '" + cleanedInput + "' (Length: " + cleanedInput.length() + ")");

        // 5. String Concatenation and Message Formatting (Ichapur SMS Notification)
        double examPercentage = 94.5;
        String alertMessage = "Congratulations " + student1 + " from " + centerCity + 
                              "! You secured " + examPercentage + "% in ICSE Pre-Board Mock.";
        System.out.println("\n[5] Notification Dispatch:");
        System.out.println(alertMessage);

        System.out.println("\n==================================================");
        System.out.println("  End of String Introduction Demonstration         ");
        System.out.println("==================================================");
    }
}
