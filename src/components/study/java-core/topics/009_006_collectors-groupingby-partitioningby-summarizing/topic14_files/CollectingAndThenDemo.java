/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 14: Collectors.collectingAndThen() - Finishing Transformations
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class CollectingAndThenDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: COLLECTINGANDTHEN() - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> studentList = List.of(
            "Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee"
        );

        // 1. Collect to List AND THEN wrap in Collections.unmodifiableList:
        List<String> immutableList = studentList.stream()
            .filter(name -> name.contains("Das"))
            .collect(Collectors.collectingAndThen(
                Collectors.toList(),
                Collections::unmodifiableList
            ));

        System.out.println("1. Immutable List collected: " + immutableList);

        // 2. Collect to List AND THEN compute total character count:
        int totalChars = studentList.stream()
            .collect(Collectors.collectingAndThen(
                Collectors.toList(),
                list -> list.stream().mapToInt(String::length).sum()
            ));

        System.out.println("2. Total characters across collected list: " + totalChars);

        System.out.println("\n==========================================================================");
    }
}
