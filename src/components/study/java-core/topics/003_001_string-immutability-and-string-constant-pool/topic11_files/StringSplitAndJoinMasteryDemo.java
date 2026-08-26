/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 11: Splitting & Joining: split(regex), String.join(delimiter, elements)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

import java.util.Arrays;
import java.util.List;

public class StringSplitAndJoinMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: SPLITTING & JOINING STRINGS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Splitting CSV Data via split(regex):
        String csvRow = "Swadeep Paul,Barrackpore,Full Stack Java,9830000000";
        String[] tokens = csvRow.split(",");

        System.out.println(">>> 1. Splitting CSV string:");
        for (int i = 0; i < tokens.length; i++) {
            System.out.printf("  Token [%d]: %s\n", i, tokens[i]);
        }

        // 2. Joining elements with String.join() (Java 8+):
        List<String> hubList = Arrays.asList("Barrackpore", "Naihati", "Shyamnagar", "Ichapur");
        String formattedHubs = String.join(" -> ", hubList);

        System.out.println("\n>>> 2. Joining Collection via String.join():");
        System.out.println("  Connected Hubs: " + formattedHubs);

        System.out.println("\n==========================================================================");
    }
}