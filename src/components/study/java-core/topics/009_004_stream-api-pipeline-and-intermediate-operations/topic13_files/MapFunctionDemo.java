/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 13: map(Function) - 1-to-1 Element Transformation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;

public class MapFunctionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: MAP(FUNCTION) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<StudentEntity> studentEntities = List.of(
            new StudentEntity(101, "Swadeep Paul", "swadeep@example.com", "Barrackpore", 94.5),
            new StudentEntity(102, "Tuhina Das", "tuhina@example.com", "Naihati", 96.0),
            new StudentEntity(103, "Abhronila Das", "abhronila@example.com", "Shyamnagar", 88.0)
        );

        // 1. Transforming Object -> String (Field Extraction)
        System.out.println("1. Extracting Student Names (Stream<StudentEntity> -> Stream<String>):");
        List<String> names = studentEntities.stream()
            .map(StudentEntity::name)
            .toList();
        System.out.println("   Result: " + names);

        // 2. Transforming Object -> DTO (Data Transfer Object)
        System.out.println("\n2. Mapping Entity to StudentCardDTO:");
        List<StudentCardDTO> dtos = studentEntities.stream()
            .map(e -> new StudentCardDTO(e.id(), e.name().toUpperCase(), e.center()))
            .toList();
        dtos.forEach(dto -> System.out.println("   - " + dto));

        // 3. Type Conversion: String -> Integer (Length mapping)
        List<String> branches = List.of("Barrackpore", "Naihati", "Shyamnagar", "Ichapur");
        List<Integer> nameLengths = branches.stream()
            .map(String::length)
            .toList();
        System.out.println("\n3. Branch Name Lengths: " + nameLengths);

        System.out.println("==========================================================================");
    }

    record StudentEntity(int id, String name, String email, String center, double score) {}
    record StudentCardDTO(int id, String formattedName, String center) {}
}
