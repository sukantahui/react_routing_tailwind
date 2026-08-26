/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 12: map(Function) on Optional - Safe 1-to-1 Value Transformation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class MapFunctionOptionalDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: MAP(FUNCTION) ON OPTIONAL - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Optional<StudentProfile> studentOpt = Optional.of(
            new StudentProfile(101, "Swadeep Paul", "Barrackpore", 94.0)
        );

        // 1. Transforming StudentProfile -> String (Extracting Name)
        Optional<String> nameOpt = studentOpt.map(StudentProfile::name);
        System.out.println("1. Extracted Name Optional: " + nameOpt);

        // 2. Transforming String -> Integer (Length calculation)
        Optional<Integer> lengthOpt = nameOpt.map(String::length);
        System.out.println("2. Name Length Optional   : " + lengthOpt);

        // 3. Null-Safety inside map(): If mapper returns null, map() returns Optional.empty()!
        Optional<String> nullMapping = studentOpt.map(s -> (String) null);
        System.out.println("\n3. Mapper returning null becomes: " + nullMapping + " (NO NPE!)");

        // 4. Transforming on an EMPTY Optional: mapper is safely skipped
        Optional<StudentProfile> emptyStudent = Optional.empty();
        Optional<String> emptyName = emptyStudent.map(StudentProfile::name);
        System.out.println("4. Mapping on Empty Optional  : " + emptyName);

        System.out.println("\n==========================================================================");
    }

    record StudentProfile(int id, String name, String center, double score) {}
}
