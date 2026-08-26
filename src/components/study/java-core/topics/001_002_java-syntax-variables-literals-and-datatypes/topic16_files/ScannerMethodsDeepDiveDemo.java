/**
 * File: ScannerMethodsDeepDiveDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 16)
 * Description: Deep dive comparison of java.util.Scanner methods:
 *              next(), nextLine(), nextInt(), nextDouble(), nextBoolean(), nextByte(), nextLong(),
 *              and nextBigDecimal() with multi-word addresses and Indian Rupee (₹) student records.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

import java.util.Scanner;
import java.util.Locale;
import java.math.BigDecimal;

public class ScannerMethodsDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 16 SCANNER METHODS DEEP DIVE");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. next() vs nextLine() Behavioral Comparison
        System.out.println("--- 1. WORD-BASED next() VS LINE-BASED nextLine() ---");
        String multiWordInput = "Swadeep Hui\n25 Shibtala Road, N. C. Pukur, Barrackpore\n";
        Scanner scanner1 = new Scanner(multiWordInput);

        // next() only reads the first word "Swadeep":
        String firstNameOnly = scanner1.next();
        System.out.printf("scanner.next() output     : \"%s\" (Stops at space)%n", firstNameOnly);

        // next() again reads "Hui":
        String lastName = scanner1.next();
        System.out.printf("Second next() output      : \"%s\"%n", lastName);

        // Consume remaining newline before reading full line:
        scanner1.nextLine();

        // nextLine() reads the ENTIRE rest of the line including all spaces and commas:
        String fullAddress = scanner1.nextLine();
        System.out.printf("scanner.nextLine() output : \"%s\"%n%n", fullAddress);
        scanner1.close();

        // 2. Comprehensive Type Parsing: Primitives & BigDecimal
        System.out.println("--- 2. PARSING FULL SPECTRUM OF PRIMITIVES & BIGDECIMAL ---");
        String studentDataFeed = "101 21 85.75 18500.50 true 9876543210 25000000000.75";
        Scanner dataScanner = new Scanner(studentDataFeed);
        dataScanner.useLocale(Locale.US);

        int rollNumber = dataScanner.nextInt();              // 32-bit integer
        byte studentAge = dataScanner.nextByte();            // 8-bit byte
        double scorePercent = dataScanner.nextDouble();      // 64-bit double
        float labFee = dataScanner.nextFloat();              // 32-bit float
        boolean isEnrolled = dataScanner.nextBoolean();      // boolean
        long mobileNumber = dataScanner.nextLong();          // 64-bit long
        BigDecimal endowmentFund = dataScanner.nextBigDecimal(); // Arbitrary precision

        System.out.printf("Parsed Roll Number (int)        : %d%n", rollNumber);
        System.out.printf("Parsed Age (byte)               : %d years%n", studentAge);
        System.out.printf("Parsed Score (double)           : %.2f%%%n", scorePercent);
        System.out.printf("Parsed Lab Fee (float)          : ₹%.2f%n", labFee);
        System.out.printf("Parsed Enrolled (boolean)       : %b%n", isEnrolled);
        System.out.printf("Parsed Mobile (long)            : +91-%d%n", mobileNumber);
        System.out.printf("Parsed Endowment (BigDecimal)   : ₹%,.2f%n%n", endowmentFund);
        dataScanner.close();

        // 3. Multi-Record Processing Engine (Barrackpore Lab Registry)
        System.out.println("--- 3. BARRACKPORE STUDENT REGISTRY PROCESSING ---");
        String registryRecords =
                "101 Swadeep Barrackpore 15000.0 true\n" +
                "102 Tuhina Naihati 22000.0 true\n" +
                "103 Abhronila Shyamnagar 25000.0 false\n" +
                "104 Debangshu Ichapur 28000.0 true\n";

        Scanner registryScanner = new Scanner(registryRecords);
        double totalCollectedFee = 0.0;

        System.out.println("ID\tNAME\t\tLOCATION\tFEE (₹)\t\tADMITTED");
        System.out.println("--\t----\t\t--------\t-------\t\t--------");

        while (registryScanner.hasNext()) {
            int id = registryScanner.nextInt();
            String name = registryScanner.next();
            String location = registryScanner.next();
            double fee = registryScanner.nextDouble();
            boolean admitted = registryScanner.nextBoolean();

            if (admitted) {
                totalCollectedFee += fee;
            }

            System.out.printf("%d\t%-10s\t%-12s\t₹%,.2f\t%b%n", id, name, location, fee, admitted);
        }

        System.out.printf("%nTotal Confirmed Admissions Collected: ₹%,.2f%n", totalCollectedFee);
        registryScanner.close();

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. next() reads a single token (word); nextLine() reads the entire line with spaces.");
        System.out.println("2. nextInt(), nextDouble(), and nextBoolean() parse primitives directly.");
        System.out.println("3. Use nextBigDecimal() for exact financial and currency processing.");
        System.out.println("4. nextBoolean() is case-insensitive (matches 'true', 'TRUE', 'False', etc.).");
        System.out.println("================================================================================");
    }
}
