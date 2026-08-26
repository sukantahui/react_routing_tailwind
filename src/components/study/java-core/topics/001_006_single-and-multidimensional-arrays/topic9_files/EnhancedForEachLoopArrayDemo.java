/**
 * File: EnhancedForEachLoopArrayDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 9)
 * Description: Demonstrates enhanced for-each loop array traversal mechanics in Java (JLS §14.14.2):
 *              read-only element copy limitations, compiler bytecode desugaring into indexed loops,
 *              object state mutation vs local reference reassignment, and student stipend auditing in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class EnhancedForEachLoopArrayDemo {

    public static class StudentAccount {
        private final String name;
        private double balance;

        public StudentAccount(String name, double balance) {
            this.name = name;
            this.balance = balance;
        }

        public void creditScholarship(double amount) {
            this.balance += amount;
        }

        @Override
        public String toString() {
            return String.format("%s (₹%,.2f)", name, balance);
        }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 9 ENHANCED FOR-EACH LOOP");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] stipendAmounts = {5000.0, 5000.0, 6000.0, 5500.0};

        // 1. Clean Traversal & Accumulation via For-Each
        System.out.println("--- 1. CLEAN TRAVERSAL & ACCUMULATION VIA FOR-EACH ---");
        double totalStipends = 0.0;
        for (double stipend : stipendAmounts) {
            totalStipends += stipend;
            System.out.printf("  Stipend Entry: ₹%,.2f%n", stipend);
        }
        System.out.printf("  Total Stipends Disbursed: ₹%,.2f%n%n", totalStipends);

        // 2. Read-Only Limitation on Primitives (Local Copy Trap)
        System.out.println("--- 2. READ-ONLY LIMITATION ON PRIMITIVE ARRAYS ---");
        System.out.println("  Original stipendAmounts before attempted mutation: " + Arrays.toString(stipendAmounts));

        // Attempting to modify stipend in for-each loop:
        for (double stipend : stipendAmounts) {
            stipend += 1000.0; // Modifies only the LOCAL copy variable!
        }
        System.out.println("  stipendAmounts AFTER for-each attempted mutation : " + Arrays.toString(stipendAmounts));
        System.out.println("  ⚠️ Array values remained unchanged because 'stipend' is a local copy!\n");

        // 3. Object State Mutation vs Reference Reassignment
        System.out.println("--- 3. OBJECT ARRAYS IN FOR-EACH: STATE MUTATION vs REASSIGNMENT ---");
        StudentAccount[] accounts = {
            new StudentAccount("Swadeep", 5000.0),
            new StudentAccount("Tuhina", 5000.0),
            new StudentAccount("Abhronila", 6000.0)
        };

        System.out.println("  Original accounts: " + Arrays.toString(accounts));

        // Invoking mutating methods on the object reference WORKS:
        for (StudentAccount acc : accounts) {
            acc.creditScholarship(1000.0); // Mutates Heap object!
        }
        System.out.println("  Accounts after creditScholarship(₹1,000): " + Arrays.toString(accounts) + "\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Enhanced for-each 'for (Type x : arr)' is concise and 100% immune to index bugs.");
        System.out.println("2. For primitives, 'x' is a local copy; modifying 'x' has NO effect on the array.");
        System.out.println("3. For objects, method calls on 'x' mutate the shared Heap object state.");
        System.out.println("4. Use standard for loops when you need index numbers, reverse order, or array slot mutations.");
        System.out.println("================================================================================");
    }
}
