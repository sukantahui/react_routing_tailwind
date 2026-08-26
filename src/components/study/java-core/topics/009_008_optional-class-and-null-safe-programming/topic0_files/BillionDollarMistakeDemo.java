/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 0: The Billion Dollar Mistake - NullPointerExceptions in Traditional Java
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

public class BillionDollarMistakeDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: THE BILLION DOLLAR MISTAKE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Student studentWithoutAddress = new Student("Swadeep Paul", null);

        // 1. Traditional Fragile Code: Leads to runtime NullPointerException!
        System.out.println(">>> 1. Attempting fragile nested property access without null checks:");
        try {
            String city = studentWithoutAddress.getAddress().getCity().toUpperCase();
            System.out.println("   City: " + city);
        } catch (NullPointerException npe) {
            System.err.println("   [CRASH]: java.lang.NullPointerException caught! student.getAddress() returned null.");
        }

        // 2. The Clunky Defensive Boilerplate (Deep Pyramid of Doom):
        System.out.println("\n>>> 2. Defensive null checks (Clunky & Error-Prone):");
        String citySafe = "UNKNOWN CITY";
        if (studentWithoutAddress != null) {
            Address addr = studentWithoutAddress.getAddress();
            if (addr != null) {
                String c = addr.getCity();
                if (c != null) {
                    citySafe = c.toUpperCase();
                }
            }
        }
        System.out.println("   Extracted City Safely: " + citySafe);

        System.out.println("\n>>> THE SOLUTION IN JAVA 8+:");
        System.out.println("  - java.util.Optional<T> replaces clunky null checks with clean, fluent functional pipelines!");
        System.out.println("==========================================================================");
    }

    static class Student {
        private final String name;
        private final Address address;

        public Student(String name, Address address) {
            this.name = name;
            this.address = address;
        }

        public String getName() { return name; }
        public Address getAddress() { return address; }
    }

    static class Address {
        private final String city;
        public Address(String city) { this.city = city; }
        public String getCity() { return city; }
    }
}
