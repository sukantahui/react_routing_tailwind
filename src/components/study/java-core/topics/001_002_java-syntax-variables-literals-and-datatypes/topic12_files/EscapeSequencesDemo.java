/**
 * File: EscapeSequencesDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 12)
 * Description: Demonstrates Java escape sequences (\\n, \\t, \\r, \\b, \\', \\", \\\\, \\f),
 *              cross-platform newline standards (System.lineSeparator()), Windows file paths,
 *              in-place terminal progress updates with \\r, and formatted student invoice tables in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

public class EscapeSequencesDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 12 ESCAPE SEQUENCES (\\n, \\t, \\r, \\\", \\\\)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Fundamental Escape Sequences
        System.out.println("--- 1. FUNDAMENTAL ESCAPE SEQUENCES ---");
        System.out.println("Line 1: Hello from Barrackpore!\nLine 2: Next line via \\n.\nLine 3: Third line.");
        System.out.println("Tabular Data:\tColumn A\tColumn B\tColumn C");
        System.out.println("Quoting Text: \"The only way to learn programming is to write code.\" — Sukanta Hui");
        System.out.println("Single Quote in char: \'" + '\'' + "\' and double quote: \"" + '"' + "\"");
        System.out.println("Backslash path: C:\\Users\\Sukanta\\JavaWorkspace\\BarrackporeProject\n");

        // 2. Tab-Formatted Classroom Student Fee Report
        System.out.println("--- 2. TAB-FORMATTED INVOICE LEDGER (INDIAN RUPEES ₹) ---");
        System.out.println("ROLL\tNAME\t\tLOCATION\tCOURSE\t\tFEE (₹)");
        System.out.println("----\t----\t\t--------\t------\t\t-------");
        System.out.println("101\tSwadeep\t\tBarrackpore\tJava Core\t₹15,000");
        System.out.println("102\tTuhina\t\tNaihati\t\tData Science\t₹22,000");
        System.out.println("103\tAbhronila\tShyamnagar\tFull Stack\t₹25,000");
        System.out.println("104\tDebangshu\tIchapur\t\tCloud DevOps\t₹28,000\n");

        // 3. Backspace (\b) and Carriage Return (\r)
        System.out.println("--- 3. BACKSPACE (\\b) AND CARRIAGE RETURN (\\r) ---");
        // Backspace removes preceding character:
        System.out.println("Typo Demo: Barrackporee\b (Corrected to Barrackpore via \\b)");

        // Carriage return overwrites line from beginning:
        System.out.print("Starting build process...");
        System.out.print("\r[SUCCESS] Build Complete! All tests passed in Barrackpore Lab.\n\n");

        // 4. In-Place Terminal Progress Bar using \r
        System.out.println("--- 4. IN-PLACE PROGRESS BAR SIMULATION WITH \\r ---");
        int totalSteps = 5;
        for (int i = 1; i <= totalSteps; i++) {
            int percentage = (i * 100) / totalSteps;
            System.out.print("\r[Downloading Course Materials] Progress: " + percentage + "% [");
            for (int j = 0; j < i; j++) System.out.print("=");
            for (int j = i; j < totalSteps; j++) System.out.print(" ");
            System.out.print("]");
            Thread.sleep(100); // Quick simulation delay
        }
        System.out.println(" -> Done!\n");

        // 5. Windows File Paths and Regular Expressions
        System.out.println("--- 5. WINDOWS FILE PATHS & REGEX ESCAPES ---");
        String windowsPath = "E:\\react_routing_tailwind\\src\\components\\study\\java-core";
        String regexDigitPattern = "\\d+"; // In Java regex, \d requires double backslash \\d

        System.out.printf("Windows Source Path    : %s%n", windowsPath);
        System.out.printf("Regex Digit Pattern    : %s%n%n", regexDigitPattern);

        // 6. Platform-Independent Line Separator
        System.out.println("--- 6. PLATFORM-INDEPENDENT LINE SEPARATOR ---");
        String platformNewline = System.lineSeparator();
        System.out.printf("Current Operating System Line Separator: %s (Bytes: %d)%n",
                platformNewline.replace("\r", "\\r").replace("\n", "\\n"),
                platformNewline.getBytes().length);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Use \\n for newline, \\t for tab, \\\" for double quotes, \\\\ for backslashes.");
        System.out.println("2. Use \\r to return cursor to column 0 for live terminal status updates.");
        System.out.println("3. Always escape backslashes in Windows file paths (C:\\\\Folder\\\\File.java).");
        System.out.println("4. Prefer System.lineSeparator() or %n in printf for cross-platform newlines.");
        System.out.println("================================================================================");
    }
}
