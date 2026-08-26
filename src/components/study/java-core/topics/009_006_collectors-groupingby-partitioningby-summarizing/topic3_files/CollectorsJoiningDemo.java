/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 3: Collectors.joining() - High-Performance String Concatenation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.List;
import java.util.stream.Collectors;

public class CollectorsJoiningDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: COLLECTORS.JOINING() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> branches = List.of("Barrackpore", "Naihati", "Shyamnagar", "Ichapur");

        // 1. joining(): Direct concatenation with no delimiter
        String directConcat = branches.stream()
            .collect(Collectors.joining());
        System.out.println("1. Direct joining(): " + directConcat);

        // 2. joining(delimiter): Joined with delimiter
        String csvBranches = branches.stream()
            .collect(Collectors.joining(", "));
        System.out.println("2. joining(', '): " + csvBranches);

        // 3. joining(delimiter, prefix, suffix): Full formatting with brackets
        String formattedJsonArray = branches.stream()
            .map(b -> "\"" + b + "\"")
            .collect(Collectors.joining(", ", "[ ", " ]"));
        System.out.println("3. joining(', ', '[ ', ' ]'): " + formattedJsonArray);

        // 4. SQL IN Clause Generation Example:
        List<Integer> studentIds = List.of(101, 102, 103, 104);
        String sqlInClause = studentIds.stream()
            .map(String::valueOf)
            .collect(Collectors.joining(", ", "SELECT * FROM students WHERE id IN (", ");"));
        System.out.println("\n4. Dynamic SQL Query Generation:\n   " + sqlInClause);

        System.out.println("\n==========================================================================");
    }
}
