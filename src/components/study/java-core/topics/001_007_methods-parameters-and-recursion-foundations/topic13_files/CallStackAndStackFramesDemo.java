/**
 * File: CallStackAndStackFramesDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 13)
 * Description: Demonstrates the internal architecture of the JVM Call Stack and Stack Frames (JVMS §2.6):
 *              1. Stack Frame Anatomy: Local Variable Array (LVA), Operand Stack (OS), and Frame Data
 *              2. LIFO push/pop mechanics during nested and recursive method calls
 *              3. Programmatic Stack Trace inspection using Thread.currentThread().getStackTrace()
 *              for student invoice calculation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class CallStackAndStackFramesDemo {

    // =========================================================================
    // HELPER: Inspect & Print Current Call Stack Frames Programmatically
    // =========================================================================
    public static void printActiveStackFrames(String checkpointName) {
        System.out.println("  --------------------------------------------------");
        System.out.printf("  [JVM CALL STACK SNAPSHOT: %s]%n", checkpointName);
        System.out.println("  --------------------------------------------------");

        StackTraceElement[] frames = Thread.currentThread().getStackTrace();
        // frames[0] is getStackTrace(), frames[1] is printActiveStackFrames()
        for (int i = 2; i < frames.length; i++) {
            StackTraceElement frame = frames[i];
            System.out.printf("  Frame %2d: %s.%s() [Line %d]%n",
                    (frames.length - 1 - i), frame.getClassName(), frame.getMethodName(), frame.getLineNumber());
        }
        System.out.println("  --------------------------------------------------\n");
    }

    // =========================================================================
    // LEVEL 3 METHOD: Final Tax Computation (Deepest Stack Frame)
    // =========================================================================
    public static double applyTax(double netAmount) {
        // Local Variable Array in this frame: [netAmount, gst]
        double gst = netAmount * 0.18; // 18% GST

        // Snapshot stack when deepest frame is active:
        printActiveStackFrames("Inside applyTax() [Depth 3]");

        return netAmount + gst;
    }

    // =========================================================================
    // LEVEL 2 METHOD: Discount Calculation
    // =========================================================================
    public static double applyScholarshipDiscount(double grossFee, double discountPercent) {
        // Local Variable Array: [grossFee, discountPercent, discount, netAmount, finalPayable]
        double discount = grossFee * (discountPercent / 100.0);
        double netAmount = grossFee - discount;

        // Nested call pushes applyTax() stack frame onto Call Stack:
        double finalPayable = applyTax(netAmount);
        return finalPayable;
    }

    // =========================================================================
    // LEVEL 1 METHOD: Process Student Invoice
    // =========================================================================
    public static void processStudentFeeInvoice(String studentName, double baseFee, double discountPercent) {
        System.out.printf(">>> Starting processing for student: %s (Base: ₹%,.2f)%n%n", studentName, baseFee);

        // Nested call pushes applyScholarshipDiscount() stack frame:
        double totalPayable = applyScholarshipDiscount(baseFee, discountPercent);

        System.out.printf(">>> COMPLETED: %s Total Payable after GST: ₹%,.2f%n%n", studentName, totalPayable);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 13 JVM CALL STACK & STACK FRAMES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- DEMONSTRATING STACK FRAME PUSH / POP SEQUENCE ---\n");

        // Invoking Level 1: main() -> processStudentFeeInvoice() -> applyScholarshipDiscount() -> applyTax()
        processStudentFeeInvoice("Swadeep", 20000.0, 10.0); // 10% scholarship for Swadeep

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Every thread has its own private JVM Call Stack operating in LIFO order.");
        System.out.println("2. Each method invocation pushes a new Stack Frame containing LVA, OS, and Frame Data.");
        System.out.println("3. When a method finishes or returns, its stack frame is instantly popped in O(1) time.");
        System.out.println("4. Stack memory requires zero Garbage Collection (freed automatically on return).");
        System.out.println("================================================================================");
    }
}
