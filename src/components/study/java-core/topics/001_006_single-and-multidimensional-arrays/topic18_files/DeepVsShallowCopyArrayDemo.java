/**
 * File: DeepVsShallowCopyArrayDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 18)
 * Description: Demonstrates Deep Copy vs Shallow Copy of arrays in Java:
 *              1. Reference sharing traps in Object arrays (StudentAccount[]) and 2D arrays (double[][])
 *              2. Constructing robust Deep Copy algorithms (loop cloning and object copy constructors)
 *              for campus fee ledger isolation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class DeepVsShallowCopyArrayDemo {

    public static class StudentAccount {
        private String name;
        private double balance;

        public StudentAccount(String name, double balance) {
            this.name = name;
            this.balance = balance;
        }

        // Copy Constructor for Deep Copy:
        public StudentAccount(StudentAccount other) {
            this.name = other.name;
            this.balance = other.balance;
        }

        public void setBalance(double balance) {
            this.balance = balance;
        }

        @Override
        public String toString() {
            return String.format("%s(₹%,.0f)", name, balance);
        }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 18 DEEP VS SHALLOW COPY");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. SHALLOW COPY TRAP IN OBJECT ARRAYS
        System.out.println("--- 1. SHALLOW COPY TRAP (OBJECT ARRAYS) ---");
        StudentAccount[] originalStudents = {
            new StudentAccount("Swadeep", 12000.0),
            new StudentAccount("Tuhina", 15000.0)
        };

        // Shallow copy via clone():
        StudentAccount[] shallowStudents = originalStudents.clone();

        // Mutating object state via shallow copy:
        shallowStudents[0].setBalance(99999.0);

        System.out.println("  shallowStudents[0].setBalance(₹99,999);");
        System.out.println("  shallowStudents : " + Arrays.toString(shallowStudents));
        System.out.println("  originalStudents: " + Arrays.toString(originalStudents));
        System.out.println("  ⚠️ Original was unexpectedly MUTATED because both arrays share Heap object references!\n");

        // 2. ROBUST DEEP COPY OF OBJECT ARRAYS
        System.out.println("--- 2. ROBUST DEEP COPY (OBJECT ARRAYS) ---");
        StudentAccount[] deepStudents = new StudentAccount[originalStudents.length];
        for (int i = 0; i < originalStudents.length; i++) {
            deepStudents[i] = new StudentAccount(originalStudents[i]); // New Heap Object via Copy Constructor!
        }

        // Mutating deep copy:
        deepStudents[0].setBalance(50000.0);
        System.out.println("  deepStudents[0].setBalance(₹50,000);");
        System.out.println("  deepStudents    : " + Arrays.toString(deepStudents));
        System.out.println("  originalStudents: " + Arrays.toString(originalStudents));
        System.out.println("  ✓ Original remained completely INTACT due to independent Heap object duplication!\n");

        // 3. 2D ARRAY: SHALLOW VS DEEP COPY
        System.out.println("--- 3. 2D ARRAY: SHALLOW VS DEEP COPY ---");
        double[][] originalMatrix = {{10000.0, 20000.0}, {30000.0, 40000.0}};

        // Shallow copy of 2D array:
        double[][] shallowMatrix = originalMatrix.clone();
        shallowMatrix[0][0] = 99999.0;
        System.out.println("  Shallow clone mutates originalMatrix[0][0]: " + Arrays.deepToString(originalMatrix));

        // Deep copy of 2D array:
        double[][] deepMatrix = new double[originalMatrix.length][];
        for (int r = 0; r < originalMatrix.length; r++) {
            deepMatrix[r] = originalMatrix[r].clone(); // Clones each 1D row independently!
        }
        deepMatrix[1][1] = 88888.0;
        System.out.println("  Deep copy isolated originalMatrix[1][1]   : " + Arrays.deepToString(originalMatrix) + "\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Shallow copy clones array containers but SHARES inner Heap object/row references.");
        System.out.println("2. Deep copy allocates new array containers AND duplicates every element object.");
        System.out.println("3. For primitive 1D arrays, clone() IS a deep copy because primitives have no references.");
        System.out.println("4. For 2D arrays, deep copy requires cloning each row: deep[r] = orig[r].clone().");
        System.out.println("================================================================================");
    }
}
