/**
 * File: ScannerResourceManagementDemo.java
 * Module: 001_002_java-syntax-variables-literals-and-datatypes (Topic 18)
 * Description: Demonstrates resource management with java.util.Scanner, AutoCloseable interface,
 *              Try-With-Resources (Java 7+), avoiding OS file descriptor leaks, and the special
 *              rules regarding System.in stream lifecycle in Barrackpore student fee audit systems.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.primitives;

import java.util.Scanner;
import java.io.StringReader;

public class ScannerResourceManagementDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 18 SCANNER RESOURCE MANAGEMENT & LEAK AVOIDANCE");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Try-With-Resources for In-Memory / File / Channel Scanners
        System.out.println("--- 1. TRY-WITH-RESOURCES (AUTOMATIC RESOURCE MANAGEMENT) ---");
        String auditLogData = "TXN1001 Swadeep 15000.00 SUCCESS\nTXN1002 Tuhina 22000.00 SUCCESS\n";

        // Try-With-Resources automatically calls .close() on scanner at block exit:
        try (Scanner auditScanner = new Scanner(new StringReader(auditLogData))) {
            System.out.println("Processing student tuition audit logs safely:");
            while (auditScanner.hasNext()) {
                String txnId = auditScanner.next();
                String student = auditScanner.next();
                double amount = auditScanner.nextDouble();
                String status = auditScanner.next();

                System.out.printf("Audit Entry -> TXN: %s | Student: %-10s | Fee: ₹%,.2f | Status: %s%n",
                        txnId, student, amount, status);
            }
        } // auditScanner.close() is automatically called here by the JVM runtime!

        System.out.println("✓ Scanner closed automatically. OS resources and descriptors released.\n");

        // 2. The System.in Caveat: Closing System.in Closes the JVM Console Input Stream
        System.out.println("--- 2. THE SYSTEM.IN LIFECYCLE CAVEAT ---");
        System.out.println("Rule: Scanner.close() closes the UNDERLYING stream.");
        System.out.println("If you close a Scanner wrapped around System.in, System.in is CLOSED GLOBALLY for the JVM!");
        System.out.println("Attempting to create another Scanner(System.in) will fail because System.in is dead.\n");

        // 3. Recommended Architectural Pattern for Console Scanners
        System.out.println("--- 3. RECOMMENDED SINGLETON / SHARED CONSOLE SCANNER PATTERN ---");
        simulateConsoleOperations();

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Scanner implements AutoCloseable (introduced in Java 7).");
        System.out.println("2. Always use try-with-resources for File, Socket, and Reader scanners.");
        System.out.println("3. DO NOT close Scanner(System.in) inside helper methods—it closes System.in globally.");
        System.out.println("4. Keep a single application-level Scanner for System.in or close it only at shutdown.");
        System.out.println("================================================================================");
    }

    private static void simulateConsoleOperations() {
        // Pattern: Keep Scanner open across multiple helper function calls:
        String simulatedConsole = "Swadeep 101\n";
        Scanner sharedConsoleScanner = new Scanner(simulatedConsole);

        readStudentHeader(sharedConsoleScanner);
        // Do NOT close here! Pass to subsequent operations.

        sharedConsoleScanner.close(); // Close only at final top-level completion!
        System.out.println("✓ Shared console scanner cleanly closed at application boundary.");
    }

    private static void readStudentHeader(Scanner sc) {
        String name = sc.next();
        int roll = sc.nextInt();
        System.out.printf("Helper read -> Student: %s, Roll: %d (Stream left open for next method)%n", name, roll);
    }
}
