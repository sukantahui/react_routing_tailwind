/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 1: The java.util.regex Package Architecture: Pattern, Matcher & PatternSyntaxException
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class RegexPackageArchitectureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: java.util.regex ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 3 Core Classes in java.util.regex:");
        System.out.println();
        System.out.println("  1. java.util.regex.Pattern (Compiled Immutable Representation):");
        System.out.println("     - Pre-compiles regex bytecode into a Finite State Automaton (FSA).");
        System.out.println("     - Immutable and 100% thread-safe (ideal for static final constants).");
        System.out.println();
        System.out.println("  2. java.util.regex.Matcher (Stateful Search Engine):");
        System.out.println("     - Performs matching operations against input text.");
        System.out.println("     - MUTABLE and NOT thread-safe (local to current method/thread).");
        System.out.println();
        System.out.println("  3. java.util.regex.PatternSyntaxException (Unchecked Runtime Exception):");
        System.out.println("     - Thrown when regex syntax contains illegal characters or unbalanced brackets.");

        // Testing PatternSyntaxException:
        try {
            Pattern.compile("[a-z"); // Missing closing bracket!
        } catch (PatternSyntaxException e) {
            System.out.println("\n>>> Caught PatternSyntaxException Demonstration:");
            System.out.println("  Message : " + e.getDescription());
            System.out.println("  Pattern : " + e.getPattern());
            System.out.println("  Index   : " + e.getIndex());
        }

        System.out.println("\n==========================================================================");
    }
}