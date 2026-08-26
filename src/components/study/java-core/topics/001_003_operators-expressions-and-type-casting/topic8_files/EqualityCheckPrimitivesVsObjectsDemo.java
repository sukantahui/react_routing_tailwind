/**
 * File: EqualityCheckPrimitivesVsObjectsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 8)
 * Description: Demonstrates primitive value comparison (==) vs object reference comparison (==),
 *              logical content comparison with .equals(), String Constant Pool interning,
 *              Integer cache (-128 to 127) traps, null-safe Objects.equals(),
 *              and student enrollment identity verification in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

import java.util.Objects;

public class EqualityCheckPrimitivesVsObjectsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 8 PRIMITIVE == VS OBJECT REFERENCE EQUALITY");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Primitive Value Comparison (Stack Memory Bit Equality)
        System.out.println("--- 1. PRIMITIVE VALUE COMPARISON (==) ---");
        int fee1 = 15000;
        int fee2 = 15000;
        double feeDouble = 15000.0;

        System.out.printf("int 15000 == int 15000       : %b (Direct bit value match)%n", (fee1 == fee2));
        System.out.printf("int 15000 == double 15000.0  : %b (Binary numeric promotion)%n%n", (fee1 == feeDouble));

        // 2. Object Reference Identity (==) vs Logical Content (.equals())
        System.out.println("--- 2. OBJECT REFERENCE IDENTITY (==) VS CONTENT EQUALITY (.equals()) ---");
        // String Literals (Stored in String Constant Pool):
        String loc1 = "Barrackpore";
        String loc2 = "Barrackpore";

        // Explicit new Heap Objects:
        String loc3 = new String("Barrackpore");
        String loc4 = new String("Barrackpore");

        System.out.printf("Literal loc1 == Literal loc2       : %b (Same String Pool instance)%n", (loc1 == loc2));
        System.out.printf("Literal loc1 == new String loc3    : %b (Different Heap memory addresses!)%n", (loc1 == loc3));
        System.out.printf("new loc3 == new loc4               : %b (Two distinct Heap allocations)%n", (loc3 == loc4));
        System.out.printf("loc1.equals(loc3)                  : %b (Content matches perfectly)%n", loc1.equals(loc3));
        System.out.printf("loc3.equals(loc4)                  : %b (Content matches perfectly)%n", loc3.equals(loc4));
        System.out.printf("loc1 == loc3.intern()              : %b (Canonical pool reference)%n%n", (loc1 == loc3.intern()));

        // 3. Integer Cache Trap (-128 to 127)
        System.out.println("--- 3. INTEGER WRAPPER CACHING TRAP (-128 TO 127) ---");
        Integer numA = 100; // Autoboxed via Integer.valueOf(100) -> Returns cached instance
        Integer numB = 100;
        System.out.printf("Integer 100 == Integer 100 (Cached)   : %b (Inside byte cache [-128..127])%n", (numA == numB));

        Integer numC = 200; // Autoboxed via Integer.valueOf(200) -> Allocates new Heap object!
        Integer numD = 200;
        System.out.printf("Integer 200 == Integer 200 (Out-of-range): %b (TRAP: Different Heap objects!)%n", (numC == numD));
        System.out.printf("numC.equals(numD)                     : %b (Safe content comparison)%n%n", numC.equals(numD));

        // 4. Null-Safe Comparison Patterns
        System.out.println("--- 4. NULL-SAFE COMPARISON PATTERNS ---");
        String studentInput = null;
        String officialBranch = "Barrackpore";

        // Insecure: studentInput.equals("Barrackpore") throws NullPointerException!
        // Pattern A: Literal-First (Yoda style)
        boolean checkA = officialBranch.equals(studentInput); // false (Safe, no exception)

        // Pattern B: java.util.Objects.equals()
        boolean checkB = Objects.equals(studentInput, officialBranch); // false (Safe, no exception)

        System.out.printf("Literal-first officialBranch.equals(null) : %b%n", checkA);
        System.out.printf("Objects.equals(null, officialBranch)     : %b%n%n", checkB);

        // 5. Custom Student Domain Class Equality
        System.out.println("--- 5. CUSTOM STUDENT CLASS EQUALITY IN BARRACKPORE ---");
        Student s1 = new Student(101, "Swadeep Hui", 15000.0);
        Student s2 = new Student(101, "Swadeep Hui", 15000.0);
        Student s3 = s1; // Same reference

        System.out.printf("Student s1 == Student s2 (new instances) : %b (Different memory addresses)%n", (s1 == s2));
        System.out.printf("Student s1 == Student s3 (same reference): %b%n", (s1 == s3));
        System.out.printf("Student s1.equals(s2) (Overridden)       : %b (Logical identity match)%n", s1.equals(s2));

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. '==' on primitives checks value; '==' on objects checks heap memory address.");
        System.out.println("2. Always use '.equals()' or Objects.equals() to compare object contents.");
        System.out.println("3. Beware of Integer cache [-128..127]: '200 == 200' is FALSE for Integer objects!");
        System.out.println("4. String literals share pool memory, but 'new String()' allocates distinct objects.");
        System.out.println("================================================================================");
    }

    private static class Student {
        private final int rollNumber;
        private final String name;
        private final double courseFee;

        public Student(int rollNumber, String name, double courseFee) {
            this.rollNumber = rollNumber;
            this.name = name;
            this.courseFee = courseFee;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Student student = (Student) o;
            return rollNumber == student.rollNumber &&
                    Double.compare(student.courseFee, courseFee) == 0 &&
                    Objects.equals(name, student.name);
        }

        @Override
        public int hashCode() {
            return Objects.hash(rollNumber, name, courseFee);
        }
    }
}
