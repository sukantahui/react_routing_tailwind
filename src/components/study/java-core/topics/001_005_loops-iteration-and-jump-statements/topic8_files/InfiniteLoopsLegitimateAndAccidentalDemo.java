/**
 * File: InfiniteLoopsLegitimateAndAccidentalDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 8)
 * Description: Demonstrates legitimate vs accidental infinite loops in Java (JLS §14.21),
 *              canonical infinite constructs (while(true), for(;;), do..while(true)),
 *              event loop polling with internal break conditions, numeric overflow traps (byte wrapping),
 *              and campus payment gateway listener simulation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class InfiniteLoopsLegitimateAndAccidentalDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 8 INFINITE LOOPS: INTENTIONAL & ACCIDENTAL");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Legitimate Pattern: Event Dispatcher Loop with Internal Break
        System.out.println("--- 1. LEGITIMATE EVENT LOOP WITH INTERNAL BREAK ---");
        int eventCounter = 0;
        int maxSimulatedEvents = 3;

        while (true) {
            eventCounter++;
            System.out.printf("  [Gateway Daemon]: Listening for UPI Tuition Payloads... (Handshake #%d)%n", eventCounter);

            if (eventCounter >= maxSimulatedEvents) {
                System.out.println("  -> Received SHUTDOWN signal. Breaking gracefully from event loop.");
                break; // Graceful termination
            }
        }
        System.out.println("  ✓ Gateway listener terminated normally.\n");

        // 2. Legitimate Pattern: Canonical 'for (;;)' Infinite Loop
        System.out.println("--- 2. CANONICAL 'for (;;)' LOOP WITH STATE EXIT ---");
        double simulatedBalance = 15000.0;
        double monthlyInstallment = 5000.0;

        for (;;) {
            if (simulatedBalance < monthlyInstallment) {
                System.out.printf("  Remaining Balance: ₹%,.2f -> Target cleared!%n", simulatedBalance);
                break;
            }
            simulatedBalance -= monthlyInstallment;
            System.out.printf("  Installment ₹%,.2f cleared | Left: ₹%,.2f%n",
                    monthlyInstallment, simulatedBalance);
        }
        System.out.println("  ✓ 'for (;;)' loop exited cleanly upon balance settlement.\n");

        // 3. Accidental Cause Simulation: Byte Overflow Infinite Loop Trap
        System.out.println("--- 3. ACCIDENTAL TRAP: NUMERIC OVERFLOW WRAP-AROUND ---");
        System.out.println("  Notice: 'byte b = 0; b <= 127; b++' -> 'b' wraps from 127 to -128!");
        System.out.println("  (Simulating 3 safe iterations around boundary):");

        byte testByte = 125;
        while (testByte > 0) {
            System.out.printf("  byte value: %d%n", testByte);
            if (testByte == 127) {
                System.out.println("  -> TRAP ALERT: Incrementing 127 would produce -128, causing infinite loop!");
                break; // Preventing actual freeze
            }
            testByte++;
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Intentional infinite loops (while(true), for(;;)) power servers, daemons, and event loops.");
        System.out.println("2. Always provide a clear, testable 'break' or 'return' condition to exit gracefully.");
        System.out.println("3. Common accidental causes: missing counter updates, wrong direction step (i--), and overflow.");
        System.out.println("4. Statements placed after 'while(true)' without break cause 'unreachable statement' compile errors.");
        System.out.println("================================================================================");
    }
}
