/**
 * File: ScannerNewlineBugDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 17)
 * Description: Demonstrates the classic Scanner newline skip bug when nextInt() is followed by nextLine(),
 *              analyzes buffer state before and after token consumption, and demonstrates all 3 industry fixes
 *              using simulated student enrollment feeds with course fees in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

import java.util.Scanner;
import java.util.Locale;

public class ScannerNewlineBugDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 17 RESOLVING SCANNER NEWLINE SKIP BUG");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Reproducing the Classic Newline Bug
        System.out.println("--- 1. REPRODUCING THE SCANNER NEWLINE SKIP BUG ---");
        // Simulated user typing "101" then [Enter] then "Swadeep Hui":
        String bugInputFeed = "101\nSwadeep Hui\n";
        Scanner bugScanner = new Scanner(bugInputFeed);

        System.out.println("Reading Input Feed: \"101\\nSwadeep Hui\\n\"");
        int rollWithBug = bugScanner.nextInt(); // Consumes "101", leaves "\n" in buffer
        String nameWithBug = bugScanner.nextLine(); // Sees leftover "\n", returns EMPTY STRING immediately!

        System.out.printf("Parsed Roll Number : %d%n", rollWithBug);
        System.out.printf("Parsed Name (BUG!) : \"%s\" (Length: %d characters - Prompt skipped!)%n%n",
                nameWithBug, nameWithBug.length());
        bugScanner.close();

        // 2. Fix 1: The Flushing nextLine() Call (Industry Standard)
        System.out.println("--- 2. FIX 1: BUFFER FLUSHING WITH DUMMY nextLine() ---");
        String fix1Feed = "101\nSwadeep Hui\n15000.0\n25 Shibtala Road, Barrackpore\n";
        Scanner fix1Scanner = new Scanner(fix1Feed);
        fix1Scanner.useLocale(Locale.US);

        int studentRoll = fix1Scanner.nextInt();
        fix1Scanner.nextLine(); // BUFFER FLUSH: Consumes leftover '\n'

        String studentName = fix1Scanner.nextLine(); // Now reads "Swadeep Hui" cleanly!

        double courseFee = fix1Scanner.nextDouble();
        fix1Scanner.nextLine(); // BUFFER FLUSH: Consumes leftover '\n'

        String address = fix1Scanner.nextLine(); // Reads full multi-word address!

        System.out.println("[FIX 1 RESULT]");
        System.out.printf("Roll Number        : %d%n", studentRoll);
        System.out.printf("Full Student Name  : %s%n", studentName);
        System.out.printf("Course Tuition Fee : ₹%,.2f%n", courseFee);
        System.out.printf("Residential Address: %s%n%n", address);
        fix1Scanner.close();

        // 3. Fix 2: Line-First Parsing with Integer.parseInt(nextLine())
        System.out.println("--- 3. FIX 2: LINE-FIRST PARSING (Integer.parseInt + nextLine) ---");
        String fix2Feed = "102\nTuhina Mukherjee\n22000.0\nNaihati, North 24 Parganas\n";
        Scanner fix2Scanner = new Scanner(fix2Feed);

        // Read all inputs as full lines and parse explicitly:
        int idFix2 = Integer.parseInt(fix2Scanner.nextLine().trim());
        String nameFix2 = fix2Scanner.nextLine();
        double feeFix2 = Double.parseDouble(fix2Scanner.nextLine().trim());
        String locFix2 = fix2Scanner.nextLine();

        System.out.println("[FIX 2 RESULT]");
        System.out.printf("Student ID         : %d%n", idFix2);
        System.out.printf("Full Student Name  : %s%n", nameFix2);
        System.out.printf("Course Tuition Fee : ₹%,.2f%n", feeFix2);
        System.out.printf("Location Address   : %s%n%n", locFix2);
        fix2Scanner.close();

        // 4. Comparison Summary Table
        System.out.println("--- 4. SUMMARY OF SCANNER INPUT STRATEGIES ---");
        System.out.println("+-------------------+--------------------------------+-------------------------------------+");
        System.out.println("| Strategy          | Code Pattern                   | Best Use Case                       |");
        System.out.println("+-------------------+--------------------------------+-------------------------------------+");
        System.out.println("| 1. Flush Buffer   | nextInt(); scanner.nextLine(); | Interactive Console Terminals       |");
        System.out.println("| 2. Parse Lines    | Integer.parseInt(nextLine());  | Form-based & File-based Input Lines |");
        System.out.println("| 3. Word Tokens    | next();                        | Single-word inputs without spaces   |");
        System.out.println("+-------------------+--------------------------------+-------------------------------------+");

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. nextInt(), nextDouble() consume ONLY digits and leave '\\n' in the buffer.");
        System.out.println("2. nextLine() immediately consumes the pending '\\n' and returns an empty string \"\".");
        System.out.println("3. Always add a dummy 'scanner.nextLine();' after nextInt() before calling nextLine().");
        System.out.println("4. Alternatively, use 'Integer.parseInt(scanner.nextLine())' for 100% newline immunity.");
        System.out.println("================================================================================");
    }
}
