/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 0: What is Functional Programming? Unifying OOP with Declarative Paradigms
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.ArrayList;
import java.util.List;

public class FunctionalVsImperativeParadigmsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: FUNCTIONAL PROGRAMMING & JAVA 8 REVOLUTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> marks = List.of(88, 42, 95, 61, 35, 78);

        // 1. IMPERATIVE (OOP / Procedural) APPROACH: Focus on 'HOW' (Mutating state, index loops):
        List<Integer> passedMarksImperative = new ArrayList<>();
        for (Integer mark : marks) {
            if (mark >= 50) {
                passedMarksImperative.add(mark);
            }
        }
        System.out.println(">>> 1. Imperative Result (How to filter) : " + passedMarksImperative);

        // 2. DECLARATIVE (Functional) APPROACH: Focus on 'WHAT' (Pure expressions, no mutable loops):
        List<Integer> passedMarksFunctional = marks.stream()
                .filter(mark -> mark >= 50) // Lambda expression passed as first-class behavior!
                .toList();

        System.out.println(">>> 2. Functional Result (What to filter): " + passedMarksFunctional);

        System.out.println("\n>>> WHY JAVA 8 INTRODUCED FUNCTIONAL PROGRAMMING:");
        System.out.println("  1. Code Conciseness       : Replaces 10-line boilerplate loops with elegant 1-line pipelines.");
        System.out.println("  2. Behavior Parameterization: Methods can now accept FUNCTIONS (code blocks) as arguments just like data values!");
        System.out.println("  3. Parallel Readiness     : Declarative pipelines can seamlessly switch to multi-core parallelism via '.parallelStream()'!");

        System.out.println("\n==========================================================================");
    }
}