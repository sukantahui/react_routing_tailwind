/**
 * File: ScannerConsoleInputDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 15)
 * Description: Demonstrates java.util.Scanner for interactive console input parsing,
 *              System.in stream binding, whitespace tokenization, delimiter customization,
 *              safe defensive input validation with hasNextInt(), and student enrollment in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

import java.util.Scanner;
import java.util.Locale;

public class ScannerConsoleInputDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 15 INTERACTIVE CONSOLE INPUT WITH SCANNER");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Instantiating Scanner for String Simulation Input
        // Note: For automated demo testing, we simulate user input using a formatted String stream:
        String simulatedConsoleInput = "Swadeep 101 Barrackpore 88.50 15000.0 true\n";
        Scanner scanner = new Scanner(simulatedConsoleInput);
        scanner.useLocale(Locale.US); // Ensures decimal point '.' parsing

        System.out.println("--- 1. READING STRUCTURED TOKENS FROM INPUT STREAM ---");
        System.out.println("Simulated Console Feed: \"Swadeep 101 Barrackpore 88.50 15000.0 true\"");

        String studentName = scanner.next();        // Reads next whitespace-delimited word
        int rollNumber = scanner.nextInt();         // Parses integer roll
        String centerLocation = scanner.next();     // Reads center location
        double examPercentage = scanner.nextDouble(); // Parses floating point
        double courseFee = scanner.nextDouble();    // Parses fee in Indian Rupees (₹)
        boolean hasPaid = scanner.nextBoolean();    // Parses boolean true/false

        System.out.println("\n[PARSED STUDENT PROFILE]");
        System.out.printf("Student Name        : %s%n", studentName);
        System.out.printf("Roll Number         : %d%n", rollNumber);
        System.out.printf("Training Center     : %s, West Bengal%n", centerLocation);
        System.out.printf("Exam Percentage     : %.2f%%%n", examPercentage);
        System.out.printf("Course Fee          : ₹%,.2f%n", courseFee);
        System.out.printf("Admission Confirmed : %b%n%n", hasPaid);
        scanner.close();

        // 2. Custom Delimiter Demonstration (CSV Parsing with Scanner)
        System.out.println("--- 2. PARSING CSV DATA USING CUSTOM DELIMITER ---");
        String csvData = "102,Tuhina,Naihati,Data Science,22000.0\n103,Abhronila,Shyamnagar,Full Stack,25000.0";
        Scanner csvScanner = new Scanner(csvData);
        csvScanner.useDelimiter("[,\\r\\n]+"); // Delimit by commas or newlines

        while (csvScanner.hasNext()) {
            int id = csvScanner.nextInt();
            String name = csvScanner.next();
            String city = csvScanner.next();
            String course = csvScanner.next();
            double fee = csvScanner.nextDouble();

            System.out.printf("CSV Record -> ID: %d | Name: %-10s | City: %-10s | Course: %-12s | Fee: ₹%,.2f%n",
                    id, name, city, course, fee);
        }
        csvScanner.close();

        // 3. Defensive Input Validation with hasNextInt() / hasNextDouble()
        System.out.println("\n--- 3. DEFENSIVE INPUT VALIDATION (PREVENTING INPUTMISMATCHEXCEPTION) ---");
        String testInputs = "InvalidAge 21 ValidFee 18500.50";
        Scanner testScanner = new Scanner(testInputs);

        System.out.println("Processing raw input stream safely:");
        while (testScanner.hasNext()) {
            if (testScanner.hasNextInt()) {
                int age = testScanner.nextInt();
                System.out.printf("✓ Valid Integer Age Found: %d%n", age);
            } else if (testScanner.hasNextDouble()) {
                double fee = testScanner.nextDouble();
                System.out.printf("✓ Valid Double Fee Found: ₹%,.2f%n", fee);
            } else {
                String unknownToken = testScanner.next();
                System.out.printf("⚠️ Non-numeric Text Discarded: \"%s\"%n", unknownToken);
            }
        }
        testScanner.close();

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Scanner wraps System.in to parse primitive types using whitespace delimiters.");
        System.out.println("2. Always use hasNextInt() / hasNextDouble() defensively before reading numbers.");
        System.out.println("3. Scanner can parse files, strings, and network streams with custom delimiters.");
        System.out.println("4. Always close non-System.in scanners when done to release underlying resources.");
        System.out.println("================================================================================");
    }
}
