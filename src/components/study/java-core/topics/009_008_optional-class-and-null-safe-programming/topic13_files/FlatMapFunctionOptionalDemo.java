/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 13: flatMap(Function) on Optional - Un-Nesting Optional Returning Methods
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class FlatMapFunctionOptionalDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: FLATMAP(FUNCTION) ON OPTIONAL - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Student student = new Student("Swadeep Paul", Optional.of(new Address("Barrackpore")));
        Student studentNoAddress = new Student("Tuhina Das", Optional.empty());

        // 1. THE MAP PROBLEM: Produces nested Optional<Optional<Address>>!
        Optional<Student> studentOpt = Optional.of(student);
        Optional<Optional<Address>> nested = studentOpt.map(Student::address);
        System.out.println("1. Using map() creates clunky nested: " + nested);

        // 2. THE FLATMAP SOLUTION: Flattens to single Optional<Address>
        Optional<Address> flatAddress = studentOpt.flatMap(Student::address);
        System.out.println("2. Using flatMap() flattens cleanly: " + flatAddress);

        // 3. Multi-level flatMap Chaining (Student -> Optional<Address> -> Optional<String> City):
        String city = studentOpt
            .flatMap(Student::address)
            .map(Address::city)
            .orElse("NO_CITY_REGISTERED");
        System.out.println("3. Extracted City via flatMap chain: " + city);

        // 4. Missing address handled gracefully:
        String cityMissing = Optional.of(studentNoAddress)
            .flatMap(Student::address)
            .map(Address::city)
            .orElse("NO_CITY_REGISTERED");
        System.out.println("4. Missing Address City via chain  : " + cityMissing);

        System.out.println("\n==========================================================================");
    }

    record Student(String name, Optional<Address> address) {}
    record Address(String city) {}
}
