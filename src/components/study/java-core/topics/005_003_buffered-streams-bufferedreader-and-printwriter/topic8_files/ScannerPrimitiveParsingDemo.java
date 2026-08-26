/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 8: The java.util.Scanner Class Revisited: Parsing Delimited Primitives
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.StringReader;
import java.util.Locale;
import java.util.Scanner;

public class ScannerPrimitiveParsingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: java.util.Scanner PARSING PRIMITIVES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String studentCsvData =
                "Swadeep 85.50 101 true\n" +
                "Tuhina 92.00 102 true\n" +
                "Abhronila 89.25 103 false";

        System.out.println(">>> Parsing Heterogeneous Primitives with Scanner:");
        try (Scanner scanner = new Scanner(new StringReader(studentCsvData))) {
            scanner.useLocale(Locale.US); // Ensures decimal points are '.'

            while (scanner.hasNext()) {
                String name = scanner.next();
                double marks = scanner.nextDouble();
                int roll = scanner.nextInt();
                boolean feePaid = scanner.nextBoolean();

                System.out.printf("  Trainee: %-10s | Marks: %5.2f | Roll: %d | Fee Paid: %b%n",
                        name, marks, roll, feePaid);
            }
        }

        System.out.println("\n>>> SCANNER CAPABILITIES:");
        System.out.println("  1. Tokenizes whitespace-delimited strings automatically.");
        System.out.println("  2. Built-in type coercion: nextInt(), nextDouble(), nextBoolean(), nextLong().");
        System.out.println("  3. Regex delimiter support via 'scanner.useDelimiter(...)'.");

        System.out.println("\n==========================================================================");
    }
}