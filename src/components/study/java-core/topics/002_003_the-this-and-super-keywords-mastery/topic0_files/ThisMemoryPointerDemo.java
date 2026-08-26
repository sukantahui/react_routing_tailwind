/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 0: What is the 'this' keyword in Java and what does it point to in memory?
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class ThisMemoryPointerDemo {

    public static class StudentAccount {
        private String studentName;
        private int rollNumber;

        public StudentAccount(String studentName, int rollNumber) {
            // 'this' is an implicit reference pointing to the currently executing Heap instance
            this.studentName = studentName;
            this.rollNumber = rollNumber;
            System.out.printf("  [CONSTRUCTOR] 'this' points to Heap Address HashCode: 0x%08X (for %s)\n",
                    System.identityHashCode(this), this.studentName);
        }

        public void printSelfReference() {
            // 'this' inside an instance method refers to the caller instance
            System.out.printf("  [METHOD] Inside printSelfReference(): 'this' HashCode = 0x%08X | Student: %s (Roll %d)\n",
                    System.identityHashCode(this), this.studentName, this.rollNumber);
        }

        public boolean isSameInstance(StudentAccount other) {
            // Comparing 'this' with another object reference
            return this == other;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS 'this' IN MEMORY? - BARRACKPORE HUB");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating StudentAccount for Swadeep Paul:");
        StudentAccount swadeep = new StudentAccount("Swadeep Paul", 101);
        System.out.printf("  Caller 'swadeep' variable points to HashCode: 0x%08X\n", System.identityHashCode(swadeep));
        swadeep.printSelfReference();

        System.out.println("\n>>> 2. Creating StudentAccount for Tuhina Das:");
        StudentAccount tuhina = new StudentAccount("Tuhina Das", 102);
        System.out.printf("  Caller 'tuhina' variable points to HashCode: 0x%08X\n", System.identityHashCode(tuhina));
        tuhina.printSelfReference();

        System.out.println("\n>>> 3. Verifying Memory Equality:");
        System.out.println("  swadeep.isSameInstance(swadeep)? " + swadeep.isSameInstance(swadeep));
        System.out.println("  swadeep.isSameInstance(tuhina)? " + swadeep.isSameInstance(tuhina));

        System.out.println("\n==========================================================================");
    }
}