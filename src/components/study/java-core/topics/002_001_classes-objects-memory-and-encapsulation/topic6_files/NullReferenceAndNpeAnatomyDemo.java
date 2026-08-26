/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 6: Null Reference and the Anatomy of NullPointerException (NPE)
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The "Billion-Dollar Mistake" and JVM Null Semantics
 * ----------------------------------------------------------------------------
 * In 1965, Sir Tony Hoare invented the null reference, later calling it his
 * "billion-dollar mistake" because of the countless crashes, vulnerabilities,
 * and bugs it introduced into software systems.
 *
 * In Java:
 * 1. `null` is a special literal of the null type that can be cast/assigned to
 *    any reference type. It signifies that a reference variable points to NO
 *    object instance in Heap memory (internally represented as 0x00000000).
 *
 * 2. When the JVM encounters a bytecode instruction requiring an active object
 *    instance (such as `invokevirtual`, `getfield`, `putfield`, `arraylength`,
 *    `monitorenter`) and the target reference on the operand stack is null,
 *    the CPU / JVM catches the fault and throws a runtime `java.lang.NullPointerException`.
 *
 * 3. The 8 Classic Triggers of NullPointerException:
 *    - Trigger 1: Invoking instance methods on null reference (`obj.method()`).
 *    - Trigger 2: Accessing or mutating instance fields (`obj.field = x`).
 *    - Trigger 3: Accessing array length on null array (`arr.length`).
 *    - Trigger 4: Indexing into a null array (`arr[i]`).
 *    - Trigger 5: Throwing a null Throwable (`throw null`).
 *    - Trigger 6: Auto-unboxing a null wrapper (`int x = nullInteger`).
 *    - Trigger 7: Synchronizing on a null monitor (`synchronized(nullLock)`).
 *    - Trigger 8: Enhanced for-loop iteration over null Iterable (`for(var x : nullList)`).
 *
 * 4. Java 14+ Helpful NullPointerExceptions (JEP 358):
 *    - HotSpot JVM analyzes the exact bytecode instruction to pinpoint which
 *      sub-expression in a chained call failed (e.g. `student.getAddress().getCity()`).
 *
 * 5. Modern Defensive Strategies:
 *    - Objects.requireNonNull(arg, "message")
 *    - java.util.Optional<T> for return types
 *    - Null Object Pattern & Yoda Equality ("Target".equals(variable))
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class NullReferenceAndNpeAnatomyDemo {

    // ------------------------------------------------------------------------
    // Nested Classes for Domain Modeling (Student, Address, Scholarship)
    // ------------------------------------------------------------------------
    public static class Address {
        private String city;
        private String district;
        private String pinCode;

        public Address(String city, String district, String pinCode) {
            this.city = Objects.requireNonNull(city, "City cannot be null");
            this.district = Objects.requireNonNull(district, "District cannot be null");
            this.pinCode = Objects.requireNonNull(pinCode, "PIN code cannot be null");
        }

        public String getCity() { return city; }
        public String getDistrict() { return district; }
        public String getPinCode() { return pinCode; }
    }

    public static class StudentRecord {
        private int rollNumber;
        private String fullName;
        private Address postalAddress; // Can be null if not provided
        private Double scholarshipStipendInr; // Wrapper type: can be null!

        public StudentRecord(int rollNumber, String fullName, Address postalAddress, Double scholarshipStipendInr) {
            if (rollNumber <= 0) throw new IllegalArgumentException("Roll number must be positive");
            this.rollNumber = rollNumber;
            this.fullName = Objects.requireNonNull(fullName, "Student full name is required");
            this.postalAddress = postalAddress; // Optional reference
            this.scholarshipStipendInr = scholarshipStipendInr;
        }

        // Accessors with Optional for nullable fields
        public int getRollNumber() { return rollNumber; }
        public String getFullName() { return fullName; }
        public Address getPostalAddressDirect() { return postalAddress; } // Dangerous: raw nullable reference
        public Optional<Address> getPostalAddress() { return Optional.ofNullable(postalAddress); }
        public Optional<Double> getScholarshipStipendInr() { return Optional.ofNullable(scholarshipStipendInr); }
    }

    // ------------------------------------------------------------------------
    // Main Method: Demonstrating the 8 NPE Triggers & Modern Defenses
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA CORE: ANATOMY OF NULL REFERENCES & NULLPOINTEREXCEPTION (NPE)");
        System.out.println(" Educator: Sukanta Hui | Locations: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // SECTION 1: The 8 Classic Triggers of NullPointerException
        // --------------------------------------------------------------------
        System.out.println(">>> SECTION 1: Reproducing & Dissecting Classic NPE Triggers Safely\n");

        // Trigger 1: Invoking instance method on null reference
        try {
            System.out.print("  [Trigger 1: Method on Null] Calling nullRef.toUpperCase() ... ");
            String nullName = null;
            nullName.toUpperCase();
        } catch (NullPointerException npe) {
            System.out.println("CAUGHT NPE -> " + npe.getMessage());
        }

        // Trigger 2: Accessing field on null reference
        try {
            System.out.print("  [Trigger 2: Field on Null] Accessing nullStudent.fullName ... ");
            StudentRecord nullStudent = null;
            String name = nullStudent.fullName;
        } catch (NullPointerException npe) {
            System.out.println("CAUGHT NPE -> " + npe.getMessage());
        }

        // Trigger 3: Array length on null array
        try {
            System.out.print("  [Trigger 3: Length on Null Array] nullArray.length ... ");
            int[] emptyMarks = null;
            int len = emptyMarks.length;
        } catch (NullPointerException npe) {
            System.out.println("CAUGHT NPE -> " + npe.getMessage());
        }

        // Trigger 4: Array indexing on null array
        try {
            System.out.print("  [Trigger 4: Indexing Null Array] nullArray[0] ... ");
            String[] studentNames = null;
            String s = studentNames[0];
        } catch (NullPointerException npe) {
            System.out.println("CAUGHT NPE -> " + npe.getMessage());
        }

        // Trigger 5: Auto-unboxing a null wrapper
        try {
            System.out.print("  [Trigger 5: Auto-Unboxing Null Wrapper] int val = (Integer) null ... ");
            Integer nullInteger = null;
            int primitiveInt = nullInteger; // Implicitly invokes nullInteger.intValue() -> NPE!
        } catch (NullPointerException npe) {
            System.out.println("CAUGHT NPE -> " + npe.getMessage());
        }

        // Trigger 6: Enhanced for-loop over null collection
        try {
            System.out.print("  [Trigger 6: For-Each on Null List] for (String s : nullList) ... ");
            List<String> nullBatchList = null;
            for (String item : nullBatchList) {
                System.out.println(item);
            }
        } catch (NullPointerException npe) {
            System.out.println("CAUGHT NPE -> " + npe.getMessage());
        }

        // Trigger 7: Synchronizing on null monitor
        try {
            System.out.print("  [Trigger 7: Synchronized on Null Lock] synchronized(nullLock) ... ");
            Object nullLock = null;
            synchronized (nullLock) {
                System.out.println("Inside lock");
            }
        } catch (NullPointerException npe) {
            System.out.println("CAUGHT NPE -> " + npe.getMessage());
        }

        // Trigger 8: Throwing null Throwable
        try {
            System.out.print("  [Trigger 8: Throwing Null Throwable] throw (Throwable) null ... ");
            RuntimeException nullEx = null;
            throw nullEx;
        } catch (NullPointerException npe) {
            System.out.println("CAUGHT NPE -> " + npe.getMessage());
        }

        // --------------------------------------------------------------------
        // SECTION 2: Java 14+ Helpful NullPointerExceptions in Chained Calls
        // --------------------------------------------------------------------
        System.out.println("\n>>> SECTION 2: Java 14+ Helpful NPE Diagnostics in Chained Invocations");
        StudentRecord swadeep = new StudentRecord(101, "Swadeep Paul", null, 12500.00);

        try {
            System.out.println("Executing chained call on Swadeep (who has null postalAddress):");
            System.out.println("  swadeep.getPostalAddressDirect().getCity().toLowerCase()");
            String city = swadeep.getPostalAddressDirect().getCity().toLowerCase();
        } catch (NullPointerException npe) {
            System.out.println("  HotSpot JEP 358 Diagnostic Message:");
            System.out.println("  ==> " + (npe.getMessage() != null ? npe.getMessage() : "Null pointer dereferenced in chain."));
        }

        // --------------------------------------------------------------------
        // SECTION 3: Modern Defensive Null-Handling Techniques
        // --------------------------------------------------------------------
        System.out.println("\n>>> SECTION 3: Modern Defensive Engineering Techniques\n");

        // Technique A: Objects.requireNonNull() Guardrails
        System.out.println("  [Technique A: Objects.requireNonNull()]");
        try {
            String tutorName = null;
            String validated = Objects.requireNonNull(tutorName, "Mentor name is strictly mandatory for registration!");
        } catch (NullPointerException e) {
            System.out.println("  Guarded with custom message: " + e.getMessage());
        }

        // Technique B: Yoda Conditions for Safe String Comparison
        System.out.println("\n  [Technique B: Yoda Equality Expressions]");
        String userSelectedBranch = null;
        // Unsafe: if (userSelectedBranch.equals("Barrackpore")) -> Throws NPE!
        // Safe (Yoda):
        boolean isBarrackpore = "Barrackpore".equals(userSelectedBranch);
        System.out.println("  '\"Barrackpore\".equals(null)' evaluated safely without NPE: " + isBarrackpore);

        // Technique C: java.util.Optional<T> Functional Traversal
        System.out.println("\n  [Technique C: Optional<T> Functional Chaining]");
        StudentRecord tuhina = new StudentRecord(
                102,
                "Tuhina Das",
                new Address("Naihati", "North 24 Parganas", "743165"),
                null // No scholarship stipend awarded yet
        );

        // Safe retrieval of Tuhina's city
        String tuhinaCity = tuhina.getPostalAddress()
                .map(Address::getCity)
                .orElse("Campus Hostel (Default)");
        System.out.println("  Tuhina Postal City   : " + tuhinaCity);

        // Safe retrieval of Swadeep's city (null address)
        String swadeepCity = swadeep.getPostalAddress()
                .map(Address::getCity)
                .orElse("Campus Hostel (Default)");
        System.out.println("  Swadeep Postal City  : " + swadeepCity + " [Safely defaulted via Optional!]");

        // Safe retrieval of scholarship with fallback
        double swadeepStipend = swadeep.getScholarshipStipendInr()
                .orElse(0.0);
        double tuhinaStipend = tuhina.getScholarshipStipendInr()
                .orElse(0.0);

        System.out.printf("  Swadeep Stipend      : ₹%,.2f\n", swadeepStipend);
        System.out.printf("  Tuhina Stipend       : ₹%,.2f [Defaulted safely without NPE]\n", tuhinaStipend);

        // Technique D: Null-Safe Default Collections
        System.out.println("\n  [Technique D: Safe Iteration over Null Collections]");
        List<String> rawList = null;
        List<String> safeList = (rawList != null) ? rawList : List.of();
        System.out.println("  Iterating over sanitized list of size " + safeList.size() + " with zero exceptions.");

        System.out.println("\n==========================================================================");
        System.out.println(" NULL REFERENCE & NPE ANATOMY DEMONSTRATION COMPLETE - BARRACKPORE");
        System.out.println("==========================================================================");
    }
}
