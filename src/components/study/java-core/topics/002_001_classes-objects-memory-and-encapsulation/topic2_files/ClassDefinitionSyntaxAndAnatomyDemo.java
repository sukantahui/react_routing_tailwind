/**
 * File: ClassDefinitionSyntaxAndAnatomyDemo.java
 * Module: 002_001_classes-objects-memory-and-encapsulation (Topic 2)
 * Description: Demonstrates the complete anatomy, syntax, and naming conventions of a Java Class:
 *              1. Package declaration & explicit imports
 *              2. Class header modifiers (access modifiers: public/package-private, non-access: final)
 *              3. Static class constants vs instance member fields
 *              4. Constructors, instance methods, and static factory methods
 *              5. Overridden Object methods (toString, equals, hashCode)
 *              for student profile management at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.oop;

import java.util.Objects;

/**
 * Represents the complete architectural anatomy of a standard, production-ready Java class.
 */
public final class ClassDefinitionSyntaxAndAnatomyDemo {

    // =========================================================================
    // 1. STATIC CONSTANTS (Class-Level Shared State, UPPER_SNAKE_CASE)
    // =========================================================================
    public static final String ACADEMY_NAME = "Coder & AccoTax";
    public static final String CAMPUS_CITY = "Barrackpore";
    public static final double DEFAULT_MINIMUM_PASS_MARKS = 40.0;

    // =========================================================================
    // 2. INNER DOMAIN ENTITY: StudentProfile (Class Anatomy Demonstration)
    // =========================================================================
    public static final class StudentProfile {

        // --- INSTANCE FIELDS (Object State, lowerCamelCase, Private) ---
        private final int rollNumber;
        private String fullName;
        private String enrolledCourse;
        private double theoryMarks;
        private double practicalMarks;

        // --- CONSTRUCTORS (Object Initialization) ---
        public StudentProfile(int rollNumber, String fullName, String enrolledCourse, double theory, double practical) {
            if (rollNumber <= 0) {
                throw new IllegalArgumentException("rollNumber must be positive: " + rollNumber);
            }
            this.rollNumber = rollNumber;
            this.fullName = Objects.requireNonNull(fullName, "fullName cannot be null");
            this.enrolledCourse = Objects.requireNonNull(enrolledCourse, "enrolledCourse cannot be null");
            setMarks(theory, practical);
        }

        // --- STATIC FACTORY METHOD (Alternative Clean Instantiation) ---
        public static StudentProfile createFullMarksStudent(int roll, String name, String course) {
            return new StudentProfile(roll, name, course, 100.0, 100.0);
        }

        // --- INSTANCE METHODS (Object Behavior) ---
        public double computeTotalMarks() {
            return this.theoryMarks + this.practicalMarks;
        }

        public double computePercentage() {
            return (computeTotalMarks() / 200.0) * 100.0;
        }

        public boolean hasPassed() {
            return this.theoryMarks >= DEFAULT_MINIMUM_PASS_MARKS
                    && this.practicalMarks >= DEFAULT_MINIMUM_PASS_MARKS;
        }

        // --- ACCESSORS & MUTATORS (Getters & Setters with Invariants) ---
        public void setMarks(double theory, double practical) {
            if (theory < 0.0 || theory > 100.0) {
                throw new IllegalArgumentException("theory marks must be in [0..100]: " + theory);
            }
            if (practical < 0.0 || practical > 100.0) {
                throw new IllegalArgumentException("practical marks must be in [0..100]: " + practical);
            }
            this.theoryMarks = theory;
            this.practicalMarks = practical;
        }

        public int getRollNumber() { return rollNumber; }
        public String getFullName() { return fullName; }
        public String getEnrolledCourse() { return enrolledCourse; }
        public double getTheoryMarks() { return theoryMarks; }
        public double getPracticalMarks() { return practicalMarks; }

        // --- OVERRIDDEN OBJECT METHODS ---
        @Override
        public String toString() {
            return String.format("StudentProfile[#%03d | %s | %s | Theory: %.1f, Practical: %.1f | Total: %.1f (%.1f%%) | Passed: %s]",
                    rollNumber, fullName, enrolledCourse, theoryMarks, practicalMarks,
                    computeTotalMarks(), computePercentage(), hasPassed() ? "YES" : "NO");
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            StudentProfile that = (StudentProfile) o;
            return rollNumber == that.rollNumber;
        }

        @Override
        public int hashCode() {
            return Objects.hash(rollNumber);
        }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 2 CLASS DEFINITION SYNTAX & ANATOMY");
        System.out.println("Educator: Sukanta Hui | Location: " + CAMPUS_CITY + ", West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. INSTANTIATING OBJECTS USING STANDARD CONSTRUCTOR ---\n");
        StudentProfile swadeep = new StudentProfile(101, "Swadeep", "Full Stack Java", 92.0, 96.0);
        StudentProfile tuhina  = new StudentProfile(102, "Tuhina", "Data Structures & Java", 98.0, 95.0);
        StudentProfile debangshu = new StudentProfile(104, "Debangshu", "Java Microservices", 78.0, 84.0);

        System.out.println("  " + swadeep);
        System.out.println("  " + tuhina);
        System.out.println("  " + debangshu);

        System.out.println("\n--- 2. STATIC FACTORY METHOD CREATION ---\n");
        StudentProfile perfectStudent = StudentProfile.createFullMarksStudent(103, "Abhronila", "Java Core Pro");
        System.out.println("  Factory Created: " + perfectStudent);

        System.out.println("\n--- 3. EQUALITY & HASHCODE VERIFICATION ---\n");
        StudentProfile swadeepDuplicate = new StudentProfile(101, "Swadeep Hui", "Full Stack Java", 90.0, 90.0);
        System.out.printf("  swadeep.equals(swadeepDuplicate) [Same Roll #101] : %s%n",
                swadeep.equals(swadeepDuplicate) ? "✓ EQUAL (true)" : "❌ NOT EQUAL");
        System.out.printf("  swadeep == swadeepDuplicate [Memory Address Check]   : %s%n%n",
                (swadeep == swadeepDuplicate) ? "SAME ADDRESS" : "❌ DIFFERENT HEAP ADDRESSES (false)");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. A Java Class consists of 8 anatomical sections from package to overridden Object methods.");
        System.out.println("2. Types use UpperCamelCase; methods & fields use lowerCamelCase; constants use UPPER_SNAKE_CASE.");
        System.out.println("3. Static factory methods provide readable, self-documenting object construction.");
        System.out.println("4. Override equals() & hashCode() together to ensure correct behavior in Collections.");
        System.out.println("================================================================================");
    }
}
